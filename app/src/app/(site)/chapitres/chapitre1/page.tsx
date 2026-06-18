import ImageTooltip from '@/components/ImageTooltip'
import ImageFullscreen from '@/components/ImageFullscreen'
import SuggestionsCard from '@/components/SuggestionsCard'

const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function Chapitre1Page() {
  return (
    <div className="bg-[hsl(0,0%,96%)]">
      <section className="chapter-entete">
        <div className="chapter-overlay" />
        <div className="chapter-hero">
          <span className="chapter-tag">CHAPITRE 1</span>
          <h1 className="chapter-titre">Une commande de la Cité</h1>
          <h2 className="chapter-soustitre">Une résidence d'écriture bien singulière</h2>
          <div className="bg-[hsl(0,0%,96%)] w-full max-w-[75em] mt-8 pt-5 px-4 md:px-10 pb-5 hidden sm:flex flex-col justify-center">
            <p className="font-serif text-[17px] text-center self-center">Qu'une Association de culture et de loisirs nommée la Cité, liée au Comité d'établissements des automobiles Peugeot, passe commande d'un ouvrage sur la mémoire industrielle à un écrivain peut paraître bien étonnant : c'est le fruit de circonstances et de coïncidences remarquables.</p>
            <div className="flex justify-center items-center relative mt-5">
              <div className="px-2.5 bg-[hsl(0,0%,96%)] z-[3]" />
              <div className="border-b border-[#d9d9d9] block w-full absolute top-2.5 z-0" />
            </div>
          </div>
        </div>
        <ImageTooltip src={`${base}/images/Header_Chapitre/C1_GOU_P17-04_01-P.jpg`} legend="Jean-Paul Goux visitant une exposition organisée lors d'un meeting de Lutte ouvrière le 3 mars 1985. Photographie de Gilles Choffé" alt="Jean-Paul Goux exposition 1985" />
      </section>

      <div className="article-content">
        <h2 className="article-section-title">Faire appel à un écrivain</h2>
        <div className="article-paragraph">
          <p>Le 21 avril 1984, une convention est signée entre la Cité (Association de culture et de loisirs du Comité d'établissements des automobiles Peugeot), en la personne de son président Michel Vilquin, et l'écrivain Jean-Paul Goux. Elle fixe avec précision les conditions de réalisation d'un « ouvrage littéraire sur la mémoire collective de la région de Montbéliard » qui devra être achevé à la fin de l'année 1985. Le projet, qui repose sur les méthodes de l'enquête orale alors en plein essor dans les sciences sociales, est doté de moyens matériels (un studio loué à Montbéliard pendant une année, une voiture, du matériel d'enregistrement, une personne affectée à la transcription des entretiens) et des fonds (une bourse de 225 000 francs) qui permettent au « lauréat » de travailler sur place au projet qui lui est confié.</p>
        </div>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Chapitre1/GOU_04_B_07_0001.jpg`} legend="Première page du contrat signé entre la Cité et Jean-Paul Goux (21 avril 1984)" alt="Contrat Cité Goux 1984" />
          <p>Première page du contrat signé entre la Cité et Jean-Paul Goux (21 avril 1984) © Fonds Goux, GOU 04 B 07 0001</p>
        </div>
        <div className="article-paragraph">
          <p>La convention, qui prévoit la nature des droits d'auteur, ne stipule aucune condition supplémentaire, laissant à Goux une grande liberté pour concevoir un ouvrage qui réponde aux conditions de la « commande ». Celle-ci, comme le précisera plus tard Goux, n'a pas seulement pour fonction de « faire circuler l'argent en échange d'une œuvre », mais, comme dans le cas des artistes de la Renaissance italienne, « de produire une relation sociale complexe, […] de mettre en rapport des hommes, pour que de cette mise en rapport puisse naître une œuvre ». En cela, la commande de la Cité est « sociale ». L'artiste y trouvera « la possibilité d'élargir son expérience du monde » et le commanditaire verra naître une œuvre.</p>
        </div>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Captures/GOU_04_B_0015.PNG`} legend="Note manuscrite de Jean-Paul Goux" alt="Note manuscrite Goux" />
          <p>Note manuscrite de Jean-Paul Goux © Fonds Goux, GOU 04 B 0015</p>
        </div>

        <h2 className="article-section-title">Les contextes d'une enquête</h2>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Chapitre1/GOU_04_C_01_0006.jpg`} legend="L'Est républicain (7 avril 1984)" alt="L'Est républicain 1984" />
          <p>L'Est républicain (7 avril 1984) © Fonds Goux, GOU 04 C 01 0006</p>
        </div>
        <div className="article-paragraph">
          <p>La commande de la Cité s'insère dans un double contexte. L'arrivée de la gauche au pouvoir en mai 1981 suscite une embellie de la politique culturelle. De nombreuses initiatives qui valorisent la culture et la création artistique, sont lancées au sein du ministère de la Culture, dirigé par Jack Lang. Elles mettent aussi l'accent sur la diversité culturelle. En novembre 1982, un rapport du Commissariat au Plan recommandait d'engager des actions « pour mieux discerner les identités culturelles des divers groupes sociaux, favoriser leur expression, aider ceux qui en sont les porteurs à les reconnaître et à se reconnaître ».</p>
        </div>
        <div className="article-paragraph">
          <p>Dans ce contexte, également favorable à la décentralisation, deux membres de l'association la Cité, Monsieur Castioni (animateur) et Madame Cadet (bibliothécaire), relèvent le défi et obtiennent une convention subventionnée à hauteur de 150 000 francs par le ministère de la Culture, à laquelle s'ajoutent des aides versées par différents acteurs de la vie culturelle (DRAC, CNL, Centres d'action culturelle et bibliothèques des villes d'Audincourt, de Béthoncourt et de Montbéliard).</p>
        </div>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Chapitre1/GOU_04_C_01_0008.jpg`} legend="Interview de J.-P. Goux dans L'Est républicain (7 avril 1984)" alt="Interview Goux 1984" />
          <p>Interview de J.-P. Goux dans L'Est républicain (7 avril 1984) © Fonds Goux, GOU 04 C 01 0008</p>
        </div>
        <div className="article-paragraph">
          <p>Enquêter sur le passé industriel de l'Enclave a d'autant plus de sens que celle-ci est durement touchée par une désindustrialisation qui s'accélère au début des années 1980, notamment dans les « vieilles régions industrielles » du Nord et de l'Est de la France. La Franche-Comté n'est pas épargnée, et notamment le pays de Montbéliard caractérisé par le déclin de la pluriactivité industrielle héritée du XIX<sup>e</sup> siècle (forges, filatures, tissages, ateliers mécaniques) et par des restructurations visant à maintenir la production, notamment au sein des usines Peugeot disséminées dans l'Enclave. La crise sociale est à l'origine d'un chômage de masse qui constitue un défi pour le nouveau pouvoir politique issu des élections de mai 1981. Celui-ci annonce, en avril 1984, un 4<sup>e</sup> plan Acier qui prévoit de nombreuses suppressions d'emplois dans les secteurs en difficultés, dont le secteur automobile, non sans susciter d'importantes résistances dans le monde du travail.</p>
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
        <SuggestionsCard titre="Du côté de l'Enclave" numero_chapitre="2" lien_image="C2_0364.jpg" />
        <SuggestionsCard titre="Discours du Maître, traces des luttes" numero_chapitre="3" lien_image="C3_Ouvriers filature_2_APB.jpg" />
        <SuggestionsCard titre="Enquête sur la mémoire collective" numero_chapitre="4" lien_image="C4_GOU_P8-02_02-P.jpg" />
      </section>
    </div>
  )
}

