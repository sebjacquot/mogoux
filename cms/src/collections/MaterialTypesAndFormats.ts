import { CollectionConfig } from 'payload';

const MaterialTypesAndFormats: CollectionConfig = {
    slug: 'material-types-and-formats',
    admin: {
        useAsTitle: 'name',
        group: 'Caractéristiques physiques',
    },
    labels: {
        singular: {
            en: 'Material type and format',
            fr: 'Support et format',
        },
        plural: {
            en: 'Material types and formats',
            fr: 'Supports et formats',
        },
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'name',
            label: 'Nom du type de support ou du format',
            type: 'text',
            required: true,
            unique: true,
        },
    ],
};

export default MaterialTypesAndFormats;