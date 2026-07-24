import { getPayload } from '@/utils/payload'
import { notFound } from 'next/navigation'
import Return from '@/components/Return'
import ImageTooltip from '@/components/ImageTooltip'
import Gallery from '@/components/Gallery'
import LieuReferenceToggle from '@/components/LieuReferencePage'
import { renderLexicalToHTML } from '@/utils/renderLexical'
import { sortBySection } from '@/utils/sortGallery'

export const dynamic = 'force-dynamic'

const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

interface Props {
  params: Promise<{ slug: string }>
}

export default async function LieuReferencePage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload()

  // Fetch reference location by slug (depth:1 suffit, on requête les docs séparément)
  const refRes = await payload
    .find({
      collection: 'reference-locations',
      where: { slug: { equals: slug } },
      depth: 1,
      limit: 1,
    })
    .catch(() => null)

  if (!refRes || refRes.docs.length === 0) notFound()

  const referenceLocation: any = refRes.docs[0]

  // Fetch all documents linked to this location directly (no join field limit)
  const [docsRes, sectionsRes] = await Promise.all([
    payload.find({
      collection: 'documents',
      where: { 'location.location_reference': { equals: referenceLocation.id } },
      limit: 300,
      depth: 1,
    }),
    payload.find({ collection: 'sections', limit: 100, sort: 'rank' }),
  ])
  const sections = sectionsRes.docs

  // Build thematicId → sectionRank map for gallery sorting
  const thematicToSectionRank = new Map<string, number>()
  sections.forEach((section: any, idx: number) => {
    const rank = section.rank ?? idx
    ;(section.thematics || []).forEach((t: any) => {
      const id = typeof t === 'string' ? t : t.id
      if (id) thematicToSectionRank.set(id, rank)
    })
  })

  // Build documents list for Gallery
  const rawDocuments = docsRes.docs
    .map((doc: any) => {
      if (!doc) return null

      const previewAudioVideoUrl = doc.preview_audio_video?.sizes?.preview?.url
        || doc.preview_audio_video?.url
        || null

      const src = doc.sizes?.preview?.url || doc.url || null

      if (!src) return null

      const firstThematicId = Array.isArray(doc.thematics)
        ? typeof doc.thematics[0] === 'string'
          ? doc.thematics[0]
          : doc.thematics[0]?.id
        : null
      const sectionRank = firstThematicId != null
        ? (thematicToSectionRank.get(firstThematicId) ?? 999)
        : 999

      return {
        type: doc.type ?? '',
        src,
        alt: doc.alt ?? '',
        slug: doc.slug ?? '',
        titre: doc.title ?? '',
        preview_audio_video: previewAudioVideoUrl,
        sectionRank,
      }
    })
    .filter(Boolean) as any[]

  // Sort: group by section rank, then sort by cote alphabetically, audios dispersed
  const documents = sortBySection(rawDocuments, (d) => d.sectionRank)

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

  const backgroundImageUrl = referenceLocation?.background_image?.url || ''

  return (
    <>
      <Return linkURL="/carte" linkText="Retourner à la carte" />

      {/* Hero — mt-20 sur mobile pour ne pas se faire couvrir par le bouton Retour fixe */}
      <section className="relative w-full flex justify-center items-center overflow-hidden mt-20 sm:mt-0" style={{ height: '75vh', maxHeight: '700px', minHeight: '560px' }}>
        <div className="absolute inset-0 bg-black/50 z-[2] pointer-events-none" />

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 w-full z-[5] flex flex-col items-start px-4 sm:px-[100px] pb-6 sm:pb-10 gap-3 sm:gap-5 text-white pointer-events-none overflow-hidden">
          <h2 className="text-[28px] sm:text-[50px] font-light italic leading-tight sm:leading-[65px] w-fit font-helvetica">
            Lieu
          </h2>
          <h1 className="text-[32px] sm:text-[60px] font-bold leading-tight sm:leading-[65px]" style={{ fontFamily: 'var(--article-font, Helvetica)' }}>
            {referenceLocation.name}
          </h1>

          {/* Description / Quote toggle */}
          <div className="w-full mt-[5vh] text-secondary pointer-events-none">
            <LieuReferenceToggle
              descriptionHtml={descriptionHtml}
              quoteHtml={quoteHtml}
            />
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
