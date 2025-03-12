import { CollectionConfig } from "payload";

export const Sections: CollectionConfig = {
  slug: "sections",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: () => true,
  },
  timestamps: true,
  defaultSort: "-createdAt",
  fields: [
    {
      name: "name",
      label: "Nom de la rubrique",
      type: "text",
      required: false,
    },
    {
      name: "thematics",
      label: "Thématiques",
      type: "relationship",
      relationTo: "thematics",
      hasMany: true,
    },
    {
      name: "documents",
      label: "Documents associés",
      type: "relationship",
      relationTo: "documents",
      hasMany: true,
    },
  ],
};

export default Sections;