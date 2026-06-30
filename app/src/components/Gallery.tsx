import GalleryItem from './GalleryItem'

interface DocItem {
  type: 'Image' | 'Audio' | 'Video'
  src: string
  alt: string
  slug: string
  titre: string
  preview_audio_video: string | null
}

interface Props {
  documents: DocItem[]
}

// Blocs layouts: nombre de tuiles par bloc (cycle)
const BLOC_TILES = [5, 3, 5, 6, 3, 6]

function buildBlocs(docs: DocItem[]) {
  const blocs: { docs: DocItem[]; layout: number }[] = []
  let i = 0
  let b = 0
  while (i < docs.length) {
    const tile = BLOC_TILES[b % BLOC_TILES.length]
    const chunk = docs.slice(i, i + tile)
    blocs.push({ docs: chunk, layout: b % BLOC_TILES.length })
    i += chunk.length
    b++
  }
  return blocs
}

export default function Gallery({ documents }: Props) {
  if (!documents || documents.length === 0) return null
  const blocs = buildBlocs(documents)
  const allSlugs = documents.map((d) => d.slug)

  return (
    <>
      <hr className="w-1/5 my-5 border border-white rounded bg-white mx-auto" />
      <section className="grid gap-1" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(330px,100%),1fr))' }}>
        {blocs.map((bloc, bi) => (
          <BlocLayout key={bi} layout={bloc.layout} docs={bloc.docs} allSlugs={allSlugs} />
        ))}
      </section>
    </>
  )
}

function BlocLayout({ layout, docs, allSlugs }: { layout: number; docs: DocItem[]; allSlugs: string[] }) {
  // All bloc layouts share same container approach, varying only row proportions
  const rowsConfig: Record<number, { rows: number[][] }> = {
    0: { rows: [[0], [1, 2], [3, 4]] },         // Bloc1: 1 + 2 + 2
    1: { rows: [[0, 1, 2]] },                     // Bloc2: 3
    2: { rows: [[0], [1, 2], [3, 4]] },           // Bloc3: same as Bloc1
    3: { rows: [[0, 1], [2, 3], [4, 5]] },        // Bloc4: 2+2+2
    4: { rows: [[0, 1, 2]] },                     // Bloc5: 3
    5: { rows: [[0, 1], [2, 3], [4, 5]] },        // Bloc6: 2+2+2
  }

  const config = rowsConfig[layout]

  return (
    <div className="flex flex-col gap-1">
      {config.rows.map((row, ri) => (
        <div key={ri} className="flex gap-1" style={{ height: 290 / config.rows.length + 'px' }}>
          {row.map((docIdx) => {
            const doc = docs[docIdx]
            if (!doc) return <div key={docIdx} className="flex-1" />
            return (
              <div key={docIdx} className="flex-1 overflow-hidden rounded-sm">
                <GalleryItem document={doc} allSlugs={allSlugs} />
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
