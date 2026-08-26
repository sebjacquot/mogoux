import ImageTooltip from '@/components/ImageTooltip'
import SuggestionsCard from '@/components/SuggestionsCard'
import DocumentairePlayer from '@/components/DocumentairePlayer'

const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function DocumentairePage() {
  return (
    <div className="bg-[hsl(0,0%,96%)]">
      {/* Hero */}
      <section className="chapter-entete" style={{ height: '50vh' }}>
        <div className="chapter-overlay" />
        <div className="absolute inset-0 z-[5] flex flex-col items-center justify-center w-full pointer-events-none">
          <span className="chapter-tag">Documentaire</span>
          <h1 className="chapter-titre">
            <em>Paroles d&apos;ouvrières</em>
          </h1>
        </div>
        <ImageTooltip
          src={`${base}/images/Documentaire/Goux_6.jpg`}
          legend="Légende à ajouter"
          alt="Documentaire Paroles d'ouvrières"
        />
      </section>

      {/* Content */}
      <div className="article-content">
        <div className="article-paragraph">
          <p>
            En 2022, grâce au soutien du Pôle Thématique Lettres Langues Communication de
            l&apos;UBFC (projet « Émancipations »), un documentaire a été réalisé par Jean-Baptiste
            Benoît dans le cadre du Projet Archives Goux, suite à un travail collectif mené avec
            Quentin Arnoud, Andrée Chauvin-Vileno, Pascal Lécroart et David Michon. Ce documentaire,
            de près d&apos;une heure, a accompagné l&apos;exposition « Des mémoires ouvrières aux{' '}
            <em>Mémoires de l&apos;Enclave</em> » présentée à la MSH de Dijon en
            novembre 2022-janvier 2023 et à la MSHE de Besançon en septembre-octobre 2023.
          </p>
          <p>
            De fait, parmi les enregistrements sonores des entretiens menés sur le terrain en
            1984-1985 par Jean-Paul Goux figurent de nombreux témoignages des femmes : « la […]
            chose qui m&apos;intéressait essentiellement, à l&apos;Enclave, c&apos;était de
            rencontrer des hommes et des femmes, de les rencontrer vraiment, avec tout ce
            qu&apos;ils sont, là où ils sont ». Le documentaire <em>Paroles d&apos;ouvrières</em>{' '}
            reprend cette matière humaine et sonore en orientant l&apos;écoute et la réflexion sur
            la place des femmes, leur rapport à la domination et à l&apos;émancipation, dans un
            univers social encore régi par un modèle de paternalisme industriel et ses avatars.
          </p>
          <p>
            Nous vous offrons de consulter ici ce documentaire, introduit par la voix de Jean-Paul
            Goux lisant un extrait des <em>Mémoires de l&apos;Enclave</em>.
          </p>
        </div>

        <DocumentairePlayer />
      </div>

      {/* Credits */}
      <section className="credits-section">
        <div className="credits-inner">
          <p>
            Écrit par <strong>Pascal Lécroart</strong>
          </p>
          <p>Droits photographiques : Fonds Archives Goux</p>
        </div>
      </section>

      {/* Suggestions */}
      <div className="suggestions-tag">
        <h4>Suggestions</h4>
      </div>
      <section className="suggestions-section">
        <SuggestionsCard titre="Une commande de la cité" numero_chapitre="1" lien_image="C1_GOU_P17-04_01-P.jpg" />
        <SuggestionsCard titre="Du côté de l'Enclave" numero_chapitre="2" lien_image="C2_0363.jpg" />
        <SuggestionsCard titre="Discours du Maître, traces des luttes" numero_chapitre="3" lien_image="C3_Ouvriers filature_2_APB.jpg" />
      </section>
    </div>
  )
}
