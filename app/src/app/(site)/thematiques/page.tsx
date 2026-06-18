import { getPayload } from '@/utils/payload'
import Sections from '@/components/Sections'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function ThematiquesPage() {
  const payload = await getPayload()

  const sectionsRes = await payload.find({
    collection: 'sections',
    limit: 100,
    sort: 'rank',
    depth: 2,
  })
  const sections = sectionsRes.docs

  const metadataRes = await payload.find({
    collection: 'metadata-files',
    limit: 20,
  })
  const metadataFiles = metadataRes.docs

  const cmsBase = process.env.NEXT_PUBLIC_SERVER_URL || ''

  return (
    <div className="text-white max-w-[1300px] mx-auto px-4">
      {/* Intro */}
      <div className="w-full max-w-[800px] mx-auto mt-10 mb-24 text-justify">
        <h2 className="text-[60px] font-extrabold mb-4">Thématiques</h2>
        <p className="text-[17px] font-normal leading-snug">
          Découvrez ici différentes thématiques, regroupées au sein de 4 rubriques principales,
          permettant de regrouper autrement les photographies et les audios disponibles depuis
          la carte. À partir des fiches descriptives, vous pouvez rebasculer sur une présentation
          par lieux de référence correspondant aux pins sur la carte. La mention "Précision sur
          le lieu", quand elle est accessible, ouvre un nouvel onglet vers un site extérieur.
        </p>
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-[75px]">
        {sections.map((section: any) => (
          <Sections
            key={section.id}
            title={section.name}
            sectionId={section.id}
            color={section.color}
            thematics={(section.thematics || []).map((t: any) => ({
              id: t.id,
              title: t.title || t.value || '',
              slug: t.slug || t.id,
              backgroundImageUrl: t.background_image?.url
                ? `${cmsBase}${t.background_image.url}`
                : null,
              backgroundImageAlt: t.background_image?.alt || t.title || '',
            }))}
          />
        ))}

        {/* Export instrument de recherche */}
        {metadataFiles.length > 0 && (
          <div className="flex flex-col h-[200px] m-5">
            <p className="text-center text-2xl">Exporter l'instrument de recherche</p>
            <div className="w-full h-full flex justify-center items-center gap-8">
              {metadataFiles.map((file: any) => (
                <a
                  key={file.id}
                  href={`${cmsBase}${file.url}`}
                  className="bg-navigation text-secondary inline-block px-5 py-2.5 text-base w-[85px] text-center no-underline rounded font-graphik transition-colors hover:bg-[#fd6674]"
                >
                  {file.standard_name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
