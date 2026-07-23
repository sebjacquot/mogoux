import Link from 'next/link'
import ImageTooltip from '@/components/ImageTooltip'

const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left panel */}
      <div className="flex items-center justify-center bg-primary md:max-w-[55%] w-full pt-28 pb-16 md:py-0">
        <div className="flex flex-col gap-7 px-8 md:px-[120px] md:pr-[251px] font-inter text-secondary">
          <h1 className="leading-tight">
            <span className="block text-[clamp(32px,4vw,50px)]">Des</span>
            <span className="block text-[clamp(48px,6vw,80px)] leading-none">Mémoires ouvrières</span>
            <span className="block text-[clamp(32px,4vw,50px)] mt-4">aux</span>
            <em className="block text-[clamp(48px,6vw,80px)] leading-none">Mémoires de l'Enclave</em>
          </h1>

          <p className="text-[16px] leading-6 font-normal text-site-text pr-8 md:pr-[30px]">
            En 1984, Jean-Paul Goux, jeune écrivain, bénéficie d'une résidence
            d'écriture pour concevoir un ouvrage sur la mémoire ouvrière du Pays de
            Montbéliard, dans l'Est de la France. Après un travail de plus d'un an
            sur place, il rédige et publie{' '}
            <em>Mémoires de l'Enclave</em>, ouvrage fondateur de la littérature
            d'enquête contemporaine. Ce site reconstitue cette aventure.
          </p>

          <Link
	    href="/navigation"
            className="flex items-center gap-2.5 text-secondary no-underline group w-fit"
          >
            <h2 className="text-[13px] uppercase font-semibold tracking-wide transition-all duration-200 group-hover:tracking-widest">
              Visiter le site
            </h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-200 group-hover:translate-x-2"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Right panel – full-height image */}
      <div className="w-full md:w-[45%] h-[50vw] md:h-screen">
        <ImageTooltip
          src={`${base}/images/0456.jpg`}
          legend="Ouvrière de la SCOP Cristel (ancienne usine Japy du Rondelot, à Fesches-le-Châtel) photographiée au travail le 21 mai 1985 par Gilles Choffé."
          alt="Ouvrière de la SCOP Cristel photographiée au travail le 21 mai 1985"
        />
      </div>
    </div>
  )
}
