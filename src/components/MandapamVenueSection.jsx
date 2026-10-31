import React, { useState, useEffect, useRef } from 'react'
import { MapPin, Navigation, Calendar, Phone, Sparkles, Car, Utensils, Heart } from 'lucide-react'

export default function MandapamVenueSection({ invitation }) {
  const [inView, setInView] = useState(false)
  const sectionRef = useRef(null)

  const venue = invitation?.venue || {
    name: 'Sri Krishna Grand Palace Convention Centre',
    address: 'No. 45, Royal Enclave, Gandhi Road, Anna Nagar',
    city: 'Chennai, Tamil Nadu - 600040',
    landmark: 'Opposite Metro Station Pillar #142',
    mapLink: 'https://maps.google.com/?q=Chennai+Convention+Center',
    phone: '+91 98401 23456'
  }

  const googleMapsUrl = venue?.mapLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue?.name + ' ' + venue?.address)}`

  // Generate Google Calendar Link
  const getGoogleCalendarUrl = () => {
    try {
      const eventDate = invitation?.eventDate || '2026-11-07T09:30:00'
      const start = new Date(eventDate)
      const end = new Date(start.getTime() + 5 * 60 * 60 * 1000)
      const formatGCalDate = (d) => d.toISOString().replace(/-|:|\.\d\d\d/g, "")
      
      const title = encodeURIComponent(`Wedding of ${invitation?.bride?.name || 'Keerthana'} & ${invitation?.groom?.name || 'Karthik'}`)
      const details = encodeURIComponent(`We cordially invite you to join our wedding celebration at ${venue?.name}. Address: ${venue?.address}, ${venue?.city}.`)
      const location = encodeURIComponent(`${venue?.name}, ${venue?.address}, ${venue?.city}`)

      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatGCalDate(start)}/${formatGCalDate(end)}&details=${details}&location=${location}`
    } catch {
      return '#'
    }
  }

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
      id="mandapam-venue-section"
      className="relative w-full h-[100dvh] min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#241710] select-none"
    >
      {/* Background ambient lighting for desktop */}
      <div className="absolute inset-0 bg-radial from-amber-900/40 via-stone-950/70 to-black -z-10 hidden sm:block"></div>

      {/* Main Container */}
      <div className="relative w-full h-[100dvh] sm:h-[96vh] sm:max-w-[480px] sm:rounded-3xl sm:border-4 sm:border-amber-400/90 sm:shadow-2xl overflow-hidden flex flex-col justify-between bg-[#fbf5e4]">
        
        {/* Full Bleed Background Image: Top Jasmine Toran + Bottom Temple Town */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          <img
            src="/images/temple-mandapam-bg.jpg"
            alt="Traditional Temple Town Mandapam Background"
            className="w-full h-full [object-fit:fill] animate-kenburns select-none pointer-events-none"
          />
          {/* Subtle warm wash for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-50/30 to-transparent pointer-events-none"></div>
        </div>

        {/* Top spacer (leaves top jasmine garland completely visible) */}
        <div className="relative z-10 h-24 sm:h-28 shrink-0 pointer-events-none"></div>

        {/* Center Mandapam Details Content */}
        <div className="relative z-20 px-5 sm:px-8 my-auto w-full max-w-[340px] sm:max-w-[370px] mx-auto text-center">
          
          {/* Header Badge */}
          <div className={`transition-all duration-800 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/90 border border-amber-300/70 shadow-xs mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span className="font-cinzel text-[10px] sm:text-[11px] font-black tracking-[0.25em] text-amber-950 uppercase">
                Kalyana Mandapam
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            </div>
            <p className="font-script text-2xl sm:text-3xl text-amber-800 leading-tight">
              Venue & Location
            </p>
          </div>

          {/* Mandapam Name & Hall Details */}
          <div className={`my-3 transition-all duration-800 delay-200 ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-amber-950 tracking-tight leading-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
              {venue.name}
            </h2>
            <p className="text-[11px] font-cinzel font-bold text-amber-800 tracking-wider uppercase mt-1">
              Grand Air-Conditioned Royal Hall
            </p>
          </div>

          {/* Address & Landmark */}
          <div className={`space-y-1.5 my-2.5 transition-all duration-800 delay-400 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="flex items-start justify-center gap-1.5 text-xs text-stone-800 font-medium">
              <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <p className="max-w-[260px] text-center leading-snug drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">
                {venue.address}, {venue.city}
              </p>
            </div>

            {venue.landmark && (
              <div className="inline-block px-3 py-0.5 rounded-full bg-white/70 border border-amber-300/50 text-[10px] font-semibold text-amber-900 shadow-xs">
                📍 Landmark: {venue.landmark}
              </div>
            )}
          </div>

          {/* Hospitality Amenities Icons */}
          <div className={`flex items-center justify-center gap-4 my-3 text-[10px] font-semibold text-amber-900/90 transition-all duration-800 delay-500 ${inView ? 'opacity-100' : 'opacity-0'}`}>
            <span className="flex items-center gap-1 bg-amber-100/60 px-2.5 py-1 rounded-full border border-amber-300/40">
              <Car className="w-3 h-3 text-amber-700" /> Valet Parking
            </span>
            <span className="flex items-center gap-1 bg-amber-100/60 px-2.5 py-1 rounded-full border border-amber-300/40">
              <Utensils className="w-3 h-3 text-amber-700" /> Traditional Feast
            </span>
          </div>

          {/* Action Buttons: Google Maps & Add to Calendar */}
          <div className={`space-y-2 pt-2 transition-all duration-800 delay-600 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 hover:from-amber-800 hover:to-black text-white text-xs font-serif font-bold shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 border border-amber-400/60"
            >
              <Navigation className="w-3.5 h-3.5 text-amber-300" />
              <span>Get Directions on Google Maps</span>
            </a>

            <div className="flex items-center justify-center gap-2">
              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 px-3.5 rounded-full bg-white/80 hover:bg-white text-amber-950 text-[10px] font-cinzel font-bold shadow-xs transition-colors border border-amber-300/70 flex items-center gap-1"
              >
                <Calendar className="w-3 h-3 text-amber-700" />
                <span>Add to Calendar</span>
              </a>

              {venue.phone && (
                <a
                  href={`tel:${venue.phone}`}
                  className="py-1.5 px-3.5 rounded-full bg-white/80 hover:bg-white text-amber-950 text-[10px] font-cinzel font-bold shadow-xs transition-colors border border-amber-300/70 flex items-center gap-1"
                >
                  <Phone className="w-3 h-3 text-amber-700" />
                  <span>Call Hall</span>
                </a>
              )}
            </div>
          </div>

        </div>

        {/* Bottom spacer (keeps the panoramic temple town, lake, and gopuram visible at the bottom) */}
        <div className="relative z-10 pb-6 sm:pb-8 text-center shrink-0">
          <button
            onClick={() => {
              const el = document.getElementById('invitation-content')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="text-[10px] font-cinzel font-black tracking-widest text-amber-950/80 hover:text-black uppercase underline cursor-pointer drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)] bg-white/50 px-3 py-1 rounded-full border border-amber-300/40"
          >
            RSVP Attendance ↓
          </button>
        </div>

      </div>

    </section>
  )
}
