import { CollectionConfig } from "payload/types";

const Thematics: CollectionConfig = {
  slug: "thematics",
  fields: [
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
