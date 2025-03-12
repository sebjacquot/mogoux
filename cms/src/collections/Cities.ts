import { CollectionConfig } from "payload";

import { SlateToLexicalFeature } from '@payloadcms/richtext-lexical/migrate'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

const Cities: CollectionConfig = {
  slug: "cities",
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
            collection: "cities",
            where: {
              // @ts-expect-error: req.routeParams est potentiellement undefined, vérifié dans le bloc try
              slug: { equals: req.routeParams.slug },
            },
          });

          if (!data.docs.length) {
            return Response.json({ error: "City not found" }, { status: 404 });
          }

          return Response.json(data.docs[0]);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          return Response.json({ error: "Internal Server Error" }, { status: 500 });
        }
      },
    },
  ],
  fields: [
    {
      name: "name",
      label: "Nom",
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
    },
    {
      name: "description",
      label: "Description",
      type: "richText",
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [...defaultFeatures, SlateToLexicalFeature({})],
      }),
    },
    {
      name: "thematics",
      label: "Thématiques",
      type: "relationship",
      relationTo: "thematics",
      hasMany: true,
    },
    {
      name: "medias",
      label: "Médias",
      type: "relationship",
      relationTo: "medias",
      hasMany: true,
    },
  ],
};

export default Cities;