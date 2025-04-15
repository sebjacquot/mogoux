import { CollectionConfig } from 'payload';

const Colors: CollectionConfig = {
    slug: 'colors',
    admin: {
        useAsTitle: 'name',
        group: 'Caractéristiques physiques',
    },
    labels: {
        singular: {
            en: 'Color',
            fr: 'Couleur',
        },
        plural: {
            en: 'Colors',
            fr: 'Couleurs',
        },
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'name',
            label: 'Nom du type de couleur',
            type: 'text',
            required: true,
            unique: true,
        },
    ],
};

export default Colors;