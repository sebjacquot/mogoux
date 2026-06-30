'use client'

import { useRouter } from 'next/navigation'

const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

interface DocItem {
  type: 'Image' | 'Audio' | 'Video'
  src: string
  alt: string
  slug: string
  titre: string
  preview_audio_video: string | null
}

interface Props {
  document: DocItem
  allSlugs: string[]
}

export default function GalleryItem({ document: doc, allSlugs }: Props) {
  const router = useRouter()

  const handleClick = () => {
    // Store nav context in sessionStorage for clean, shareable URLs
    try {
      sessionStorage.setItem('docNav', JSON.stringify({
        slugs: allSlugs,
        returnUrl: window.location.href,
      }))
    } catch {
      // sessionStorage unavailable — navigation will fall back to /thematiques
    }
    router.push(`/documents/${doc.slug}`)
  }

  const isMedia = doc.type === 'Audio' || doc.type === 'Video'
  const preview = doc.preview_audio_video

  return (
    <div
      onClick={handleClick}
      className="relative w-full h-full cursor-pointer group"
    >
      {isMedia && preview ? (
        <div className="relative w-full h-full bg-[#2C2C2C]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt={doc.alt} className="w-full h-full object-cover" />
          <div className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${base}/icones/play-icon.png`} alt="play" className="w-4 h-4" />
          </div>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={doc.src}
          alt={doc.alt}
          loading="lazy"
          className="w-full h-full object-cover block rounded-sm"
        />
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 border-2 border-transparent group-hover:border-secondary rounded-sm transition-all duration-300 z-[1]" />

      {/* Title on hover */}
      <h3 className="absolute bottom-0 left-0 w-full px-1.5 pb-2.5 text-center text-[whitesmoke] text-[17px] font-bold leading-tight z-[2] opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-graphik">
        {doc.titre}
      </h3>
    </div>
  )
}
