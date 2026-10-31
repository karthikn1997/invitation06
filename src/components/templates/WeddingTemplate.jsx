import React from 'react'
import { Heart, Sparkles, Flower2, Stars } from 'lucide-react'

export default function WeddingTemplate({ invitation }) {
  const { bride, groom, blessingTagline, quote, auspiciousMuhurtham, coupleTagline, gallery = [] } = invitation

  return (
    <div className="w-full">
      {/* Hero Header Section */}
      <section className="text-center py-10 sm:py-16 px-4 relative overflow-hidden">
        {/* Auspicious Blessing Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-xs font-semibold tracking-wider uppercase mb-6 shadow-sm">
          <Flower2 className="w-4 h-4 text-amber-700" />
          <span>{blessingTagline}</span>
          <Flower2 className="w-4 h-4 text-amber-700" />
        </div>

        <p className="font-cinzel text-xs sm:text-sm tracking-[0.3em] uppercase text-stone-600 mb-2 font-semibold">
          Together With Their Families
        </p>

        {/* Grand Wedding Couple Announcement */}
        <div className="my-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            {/* Bride Profile Card */}
            <div className="flex flex-col items-center group">
              <div className="relative mb-4">
                <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-amber-400 p-1 bg-gradient-to-tr from-amber-300 to-amber-600 shadow-xl group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={bride.photo}
                    alt={bride.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <span className="absolute bottom-1 right-2 bg-amber-700 text-amber-100 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                  Bride
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                {bride.name}
              </h3>
              <p className="text-xs text-stone-600 mt-1 max-w-xs text-center font-medium">
                {bride.subtitle}
              </p>
            </div>

            {/* Central Romantic Connector */}
            <div className="flex flex-col items-center my-2 md:my-0">
              <div className="w-12 h-12 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 shadow-inner my-2">
                <Heart className="w-6 h-6 fill-amber-500 text-amber-600 animate-pulse" />
              </div>
              <span className="font-script text-4xl sm:text-5xl text-amber-800 -my-1">
                Weds
              </span>
              <span className="text-[11px] font-cinzel tracking-widest text-stone-400 uppercase">
                Forever
              </span>
            </div>

            {/* Groom Profile Card */}
            <div className="flex flex-col items-center group">
              <div className="relative mb-4">
                <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-amber-400 p-1 bg-gradient-to-tr from-amber-300 to-amber-600 shadow-xl group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={groom.photo}
                    alt={groom.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <span className="absolute bottom-1 right-2 bg-amber-700 text-amber-100 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                  Groom
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                {groom.name}
              </h3>
              <p className="text-xs text-stone-600 mt-1 max-w-xs text-center font-medium">
                {groom.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Auspicious Muhurtham Badge */}
        {auspiciousMuhurtham && (
          <div className="max-w-md mx-auto my-6 p-4 rounded-2xl bg-gradient-to-r from-amber-50 via-amber-100/80 to-amber-50 border border-amber-300/80 shadow-sm">
            <span className="text-[11px] font-cinzel uppercase font-bold text-amber-900 tracking-wider block">
              Auspicious Subha Muhurtham
            </span>
            <span className="font-serif text-base sm:text-lg font-bold text-amber-950 mt-0.5 block">
              {auspiciousMuhurtham}
            </span>
          </div>
        )}

        {/* Romantic Quote */}
        {quote && (
          <div className="max-w-xl mx-auto mt-6 text-stone-700">
            <p className="font-serif italic text-sm sm:text-base leading-relaxed text-stone-800">
              {quote}
            </p>
            <p className="font-script text-2xl text-amber-800 mt-2">
              {coupleTagline || 'Keerthana & Karthik'}
            </p>
          </div>
        )}
      </section>

      {/* Photo Highlights Gallery */}
      {gallery && gallery.length > 0 && (
        <section className="my-10 px-4 max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-2">
              <Stars className="w-3.5 h-3.5 text-amber-600" />
              Moments of Love
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Our Journey in Pictures
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {gallery.map((photo, i) => (
              <div
                key={i}
                className="group relative rounded-xl overflow-hidden shadow-md aspect-square border-2 border-amber-200/80"
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <span className="text-white text-xs font-medium font-serif">
                    {photo.caption}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
