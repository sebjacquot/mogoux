/**
 * Helper pour accéder à Payload directement côté serveur (server components).
 * Évite les appels HTTP internes pour de meilleures performances.
 */
import { getPayload as _getPayload } from 'payload'
import config from '@payload-config'

let cached: Awaited<ReturnType<typeof _getPayload>> | null = null

export async function getPayload() {
  if (!cached) {
    cached = await _getPayload({ config })
  }
  return cached
}
