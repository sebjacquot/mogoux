import { CollectionConfig } from "payload/types";

const Medias: CollectionConfig = {
  slug: "medias",
  fields: [
    {
      name: "url",
      label: "Url",
      type: "text",
      required: true,
    },
  ],
};

export default Medias;
