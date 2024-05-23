import { CollectionConfig } from "payload/types";

const Cities: CollectionConfig = {
  slug: "cities",
  fields: [
    {
      name: "name",
      label: "Nom",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "description",
      label: "Description",
      type: "richText",
      required: true,
    },
    {
      name: "thematics",
      label: "Thematiques",
      type: "relationship",
      relationTo: "thematics",
      hasMany: true,
    },
    {
      name: "medias",
      label: "Medias",
      type: "relationship",
      relationTo: "medias",
      hasMany: true,
    },
  ],
};

export default Cities;
