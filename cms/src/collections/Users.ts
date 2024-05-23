import { CollectionConfig } from "payload/types";

const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  fields: [
    {
      name: "username",
      label: "Nom d'utilisateur",
      type: "text",
    },
  ],
};

export default Users;
