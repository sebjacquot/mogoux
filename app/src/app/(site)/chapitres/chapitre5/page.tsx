import ImageTooltip from '@/components/ImageTooltip'
import ImageFullscreen from '@/components/ImageFullscreen'
import SuggestionsCard from '@/components/SuggestionsCard'

const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function Chapitre5Page() {
  return (
    <div className="bg-[hsl(0,0%,96%)]">
      <section className="chapter-entete">
        <div className="chapter-overlay" />
        <div className="chapter-hero">
          <span className="chapter-tag">CHAPITRE 5</span>
          <h1 className="chapter-titre">Une œuvre littéraire</h1>
          <h2 className="chapter-soustitre">Naissance d'un <em>"récit d'industrie"</em></h2>
          <div className="bg-[hsl(0,0%,96%)] w-full max-w-[75em] mt-8 pt-5 px-4 md:px-10 pb-5 flex flex-col justify-center max-h-[22vh] overflow-hidden sm:max-h-none sm:overflow-visible">
            <p className="font-serif text-[17px] text-center self-center">Si les auteurs de la commande s'attendaient plutôt à un roman, Goux leur a finalement proposé un ouvrage littéraire très singulier et divers, empruntant partiellement à la forme du journal intime tout en jouant sur la fiction, et revendiquant parallèlement une vraie valeur historique.</p>
            <div className="flex justify-center items-center relative mt-5">
              <div className="px-2.5 bg-[hsl(0,0%,96%)] z-[3]" />
              <div className="border-b border-[#d9d9d9] block w-full absolute top-2.5 z-0" />
            </div>
          </div>
        </div>
        <ImageTooltip src={`${base}/images/Header_Chapitre/C5_0407.jpg`} legend="Jean-Paul Goux photographié le 3 mars 1985 à son domicile, 6 avenue Joffre, à Montbéliard, lors de sa résidence. Photographie de Gilles Choffé" alt="Goux domicile 1985" />
      </section>

      <div className="article-content">
        <h2 className="article-section-title">Les modèles littéraires</h2>
        <div className="article-paragraph">
          <p>Dans la logique de la commande qui lui avait été passée par la Cité, Jean-Paul Goux a d'abord « accumulé les matériaux d'un livre qu'[il] pensai[t] devoir être un roman ». Si le résultat final est bien différent, la dimension proprement littéraire reste primordiale. Dans ses documents préparatoires, Goux note, avant même sa venue à Montbéliard, tout un ensemble de références romanesques, à partir de sa lecture de <em>L'Art du roman</em> de Milan Kundera.</p>
        </div>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Chapitre5/GOU_03_E_0034_avec_texte.jpg`} legend="Notes manuscrites" alt="Notes manuscrites Goux" />
          <p>Notes manuscrites © Fonds Goux, GOU 03 E 0034</p>
        </div>
        <div className="article-paragraph">
          <p>L'ouvrage lui-même s'interroge régulièrement de l'intérieur sur sa propre forme. La première partie mentionne, en exemples, les entreprises passées de « Von Arnim, Brentano, Grimm, Herder », de Michelet, ou de Chateaubriand avec les <em>Mémoires d'outre-tombe</em>. Elle convoque également les œuvres de fiction de Novalis, de Zola ou de Gabriel García Márquez.</p>
        </div>
        <div className="article-paragraph">
          <p>La présence de ces modèles est aussi implicite dans le corps du texte :</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>les titres des chapitres « Du côté de Beaulieu », « Du côté de Beaucourt », « Du côté de Béthoncourt », etc., font inévitablement penser à Marcel Proust et à la <em>Recherche du temps perdu</em>. Or, l'ouvrage de Goux est, à sa façon, une recherche du temps perdu ;</li>
            <li>la formulation de sections avec de courts résumés introduits par la formule « Où l'on voit que… » rappelle certains romans anciens ou populaires, à l'instar de <em>Don Quichotte</em> de Cervantès ;</li>
            <li>quant au dernier chapitre, « Je me souviens », il s'inspire indubitablement de Georges Perec, auteur de <em>Je me souviens</em>. « À la manière de… » note Goux au début de la page du manuscrit.</li>
          </ul>
        </div>

        <h2 className="article-section-title">La forme du journal intime</h2>
        <div className="article-paragraph">
          <p>Le « Journal » constitue la – brève – première partie de l'ouvrage. C'est la partie littérairement la plus élaborée. Goux projette sa propre situation dans un univers fictionnel : le narrateur n'est pas un romancier, professeur de lettres, mais un étrange « Docteur en archéologie générale » embauché par un mystérieux « Conseil des Doctes », transposition fantasmatique de la Cité. Quand on lit, dans le document original, la référence autotélique à l'achat d'un cahier relié « aux pages quadrillées » sur lequel le narrateur tient régulièrement son « Journal », le support est bien un cahier, mais sans quadrillage.</p>
        </div>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Chapitre5/GOU_03_C_0006_avec_texte.jpg`} legend="Notes manuscrites" alt="Notes Goux archéologie" />
          <p>Notes manuscrites © Fonds Goux, GOU 03 E 0006</p>
        </div>
        <div className="article-paragraph">
          <p>Dans ses notes préparatoires, Goux mentionne le modèle qui l'a inspiré : le roman <em>L'Emploi du temps</em> (1956) de Michel Butor, construit sur le principe d'un journal intime organisé chronologiquement, mais dont la matière est décalée : les événements rapportés sont antérieurs de plusieurs mois à la date d'écriture mentionnée.</p>
        </div>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Chapitre5/GOU_03_E_0019_2_avec_texte.jpg`} legend="Notes manuscrites" alt="Notes journal Goux" />
          <p>Notes manuscrites © Fonds Goux, GOU 03 E 0019</p>
        </div>
        <div className="article-paragraph">
          <p>Daté du 16 juillet 1984, le début du « Journal » renvoie à l'arrivée du narrateur au mois d'avril. Ce décalage donne un poids particulier au temps et introduit toute la problématique de ces « mémoires ».</p>
        </div>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Chapitre5/GOU_02_01_0048.jpg`} legend="Page 42 de la dactylographie des Mémoires de l'Enclave" alt="Page dactylographie Mémoires" />
          <p>Page 42 de la dactylographie des Mémoires de l'Enclave © Fonds Goux, GOU 02 01 0048</p>
        </div>
        <div className="article-paragraph">
          <p>Initialement, il était prévu que « ce journal constitu[e] les <em>Mémoires de l'Enclave</em> ». Il a ensuite été ramené à la première partie. Jusqu'au tapuscrit, ce « Journal » introduisait une part de vie intime du narrateur ; Goux l'a finalement supprimée en la barrant.</p>
        </div>

        <h2 className="article-section-title">Fiction et vérité</h2>
        <div className="article-paragraph">
          <p>Cette présence d'une mise en scène fictionnelle peut surprendre dans le cadre d'un ouvrage qui cherche à transmettre une vision authentique du passé. Cependant, cette transmission n'est possible que par le biais d'une élaboration littéraire : « La littérature supplée à ce défaut qui fait une impossibilité à l'homme de se faire entendre partout et éternellement. » (chap. XXIII). Goux considère ainsi certains tracts syndicaux anciens non comme des documents d'archives appartenant à l'Histoire, mais comme des textes authentiquement littéraires parce qu'ils ont gardé la force d'être aujourd'hui entendus et partagés, là où un texte sur les usines Peugeot, pourtant signé du romancier Pierre Mac Orlan, a perdu toute valeur. « La littérature n'est pas toujours où l'on croit la trouver. » Les jeux retors de décalages et ces trucages participent d'une mise en forme qui est la garante paradoxale de la vérité du récit. Tout vrai discours historique est le produit d'une élaboration littéraire consciente.</p>
        </div>
      </div>

      <section className="credits-section">
        <div className="credits-inner">
          <p>Écrit par <strong>Pascal Lécroart</strong></p>
          <p>Droits photographiques : Fonds Archives Goux</p>
        </div>
      </section>

      <div className="suggestions-tag"><h4>Suggestions</h4></div>
      <section className="suggestions-section">
        <SuggestionsCard titre="Enquête sur la mémoire collective" numero_chapitre="4" lien_image="C4_GOU_P8-02_02-P.jpg" />
        <SuggestionsCard titre="La structuration des Mémoires" numero_chapitre="6" lien_image="C6_0100.jpg" />
        <SuggestionsCard titre="La fabrique du texte" numero_chapitre="7" lien_image="C7_GOU_P17-05_04-P.jpg" />
      </section>
    </div>
  )
}

