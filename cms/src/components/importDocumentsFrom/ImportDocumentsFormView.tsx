import type { AdminViewProps } from 'payload'

import { DefaultTemplate } from '@payloadcms/next/templates'
import { Gutter } from '@payloadcms/ui'
import React from 'react'
import { redirect } from 'next/navigation';
import ImportDocumentsForm from "@/components/importDocumentsFrom/ImportDocumentsForm";

export const ImportDocumentsFormView: React.FC<AdminViewProps> = ({
    initPageResult,
    params,
    searchParams,
}) => {
    const user = initPageResult.req?.user;

    if (!user) {
        redirect('/admin/login');
    }

    return (
        <DefaultTemplate
            i18n={initPageResult.req.i18n}
            locale={initPageResult.locale}
            params={params}
            payload={initPageResult.req.payload}
            permissions={initPageResult.permissions}
            searchParams={searchParams}
            user={initPageResult.req.user || undefined}
            visibleEntities={initPageResult.visibleEntities}
        >
            <Gutter>
                <h1>Import de documents</h1>
                <br />
                <ImportDocumentsForm />
            </Gutter>
        </DefaultTemplate>
    )
}


export default ImportDocumentsFormView;