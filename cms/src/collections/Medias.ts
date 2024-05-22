import { CollectionConfig } from "payload/types";

export const Medias: CollectionConfig = {
  slug: "medias",
  access: {
    read: () => true,
  },
  upload: {
    staticURL: "/medias",
    staticDir: "medias",
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
      },
      {
        name: "card",
        width: 768,
        height: 1024,
        position: "centre",
      },
      {
        name: "tablet",
        width: 1024,
        // By specifying `undefined` or leaving a height undefined,
        // the image will be sized to a certain width,
        // but it will retain its original aspect ratio
        // and calculate a height automatically.
        height: undefined,
        position: "centre",
      },
    ],
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      label: "Alt",
      type: "text",
      required: false,
    },
    {
      name: "legend",
      label: "Legend",
      type: "text",
      required: false,
    },
    {
      name: "title",
      label: "Title",
      type: "text",
      required: false,
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      required: false,
    },
    {
      name: "credits",
      label: "Credits",
      type: "text",
      required: false,
    },
    {
      name: "date",
      label: "Date",
      type: "text",
      required: false,
    },
    {
      name: "type",
      label: "Type",
      type: "select",
      options: [
        {
          label: "Image",
          value: "image",
        },
        {
          label: "Video",
          value: "video",
        },
        {
          label: "Audio",
          value: "audio",
        },
      ],
      required: false,
    },
  ],
};

export default Medias;
