'use client'

interface Props {
  src: string
  legend?: string
  alt: string
  className?: string
}

export default function ImageFullscreen({ src, alt, className }: Props) {
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
    // eslint-disable-next-line @next/next/no-img-element
    <img
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
  )
}
