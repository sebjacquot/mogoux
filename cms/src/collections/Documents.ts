import { CollectionConfig } from "payload";
import { checkSlug } from '@/hooks/checkSlug';

export const Documents: CollectionConfig = {
  slug: "documents",
  admin: {
    useAsTitle: "filename",
    defaultColumns: ['filename', 'reference_code', 'title', 'thematics', 'location_reference'],
    components: {
      beforeListTable: ['/components/DocumentsActions'],
      },
  },
  defaultSort: "filename",
  labels: {
    singular: {
      en: 'Document',
      fr: 'Document',
    },
    plural: {
      en: 'Documents',
      fr: 'Documents',
    },
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
  },
  endpoints: [
    {
      path: "/slug/:slug",
      method: "get",
      handler: async (req) => {
        try {
          const result = await req.payload.find({
            collection: "documents",
            where: {
              slug: {
                // @ts-ignore
                equals: req.routeParams.slug,
              },
            },
          });

          if (!result.docs.length) {
            return Response.json({ error: "Document not found" }, { status: 404 });
          }

          const document = result.docs[0];

          // Injecter les couleurs dans chaque thématique
          const thematicsWithColors = await Promise.all(
              // @ts-ignore
              document.thematics.map(async (thematic) => {
                // @ts-ignore
                const sectionIDs = thematic?.related_sections?.docs || [];

                // @ts-ignore
                if (!sectionIDs.length) return { ...thematic, color: null };

                // On suppose qu'on prend la couleur de la première section liée
                const firstSectionID = sectionIDs[0];

                const section = await req.payload.findByID({
                  collection: "sections",
                  id: firstSectionID,
                });

                return {
                  // @ts-ignore
                  ...thematic,
                  color: section?.color || null,
                };
              })
          );

          return Response.json({
            ...document,
            thematics: thematicsWithColors,
          });
        } catch (error) {
          console.error("Erreur dans /slug/:slug", error);
          return Response.json({ error: "Internal Server Error" }, { status: 500 });
        }
      },
    },
  ],
  upload: {
    	// SJ: fix seek in mp3 audio on Chrome/Edge by adding "Accept-Ranges = bytes" to response header.
      modifyResponseHeaders: ({ headers }) => {
        const newHeaders = new Headers(headers) // Copy existing headers
        newHeaders.set('Accept-Ranges', 'bytes') // Set new header
      return newHeaders
    },
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*", "audio/mpeg", "audio/x-wav", "video/*"],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 140,
        height: undefined,
      },
      {
        name: "preview",
        width: 500,
        height: undefined,
      }
    ],
  },
  fields: [
    {
      name: "reference_code",
      label: "Cote",
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
      hooks: {
        beforeValidate: [checkSlug('documents')],
      },
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
      name: "type",
      label: "Type de document",
      type: "select",
      options: [
        {
          label: "Image",
          value: "Image",
        },
        {
          label: "Vidéo",
          value: "Video",
        },
        {
          label: "Audio",
          value: "Audio",
        },
      ],
      required: true,
    },
    {
      name: "physical_characteristics",
      label: "Caractéristiques physiques",
      type: "group",
      fields: [
        {
          name: "document_types",
          label: "Type du document",
          type: "relationship",
          relationTo: "document-types",
          hasMany: false,
          required: true,
        },
        {
          name: "material_types_and_formats",
          label: "Support et format",
          type: "relationship",
          relationTo: "material-types-and-formats",
          hasMany: false,
        },
        {
          name: "colors",
          label: "Couleur",
          type: "relationship",
          relationTo: "colors",
          hasMany: false,
        }
      ]
    },
    {
      name: "preview_audio_video",
      label: "Image d'aperçu pour l'audio ou la vidéo",
      type: "upload",
      relationTo: "medias",
    },
    {
      name: "credits_name",
      label: "Crédit",
      type: "text",
      required: true,
    },
    {
      name: "credits_link",
      label: "URL lié au crédit",
      type: "text",
      required: false,
    },
    {
      name: "thematics",
      label: "Thématiques associés",
      type: "relationship",
      relationTo: "thematics",
      hasMany: true,
    },
    {
      name: "legend",
      label: "Légende",
      type: "text",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
    },
    {
      name: "alt",
      label: "Texte alternatif",
      type: "text",
      required: true,
    },
    {
      name: "location",
      label: "Lieu",
      type: "group",
      fields: [
        {
          name: "location_reference",
          label: "Lieu de référence",
          type: "relationship",
          relationTo: "reference-locations",
        },
        {
          name: "location_details",
          label: "Précision sur le lieu",
          type: "text",
        },
        {
          name: "location_link",
          label: "URL vers notice externe du lieu",
          type: "text",
        },
      ],
    },
    {
      name: "notice",
      label: "Lien vers notice externe du document",
      type: "text",
      required: false,
    },
  ],
};

export default Documents;
