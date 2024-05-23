import { CollectionConfig } from "payload/types";

export const Documents: CollectionConfig = {
  slug: "documents",
  admin: {
    useAsTitle: "filename",
  },
  access: {
    read: () => true,
  },
  upload: {
    staticURL: "/documents",
    staticDir: "documents",
    mimeTypes: ["application/xml"],
  },
  fields: [{ name: "alt", label: "Alt", type: "text", required: false }],
};

export default Documents;
