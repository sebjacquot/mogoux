import { withPayload } from '@payloadcms/next/withPayload'
import dotenv from 'dotenv'

dotenv.config()

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath,
	
	
	
/*
était nécessaire sur l'ancienne machine, à voir si on en a encore besoin	
	Il y a botamment un warning de NextJS sur l'admin :
	Cross origin request detected from mogoux-dev-fanum.inframshe.univ-fcomte.fr to /_next/* resource. In a future major version of Next.js, you will need to explicitly configure "allowedDevOrigins" in next.config to allow this.

	
	  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "mogoux-dev-fanum.inframshe.univ-fcomte.fr",
        "mogoux-dev-fanum.inframshe.univ-fcomte.fr:3000",
        "fanum.univ-fcomte.fr",
        "172.20.81.117"
      ],
      allowedForwardedHosts: [
        "fanum.univ-fcomte.fr",
        "172.20.81.117"
      ],
    }
  },
  */
  
/*  routes: {
  admin: '/memoires-ouvrieres-goux-dev/admin',
  api: '/memoires-ouvrieres-goux-dev/api',
},*/
  
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
