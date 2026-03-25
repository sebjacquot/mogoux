'use client'

import { useRef } from 'react'

const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

const chapters = [
  { time: 35, label: "Courrier des usines", display: "00'35''" },
  { time: 226, label: 'Enfance', display: "03'46''" },
  { time: 570, label: 'Filage et tissage', display: "09'30''" },
  { time: 1084, label: 'Des pointes dans la bouche', display: "18'04''" },
  { time: 1334, label: 'Chaîne', display: "22'14''" },
  { time: 1415, label: 'Personne n\'en parle', display: "23'35''" },
  { time: 1529, label: 'Sécurité sociale', display: "25'29''" },
  { time: 1852, label: 'Double journée', display: "30'52''" },
  { time: 1955, label: 'Tirer parti de tout', display: "32'35''" },
  { time: 2128, label: 'En lutte', display: "35'28''" },
  { time: 2742, label: "À l'infirmerie", display: "45'42''" },
  { time: 2839, label: 'Lire', display: "47'19''" },
  { time: 2965, label: 'Abus de position dominante', display: "49'25''" },
  { time: 3267, label: 'Sexualité', display: "54'27''" },
  { time: 3444, label: 'Répondre', display: "57'24''" },
]

export default function DocumentairePlayer() {
  const videoRef = useRef<HTMLVideoElement>(null)

  const seekToTime = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds
      videoRef.current.play()
    }
  }

  return (
    <div className="max-w-[700px] w-full mx-auto mb-6">
      <video
        ref={videoRef}
        controls
        preload="metadata"
        poster={`${base}/images/Documentaire/Goux_6.jpg`}
        controlsList="nodownload"
        className="w-full h-auto"
      >
        <source src={`${base}/images/Documentaire/Paroles_Ouvrieres.mp4`} type="video/mp4" />
        Votre navigateur ne supporte pas la lecture de vidéos.
      </video>

      {/* Chapter list */}
      <div
        className="max-w-[700px] mx-auto mt-5 mb-10 px-5"
        style={{ borderLeft: '5px solid #e72465' }}
      >
        <h2 className="text-center text-2xl font-bold mb-8 text-[#161616]">Chapitrage</h2>
        <table className="w-full border-collapse">
          <tbody>
            {chapters.map((ch, i) => (
              <tr key={i}>
                <td className="text-right text-[#e72465] w-[100px] py-0.5 px-1 text-sm">
                  {ch.display}
                </td>
                <td className="py-0.5 px-1">
                  <button
                    type="button"
                    onClick={() => seekToTime(ch.time)}
                    className="bg-none border-none text-left cursor-pointer text-[#333] text-base font-medium transition-colors hover:text-[#e72465] hover:underline"
                  >
                    {ch.label}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
