import { getPayload } from '@/utils/payload'
import { toAbsolute } from '@/utils/url'
import Carousel from '@/components/Carousel'
import Return from '@/components/Return'
import { notFound } from 'next/navigation'
import { sortAndDisperseAudios } from '@/utils/sortGallery'
import type { Metadata } from 'next'
import type { Section, Thematic, Document, Media } from '@/payload-types'

type DocItem = {
  type: 'Image' | 'Audio' | 'Video'
  src: string
  alt: string
  slug: string
  titre: string
  preview_audio_video: string | null
}

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ section?: string }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { section: sectionId } = await searchParams
  if (!sectionId) return {}
  const payload = await getPayload()
  const sectionRes = await payload
    .findByID({ collection: 'sections', id: sectionId, depth: 0 })
    .catch(() => null)
  if (!sectionRes) return {}
  return {
    title: `${sectionRes.name} | Thématiques | Mémoires Ouvrières`,
  }
}

export default async function ThematiqueDetailPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { section: sectionId } = await searchParams

  if (!sectionId) notFound()

  const payload = await getPayload()

  const sectionRes = await payload.findByID({
    collection: 'sections',
    id: sectionId,
    depth: 2,
  }).catch(() => null)

  if (!sectionRes) notFound()
  const section = sectionRes as Section

  const thematicIds = ((section.thematics ?? []) as (number | Thematic)[]).map((t) =>
    typeof t === 'number' ? String(t) : String(t.id)
  )

  const thematicsRes = await payload.find({
    collection: 'thematics',
    where: { id: { in: thematicIds } },
    depth: 2,
    limit: thematicIds.length || 1,
  })

  // Récupère les documents de chaque thématique
  const thematicsWithDocs = await Promise.all(
    thematicsRes.docs.map(async (t) => {
      const docsRes = await payload.find({
        collection: 'documents',
        where: { thematics: { equals: t.id } },
        depth: 1,
        limit: 300,
      })
      return { ...t, related_documents: docsRes.docs as Document[] }
    }),
  )

  const sorted = [...thematicsWithDocs].sort((a, b) =>
    (a.rank ?? Infinity) - (b.rank ?? Infinity)
  )

  const listThematics = sorted.map((t) => {
    const bg = typeof t.background_image === 'object' && t.background_image
      ? t.background_image as Media
      : null
    return {
      src: toAbsolute(bg?.url),
      title: t.title,
      slug: t.slug,
      alt: bg?.filename ?? t.title,
      couleur: section.color,
      documents: sortAndDisperseAudios<DocItem>(
        t.related_documents.map((doc): DocItem => {
          const previewMedia = doc.preview_audio_video as Media | null
          return {
            type: doc.type,
            src: toAbsolute(doc.sizes?.preview?.url || doc.url),
            alt: doc.alt,
            slug: doc.slug,
            titre: doc.title,
            preview_audio_video: toAbsolute(
              previewMedia?.sizes?.preview?.url || previewMedia?.url
            ) || null,
          }
        }),
      ),
    }
  })

  return (
    <>
      <Return linkURL="/thematiques" linkText="Retourner aux thématiques" />
      <div className="flex justify-center w-screen pt-20">
        <div className="w-[98vw]">
          <div className="flex justify-center items-center gap-3 my-6">
            <span
              className="inline-block w-4 h-4 rounded-sm flex-shrink-0"
              style={{ backgroundColor: section.color }}
            />
            <h1
              className="text-center font-bold"
              style={{ color: section.color, fontSize: 'clamp(20px, 5vw, 30px)' }}
            >
              {section.name}
            </h1>
          </div>
          <Carousel thematics={listThematics} initialSlug={slug} />
        </div>
      </div>
    </>
  )
}
