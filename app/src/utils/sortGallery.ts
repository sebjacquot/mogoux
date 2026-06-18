interface SortableDoc {
  type: string
  slug: string
  [key: string]: any
}

/**
 * Trie les documents d'une galerie :
 * 1. Les non-audios sont triés alphabétiquement par slug (= cote)
 * 2. Les audios sont dispersés aléatoirement parmi les non-audios
 */
export function sortAndDisperseAudios<T extends SortableDoc>(docs: T[]): T[] {
  const nonAudios = docs.filter((d) => d.type !== 'Audio').sort((a, b) =>
    a.slug.localeCompare(b.slug, 'fr', { numeric: true }),
  )
  const audios = [...docs.filter((d) => d.type === 'Audio')].sort(() => Math.random() - 0.5)

  if (audios.length === 0) return nonAudios
  if (nonAudios.length === 0) return audios

  const result: T[] = []
  const gap = Math.ceil(nonAudios.length / (audios.length + 1))
  let audioIdx = 0

  for (let i = 0; i < nonAudios.length; i++) {
    if (audioIdx < audios.length && i > 0 && i % gap === 0) {
      result.push(audios[audioIdx++])
    }
    result.push(nonAudios[i])
  }
  while (audioIdx < audios.length) {
    result.push(audios[audioIdx++])
  }

  return result
}

/**
 * Groupe les documents par section puis trie et disperse les audios au sein
 * de chaque groupe. Retourne la liste aplatie dans l'ordre des sections.
 */
export function sortBySection<T extends SortableDoc>(
  docs: T[],
  getSectionRank: (doc: T) => number,
): T[] {
  const grouped = new Map<number, T[]>()

  for (const doc of docs) {
    const rank = getSectionRank(doc)
    if (!grouped.has(rank)) grouped.set(rank, [])
    grouped.get(rank)!.push(doc)
  }

  const sortedRanks = [...grouped.keys()].sort((a, b) => a - b)
  return sortedRanks.flatMap((rank) => sortAndDisperseAudios(grouped.get(rank)!))
}
