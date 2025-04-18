'use client';
import './ImportDocumentsForm.css';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@payloadcms/ui';
import ExcelJS from 'exceljs';

const validateExcelStructure = (headers: any[], requiredColumns: string[]) => {
    const missing = requiredColumns.filter(col => !headers.includes(col));
    if (missing.length > 0) {
        throw new Error(`Colonnes manquantes dans le fichier Excel : ${missing.join(', ')}`);
    }
};

const checkDuplicatesInExcel = (rows: any[]) => {
    const seenSlugs = new Set<string>();
    const seenCodes = new Set<string>();

    const duplicateSlugs = rows.filter(row => {
        if (seenSlugs.has(row.slug)) return true;
        seenSlugs.add(row.slug);
        return false;
    });

    const duplicateCodes = rows.filter(row => {
        if (seenCodes.has(row.reference_code)) return true;
        seenCodes.add(row.reference_code);
        return false;
    });

    if (duplicateSlugs.length || duplicateCodes.length) {
        throw new Error(
            `Doublons détectés dans le fichier Excel :\n` +
            `- Slugs : ${[...new Set(duplicateSlugs.map(d => d.slug))].join(', ')}\n` +
            `- Cotes : ${[...new Set(duplicateCodes.map(d => d.reference_code))].join(', ')}`
        );
    }
};

const checkExistingSlugsAndCodes = async (rows: any[]) => {
    const res = await fetch('/memoires-ouvrieres-goux/cms/api/documents?limit=1000');
    const data = await res.json();

    const existingSlugs = new Set(data.docs.map((doc: any) => doc.slug));
    const existingCodes = new Set(data.docs.map((doc: any) => doc.reference_code));

    const usedSlugs = rows.filter(row => existingSlugs.has(row.slug)).map(r => r.slug);
    const usedCodes = rows.filter(row => existingCodes.has(row.reference_code)).map(r => r.reference_code);

    if (usedSlugs.length || usedCodes.length) {
        throw new Error(
            `Des slugs ou cotes sont déjà utilisés dans la base :\n` +
            `- Slugs : ${usedSlugs.join(', ')}\n` +
            `- Cotes : ${usedCodes.join(', ')}`
        );
    }
};

const checkAllValuesInLookupTables = (rows: any[], lookupTables: Record<string, Record<string, number>>) => {
    const relationFields: Record<string, string[]> = {
        'document-types': ['physical_characteristics.document_types'],
        'material-types-and-formats': ['physical_characteristics.material_types_and_formats'],
        'colors': ['physical_characteristics.colors'],
        'medias': ['preview_audio_video'],
        'reference-locations': ['location.location_reference'],
        'thematics': ['thematics_1', 'thematics_2', 'thematics_3'],
    };

    const errors: string[] = [];

    for (const row of rows) {
        for (const [key, fields] of Object.entries(relationFields)) {
            for (const field of fields) {
                const value = row[field];
                if (typeof value === 'string' && value.trim() && !lookupTables[key]?.[value.trim()]) {
                    errors.push(`Valeur inconnue dans "${field}" : "${value}"`);
                }
            }
        }
    }

    if (errors.length > 0) {
        throw new Error(`Des champs ne correspondent pas à des données existantes dans les feuilles secondaires :\n- ${errors.join('\n- ')}`);
    }
};

const checkRequiredFieldsInRows = (rows: any[], required: string[]) => {
    const errors: string[] = [];

    rows.forEach((row, index) => {
        const missing = required.filter(field => row[field] === null || row[field] === undefined || row[field] === '');
        if (missing.length > 0) {
            errors.push(`Ligne ${index + 2} : ${missing.join(', ')}`);
        }
    });

    if (errors.length > 0) {
        throw new Error(`Champs obligatoires manquants dans certaines lignes :\n- ${errors.join('\n- ')}`);
    }
};

const checkSlugsFormat = (rows: any[]) => {
    const invalidSlugs: { slug: string, line: number }[] = [];

    const slugRegex = /^[A-Za-z0-9_-]+$/;

    rows.forEach((row, index) => {
        const slug = row['slug'];
        if (typeof slug !== 'string' || !slugRegex.test(slug.trim())) {
            invalidSlugs.push({ slug, line: index + 2 });
        }
    });

    if (invalidSlugs.length > 0) {
        const message = invalidSlugs.map(({ slug, line }) =>
            `Ligne ${line} : "${slug}" est invalide`
        ).join('\n');
        throw new Error(`Les slugs suivants ne respectent pas le format :\n${message}`);
    }
};

