import { withPayload } from '@payloadcms/next/withPayload'
import dotenv from 'dotenv'

dotenv.config()

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''


//ancien code qui fonctionnait

/** @type {import('next').NextConfig} */
const nextConfig = {
		
	// en Next 16 le compilateur TypeScript est plus strict, désactivation des erreurs pour l'instant, on verra plus tard si on corrige les sources ou non
//  typescript: {
   // ignoreBuildErrors: true,
  //},

  basePath,


  // tests en mode dev
  allowedDevOrigins: [
    'mogoux-dev-fanum.inframshe.univ-fcomte.fr',
    'fanum.univ-fcomte.fr'
  ],
	

//était nécessaire sur l'ancienne machine, à voir si on en a encore besoin	
//	Il y a notamment un warning de NextJS sur l'admin :
//	Cross origin request detected from mogoux-dev-fanum.inframshe.univ-fcomte.fr to /_next/* resource. In a future major version of Next.js, you will need to explicitly configure "allowedDevOrigins" in next.config to allow this.

	
/*	
	  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "mogoux-dev-fanum.inframshe.univ-fcomte.fr",
        "mogoux-dev-fanum.inframshe.univ-fcomte.fr:3000",
        "fanum.univ-fcomte.fr",
        "172.20.81.112"
      ],
      allowedForwardedHosts: [
        "fanum.univ-fcomte.fr",
       "mogoux-dev-fanum.inframshe.univ-fcomte.fr",
        "172.20.81.112"
      ],
    }
    },
  */
  
/*  routes: {
  admin: '/memoires-ouvrieres-goux-dev/admin',
  api: '/memoires-ouvrieres-goux-dev/api',
},*/
  
	


// Permet de servir les médias uploadés dans PayloadCMS depuis des URL absolues pointant vers des domaines externes
  /*images: {
    remotePatterns: [
     { protocol: 'http', hostname: 'localhost' },
    { protocol: 'https', hostname: 'localhost' },
    { protocol: 'http', hostname: 'fanum.univ-fcomte.fr' },
    { protocol: 'https', hostname: 'fanum.univ-fcomte.fr' },
    ],
*/



/** @type {import('next').NextConfig} */
//const nextConfig = {
//  basePath,


/*
  images: {
    remotePatterns: buildRemotePatterns(),
    */
    
    
    
      
}


// Cette modification casse toutes images
/**
 * Construit les remotePatterns pour next/image à partir des URLs connues.
 * Inclut toujours localhost (dev) + le serveur de production si NEXT_PUBLIC_SERVER_URL est défini.
 */
/*function buildRemotePatterns() {
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
*/


export default withPayload(nextConfig)
