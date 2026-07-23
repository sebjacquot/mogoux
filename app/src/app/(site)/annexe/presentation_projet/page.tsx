import ImageTooltip from '@/components/ImageTooltip'

const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function PresentationProjetPage() {
  return (
    <div className="bg-[hsl(0,0%,96%)]">
      {/* Hero */}
      <section className="chapter-entete">
        <div className="chapter-overlay" />
        <div className="chapter-hero">
          <h1 className="chapter-titre">Manifeste éditorial</h1>
        </div>
        <ImageTooltip
          src={`${base}/images/Header_Chapitre/A2_0014.jpg`}
          legend=""
          alt=""
        />
      </section>

      {/* Content */}
      <div className="article-content">
        <div className="article-paragraph">
          <p>
            Ce Webdocumentaire « Des mémoires ouvrières aux{' '}
            <em>Mémoires de l&apos;Enclave</em> de Jean-Paul Goux » est l&apos;une des pièces
            d&apos;un vaste projet mené à l&apos;Université Marie et Louis Pasteur (Ex Université
            de Franche-Comté) autour de l&apos;œuvre de Jean-Paul Goux par des
            Enseignants-chercheurs du laboratoire ELLIADD (UR 4661), avec l&apos;appui de la MSHE
            Claude Nicolas Ledoux (UAR 3124).
          </p>
          <p>
            Il s&apos;appuie sur le travail originel d&apos;Andrée Chauvin-Vileno, Professeure en
            7e section, et de Sandra Nossik, maîtresse de conférences en 7e section qui, travaillant
            avec des étudiants de sciences du langage sur les récits de vie d&apos;ouvriers en 2015,
            ont permis le développement de liens privilégiés avec l&apos;écrivain Jean-Paul Goux.
            Ce dernier a mis à disposition l&apos;ensemble inédit des archives sonores et des
            dossiers préparatoires de son ouvrage{' '}
            <em>Mémoires de l&apos;Enclave</em> (1986 republié en 2003), œuvre fondée sur une
            enquête de terrain et des entretiens menés auprès de la population ouvrière du Pays de
            Montbéliard dans les années 1984-1985.
          </p>
          <p>
            Un projet scientifique plus large et interdisciplinaire s&apos;est alors développé
            autour de cet ouvrage, faisant l&apos;objet d&apos;un financement des MSH/MSHE de Dijon
            et Besançon dans le cadre de l&apos;AAP &quot;Transmission, Travail, Pouvoir&quot; par
            le biais du projet AME (Archives des Mémoires de l&apos;Enclave). Ce projet comprenait
            notamment une première phase de numérisation et d&apos;exploitation scientifique des
            archives confiées par l&apos;écrivain. Une exposition et une journée d&apos;étude ont
            été organisées à Besançon en novembre 2019, et l&apos;exposition, intitulée « De
            l&apos;enquête à l&apos;œuvre : autour des <em>Mémoires de l&apos;Enclave</em> de
            Jean-Paul Goux » a ensuite été présentée du 25 octobre au 26 novembre 2021 à la
            Bibliothèque de campus de Montbéliard. Avec le soutien du Pôle Thématique Lettres,
            Langue, Communication d&apos;UBFC, un financement a permis la réalisation d&apos;un
            documentaire, <em>Mémoires d&apos;ouvrières</em>, réalisé par Jean-Baptiste Benoit, à
            partir d&apos;un travail collectif mené autour d&apos;Andrée Chauvin-Vileno, Pascal
            Lécroart, David Michon et Quentin Arnoud. Il a été présenté pour la première fois dans
            le cadre d&apos;une nouvelle version de l&apos;exposition sur les Mémoires de
            l&apos;Enclave montée à la MSH de Dijon entre novembre 2022 et janvier 2023, puis à la
            MSHE de Besançon en septembre-octobre 2023.
          </p>
          <p>
            Un nouveau projet, accepté et financé par la région Bourgogne – Franche-Comté, le
            projet PAG (Projet Archives Goux), porté par Pascal Lécroart, a permis de développer
            les actions de valorisation autour de ces archives gérées par Thomas Dandin. C&apos;est
            dans ce cadre que Thomas Paquier, étudiant en Licence multimédia et de l&apos;internet à
            l&apos;IUT Nord Franche-Comté, puis Paul Gravinese, étudiant en licence informatique à
            l&apos;IUT Belfort-Montbéliard, ont conçu, avec l&apos;appui de Sébastien Jacquot, la
            maquette de ce Webdocumentaire sous la direction de Pascal Lécroart. Les ressources déjà
            exploitées lors des expositions ont été complétées par de nouveaux apports, en
            particulier l&apos;ensemble des photographies réalisées par Gilles Choffé à
            l&apos;occasion de la résidence de Jean-Paul Goux à Montbéliard en 1984-1985.
          </p>
          <p>
            Le Webdocumentaire a été l&apos;occasion de réadapter la matière déjà présente dans le
            cadre de l&apos;exposition pour la partie <em>Mémoires de l&apos;Enclave</em>. La
            partie Mémoires ouvrières a été conçue à partir des entretiens oraux réalisés en
            1984-1985 par Jean-Paul Goux lors de sa résidence. Quarante ans après la résidence de
            Jean-Paul Goux, c&apos;est ainsi un moyen de replonger, via la mémoire des témoins,
            dans toute une histoire industrielle de la Franche-Comté particulièrement marquante et
            émouvante.
          </p>
        </div>
      </div>

      {/* Credits */}
      <section className="credits-section">
        <div className="credits-inner">
          <p>
            Écrit par <strong>Pascal Lécroart</strong>
          </p>
          <p>
            Droits photographiques : Madeure - Usine de cycles Peugeot et Cités Blanches.
            Photographie du 10 mars 1985 de Gilles Choffé
          </p>
        </div>
      </section>
    </div>
  )
}
