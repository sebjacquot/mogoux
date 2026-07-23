'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

interface NavState {
  slugs: string[]
  returnUrl: string
}

export default function DocumentNav({ currentSlug }: { currentSlug: string }) {
  const router = useRouter()
  const [nav, setNav] = useState<NavState | null>(null)
  const [headerVisible, setHeaderVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (y > lastScrollY.current && y > 80) setHeaderVisible(false)
      else setHeaderVisible(true)
      lastScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('docNav')
      if (stored) {
        const parsed: NavState = JSON.parse(stored)
        if (parsed.slugs && Array.isArray(parsed.slugs)) {
          setNav(parsed)
        }
      }
    } catch {
      // sessionStorage unavailable or invalid JSON
    }
  }, [currentSlug])

  const slugs = nav?.slugs ?? []
  const idx = slugs.indexOf(currentSlug)
  const prevSlug = idx > 0 ? slugs[idx - 1] : null
  const nextSlug = idx >= 0 && idx < slugs.length - 1 ? slugs[idx + 1] : null
  const returnUrl = nav?.returnUrl ?? "/thematiques"

  return (
    <>
      {/* Return button (replaces static Return component) */}
      <div
        className="fixed top-0 left-20 z-[999] h-20 flex items-center pl-4 pr-8 bg-nav/90 backdrop-blur-sm transition-transform duration-300"
        style={{ maxWidth: 'calc(100vw - 5rem)', transform: headerVisible ? 'translateY(0)' : 'translateY(-100%)' }}
      >
        <button
          onClick={() => router.push(returnUrl)}
          className="text-secondary/70 text-sm uppercase tracking-widest flex items-center gap-2 hover:text-secondary transition-colors bg-transparent border-none cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Retour
        </button>
      </div>

      {/* Prev navigation arrow */}
      {prevSlug && (
        <Link
          href={`/documents/${prevSlug}`}
          className="fixed left-[30px] top-1/2 -translate-y-1/2 text-white text-4xl no-underline z-50 transition-transform hover:scale-125 hover:text-[#c5c5c5]"
          aria-label="Document précédent"
        >
          &#10094;
        </Link>
      )}

      {/* Next navigation arrow */}
      {nextSlug && (
        <Link
          href={`/documents/${nextSlug}`}
          className="fixed right-[30px] top-1/2 -translate-y-1/2 text-white text-4xl no-underline z-50 transition-transform hover:scale-125 hover:text-[#c5c5c5]"
          aria-label="Document suivant"
        >
          &#10095;
        </Link>
      )}
    </>
  )
}
