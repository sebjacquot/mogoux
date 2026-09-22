const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || ''

/**
 * Rend une URL absolue si elle est relative.
 * Payload CMS retourne parfois des chemins relatifs selon la config serverURL.
 */
export function toAbsolute(url: string | null | undefined): string {
  if (!url) return ''
  if (url.startsWith('http')) return url
  return `${serverURL}${url}`
}
