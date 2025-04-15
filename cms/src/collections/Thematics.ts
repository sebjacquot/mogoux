import { CollectionConfig } from "payload";
import {lexicalEditor} from "@payloadcms/richtext-lexical";
import {SlateToLexicalFeature} from "@payloadcms/richtext-lexical/migrate";

const Thematics: CollectionConfig = {
  slug: "thematics",
  admin: {
    useAsTitle: "title",
    defaultColumns: ['title', 'related_sections', 'rank', 'background_image', 'related_documents']
  },
  defaultSort: "title",
  labels: {
    singular: {
      en: 'Thematic',
      fr: 'Thématique',
    },
    plural: {
      en: 'Thematics',
      fr: 'Thématiques',
    },
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
            collection: "thematics",
            where: {
              // @ts-expect-error
              slug: { equals: req.routeParams.slug },
            },
          });

          if (!data.docs.length) {
            return Response.json({ error: "Thematics not found" }, { status: 404 });
          }

          return Response.json(data.docs[0]);
        } catch (error) {
          return Response.json({ error: "Internal Server Error" }, { status: 500 });
        }
      },
    },
    {
      path: "/by-ids",
      method: "post",
      handler: async (req) => {
        try {
          const { ids } = await req.json?.();

          if (!Array.isArray(ids) || ids.length === 0) {
            return Response.json({ error: "Missing or invalid IDs" }, { status: 400 });
          }

          const thematicsResult = await req.payload.find({
            collection: "thematics",
            where: {
              id: { in: ids },
            },
            depth: 2,
            limit: ids.length,
          });

          const thematicsWithDocs = [];

          for (const thematic of thematicsResult.docs) {
            const relatedDocumentsResult = await req.payload.find({
              collection: "documents",
              where: {
                thematics: {
                  equals: thematic.id,
                },
              },
              depth: 1,
              limit: 300,
            });

            thematicsWithDocs.push({
              ...thematic,
              related_documents: relatedDocumentsResult.docs,
            });
          }

          return Response.json(thematicsWithDocs);
        } catch (error) {
          console.error("Erreur dans l'endpoint /by-ids", error);
          return Response.json({ error: "Internal Server Error" }, { status: 500 });
        }
      }
    }
  ],
  fields: [
    {
      name: "title",
      label: "Titre",
      type: "text",
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
      name: "background_image",
      label: "Image de fond",
      type: "upload",
      relationTo: "documents",
      required: true,
    },
    {
      name: "rank",
      label: "Ordre",
      type: "number",
    },
    {
      name: "description",
      label: "Description",
      type: "richText",
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [...defaultFeatures, SlateToLexicalFeature({})],
      }),
    },
    {
      name: "related_documents",
      label: "Documents associés",
      type: "join",
      collection: "documents",
      on: "thematics",
    },
    {
      name: "related_sections",
      label: "Section associé",
      type: "join",
      collection: "sections",
      on: "thematics",
    }
  ],
};

export default Thematics;