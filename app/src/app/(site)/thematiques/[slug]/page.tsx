import { getPayload } from '@/utils/payload'
import Carousel from '@/components/Carousel'
import Return from '@/components/Return'
import { notFound } from 'next/navigation'
import { sortAndDisperseAudios } from '@/utils/sortGallery'

export const dynamic = 'force-dynamic'

const base = process.env.NEXT_PUBLIC_BASE_PATH || ''
const cmsBase = process.env.NEXT_PUBLIC_SERVER_URL || ''

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ section?: string }>
}

export default async function ThematiqueDetailPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { section: sectionId } = await searchParams

  if (!sectionId) notFound()

  const payload = await getPayload()

  // Fetch section
  const sectionRes = await payload.findByID({
    collection: 'sections',
    id: sectionId,
    depth: 2,
  }).catch(() => null)

  if (!sectionRes) notFound()
  const section: any = sectionRes

  // Fetch thematics for this section
  const thematicIds: string[] = (section.thematics || []).map((t: any) =>
    typeof t === 'string' ? t : t.id,
  )

  const thematicsRes = await payload.find({
    collection: 'thematics',
    where: { id: { in: thematicIds } },
    depth: 2,
    limit: thematicIds.length || 1,
  })

  // For each thematic, fetch related documents
  const thematicsWithDocs = await Promise.all(
    thematicsRes.docs.map(async (t: any) => {
      const docsRes = await payload.find({
        collection: 'documents',
        where: { thematics: { equals: t.id } },
        depth: 1,
        limit: 300,
      })
      return { ...t, related_documents: docsRes.docs }
    }),
  )

  // Sort by rank
  const sorted = [...thematicsWithDocs].sort((a: any, b: any) => {
    return (a.rank ?? Infinity) - (b.rank ?? Infinity)
  })

  const listThematics = sorted.map((t: any) => ({
    src: t.background_image?.url ? `${cmsBase}${t.background_image.url}` : '',
    title: t.title || '',
    slug: t.slug || '',
    alt: t.background_image?.alt || '',
    couleur: section.color || '',
    documents: sortAndDisperseAudios(
      (t.related_documents || []).map((doc: any) => ({
        type: doc.type,
        src: doc.sizes?.preview?.url
          ? `${cmsBase}${doc.sizes.preview.url}`
          : `${cmsBase}${doc.url || ''}`,
        alt: doc.alt || '',
        slug: doc.slug || '',
        titre: doc.title || '',
        preview_audio_video: doc.preview_audio_video?.sizes?.preview?.url
          ? `${cmsBase}${doc.preview_audio_video.sizes.preview.url}`
          : doc.preview_audio_video?.url
          ? `${cmsBase}${doc.preview_audio_video.url}`
          : null,
      })),
    ),
  }))

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
              {section.name || 'Rubrique introuvable'}
            </h1>
          </div>
          <Carousel thematics={listThematics} initialSlug={slug} />
        </div>
      </div>
    </>
  )
}
