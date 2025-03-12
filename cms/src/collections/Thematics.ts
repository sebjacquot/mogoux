import { CollectionConfig } from "payload";

const Thematics: CollectionConfig = {
  slug: "thematics",
  admin: {
    useAsTitle: "title",
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
              // @ts-expect-error: req.routeParams est potentiellement undefined, vérifié dans le bloc try
              slug: { equals: req.routeParams.slug },
            },
          });

          if (!data.docs.length) {
            return Response.json({ error: "Thematics not found" }, { status: 404 });
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
      name: "backgroundImage",
      label: "Image de fond",
      type: "upload",
      relationTo: "medias",
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
      name: "title",
      label: "Titre",
      type: "text",
      required: true,
    },
    {
      name: "color",
      label: "Couleur",
      type: "text",
      required: true,
    },
    {
      name: "medias",
      label: "Médias associés",
      type: "relationship",
      relationTo: "medias",
      hasMany: true,
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: false,
    },
  ],
};

export default Thematics;