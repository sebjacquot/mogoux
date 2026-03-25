import ImageTooltip from '@/components/ImageTooltip'

const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function MentionsLegalesPage() {
  return (
    <div className="bg-[hsl(0,0%,96%)]">
      {/* Hero */}
      <section className="chapter-entete" style={{ height: '50vh' }}>
        <div className="chapter-overlay" />
        <div
          className="absolute bottom-0 left-0 z-[5] flex flex-col items-center justify-end w-full pointer-events-none pb-8"
          style={{ height: '50vh' }}
        >
          <h1 className="chapter-titre">Mentions Légales</h1>
        </div>
        <ImageTooltip
          src={`${base}/images/Header_Chapitre/A1_0015.jpg`}
          legend=""
          alt=""
        />
      </section>

      {/* Content */}
      <div className="article-content">
        <h2 className="article-section-title">Conception</h2>
        <div className="article-paragraph">
          <p>
            Ce Webdocumentaire a été réalisé initialement dans le cadre du &quot;Projet Archives
            Goux&quot;, AAP Région Amorçage 2022-2025, financé par la Région Bourgogne
            Franche-Comté.
          </p>
        </div>

        <h2 className="article-section-title">Ce webdocumentaire est édité par&nbsp;:</h2>
        <div className="article-paragraph">
          <p>
            ELLIADD UR 4661
            <br />
            30-32 rue Mégevand
            <br />
            25000 Besançon
            <br />
            03.81.66.54.22
          </p>
        </div>
        <div className="article-paragraph">
          <p>
            MSHE UAR 3124
            <br />
            Esplanade Germaine Tillion
            <br />
            1 rue Charles Nodier
            <br />
            25000 Besançon
            <br />
            03.81.66.54.22
          </p>
        </div>

        <h2 className="article-section-title">Directeur de la publication&nbsp;:</h2>
        <div className="article-paragraph">
          <p>M. Hugues Daussy Président de l&apos;Université Marie et Louis Pasteur</p>
        </div>

        <h2 className="article-section-title">Directeur de la rédaction&nbsp;:</h2>
        <div className="article-paragraph">
          <p>Pascal Lécroart, directeur d&apos;ELLIADD</p>
        </div>

        <h2 className="article-section-title">Hébergement du site&nbsp;:</h2>
        <div className="article-paragraph">
          <p>
            MSHE UAR 3124
            <br />
            Esplanade Germaine Tillion
            <br />
            1 rue Charles Nodier
            <br />
            25000 Besançon
            <br />
            03.81.66.51.51
          </p>
        </div>

        <h2 className="article-section-title">Crédits</h2>
        <div className="article-paragraph">
          <p>Développement : Thomas Pasquier, Paul Gravinese et Sébastien Jacquot</p>
        </div>

        <h2 className="article-section-title">Droit d&apos;auteur&nbsp;:</h2>
        <div className="article-paragraph">
          <p>
            L&apos;ensemble de ce site relève de la législation française et internationale sur le
            droit d&apos;auteur et la propriété intellectuelle. Tous les droits de reproduction et
            de diffusion sont réservés, y compris pour les représentations iconographiques et
            photographiques.
            <br />
            La reproduction de tout ou partie de ce site sur un support quel qu&apos;il soit, est
            formellement interdite sauf autorisation expresse du directeur de la publication.
            <br />
            La création de liens hypertextes vers ce site est autorisée sous réserve de&nbsp;:
          </p>
          <ul className="list-disc ml-5 mb-10 pl-[10%] text-left w-auto">
            <li>ne pas utiliser la technique du lien profond effectué vers des fichiers téléchargeables ou exécutables ;</li>
            <li>ne pas utiliser ce site dans un cadre dénaturant son identité visuelle et excluant son identification ;</li>
            <li>ne pas effectuer de lien vers une image ou photographie en l&apos;incluant dans une page hors de ce site ;</li>
            <li>ne pas utiliser les informations de ce site à des fins commerciales ou publicitaires.</li>
          </ul>
        </div>

        <h2 className="article-section-title">Navigation&nbsp;:</h2>
        <div className="article-paragraph">
          <p>
            Ce site a été conçu pour les navigateurs Microsoft Edge, Mozilla Firefox et Google
            Chrome.
          </p>
        </div>
      </div>

      {/* Credits */}
      <section className="credits-section">
        <div className="credits-inner">
          <p>
            Droits photographiques : Madeure - Cités Blanches.
            <br />
            Photographie du 10 mars 1985 de Gilles Choffé
          </p>
        </div>
      </section>
    </div>
  )
}
