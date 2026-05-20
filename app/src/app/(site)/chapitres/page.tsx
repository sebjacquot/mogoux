import ImageFullscreen from '@/components/ImageFullscreen'
import Link from 'next/link'

const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

const chapters = [
  {
    src: '/images/Header_Chapitre/C1_GOU_P17-04_01-P.jpg',
    legend: `Jean-Paul Goux visitant une exposition organisée lors d'un meeting de Lutte ouvrière le 3 mars 1985. Photographie de Gilles Choffé`,
    title: 'Une commande de la Cité',
    desc: `Qu'une Association de culture et de loisirs nommée la Cité, liée au Comité d'établissements des automobiles Peugeot, passe commande d'un ouvrage sur la mémoire industrielle à un écrivain peut paraître bien étonnant : c'est le fruit de circonstances et de coïncidences remarquables.`,
    link: '/chapitres/chapitre1',
  },
  {
    src: '/images/Header_Chapitre/C2_0363.jpg',
    legend: `Vue sur les automobiles Peugeot depuis le Fort Lachaux le 27 janvier 1985. Photographie de Gilles Choffé`,
    title: 'Du côté de l\'Enclave',
    desc: `Façonné par l'activité industrielle, le Pays de Montbéliard, ancienne enclave germanique et protestante sur le territoire français, prend, chez Goux, le seul nom d'"Enclave", ce qui lui confère une dimension quasi mythique et légendaire.`,
    link: '/chapitres/chapitre2',
  },
  {
    src: '/images/Header_Chapitre/C3_Ouvriers filature_2_APB.jpg',
    legend: `Ouvriers devant la filature Schwob dite La Lizaine de Bethoncourt vers 1910. Photographie transmise par l'Association du patrimoine bethoncourtois`,
    title: 'Discours du Maître, traces des luttes',
    desc: `Singulier par son capitalisme animé par un patronat d'origine protestante, le monde industriel du pays de Montbéliard est inséparable d'un paternalisme qui, promouvant un mieux vivre collectif, contrôle tout et s'efforce de contenir toute forme de luttes, sans parvenir à les empêcher.`,
    link: '/chapitres/chapitre3',
  },
  {
    src: '/images/Header_Chapitre/C4_GOU_P8-03_03-P.jpg',
    legend: `Jean-Paul Goux photographié lors d'un entretien le 30 novembre 1984. Photographie de Gilles Choffé`,
    title: 'Enquête sur la mémoire collective',
    desc: `Pendant sa résidence, Jean-Paul Goux a longuement travaillé sur des ouvrages et des archives, tout en menant de très nombreux entretiens, multipliant les rencontres avec des ouvrières et des ouvriers, qu'ils soient à la retraite ou toujours actifs et engagés dans leur activité professionnelle.`,
    link: '/chapitres/chapitre4',
  },
  {
    src: '/images/Header_Chapitre/C5_0407.jpg',
    legend: `Jean-Paul Goux photographié le 3 mars 1985 à son domicile, 6 avenue Joffre, à Montbéliard, lors de sa résidence. Photographie de Gilles Choffé`,
    title: 'Une œuvre littéraire',
    desc: `Si les auteurs de la commande s'attendaient plutôt à un roman, Goux leur a finalement proposé un ouvrage littéraire très singulier et divers, empruntant partiellement à la forme du journal intime tout en jouant sur la fiction, et revendiquant parallèlement une vraie valeur historique.`,
    link: '/chapitres/chapitre5',
  },
  {
    src: '/images/Header_Chapitre/C6_0100.jpg',
    legend: `Atelier de fabrication de pompes Japy à Fesches-le-Châtel, le 21 mai 1985. Photographie de Gilles Choffé.`,
    title: 'La structuration des Mémoires',
    desc: `Dans la première partie de l'ouvrage, Goux met en scène les problèmes d'organisation qui se sont posés à lui : désireux de favoriser une pluralité de discours et de types d'écriture, il allait néanmoins progressivement élaborer une structuration souple et inventive, parfaitement élaborée et réfléchie.`,
    link: '/chapitres/chapitre6',
  },
  {
    src: '/images/Header_Chapitre/C7_GOU_P17-05_04-P.jpg',
    legend: `Jean-Paul Goux en discussion à l'occasion d'une exposition organisée lors d'un meeting de Lutte ouvrière le 3 mars 1985. Photographie de Gilles Choffé.`,
    title: 'La fabrique du texte',
    desc: `L'ensemble des entretiens oraux réalisés a donné lieu à une transcription écrite. Sur cette base, Jean-Paul Goux a réalisé un travail complexe de réélaboration, parfois divers dans sa pratique, soucieux de traduire l'oralité dans l'écriture, tout en faisant systématiquement disparaître sa voix.`,
    link: '/chapitres/chapitre7',
  },
  {
    src: '/images/Header_Chapitre/C8_GOU_P23-04_05-P.jpg',
    legend: `Photographie prise lors d'une séance de dédicaces au musée Japy à Beaucourt en avril 1986 au moment de la parution des Mémoires de l'Enclave. Photographie de Gilles Choffé.`,
    title: 'Du manuscrit au(x) livre(s)',
    desc: `<i>Mémoires de l'Enclave</i> est un ouvrage qui, au sens propre, initialement, dérange : Flammarion, qui avait édité les deux précédents romans de Goux, n'en veut pas et une certaine presse communiste le réprouve. Edité chez Mazarine en 1986, l'ouvrage est réédité par Actes sud en 2003 et a fait, depuis, école.`,
    link: '/chapitres/chapitre8',
  },
  {
    src: '/images/Header_Chapitre/C9_GOU_A_08_04_083.jpg',
    legend: `Photographie promotionnelle de la Peugeot 202 en 1939. © Fonds de dotation Peugeot pour la mémoire de l'histoire industrielle`,
    title: 'Le fonds photographique',
    desc: `Au-delà des mots, l'ouvrage aurait dû comprendre un dossier photographique finalement abandonné. Grâce aux archives, il est possible de donner une large place à l'ensemble des documents photographiques qui ont accompagné la genèse et la publication de l'ouvrage.`,
    link: '/chapitres/chapitre9',
  },
]

