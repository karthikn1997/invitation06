import React, { useState, useEffect, useRef } from 'react'
import { Sparkles, Calendar, Heart, Clock } from 'lucide-react'

export default function CountdownHandsSection({ invitation }) {
  const [inView, setInView] = useState(false)
  const sectionRef = useRef(null)

  const targetDate = invitation?.eventDate || '2026-11-07T09:30:00'

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false
  })

  useEffect(() => {
    const calculateTime = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime()

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((difference / 1000 / 60) % 60)
      const seconds = Math.floor((difference / 1000) % 60)

      setTimeLeft({ days, hours, minutes, seconds, isPast: false })
    }

    calculateTime()
    const timer = setInterval(calculateTime, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
          }
        })
      },
      { threshold: 0.25 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const brideName = invitation?.bride?.name || 'Dr. Keerthana'
  const groomName = invitation?.groom?.name || 'Karthik Raja'

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ]

  return (
    <section
      ref={sectionRef}
      id="countdown-hands-section"
      className="relative w-full h-[100dvh] min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#241710] select-none"
    >
      {/* Background ambient lighting for desktop outer frame */}
      <div className="absolute inset-0 bg-radial from-amber-900/40 via-stone-950/70 to-black -z-10 hidden sm:block"></div>

      {/* Main Container */}
      <div className="relative w-full h-[100dvh] sm:h-[96vh] sm:max-w-[480px] sm:rounded-3xl sm:border-4 sm:border-amber-400/90 sm:shadow-2xl overflow-hidden flex flex-col justify-between bg-[#fbf5e6]">
        
        {/* Full Bleed Background Image: 100% Real Authentic South Indian Saptapadi Wedding Photograph */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          <img
            src="/images/real-saptapadi-photo.jpg?v=1"
            alt="Real South Indian Wedding Saptapadi Little Finger Holding Hands Photograph"
            className="w-full h-full object-cover select-none pointer-events-none"
          />
          {/* Subtle warm wash for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-50/20 via-transparent to-amber-950/20 pointer-events-none"></div>
        </div>

        {/* TOP CONTENT */}
        <div className="relative z-10 pt-7 sm:pt-9 px-5 text-center shrink-0">
          
          {/* Header Badge */}
          <div className={`transition-all duration-800 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/90 border border-amber-300/80 shadow-md mb-1 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
              <span className="font-cinzel text-[10px] sm:text-[11px] font-black tracking-[0.25em] text-amber-950 uppercase">
                The Countdown
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
            </div>

            <p className="font-script text-2xl sm:text-3xl text-amber-950 leading-tight drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
              Counting Down to Forever
            </p>
          </div>

          {/* Couple Names */}
          <div className={`mt-0.5 transition-all duration-800 delay-200 ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <h3 className="font-serif text-xl sm:text-2xl font-black text-amber-950 tracking-tight leading-tight drop-shadow-[0_1px_3px_rgba(255,255,255,0.95)]">
              {brideName} <span className="text-amber-700 font-script text-2xl font-normal">&</span> {groomName}
            </h3>
            <p className="text-[10px] sm:text-[10.5px] font-cinzel font-bold text-amber-900 tracking-wider uppercase mt-0.5 drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
              Together in Sacred Harmony
            </p>
          </div>

        </div>

        {/* CENTER SPACER: Keeps the little finger holding hands and tied sacred knot 100% visible! */}
        <div className="relative z-10 flex-1 min-h-[140px] sm:min-h-[180px] pointer-events-none"></div>

        {/* BOTTOM CONTENT (Below Hands, above bottom floral border) */}
        <div className="relative z-20 pb-8 sm:pb-10 px-4 text-center shrink-0 w-full max-w-[380px] sm:max-w-[420px] mx-auto">
          
          {/* Target Event Date Tag */}
          <div className={`mb-2.5 transition-all duration-800 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/85 border border-amber-300/80 text-[11px] font-serif font-bold text-amber-950 shadow-xs backdrop-blur-xs">
              <Calendar className="w-3.5 h-3.5 text-amber-700" />
              <span>Friday, November 07, 2026 • 09:30 AM</span>
            </div>
          </div>

          {/* Live Countdown Grid (4 Digit Cards) */}
          <div className={`transition-all duration-800 delay-400 ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            {timeLeft.isPast ? (
              <div className="py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white font-serif font-bold text-sm sm:text-base shadow-xl border border-amber-400/50">
                ✨ The Auspicious Day Has Arrived! Welcome All! ✨
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
                {timeBlocks.map((block, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-2xl bg-white/90 backdrop-blur-md border border-amber-300/90 shadow-[0_4px_14px_rgba(180,83,9,0.12)] group hover:border-amber-500 transition-all"
                  >
                    <span className="font-serif text-2xl sm:text-3xl font-black text-amber-950 leading-none drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                      {String(block.value).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-cinzel font-black tracking-widest uppercase text-amber-800 mt-1">
                      {block.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tagline / Subtitle */}
          <div className={`mt-2.5 text-center transition-all duration-800 delay-500 ${inView ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-[10.5px] font-medium text-stone-700 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] flex items-center justify-center gap-1">
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse" />
              <span>Until we tie the knot & begin forever</span>
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse" />
            </p>
          </div>

          {/* Bottom Navigation CTA */}
          <div className={`mt-3 transition-all duration-800 delay-600 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <button
              onClick={() => {
                const el = document.getElementById('mandapam-venue-section') || document.getElementById('invitation-content')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className="text-[10px] font-cinzel font-black tracking-widest text-amber-950/90 hover:text-black uppercase underline cursor-pointer drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)] bg-white/60 hover:bg-white/90 px-3.5 py-1.5 rounded-full border border-amber-300/60 shadow-xs transition-all active:scale-95"
            >
              Mandapam Venue Details ↓
            </button>
          </div>

        </div>

      </div>
    </section>
  )
}
