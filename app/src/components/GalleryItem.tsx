'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const base = process.env.NEXT_PUBLIC_BASE_PATH || ''
const PLACEHOLDER = '/Goux_1000kB_3.jpg'
const AUDIO_PLACEHOLDER = `${base}/icones/haut-parleur.png`

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
  const [imgSrc, setImgSrc] = useState(doc.src || PLACEHOLDER)
  const [previewSrc, setPreviewSrc] = useState(doc.preview_audio_video || null)

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

  const isAudio = doc.type === 'Audio'
  const isMedia = doc.type === 'Audio' || doc.type === 'Video'

  return (
    <div
      onClick={handleClick}
      className="relative w-full h-full cursor-pointer group"
    >
      {isMedia ? (
        <div className="relative w-full h-full bg-[#2C2C2C]">
          {previewSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewSrc}
              alt={doc.alt}
              className="w-full h-full object-cover"
              onError={() => setPreviewSrc(null)}
            />
          ) : (
            /* Pas d'image de preview : icône haut-parleur centrée sur fond sombre */
            <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={AUDIO_PLACEHOLDER}
                alt="audio"
                className="w-12 h-12 opacity-50"
              />
            </div>
          )}
          <div className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${base}/icones/play-icon.png`} alt="play" className="w-4 h-4" />
          </div>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imgSrc}
          alt={doc.alt}
          loading="lazy"
          className="w-full h-full object-cover block rounded-sm"
          onError={() => { if (imgSrc !== PLACEHOLDER) setImgSrc(PLACEHOLDER) }}
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
