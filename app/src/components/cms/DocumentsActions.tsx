'use client';

import React from 'react';
import ImportButton from './ImportButton';
import ExportTemplateButton from './ExportTemplateButton';
import ExportAllDocumentsButton from "@/components/cms/ExportAllDocumentsButton";

const DocumentsActions: React.FC = () => {
    return (
        <div style={{ display: 'flex', gap: '12px'}}>
            <ImportButton />
            <ExportTemplateButton />
            <ExportAllDocumentsButton/>
        </div>
    );
};

export default DocumentsActions;