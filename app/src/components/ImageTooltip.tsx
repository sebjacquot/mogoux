'use client'

import { useRef, useEffect } from 'react'

interface Props {
  src: string
  legend: string
  alt: string
  className?: string
}

export default function ImageTooltip({ src, legend, alt, className }: Props) {
  const tooltipRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  let timeout: ReturnType<typeof setTimeout>

  useEffect(() => {
    const img = imgRef.current
    const tip = tooltipRef.current
    if (!img || !tip || !legend) return

    const show = () => {
      timeout = setTimeout(() => tip.classList.add('opacity-100'), 500)
    }
    const move = (e: MouseEvent) => {
      clearTimeout(timeout)
      tip.classList.remove('opacity-100')
      tip.style.left = `${e.clientX + 10}px`
      tip.style.top = `${e.clientY + 10}px`
      timeout = setTimeout(() => tip.classList.add('opacity-100'), 500)
    }
    const hide = () => {
      clearTimeout(timeout)
      tip.classList.remove('opacity-100')
    }

    img.addEventListener('mouseenter', show)
    img.addEventListener('mousemove', move as EventListener)
    img.addEventListener('mouseleave', hide)
    return () => {
      img.removeEventListener('mouseenter', show)
      img.removeEventListener('mousemove', move as EventListener)
      img.removeEventListener('mouseleave', hide)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [legend])

  const handleClick = () => {
    const container = document.createElement('div')
    container.style.cssText =
      'position:fixed;inset:0;background:rgba(0,0,0,.8);display:flex;align-items:center;justify-content:center;z-index:10000;cursor:zoom-out;opacity:0;transition:opacity .3s ease'
    const big = document.createElement('img')
    big.src = src
    big.alt = alt
    big.style.cssText = 'max-width:95%;max-height:95%;box-shadow:0 0 20px rgba(0,0,0,.5);border-radius:5px'
    container.appendChild(big)
    document.body.appendChild(container)
    document.body.style.overflow = 'hidden'
    setTimeout(() => (container.style.opacity = '1'), 10)
    const close = () => {
      container.style.opacity = '0'
      setTimeout(() => {
        container.remove()
        document.body.style.overflow = ''
      }, 300)
    }
    container.addEventListener('click', close)
    document.addEventListener('keydown', (e) => e.key === 'Escape' && close(), { once: true })
  }

  return (
    <div className="relative w-full h-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        draggable={false}
        loading="lazy"
        onClick={handleClick}
        className={
          className ||
          'w-full h-full object-cover transition-transform duration-300 hover:scale-[1.03] cursor-zoom-in'
        }
      />
      {legend && (
        <div
          ref={tooltipRef}
          className="fixed bg-black/75 text-white px-2.5 py-1.5 rounded text-sm z-[100] opacity-0 transition-opacity duration-200 pointer-events-none max-w-[300px] text-center break-words"
        >
          {legend}
        </div>
      )}
    </div>
  )
}
