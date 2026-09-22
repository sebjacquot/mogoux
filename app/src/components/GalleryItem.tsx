'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const base = process.env.NEXT_PUBLIC_BASE_PATH || ''
const PLACEHOLDER = '/Goux_1000kB_3.jpg'

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
            <Image
              src={previewSrc}
              alt={doc.alt}
              fill
              className="object-cover"
              onError={() => setPreviewSrc(null)}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            /* Pas d'image de preview : icône haut-parleur centrée sur fond sombre */
            <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a]">
              <Image
                src={`${base}/icones/haut-parleur.png`}
                alt="audio"
                width={48}
                height={48}
                className="opacity-50"
              />
            </div>
          )}
          <div className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center">
            <Image
              src={`${base}/icones/play-icon.png`}
              alt="play"
              width={16}
              height={16}
            />
          </div>
        </div>
      ) : (
        <Image
          src={imgSrc}
          alt={doc.alt}
          fill
          loading="lazy"
          className="object-cover block rounded-sm"
          onError={() => { if (imgSrc !== PLACEHOLDER) setImgSrc(PLACEHOLDER) }}
          sizes="(max-width: 768px) 100vw, 33vw"
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