const checkEachFilenameExists = (rows: any[], documentFiles: FileList) => {
    const uploadedFileNames = Array.from(documentFiles).map(file => file.name);
    const missingFilenames: string[] = [];

    for (const row of rows) {
        const filename = row['filename'];
        if (filename && !uploadedFileNames.includes(filename)) {
            missingFilenames.push(filename);
        }
    }

    if (missingFilenames.length > 0) {
        throw new Error(`Les fichiers suivants sont référencés dans le fichier Excel mais absents du dossier de médias :\n- ${missingFilenames.join('\n- ')}`);
    }
};

/**
 * Extrait le texte brut d'une cellule Excel pouvant contenir un hyperlien intégré.
 *
 * Si la cellule contient un objet avec les propriétés `{ text, hyperlink }`,
 * cette fonction retourne uniquement la propriété `text`.
 * Si la cellule contient directement une chaîne (`string`), elle la retourne telle quelle.
 * Si la cellule est vide ou d'un autre type, elle retourne une chaîne vide.
 *
 * Exemple de cellule Excel avec lien :
 *   { text: "https://monlien.com", hyperlink: "https://monlien.com" }
 *
 * @param value - La valeur brute de la cellule Excel
 * @returns Le texte affiché dans la cellule, sans le lien hypertexte
 */
const extractPlainText = (value: any): string => {
    if (typeof value === 'object' && value !== null && 'text' in value) {
        return value.text;
    }
    return typeof value === 'string' ? value : '';
};

