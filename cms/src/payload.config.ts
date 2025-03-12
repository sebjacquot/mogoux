// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { fr } from '@payloadcms/translations/languages/fr'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import sharp from 'sharp'
import path from 'path'

import { Users } from '@/collections/Users'
import { Medias } from '@/collections/Medias'
import Thematics from '@/collections/Thematics'
import Cities from '@/collections/Cities'
import Sections from '@/collections/Sections'
import Documents from '@/collections/Documents'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  i18n: {
    supportedLanguages: { fr },
  },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Medias, Thematics, Cities, Sections, Documents],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  routes: {
    api: '/memoires-ouvrieres-goux/cms/api',
    admin: '/memoires-ouvrieres-goux/cms/admin'
  },
  csrf: [
    // whitelist of domains to allow cookie auth from
    "http://localhost:4321",
    "http://localhost:3000",
    "http://mogoux-fanum.inframshe.univ-fcomte.fr",
    "https://mogoux-fanum.inframshe.univ-fcomte.fr",
    "https://fanum.univ-fcomte.fr"
  ],
  cors: [
    // whitelist of domains to allow CORS from
    "http://localhost:4321",
    "http://localhost:3000",
    "http://mogoux-fanum.inframshe.univ-fcomte.fr",
    "https://mogoux-fanum.inframshe.univ-fcomte.fr",
    "https://fanum.univ-fcomte.fr"
  ],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
