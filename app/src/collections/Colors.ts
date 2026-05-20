import { CollectionConfig } from 'payload';

const Colors: CollectionConfig = {
    slug: 'colors',
    admin: {
        useAsTitle: 'name',
        group: 'Caractéristiques physiques',
    },
    defaultSort: "name",
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
    
    
/*    access: {
  read: () => true,
  create: ({ req: { user } }) => {
    console.log('user dans create:', user)
    return !!user
  },
},*/
    
    
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