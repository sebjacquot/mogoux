'use client'

import { useRef, useEffect } from 'react'

interface Props {
  src: string
  legend?: string
  alt: string
  className?: string
  originalSrc?: string
}

export default function ImageFullscreen({ src, legend, alt, className, originalSrc }: Props) {
  const imgRef = useRef<HTMLImageElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const img = imgRef.current
    const tip = tooltipRef.current
    if (!img || !tip || !legend) return

    let timeout: ReturnType<typeof setTimeout>

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
      clearTimeout(timeout)
      img.removeEventListener('mouseenter', show)
      img.removeEventListener('mousemove', move as EventListener)
      img.removeEventListener('mouseleave', hide)
    }
  }, [legend])

  const handleClick = () => {
    const fullSrc = originalSrc || src
    const container = document.createElement('div')
    container.style.cssText =
      'position:fixed;inset:0;background:rgba(0,0,0,.8);display:flex;align-items:center;justify-content:center;z-index:10000;cursor:zoom-out;opacity:0;transition:opacity .3s ease'
    const big = document.createElement('img')
    big.src = fullSrc
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
          'w-full h-full object-contain cursor-zoom-in transition-transform duration-300 hover:scale-[1.03]'
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
