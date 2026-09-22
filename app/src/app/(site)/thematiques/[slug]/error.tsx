'use client'

import Link from 'next/link'

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-white gap-6 px-4 text-center">
      <h1 className="text-2xl font-bold">Thématique introuvable</h1>
      <p className="text-gray-400">Cette thématique n'existe pas ou n'est plus disponible.</p>
      <Link href="/thematiques" className="underline text-secondary hover:opacity-80 transition-opacity">
        Retourner aux thématiques
      </Link>
    </div>
  )
}
