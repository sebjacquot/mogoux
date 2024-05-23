import { CollectionConfig } from "payload/types";

const Thematics: CollectionConfig = {
  slug: "thematics",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "backgroundImage", // required
      type: "upload", // required
      relationTo: "medias", // required
      required: true,
    },
    {
      name: "title",
      label: "Titre",
      type: "text",
      required: true,
    },
    {
      name: "color",
      label: "Couleur",
      type: "text",
      required: true,
    },
  ],
};

export default Thematics;
