import ImageTooltip from '@/components/ImageTooltip'
import ImageFullscreen from '@/components/ImageFullscreen'
import SuggestionsCard from '@/components/SuggestionsCard'

const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function Chapitre2Page() {
  return (
    <div className="bg-[hsl(0,0%,96%)]">
      <section className="chapter-entete">
        <div className="chapter-overlay" />
        <div className="chapter-hero">
          <span className="chapter-tag">CHAPITRE 2</span>
          <h1 className="chapter-titre">Du côté de l'Enclave</h1>
          <h2 className="chapter-soustitre">Géographie d'un territoire industriel</h2>
          <div className="bg-[hsl(0,0%,96%)] w-full max-w-[75em] mt-8 pt-5 px-4 md:px-10 pb-5 flex flex-col justify-center">
            <p className="font-serif text-[17px] text-center self-center">Façonné par l'activité industrielle, le Pays de Montbéliard, ancienne enclave germanique et protestante sur le territoire français, prend, chez Goux, le seul nom d'«&nbsp;Enclave&nbsp;», ce qui lui confère une dimension quasi mythique et légendaire.</p>
            <div className="flex justify-center items-center relative mt-5">
              <div className="px-2.5 bg-[hsl(0,0%,96%)] z-[3]" />
              <div className="border-b border-[#d9d9d9] block w-full absolute top-2.5 z-0" />
            </div>
          </div>
        </div>
        <ImageTooltip src={`${base}/images/Header_Chapitre/C2_0363.jpg`} legend="Vue sur les automobiles Peugeot depuis le Fort Lachaux le 27 janvier 1985. Photographie de Gilles Choffé" alt="Peugeot Fort Lachaux 1985" />
      </section>

      <div className="article-content">
        <h2 className="article-section-title">Géographie de l'Enclave</h2>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Chapitre2/GOU_04_D_0004.jpg`} legend="Reconstitution Serroz-Mülhenheim d'après des documents d'archives" alt="Reconstitution Serroz-Mülhenheim" />
          <p>Reconstitution Serroz-Mülhenheim d'après des documents d'archives © Fonds Goux, GOU 04 D 0004</p>
        </div>
        <div className="article-paragraph">
          <p>Les chapitres d'entretiens, qui constituent environ la moitié du volume des <em>Mémoires de l'Enclave</em>, portent souvent le titre du lieu de travail et de vie des enquêtés : « Du côté de Beaucourt », « Du côté d'Héricourt ». Jean-Paul Goux est très attentif aux configurations spatiales et aux noms de lieux, à ce qu'ils révèlent des relations et des pratiques sociales. Le livre s'ouvre sur le dessin en forme d'oiseau d'un territoire, qui reprend une carte ancienne. Il l'appelle l'Enclave.</p>
        </div>

        <h2 className="article-section-title">Enclave et nébuleuse</h2>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Captures/GOU_03_05_0020.PNG`} legend="Manuscrit des Mémoires, Chap. IV « La Bastille »" alt="Manuscrit Mémoires" />
          <p>Manuscrit des Mémoires, Chap. IV « La Bastille » © Fonds Goux, GOU 03 05 0020</p>
        </div>
        <div className="article-paragraph">
          <p>Le pays de Montbéliard, « que la géographie voue au passage et que l'histoire constitue en monde clos » (<em>Mémoires</em>, p. 21), a été une principauté wurtembourgeoise dont le rattachement définitif à la France date de 1793 seulement, et une enclave religieuse luthérienne en terre catholique. C'est surtout une enclave économique où l'activité des forges est présente dès le XVII<sup>e</sup> siècle, et que de grandes familles tiennent sous leur emprise tout au long des XIX<sup>e</sup> et XX<sup>e</sup> siècles, en employant la population dans les industries mécaniques et textiles, avant l'ère de l'automobile.</p>
        </div>
        <div className="article-paragraph">
          <p>« Au niveau du pays, j'avais imaginé une espèce d'enclave, de monde clos, et en fait je l'ai trouvé ! Mais contradictoirement, j'ai aussi découvert un univers très éclaté, une nébuleuse, des mondes juxtaposés mais isolés […], espaces urbains aux constructions anarchiques, mode de vie des gens très autonomisé » (<em>L'Est Républicain</em>, 7 octobre 1984). Dans cette interview, comme dans son livre, Jean-Paul Goux utilise l'image de la nébuleuse pour désigner l'« agrégat confus », le « paysage indéchiffrable » (<em>Mémoires</em>, p. 73) qui traduit les intentions des « bâtisseurs d'industrie » : « dissoudre la ville ». Dès lors le « Pays de Montbéliard prend des allures de faubourg pavillonnaire ».</p>
        </div>

        <h2 className="article-section-title">Cimetière ou conservatoire</h2>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Chapitre2/GOU_05_01_0031.jpg`} legend="Usine d'Héricourt (1984)" alt="Usine Héricourt 1984" />
          <p>Usine d'Héricourt (1984) © Fonds Goux, GOU 05 01 0031</p>
        </div>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Chapitre2/GOU_05_03_0027.jpg`} legend="Usine de Fesches-le-Châtel (1984)" alt="Usine Fesches-le-Châtel 1984" />
          <p>Usine de Fesches-le-Châtel (1984) © Fonds Goux, GOU 05 03 0027</p>
        </div>
        <div className="article-paragraph">
          <p>« L'Enclave est aujourd'hui tout entière dominée par l'activité des usines Peugeot : histoire présente qui pousse dans l'oubli l'histoire passée ». En 1984-85, les traces de cette histoire passée, de cette « diversité économique » révolue, ce sont d'une part les « cimetières d'usines », « de foyers » ; d'autre part les cités ouvrières anciennes plus ou moins bien entretenues qui donnent l'impression que rien n'a changé depuis plusieurs générations. Les vieux bâtiments, industriels ou d'habitation, semblent voués à la destruction ou à la muséification.</p>
        </div>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Chapitre2/GOU_04_B_01_0003.jpg`} legend="Carte postale « Le Grand Charmont - Les Fougères - Montbéliard » envoyée par Hubert Truxler (1985)" alt="Carte postale Grand Charmont" />
          <p>Carte postale « Le Grand Charmont - Les Fougères - Montbéliard » envoyée par Hubert Truxler (1985) © Fonds Goux, GOU 04 B 01 0003</p>
        </div>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Chapitre2/GOU_05_01_0011.jpg`} legend="Habitations d'Héricourt (1984)" alt="Habitations Héricourt 1984" />
          <p>Habitations d'Héricourt (1984) © Fonds Goux, GOU 05 01 0011</p>
        </div>
        <div className="article-paragraph">
          <p>« J'accumule […] les photos d'usines abandonnées, de maisons, de cités, de pierres tombales, de plaques émaillées, de potagers et de rues » (<em>Mémoires</em>, p. 37). Les photographies, prises par l'écrivain et évoquées dans son « Journal » en première partie des <em>Mémoires de l'Enclave</em>, témoignent de l'abandon de pans entiers d'activités, mais aussi des vestiges du modèle qui structure l'espace des vies ouvrières, à travers son habitat en cités, et l'organisation de sa consommation comme de ses loisirs. En ce sens, le paysage est un conservatoire qui porte « les marques successives du pouvoir qui l'a […] modelé » (<em>Mémoires</em>, p. 186).</p>
        </div>
        <div className="article-paragraph">
          <p>« L'Enclave pour Jean-Paul Goux désigne aussi le territoire du patronat […]. Tout au long du XIX<sup>e</sup> siècle celui-ci a déployé un paternalisme [...] qui n'a pas disparu avec la fin de la 2<sup>e</sup> guerre mondiale mais a pris des formes nouvelles » (<em>Libération</em>, juillet 1986). Il produit une violence latente.</p>
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
        <SuggestionsCard titre="Une commande de la cité" numero_chapitre="1" lien_image="C1_GOU_P17-04_01-P.jpg" />
        <SuggestionsCard titre="Discours du maître, traces des luttes" numero_chapitre="3" lien_image="C3_Ouvriers filature_2_APB.jpg" />
        <SuggestionsCard titre="Enquête sur la mémoire collective" numero_chapitre="4" lien_image="C4_GOU_P8-03_03-P.jpg" />
      </section>
    </div>
  )
}
