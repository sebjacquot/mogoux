import payload from "payload";
import { CollectionConfig } from "payload/types";

export const Medias: CollectionConfig = {
  slug: "medias",
  admin: {
    useAsTitle: "slug",
  },
  access: {
    read: () => true,
  },
  endpoints: [
    {
      path: "/slug/:slug",
      method: "get",
      handler: async (req, res, next) => {
        const data = await payload.find({
          collection: "medias",
          where: {
            slug: { equals: req.params.slug },
          },
        });

        if (data.docs.length === 0) {
          res.status(404).send({ error: "media not found" });
        }
        res.status(200).send(data.docs[0]);
      },
    },
  ],
  upload: {
    staticURL: "/medias",
    staticDir: "medias",
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*", "audio/mpeg", "audio/x-wav", "video/*"],
  },
  fields: [
    {
      name: "identification",
      label: "Identification",
      type: "group",
      fields: [
        {
          name: "cote",
          label: "Cote",
          type: "text",
          required: true,
          unique: true,
        },
        {
          name: "title",
          label: "Intitulé",
          type: "text",
          required: true,
        },
        {
          name: "date",
          label: "Date",
          type: "text",
          required: true,
        },
        {
          name: "tag",
          label: "Description physique",
          type: "array",
          minRows: 1,
          maxRows: 5,
          fields: [
            {
              name: "tag_name",
              label: "Nom du tag",
              type: "text",
              required: true,
            },
          ],
          required: true,
        },
      ],
    },
    {
      name: "contexte",
      label: "Contexte",
      type: "group",
      fields: [
        {
          name: "credits_name",
          label: "Producteur",
          type: "text",
          required: true,
        },
        {
          name: "credits_link",
          label: "Lien du crédit",
          type: "text",
          required: false,
        },
        {
          name: "modality",
          label: "Modalités d'entrée",
          type: "text",
          required: false,
          unique: true,
        },
      ],
    },
    {
      name: "access_and_use",
      label: "Accès et utilisation",
      type: "group",
      fields: [
        {
          name: "access_condition",
          label: "Conditions d'accès",
          type: "textarea",
          required: false,
        },
        {
          name: "reproduction_condition",
          label: "Conditions de reproduction",
          type: "textarea",
          required: false,
        },
      ],
    },
    {
      name: "other_references",
      label: "Autres références",
      type: "group",
      fields: [
        {
          name: "conservation_location",
          label: "Lieu de conservation",
          type: "textarea",
          required: false,
        },
        {
          name: "complementary_sources",
          label: "Sources complémentaires",
          type: "textarea",
          required: false,
        },
        {
          name: "bibliography",
          label: "Bibliographie",
          type: "textarea",
          required: false,
        },
        {
          name: "notes",
          label: "Notes",
          type: "textarea",
          required: false,
        },
      ],
    },
    {
      name: "contributor",
      label: "Contributeur",
      type: "textarea",
      required: true,
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      required: true,
      unique: true,
    },

    {
      name: "alt",
      label: "Alt",
      type: "text",
      required: true,
    },
    {
      name: "legend",
      label: "Légende",
      type: "text",
      required: true,
    },

    {
      name: "description",
      label: "Description",
      type: "textarea",
      maxLength: 310,
      required: true,
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
          required: true,
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
      required: true,
    },
    {
      name: "notice",
      label: "Lien vers la notice OmekaS",
      type: "text",
      required: false,
    },
  ],
};

export default Medias;
