import { CollectionConfig } from "payload";

export const Medias: CollectionConfig = {
  slug: "medias",
  admin: {
    useAsTitle: "filename",
  },
  access: {
    read: () => true,
  },
  endpoints: [
    {
      path: "/slug/:slug",
      method: "get",
      handler: async (req) => {
        try {
          const data = await req.payload.find({
            collection: "medias",
            where: {
              // @ts-expect-error: req.routeParams est potentiellement undefined, vérifié dans le bloc try
              slug: { equals: req.routeParams.slug },
            },
          });

          if (!data.docs.length) {
            return Response.json({ error: "Media not found" }, { status: 404 });
          }

          return Response.json(data.docs[0]);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          return Response.json({ error: "Internal Server Error" }, { status: 500 });
        }
      },
    },
  ],
  upload: {
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
          label: "Lien du lieu",
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
          label: "Vidéo",
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