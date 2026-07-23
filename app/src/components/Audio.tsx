'use client'

import { useRef, useState, useEffect } from 'react'

const base = process.env.NEXT_PUBLIC_BASE_PATH || ''
const PLACEHOLDER = '/Goux_1000kB_3.jpg'

interface Props {
  src: string
  preview_audio_video?: string
}

function formatTime(s: number) {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec < 10 ? '0' : ''}${sec}`
}

export default function Audio({ src, preview_audio_video }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [mobileBarVisible, setMobileBarVisible] = useState(false)
  const [imgSrc, setImgSrc] = useState(preview_audio_video || PLACEHOLDER)

  const play = async () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      try {
        await audioRef.current.play()
        setPlaying(true)
        setMobileBarVisible(true)
      } catch (e) {
        console.error('Audio playback failed:', e)
      }
    }
  }

  const close = () => {
    if (!audioRef.current) return
    audioRef.current.pause()
    audioRef.current.currentTime = 0
    setPlaying(false)
    setMobileBarVisible(false)
  }

  const toggleMute = () => {
    if (!audioRef.current) return
    const next = !muted
    audioRef.current.volume = next ? 0 : 1
    setVolume(next ? 0 : 1)
    setMuted(next)
  }

  const seek = (val: number) => {
    if (audioRef.current) audioRef.current.currentTime = val
    setCurrent(val)
  }

  const changeVolume = (val: number) => {
    if (audioRef.current) audioRef.current.volume = val
    setVolume(val)
    setMuted(val === 0)
  }

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onTime = () => setCurrent(a.currentTime)
    const onMeta = () => setDuration(a.duration)
    a.addEventListener('timeupdate', onTime)
    a.addEventListener('loadedmetadata', onMeta)
    return () => {
      a.removeEventListener('timeupdate', onTime)
      a.removeEventListener('loadedmetadata', onMeta)
    }
  }, [])

  // ── Controls bar (shared between inline desktop and fixed mobile) ──────────
  const Controls = ({ className = '' }: { className?: string }) => (
    <div className={`flex items-center w-full gap-1 overflow-hidden bg-nav px-0 py-2.5 ${className}`}>
      {/* Play/Pause */}
      <button onClick={play} className="bg-transparent border-none text-white p-0 flex-shrink-0 px-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={playing ? `${base}/icones/pause-white.png` : `${base}/icones/play-icon.png`}
          alt="lecture"
          className="w-8 h-8 cursor-pointer"
        />
      </button>

      {/* Seek + time */}
      <div className="flex items-center gap-1.5 flex-1 min-w-0">
        <input
          type="range"
          min={0}
          max={duration || 100}
          step="any"
          value={current}
          onChange={(e) => seek(parseFloat(e.target.value))}
          className="flex-1 min-w-0"
        />
        <span className="text-white text-xs whitespace-nowrap hidden sm:inline">
          {formatTime(current)} / {formatTime(duration)}
        </span>
      </div>

      {/* Volume (desktop only) */}
      <div className="hidden sm:flex items-center gap-1.5 px-2 w-[160px] flex-shrink-0">
        <button onClick={toggleMute} className="bg-transparent border-none p-0 flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={muted ? `${base}/icones/muet.png` : `${base}/icones/haut-parleur.png`}
            alt="volume"
            className="w-7 h-7"
          />
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={volume}
          onChange={(e) => changeVolume(parseFloat(e.target.value))}
          className="flex-1"
        />
      </div>

    </div>
  )

  return (
    <>
      <audio ref={audioRef} preload="metadata">
        <source src={src} type="audio/wav" />
        <source src={src} type="audio/mpeg" />
      </audio>

      {/* ── Image cliquable (toutes tailles) ── */}
      <div
        onClick={() => { if (!playing) play() }}
        className="relative w-full cursor-pointer overflow-hidden rounded-sm"
        style={{ aspectRatio: '4/3' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt="aperçu audio"
          className="w-full h-full object-cover"
          onError={() => { if (imgSrc !== PLACEHOLDER) setImgSrc(PLACEHOLDER) }}
        />
        {/* Overlay sombre quand en lecture */}
        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${playing ? 'opacity-100' : 'opacity-0'}`} />
        {/* Bouton play centré (visible uniquement si pas en lecture) */}
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-black/60 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${base}/icones/play-icon.png`} alt="Lecture" className="w-8 h-8" />
            </div>
          </div>
        )}
      </div>

      {/* ── Barre inline (desktop md+) : affichée en permanence sous l'image ── */}
      <div className="hidden md:block w-full">
        <Controls />
      </div>

      {/* ── Barre fixe (mobile uniquement) : apparaît quand la lecture démarre ── */}
      <div
        className={`md:hidden fixed bottom-0 left-0 w-full max-w-[100vw] z-[100] transition-all duration-500 ${
          mobileBarVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        <Controls />
      </div>
    </>
  )
}
