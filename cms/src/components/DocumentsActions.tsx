'use client';

import React from 'react';
import ImportButton from './ImportButton';
import ExportTemplateButton from './ExportTemplateButton';

const DocumentsActions: React.FC = () => {
    return (
        <div style={{ display: 'flex', gap: '12px'}}>
            <ImportButton />
            <ExportTemplateButton />
        </div>
    );
};

export default DocumentsActions;