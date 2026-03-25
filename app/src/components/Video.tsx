'use client'

interface Props {
  src: string
  preview_audio_video?: string
}

export default function Video({ src, preview_audio_video }: Props) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        controls
        playsInline
        preload="metadata"
        poster={preview_audio_video}
        className="max-w-full max-h-[80vh] object-contain"
        controlsList="nodownload"
      >
        <source src={src} type="video/mp4" />
        <source src={src} type="video/webm" />
        Votre navigateur ne supporte pas la lecture de vidéos.
      </video>
    </div>
  )
}
