import React, { useState } from 'react'
import confetti from 'canvas-confetti'
import { Send, CheckCircle2, Users, HeartHandshake, Utensils, MessageCircle, ArrowUpRight } from 'lucide-react'

export default function RsvpForm({ invitation, onNewWish }) {
  // Demo WhatsApp number as requested by user (e.g. +91 98765 43210)
  const DEMO_WHATSAPP_NUMBER = invitation?.rsvpWhatsApp || '919876543210'

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    attendance: 'attending', // 'attending' | 'declined'
    guestCount: 2,
    foodPreference: 'Traditional South Indian Feast',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [lastWaUrl, setLastWaUrl] = useState('')

  const generateWhatsAppUrl = (data) => {
    const brideName = invitation?.bride?.name || 'Dr. Keerthana'
    const groomName = invitation?.groom?.name || 'Karthik Raja'
    const attendanceEmoji = data.attendance === 'attending' ? '🎉 Joyfully Accepting' : '💌 Regretfully Declining'

    const lines = [
      `✨ *WEDDING RSVP & BLESSINGS* ✨`,
      `Wedding of ${brideName} & ${groomName}`,
      `📅 Friday, 07 November 2026 • Chennai`,
      ``,
      `👤 *Guest Name:* ${data.name.trim()}`,
      data.phone.trim() ? `📱 *Phone Number:* ${data.phone.trim()}` : null,
      `💌 *Attendance:* ${attendanceEmoji}`,
      data.attendance === 'attending' ? `👥 *Number of Guests:* ${data.guestCount} person(s)` : null,
      data.attendance === 'attending' ? `🍽️ *Food Preference:* ${data.foodPreference}` : null,
      data.message.trim() ? `\n💬 *Wishes for Couple:*\n"${data.message.trim()}"` : null,
      ``,
      `_Sent via Royale Invites E-Invitation_`
    ].filter(Boolean).join('\n')

    return `https://api.whatsapp.com/send?phone=${encodeURIComponent(DEMO_WHATSAPP_NUMBER)}&text=${encodeURIComponent(lines)}`
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim()) return

    // Trigger celebratory confetti
    confetti({
      particleCount: 55,
      spread: 65,
      origin: { y: 0.7 }
    })

    // Generate WhatsApp link & open
    const waUrl = generateWhatsAppUrl(formData)
    setLastWaUrl(waUrl)
    
    // Open WhatsApp in new tab / app
    window.open(waUrl, '_blank')

    // Also notify parent if needed
    if (onNewWish && formData.message.trim()) {
      onNewWish({
        sender: formData.name,
        relation: `${formData.guestCount} Guest(s)`,
        message: formData.message,
        timestamp: 'Just now'
      })
    }

    setIsSubmitted(true)
  }

  return (
    <section className="my-10 px-4 max-w-2xl mx-auto">
      <div className="glass-card border border-amber-300/80 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden bg-gradient-to-b from-white/95 via-amber-50/70 to-amber-100/40">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-1/4 w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Section Header */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/90 border border-emerald-300/60 text-emerald-900 text-xs font-semibold uppercase tracking-wider mb-2 shadow-2xs">
            {/* WhatsApp Icon */}
            <svg className="w-3.5 h-3.5 fill-emerald-600" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            <span>WhatsApp RSVP</span>
          </div>
          
          <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-black">
            Will You Be Joining Us?
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm max-w-md mx-auto mt-1">
            Fill in your details below and submit — your RSVP will be sent directly to the hosts on WhatsApp.
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-6 sm:p-8 text-center animate-fade-in shadow-sm">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-2xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            
            <h3 className="font-serif text-xl sm:text-2xl font-black text-emerald-950 mb-1">
              Thank You, {formData.name}!
            </h3>
            
            <p className="text-xs sm:text-sm text-emerald-800 max-w-sm mx-auto mb-4 leading-relaxed">
              {formData.attendance === 'attending'
                ? `Your RSVP for ${formData.guestCount} guest(s) is ready! WhatsApp has been opened with your pre-filled confirmation.`
                : 'Thank you for letting us know! WhatsApp has been opened with your response.'}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
              <a
                href={lastWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open WhatsApp Again</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full sm:w-auto px-4 py-2.5 text-xs text-stone-600 hover:text-stone-900 font-semibold cursor-pointer underline"
              >
                Submit Another Response
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Attendance Toggle */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, attendance: 'attending' })}
                className={`py-3 px-3 rounded-2xl text-xs sm:text-sm font-bold border text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  formData.attendance === 'attending'
                    ? 'bg-amber-700 text-white border-amber-700 shadow-md scale-[1.02]'
                    : 'bg-white/90 text-stone-700 border-amber-200 hover:bg-amber-50'
                }`}
              >
                <span>🎉</span>
                <span>Joyfully Accept</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, attendance: 'declined' })}
                className={`py-3 px-3 rounded-2xl text-xs sm:text-sm font-bold border text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  formData.attendance === 'declined'
                    ? 'bg-stone-700 text-white border-stone-700 shadow-md scale-[1.02]'
                    : 'bg-white/90 text-stone-700 border-stone-300 hover:bg-stone-50'
                }`}
              >
                <span>💌</span>
                <span>Regretfully Decline</span>
              </button>
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300/80 bg-white text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300/80 bg-white text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-2xs"
                />
              </div>
            </div>

            {/* Attending Details: Guest Count & Food */}
            {formData.attendance === 'attending' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1">
                {/* Guest Count */}
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Number of Guests
                  </label>
                  <div className="flex items-center gap-2 bg-white px-2 py-1.5 rounded-xl border border-amber-300/80 shadow-2xs">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, guestCount: Math.max(1, prev.guestCount - 1) }))}
                      className="w-8 h-8 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold flex items-center justify-center cursor-pointer transition-colors"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-bold text-stone-900 text-sm">
                      {formData.guestCount} {formData.guestCount === 1 ? 'person' : 'people'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, guestCount: Math.min(10, prev.guestCount + 1) }))}
                      className="w-8 h-8 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold flex items-center justify-center cursor-pointer transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Food Preference */}
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Food Preference
                  </label>
                  <select
                    value={formData.foodPreference}
                    onChange={(e) => setFormData({ ...formData, foodPreference: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-amber-300/80 bg-white text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-2xs"
                  >
                    <option value="Traditional South Indian Feast">Traditional South Indian Feast</option>
                    <option value="Jain / Pure Veg">Jain / Pure Veg</option>
                    <option value="Kids Friendly">Kids Friendly</option>
                  </select>
                </div>
              </div>
            )}

            {/* Wishes & Blessings Message */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Wishes & Blessings for the Couple
              </label>
              <textarea
                rows="3"
                placeholder="Write your loving blessings and congratulations here..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300/80 bg-white text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none shadow-2xs"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white font-serif font-bold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98 border border-emerald-400/40"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>Confirm & Send via WhatsApp</span>
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