const ImportDocumentsForm: React.FC = () => {
    const [excelFile, setExcelFile] = useState<File | null>(null);
    const [documentFiles, setDocumentFiles] = useState<FileList | null>(null);

    const [error, setError] = useState<string | null>(null);

    const [successFiles, setSuccessFiles] = useState<string[]>([]);
    const [errorFiles, setErrorFiles] = useState<string[]>([]);

    const [showSummaryModal, setShowSummaryModal] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isImporting, setIsImporting] = useState(false);
    const [excelRowsCount, setExcelRowsCount] = useState(0);

    // Références pour réinitialiser les inputs
    const excelInputRef = useRef<HTMLInputElement>(null);
    const documentInputRef = useRef<HTMLInputElement>(null);

    const router = useRouter();

    const requiredColumns = [
        "filename",
        "reference_code",
        "slug",
        "title",
        "date",
        "type",
        "physical_characteristics.document_types",
        "physical_characteristics.material_types_and_formats",
        "physical_characteristics.colors",
        "preview_audio_video",
        "credits_name",
        "credits_link",
        'thematics_1',
        'thematics_2',
        'thematics_3',
        "legend",
        "description",
        "alt",
        "location.location_reference",
        "location.location_details",
        "location.location_link",
        "notice",
    ];
    const requiredFields = [
        "filename",
        "reference_code",
        "slug",
        "title",
        "date",
        "type",
        "physical_characteristics.document_types",
        "credits_name",
        "alt",
    ];

    const handleExcelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setExcelFile(e.target.files[0]);
            setError(null);
        }
    };

    const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setDocumentFiles(e.target.files);
            setError(null);
        }
    };

    const handleRemoveExcel = () => {
        setExcelFile(null);
        if (excelInputRef.current) {
            excelInputRef.current.value = '';
        }
    };

    const handleRemoveDocumentFiles = () => {
        setDocumentFiles(null);
        if (documentInputRef.current) {
            documentInputRef.current.value = '';
        }
    };

    const parseExcelFile = async (file: File) => {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(await file.arrayBuffer());

        // 1. Récupère la feuille principale contenant les données des documents
        const dataSheet = workbook.getWorksheet('Modèle Import Documents');
        if (!dataSheet) {
            throw new Error("La feuille 'Modèle Import Documents' est manquante.");
        }

        // 2. Liste des feuilles de référence à charger (document-types, colors, etc.)
        const sheetsToParse = [
            { sheetName: "document-types", key: "document-types" },
            { sheetName: "material-types-and-formats", key: "material-types-and-formats" },
            { sheetName: "colors", key: "colors" },
            { sheetName: "reference-locations", key: "reference-locations" },
            { sheetName: "medias", key: "medias" },
            { sheetName: "thematics", key: "thematics" },
        ];

        // 3. Vérifie que toutes les feuilles de référence existent
        const missingSheets = sheetsToParse
            .filter(({ sheetName }) => !workbook.getWorksheet(sheetName))
            .map(({ sheetName }) => sheetName);

        if (missingSheets.length > 0) {
            throw new Error(`Les feuilles suivantes sont manquantes dans le fichier Excel : ${missingSheets.join(', ')}`);
        }

        // 4. Construit les dictionnaires de correspondance (name → id) pour chaque feuille de référence
        const lookupTables: Record<string, Record<string, number>> = {};

        for (const { sheetName, key } of sheetsToParse) {
            const sheet = workbook.getWorksheet(sheetName);

            if (!sheet) {
                throw new Error(`La feuille "${sheetName}" est manquante dans le fichier Excel.`);
            }

            const nameToId: Record<string, number> = {};

            sheet.eachRow((row, rowNumber) => {
                if (rowNumber === 1) return; // Ignore l'en-tête
                const id = row.getCell(1).value;
                const name = row.getCell(2).value;

                if (typeof name === 'string' && typeof id === 'number') {
                    nameToId[name.trim()] = id;
                }
            });

            lookupTables[key] = nameToId;
        }

        // 5. Analyse des données de la feuille principale
        const rows: any[] = [];
        const headerRow = dataSheet.getRow(1);
        const headers = Array.isArray(headerRow.values)
            ? headerRow.values.slice(1).map(h => h?.toString().trim())
            : [];

        dataSheet.eachRow((row, rowNumber) => {
            if (rowNumber === 1) return; // Ignore l'en-tête

            const rowData: Record<string, any> = {};

            row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                const header = headers[colNumber - 1]; // -1 car ExcelJS commence à 1
                if (header) {
                    rowData[header] = cell.value;
                }
            });
            if (Object.values(rowData).every((v) => v === null || v === '')) return;
            rows.push(rowData);
        });

        // 6. Retourne les en-têtes, les lignes de données et les tables de correspondance
        return {
            headers,
            rows,
            lookupTables,
        };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const successList: string[] = [];
        const errorList: string[] = [];

        // Étape 1 - Validation initiale des fichiers
        if (!excelFile || !documentFiles) {
            setError('Veuillez sélectionner un fichier Excel et des documents.');
            return;
        }

        try {
            // Étape 2 - Lecture et validation du fichier Excel
            const { headers, rows: excelData, lookupTables } = await parseExcelFile(excelFile);

            // Vérification
            checkRequiredFieldsInRows(excelData, requiredFields);
            checkAllValuesInLookupTables(excelData, lookupTables);
            validateExcelStructure(headers, requiredColumns);
            checkDuplicatesInExcel(excelData);
            checkEachFilenameExists(excelData, documentFiles);
            checkSlugsFormat(excelData);
            await checkExistingSlugsAndCodes(excelData);

            // Étape 4 - Initialisation des états d'import
            setIsImporting(true);
            setShowSummaryModal(true);
            setCurrentIndex(0);
            setExcelRowsCount(excelData.length);

            const uploadedFiles = Array.from(documentFiles);

            // Étape 5 - Parcours de chaque ligne du fichier Excel
            for (const row of excelData) {
                setCurrentIndex(prev => prev + 1);
                const fileName = row['filename'];
                const matchingFile = uploadedFiles.find(file => file.name === fileName);

                if (!matchingFile) {
                    console.warn(`Fichier manquant pour la ligne Excel : ${fileName}`);
                    errorList.push(fileName);
                    continue;
                }

                try {
                    // Étape 6 - Construction des données média à importer
                    const documentData = {
                        reference_code: row['reference_code'],
                        slug: row['slug'],
                        title: row['title'],
                        date: typeof row['date'] === 'string' ? row['date'] : String(row['date']),
                        type: row['type'],
                        physical_characteristics: {
                            document_types: lookupTables["document-types"]?.[row['physical_characteristics.document_types']] ?? null,
                            material_types_and_formats: lookupTables["material-types-and-formats"]?.[row['physical_characteristics.material_types_and_formats']] ?? null,
                            colors: lookupTables["colors"]?.[row['physical_characteristics.colors']] ?? null,
                        },
                        preview_audio_video: lookupTables["medias"]?.[row['preview_audio_video']] ?? null,
                        credits_name: row['credits_name'],
                        credits_link: extractPlainText(row['credits_link']),
                        thematics: Array.from(
                            new Set(
                                ['thematics_1', 'thematics_2', 'thematics_3']
                                    .map((key) => {
                                        const name = row[key];
                                        return typeof name === 'string' ? lookupTables['thematics'][name.trim()] : null;
                                    })
                                    .filter((id: number | null): id is number => typeof id === 'number')
                            )
                        ),
                        legend: row['legend'],
                        description: row['description'],
                        alt: row['alt'],
                        location: {
                            location_reference: lookupTables["reference-locations"]?.[row['location.location_reference']] ?? null,
                            location_details: row['location.location_details'],
                            location_link: extractPlainText(row['location.location_link']),
                        },
                        notice: extractPlainText(row['notice']),
                        filename: row['filename'],
                    };

                    // Vérifie si les champs obligatoires contenant des ID ont bien été trouvés
                    if (!documentData.physical_characteristics.document_types) {
                        console.warn(`Tag "document_types" introuvable pour : ${row['physical_characteristics.document_types']}`);
                    }

                    const formData = new FormData();
                    formData.append('file', matchingFile);
                    formData.append('_payload', JSON.stringify(documentData));

                    // Étape 7 - Envoi de la requête
                    const response = await fetch('/memoires-ouvrieres-goux/cms/api/documents', {
                        method: 'POST',
                        body: formData
                    });

                    if (!response.ok) {
                        console.error(`Échec de l'import pour le fichier : ${fileName}`);
                        errorList.push(fileName);
                    } else {
                        successList.push(fileName);
                    }
                } catch (rowError: any) {
                    console.error(`Erreur de traitement pour ${fileName} :`, rowError);
                    errorList.push(fileName);
                }
            }

        } catch (error: any) {
            // Étape 8 - Gestion des erreurs générales
            setError(error.message || "Erreur inattendue pendant l'import.");
        }

        // Étape 9 - Mise à jour des résultats et arrêt du chargement
        setSuccessFiles(successList);
        setErrorFiles(errorList);
        setIsImporting(false);
    };

    return (
        <div>
            <form className="import-documents-form" onSubmit={handleSubmit}>
                <p>Fichier Excel</p>
                <div className="upload-box">
                    <input
                        ref={excelInputRef}
                        id="excel-file"
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={handleExcelChange}
                    />
                    <label htmlFor="excel-file">Sélectionnez un fichier</label>
                    {excelFile && (
                        <div className="file-preview">
                            {excelFile.name}
                            <span className="remove-btn" onClick={handleRemoveExcel}>✖</span>
                        </div>
                    )}
                </div>

                <p>Documents</p>
                <div className="upload-box">
                    <input
                        ref={documentInputRef}
                        id="document-files"
                        type="file"
                        accept="image/*,audio/*,video/*"
                        multiple
                        onChange={handleDocumentChange}
                    />
                    <label htmlFor="document-files">Sélectionnez des documents</label>
                    {documentFiles && (
                        <div className="file-preview">
                            {documentFiles.length} fichier(s) sélectionné(s)
                            <span className="remove-btn" onClick={handleRemoveDocumentFiles}>✖</span>
                        </div>
                    )}
                </div>

                {error && (
                    <pre className="custom-alert">{error}</pre>
                )}

                <Button
                    disabled={isImporting}
                    onClick={(e) => {
                        e.preventDefault();
                        handleSubmit(e);
                    }}
                >
                    Importer
                </Button>
            </form>

            {showSummaryModal && (
                <div className="modal-backdrop">
                    <div className="modal">
                        {isImporting ? (
                            <>
                                <h2>Import en cours</h2>
                                <p>Fichier {currentIndex} sur {excelRowsCount}</p>
                                <div className="progress-bar">
                                    <div
                                        className="progress"
                                        style={{ width: `${(currentIndex / excelRowsCount) * 100}%` }}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <h2>Résumé de l’import</h2>

                                {successFiles.length > 0 && (
                                    <div>
                                        <h4>Fichiers importés avec succès : {successFiles.length}</h4>
                                    </div>
                                )}

                                {errorFiles.length > 0 && (
                                    <div>
                                        <h4>Erreurs d’importation : {errorFiles.length} fichier(s)</h4>
                                        <ul>{errorFiles.map(name => <li key={name}>{name}</li>)}</ul>
                                    </div>
                                )}

                                <Button onClick={() => router.push('/admin/collections/documents')}>
                                    Retour aux Documents
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
};

export default ImportDocumentsForm;