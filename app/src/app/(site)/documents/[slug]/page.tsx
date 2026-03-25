import { getPayload } from '@/utils/payload'
import DocumentNav from '@/components/DocumentNav'
import Details from '@/components/Details'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

const cmsBase = process.env.NEXT_PUBLIC_SERVER_URL || ''

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
  const src = doc.sizes?.preview?.url
    ? `${cmsBase}${doc.sizes.preview.url}`
    : doc.url
    ? `${cmsBase}${doc.url}`
    : ''

  const previewAudioVideo = doc.preview_audio_video?.sizes?.preview?.url
    ? `${cmsBase}${doc.preview_audio_video.sizes.preview.url}`
    : doc.preview_audio_video?.url
    ? `${cmsBase}${doc.preview_audio_video.url}`
    : null

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
        legend={doc.legend || ''}
        alt={doc.alt || ''}
        preview_audio_video={previewAudioVideo}
        thematics={doc.thematics || []}
      />
    </div>
  )
}
