'use client';

import React from 'react';
import { Button } from '@payloadcms/ui';
import ExcelJS from 'exceljs';

const ExportAllDocumentsButton: React.FC = () => {
    const handleExport = async () => {
        try {
            // 1. Récupération des documents
            const docRes = await fetch('/memoires-ouvrieres-goux/cms/api/documents?limit=1000');
            const docData = await docRes.json();
            const documents = docData?.docs || [];

            if (!documents.length) {
                alert('Aucun document trouvé.');
                return;
            }

            // 2. Récupération des références
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
                const res = await fetch(`/memoires-ouvrieres-goux/cms/api/${endpoint}?limit=1000`);
                refSheets[endpoint] = await res.json();
            }

            // 3. Création du fichier Excel
            const workbook = new ExcelJS.Workbook();
            const mainSheet = workbook.addWorksheet('Modèle Import Documents');
            endpoints.forEach(key => workbook.addWorksheet(key));

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

            // 4. Style des en-têtes
            const headerRow = mainSheet.getRow(1);
            headerRow.eachCell((cell, colNumber) => {
                const key = mainSheet.columns[colNumber - 1]?.key;
                const isRequired = requiredFields.includes(key as string);

                cell.font = { bold: true };
                cell.alignment = { vertical: 'middle', horizontal: 'center' };
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: isRequired ? 'FFF8D7DA' : 'FFF3F3F3' },
                };
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' },
                };
            });

            // 5. Ajout des documents
            for (const doc of documents) {
                const row = {
                    filename: doc.filename || '',
                    reference_code: doc.reference_code || '',
                    slug: doc.slug || '',
                    title: doc.title || '',
                    date: doc.date || '',
                    type: doc.type || '',
                    'physical_characteristics.document_types': doc.physical_characteristics?.document_types?.name || '',
                    'physical_characteristics.material_types_and_formats': doc.physical_characteristics?.material_types_and_formats?.name || '',
                    'physical_characteristics.colors': doc.physical_characteristics?.colors?.name || '',
                    preview_audio_video: doc.preview_audio_video?.name || '',
                    credits_name: doc.credits_name || '',
                    credits_link: doc.credits_link || '',
                    thematics_1: doc.thematics?.[0]?.title || '',
                    thematics_2: doc.thematics?.[1]?.title || '',
                    thematics_3: doc.thematics?.[2]?.title || '',
                    legend: doc.legend || '',
                    description: doc.description || '',
                    alt: doc.alt || '',
                    'location.location_reference': doc.location?.location_reference?.name || '',
                    'location.location_details': doc.location?.location_details || '',
                    'location.location_link': doc.location?.location_link || '',
                    notice: doc.notice || ''
                };

                mainSheet.addRow(row);
            }

            // 6. Feuilles relationnelles
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

            // 7. Validation dropdown
            const validationMap: Record<string, string> = {
                F: 'type',
                G: 'document-types',
                H: 'material-types-and-formats',
                I: 'colors',
                J: 'medias',
                M: 'thematics',
                N: 'thematics',
                O: 'thematics',
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

            // 8. Téléchargement
            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });

            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'modele_import_documents.xlsx';
            link.click();

        } catch (error) {
            console.error('Erreur export documents :', error);
            alert('Erreur lors de l’export.');
        }
    };

    return (
        <Button onClick={handleExport}>
            Exporter tous les documents
        </Button>
    );
};

export default ExportAllDocumentsButton;