import Link from 'next/link'

const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function Footer() {
  return (
    <footer className="bg-primary text-white w-full px-10 pt-10 pb-5">
      {/* Top row */}
      <div className="flex justify-between items-start flex-wrap gap-6">
        <div className="flex gap-10 flex-wrap">
          <div className="flex flex-col">
            <h3 className="font-bold text-base mb-5">Institutions</h3>
            <a href="https://www.univ-fcomte.fr/" className="text-[#aaa] text-sm mb-1 no-underline hover:text-white">UMLP</a>
            <a href="https://elliadd.univ-fcomte.fr" className="text-[#aaa] text-sm mb-1 no-underline hover:text-white">ELLIADD</a>
            <a href="https://fanum.univ-fcomte.fr/fanum/" className="text-[#aaa] text-sm mb-1 no-underline hover:text-white">FANUM</a>
            <a href="https://mshe.univ-fcomte.fr" className="text-[#aaa] text-sm mb-1 no-underline hover:text-white">MSHE</a>
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-base mb-5">Informations légales</h3>
            <Link href="/annexe/mentions_legales" className="text-[#aaa] text-sm mb-1 no-underline hover:text-white">Mentions légales</Link>
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-base mb-5">Le projet</h3>
            <Link href="/annexe/presentation_projet" className="text-[#aaa] text-sm mb-1 no-underline hover:text-white">Manifeste éditorial</Link>
            <Link href="/annexe/equipe" className="text-[#aaa] text-sm mb-1 no-underline hover:text-white">L'équipe</Link>
            <Link href="/annexe/partenaires" className="text-[#aaa] text-sm mb-1 no-underline hover:text-white">Partenaires</Link>
          </div>
        </div>
        <a href="mailto:elliadd@univ-fcomte.fr">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${base}/icones/icon-mail.svg`} alt="Email" className="w-[50px]" />
        </a>
      </div>

      {/* Separator */}
      <div className="w-full h-px bg-[#444] my-5" />

      {/* Bottom row */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <p className="text-[#ccc] text-sm" />
        <div className="flex items-center">
          <a href="https://www.bourgognefranchecomte.fr">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${base}/icones/logo-rbfc-blanc.png`} alt="Région Bourgogne Franche-Comté" className="w-24 ml-5" />
          </a>
          <a href="https://elliadd.univ-fcomte.fr">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${base}/icones/LogoElliadd_blanc.png`} alt="ELLIADD" className="w-24 ml-5" />
          </a>
          <a href="https://mshe.univ-fcomte.fr">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${base}/icones/mshe-logo-blanc.png`} alt="MSHE" className="w-24 ml-5" />
          </a>
          <a href="https://www.univ-fcomte.fr/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${base}/icones/LOGO_UMLP_blanc.png`} alt="Université Marie et Louis Pasteur" className="w-24 ml-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
