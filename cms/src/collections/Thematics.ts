import { CollectionConfig } from "payload/types";

const Thematics: CollectionConfig = {
  slug: "thematics",
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
      label: "Title",
      type: "text",
      required: true,
    },
    {
      name: "color",
      label: "Color",
      type: "text",
      required: true,
    },
  ],
};

export default Thematics;
