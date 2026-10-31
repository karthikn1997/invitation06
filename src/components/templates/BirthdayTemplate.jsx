import React from 'react'
import { PartyPopper, Cake, Gift, Sparkles, Star } from 'lucide-react'

export default function BirthdayTemplate({ invitation }) {
  const { birthdayDetails } = invitation

  return (
    <div className="w-full">
      <section className="text-center py-10 sm:py-16 px-4 relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 border border-pink-300 text-pink-900 text-xs font-semibold tracking-wider uppercase mb-6 shadow-sm">
          <PartyPopper className="w-4 h-4 text-pink-600" />
          <span>{birthdayDetails?.milestone || 'Birthday Celebration'}</span>
          <PartyPopper className="w-4 h-4 text-pink-600" />
        </div>

        <div className="max-w-md mx-auto mb-8">
          <div className="relative inline-block">
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-amber-400 p-1.5 bg-gradient-to-tr from-pink-400 via-amber-300 to-indigo-400 shadow-2xl mx-auto">
              <img
                src={birthdayDetails?.photo}
                alt={birthdayDetails?.celebrantName}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="absolute -bottom-2 right-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white p-2.5 rounded-full shadow-lg">
              <Cake className="w-6 h-6" />
            </div>
          </div>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-black text-stone-900 mb-2">
          {birthdayDetails?.celebrantName}
        </h1>
        <p className="font-script text-3xl text-pink-600">
          {birthdayDetails?.subtitle}
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
            Theme: {birthdayDetails?.theme}
          </span>
          <span className="px-3.5 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-bold border border-indigo-300">
            🎈 Fun, Games & Cake Cutting
          </span>
        </div>

        <p className="text-stone-600 text-xs sm:text-sm mt-4 font-medium">
          {birthdayDetails?.parents}
        </p>

        {/* Fun highlights */}
        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mt-8">
          <div className="p-3 bg-pink-50 border border-pink-200 rounded-xl">
            <Gift className="w-6 h-6 text-pink-600 mx-auto mb-1" />
            <span className="text-[11px] font-bold text-stone-800 block">Surprises</span>
            <span className="text-[10px] text-stone-500">Return Gifts</span>
          </div>
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
            <Cake className="w-6 h-6 text-amber-600 mx-auto mb-1" />
            <span className="text-[11px] font-bold text-stone-800 block">Cake Cut</span>
            <span className="text-[10px] text-stone-500">6:30 PM</span>
          </div>
          <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl">
            <Star className="w-6 h-6 text-indigo-600 mx-auto mb-1" />
            <span className="text-[11px] font-bold text-stone-800 block">Magic Show</span>
            <span className="text-[10px] text-stone-500">Music & Games</span>
          </div>
        </div>
      </section>
    </div>
  )
}
