import React from 'react'
import { Home, Sparkles, Sun, Flower } from 'lucide-react'

export default function HousewarmingTemplate({ invitation }) {
  const { housewarmingDetails } = invitation

  return (
    <div className="w-full">
      <section className="text-center py-10 sm:py-16 px-4 relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-semibold tracking-wider uppercase mb-6 shadow-sm">
          <Flower className="w-4 h-4 text-emerald-700" />
          <span>Grahapravesam & Vaastu Pooja</span>
          <Flower className="w-4 h-4 text-emerald-700" />
        </div>

        <div className="max-w-xl mx-auto mb-8">
          <div className="rounded-2xl overflow-hidden border-4 border-amber-300/80 shadow-2xl relative aspect-video">
            <img
              src={housewarmingDetails?.photo}
              alt={housewarmingDetails?.homeName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-transparent to-transparent flex items-end justify-center p-6">
              <span className="font-serif text-white text-xl sm:text-2xl font-bold">
                {housewarmingDetails?.homeName}
              </span>
            </div>
          </div>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mb-2">
          New Home Housewarming
        </h1>
        <p className="font-script text-3xl text-amber-700">
          {housewarmingDetails?.familyName}
        </p>
        <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-md mx-auto">
          Warmly invites you and your family to join us as we step into our dream abode and seek the blessings of the Almighty.
        </p>

        {housewarmingDetails?.muhurthamTime && (
          <div className="max-w-md mx-auto mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-300 text-center">
            <span className="text-[11px] font-cinzel uppercase font-bold text-amber-900 tracking-wider block">
              Auspicious Milk Boiling Muhurtham
            </span>
            <span className="font-serif text-sm sm:text-base font-bold text-amber-950 mt-1 block">
              {housewarmingDetails.muhurthamTime}
            </span>
          </div>
        )}

        <p className="text-stone-500 text-xs mt-4 font-semibold">
          Hosts: {housewarmingDetails?.hosts}
        </p>
      </section>
    </div>
  )
}
