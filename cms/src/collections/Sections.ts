import { CollectionConfig } from "payload";

export const Sections: CollectionConfig = {
  slug: "sections",
  admin: {
    useAsTitle: "name",
    defaultColumns: ['name', 'thematics', 'rank', 'createdAt'],
  },
  defaultSort: "name",
  labels: {
    singular: {
      en: 'Section',
      fr: 'Rubrique',
    },
    plural: {
      en: 'Sections',
      fr: 'Rubriques',
    },
  },
  access: {
    read: () => true,
  },
  timestamps: true,
  fields: [
    {
      name: "name",
      label: "Nom de la rubrique",
      type: "text",
      required: true,
    },
    {
      name: "rank",
      label: "Ordre",
      type: "number",
    },
    {
      name: "color",
      label: "Couleur",
      type: "text",
      required: true,
    },
    {
      name: "thematics",
      label: "Thématiques",
      type: "relationship",
      relationTo: "thematics",
      hasMany: true,
    },
  ],
};

export default Sections;