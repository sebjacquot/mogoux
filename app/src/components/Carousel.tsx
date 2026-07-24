'use client'

import { useState, useEffect, useRef } from 'react'
import Gallery from './Gallery'

const PLACEHOLDER = '/Goux_1000kB_3.jpg'

interface ThematicItem {
  src: string
  title: string
  alt: string
  couleur: string
  slug: string
  documents: DocItem[]
}

interface DocItem {
  type: 'Image' | 'Audio' | 'Video'
  src: string
  alt: string
  slug: string
  titre: string
  preview_audio_video: string | null
}

interface Props {
  thematics: ThematicItem[]
  initialSlug?: string
}

export default function Carousel({ thematics, initialSlug }: Props) {
  const startIdx = thematics.findIndex((t) => t.slug === initialSlug)
  const [current, setCurrent] = useState(startIdx >= 0 ? startIdx : 0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const update = () => {
      if (carouselRef.current) setWidth(carouselRef.current.clientWidth)
    }
    update()
    const ro = new ResizeObserver(update)
    if (carouselRef.current) ro.observe(carouselRef.current)
    return () => ro.disconnect()
  }, [])

  const move = (dir: number) => {
    setCurrent((prev) => (prev + dir + thematics.length) % thematics.length)
  }

  if (thematics.length === 0) return null

  return (
    <>
      {/* Carousel strip */}
      <div ref={carouselRef} className="w-full h-[40vh] md:h-[55vh] rounded overflow-hidden relative z-[1] mb-5">
        {/* Index indicators */}
        <div className="absolute top-5 left-[30px] flex gap-5 z-10">
          {thematics.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-[110px] h-[5px] rounded-full cursor-pointer transition-colors ${
                i === current ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Prev / Next */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between z-10">
          <button
            onClick={() => move(-1)}
            className="w-[45px] h-[110px] bg-primary text-white text-2xl border-none rounded-tr rounded-br hover:bg-secondary hover:text-black hover:w-[50px] transition-all"
          >
            &#10094;
          </button>
          <button
            onClick={() => move(1)}
            className="w-[45px] h-[110px] bg-primary text-white text-2xl border-none rounded-tl rounded-bl hover:bg-secondary hover:text-black hover:w-[50px] transition-all"
          >
            &#10095;
          </button>
        </div>

        {/* Slides */}
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * width}px)` }}
        >
          {thematics.map((t, i) => (
            <div key={i} className="relative w-full h-full flex-shrink-0 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={t.src || PLACEHOLDER}
                alt={t.alt}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={e => { if ((e.target as HTMLImageElement).src !== window.location.origin + PLACEHOLDER) (e.target as HTMLImageElement).src = PLACEHOLDER }}
              />
              <div className="absolute inset-0 bg-black/50 z-[4]" />
              <div className="absolute bottom-0 left-0 px-4 pb-6 md:px-[100px] md:pb-[100px] w-full z-[5] text-white flex flex-col gap-2 md:gap-5">
                <h3 className="text-xl md:text-[45px] font-light italic border-b border-white w-fit leading-tight md:leading-[65px] font-helvetica">
                  Thématique
                </h3>
                <h2
                  className="font-bold leading-tight w-full md:w-[60%] font-helvetica overflow-hidden"
                  style={{
                    fontSize: 'clamp(18px, 3.5vw, 50px)',
                    lineHeight: 1.2,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {t.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery for active thematic */}
      {thematics[current] && (
        <Gallery documents={thematics[current].documents} />
      )}
    </>
  )
}
