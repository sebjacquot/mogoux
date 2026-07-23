'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

interface Props {
  linkURL: string
  linkText?: string
}

export default function Return({ linkURL, linkText = 'Retour' }: Props) {
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (y > lastScrollY.current && y > 80) {
        setVisible(false)
      } else {
        setVisible(true)
      }
      lastScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const href = linkURL.startsWith('http') ? linkURL : linkURL

  return (
    <div
      className="fixed top-0 left-20 z-[999] h-20 flex items-center pl-4 pr-8 bg-nav/90 backdrop-blur-sm w-fit transition-transform duration-300"
      style={{
        maxWidth: 'calc(100vw - 5rem)',
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
      }}
    >
      <Link
        href={href}
        className="text-secondary/70 text-sm uppercase tracking-widest no-underline flex items-center gap-2 hover:text-secondary transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="flex-shrink-0">
          <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
        </svg>
        {/* Texte masqué sur mobile, visible à partir de sm */}
        <span className="hidden sm:inline truncate">{linkText}</span>
      </Link>
    </div>
  )
}
