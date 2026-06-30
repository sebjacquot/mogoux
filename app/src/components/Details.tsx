import Audio from './Audio'
import Video from './Video'
import ImageFullscreen from './ImageFullscreen'
import Link from 'next/link'

const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

interface Props {
  title: string
  date: string
  description?: string
  location: any
  credits_name: string
  credits_link?: string
  tags: any
  type: 'Image' | 'Audio' | 'Video'
  link_notice?: string
  src: string
  originalSrc?: string
  legend?: string
  alt: string
  preview_audio_video?: any
  thematics?: any[]
}

export default function Details({
  title, date, description, location, credits_name, credits_link,
  tags, type, link_notice, src, originalSrc, legend, alt, preview_audio_video, thematics,
}: Props) {
  const dateStr = (date + '').charAt(0).toUpperCase() + (date + '').slice(1)

  return (
    <div className="flex items-start px-4 md:px-[8%] py-[6%] gap-8 text-site-text h-full flex-col md:flex-row">
      {/* Text column */}
      <div className="flex flex-col w-full md:w-[70%] text-xl">
        <h1 className="text-[1.7em] font-bold mt-12 mb-8">{title}</h1>
        <h3 className="mb-5 font-normal">{dateStr}</h3>

        {description && (
          <p className="mb-10 w-[90%] leading-snug text-justify">{description}</p>
        )}

        {/* Physical tags */}
        <ul className="mb-5 flex flex-wrap gap-1.5 list-none p-0">
          {tags?.document_types && (
            <li id="type-de-document" className="bg-legende text-site-text px-1.5 py-0.5 rounded-sm text-base cursor-default">
              {tags.document_types.name}
            </li>
          )}
          {tags?.material_types_and_formats && (
            <li id="support-et-format" className="bg-legende text-site-text px-1.5 py-0.5 rounded-sm text-base cursor-default">
              {tags.material_types_and_formats.name}
            </li>
          )}
          {tags?.colors && (
            <li id="couleur" className="bg-legende text-site-text px-1.5 py-0.5 rounded-sm text-base cursor-default">
              {tags.colors.name}
            </li>
          )}
        </ul>

        {/* Thematics */}
        {thematics && thematics.length > 0 && (
          <ul className="mb-5 flex flex-wrap gap-1.5 list-none p-0">
            {thematics.map((t: any, i: number) => (
              <li
                key={i}
                className="px-1.5 py-0.5 rounded-sm text-base cursor-pointer"
                style={{ border: `1px solid ${t.color || '#aaa'}`, color: t.color || '#aaa' }}
              >
                <Link
                  href={`/thematiques/${t.slug}?section=${t.sectionId || ''}`}
                  className="no-underline"
                  style={{ color: 'inherit' }}
                >
                  {t.title}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* Info grid */}
        <div className="grid gap-x-5 gap-y-1 mt-2.5 text-[0.95em]" style={{ gridTemplateColumns: 'minmax(0,auto) 1fr' }}>
          {/* Location */}
          {location?.location_reference && (
            <>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <h3 className="m-0 font-semibold">Lieu de référence</h3>
              </div>
              <div>
                <Link href={`/lieux-reference/${location.location_reference.slug}`} className="text-site-text no-underline hover:underline hover:opacity-70">
                  {location.location_reference.name}
                </Link>
              </div>
            </>
          )}

          {/* Location details */}
          {location?.location_details?.trim() && (
            <>
              <div className="pl-7"><h3 className="m-0">Précision sur le lieu</h3></div>
              <div>
                {location.location_link ? (
                  <a href={location.location_link} target="_blank" rel="noopener noreferrer" className="text-site-text no-underline hover:underline hover:opacity-70">
                    {location.location_details}
                  </a>
                ) : (
                  <p className="m-0">{location.location_details}</p>
                )}
              </div>
            </>
          )}

          {/* Credits */}
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>
            </svg>
            <h3 className="m-0 font-semibold">Crédits</h3>
          </div>
          <div>
            {credits_link ? (
              <a href={credits_link} target="_blank" rel="noopener noreferrer" className="text-site-text no-underline hover:underline hover:opacity-70">
                {credits_name}
              </a>
            ) : (
              <p className="m-0">{credits_name}</p>
            )}
          </div>

          {/* Notice */}
          {link_notice && (
            <>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/>
                  <path d="m21 3-9 9"/><path d="M15 3h6v6"/>
                </svg>
                <h3 className="m-0 font-semibold">Notice externe</h3>
              </div>
              <div>
                <a href={link_notice} target="_blank" rel="noopener noreferrer" className="text-site-text no-underline hover:underline hover:opacity-70">
                  Voir la notice
                </a>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Media column */}
      <div className="w-full md:w-full flex justify-center items-center">
        {type === 'Audio' ? (
          <div className="w-full" style={{ minHeight: '300px' }}>
            <Audio
              src={src}
              preview_audio_video={typeof preview_audio_video === 'string' ? preview_audio_video : undefined}
            />
          </div>
        ) : type === 'Video' ? (
          <Video
            src={src}
            preview_audio_video={typeof preview_audio_video === 'string' ? preview_audio_video : undefined}
          />
        ) : (
          <div className="w-full">
            <ImageFullscreen src={src} originalSrc={originalSrc} alt={alt} legend={legend} className="w-full max-h-[80vh] object-contain cursor-zoom-in" />
          </div>
        )}
      </div>
    </div>
  )
}
