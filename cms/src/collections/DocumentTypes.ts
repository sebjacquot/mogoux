import { CollectionConfig } from 'payload';

const DocumentTypes: CollectionConfig = {
    slug: 'document-types',
    admin: {
        useAsTitle: 'name',
        group: 'Caractéristiques physiques',
    },
    defaultSort: "name",
    labels: {
        singular: {
            en: 'Document type',
            fr: 'Type du document',
        },
        plural: {
            en: 'Document types',
            fr: 'Types de document',
        },
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'name',
            label: 'Nom du type de document',
            type: 'text',
            required: true,
            unique: true,
        },
    ],
};

export default DocumentTypes;