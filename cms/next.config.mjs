import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => [
    {
      source: "/memoires-ouvrieres-goux/cms/api/:path*",
      destination: "/api/:path*",
    },
    {
      source: "/memoires-ouvrieres-goux/cms/admin/:path*",
      destination: "/admin/:path*",
    },
    {
      source: "/memoires-ouvrieres-goux/cms",
      destination: "/admin",
    }
  ]
}

export default withPayload(nextConfig)