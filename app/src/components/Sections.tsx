'use client'

import Link from 'next/link'
import { useState, useRef, useEffect, useLayoutEffect, forwardRef } from 'react'

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

function getItemsPerView(): number {
  if (typeof window === 'undefined') return 3
  if (window.innerWidth <= 768) return 1
  if (window.innerWidth <= 1200) return 2
  return 3
}

const PLACEHOLDER = '/Goux_1000kB_3.jpg'

export default function Sections({ title, sectionId, color, thematics }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [ipv, setIpv] = useState(3)           // items per view
  const [index, setIndex] = useState(0)        // leftmost visible card index
  const [cardSlotPx, setCardSlotPx] = useState(0) // pixel width of one card slot (card + gap)

  // Re-measure wrapper and reset on resize / ipv change
  const measure = () => {
    const newIpv = getItemsPerView()
    setIpv(newIpv)
    setIndex(0)
    if (wrapperRef.current) {
      setCardSlotPx(wrapperRef.current.offsetWidth / newIpv)
    }
  }

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Re-measure after layout updates (when ipv state change causes flex-basis change)
  useLayoutEffect(() => {
    if (wrapperRef.current) {
      setCardSlotPx(wrapperRef.current.offsetWidth / ipv)
    }
  }, [ipv])

  const showArrows = thematics.length > ipv
  const canPrev = index > 0
  const canNext = index + ipv < thematics.length

  const move = (dir: number) => {
    setIndex(prev => Math.max(0, Math.min(prev + dir, thematics.length - ipv)))
  }

  const flexBasis =
    ipv === 1 ? 'calc(100% - 20px)'
    : ipv === 2 ? 'calc(50% - 20px)'
    : 'calc(33.333% - 20px)'

  return (
    <section className="w-full">
      {/* Titre de rubrique */}
      <div className="flex justify-between items-center w-full">
        <h2 className="text-secondary font-graphik text-[25px] font-bold">{title}</h2>
      </div>
      <hr className="w-full border-0 h-[2px] mb-[13px] mt-0" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />

      {/* Carousel */}
      <div className="relative flex items-center justify-center w-full">
        {/* Flèche gauche */}
        <button
          onClick={() => move(-1)}
          aria-label="Précédent"
          className="absolute z-10 bg-transparent border-none text-white cursor-pointer px-[15px] py-[10px] rounded-full text-2xl transition-[transform,color] duration-300"
          style={{
            top: '40%',
            left: '-25px',
            scale: '1.5',
            display: showArrows && canPrev ? 'block' : 'none',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.2)')}
          onMouseLeave={e => (e.currentTarget.style.transform = '')}
        >
          ❮
        </button>

        {/* Wrapper masquant */}
        <div ref={wrapperRef} className="overflow-hidden" style={{ width: 'calc(100% - 20px)' }}>
          <div
            className="flex pl-5"
            style={{
              transform: `translateX(-${index * cardSlotPx}px)`,
              transition: 'transform 0.5s ease-in-out',
              willChange: 'transform',
            }}
          >
            {thematics.map((t) => (
              <ThematiqueCard
                key={t.id}
                thematic={t}
                sectionId={sectionId}
                color={color}
                flexBasis={flexBasis}
              />
            ))}
          </div>
        </div>

        {/* Flèche droite */}
        <button
          onClick={() => move(1)}
          aria-label="Suivant"
          className="absolute z-10 bg-transparent border-none text-white cursor-pointer px-[15px] py-[10px] rounded-full text-2xl transition-[transform,color] duration-300"
          style={{
            top: '40%',
            right: '-25px',
            scale: '1.5',
            display: showArrows && canNext ? 'block' : 'none',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.2)')}
          onMouseLeave={e => (e.currentTarget.style.transform = '')}
        >
          ❯
        </button>
      </div>
    </section>
  )
}

// ── Card individuelle ─────────────────────────────────────────────────────────

interface CardProps {
  thematic: Thematic
  sectionId: string
  color: string
  flexBasis: string
}

const ThematiqueCard = forwardRef<HTMLDivElement, CardProps>(
  ({ thematic: t, sectionId, color, flexBasis }, ref) => {
    const [hovered, setHovered] = useState(false)
    const [imgSrc, setImgSrc] = useState(t.backgroundImageUrl || PLACEHOLDER)

    return (
      <div
        ref={ref}
        className="flex-shrink-0 mr-5"
        style={{ flex: `0 0 ${flexBasis}`, maxWidth: flexBasis }}
      >
        <Link
          href={`/thematiques/${t.slug}?section=${sectionId}`}
          className="block relative overflow-hidden rounded-[3px] no-underline h-[250px]"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgSrc}
            alt={t.backgroundImageAlt || t.title}
            className="w-full h-full object-cover object-center"
            style={{ transition: 'transform 0.3s ease-in-out', transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
            onError={() => { if (imgSrc !== PLACEHOLDER) setImgSrc(PLACEHOLDER) }}
          />
          <h3
            className="absolute bottom-0 left-0 px-[15px] py-[5px] text-[1.1em] font-bold w-[94%] text-white"
            style={{
              backgroundColor: hovered
                ? `color-mix(in srgb, ${color} 70%, transparent)`
                : 'rgba(119,110,110,0.8)',
              transition: 'background-color 0.3s ease-in-out',
            }}
          >
            {t.title}
          </h3>
        </Link>
      </div>
    )
  }
)
ThematiqueCard.displayName = 'ThematiqueCard'
