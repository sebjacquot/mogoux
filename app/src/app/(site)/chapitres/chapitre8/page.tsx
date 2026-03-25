import ImageTooltip from '@/components/ImageTooltip'
import ImageFullscreen from '@/components/ImageFullscreen'
import SuggestionsCard from '@/components/SuggestionsCard'

const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function Chapitre8Page() {
  return (
    <div className="bg-[hsl(0,0%,96%)]">
      <section className="chapter-entete">
        <div className="chapter-overlay" />
        <div className="chapter-hero">
          <span className="chapter-tag">CHAPITRE 8</span>
          <h1 className="chapter-titre">Du manuscrit au(x) livre(s)</h1>
          <h2 className="chapter-soustitre">Editions et réceptions</h2>
          <div className="bg-[hsl(0,0%,96%)] w-full max-w-[75em] mt-8 pt-5 px-4 md:px-10 pb-5 flex flex-col justify-center">
            <p className="font-serif text-[17px] text-center self-center"><em>Mémoires de l'Enclave</em> est un ouvrage qui, au sens propre, initialement, dérange : Flammarion, qui avait édité les deux précédents romans de Goux, n'en veut pas et une certaine presse communiste le réprouve. Edité chez Mazarine en 1986, l'ouvrage est réédité par Actes sud en 2003 et a fait, depuis, école.</p>
            <div className="flex justify-center items-center relative mt-5">
              <div className="px-2.5 bg-[hsl(0,0%,96%)] z-[3]" />
              <div className="border-b border-[#d9d9d9] block w-full absolute top-2.5 z-0" />
            </div>
          </div>
        </div>
        <ImageTooltip src={`${base}/images/Header_Chapitre/C8_GOU_P23-04_05-P.jpg`} legend="Photographie prise lors d'une séance de dédicaces au musée Japy à Beaucourt en avril 1986. Photographie de Gilles Choffé" alt="Dédicaces musée Japy 1986" />
      </section>

      <div className="article-content">
        <h2 className="article-section-title">Le choix de l'éditeur : de Flammarion aux éditions Mazarine</h2>
        <div className="article-paragraph">
          <p>« Les commanditaires ne sont pas éditeurs ». C'est en ces termes que Jean-Paul Goux désigne le travail qui reste à accomplir, fin 1985, pour publier son manuscrit. Les échanges avec son premier éditeur, Flammarion, sont tendus. Or, en lui demandant de réduire sensiblement le volume de son manuscrit, Flammarion manifeste une incompréhension qui détermine la rupture. Goux se tourne alors vers l'éditeur Olivier Cohen, qui l'accueille aux éditions Mazarine.</p>
        </div>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Chapitre8/GOU_04_B_0123.jpg`} legend="Lettre de Jean-Paul Goux à Oliver Cohen, le 25 novembre 1985 (extrait)" alt="Lettre Goux Cohen 1985" />
          <p>Lettre de Jean-Paul Goux à Oliver Cohen, le 25 novembre 1985 (extrait) © GOU 04 B 0123</p>
        </div>

        <h2 className="article-section-title">Éloges de la complexité</h2>
        <div className="article-paragraph">
          <p>Une quinzaine d'articles parus dans la presse écrite entre avril et juillet 1986 témoignent de l'intérêt suscité par le livre.</p>
        </div>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Chapitre8/GOU_04_D_0022.jpg`} legend="Compte-rendu de Laurent Lemire dans La Croix (2 juin 1986)" alt="Compte-rendu La Croix 1986" />
          <p>Compte-rendu de Laurent Lemire dans La Croix (2 juin 1986) © Fonds Goux, GOU 4 D 0022</p>
        </div>
        <div className="article-paragraph">
          <p>Les critiques parues dans la presse nationale, la presse régionale et dans les magazines littéraires, soulignent toutes l'originalité d'un texte « inclassable ». La critique met également en relief un aspect essentiel : la mise en valeur du caractère clairement « consenti » de la domination subie par le monde ouvrier dans l'Enclave.</p>
        </div>

        <h2 className="article-section-title">Une voix dérangeante</h2>
        <div className="article-paragraph">
          <p>Trois articles parus dans la presse militante témoignent du trouble suscité par l'ouvrage chez les militants d'extrême gauche.</p>
        </div>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Chapitre8/GOU_04_D_0012.jpg`} legend="Compte-rendu de René Gaudy dans M mensuel, marxisme mouvement (extrait)" alt="Compte-rendu Gaudy 1986" />
          <p>Compte-rendu de René Gaudy dans M mensuel, marxisme mouvement (extrait) © Fonds Goux, GOU 04 D 0012</p>
        </div>
        <div className="article-paragraph">
          <p>Le plus sévère est alors l'intellectuel communiste René Gaudy. Il reproche à Goux d'avoir oublié son commanditaire. Dix-sept ans plus tard, en 2003, l'ouvrage est réédité au format de poche chez Actes Sud dans la collection « Babel ».</p>
        </div>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Chapitre9/couverture.jpg`} legend="1re de couverture de l'édition de poche des Mémoires de l'Enclave, Actes Sud, 2003" alt="Couverture Actes Sud 2003" />
          <p>1re de couverture de l'édition de poche des Mémoires de l'Enclave, Actes Sud, 2003</p>
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
        <SuggestionsCard titre="La fabrique du texte" numero_chapitre="7" lien_image="C7_GOU_P17-05_04-P.jpg" />
        <SuggestionsCard titre="Le fonds photographique" numero_chapitre="9" lien_image="C9_GOU_A_08_04_083.jpg" />
        <SuggestionsCard titre="Une commande de la cité" numero_chapitre="1" lien_image="C1_GOU_P17-04_01-P.jpg" />
      </section>
    </div>
  )
}
