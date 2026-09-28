const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || ''

/**
 * Rend une URL absolue si elle est relative.
 * Payload CMS retourne parfois des chemins relatifs selon la config serverURL alors que next/image a besoin d'URLs absolues.
 */
// force l'utilisation de NEXT_PUBLIC_SERVER_URL ce qui casse le backoffice
/*export function toAbsolute(url: string | null | undefined): string {
  if (!url) return ''
  if (url.startsWith('http')) return url
  return `${serverURL}${url}`
}*/


// tests Claude pour fix le problème
// utils/url.ts
/*export function toAbsolute(url: string | null | undefined): string {
  if (!url) return ''
  if (url.startsWith('http')) return url
  
  // Côté navigateur : utiliser window.location.origin
  if (typeof window !== 'undefined') {
    return `${window.location.origin}${url}`
  }
  
  // Côté serveur : utiliser NEXT_PUBLIC_SERVER_URL ou vide
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || ''
  return `${serverURL}${url}`
}*/


export function toAbsolute(url: string | null | undefined): string {
  if (!url) return ''
  // Si déjà absolu → extraire juste le chemin relatif
  if (url.startsWith('http')) {
    try {
      return new URL(url).pathname
    } catch {
      return url
    }
  }
  return url
}

