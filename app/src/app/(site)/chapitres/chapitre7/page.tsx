import ImageTooltip from '@/components/ImageTooltip'
import ImageFullscreen from '@/components/ImageFullscreen'
import SuggestionsCard from '@/components/SuggestionsCard'

const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function Chapitre7Page() {
  return (
    <div className="bg-[hsl(0,0%,96%)]">
      <section className="chapter-entete">
        <div className="chapter-overlay" />
        <div className="chapter-hero">
          <span className="chapter-tag">CHAPITRE 7</span>
          <h1 className="chapter-titre">La fabrique du texte</h1>
          <h2 className="chapter-soustitre">Découpages, collages, montages et jeux de construction</h2>
          <div className="bg-[hsl(0,0%,96%)] w-full max-w-[75em] mt-8 pt-5 px-4 md:px-10 pb-5 flex flex-col justify-center max-h-[22vh] overflow-hidden sm:max-h-none sm:overflow-visible">
            <p className="font-serif text-[17px] text-center self-center"><em>Mémoires de l'Enclave</em> est né d'un travail complexe à partir de sources diverses : aux nombreux textes et documents préexistants s'ajoute la matière des entretiens oraux ensuite transcrits par écrit.</p>
            <div className="flex justify-center items-center relative mt-5">
              <div className="px-2.5 bg-[hsl(0,0%,96%)] z-[3]" />
              <div className="border-b border-[#d9d9d9] block w-full absolute top-2.5 z-0" />
            </div>
          </div>
        </div>
        <ImageTooltip src={`${base}/images/Header_Chapitre/C7_GOU_P17-05_04-P.jpg`} legend="Jean-Paul Goux en discussion à l'occasion d'une exposition organisée lors d'un meeting de Lutte ouvrière le 3 mars 1985. Photographie de Gilles Choffé" alt="Goux exposition 1985" />
      </section>

      <div className="article-content">
        <div className="article-paragraph">
          <p>Les <em>Mémoires de l'Enclave</em> ont pour particularité d'accueillir différentes écritures et différentes voix.</p>
        </div>

        <h2 className="article-section-title">La documentation écrite</h2>
        <div className="article-paragraph">
          <p>La plupart des chapitres d'analyse critique, historique et sociologique des <em>Mémoires de l'Enclave</em> font une large place à des citations de textes, particulièrement visibles dans le manuscrit de l'ouvrage.</p>
        </div>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Chapitre7/GOU_03_13_0010.jpg`} legend="Manuscrit (avec découpages) des Mémoires de l'Enclave" alt="Manuscrit découpages" />
          <p>Manuscrit (avec découpages) des Mémoires de l'Enclave © Fonds Goux, GOU 03 13 00010</p>
        </div>
        <div className="article-paragraph">
          <p>De fait, Goux a souvent procédé par découpages et collages à partir de multiples documents photocopiés : journaux, revues, publicités, brochures historiques, documents promotionnels des entreprises, tracts syndicaux, comptes rendus de réunions d'entreprises, etc. Il ne se prive pas d'annoter, couper, recomposer et parfois réécrire certains passages. Ces documents ont été notamment confiés à Goux par différentes personnes rencontrées sur place, avant d'être regroupés en différentes pochettes.</p>
        </div>
        <div className="max-w-[700px] w-full mx-auto mb-6">
          <video controls preload="metadata" poster={`${base}/images/Chapitres/Chapitre7/image-animation-1.jpg`} controlsList="nodownload" className="w-full h-auto">
            <source src={`${base}/images/Chapitres/Chapitre7/Jean-Paul_Goux_Animation1.mp4`} type="video/mp4" />
            Votre navigateur ne supporte pas la lecture de vidéos.
          </video>
          <p className="text-[14px] italic text-[#666] text-center">Animation vidéo montrant comment Goux a exploité la documentation</p>
        </div>

        <h2 className="article-section-title">La réécriture des entretiens oraux</h2>
        <div className="article-paragraph">
          <p>Par ailleurs, <em>Les Mémoires de l'Enclave</em> ont été en partie écrites à partir d'entretiens réalisés par Jean-Paul Goux auprès d'ouvriers et ouvrières d'usines. Comment le texte a-t-il été fabriqué à partir des entretiens de départ ? L'accès aux archives permet de répondre à cette question par la reconstitution des différentes strates :</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>l'entretien enregistré</li>
            <li>la retranscription écrite de l'entretien</li>
            <li>le brouillon où l'écrivain retravaille le texte de départ</li>
            <li>le texte final</li>
          </ul>
        </div>
        <div className="article-paragraph">
          <p>Goux ne s'est bien sûr pas contenté de mettre au propre l'entretien initial. Une première analyse des brouillons montre au contraire qu'il se livre à une véritable réécriture, à partir de deux opérations de base :</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>la suppression : une partie importante des entretiens ne figure pas dans la version finale</li>
            <li>la permutation : Goux n'a pas non plus suivi le déroulé initial de l'entretien. Un réaménagement en profondeur est ainsi particulièrement visible.</li>
          </ul>
        </div>
        <div className="article-paragraph">
          <p>Les chapitres d'entretiens des <em>Mémoires</em> résultent donc d'un travail très important de collage, de montage du texte initial.</p>
        </div>
        <div className="max-w-[700px] w-full mx-auto mb-6">
          <video controls preload="metadata" poster={`${base}/images/Chapitres/Chapitre7/image-animation-2.jpg`} controlsList="nodownload" className="w-full h-auto">
            <source src={`${base}/images/Chapitres/Chapitre7/Jean-Paul_Goux_Animation2.mp4`} type="video/mp4" />
            Votre navigateur ne supporte pas la lecture de vidéos.
          </video>
          <p className="text-[14px] italic text-[#666] text-center">Animation vidéo montrant comment Goux a tiré parti d'un entretien audio pour son ouvrage</p>
        </div>

        <h2 className="article-section-title">En remontant le fil d'un entretien</h2>
        <div className="article-paragraph">
          <p>Pour mettre en évidence ce travail, on peut prendre l'exemple du chapitre X : « Du côté d'Héricourt (1) De 1941 à 1981 au tissage de la Grand-Pré ». Les premières pages du texte final ont été comparées avec la partie correspondante de l'entretien de départ (cassettes 29-30) et avec le brouillon de cette ouverture figurant dans le manuscrit. Le début du chapitre dans le livre imprimé porte sur la dénomination de l'usine (« C'est un peu une anomalie, mais on disait l'établissement de ''la Grand-Pré'' »). La locutrice évoque ensuite les problèmes liés à la succession de trois équipes (nuit, matin, après-midi) et décrit les conditions matérielles pénibles, notamment en été. L'humidité et la chaleur adaptées au traitement du fil de coton sont imposées aux ouvrières, ainsi que l'odeur écœurante qui en résulte et le bruit incessant et intense des métiers à tisser. Le début de la transcription de l'entretien ne correspond pas du tout au début du chapitre définitif. Dans l'entretien, l'interlocutrice de Goux énumère d'abord les établissements de tissage et les filatures ainsi que la succession des patrons avant de répondre avec précision à une question sur les processus de fabrication.</p>
        </div>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Chapitre7/GOU_01_02_29_30_0005.jpg`} legend="Transcription entretien cassette 29-30, Mme B., p. 1" alt="Transcription entretien 1" />
          <p>Transcription entretien cassette 29-30, Mme B., p. 1 © Fonds Goux, GOU 01 02 29 30 0005</p>
        </div>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Chapitre7/GOU_01_02_29_30_0007.jpg`} legend="Transcription entretien cassette 29-30, Mme B., p. 2" alt="Transcription entretien 2" />
          <p>Transcription entretien cassette 29-30, Mme B., p. 2 © Fonds Goux, GOU 01 02 29 30 0007</p>
        </div>
        <div className="article-paragraph">
          <p>Cette confrontation entre le chapitre final et la transcription d'entretien illustre le montage opéré, puisque le début du texte final correspond pour partie aux pages 4 et 5 de l'entretien qui abordent la question de la succession des équipes, à propos des pièces défectueuses fabriquées par les équipes de nuit, et celle des conditions de travail. Ensuite des passages des pages 15 et 22 de l'entretien sont repris dans le chapitre, avant que celui-ci revienne à la page 5 pour préciser le nombre de métiers que peuvent avoir en charge les tisserandes.</p>
        </div>
        <div className="article-paragraph">
          <p>La première phrase du chapitre final se trouve, elle, en page 6 de la retranscription de l'entretien. Elle a donc été découpée et propulsée en ouverture.</p>
        </div>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Chapitre7/GOU_01_02_29_30p6.jpg`} legend="Transcription entretien cassette 29-30, Mme B., p. 6, (extraits)" alt="Transcription entretien 3" />
          <p>Transcription entretien cassette 29-30, Mme B., p. 6, (extraits) © Fonds Goux, GOU 01 02 29 30 0015</p>
        </div>
        <div className="article-paragraph">
          <p>Le brouillon porte la trace de ce collage, au sens propre du terme : sur la deuxième page apparaît en haut à droite le numéro de la page d'entretien (5) sur laquelle ont été collés des pavés de texte venant d'autres pages, et où figure le numéro en rouge du manuscrit (2). Les flèches rouges qui parsèment le document révèlent le réaménagement du matériau de départ, ainsi que le filage réalisé entre les pavés de texte, les mentions manuscrites servant à établir une transition entre les morceaux collés et déplacés.</p>
        </div>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Chapitre7/GOU_03_10_bis0006.jpg`} legend="Manuscrit correspondant au chapitre X" alt="Manuscrit chapitre X" />
          <p>Manuscrit correspondant au chapitre X © Fonds Goux, GOU 03 10 bis 0006</p>
        </div>
        <div className="article-paragraph">
          <p>Ainsi sur cette même page de brouillon, le deuxième pavé collé, entouré de rouge par l'auteur provient de la page 15 de l'entretien, soit la section finale de celui-ci. Ce pavé se subdivise lui-même en deux parties : les détails relatifs à l'alcool de menthe et au bleu des toits introduisent le motif de la chaleur, le reste du bloc permettant l'enchaînement sur le thème des odeurs pour mettre en évidence la difficulté des conditions de travail.</p>
        </div>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Chapitre7/GOU_05_01_0005.jpg`} legend="Photographie Tissage du Paquis, Héricourt" alt="Tissage Paquis Héricourt" />
          <p>Photographie Tissage du Paquis, Héricourt © Fonds Goux, GOU 05 01 0005</p>
        </div>
      </div>

      <section className="credits-section">
        <div className="credits-inner">
          <p>Écrit par <strong>Pascal Lécroart et Yvon Houssais</strong></p>
          <p>Droits photographiques : Fonds Archives Goux</p>
        </div>
      </section>

      <div className="suggestions-tag"><h4>Suggestions</h4></div>
      <section className="suggestions-section">
        <SuggestionsCard titre="La structuration des Mémoires" numero_chapitre="6" lien_image="C6_0100.jpg" />
        <SuggestionsCard titre="Du manuscrit au(x) livre(s)" numero_chapitre="8" lien_image="C8_GOU_P23-04_05-P.jpg" />
        <SuggestionsCard titre="Le fonds photographique" numero_chapitre="9" lien_image="C9_GOU_A_08_04_083.jpg" />
      </section>
    </div>
  )
}

