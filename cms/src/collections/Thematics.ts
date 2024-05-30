import payload from "payload";
import { CollectionConfig } from "payload/types";

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
      handler: async (req, res, next) => {
        const data = await payload.find({
          collection: "thematics",
          where: {
            slug: { equals: req.params.slug },
          },
        });

        if (data.docs.length === 0) {
          res.status(404).send({ error: "thematics not found" });
        }
        res.status(200).send(data.docs[0]);
      },
    },
  ],
  fields: [
    {
      name: "backgroundImage", // required
      type: "upload", // required
      relationTo: "medias", // required
      required: true,
    },
    {
      name: "slug",
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
      label: "Medias",
      type: "relationship",
      relationTo: "medias",
      hasMany: true,
      required: true,
    },
  ],
};

export default Thematics;
