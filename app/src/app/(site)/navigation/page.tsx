import Link from 'next/link'
import ImageTooltip from '@/components/ImageTooltip'

const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function NavigationPage() {
  const ArrowIcon = () => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`${base}/icones/fleche-goux.svg`} alt="flèche" className="w-6 h-6 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
  )

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left – Mémoires ouvrières */}
      <section className="relative w-full md:w-1/2 min-h-[50vh] md:h-screen flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0">
          <ImageTooltip
            src={`${base}/images/0466.jpg`}
            legend="Ouvrières de la SCOP Cristel photographiées au travail le 21 mai 1985 par Gilles Choffé."
            alt="Ouvrières de la SCOP Cristel"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 p-10 pt-24 md:p-[80px] md:pt-[80px] md:pb-[50px] text-white">
          <h2 className="font-bold text-[clamp(36px,4.5vw,70px)] leading-[1.15] w-[70%] max-w-[50vw] mb-4">
            Mémoires ouvrières
          </h2>
          <p className="text-[18px] leading-[30px] w-[55%] mb-6">
            Circulez parmi les témoignages sonores recueillis en 1984-1985 par Jean-Paul Goux,
            accompagnés de documents iconographiques.
          </p>
          <div className="flex flex-col gap-2.5">
            <Link href="/thematiques" className="group flex items-center gap-4 text-white no-underline font-bold text-[18px] md:text-[18px] sm:text-base">
              <ArrowIcon />
              <h3>Découvrir les thématiques</h3>
            </Link>
            <Link href="/carte" className="group flex items-center gap-4 text-white no-underline font-bold text-[18px] md:text-[18px] sm:text-base">
              <ArrowIcon />
              <h3>Parcourir la carte</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* Right – Mémoires de l'Enclave */}
      <section className="relative w-full md:w-1/2 min-h-[50vh] md:h-screen flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0">
          <ImageTooltip
            src={`${base}/images/GOU_P23-03_02-P.jpg`}
            legend="Jean-Paul Goux dédicaçant son livre au Musée du Château de Montbéliard le 27 avril 1986. Photographie de Gilles Choffé"
            alt="Jean-Paul Goux dédicaçant son livre"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 p-10 pt-24 md:p-[80px] md:pt-[80px] md:pb-[50px] text-white">
          <h2 className="font-bold text-[clamp(36px,4.5vw,70px)] leading-[1.15] w-[70%] max-w-[50vw] mb-4">
            <em>Mémoires de l'Enclave</em>
          </h2>
          <p className="text-[18px] leading-[30px] w-[55%] mb-6">
            Découvrez comment <em>Mémoires de l'Enclave</em> a été conçu et réalisé par son auteur,
            puis reçu par le public.
          </p>
          <div className="flex flex-col gap-2.5">
            <Link href="/chapitres/biographie" className="group flex items-center gap-4 text-white no-underline font-bold text-[18px] sm:text-base">
              <ArrowIcon />
              <h3>Présentation de Jean-Paul Goux</h3>
            </Link>
            <Link href="/chapitres" className="group flex items-center gap-4 text-white no-underline font-bold text-[18px] sm:text-base">
              <ArrowIcon />
              <h3>Chapitrage : la fabrique des <em>Mémoires de l'Enclave</em></h3>
            </Link>
            <Link href="/documentaire" className="group flex items-center gap-4 text-white no-underline font-bold text-[18px] sm:text-base">
              <ArrowIcon />
              <h3>Documentaire <em>Paroles d'ouvrières</em></h3>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
