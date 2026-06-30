'use client'

import Link from 'next/link'
import { useState } from 'react'

interface Thematic {
  id: string
  title: string
  slug: string
  backgroundImageUrl?: string | null
  backgroundImageAlt?: string
}

interface Props {
  title: string
  sectionId: string
  color: string
  thematics: Thematic[]
}

const VISIBLE = 3

export default function Sections({ title, sectionId, color, thematics }: Props) {
  const [offset, setOffset] = useState(0)
  const canPrev = offset > 0
  const canNext = offset + VISIBLE < thematics.length

  return (
    <div className="w-full">
      {/* Titre de rubrique — puce colorée + texte + ligne horizontale */}
      <div className="flex items-center gap-4 mb-5">
        <span
          className="hidden sm:inline-block w-3.5 h-3.5 rounded-sm flex-shrink-0"
          style={{ backgroundColor: color }}
        />
        <h2 className="text-xl sm:text-2xl font-bold text-secondary whitespace-nowrap">{title}</h2>
        <span
          className="hidden sm:block flex-1 h-px opacity-40"
          style={{ backgroundColor: color }}
        />
      </div>

      {/* Desktop / Tablette : rangée de 3 cartes avec navigation */}
      <div className="hidden sm:flex items-stretch gap-[2px] pl-0 sm:pl-7">
        {/* Flèche précédent */}
        <button
          onClick={() => setOffset((o) => Math.max(0, o - VISIBLE))}
          disabled={!canPrev}
          className="w-[45px] bg-primary text-white text-2xl border-none rounded-tl rounded-bl hover:bg-secondary hover:text-black hover:w-[50px] disabled:opacity-30 disabled:hover:bg-primary disabled:hover:text-white disabled:hover:w-[45px] disabled:cursor-not-allowed transition-all flex-shrink-0"
          style={{ minHeight: 140, maxHeight: 220 }}
          aria-label="Précédents"
        >
          &#10094;
        </button>

        {thematics.slice(offset, offset + VISIBLE).map((t, i) => (
          <Link
            key={t.id}
            href={`/thematiques/${t.slug}?section=${sectionId}`}
            className="relative overflow-hidden no-underline group"
            style={{ aspectRatio: '4/3', minHeight: 140, maxHeight: 220, width: 280 }}
          >
            {t.backgroundImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={t.backgroundImageUrl}
                alt={t.backgroundImageAlt || t.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full" style={{ backgroundColor: color + '44' }} />
            )}
            {/* Overlay sombre, plus clair au hover */}
            <div className="absolute inset-0 bg-black/55 group-hover:bg-black/35 transition-colors duration-300" />
            {/* Liseré coloré en bas */}
            <div className="absolute bottom-0 left-0 w-full h-[3px]" style={{ backgroundColor: color }} />
            {/* Titre */}
            <div className="absolute bottom-0 left-0 w-full px-3 pb-4 pt-6"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)' }}
            >
              <p className="text-white text-sm font-semibold leading-snug line-clamp-2">{t.title}</p>
            </div>
          </Link>
        ))}

        {/* Flèche suivant */}
        <button
          onClick={() => setOffset((o) => Math.min(thematics.length - VISIBLE, o + VISIBLE))}
          disabled={!canNext}
          className="w-[45px] bg-primary text-white text-2xl border-none rounded-tr rounded-br hover:bg-secondary hover:text-black hover:w-[50px] disabled:opacity-30 disabled:hover:bg-primary disabled:hover:text-white disabled:hover:w-[45px] disabled:cursor-not-allowed transition-all flex-shrink-0"
          style={{ minHeight: 140, maxHeight: 220 }}
          aria-label="Suivants"
        >
          &#10095;
        </button>
      </div>

      {/* Mobile : tampons colorés */}
      <div className="flex sm:hidden flex-wrap gap-3 pl-2">
        {thematics.map((t) => (
          <Link
            key={t.id}
            href={`/thematiques/${t.slug}?section=${sectionId}`}
            className="px-4 py-2 rounded text-sm font-semibold no-underline text-secondary hover:opacity-80 transition-opacity"
            style={{ backgroundColor: color + 'CC' }}
          >
            {t.title}
          </Link>
        ))}
      </div>
    </div>
  )
}
