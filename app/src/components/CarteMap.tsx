'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'

const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

const pins = [
  {
    href: '/lieux-reference/hericourt',
    alt: 'Pin Héricourt',
    top: '5%',
    left: '36%',
    tooltip: "Héricourt, site majeur de l'industrie textile depuis le début du XIXe siècle",
    tooltipTop: '7%',
    tooltipLeft: '36%',
  },
  {
    href: '/lieux-reference/bethoncourt',
    alt: 'Pin Bethoncourt',
    top: '34.5%',
    left: '45%',
    tooltip: "Bethoncourt, site industriel important autour de la filature de la Lizaine",
    tooltipTop: '36.5%',
    tooltipLeft: '47%',
  },
  {
    href: '/lieux-reference/montbeliard',
    alt: 'Pin Montbéliard',
    top: '49%',
    left: '47%',
    tooltip: "Montbéliard, ville historique et centre du pouvoir du Comté puis de la Principauté de Montbéliard",
    tooltipTop: '51%',
    tooltipLeft: '47%',
  },
  {
    href: '/lieux-reference/sochaux',
    alt: 'Pin Sochaux',
    top: '46%',
    left: '51%',
    tooltip: "Sochaux, lieu emblématique de l'entreprise Peugeot au XXe siècle",
    tooltipTop: '48%',
    tooltipLeft: '51%',
  },
  {
    href: '/lieux-reference/fesches-le-chatel-dampierre',
    alt: 'Pin Fesches-le-Châtel',
    top: '43%',
    left: '77%',
    tooltip: "Vallée de la Feschotte, site industriel situé entre Fesches-le-Châtel et Badevel, lié à l'entreprise Japy",
    tooltipTop: '45%',
    tooltipLeft: '77%',
  },
  {
    href: '/lieux-reference/bart-bavans',
    alt: 'Pin Bart-Bavans',
    top: '66%',
    left: '37%',
    tooltip: "Usine de la Roche (ou Laroche), site métallurgique situé entre Bart et Bavans",
    tooltipTop: '68%',
    tooltipLeft: '37%',
  },
  {
    href: '/lieux-reference/audincourt',
    alt: 'Pin Audincourt',
    top: '68%',
    left: '55%',
    tooltip: "Audincourt, haut-lieu industriel connu pour ses forges et fonderies depuis la fin du XVIIIe siècle",
    tooltipTop: '70%',
    tooltipLeft: '55%',
  },
  {
    href: '/lieux-reference/beaucourt',
    alt: 'Pin Beaucourt',
    top: '64%',
    left: '79%',
    tooltip: "Beaucourt, lieu de naissance de l'entreprise Japy",
    tooltipTop: '66%',
    tooltipLeft: '79%',
  },
  {
    href: '/lieux-reference/beaulieu-valentigney',
    alt: 'Pin Beaulieu-Valentigney',
    top: '87%',
    left: '55%',
    tooltip: "Beaulieu, site industriel situé entre Valentigney et Mandeure depuis la première moitié du XIXe siècle",
    tooltipTop: '81%',
    tooltipLeft: '44.5%',
  },
  {
    href: '/lieux-reference/herimoncourt',
    alt: 'Pin Hérimoncourt',
    top: '88%',
    left: '67%',
    tooltip: "Hérimoncourt, lieu industriel historique majeur et berceau de la famille Peugeot",
    tooltipTop: '83%',
    tooltipLeft: '78%',
  },
]

export default function CarteMap() {
  const mapRef = useRef<HTMLImageElement>(null)
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 })
  const [hoveredPin, setHoveredPin] = useState<number | null>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPos({ x, y })
  }

  return (
    <div className="w-[88%] mx-[6%]">
      {/* ── Map + zoom window ────────────────────── */}
      <div className="relative">
        {/* Main map */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={mapRef}
          src={`${base}/carte-2mo.jpg`}
          alt="Carte"
          className="w-full h-auto block"
          loading="lazy"
          onMouseMove={handleMouseMove}
        />

        {/* Source label */}
        <p className="absolute bottom-[10px] left-[10px] bg-[rgba(228,228,228,0.66)] rounded px-1 text-[0.8rem]">
          IGN-Scan 50® Historique 1950
        </p>

        {/* Zoom window — desktop only */}
        <div
          className="hidden md:block absolute border-4 border-[#616161] rounded z-10"
          style={{
            backgroundImage: `url(${base}/Nouvelle-carte.jpeg)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '900%',
            backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
            width: '30vw',
            height: '20vw',
            top: '0.5vw',
            right: '0.5vw',
          }}
        />

        {/* Pins layer */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {pins.map((pin, i) => (
            <Link
              key={i}
              href={`${pin.href}`}
              className="pointer-events-auto absolute"
              style={{ top: pin.top, left: pin.left }}
              onMouseEnter={() => setHoveredPin(i)}
              onMouseLeave={() => setHoveredPin(null)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${base}/icones/pin.png`}
                alt={pin.alt}
                className="w-6 h-6 md:w-10 md:h-10 -translate-x-1/2 -translate-y-1/2"
              />
            </Link>
          ))}

          {/* Tooltips — desktop only */}
          {pins.map((pin, i) => (
            <div
              key={`tooltip-${i}`}
              className="hidden md:block absolute bg-black/75 text-white px-2.5 py-1.5 rounded text-sm pointer-events-none z-[1000] -translate-x-1/2 max-w-[200px] text-center transition-opacity duration-200"
              style={{
                top: pin.tooltipTop,
                left: pin.tooltipLeft,
                opacity: hoveredPin === i ? 1 : 0,
                display: hoveredPin === i ? 'block' : 'none',
              }}
            >
              {pin.tooltip}
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile pin list — visible only on small screens ── */}
      <div className="md:hidden mt-4 flex flex-col gap-2">
        <h3 className="text-white text-sm font-semibold uppercase tracking-widest mb-1 opacity-60">
          Lieux sur la carte
        </h3>
        {pins.map((pin, i) => (
          <Link
            key={`list-${i}`}
            href={`${pin.href}`}
            className="flex items-start gap-3 px-3 py-2.5 rounded bg-white/5 hover:bg-white/10 transition-colors no-underline"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${base}/icones/pin.png`}
              alt=""
              className="w-5 h-5 mt-0.5 flex-shrink-0 opacity-80"
            />
            <div>
              <p className="text-white font-semibold text-sm leading-tight m-0">
                {pin.alt.replace('Pin ', '')}
              </p>
              <p className="text-white/60 text-xs leading-snug mt-0.5 m-0">
                {pin.tooltip}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
