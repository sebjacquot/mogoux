import ImageTooltip from '@/components/ImageTooltip'
import ImageFullscreen from '@/components/ImageFullscreen'
import SuggestionsCard from '@/components/SuggestionsCard'

const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function Chapitre3Page() {
  return (
    <div className="bg-[hsl(0,0%,96%)]">
      <section className="chapter-entete">
        <div className="chapter-overlay" />
        <div className="chapter-hero">
          <span className="chapter-tag">CHAPITRE 3</span>
          <h1 className="chapter-titre">Discours du Maître, traces des luttes</h1>
          <h2 className="chapter-soustitre">Paternalisme contre lutte des classes</h2>
          <div className="bg-[hsl(0,0%,96%)] w-full max-w-[75em] mt-8 pt-5 px-4 md:px-10 pb-5 flex flex-col justify-center max-h-[22vh] overflow-hidden sm:max-h-none sm:overflow-visible">
            <p className="font-serif text-[17px] text-center self-center">Singulier par son capitalisme animé par un patronat d'origine protestante, le monde industriel du pays de Montbéliard est inséparable d'un paternalisme qui, promouvant un mieux vivre collectif, contrôle tout et s'efforce de contenir toute forme de luttes, sans parvenir à les empêcher.</p>
            <div className="flex justify-center items-center relative mt-5">
              <div className="px-2.5 bg-[hsl(0,0%,96%)] z-[3]" />
              <div className="border-b border-[#d9d9d9] block w-full absolute top-2.5 z-0" />
            </div>
          </div>
        </div>
        <ImageTooltip src={`${base}/images/Header_Chapitre/C3_Ouvriers filature_2_APB.jpg`} legend="Ouvriers devant la filature Schwob dite La Lizaine de Bethoncourt vers 1910. Photographie transmise par l'Association du patrimoine bethoncourtois" alt="Ouvriers filature Schwob 1910" />
      </section>

      <div className="article-content">
        <h2 className="article-section-title">Frédéric, alias Panoptès</h2>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Chapitre3/GOU_05_050055.jpg`} legend="Tombe de Louis-Frédéric Japy, Beaucourt (1984)" alt="Tombe Japy Beaucourt" />
          <p>Tombe de Louis-Frédéric Japy, Beaucourt (1984) © Fonds Goux, GOU 05 050055</p>
        </div>
        <div className="article-paragraph">
          <p>L'enquête de terrain immersive se double d'une investigation documentaire très fouillée qui nourrit l'ouvrage et sa réflexion critique (archives, presses patronale et syndicale, documents privés). Sur la base de ses recherches historiques qui permettent de faire le lien onomastique entre la famille princière du Wurtemberg et les fondateurs des dynasties d'entrepreneurs à l'orée du XIX<sup>e</sup> siècle, Jean-Paul Goux utilise « Frédéric » comme un prénom générique pour montrer la continuité de la domination qui s'exerce sur « une classe ouvrière soumise à l'éternel retour du même ».</p>
        </div>
        <div className="article-paragraph">
          <p>Cette continuité est illustrée dans le chapitre XIV des Mémoires, « Petit abrégé des discours du Maître », par une anthologie de citations (de 1853 à 1982), allant des discours officiels des notables aux notes internes en passant par la presse Peugeot. Le paternalisme perdure bien au-delà de Frédéric Japy qui déclarait : « Je veux que mes ouvriers ne fassent avec moi et les miens qu'une seule et même famille. Mes ouvriers doivent être mes enfants en même temps que mes coopérateurs » (<em>Mémoires</em>, p. 51).</p>
        </div>
        <div className="article-paragraph">
          <p>À l'instar du personnage mythologique aux cent yeux, Panoptès, le paternalisme voit tout et prétend contrôler, éventuellement sous couleur de philanthropie, tous les aspects de la vie : logement, protection sociale, ravitaillement, temps libre (concours de jardinage, sociétés sportives ou musicales, etc.). Il a pénétré insidieusement la culture ouvrière elle-même, à travers la valorisation du progrès industriel et de la solidarité.</p>
        </div>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Chapitre3/GOU_04_D_0030.jpg`} legend="Article de François Moulin, L'Est Républicain (1986)" alt="Article Moulin 1986" />
          <p>Article de François Moulin, <span>L'Est Républicain</span> (1986) © Fonds Goux, GOU 04 D 0030</p>
        </div>

        <h2 className="article-section-title">Se souvenir des luttes</h2>
        <div className="article-paragraph">
          <p>François Moulin (<em>L'Est Républicain</em>, 1986) propose une série d'extraits du livre. Il met en relief la comparaison entre la suite des luttes et des parties d'échecs qui seraient toujours perdues par le monde ouvrier de l'Enclave, parce que les leçons des parties précédentes ne se transmettraient pas. Au point que Goux se demande si ce n'est pas d'un oubli collectif qu'il rend compte : « les vieux récitent plus facilement la généalogie des Japy que leur propre histoire ».</p>
        </div>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Chapitre3/GOU_04_B_0017.jpg`} legend="Lettre de Marcel Castioni sur la liquidation de la Cité après les élections professionnelles de 1985 (janvier 1986)" alt="Lettre Castioni 1986" />
          <p>Lettre de Marcel Castioni sur la liquidation de la Cité après les élections professionnelles de 1985 (janvier 1986) © Fonds Goux, GOU 04 B 0017</p>
        </div>
        <div className="article-paragraph">
          <p>Claude Glayman évoque, dans son compte-rendu du livre, l'hypothèse qu'« il ne subsiste de profonds et durables souvenirs que lorsque l'Histoire générale se manifeste » (<em>L'Unité</em>, 1986), comme en juin 1968 où la grève et la révolte sont « particulièrement dures » et où deux ouvriers sont tués par la police au cours des affrontements.</p>
        </div>
        <div className="article-paragraph">
          <p>La répression brutale liée aux mouvements collectifs n'est pas la seule violence subie. Celle-ci s'exerce dans le quotidien des conditions de travail et des sanctions qui visent certains militants.</p>
        </div>
        <div className="article-paragraph">
          <p>L'élaboration des <em>Mémoires</em> s'accompagne d'une remontée dans le temps, en quête des récits consignés de mobilisations, de conflits ou de drames du passé mis en regard du présent, de textes engagés (journal <em>Germinal</em>, publications au quotidien telles que tracts ou courriers). Goux a aussi rencontré beaucoup d'militants et de syndicalistes pour les entretiens. Ainsi le livre fait-il entendre des contre-discours de combat. Parmi ceux-ci la subversion ironique du « Clan des planches de bord » (chap. VI) qui met des « grains de sable sous le capot » (pour reprendre le titre du livre de Marcel Durand, paru en 2006) ou les analyses vigoureuses de Christian Corouge (chap. VIII et XVI) qui réfléchit à l'expérience de la chaîne et aux moyens d'y résister. Corouge publiera en 2011 avec le sociologue Michel Pialoux un ouvrage à ce sujet : <em>Résister à la chaîne. Dialogue entre un ouvrier de Peugeot et un sociologue</em>, Agone, 2011, 416 p.</p>
        </div>
      </div>

      <section className="credits-section">
        <div className="credits-inner">
          <p>Écrit par <strong>Odile Roynette et Christopher Boulogne</strong></p>
          <p>Droits photographiques : Fonds Archives Goux</p>
        </div>
      </section>

      <div className="suggestions-tag"><h4>Suggestions</h4></div>
      <section className="suggestions-section">
        <SuggestionsCard titre="Du côté de l'Enclave" numero_chapitre="2" lien_image="C2_0363.jpg" />
        <SuggestionsCard titre="Enquête sur la mémoire collective" numero_chapitre="4" lien_image="C4_GOU_P8-02_02-P.jpg" />
        <SuggestionsCard titre="Une œuvre littéraire" numero_chapitre="5" lien_image="C5_0407.jpg" />
      </section>
    </div>
  )
}

