import ImageTooltip from '@/components/ImageTooltip'
import ImageFullscreen from '@/components/ImageFullscreen'
import SuggestionsCard from '@/components/SuggestionsCard'

const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function Chapitre4Page() {
  return (
    <div className="bg-[hsl(0,0%,96%)]">
      <section className="chapter-entete">
        <div className="chapter-overlay" />
        <div className="chapter-hero">
          <span className="chapter-tag">CHAPITRE 4</span>
          <h1 className="chapter-titre">Enquête sur la mémoire collective</h1>
          <h2 className="chapter-soustitre">Le travail de documentation mené par l'écrivain</h2>
          <div className="bg-[hsl(0,0%,96%)] w-full max-w-[75em] mt-8 pt-5 px-4 md:px-10 pb-5 hidden sm:flex flex-col justify-center">
            <p className="font-serif text-[17px] text-center self-center">Pendant sa résidence, Jean-Paul Goux a longuement travaillé sur des ouvrages et des archives, tout en menant de très nombreux entretiens, multipliant les rencontres avec des ouvrières et des ouvriers, qu'ils soient à la retraite ou toujours actifs et engagés dans leur activité professionnelle.</p>
            <div className="flex justify-center items-center relative mt-5">
              <div className="px-2.5 bg-[hsl(0,0%,96%)] z-[3]" />
              <div className="border-b border-[#d9d9d9] block w-full absolute top-2.5 z-0" />
            </div>
          </div>
        </div>
        <ImageTooltip src={`${base}/images/Header_Chapitre/C4_GOU_P8-03_03-P.jpg`} legend="Jean-Paul Goux photographié lors d'un entretien le 30 novembre 1984. Photographie de Gilles Choffé" alt="Goux entretien 1984" />
      </section>

      <div className="article-content">
        <h2 className="article-section-title">Garder la trace de ce qui disparaît</h2>
        <div className="article-paragraph">
          <p>Le projet de Jean-Paul Goux a pour objet la mémoire collective du pays de Montbéliard, définie comme « ce qui reste du passé dans l'histoire vécue des gens ». Celle des habitants de l'Enclave a été marquée par l'expérience du travail dans des industries progressivement disparues au profit des usines Peugeot qui concentrent désormais l'essentiel de l'activité.</p>
        </div>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Chapitre4/GOU_04_B_08_0015b.jpg`} legend="Texte dactylographié « La mémoire collective »" alt="Texte mémoire collective" />
          <p>Texte dactylographié « La mémoire collective » © Fonds Goux, GOU 04 B 08 0015</p>
        </div>
        <div className="article-paragraph">
          <p>Dans une conférence donnée en 2017 à propos de <em>Mémoires de l'Enclave</em>, il développe une belle comparaison qui explicite sa vision romantique de la mission à réaliser : « je me représentais le travail que j'avais à faire à la manière de ces musiciens du début du XIX<sup>e</sup> siècle qui, dans l'Europe entière, allaient recueillir les mélodies populaires en train de disparaître, ou à la manière de ces écrivains de l'Allemagne romantique, Grimm, Herder, Brentano, von Arnim, allant recueillir les traces de cette culture populaire où ils voyaient la source d'une culture nationale »</p>
        </div>

        <h2 className="article-section-title">Les sources d'une enquête</h2>
        <div className="article-paragraph">
          <p>Extérieur au monde qu'il découvre, Goux collecte des documents susceptibles de lui donner accès au passé de l'Enclave et de mieux comprendre les déterminismes qui pèsent sur les ouvrières et les ouvriers. Il se rend aux archives de Montbéliard, de Belfort et dans les archives Peugeot où il recueille l'avis de spécialistes de l'histoire régionale.</p>
        </div>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Chapitre4/GOU_04_B_0072_avec_texte.jpg`} legend="Lettre de François Lassus à Jean-Paul Goux (1er octobre 1985)" alt="Lettre Lassus 1985" />
          <p>Lettre de François Lassus à Jean-Paul Goux (1er octobre 1985) © Fonds Goux, GOU 04 B 0072</p>
        </div>
        <div className="article-paragraph">
          <p>Il accumule une précieuse documentation écrite sur le paternalisme comme système d'encadrement des individus et sur les luttes syndicales, de 1936 à 1981. Ces documents donnent accès à une réalité dont l'écrivain découvre la complexité.</p>
        </div>

        <h2 className="article-section-title">Redonner la parole aux sans-voix</h2>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Chapitre4/GOU_03_E_0029.jpg`} legend="Note dactylographiée (extrait)" alt="Note dactylographiée" />
          <p>Note dactylographiée (extrait) © Fonds Goux, GOU 03 E 0029</p>
        </div>
        <div className="article-paragraph">
          <p>Le milieu des années 1980 est marqué par la vogue des récits de vie en milieu populaire, qu'il s'agisse des paysans dans un monde rural en voie de disparition, ou des ouvriers dont plusieurs autobiographies sont éditées ou rééditées entre le milieu des années 1970 et le milieu des années 1980. L'histoire orale est par ailleurs en plein essor au cours des années 1980, grâce aux travaux pionniers d'historiens comme Alain Corbin et Philippe Joutard.</p>
        </div>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Chapitre4/GOU_03_05_0026.jpg`} legend="Lettre (extrait) de Jean-Marc Debard à Jean-Paul Goux (16 septembre 1984)" alt="Lettre Debard 1984" />
          <p>Lettre (extrait) de Jean-Marc Debard à Jean-Paul Goux (16 septembre 1984) © Fonds Goux, GOU 03 05 0026</p>
        </div>
        <div className="article-paragraph">
          <p>Tous les aspects de la vie quotidienne, du travail et des loisirs sont abordés au cours de 110 heures d'enregistrement, qui font bien plus qu'enrichir le corpus documentaire. La place prise par le témoignage oral dans le projet laisse néanmoins sceptiques quelques-uns. Ainsi, l'historien Jean-Marc Debard met en garde contre les « calembredaines pseudo-scientifiques », manifestant un dédain positiviste.</p>
        </div>
      </div>

      <section className="credits-section">
        <div className="credits-inner">
          <p>Écrit par <strong>Odile Roynette</strong></p>
          <p>Droits photographiques : Fonds Archives Goux</p>
        </div>
      </section>

      <div className="suggestions-tag"><h4>Suggestions</h4></div>
      <section className="suggestions-section">
        <SuggestionsCard titre="Discours du Maître, traces des luttes" numero_chapitre="3" lien_image="C3_Ouvriers filature_2_APB.jpg" />
        <SuggestionsCard titre="Une œuvre littéraire" numero_chapitre="5" lien_image="C5_0407.jpg" />
        <SuggestionsCard titre="La structuration des Mémoires" numero_chapitre="6" lien_image="C6_0100.jpg" />
      </section>
    </div>
  )
}

