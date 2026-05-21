import ImageTooltip from '@/components/ImageTooltip'
import ImageFullscreen from '@/components/ImageFullscreen'
import SuggestionsCard from '@/components/SuggestionsCard'

const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function Chapitre9Page() {
  return (
    <div className="bg-[hsl(0,0%,96%)]">
      <section className="chapter-entete">
        <div className="chapter-overlay" />
        <div className="chapter-hero">
          <span className="chapter-tag">CHAPITRE 9</span>
          <h1 className="chapter-titre">Le fonds photographique</h1>
          <h2 className="chapter-soustitre">La place des images</h2>
          <div className="bg-[hsl(0,0%,96%)] w-full max-w-[75em] mt-8 pt-5 px-4 md:px-10 pb-5 flex flex-col justify-center">
            <p className="font-serif text-[17px] text-center self-center">Au-delà des mots, l'ouvrage aurait dû comprendre un dossier photographique finalement abandonné. Grâce aux archives, il est possible de donner une large place à l'ensemble des documents photographiques qui ont accompagné la genèse et la publication de l'ouvrage.</p>
            <div className="flex justify-center items-center relative mt-5">
              <div className="px-2.5 bg-[hsl(0,0%,96%)] z-[3]" />
              <div className="border-b border-[#d9d9d9] block w-full absolute top-2.5 z-0" />
            </div>
          </div>
        </div>
        <ImageTooltip src={`${base}/images/Header_Chapitre/C9_GOU_A_08_04_083.jpg`} legend="Photographie promotionnelle de la Peugeot 202 en 1939. © Fonds de dotation Peugeot pour la mémoire de l'histoire industrielle" alt="Peugeot 202 1939" />
      </section>

      <div className="article-content">
        <div className="article-paragraph">
          <p>La résidence à Montbéliard de Jean-Paul Goux, construite autour d'un projet d'écriture, a très vite rencontré la question des images.</p>
        </div>
        <h2 className="article-section-title">Les photographies de Jean-Paul Goux</h2>
        <div className="article-paragraph">
          <p>Dans le « Journal » qui ouvre <i>Mémoires de l'Enclave</i>, le narrateur écrit : « J'ai repris ces jours derniers mes expéditions photographiques : j'accumule par centaines les photos d'usines abandonnées, de maisons, de cités, de pierres tombales, de plaques émaillées, de potagers et de rues. »  De fait, Jean-Paul Goux a accumulé tout un ensemble de photographies personnelles, en noir-et-blanc ou en couleurs, parfois prises directement depuis une voiture. Elles avaient vocation à servir de traces ou de mémoires de ces différents parcours plus que d’objets artistiques. Les pochettes détaillent précisément les lieux photographiés. Cependant, au-delà de la réussite esthétique de certaines, elles témoignent aujourd’hui de l’état des différents lieux visités en 1985-1986, alors que la crise économique de l’époque entraînait une douloureuse reconversion industrielle et l’abandon de nombreux sites. </p>
        </div>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Chapitre9/Pochette1.jpg`} legend="Pochettes photographiques de Jean-Paul Goux" alt="Pochettes photos Goux" />
          <p>Pochettes photographiques de Jean-Paul Goux © Fonds Goux</p>
        </div>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Chapitre9/Pochette2.jpg`} legend="Détail d'une pochette photographique de Jean-Paul Goux" alt="Détail pochette Goux" />
          <p>Détail d'une pochette photographique de Jean-Paul Goux © Fonds Goux</p>
        </div>

        <h2 className="article-section-title">Les photographies historiques de Peugeot</h2>
        <div className="article-paragraph">
          <p>En vue du carnet photographique, Jean-Paul Goux a récupéré, auprès des archives Peugeot, un tirage d'une vingtaine de photographies anciennes noir et blanc en grand format.  C’est parmi elles qu’il a trouvé la photographie qui servira de couverture pour les deux premières éditions. </p>
        </div>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Chapitre9/GOU_A_08_02_001.jpg`} legend="Sortie des usines Beaulieu de Peugeot vers 1906" alt="Usines Beaulieu 1906" />
          <p>Sortie des usines Beaulieu de Peugeot vers 1906 © Fonds de dotation Peugeot pour la mémoire de l'histoire industrielle</p>
        </div>

        <h2 className="article-section-title">Les photographies de Gilles Choffé</h2>
        <div className="article-paragraph">
          <p>Par l’intermédiaire de l’association La Cité, Jean-Paul Goux a fait la connaissance, pendant sa résidence, d’un jeune ouvrier de Peugeot, passionné par la photographie : Gilles Choffé. La Cité possédait de fait du matériel photographique et un laboratoire permettant de développer les photographies qui étaient mis à la disposition du personnel de Peugeot. Un projet d'exposition est alors envisagé par la Cité, sous la responsabilité de l'écrivain. A partir de décembre 1984, Jean-Paul Goux a ainsi occasionnellement emmené Gilles Choffé dans ses déplacements afin qu’il puisse prendre de nombreuses photos de sites et de paysages. Jusqu’en juin 1985, il lui passera également différentes commandes. Au total, près de 400 photographies seront réalisées, captées avec du matériel professionnel ancien, en noir et blanc, le plus souvent sur un format 4,5x6 ou 6x9 assurant des tirages et des agrandissements de très grande qualité. </p>
        </div>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Chapitre9/0007.jpg`} legend="Atelier de Pompes Japy, Fesches-le-Châtel, photographié par Gilles Choffé le 21 mai 1985" alt="Atelier Japy Choffé 1985" />
          <p>Atelier de Pompes Japy, Fesches-le-Châtel, photographié par Gilles Choffé le 21 mai 1985 © Fonds Goux</p>
        </div>
        <div className="article-paragraph">
          <p>En septembre 1985, en vue de l'exposition prévue, Jean-Paul Goux envoie ainsi à Gilles Choffé un ensemble d’extraits de l’ouvrage qui pourraient servir à ponctuer littérairement l’exposition. Cependant, alors que Jean-Paul Goux a quitté Montbéliard pour rejoindre bientôt la Villa Médicis à Rome, le projet ne se réalise pas. La direction de La Cité a changé et met un coup de frein sur les projets antérieurs. En parallèle, le projet de cahier photographique, occasionnant un surcoût, est abandonné. Quelques-unes des photos réalisées seront néanmoins exposées lorsque Jean-Paul Goux viendra célébrer la sortie de son livre à Montbéliard, les 26 et 27 avril 1986, ou publiées dans <i>L'Est Républicain</i> lorsque François Moulin a consacré une série d'articles à la publication.</p> 
          <p> Ce fonds est enfin exploité grâce à ce webdocumentaire, en particulier dans la partie « Mémoires ouvrières » qui présente environ 80% des photographies réalisées, tandis que l'édition critique, parue en 2026 aux Belles Lettres, en rassemble plus d'une cinquantaine.</p>         
        </div>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Chapitre9/GOU_A_08_03_041.jpg`} legend="Jean-Paul Goux dédicaçant son ouvrage à l'occasion de la présentation de l'ouvrage au Musée du Château de Montbéliard les 26 et 27 avril 1986" alt="Goux dédicace 1986" />
          <p>Jean-Paul Goux dédicaçant son ouvrage à l'occasion de la présentation de l'ouvrage au Musée du Château de Montbéliard les 26 et 27 avril 1986 © Fonds Goux</p>
        </div>
        <div className="article-paragraph">
          <p>Lorsque l’ouvrage de Jean-Paul Goux sera officiellement présenté à l'ensemble des personnes et des institutions qui ont favorisé son écriture, le vendredi 25 avril 1986, Gilles Choffé sera encore présent pour réaliser tout un ensemble de portraits des participants.</p>
        </div>
        <h2 className="article-section-title">Les photographies de Werner Hannappel</h2>
        <div className="article-paragraph">
          <p>Dans le cadre des contributions artistiques du colloque national sur le tourisme industriel (14 et 15 novembre 1985) organisé par l'Association Comtoise des Arts et Traditions Populaires et coproduit par le Centre d'Art Contemporain de Montbéliard, Jean-Paul Goux et le photographe Werner Hannappel, né en 1949, avaient été sollicités. Le photographe avait ainsi réalisé une série « Les sites industriels du Nord Franche-Comté ». De son côté, Jean-Paul Goux achevait alors l’écriture de <i>Mémoires de l’Enclave</i>. Une brochure, contenant deux textes de Jean-Paul Goux et 24 photographies de Werner Hannappel a été éditée à cette occasion. </p>
        </div>
        <div className="article-image">
          <ImageFullscreen src={`${base}/images/Chapitres/Chapitre9/GOU_A_08_01_001.jpg`} legend="© Fonds Goux, GOU A 08 01 001" alt="Photo Hannappel" />
          <p>© Fonds Goux, GOU A 08 01 001</p>
        </div>
      </div>

      <section className="credits-section">
        <div className="credits-inner">
          <p>Écrit par <strong>Pascal Lécroart</strong></p>
          <p>Droits photographiques : Fonds Archives Goux & Fonds de dotation Peugeot pour la mémoire de l'histoire industrielle</p>
        </div>
      </section>

      <div className="suggestions-tag"><h4>Suggestions</h4></div>
      <section className="suggestions-section">
        <SuggestionsCard titre="La fabrique du texte" numero_chapitre="7" lien_image="C7_GOU_P17-05_04-P.jpg" />
        <SuggestionsCard titre="Du manuscrit au(x) livre(s)" numero_chapitre="8" lien_image="C8_GOU_P23-04_05-P.jpg" />
        <SuggestionsCard titre="Une commande de la cité" numero_chapitre="1" lien_image="C1_GOU_P17-04_01-P.jpg" />
      </section>
    </div>
  )
}