export default function ChapitresPage() {
  return (
    <div className="flex flex-col gap-20 mb-20">
      {chapters.map((chapter, index) => (
        <div
          key={index}
          className="flex justify-center items-center gap-[9em] flex-col md:flex-row px-4"
        >
          {/* Image */}
          <div className="w-full md:w-[500px] h-[350px] md:h-[500px] overflow-hidden relative flex-shrink-0">
            <ImageFullscreen
              src={`${base}${chapter.src}`}
              legend={chapter.legend}
              alt={chapter.legend}
            />
          </div>

          {/* Text */}
          <div className="flex flex-col items-center justify-center text-secondary font-graphik max-w-[30em]">
            <h3 className="text-[16px] uppercase font-extrabold tracking-tight text-[#858585]">
              Chapitre {index + 1}
            </h3>
            <h2 className="uppercase text-center text-[35px] font-extrabold leading-[45px] tracking-tight mt-4">
              {chapter.title}
            </h2>
            <p
              className="text-[16px] font-medium leading-relaxed my-6 text-center font-helvetica"
              dangerouslySetInnerHTML={{ __html: chapter.desc }}
            />
            <Link
              href={`${chapter.link}`}
              className="relative inline-block bg-white/10 border-none text-secondary font-graphik font-extrabold text-[13px] leading-[2.9] px-5 rounded no-underline transition-colors hover:bg-white/20 shadow-[#efefef_0px_0px_2px_inset] hover:shadow-[#efefef_0px_0px_2px_inset]"
            >
              Lire la suite
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
