import { getPayload } from '@/utils/payload'
import { toAbsolute } from '@/utils/url'
import { notFound } from 'next/navigation'
import Return from '@/components/Return'
import ImageTooltip from '@/components/ImageTooltip'
import Gallery from '@/components/Gallery'
import LieuReferenceToggle from '@/components/LieuReferencePage'
import { renderLexicalToHTML } from '@/utils/renderLexical'
import { sortBySection } from '@/utils/sortGallery'
import type { ReferenceLocation, Section, Document, Thematic, Media } from '@/payload-types'

export const dynamic = 'force-dynamic'

interface GalleryDoc {
  type: 'Image' | 'Video' | 'Audio'
  src: string
  alt: string
  slug: string
  titre: string
  preview_audio_video: string | null
  sectionRank: number
}

interface Props {
  params: Promise<{ slug: string }>
}

export default async function LieuReferencePage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload()

  const refRes = await payload
    .find({
      collection: 'reference-locations',
      where: { slug: { equals: slug } },
      depth: 1,
      limit: 1,
    })
    .catch(() => null)

  if (!refRes || refRes.docs.length === 0) notFound()

  const referenceLocation = refRes.docs[0] as ReferenceLocation

  const [docsRes, sectionsRes] = await Promise.all([
    payload.find({
      collection: 'documents',
      where: { 'location.location_reference': { equals: referenceLocation.id } },
      limit: 300,
      depth: 1,
    }),
    payload.find({ collection: 'sections', limit: 100, sort: 'rank' }),
  ])
  const sections = sectionsRes.docs as Section[]

  // Construit la map thematicId → sectionRank pour le tri de galerie
  const thematicToSectionRank = new Map<string, number>()
  sections.forEach((section, idx) => {
    const rank = section.rank ?? idx
    ;((section.thematics ?? []) as (number | Thematic)[]).forEach((t) => {
      const id = String(typeof t === 'number' ? t : t.id)
      if (id) thematicToSectionRank.set(id, rank)
    })
  })

  const rawDocuments = (docsRes.docs as Document[])
    .map((doc): GalleryDoc | null => {
      const previewMedia = doc.preview_audio_video as Media | null
      const previewAudioVideoUrl = toAbsolute(
        previewMedia?.sizes?.preview?.url || previewMedia?.url
      ) || null

      const src = toAbsolute(doc.sizes?.preview?.url || doc.url) || null
      if (!src) return null

      const firstThematic = Array.isArray(doc.thematics) ? doc.thematics[0] : null
      const firstThematicId = firstThematic != null
        ? String(typeof firstThematic === 'number' ? firstThematic : firstThematic.id)
        : null
      const sectionRank = firstThematicId != null
        ? (thematicToSectionRank.get(firstThematicId) ?? 999)
        : 999

      return {
        type: doc.type,
        src,
        alt: doc.alt,
        slug: doc.slug,
        titre: doc.title,
        preview_audio_video: previewAudioVideoUrl,
        sectionRank,
      }
    })
    .filter((d): d is GalleryDoc => d !== null)

  const documents = sortBySection(rawDocuments, (d) => d.sectionRank)

  const bgImage = typeof referenceLocation.background_image === 'object' && referenceLocation.background_image
    ? referenceLocation.background_image as Media
    : null

  const descriptionHtml = referenceLocation.description?.root?.children
    ? renderLexicalToHTML(referenceLocation.description.root.children)
    : ''

  const quoteHtml = referenceLocation.quote?.root?.children
    ? renderLexicalToHTML(referenceLocation.quote.root.children)
    : ''

  const legendeHtml = bgImage?.legende?.root?.children
    ? renderLexicalToHTML(bgImage.legende.root.children)
    : ''

  const backgroundImageUrl = bgImage?.url || ''

  return (
    <>
      <Return linkURL="/carte" linkText="Retourner à la carte" />

      {/* Hero — mt-20 sur mobile pour ne pas se faire couvrir par le bouton Retour fixe */}
      <section className="relative w-full flex justify-center items-center overflow-hidden mt-20 sm:mt-0" style={{ height: '75vh', maxHeight: '700px' }}>
        <div className="absolute inset-0 bg-black/50 z-[2] pointer-events-none" />

        <div className="lieu-hero-content">
          <h2 className="lieu-hero-h2 font-light italic leading-tight w-fit font-helvetica">
            Lieu
          </h2>
          <h1 className="lieu-hero-h1 font-bold leading-tight" style={{ fontFamily: 'var(--article-font, Helvetica)' }}>
            {referenceLocation.name}
          </h1>

          <div className="lieu-hero-toggle">
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

      <section className="flex flex-col justify-center gap-[50px] w-[97.5vw] mx-auto mt-[15px]">
        <Gallery documents={documents} />
      </section>
    </>
  )
}
