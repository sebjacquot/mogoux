'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

const menuItems = [
  {
    title: 'Accueil',
    links: [
      { label: 'Accueil', href: '/' },
      { label: 'Page de Navigation', href: '/navigation' },
    ],
  },
  {
    title: 'Mémoires Ouvrières',
    links: [
      { label: 'Accès aux thématiques', href: '/thematiques' },
      { label: 'Parcourir la carte', href: '/carte' },
    ],
  },
  {
    title: "Mémoires de l'Enclave",
    links: [
      { label: 'Biographie', href: '/chapitres/biographie' },
      { label: 'Chapitrage', href: '/chapitres' },
      { label: 'Documentaire', href: '/documentaire' },
    ],
  },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openSection, setOpenSection] = useState<number | null>(null)
  const [burgerVisible, setBurgerVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (y > lastScrollY.current && y > 80) {
        // scrolling down → hide burger (and close menu)
        setBurgerVisible(false)
        setMenuOpen(false)
      } else {
        // scrolling up → show burger
        setBurgerVisible(true)
      }
      lastScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleMenu = () => setMenuOpen((v) => !v)
  const toggleSection = (i: number) =>
    setOpenSection((prev) => (prev === i ? null : i))

  return (
    <>
      {/* Burger icon — hides on scroll down, shows on scroll up */}
      <div
        className={`fixed top-0 left-0 z-[1000] w-20 h-20 bg-nav flex items-center justify-center cursor-pointer transition-transform duration-300 ${
          burgerVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
        onClick={toggleMenu}
        aria-label="Menu"
        role="button"
      >
        <div className="flex flex-col gap-[5px]">
          <span className="block w-[30px] h-[3px] rounded bg-secondary opacity-90" />
          <span className="block w-[30px] h-[3px] rounded bg-secondary opacity-90" />
        </div>
      </div>

      {/* Dropdown menu */}
      <div
        className={`fixed top-20 left-0 w-[300px] bg-nav z-[999] shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {menuItems.map((item, i) => (
          <div key={i} className="mb-2.5 overflow-hidden rounded text-base font-bold min-h-[50px]">
            <button
              onClick={() => toggleSection(i)}
              className="w-full text-left text-lg font-semibold text-secondary/60 bg-transparent border-none px-[30px] py-2.5 cursor-pointer"
            >
              {item.title}
            </button>
            <div
              className={`overflow-hidden bg-[#1a1a1a] transition-all duration-300 ${
                openSection === i ? 'max-h-40 py-2.5' : 'max-h-0'
              }`}
            >
              {item.links.map((link, j) => (
                <Link
                  key={j}
                  href={`${link.href}`}
                  onClick={() => setMenuOpen(false)}
                  className="block px-5 py-1 text-secondary no-underline uppercase text-sm hover:underline hover:opacity-50 pl-10"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Overlay to close menu on outside click */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[998]"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  )
}
