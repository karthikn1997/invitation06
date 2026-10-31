import React from 'react'
import { MapPin, Navigation, Calendar, Phone, ExternalLink } from 'lucide-react'

export default function VenueMap({ venue, eventTitle, eventDate, formattedDate }) {
  const googleMapsUrl = venue?.mapLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue?.name + ' ' + venue?.address)}`

  // Generate Google Calendar Link
  const getGoogleCalendarUrl = () => {
    try {
      const start = new Date(eventDate)
      const end = new Date(start.getTime() + 4 * 60 * 60 * 1000) // 4 hours duration
      
      const formatGCalDate = (d) => d.toISOString().replace(/-|:|\.\d\d\d/g, "")
      
      const title = encodeURIComponent(eventTitle || 'Grand Celebration')
      const details = encodeURIComponent(`We cordially invite you to celebrate with us at ${venue?.name}. Address: ${venue?.address}, ${venue?.city}.`)
      const location = encodeURIComponent(`${venue?.name}, ${venue?.address}, ${venue?.city}`)

      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatGCalDate(start)}/${formatGCalDate(end)}&details=${details}&location=${location}`
    } catch {
      return '#'
    }
  }

  // Generate and download .ics file
  const downloadIcs = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//E-Invitation//Celebration Card//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${eventTitle || 'Grand Celebration'}`,
      `DESCRIPTION:Join our special celebration at ${venue?.name}`,
      `LOCATION:${venue?.name}, ${venue?.address}, ${venue?.city}`,
      `DTSTART:${new Date(eventDate).toISOString().replace(/-|:|\.\d\d\d/g, "")}`,
      `DTEND:${new Date(new Date(eventDate).getTime() + 4 * 60 * 60 * 1000).toISOString().replace(/-|:|\.\d\d\d/g, "")}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n')

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.setAttribute('download', 'invitation-event.ics')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section className="my-12 px-4 max-w-3xl mx-auto">
      <div className="glass-card border border-amber-300/80 rounded-2xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-400/20 to-transparent rounded-bl-full pointer-events-none"></div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-2">
            <MapPin className="w-3.5 h-3.5 text-amber-600" />
            Venue & Location
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-bold">
            Where & When
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm max-w-md mx-auto mt-1">
            We eagerly look forward to welcoming you and your family in person.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Venue Card */}
          <div className="bg-amber-50/70 rounded-xl p-6 border border-amber-200/70 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center text-amber-900 mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-amber-950 mb-2">
                {venue?.name}
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {venue?.address}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-stone-800 mt-1">
                {venue?.city}
              </p>
              {venue?.landmark && (
                <div className="mt-3 text-xs bg-white/70 px-3 py-1.5 rounded-lg border border-amber-200/50 text-stone-600">
                  <span className="font-semibold text-amber-900">Landmark:</span> {venue.landmark}
                </div>
              )}
            </div>

            {venue?.phone && (
              <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-center gap-2 text-xs text-stone-600">
                <Phone className="w-3.5 h-3.5 text-amber-700" />
                <span>Contact for Venue Help: <a href={`tel:${venue.phone}`} className="font-semibold text-amber-900 underline">{venue.phone}</a></span>
              </div>
            )}
          </div>

          {/* Action Hub */}
          <div className="flex flex-col justify-between gap-4">
            <div className="bg-white/80 rounded-xl p-6 border border-amber-200/70">
              <h4 className="font-serif text-base font-bold text-stone-900 mb-1">
                Date & Auspicious Timing
              </h4>
              <p className="text-sm font-semibold text-amber-800">
                {formattedDate}
              </p>
              <p className="text-xs text-stone-500 mt-0.5">
                Valet parking available at venue entrance.
              </p>
            </div>

            {/* Buttons */}
            <div className="space-y-2.5">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps Navigation</span>
                <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-75" />
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-amber-300/60 text-center"
                >
                  <Calendar className="w-3.5 h-3.5 text-amber-700" />
                  <span>Google Calendar</span>
                </a>

                <button
                  onClick={downloadIcs}
                  className="py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-stone-300 text-center cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-stone-600" />
                  <span>Download .ICS</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
