import { CollectionConfig } from "payload/types";

export const Medias: CollectionConfig = {
  slug: "medias",
  admin: {
    useAsTitle: "filename",
  },
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
      label: "Légende",
      type: "text",
      required: false,
    },
    {
      name: "title",
      label: "Titre",
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
      name: "date",
      label: "Date",
      type: "text",
      required: false,
    },
    {
      name: "tag",
      label: "Tag",
      type: "array",
      minRows: 1,
      maxRows: 5,
      fields: [
        {
          name: "tag_name",
          label: "Nom du tag",
          type: "text",
          required: false,
        },
      ],
      required: false,
    },
    {
      name: "location",
      label: "Lieu",
      type: "group",
      fields: [
        {
          name: "location_name",
          label: "Nom du lieu",
          type: "text",
          required: false,
        },
        {
          name: "location_link",
          label: "lien du lieu",
          type: "text",
          required: false,
        },
      ],
    },
    {
      name: "credits",
      label: "Crédits",
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
