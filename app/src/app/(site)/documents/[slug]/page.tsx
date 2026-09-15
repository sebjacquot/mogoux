import { getPayload } from '@/utils/payload'
import { toAbsolute } from '@/utils/url'
import DocumentNav from '@/components/DocumentNav'
import Details from '@/components/Details'
import { notFound } from 'next/navigation'
import type { Document, Section, Thematic } from '@/payload-types'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function DocumentPage({ params }: Props) {
  const { slug } = await params

  const payload = await getPayload()

  const docRes = await payload
    .find({
      collection: 'documents',
      where: { slug: { equals: slug } },
      depth: 2,
      limit: 1,
    })
    .catch(() => null)

  if (!docRes || docRes.docs.length === 0) notFound()

  const doc = docRes.docs[0] as Document

  const previewMedia = doc.preview_audio_video as Document | null
  const originalSrc = toAbsolute(doc.url)
  const src = toAbsolute(doc.sizes?.preview?.url) || originalSrc

  const previewAudioVideo = toAbsolute(
    (previewMedia as any)?.sizes?.preview?.url || (previewMedia as any)?.url
  ) || null

  // Résoud la couleur de section pour chaque thématique
  const rawThematics = (doc.thematics ?? []) as (number | Thematic)[]
  const thematicIds = rawThematics
    .map((t) => (typeof t === 'number' ? String(t) : String(t.id)))

  let thematicsWithColor = rawThematics.map((t) =>
    typeof t === 'number' ? { id: t, title: '', slug: '', color: null, sectionId: null } : { ...t, color: null, sectionId: null }
  )

  if (thematicIds.length > 0) {
    const sectionsRes = await payload.find({ collection: 'sections', limit: 100 }).catch(() => null)
    if (sectionsRes) {
      thematicsWithColor = rawThematics.map((t) => {
        const thematic = typeof t === 'number' ? null : t
        const tid = typeof t === 'number' ? String(t) : String(t.id)
        const section = sectionsRes.docs.find((s: Section) =>
          ((s.thematics ?? []) as (number | Thematic)[]).some(
            (st) => String(typeof st === 'number' ? st : st.id) === tid
          )
        )
        return {
          id: thematic?.id ?? Number(tid),
          title: thematic?.title ?? '',
          slug: thematic?.slug ?? '',
          color: section?.color ?? null,
          sectionId: section?.id ?? null,
        }
      })
    }
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      <DocumentNav currentSlug={slug} />

      <Details
        title={doc.title}
        date={doc.date}
        description={doc.description}
        location={doc.location}
        credits_name={doc.credits_name}
        credits_link={doc.credits_link}
        tags={doc.physical_characteristics}
        type={doc.type}
        link_notice={doc.notice}
        src={src}
        originalSrc={originalSrc}
        legend={doc.legend}
        alt={doc.alt}
        preview_audio_video={previewAudioVideo}
        thematics={thematicsWithColor}
      />
    </div>
  )
}
