import ImageTooltip from '@/components/ImageTooltip'
import ImageFullscreen from '@/components/ImageFullscreen'
import SuggestionsCard from '@/components/SuggestionsCard'

const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function BiographiePage() {
  return (
    <div className="bg-[hsl(0,0%,96%)]">
      {/* Hero */}
      <section className="chapter-entete">
        <div className="chapter-overlay" />
        <div className="chapter-hero">
          <span className="chapter-tag">Biographie</span>
          <h1 className="chapter-titre">Jean-Paul Goux, écrivain du Temps</h1>
          <h2 className="chapter-soustitre">Présentation de l&apos;auteur</h2>
          <div className="bg-[hsl(0,0%,96%)] w-full max-w-[75em] mt-4 sm:mt-20 pt-5 px-4 md:px-10 pb-5 flex flex-col justify-center max-h-[22vh] overflow-hidden sm:max-h-none sm:overflow-visible">
            <p className="font-serif text-[17px] text-center self-center">
              Découvrez ici une présentation de Jean-Paul Goux, écrivain contemporain majeur et
              exigeant. Si <em>Mémoires de l&apos;Enclave</em> semble être une réalisation marginale
              dans son parcours, l&apos;ouvrage est traversé par deux enjeux fondamentaux dans
              l&apos;ensemble de son œuvre : la présence des voix et la question du temps.
            </p>
            <div className="flex justify-center items-center relative mt-5">
              <div className="px-2.5 bg-[hsl(0,0%,96%)] z-[3]" />
              <div className="border-b border-[#d9d9d9] block w-full absolute top-2.5 z-0" />
            </div>
          </div>
        </div>
        <ImageTooltip
          src={`${base}/images/Header_Chapitre/B_0406.jpg`}
          legend="Jean-Paul Goux photographié à son bureau le 3 mars 1985 lors de sa résidence à Montbéliard. Photographie de Gilles Choffé"
          alt="Jean-Paul Goux photographié à son bureau le 3 mars 1985 lors de sa résidence à Montbéliard"
        />
      </section>

      {/* Content */}
      <div className="article-content">
        <h2 className="article-section-title">Qui est Jean-Paul Goux&nbsp;?</h2>
        <div className="article-paragraph">
          <p>
            Né à Vesoul en 1948, Goux a longtemps vécu à Paris. Agrégé de lettres, il a enseigné
            dans le secondaire puis en tant que maître de conférences à l&apos;université de Tours.
            Il habite aujourd&apos;hui à Besançon.
          </p>
        </div>

        <div className="article-image">
          <ImageFullscreen
            src={`${base}/images/Chapitres/Biographie/Goux2011.jpg`}
            legend="Jean-Paul Goux en 2011"
            alt="Jean-Paul Goux en 2011"
          />
          <p>Jean-Paul Goux en 2011</p>
        </div>

        <div className="article-paragraph">
          <p>
            Son premier livre, <em>Le Montreur d&apos;ombres</em>, est paru en 1977. En 2022, il a
            publié <em>Tableaux d&apos;hiver</em> qui succède à <em>Sourdes contrées</em>. En 2016,
            il a obtenu le prix Marcel Aymé pour son précédent roman,{' '}
            <em>L&apos;Ombre s&apos;allonge</em>. Son œuvre est avant tout romanesque avec, en
            amont des <em>Mémoires de l&apos;Enclave</em>, quatre romans, et après cet ouvrage,
            deux trilogies : <em>Les Champs de fouilles</em> (1989, 1995, 1999) et{' '}
            <em>Les Quartiers d&apos;hiver</em> (2005, 2009, 2012).
          </p>
        </div>

        <div className="article-image">
          <ImageFullscreen
            src={`${base}/images/Chapitres/Biographie/Goux2008.jpg`}
            legend="Jean-Paul Goux en 2008"
            alt="Jean-Paul Goux en 2008"
          />
          <p>Jean-Paul Goux en 2008</p>
        </div>

        <div className="article-paragraph">
          <p>
            Il est aussi l&apos;auteur de plusieurs essais consacrés à ses « intercesseurs » en
            littérature, comme Gracq, et à l&apos;esthétique de la prose, ainsi que d&apos;articles
            universitaires.
          </p>
          <p>
            Membre du Parti Communiste de 1972 à 1978, il a été lié à deux revues littéraires,{' '}
            <em>Digraphe</em> et <em>Le Nouveau Recueil</em>. Deux de ses livres sont consacrés au
            monde du travail en Franche‑Comté sans que le propos soit pour autant régionaliste :
            les <em>Mémoires de l&apos;Enclave</em> (1986) et Les{' '}
            <em>Lampes de Ronchamp</em> (2001).
          </p>
        </div>

        <h2 className="article-section-title">
          L&apos;« Art du temps », principe d&apos;unité
        </h2>

        <div className="article-paragraph">
          <p>
            À la presse qui l&apos;interroge à son arrivée à Montbéliard, il déclare : « tous mes
            romans […] brassent des éléments tels que l&apos;histoire, le temps et la mémoire » et
            ajoute : « je veux mélanger les temps et les histoires pour rendre sensible la
            multiplicité des voix » (<em>L&apos;Est Républicain</em>, 7 avril 1984).
          </p>
        </div>

        <div className="article-image">
          <ImageFullscreen
            src={`${base}/images/Chapitres/Biographie/GOU_04_B_08_0010.jpg`}
            legend="Plaquette accompagnant la 1re édition des Mémoires"
            alt="Plaquette accompagnant la 1re édition des Mémoires"
          />
          <p>
            Plaquette accompagnant la 1<sup>re</sup> édition des <span>Mémoires</span>, GOU 04 B 08
            0010
          </p>
        </div>

        <div className="article-paragraph">
          <p>
            Si le sous‑titre de <em>Mémoires de l&apos;Enclave</em> n&apos;est pas « roman » mais
            « récits d&apos;industrie », le livre, « une sorte de récit d&apos;enquête aux points de
            vue très divers » est, selon son auteur, « largement porté […], autant que par
            l&apos;intérêt pour la classe ouvrière au moment où tout paraît la chasser de
            l&apos;Histoire, par une fascination pour la voix » (<em>La Voix sans repos</em>, 2003).
            Ainsi le temps et la voix définissent une unité littéraire qui traverse l&apos;ensemble
            de son œuvre et qu&apos;explicite sa conception du roman.
          </p>
        </div>

        <div className="article-image">
          <ImageFullscreen
            src={`${base}/images/Chapitres/Biographie/GOU_04_D_02_007.jpg`}
            legend="Article des Nouvelles Littéraires, juin 1986"
            alt="Article des Nouvelles Littéraires, juin 1986"
          />
          <p>Article des Nouvelles Littéraires, juin 1986, Gou 04 D 02 008</p>
        </div>

        <div className="article-paragraph">
          <p>
            En résidence à la Villa Médicis, en juin 1986, il revient sur l&apos;expérience
            d&apos;écriture des <em>Mémoires</em> pour <em>Les Nouvelles Littéraires</em> : « Au
            départ, j&apos;avais envie de faire un roman véritable […]. Petit à petit je me suis
            acheminé vers l&apos;idée que ce livre pouvait être un ensemble très composite fait de
            l&apos;exhibition de discours d&apos;origines diverses ».
          </p>
          <p>
            En mars 2017, dans une conférence à Besançon, l&apos;écrivain dit encore : « Il y a peu
            de choses qui me soient plus proches, plus sensibles, que ce qui touche à la
            disparition, à la ruine […] et à la conservation, à la mémoire de ce qui disparaît
            […]. La pente de mon imaginaire est versée du côté de la trace, de l&apos;archéologie,
            de la fouille […] parce que &apos;&apos;le temps&apos;&apos; est par excellence pour
            moi la chose essentielle dans l&apos;ordre littéraire ».
          </p>
        </div>
      </div>

      {/* Credits */}
      <section className="credits-section">
        <div className="credits-inner">
          <p>
            Écrit par <strong>Andrée Chauvin</strong> et <strong>Julie Soulès</strong>
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
