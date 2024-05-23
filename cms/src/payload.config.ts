import path from "path";

import { payloadCloud } from "@payloadcms/plugin-cloud";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";

import Users from "./collections/Users";
import Thematics from "./collections/Thematics";
import Medias from "./collections/Medias";
import Cities from "./collections/Cities";
import Documents from "./collections/Documents";

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [Users, Medias, Thematics, Cities, Documents],
  csrf: [
    // whitelist of domains to allow cookie auth from
    "http://localhost:4321",
    "http://localhost:3000",
  ],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  plugins: [payloadCloud()],
  db: postgresAdapter({
    pool: {
      connectionString: "postgres://thomas:test@localhost:5432/gou_db",
    },
  }),
});
