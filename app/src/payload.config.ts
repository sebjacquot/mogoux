import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { fr } from '@payloadcms/translations/languages/fr'
import { en } from '@payloadcms/translations/languages/en'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import path from 'path'

import { Users } from '@/collections/Users'
import Sections from '@/collections/Sections'
import Thematics from '@/collections/Thematics'
import ReferenceLocations from '@/collections/ReferenceLocations'
import MetadataFiles from '@/collections/MetadataFiles'
import { Documents } from '@/collections/Documents'
import Medias from '@/collections/Medias'
import DocumentTypes from '@/collections/DocumentTypes'
import MaterialTypesAndFormats from '@/collections/MaterialTypesAndFormats'
import Colors from '@/collections/Colors'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export default buildConfig({
  i18n: {
    supportedLanguages: { fr, en },
  },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname, 'app'),
    },
    components: {
      graphics: {
        Logo: '@/components/cms/AdminLogo',
        Icon: '@/components/cms/AdminIcon',
      },
      beforeDashboard: ['@/components/cms/AdminDashboard'],
      views: {
        ImportDocumentsView: {
          Component: '@/components/cms/importDocumentsFrom/ImportDocumentsFormView#ImportDocumentsFormView',
          path: '/import-documents',
        },
      },
    },
  },
  collections: [
    Users,
    Sections,
    Thematics,
    ReferenceLocations,
    Documents,
    Medias,
    MetadataFiles,
    DocumentTypes,
    MaterialTypesAndFormats,
    Colors,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  csrf: [serverURL],
  cors: [serverURL],
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
  ],
})
