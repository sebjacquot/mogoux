import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {

  basePath: "/memoires-ouvrieres-goux/cms",

  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000","172.20.81.117", "fanum.univ-fcomte.fr" ],
      allowedForwardedHosts: ["172.20.81.117", "fanum.univ-fcomte.fr"],
      bodySizeLimit: '200mb',
      // ^ You might have to use this property depending on your exact version.
    }
  },

    rewrites: async () => [
  /*{
    source: "/memoires-ouvrieres-goux/cms/api/:path*",
    destination: "/api/:path*",
  },
  {
    source: "/memoires-ouvrieres-goux/cms/admin/:path*",
    destination: "/admin/:path*",
  },*/
  {
    source: "/",
    destination: "/admin",
  }
]
}

export default withPayload(nextConfig)