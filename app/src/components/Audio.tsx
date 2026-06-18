'use client'

import { useRef, useState, useEffect } from 'react'

const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

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
  const [visible, setVisible] = useState(false)

  const play = async () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      try {
        await audioRef.current.play()
        setPlaying(true)
        setVisible(true)
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
    setVisible(false)
  }

  const toggleMute = () => {
    if (!audioRef.current) return
    if (muted) {
      audioRef.current.volume = 1
      setVolume(1)
    } else {
      audioRef.current.volume = 0
      setVolume(0)
    }
    setMuted(!muted)
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

  return (
    <>
      {/* Preview card */}
      {preview_audio_video && (
        <div
          onClick={() => { if (!playing) play() }}
          className="w-full h-full bg-[#2C2C2C] bg-center bg-contain bg-no-repeat relative flex items-center justify-center cursor-pointer"
          style={{ backgroundImage: `url(${preview_audio_video})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${base}/icones/play-icon.png`} alt="Lecture" className="w-12 h-12 z-10 object-contain" />
        </div>
      )}

      <audio ref={audioRef} preload="metadata">
        <source src={src} type="audio/wav" />
        <source src={src} type="audio/mpeg" />
      </audio>

      {/* Controls bar */}
      <div
        className={`fixed bottom-0 left-0 w-full bg-nav px-0 py-2.5 z-[100] transition-opacity duration-500 ${
          visible ? 'opacity-100' : 'opacity-0 -z-10'
        }`}
      >
        <div className="flex items-center justify-between w-full gap-1">
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
              onChange={(e) => {
                const t = parseFloat(e.target.value)
                if (audioRef.current) audioRef.current.currentTime = t
                setCurrent(t)
              }}
              className="flex-1 min-w-0"
            />
            <span className="text-white text-xs whitespace-nowrap hidden sm:inline">
              {formatTime(current)} / {formatTime(duration)}
            </span>
          </div>

          {/* Volume (hidden on mobile) */}
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
              onChange={(e) => {
                const v = parseFloat(e.target.value)
                if (audioRef.current) audioRef.current.volume = v
                setVolume(v)
                setMuted(v === 0)
              }}
              className="flex-1"
            />
          </div>

          {/* Close */}
          <button onClick={close} className="bg-transparent border-none pr-3 flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${base}/icones/white-x.png`} alt="Fermer" className="w-8 h-8 cursor-pointer" />
          </button>
        </div>
      </div>
    </>
  )
}
