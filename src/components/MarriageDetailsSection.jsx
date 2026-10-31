import React, { useState, useEffect, useRef } from 'react'
import { Sparkles, Heart, Clock, MapPin, Calendar, Navigation } from 'lucide-react'

export default function MarriageDetailsSection({ invitation }) {
  const [inView, setInView] = useState(false)
  const sectionRef = useRef(null)

  const {
    bride = {},
    groom = {},
    blessingTagline = 'With the divine blessings of Lord Venkateswara and our beloved elders',
    auspiciousMuhurtham = 'Dhanur Lagnam (9:00 AM - 10:30 AM)',
    venue = {}
  } = invitation

  const brideName = bride.name || 'Dr. Keerthana'
  const brideSubtitle = bride.subtitle || 'Daughter of Mrs. Lakshmi & Mr. Sundaram'
  const groomName = groom.name || 'Karthik Raja'
  const groomSubtitle = groom.subtitle || 'Son of Mrs. Shanthi & Mr. Rajasekaran'

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

  return (
    <section
      ref={sectionRef}
      id="marriage-details-section"
      className="relative w-full h-[100dvh] min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#241710] select-none"
    >
      {/* Background ambient lighting for desktop */}
      <div className="absolute inset-0 bg-radial from-amber-900/40 via-stone-950/70 to-black -z-10 hidden sm:block"></div>

      {/* Main Mandapam Stage Container */}
      <div className="relative w-full h-[100dvh] sm:h-[96vh] sm:max-w-[480px] sm:rounded-3xl sm:border-4 sm:border-amber-400/90 sm:shadow-2xl overflow-hidden flex flex-col justify-between bg-[#fcf5e2]">
        
        {/* Background Image: Carved Pillar & Lamp on Right, Parchment on Left */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          <img
            src="/images/mandapam-bg.jpg"
            alt="Traditional Mandapam & Brass Diya Background"
            className="w-full h-full [object-fit:fill] animate-kenburns select-none pointer-events-none"
          />
          {/* Subtle warm overlay on the left to ensure high readability of text */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-50/70 via-amber-50/40 to-transparent pointer-events-none"></div>
        </div>

        {/* Floating Diya Flame Glow Animation over the Kuthuvilakku */}
        <div className="absolute right-[22%] sm:right-[20%] top-[62%] w-8 h-8 rounded-full bg-amber-400/40 blur-md seal-glow pointer-events-none z-10"></div>

        {/* Top Header / Divine Invocation (Slides down) */}
        <div className={`relative z-20 pt-5 px-5 text-left transition-all duration-800 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300/60 shadow-xs mb-1">
            <Sparkles className="w-3 h-3 text-amber-700" />
            <span className="font-cinzel text-[10px] font-bold tracking-widest text-amber-900 uppercase">
              Subha Vivaha Muhurtham
            </span>
          </div>
          <p className="text-[11px] font-serif italic text-amber-950/80 max-w-[240px] leading-tight">
            {blessingTagline}
          </p>
        </div>

        {/* Center Marriage Details (Side alignment: occupying left & center) */}
        <div className="relative z-20 px-5 my-auto w-full max-w-[270px] sm:max-w-[300px] text-left">
          
          {/* Couple Announcement with Parents */}
          <div className={`transition-all duration-800 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            
            {/* Bride Details */}
            <div className="my-1.5">
              <span className="text-[10px] font-cinzel tracking-widest uppercase font-black text-amber-800 block">
                Bride
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-black text-amber-950 tracking-tight leading-none drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                {brideName}
              </h3>
              <p className="text-[10px] text-stone-700 mt-0.5 leading-tight font-medium">
                {brideSubtitle}
              </p>
            </div>

            {/* Weds Connector */}
            <div className="flex items-center gap-2 my-1">
              <span className="w-6 h-[1px] bg-amber-600/50"></span>
              <span className="font-script text-2xl sm:text-3xl text-amber-800 italic">
                weds
              </span>
              <span className="w-12 h-[1px] bg-amber-600/50"></span>
            </div>

            {/* Groom Details */}
            <div className="my-1.5">
              <span className="text-[10px] font-cinzel tracking-widest uppercase font-black text-amber-800 block">
                Groom
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-black text-amber-950 tracking-tight leading-none drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                {groomName}
              </h3>
              <p className="text-[10px] text-stone-700 mt-0.5 leading-tight font-medium">
                {groomSubtitle}
              </p>
            </div>

          </div>

          {/* Timings & Muhurtham Details (Animated Card) */}
          <div className={`mt-3 pt-2.5 border-t border-amber-800/20 space-y-2 transition-all duration-800 delay-400 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            
            {/* Muhurtham */}
            <div className="flex items-start gap-2">
              <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-cinzel font-bold text-amber-900 tracking-wider uppercase block">
                  Subha Muhurtham
                </span>
                <span className="text-xs font-serif font-bold text-amber-950 block">
                  {auspiciousMuhurtham}
                </span>
                <span className="text-[10px] text-stone-600 block">
                  Friday, 7th November 2026
                </span>
              </div>
            </div>

            {/* Reception */}
            <div className="flex items-start gap-2 pt-1 border-t border-amber-800/10">
              <Calendar className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-cinzel font-bold text-amber-900 tracking-wider uppercase block">
                  Grand Reception
                </span>
                <span className="text-xs font-serif font-bold text-amber-950 block">
                  6:30 PM Onwards
                </span>
                <span className="text-[10px] text-stone-600 block">
                  Saturday, 8th November 2026
                </span>
              </div>
            </div>

            {/* Venue Location */}
            <div className="flex items-start gap-2 pt-1 border-t border-amber-800/10">
              <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-cinzel font-bold text-amber-900 tracking-wider uppercase block">
                  Kalyana Mandapam
                </span>
                <span className="text-xs font-serif font-bold text-amber-950 block leading-tight">
                  {venue?.name || 'Sri Krishna Grand Palace'}
                </span>
                <span className="text-[10px] text-stone-600 block leading-tight">
                  {venue?.city || 'Anna Nagar, Chennai'}
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Navigation CTA */}
        <div className={`relative z-20 pb-5 px-5 flex items-center justify-between shrink-0 transition-all duration-800 delay-600 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <a
            href={venue?.mapLink || "https://maps.google.com/?q=Chennai+Convention+Center"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-800 hover:bg-amber-900 text-white text-[11px] font-serif font-bold shadow-md transition-all active:scale-95 border border-amber-500/40"
          >
            <Navigation className="w-3 h-3 text-amber-300" />
            <span>View Hall Map</span>
          </a>

          <button
            onClick={() => {
              const el = document.getElementById('wedding-schedule-section') || document.getElementById('invitation-content')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="text-[10px] font-cinzel font-bold tracking-wider text-amber-900 underline hover:text-amber-950 cursor-pointer"
          >
            Wedding Schedule ↓
          </button>
        </div>

      </div>

    </section>
  )
}
