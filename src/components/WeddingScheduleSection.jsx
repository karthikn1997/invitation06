import React, { useState, useEffect, useRef } from 'react'
import { Sparkles, Heart, Clock, Utensils, Music, Sun, MapPin } from 'lucide-react'

export default function WeddingScheduleSection({ invitation }) {
  const [inView, setInView] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Traditional South Indian ceremonies formatted for perfect readability without truncation
  const ceremonies = [
    {
      id: 1,
      time: '6:00 PM',
      day: 'Fri, Nov 27',
      title: 'Nichayathartham',
      subtitle: 'Ring Exchange & Sangeet',
      venue: 'Emerald Hall',
      tag: 'Celebration',
      icon: Sun,
      side: 'right',
    },
    {
      id: 2,
      time: '7:30 AM',
      day: 'Sat, Nov 28',
      title: 'Mangala Snanam',
      subtitle: 'Sacred Bath & Kasi Yatra',
      venue: 'Temple Courtyard',
      tag: 'Sacred Ritual',
      icon: Heart,
      side: 'left',
    },
    {
      id: 3,
      time: '9:30 AM',
      day: 'Sat, Nov 28',
      title: 'Subha Muhurtham',
      subtitle: 'Thali Dharanam & Vows',
      venue: 'Grand Mandapam',
      tag: 'Main Event',
      icon: Music,
      side: 'right',
    },
    {
      id: 4,
      time: '7:00 PM',
      day: 'Sat, Nov 28',
      title: 'Grand Reception',
      subtitle: 'Live Music & Royal Feast',
      venue: 'Palace Lawns',
      tag: 'Gala Dinner',
      icon: Utensils,
      side: 'left',
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="wedding-schedule-section"
      className="relative w-full h-[100dvh] min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#241710] select-none"
    >
      {/* Background ambient lighting for desktop outer frame */}
      <div className="absolute inset-0 bg-radial from-amber-900/40 via-stone-950/70 to-black -z-10 hidden sm:block"></div>

      {/* Main Container */}
      <div className="relative w-full h-[100dvh] sm:h-[96vh] sm:max-w-[480px] sm:rounded-3xl sm:border-4 sm:border-amber-400/90 sm:shadow-2xl overflow-hidden flex flex-col justify-between bg-[#fbf5e6]">
        
        {/* Full Bleed Background: Pure Sandalwood Parchment with Gold Foil Hairline Border & Peacock Corners (Zero Flowers, Edge to Edge) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          <img
            src="/images/simple-schedule-noflowers.jpg?v=2"
            alt="Pure Sandalwood Wedding Schedule Parchment"
            className="w-full h-full [object-fit:fill] select-none pointer-events-none"
          />
        </div>

        {/* TOP HEADER SECTION (Starts right inside top golden frame) */}
        <div className="relative z-20 text-center pt-5 sm:pt-7 px-5 shrink-0">
          <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.2em] text-[#3a2010] uppercase drop-shadow-xs">
              Wedding Schedule
            </h2>
            <p className="font-serif italic text-[11px] sm:text-xs text-stone-600 mt-0.5">
              Celebrating Every Sacred Ritual
            </p>
            <div className="flex items-center justify-center gap-3 mt-1.5 text-amber-700/50">
              <span className="w-10 h-[1px] bg-amber-600/30"></span>
              <span className="text-[10px]">❖</span>
              <span className="w-10 h-[1px] bg-amber-600/30"></span>
            </div>
          </div>
        </div>

        {/* CENTRAL EVENTS LIST (Simple, Clean, Airy & Perfectly Proportioned) */}
        <div className="relative z-20 my-auto w-full max-w-[390px] mx-auto px-5 py-1">
          <div className="space-y-3 sm:space-y-3.5">
            {ceremonies.map((evt, idx) => {
              const isMuhurtham = evt.id === 3

              return (
                <div
                  key={evt.id}
                  className={`relative text-center transition-all duration-700 ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${150 + idx * 100}ms` }}
                >
                  {/* Event Container */}
                  <div
                    className={`relative py-2 px-3.5 rounded-xl transition-all ${
                      isMuhurtham
                        ? 'bg-amber-100/50 border border-amber-300/80 shadow-xs'
                        : 'hover:bg-amber-50/40'
                    }`}
                  >
                    {/* Date & Time Header */}
                    <div className="flex items-center justify-center gap-2 mb-0.5">
                      <span className="font-cinzel text-[10px] sm:text-[10.5px] font-bold tracking-widest text-amber-800 uppercase">
                        {evt.day}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-amber-600/60"></span>
                      <span className="font-serif font-semibold text-[10.5px] sm:text-[11px] text-amber-950">
                        {evt.time}
                      </span>
                      {isMuhurtham && (
                        <span className="ml-1 px-1.5 py-0.2 rounded-full bg-amber-600 text-amber-50 text-[7.5px] font-cinzel font-bold tracking-wider uppercase">
                          Auspicious
                        </span>
                      )}
                    </div>

                    {/* Ceremony Title */}
                    <h3 className="font-cinzel text-[15px] sm:text-base font-bold text-[#2d180a] tracking-wide">
                      {evt.title}
                    </h3>

                    {/* Subtitle / Ritual Ceremony Details */}
                    <p className="font-serif italic text-[11.5px] sm:text-xs text-stone-700 mt-0.5">
                      {evt.subtitle}
                    </p>

                    {/* Venue */}
                    <div className="flex items-center justify-center gap-1 mt-0.5 text-[9.5px] sm:text-[10px] text-amber-900/80">
                      <MapPin className="w-2.5 h-2.5 text-amber-700 shrink-0" />
                      <span>{evt.venue}</span>
                    </div>
                  </div>

                  {/* Delicate separator between items (except last) */}
                  {idx < ceremonies.length - 1 && (
                    <div className="flex items-center justify-center gap-2 mt-1.5 opacity-35">
                      <span className="w-8 h-[1px] bg-amber-800"></span>
                      <span className="text-[7px] text-amber-900">✦</span>
                      <span className="w-8 h-[1px] bg-amber-800"></span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* BOTTOM SECTION: Auspicious Blessing Tag + Smooth Navigation (Stays above bottom golden frame) */}
        <div className={`relative z-20 pb-5 sm:pb-6 px-4 text-center shrink-0 transition-all duration-700 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-[10px] sm:text-[10.5px] font-serif italic text-amber-950/80 max-w-[320px] mx-auto mb-1.5">
            "We seek your loving presence & blessings"
          </p>

          <button
            onClick={() => {
              const el = document.getElementById('countdown-hands-section') || document.getElementById('mandapam-venue-section')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="text-[9.5px] font-cinzel font-semibold tracking-widest text-amber-900 hover:text-amber-950 uppercase cursor-pointer hover:underline transition-all"
          >
            Countdown to the Big Day ↓
          </button>
        </div>

      </div>
    </section>
  )
}
