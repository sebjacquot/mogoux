import ImageTooltip from '@/components/ImageTooltip'

const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function EquipePage() {
  return (
    <div className="bg-[hsl(0,0%,96%)]">
      {/* Hero */}
      <section className="chapter-entete">
        <div className="chapter-overlay" />
        <div className="chapter-hero">
          <h1 className="chapter-titre">Equipe</h1>
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
          <h2 className="article-section-title">Conception et direction générale du projet de webdocumentaire&nbsp;:</h2>
          <ul className="list-disc ml-5 mb-10 pl-[10%] text-left w-auto">
            <li>Pascal Lécroart, PU, UMLP (ex UFC) - ELLIADD UR 4661</li>
          </ul>

          <h2 className="article-section-title">L&apos;équipe&nbsp;:</h2>
          <ul className="list-disc ml-5 mb-10 pl-[10%] text-left w-auto">
            <li>Quentin Arnoud, doctorant, UMLP (ex UFC) - ELLIADD</li>
            <li>Jean-Baptiste Benoit, réalisateur</li>
            <li>Andrée Chauvin-Vileno, PU émérite, UMLP (ex UFC) - ELLIADD</li>
            <li>Thomas Dandin, Archiviste, UMLP (ex UFC) - ELLIADD</li>
            <li>Yvon Houssais, PU, UMLP (ex UFC) - ELLIADD</li>
            <li>Sébastien Jacquot, Ingénieur d&apos;études, UMLP (ex UFC) - ELLIADD</li>
            <li>David Michon, Docteur - Partenaire</li>
            <li>Odile Roynette, PU, uB - LIR3S</li>
            <li>Julie Soulès, maître d&apos;oeuvre pour l&apos;exposition</li>
            <li>Jacky Frossard, design de l&apos;exposition</li>
          </ul>

          <p>
            L&apos;équipe tient à remercier Christopher Boulogne, Valentin Broissiat, Nicolas
            Guterlhe, Ilkay Men et Mathilda Schroll pour leur contribution générale au projet sur
            les archives de Jean-Paul Goux.
          </p>
          <p>
            Conception de la maquette du Webdocumentaire : Thomas Paquier et Paul Gravinese, avec
            l&apos;appui de Thomas Dandin
          </p>
          <p>
            Développement informatique du Webdocumentaire : Thomas Paquier et Paul Gravinese, avec
            l&apos;appui de Sébastien Jacquot
          </p>
          <p>
            Maintenance, suivi et gestion du Webdocumentaire : Sébastien Jacquot
          </p>
          <p>
            Traitement numérique des enregistrements audios : Pierre-Alain Lécroart - société de
            production Clockwise
          </p>
          <p>
            L&apos;équipe tient à remercier Ernest Chiarello et Cédric Degrelle pour l&apos;aide
            apportée.
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
