import { getPayload } from '@/utils/payload'
import DocumentNav from '@/components/DocumentNav'
import Details from '@/components/Details'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'


interface Props {
  params: Promise<{ slug: string }>
}

export default async function DocumentPage({ params }: Props) {
  const { slug } = await params

  const payload = await getPayload()

  // Fetch document by slug
  const docRes = await payload
    .find({
      collection: 'documents',
      where: { slug: { equals: slug } },
      depth: 2,
      limit: 1,
    })
    .catch(() => null)

  if (!docRes || docRes.docs.length === 0) notFound()

  const doc: any = docRes.docs[0]

  // Build media src (full absolute URL)
  const originalSrc = doc.url || ''
  const src = doc.sizes?.preview?.url || originalSrc

  const previewAudioVideo = doc.preview_audio_video?.sizes?.preview?.url
    || doc.preview_audio_video?.url
    || null

  // Fetch sections to resolve thematic colors
  const thematicIds: string[] = (doc.thematics || []).map((t: any) =>
    typeof t === 'string' ? t : t.id,
  )
  let thematicsWithColor: any[] = doc.thematics || []
  if (thematicIds.length > 0) {
    const sectionsRes = await payload.find({ collection: 'sections', limit: 100 }).catch(() => null)
    if (sectionsRes) {
      thematicsWithColor = (doc.thematics || []).map((t: any) => {
        const tid = String(typeof t === 'string' ? t : t.id)
        const section = sectionsRes.docs.find((s: any) =>
          (s.thematics || []).some((st: any) => String(typeof st === 'string' ? st : st.id) === tid),
        )
        return { ...t, color: section?.color || null, sectionId: section?.id || null }
      })
    }
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      {/* Client component: handles return button + prev/next from sessionStorage */}
      <DocumentNav currentSlug={slug} />

      <Details
        title={doc.title || ''}
        date={doc.date || ''}
        description={doc.description || null}
        location={doc.location || ''}
        credits_name={doc.credits_name || ''}
        credits_link={doc.credits_link || ''}
        tags={doc.physical_characteristics || []}
        type={doc.type || 'Image'}
        link_notice={doc.notice || ''}
        src={src}
        originalSrc={originalSrc}
        legend={doc.legend || ''}
        alt={doc.alt || ''}
        preview_audio_video={previewAudioVideo}
        thematics={thematicsWithColor}
      />
    </div>
  )
}
