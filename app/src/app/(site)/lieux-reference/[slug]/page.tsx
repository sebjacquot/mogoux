import { getPayload } from '@/utils/payload'
import { notFound } from 'next/navigation'
import Return from '@/components/Return'
import ImageTooltip from '@/components/ImageTooltip'
import Gallery from '@/components/Gallery'
import LieuReferenceToggle from '@/components/LieuReferencePage'
import { renderLexicalToHTML } from '@/utils/renderLexical'

export const dynamic = 'force-dynamic'

const base = process.env.NEXT_PUBLIC_BASE_PATH || ''
const cmsBase = process.env.NEXT_PUBLIC_SERVER_URL || ''

interface Props {
  params: Promise<{ slug: string }>
}

export default async function LieuReferencePage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload()

  // Fetch reference location by slug
  const refRes = await payload
    .find({
      collection: 'reference-locations',
      where: { slug: { equals: slug } },
      depth: 3,
      limit: 1,
    })
    .catch(() => null)

  if (!refRes || refRes.docs.length === 0) notFound()

  const referenceLocation: any = refRes.docs[0]

  // Fetch sections for gallery
  const sectionsRes = await payload.find({
    collection: 'sections',
    limit: 100,
    sort: 'rank',
  })
  const sections = sectionsRes.docs

  // Build documents list for Gallery
  // related_documents est un champ "join" Payload → { docs: [...], hasNextPage: bool }
  const documents = (referenceLocation.related_documents?.docs || [])
    .map((doc: any) => {
      if (!doc) return null

      const previewAudioVideoUrl = doc.preview_audio_video?.sizes?.preview?.url
        ? `${cmsBase}${doc.preview_audio_video.sizes.preview.url}`
        : doc.preview_audio_video?.url
        ? `${cmsBase}${doc.preview_audio_video.url}`
        : null

      const src = doc.sizes?.preview?.url
        ? `${cmsBase}${doc.sizes.preview.url}`
        : doc.url
        ? `${cmsBase}${doc.url}`
        : null

      if (!src) return null

      return {
        type: doc.type ?? '',
        src,
        alt: doc.alt ?? '',
        slug: doc.slug ?? '',
        titre: doc.title ?? '',
        preview_audio_video: previewAudioVideoUrl,
      }
    })
    .filter(Boolean)

  // Render lexical content
  const descriptionHtml = referenceLocation?.description?.root?.children
    ? renderLexicalToHTML(referenceLocation.description.root.children)
    : ''

  const quoteHtml = referenceLocation?.quote?.root?.children
    ? renderLexicalToHTML(referenceLocation.quote.root.children)
    : ''

  const legendeHtml = referenceLocation?.background_image?.legende?.root?.children
    ? renderLexicalToHTML(referenceLocation.background_image.legende.root.children)
    : ''

  const backgroundImageUrl = referenceLocation?.background_image?.url
    ? `${cmsBase}${referenceLocation.background_image.url}`
    : ''

  return (
    <>
      <Return linkURL={`${base}/carte`} linkText="Retourner à la carte" />

      {/* Hero */}
      <section className="relative w-full flex justify-center items-center overflow-hidden" style={{ height: '75vh', maxHeight: '700px', minHeight: '560px' }}>
        <div className="absolute inset-0 bg-black/50 z-[2] pointer-events-none" />

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 w-full z-[5] flex flex-col items-start px-[100px] pb-10 gap-5 text-white pointer-events-none overflow-hidden">
          <h2 className="text-[50px] font-light italic border-b border-white leading-[65px] w-fit" style={{ fontFamily: 'Merryweather, serif' }}>
            Lieu
          </h2>
          <h1 className="text-[60px] font-bold leading-[65px]" style={{ fontFamily: 'var(--article-font, Helvetica)' }}>
            {referenceLocation.name}
          </h1>

          {/* Description / Quote toggle */}
          <div className="w-full mt-[5vh] text-secondary pointer-events-none">
            <LieuReferenceToggle
              descriptionHtml={descriptionHtml}
              quoteHtml={quoteHtml}
            />
            <div className="flex justify-center items-center relative mt-5">
              <div className="px-2.5 z-[3]" />
              <div className="border-b border-[#d9d9d9] block w-full absolute top-2.5 z-0" />
            </div>
          </div>
        </div>

        {backgroundImageUrl && (
          <ImageTooltip
            src={backgroundImageUrl}
            legend={legendeHtml}
            alt={legendeHtml || referenceLocation.name}
          />
        )}
      </section>

      {/* Gallery */}
      <section className="flex flex-col justify-center gap-[50px] w-[97.5vw] mx-auto mt-[15px]">
        <Gallery documents={documents} />
      </section>
    </>
  )
}
