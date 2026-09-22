import { withPayload } from '@payloadcms/next/withPayload'
import dotenv from 'dotenv'

dotenv.config()

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

/**
 * Construit les remotePatterns pour next/image à partir des URLs connues.
 * Inclut toujours localhost (dev) + le serveur de production si NEXT_PUBLIC_SERVER_URL est défini.
 */
function buildRemotePatterns() {
  const patterns = [
    { protocol: 'http', hostname: 'localhost' },
    { protocol: 'https', hostname: 'localhost' },
  ]
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL
  if (serverURL) {
    try {
      const url = new URL(serverURL)
      patterns.push({
        protocol: url.protocol.replace(':', ''),
        hostname: url.hostname,
        ...(url.port ? { port: url.port } : {}),
      })
    } catch {
      // URL malformée — on ignore
    }
  }
  return patterns
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath,

  images: {
    remotePatterns: buildRemotePatterns(),
  },
}

export default withPayload(nextConfig)
