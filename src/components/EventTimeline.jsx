import React from 'react'
import { Calendar, Clock, MapPin, Sparkles, Heart, Bell } from 'lucide-react'

export default function EventTimeline({ schedule = [] }) {
  return (
    <section className="my-12 px-4 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-2">
          <Bell className="w-3.5 h-3.5 text-amber-600" />
          Program Schedule
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-bold">
          Celebration Timeline
        </h2>
        <p className="text-stone-600 text-xs sm:text-sm max-w-md mx-auto mt-1">
          Every moment is sacred and filled with joy. Here is the schedule for our events.
        </p>
      </div>

      <div className="relative border-l-2 border-amber-300 ml-4 sm:ml-32 space-y-8 pl-6 sm:pl-8">
        {schedule.map((item, index) => (
          <div key={item.id || index} className="relative group">
            {/* Pulsing indicator node on timeline */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-amber-500 border-4 border-amber-100 shadow-md group-hover:scale-125 transition-transform flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            </div>

            {/* Time label on desktop left side */}
            <div className="hidden sm:block absolute -left-36 top-1 text-right w-24">
              <span className="text-xs font-bold text-amber-900 font-cinzel block">
                Step 0{index + 1}
              </span>
              <span className="text-[11px] text-stone-500">
                {item.tag || 'Ritual'}
              </span>
            </div>

            {/* Event Card */}
            <div className="glass-card border border-amber-200/80 rounded-xl p-5 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
                  {item.title}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800 border border-amber-300/40">
                  {item.tag}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-amber-900/90 font-medium my-2">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  {item.time}
                </span>
                <span className="flex items-center gap-1.5 text-stone-600">
                  <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  {item.venue}
                </span>
              </div>

              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mt-2 pt-2 border-t border-amber-100/60">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
