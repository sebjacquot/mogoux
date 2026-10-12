'use client'

import { useState } from 'react'

interface Props {
  descriptionHtml: string
  quoteHtml: string
}

export default function LieuReferenceToggle({ descriptionHtml, quoteHtml }: Props) {
  const [showingQuote, setShowingQuote] = useState(false)

  return (
    <div className="pointer-events-auto w-full">
      {/* Text container with fade animation */}
      <div className="w-full">
        <div
          className="text-justify text-sm leading-relaxed transition-opacity duration-300"
          dangerouslySetInnerHTML={{ __html: showingQuote ? quoteHtml : descriptionHtml }}
        />
      </div>

      {/* Toggle button */}
      <div className="flex justify-end mt-5">
        <button
          onClick={() => setShowingQuote(!showingQuote)}
          className="inline-block bg-white/10 border-none text-secondary font-graphik font-extrabold text-[13px] leading-[2.9] px-5 rounded cursor-pointer transition-colors hover:bg-white/20"
        >
          {showingQuote ? (
            'Retour à la description'
          ) : (
            <>
              Citation des <em>Mémoires de l&apos;Enclave</em>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
