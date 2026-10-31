import React, { useState } from 'react'
import { Share2, Copy, Check, MessageCircle, Printer, QrCode, X } from 'lucide-react'

export default function ShareBar({ invitation }) {
  const [copied, setCopied] = useState(false)
  const [showQr, setShowQr] = useState(false)

  const brideName = invitation.bride?.name || 'Bride'
  const groomName = invitation.groom?.name || 'Groom'
  const eventTitle = invitation.template === 'wedding'
    ? `The Wedding of ${brideName} & ${groomName}`
    : invitation.template === 'birthday'
    ? `${invitation.birthdayDetails?.celebrantName}'s 1st Birthday`
    : `${invitation.housewarmingDetails?.homeName} Grahapravesam`

  const shareText = `✨ You are cordially invited to ${eventTitle}! 🌺\n📅 Date: ${invitation.formattedDate}\n📍 Venue: ${invitation.venue?.name}, ${invitation.venue?.city}\n\nPlease view our digital invitation card here: ${window.location.href}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  const handleWhatsAppShare = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`
    window.open(url, '_blank')
  }

  const handlePrint = () => {
    window.print()
  }

  // Generate QR code SVG or display QR
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(window.location.href)}&color=78350f`

  return (
    <>
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        {/* WhatsApp Quick Share Button */}
        <button
          onClick={handleWhatsAppShare}
          className="glass-card bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer border border-emerald-400"
          title="Share via WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
        </button>

        {/* Copy Link Button */}
        <button
          onClick={handleCopyLink}
          className="glass-card bg-amber-600 hover:bg-amber-700 text-white p-3 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer border border-amber-400"
          title="Copy Invitation Link"
        >
          {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
        </button>

        {/* QR Code / Share Hub Button */}
        <button
          onClick={() => setShowQr(true)}
          className="glass-card bg-stone-900 hover:bg-stone-800 text-amber-300 p-3 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer border border-amber-500/50"
          title="QR Code & Print"
        >
          <QrCode className="w-5 h-5" />
        </button>
      </div>

      {/* QR & Share Dialog Modal */}
      {showQr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="glass-card bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl border border-amber-300 relative">
            <button
              onClick={() => setShowQr(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-100 text-stone-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-stone-900 mb-1">
              Scan To View Invitation
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Scan this QR code with any smartphone camera to open this invitation directly.
            </p>

            <div className="p-3 bg-amber-50/80 border-2 border-dashed border-amber-300 rounded-xl inline-block mb-4">
              <img
                src={qrUrl}
                alt="Invitation QR Code"
                className="w-44 h-44 mx-auto rounded-lg"
              />
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={handlePrint}
                className="w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print or Save as PDF</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Link Copied!' : 'Copy Invitation Link'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
