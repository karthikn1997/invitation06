import React, { useState, useEffect, useRef } from 'react'
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react'

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const audioRef = useRef(null)

  // Initialize and attach event listeners
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0.65

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => {
      audio.currentTime = 0
      audio.play().catch(() => {})
    }

    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handleEnded)

    // 1. Try to autoplay immediately on mount
    const tryAutoplay = () => {
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
            setHasInteracted(true)
          })
          .catch(() => {
            // Browser blocked autoplay without user gesture - will start on first touch/scroll
          })
      }
    }

    tryAutoplay()

    // 2. Listen for custom trigger from Hero "Open Full Invitation" or other sections
    const handleTriggerAudio = () => {
      if (audio.paused) {
        audio.play().then(() => {
          setIsPlaying(true)
          setHasInteracted(true)
        }).catch((err) => {
          console.warn('Autoplay prevented by browser:', err)
        })
      }
    }

    window.addEventListener('play-wedding-music', handleTriggerAudio)

    // 3. Listen to EVERY possible user gesture (touch, scroll, swipe, click, wheel, key)
    const gestureEvents = ['click', 'touchstart', 'touchend', 'touchmove', 'scroll', 'pointerdown', 'wheel', 'keydown']
    const handleFirstGesture = () => {
      if (audio.paused) {
        audio.play().then(() => {
          setIsPlaying(true)
          setHasInteracted(true)
        }).catch(() => {})
      }
      gestureEvents.forEach((evt) => window.removeEventListener(evt, handleFirstGesture))
    }

    gestureEvents.forEach((evt) => window.addEventListener(evt, handleFirstGesture, { passive: true }))

    return () => {
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('ended', handleEnded)
      window.removeEventListener('play-wedding-music', handleTriggerAudio)
      gestureEvents.forEach((evt) => window.removeEventListener(evt, handleFirstGesture))
    }
  }, [])

  const togglePlay = (e) => {
    e.stopPropagation()
    const audio = audioRef.current
    if (!audio) return

    setHasInteracted(true)

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play().catch((err) => console.warn('Playback error:', err))
    }
  }

  return (
    <>
      {/* Hidden Native Audio Element with Multiple Format Fallbacks */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src="/audio/song.mp3" type="audio/mpeg" />
        <source src="/audio/song.mpeg" type="audio/mpeg" />
        <source src="/audio/wedding-shehnai.mp3" type="audio/mpeg" />
        <source src="/audio/wedding-music.ogg" type="audio/ogg" />
      </audio>

      {/* Floating Royal Golden Music Disc Widget (Always Available in Top-Right) */}
      <aside 
        aria-label="Background Music Controls"
        className="fixed top-4 right-4 z-50 flex items-center gap-2 group select-none pointer-events-auto"
      >
        {/* Expanded Info Badge on Hover/Active */}
        <div 
          onClick={togglePlay}
          className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md border border-amber-300/80 shadow-md cursor-pointer transition-all duration-300 ${
            isPlaying 
              ? 'bg-amber-950/85 text-amber-200' 
              : 'bg-white/85 text-amber-900 hover:bg-white'
          }`}
        >
          <Music className={`w-3.5 h-3.5 ${isPlaying ? 'text-amber-400 animate-pulse' : 'text-amber-700'}`} />
          <span className="font-cinzel text-[10px] font-bold tracking-wider uppercase">
            {isPlaying ? 'Wedding Music' : 'Play Music'}
          </span>
          {isPlaying && (
            <div className="flex items-end gap-0.5 h-3 pl-1">
              <span className="w-0.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0ms] h-2"></span>
              <span className="w-0.5 bg-amber-300 rounded-full animate-bounce [animation-delay:150ms] h-3"></span>
              <span className="w-0.5 bg-amber-400 rounded-full animate-bounce [animation-delay:300ms] h-1.5"></span>
            </div>
          )}
        </div>

        {/* Circular Vinyl / Golden Temple Disc Button */}
        <button
          type="button"
          onClick={togglePlay}
          className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center cursor-pointer shadow-xl border-2 transition-all duration-300 active:scale-90 ${
            isPlaying
              ? 'bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 border-amber-300 text-amber-100 shadow-amber-900/40 ring-2 ring-amber-400/50'
              : 'bg-white/90 hover:bg-white border-amber-400/90 text-amber-900 shadow-stone-800/20'
          }`}
          title={isPlaying ? 'Pause Background Music' : 'Play Background Music'}
          aria-label={isPlaying ? 'Pause Background Music' : 'Play Background Music'}
        >
          {/* Subtle Rotating Gold Ring when playing */}
          {isPlaying && (
            <div className="absolute inset-0.5 rounded-full border border-dashed border-amber-300/60 animate-spin [animation-duration:8s] pointer-events-none"></div>
          )}

          {/* Central Icon */}
          {isPlaying ? (
            <div className="relative flex items-center justify-center">
              <Volume2 className="w-5 h-5 text-amber-200" />
              {/* Floating Sparkle */}
              <Sparkles className="w-2.5 h-2.5 text-amber-300 absolute -top-1 -right-1 animate-ping" />
            </div>
          ) : (
            <div className="relative flex items-center justify-center">
              <VolumeX className="w-5 h-5 text-stone-600 group-hover:text-amber-800 transition-colors" />
            </div>
          )}
        </button>
      </aside>
    </>
  )
}
