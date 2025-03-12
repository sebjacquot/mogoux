import { CollectionConfig } from "payload";

export const Documents: CollectionConfig = {
  slug: "documents",
  admin: {
    useAsTitle: "filename",
  },
  access: {
    read: () => true,
  },
  timestamps: true,
  upload: {
    staticDir: "documents",
    mimeTypes: [
      "application/pdf",
      "application/vnd.ms-excel",
      "text/plain",
      "text/csv",
      "application/xml",
      "audio/mpeg",
      "audio/x-wav",
    ],
  },
  fields: [
    {
      name: "alt",
      label: "Texte alternatif",
      type: "text",
      required: false,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: false,
    },
  ],
};

export default Documents;