import React, { useState } from 'react'
import { MessageSquareHeart, Heart, Sparkles, Send } from 'lucide-react'

export default function WishesWall({ wishes = [], onAddWish }) {
  const [quickName, setQuickName] = useState('')
  const [quickMsg, setQuickMsg] = useState('')
  const [likedIds, setLikedIds] = useState({})

  const handleQuickSubmit = (e) => {
    e.preventDefault()
    if (!quickName.trim() || !quickMsg.trim()) return

    onAddWish({
      sender: quickName.trim(),
      relation: 'Well Wisher',
      message: quickMsg.trim(),
      timestamp: 'Just now'
    })

    setQuickName('')
    setQuickMsg('')
  }

  const toggleLike = (id) => {
    setLikedIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <section className="my-12 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-2">
          <MessageSquareHeart className="w-3.5 h-3.5 text-amber-600" />
          Guestbook & Blessings
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-bold">
          Wishes Wall
        </h2>
        <p className="text-stone-600 text-xs sm:text-sm max-w-md mx-auto mt-1">
          Words of love, blessings, and warm thoughts from friends and family.
        </p>
      </div>

      {/* Quick blessing input box */}
      <form onSubmit={handleQuickSubmit} className="glass-card border border-amber-200/90 rounded-2xl p-4 sm:p-6 mb-8 shadow-md">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Your Name (e.g. Anand & Family)"
            value={quickName}
            onChange={(e) => setQuickName(e.target.value)}
            className="sm:w-1/3 px-3.5 py-2.5 rounded-xl border border-amber-200 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          />
          <input
            type="text"
            placeholder="Write a sweet congratulatory message..."
            value={quickMsg}
            onChange={(e) => setQuickMsg(e.target.value)}
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-amber-200 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <Send className="w-4 h-4" />
            <span>Post Wish</span>
          </button>
        </div>
      </form>

      {/* Grid of wishes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishes.map((item, index) => {
          const isLiked = likedIds[item.id || index]
          return (
            <div
              key={item.id || index}
              className="bg-white/85 backdrop-blur-sm border border-amber-200/70 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-stone-900">
                      {item.sender}
                    </h4>
                    <span className="text-[11px] text-amber-700 font-medium">
                      {item.relation || 'Guest'}
                    </span>
                  </div>
                  <span className="text-[10px] text-stone-400">
                    {item.timestamp}
                  </span>
                </div>
                <p className="text-xs text-stone-700 italic leading-relaxed">
                  "{item.message}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between text-xs text-stone-500">
                <span className="flex items-center gap-1 text-[11px] text-amber-800">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  Blessing Received
                </span>
                <button
                  type="button"
                  onClick={() => toggleLike(item.id || index)}
                  className={`flex items-center gap-1 text-xs cursor-pointer transition-colors ${
                    isLiked ? 'text-rose-600 font-bold' : 'text-stone-400 hover:text-rose-500'
                  }`}
                  aria-label="Send Love"
                >
                  <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500' : ''}`} />
                  <span>{isLiked ? 'Blessed' : 'Bless'}</span>
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
