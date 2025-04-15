'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {Button} from "@payloadcms/ui";

const ImportButton: React.FC = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push('/admin/import-documents');
    };

    return (
            <Button onClick={handleClick}>
                Importer des Documents
            </Button>
    );
};

export default ImportButton;