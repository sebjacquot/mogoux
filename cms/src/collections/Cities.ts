import payload from "payload";
import { CollectionConfig } from "payload/types";

const Cities: CollectionConfig = {
  access: {
    read: () => true,
  },
  slug: "cities",
  endpoints: [
    {
      path: "/slug/:slug",
      method: "get",
      handler: async (req, res, next) => {
        const data = await payload.find({
          collection: "cities",
          where: {
            slug: { equals: req.params.slug },
          },
        });

        if (data.docs.length === 0) {
          res.status(404).send({ error: "cities not found" });
        }
        res.status(200).send(data.docs[0]);
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
    },
    {
      name: "thematics",
      label: "Thematiques",
      type: "relationship",
      relationTo: "thematics",
      hasMany: true,
    },
    {
      name: "medias",
      label: "Medias",
      type: "relationship",
      relationTo: "medias",
      hasMany: true,
    },
  ],
};

export default Cities;
