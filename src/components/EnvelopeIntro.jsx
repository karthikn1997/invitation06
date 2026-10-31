import React, { useState } from 'react'
import confetti from 'canvas-confetti'
import { Mail, Sparkles, Heart, ChevronDown } from 'lucide-react'

export default function EnvelopeIntro({ invitation, onOpen }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpening, setIsOpening] = useState(false)

  const handleOpenEnvelope = () => {
    setIsOpening(true)

    // Trigger golden celebratory confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#d97706', '#b45309', '#fbbf24', '#ffffff']
    })

    setTimeout(() => {
      setIsOpen(true)
      if (onOpen) onOpen()
    }, 900)
  }

  if (isOpen) return null

  const brideName = invitation.bride?.name || 'Bride'
  const groomName = invitation.groom?.name || 'Groom'
  const celebrantName = invitation.birthdayDetails?.celebrantName || 'Our Star'
  const houseName = invitation.housewarmingDetails?.homeName || 'Our New Home'

  let primaryTitle = `${brideName} & ${groomName}`
  let subText = "Together with their families request the honor of your presence"
  if (invitation.template === 'birthday') {
    primaryTitle = celebrantName
    subText = "Is turning one! Come join the grand birthday carnival"
  } else if (invitation.template === 'housewarming') {
    primaryTitle = houseName
    subText = "Heartily invites you to grace our Grahapravesam & Vaastu Pooja"
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/90 backdrop-blur-md transition-opacity duration-700 ${isOpening ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      {/* Background ambient lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className={`relative w-full max-w-lg transition-transform duration-700 ease-out ${isOpening ? 'scale-105' : 'scale-100'}`}>
        {/* Envelope Container */}
        <div className="relative bg-gradient-to-br from-amber-100 via-amber-50 to-orange-100 rounded-2xl shadow-2xl border-2 border-amber-300/80 p-8 sm:p-12 text-center overflow-hidden">
          {/* Subtle ornate border flourish */}
          <div className="absolute top-2 left-2 right-2 bottom-2 border border-amber-400/40 rounded-xl pointer-events-none"></div>
          <div className="absolute top-4 left-4 right-4 bottom-4 border border-dashed border-amber-400/30 rounded-lg pointer-events-none"></div>

          {/* Top header icons */}
          <div className="flex justify-center items-center gap-2 mb-4 text-amber-700">
            <Sparkles className="w-5 h-5 text-amber-500 animate-spin [animation-duration:10s]" />
            <span className="font-cinzel text-xs tracking-[0.25em] uppercase font-bold text-amber-800">
              Personal Invitation
            </span>
            <Sparkles className="w-5 h-5 text-amber-500 animate-spin [animation-duration:10s]" />
          </div>

          {/* Envelope Front Details */}
          <div className="my-6 space-y-3">
            <p className="text-stone-500 text-xs tracking-wider uppercase font-medium">
              You Are Cordially Invited
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl text-stone-800 font-bold tracking-tight">
              {primaryTitle}
            </h1>
            <p className="text-amber-800 font-script text-2xl sm:text-3xl">
              Save The Date
            </p>
            <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto leading-relaxed pt-1">
              {subText}
            </p>
            <div className="inline-block px-4 py-1.5 bg-amber-200/60 rounded-full text-xs font-semibold text-amber-900 mt-2">
              📅 {invitation.formattedDate}
            </div>
          </div>

          {/* Wax Seal Stamp Button */}
          <div className="pt-4 flex flex-col items-center">
            <button
              onClick={handleOpenEnvelope}
              className="group relative cursor-pointer focus:outline-none transition-transform hover:scale-105 active:scale-95"
              aria-label="Open Invitation"
            >
              {/* Wax Seal Circle with Glow */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-red-700 via-red-800 to-amber-950 text-amber-100 flex flex-col items-center justify-center shadow-2xl seal-glow border-4 border-amber-400/60 relative">
                <Heart className="w-6 h-6 text-amber-200 fill-amber-300/40 group-hover:scale-110 transition-transform mb-1" />
                <span className="font-cinzel text-[10px] sm:text-xs font-black tracking-widest text-amber-200 uppercase">
                  OPEN
                </span>
                <span className="text-[9px] text-amber-300/80 -mt-0.5">
                  శుభం
                </span>
              </div>
            </button>
            <p className="text-xs font-medium text-amber-900/80 mt-4 animate-bounce flex items-center gap-1">
              Tap the seal to open invitation <ChevronDown className="w-3.5 h-3.5 inline" />
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
