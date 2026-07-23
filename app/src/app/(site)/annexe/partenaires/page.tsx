import ImageTooltip from '@/components/ImageTooltip'

const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function PartenairesPage() {
  return (
    <div className="bg-[hsl(0,0%,96%)]">
      {/* Hero */}
      <section className="chapter-entete">
        <div className="chapter-overlay" />
        <div className="chapter-hero">
          <h1 className="chapter-titre">Partenaires</h1>
        </div>
        <ImageTooltip
          src={`${base}/images/Header_Chapitre/A1_0015.jpg`}
          legend=""
          alt=""
        />
      </section>

      {/* Content */}
      <div className="article-content">
        <div className="article-paragraph">
          <p>
            Ce Webdocumentaire a été conçu à partir des archives confiées par Jean-Paul Goux. Il a
            été complété par différentes ressources photographiques provenant&nbsp;:
          </p>
          <ul className="list-disc ml-5 mb-10 pl-[10%] text-left w-auto">
            <li>
              de Gilles Choffé qui, avec une extrême générosité, a bien voulu nous confier
              l&apos;ensemble de ses archives constituées autour de la résidence de Jean-Paul Goux à
              Montbéliard en 1984-1986, avec les droits afférents. Sans son apport, ce site
              n&apos;aurait pas existé.
            </li>
            <li>des Archives départementales de la Haute-Saône</li>
            <li>des Archives départementales du Doubs</li>
            <li>des Archives départementales du Territoire de Belfort</li>
            <li>des Archives municipales de Montbéliard</li>
            <li>
              de l&apos;Association du Patrimoine Bethoncourtois et de son fonds photographique mis
              à notre disposition par M. Raymond Pepier
            </li>
            <li>
              du Fonds de dotation Peugeot pour la mémoire de l&apos;histoire industrielle - Centre
              d&apos;archives de Terre Blanche
            </li>
            <li>de M. Jean-Marie Ramos pour le site de La Roche (Bavans)</li>
            <li>du Musée Japy de Beaucourt</li>
          </ul>
        </div>
      </div>

      {/* Credits */}
      <section className="credits-section">
        <div className="credits-inner">
          <p>
            Droits photographiques : Madeure - Cités Blanches
            <br />
            Photographie du 10 mars 1985 de Gilles Choffé
          </p>
        </div>
      </section>
    </div>
  )
}
