import { CollectionConfig } from "payload";
import path from 'path';

export const MetadataFiles: CollectionConfig = {
  slug: "metadata-files",
  admin: {
    useAsTitle: "filename",
    defaultColumns: ['filename', 'standard_name'],
  },
  defaultSort: "standard_name",
  labels: {
    singular: {
      en: 'Metadata file',
      fr: 'Fichier de métadonnées',
    },
    plural: {
      en: 'Metadata files',
      fr: 'Fichiers de métadonnées',
    },
  },
  access: {
    read: () => true,
  },
  timestamps: true,
  upload: {
    staticDir: path.resolve(process.cwd(), 'storage/metadata-files'),
    mimeTypes: [
      "application/pdf",
      "application/vnd.ms-excel",            // .xls (Excel ancien)
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx (Excel moderne)
      "application/vnd.ms-excel.sheet.macroEnabled.12", // .xlsm (Excel macro)
      "text/plain",
      "text/csv",
      "application/xml",        // EAD, Dublin Core (XML)
      "application/rdf+xml",    // Dublin Core (RDF)
      "application/ld+json",    // Dublin Core (JSON-LD)
      "application/tei+xml",    // TEI
    ]
  },
  fields: [
    {
      name: "standard_name",
      label: "Nom du standard",
      type: "text",
      required: true,
    },
  ],
};

export default MetadataFiles;