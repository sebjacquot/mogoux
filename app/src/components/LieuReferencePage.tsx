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
      {/* Text container with slide animation */}
      <div className="overflow-hidden w-full">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: showingQuote ? 'translateX(-100%)' : 'translateX(0%)' }}
        >
          {/* Description */}
          <div
            className="w-full flex-shrink-0 text-justify text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
          {/* Quote */}
          <div
            className="w-full flex-shrink-0 text-justify text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: quoteHtml }}
          />
        </div>
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
