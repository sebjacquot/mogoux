import { withPayload } from '@payloadcms/next/withPayload'
import dotenv from 'dotenv'

dotenv.config()

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath,
  // Permet de servir les médias uploadés dans PayloadCMS
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
}

export default withPayload(nextConfig)
