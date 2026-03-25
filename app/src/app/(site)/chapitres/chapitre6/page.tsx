import ImageTooltip from '@/components/ImageTooltip'
import ImageFullscreen from '@/components/ImageFullscreen'
import SuggestionsCard from '@/components/SuggestionsCard'

const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function Chapitre6Page() {
  return (
    <div className="bg-[hsl(0,0%,96%)]">
      <section className="chapter-entete">
        <div className="chapter-overlay" />
        <div className="chapter-hero">
          <span className="chapter-tag">CHAPITRE 6</span>
          <h1 className="chapter-titre">La structuration des <em>Mémoires</em></h1>
          <h2 className="chapter-soustitre">Un ouvrage à multiples facettes</h2>
          <div className="bg-[hsl(0,0%,96%)] w-full max-w-[75em] mt-8 pt-5 px-4 md:px-10 pb-5 flex flex-col justify-center">
            <p className="font-serif text-[17px] text-center self-center">Dans la première partie de l'ouvrage, Goux met en scène les problèmes d'organisation qui se sont posés à lui : désireux de favoriser une pluralité de discours et de types d'écriture, il allait néanmoins progressivement élaborer une structuration souple et inventive, parfaitement élaborée et réfléchie.</p>
            <div className="flex justify-center items-center relative mt-5">
              <div className="px-2.5 bg-[hsl(0,0%,96%)] z-[3]" />
              <div className="border-b border-[#d9d9d9] block w-full absolute top-2.5 z-0" />
            </div>
          </div>
        </div>
        <ImageTooltip src={`${base}/images/Header_Chapitre/C6_0100.jpg`} legend="Atelier de fabrication de pompes Japy à Fesches-le-Châtel, le 21 mai 1985. Photographie de Gilles Choffé" alt="Atelier Japy 1985" />
      </section>

      <div className="article-content">
        <h2 className="article-section-title">Des ambitions contradictoires ?</h2>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Chapitre6/GOU_05_07_0003.jpg`} legend="Jean-Paul Goux dans les Forges d'Audincourt à l'abandon" alt="Goux Forges Audincourt" />
          <p>Jean-Paul Goux dans les Forges d'Audincourt à l'abandon © Fonds Goux, GOU 05 07 0003</p>
        </div>
        <div className="article-paragraph">
          <p>Un des enjeux de la commande était d'accueillir une grande diversité de discours. Dans ses notes préparatoires, Goux précise qu'il convient de « mêler les types d'écriture ». Dans la première partie des <em>Mémoires de l'Enclave</em>, le narrateur développe, en abyme, une interrogation sur la forme à donner à son ouvrage.</p>
        </div>

        <h2 className="article-section-title">Varier et sérier</h2>
        <div className="article-paragraph">
          <p>Sur l'exemple des <em>Mémoires d'outre-tombe</em> de Chateaubriand et de <em>Jacques le fataliste</em> de Diderot, Goux cherche des principes généraux de composition.</p>
        </div>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Captures/GOU_03_B_0010.PNG`} legend="Notes préparatoires" alt="Notes préparatoires Goux" />
          <p>Notes préparatoires © Fonds Goux, GOU 03 B 0010</p>
        </div>
        <div className="article-paragraph">
          <p>Certains documents témoignent de la subtilité des principes d'équilibre que Goux s'est fixés.</p>
        </div>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Captures/GOU_03_E_0019.PNG`} legend="Notes préparatoires" alt="Notes équilibre structure" />
          <p>Notes préparatoires © Fonds Goux, GOU 03 B 0010</p>
        </div>

        <h2 className="article-section-title">L'organisation générale de l'ouvrage</h2>
        <div className="article-paragraph">
          <p>Un document montre trois étapes successives dans l'élaboration du plan :</p>
        </div>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Chapitre6/GOU_03_E_0008.jpg`} legend="Notes préparatoires" alt="Plan étapes Goux" />
          <p>Notes préparatoires © Fonds Goux, GOU 03 E 0008</p>
        </div>
        <div className="article-paragraph">
          <p>L'étape A, en haut à gauche, renvoie à un premier état rédigé du texte, sur 78 pages, en continu. Cet état A se retrouve dans le manuscrit de l'ouvrage conservé dans les archives, avec sa numérotation particulière, mais il a été totalement redistribué. L'étape B en dessous montre une restructuration en 31 chapitres, proche du travail final. Elle redistribue, selon un ordre revu, les sections précédentes qui alternent avec les entretiens, jusque-là absents. L'étape C, au milieu vers la droite, se situe dans le prolongement de cette réorganisation pour parvenir au plan définitif.</p>
        </div>
        <div className="article-paragraph">
          <p>Tout en maintenant un ouvrage accueillant une grande liberté de discours (journal intime, entretiens, témoignages, textes de réflexion historique, sociologique, géographique, tracts syndicaux, extraits de presse, etc.), Goux est ainsi parvenu à tresser une structure souple et habile.</p>
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
        <SuggestionsCard titre="Une œuvre littéraire" numero_chapitre="5" lien_image="C5_0407.jpg" />
        <SuggestionsCard titre="La fabrique du texte" numero_chapitre="7" lien_image="C7_GOU_P17-05_04-P.jpg" />
        <SuggestionsCard titre="Du manuscrit au(x) livre(s)" numero_chapitre="8" lien_image="C8_GOU_P23-04_05-P.jpg" />
      </section>
    </div>
  )
}
