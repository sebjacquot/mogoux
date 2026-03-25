import Link from 'next/link'

const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

interface Props {
  titre: string
  numero_chapitre: string
  lien_image: string
}

export default function SuggestionsCard({ titre, numero_chapitre, lien_image }: Props) {
  return (
    <Link href={`${base}/chapitres/chapitre${numero_chapitre}`} className="no-underline">
      <div className="w-[85vw] max-w-[300px] h-[180px] overflow-hidden rounded-sm relative group">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 z-[5] group-hover:bg-[#e72465]/30 transition-all duration-300" />

        {/* Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${base}/images/Header_Chapitre/${lien_image}`}
          alt={`Image chapitre ${numero_chapitre}`}
          className="w-full h-full object-cover scale-110 relative z-[1] transition-transform duration-300"
        />

        {/* Tag */}
        <div className="absolute top-5 left-5 z-[5] px-2.5 py-1 rounded-sm bg-[#e72465]">
          <h4 className="text-white font-bold uppercase text-xs leading-4 font-helvetica">
            CHAPITRE {numero_chapitre}
          </h4>
        </div>

        {/* Title */}
        <h3 className="absolute bottom-2.5 left-0 w-full text-center text-white font-semibold text-base leading-tight z-[20] px-5 font-helvetica">
          {titre}
        </h3>
      </div>
    </Link>
  )
}
