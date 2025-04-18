import { CollectionConfig } from "payload";

import { SlateToLexicalFeature } from '@payloadcms/richtext-lexical/migrate'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

const ReferenceLocations: CollectionConfig = {
  slug: "reference-locations",
  admin: {
    useAsTitle: "name",
    defaultColumns: ['name', 'background_image', 'description', 'quote', 'related_documents']
  },
  defaultSort: "name",
  labels: {
    singular: {
      en: 'Reference Location',
      fr: 'Lieu de référence',
    },
    plural: {
      en: 'References Locations',
      fr: 'Lieux de référence',
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
          const referenceLocationsResult = await req.payload.find({
            collection: "reference-locations",
            where: {
              // @ts-expect-error
              slug: { equals: req.routeParams.slug },
            },
            depth: 2,
          });

          if (!referenceLocationsResult.docs.length) {
            return Response.json({ error: "Reference locations not found" }, { status: 404 });
          }

          const referenceLocations = referenceLocationsResult.docs[0];

          // Requête manuelle pour récupérer TOUS les documents liés à ce lieu de référence via location.location_reference
          const allRelatedDocuments = await req.payload.find({
            collection: "documents",
            where: {
              "location.location_reference": {
                equals: referenceLocations.id,
              },
            },
            limit: 300,
            depth: 1,
          });

          return Response.json({
            ...referenceLocations,
            related_documents: allRelatedDocuments.docs,
          });
        } catch (error) {
          console.error("Erreur dans l'endpoint reference-locations/slug/:slug :", error);
          return Response.json({ error: "Internal Server Error" }, { status: 500 });
        }
      },
    }
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
      name: "background_image",
      label: "Image de fond",
      type: "upload",
      relationTo: "medias",
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
      name: "quote",
      label: "Citation",
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
      on: "location.location_reference",
    }
  ],
};

export default ReferenceLocations;