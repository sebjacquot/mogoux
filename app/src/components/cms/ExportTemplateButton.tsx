'use client';

import React from 'react';
import { Button } from '@payloadcms/ui';
import ExcelJS from 'exceljs';

const apiBase = (process.env.NEXT_PUBLIC_BASE_PATH || '') + '/api'

const ExportTemplateButton: React.FC = () => {
    const handleExport = async () => {
        try {
            // Étape 1 : Requêtes vers les collections pour remplir les listes de référence
            const endpoints = [
                'document-types',
                'material-types-and-formats',
                'colors',
                'reference-locations',
                'medias',
                'thematics'
            ];

            const refSheets: Record<string, any> = {};
            for (const endpoint of endpoints) {
                const res = await fetch(`${apiBase}/${endpoint}?limit=1000`);
                refSheets[endpoint] = await res.json();
            }

            // Étape 2 : Création du fichier Excel et des feuilles
            const workbook = new ExcelJS.Workbook();
            const mainSheet = workbook.addWorksheet('Modèle Import Documents');
            endpoints.forEach(key => {
                workbook.addWorksheet(key);
            });

            // Étape 3 : Colonnes du modèle principal
            const headers = [
                'filename',
                'reference_code',
                'slug',
                'title',
                'date',
                'type',
                'physical_characteristics.document_types',
                'physical_characteristics.material_types_and_formats',
                'physical_characteristics.colors',
                'preview_audio_video',
                'credits_name',
                'credits_link',
                'thematics_1',
                'thematics_2',
                'thematics_3',
                'legend',
                'description',
                'alt',
                'location.location_reference',
                'location.location_details',
                'location.location_link',
                'notice'
            ];

            mainSheet.columns = headers.map(header => ({
                header,
                key: header,
                width: Math.max(header.length * 1.2, 20),
            }));

            // Liste des champs requis
            const requiredFields = [
                'filename',
                'reference_code',
                'slug',
                'title',
                'date',
                'type',
                'physical_characteristics.document_types',
                'credits_name',
                'alt'
            ];

            const headerRow = mainSheet.getRow(1);
            headerRow.eachCell((cell, colNumber) => {
                const key = mainSheet.columns[colNumber - 1]?.key;
                const isRequired = requiredFields.includes(key as string);

                cell.font = { bold: true };
                cell.alignment = { vertical: 'middle', horizontal: 'center' };
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: isRequired ? 'FFF8D7DA' : 'FFF3F3F3' }, // Rouge clair si requis
                };
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' },
                };
            });

            // Étape 4 : Exemple de ligne
            const exampleRow = [
                'THEM001.jpg',
                'REF001',
                'SLUG001',
                'Titre exemple',
                '1975',
                'Image',
                refSheets['document-types']?.docs[0]?.name || '',
                refSheets['material-types-and-formats']?.docs[0]?.name || '',
                refSheets['colors']?.docs[0]?.name || '',
                refSheets['medias']?.docs[0]?.name || '',
                'Nom crédit',
                'https://credit.exemple.com',
                refSheets['thematics']?.docs[0]?.title || '',
                refSheets['thematics']?.docs[1]?.title || '',
                refSheets['thematics']?.docs[2]?.title || '',
                'Légende exemple',
                'Description exemple',
                'Texte alternatif',
                refSheets['reference-locations']?.docs[0]?.name || '',
                'Détail lieu',
                'https://lieu.exemple.com',
                'https://notice.exemple.com'
            ];
            mainSheet.addRow(exampleRow);

            // Étape 5 : Feuilles de référence (ID + nom visible)
            for (const key of endpoints) {
                const sheet = workbook.getWorksheet(key);

                if (!sheet) {
                    console.warn(`Feuille Excel manquante pour : ${key}`);
                    continue;
                }

                sheet.addRow(['id', 'name']);
                refSheets[key]?.docs.forEach((item: any) => {
                    sheet.addRow([item.id, item.name || item.title || item.filename]);
                });
            }

            // Étape 6 : Validation dropdown
            const validationMap: Record<string, string> = {
                F: 'type',
                G: 'document-types',
                H: 'material-types-and-formats',
                I: 'colors',
                J: 'medias',
                M: 'thematics', // thematics_1
                N: 'thematics', // thematics_2
                O: 'thematics', // thematics_3
                S: 'reference-locations'
            };

            for (const [colLetter, sheetName] of Object.entries(validationMap)) {
                const list = sheetName === 'type'
                    ? ['Image', 'Audio', 'Video']
                    : refSheets[sheetName]?.docs.map((d: any) => d.name || d.title || d.filename) || [];

                const formula = sheetName === 'type'
                    ? `"${list.join(',')}"`
                    : `'${sheetName}'!$B$2:$B$${list.length + 1}`;

                for (let i = 2; i <= 500; i++) {
                    mainSheet.getCell(`${colLetter}${i}`).dataValidation = {
                        type: 'list',
                        formulae: [formula],
                        allowBlank: true,
                        showErrorMessage: true,
                        errorTitle: 'Valeur invalide',
                        error: `Veuillez sélectionner une valeur valide pour ${sheetName}.`,
                    };
                }
            }

            // Étape 7 : Export du fichier Excel
            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });

            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'modele_import_documents.xlsx';
            link.click();
        } catch (error) {
            console.error('Erreur export modèle :', error);
        }
    };

    return (
        <Button onClick={handleExport}>
            Télécharger modèle Excel
        </Button>
    );
};

export default ExportTemplateButton;
