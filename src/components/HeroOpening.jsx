import React, { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import { ChevronDown, Sparkles, Heart, RotateCcw } from 'lucide-react'

export default function HeroOpening({ invitation, onScrollNext }) {
  const brideName = invitation.bride?.name || 'Dr. Keerthana'
  const groomName = invitation.groom?.name || 'Karthik Raja'
  const eventDateFormatted = invitation.formattedDate || 'Friday, 7th November 2026'

  // Parse date components for luxury display (NOV | 07 | 2026 / FRIDAY)
  const dateObj = new Date(invitation.eventDate || '2026-11-07T09:30:00')
  const isValidDate = !isNaN(dateObj.getTime())
  const monthStr = isValidDate ? dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase() : 'NOV'
  const dayStr = isValidDate ? String(dateObj.getDate()).padStart(2, '0') : '07'
  const yearStr = isValidDate ? String(dateObj.getFullYear()) : '2026'
  const dayOfWeek = isValidDate ? dateObj.toLocaleString('en-US', { weekday: 'long' }).toUpperCase() : 'FRIDAY'

  // Major stages: 0 = start, 1 = garlands, 2 = leaves, 3 = couple
  const [animStep, setAnimStep] = useState(0)
  // Line-by-line text steps:
  // 1 = Save The Date
  // 2 = Bride Name
  // 3 = Ampersand (&)
  // 4 = Groom Name
  // 5 = Are Getting Married
  // 6 = Date Badge
  // 7 = Open Full Invitation CTA
  const [textStep, setTextStep] = useState(0)

  const [petals, setPetals] = useState([])

  // Orchestrate step-by-step animation sequence
  const startSequence = () => {
    setAnimStep(0)
    setTextStep(0)

    const timers = []

    // 1. Garlands drop down (300ms)
    timers.push(setTimeout(() => setAnimStep(1), 300))

    // 2. Banana leaves rise (1000ms)
    timers.push(setTimeout(() => setAnimStep(2), 1000))

    // 3. Couple feet & wedding attire slides in (1800ms)
    timers.push(setTimeout(() => setAnimStep(3), 1800))

    // 4. Line 1: SAVE THE DATE (2600ms)
    timers.push(setTimeout(() => setTextStep(1), 2600))

    // 5. Line 2: Bride Name (3200ms)
    timers.push(setTimeout(() => setTextStep(2), 3200))

    // 6. Line 3: Ampersand & (3700ms)
    timers.push(setTimeout(() => setTextStep(3), 3700))

    // 7. Line 4: Groom Name (4200ms)
    timers.push(setTimeout(() => setTextStep(4), 4200))

    // 8. Line 5: ARE GETTING MARRIED (4800ms)
    timers.push(setTimeout(() => setTextStep(5), 4800))

    // 9. Line 6: Date Badge + Confetti (5400ms)
    timers.push(setTimeout(() => {
      setTextStep(6)
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.55 },
        colors: ['#f59e0b', '#d97706', '#fb7185', '#e11d48', '#fbbf24']
      })
    }, 5400))

    // 10. Line 7: Open Full Invitation Button (6000ms)
    timers.push(setTimeout(() => setTextStep(7), 6000))

    return () => {
      timers.forEach(t => clearTimeout(t))
    }
  }

  useEffect(() => {
    const cleanup = startSequence()

    // Floating flower petals
    const generatedPetals = Array.from({ length: 14 }).map((_, index) => ({
      id: index,
      left: `${(index * 7.5 + Math.random() * 4) % 94}%`,
      delay: `${(index * 0.7).toFixed(1)}s`,
      duration: `${6 + (index % 3) * 2}s`,
      size: `${12 + (index % 3) * 5}px`,
      color: index % 2 === 0 ? '#f59e0b' : '#fb7185'
    }))
    setPetals(generatedPetals)

    return cleanup
  }, [])

  const handleScrollClick = () => {
    // Start auspicious background music on opening invitation gesture
    window.dispatchEvent(new CustomEvent('play-wedding-music'))

    if (onScrollNext) {
      onScrollNext()
    } else {
      const nextSection = document.getElementById('invitation-content')
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <section className="relative w-full h-[100dvh] min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#241710] select-none">
      
      {/* Background ambient lighting for desktop */}
      <div className="absolute inset-0 bg-radial from-amber-900/40 via-stone-950/70 to-black -z-10 hidden sm:block"></div>

      {/* Main Invitation Stage */}
      <div className="relative w-full h-[100dvh] sm:h-[96vh] sm:max-w-[480px] sm:rounded-3xl sm:border-4 sm:border-amber-400/90 sm:shadow-2xl overflow-hidden flex flex-col justify-between bg-[#fbf3dc]">
        
        {/* Layer 0: Warm parchment background texture */}
        <div className="absolute inset-0 w-full h-full z-0 bg-[#fbf3dc]">
          <img
            src="/images/layer-bg.png"
            alt="Parchment Texture"
            className="w-full h-full object-cover opacity-90"
          />
        </div>

        {/* Layer 1: Left & Right Hanging Marigold Garlands (Step 1) */}
        {animStep >= 1 && (
          <>
            <img
              src="/images/layer-garland-left.png"
              alt="Left Marigold Garland"
              className="absolute left-0 top-0 w-[16%] max-w-[78px] h-auto object-contain z-10 animate-garland-left pointer-events-none drop-shadow-sm"
            />
            <img
              src="/images/layer-garland-right.png"
              alt="Right Marigold Garland"
              className="absolute right-0 top-0 w-[16%] max-w-[78px] h-auto object-contain z-10 animate-garland-right pointer-events-none drop-shadow-sm"
            />
          </>
        )}

        {/* Layer 2: Bottom Banana Leaves & Golden Kolam (Step 2) */}
        {animStep >= 2 && (
          <>
            <img
              src="/images/layer-leaf-left.png"
              alt="Left Banana Leaf"
              className="absolute left-0 bottom-0 w-[30%] max-w-[155px] h-auto object-contain z-10 animate-leaf-left pointer-events-none drop-shadow-md"
            />
            <img
              src="/images/layer-leaf-right.png"
              alt="Right Banana Leaf"
              className="absolute right-0 bottom-0 w-[30%] max-w-[155px] h-auto object-contain z-10 animate-leaf-right pointer-events-none drop-shadow-md"
            />
          </>
        )}

        {/* Layer 3: Sacred Wedding Couple in Dhoti & Green Zari Saree (Step 3) */}
        {animStep >= 3 && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-[390px] z-15 animate-couple-enter pointer-events-none">
            <img
              src="/images/layer-couple.png"
              alt="Wedding Couple"
              className="w-full h-auto object-contain drop-shadow-md"
            />
          </div>
        )}

        {/* Floating petals over the stage */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
          {petals.map((p) => (
            <div
              key={p.id}
              className="petal-particle drop-shadow-xs"
              style={{
                left: p.left,
                animationDelay: p.delay,
                animationDuration: p.duration,
                fontSize: p.size,
                color: p.color
              }}
            >
              🌸
            </div>
          ))}
        </div>

        {/* Top bar with Replay Button */}
        <div className="relative z-30 pt-3.5 px-4 flex justify-end items-center shrink-0">
          <button
            onClick={startSequence}
            className="p-1.5 rounded-full bg-amber-100/70 hover:bg-amber-200/90 text-amber-900 shadow-xs cursor-pointer transition-transform hover:rotate-180 duration-500 border border-amber-300/40"
            title="Replay Entrance Animation"
            aria-label="Replay animation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Top spacer to ensure clear separation from the couple feet */}
        <div className="relative z-10 h-28 sm:h-36 shrink-0 pointer-events-none"></div>

        {/* Layer 4: CINEMATIC LINE-BY-LINE TYPOGRAPHY (NO BOX) */}
        <div className="relative z-25 px-5 my-auto text-center w-full max-w-sm mx-auto flex flex-col items-center justify-center min-h-[200px]">
          
          {/* LINE 1: SAVE THE DATE */}
          {textStep >= 1 && (
            <div className="animate-line-reveal flex items-center justify-center gap-2 mb-2">
              <span className="w-6 sm:w-10 h-[1.5px] bg-amber-700/60"></span>
              <Sparkles className="w-3.5 h-3.5 text-amber-700 animate-spin [animation-duration:8s]" />
              <span className="font-cinzel text-xs sm:text-sm font-black tracking-[0.26em] text-amber-950 uppercase drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">
                Save The Date
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-700 animate-spin [animation-duration:8s]" />
              <span className="w-6 sm:w-10 h-[1.5px] bg-amber-700/60"></span>
            </div>
          )}

          {/* LINE 2: BRIDE NAME (Dr. Keerthana) */}
          {textStep >= 2 && (
            <div className="animate-line-reveal my-1">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-amber-950 tracking-tight leading-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
                {brideName}
              </h1>
            </div>
          )}

          {/* LINE 3: AMPERSAND (&) */}
          {textStep >= 3 && (
            <div className="animate-line-reveal flex items-center justify-center gap-2.5 my-0.5">
              <span className="w-8 h-[1px] bg-amber-600/50"></span>
              <span className="font-script text-3xl sm:text-4xl text-amber-800 italic drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                &
              </span>
              <span className="w-8 h-[1px] bg-amber-600/50"></span>
            </div>
          )}

          {/* LINE 4: GROOM NAME (Karthik Raja) */}
          {textStep >= 4 && (
            <div className="animate-line-reveal my-1">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-amber-950 tracking-tight leading-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
                {groomName}
              </h1>
            </div>
          )}

          {/* LINE 5: ARE GETTING MARRIED */}
          {textStep >= 5 && (
            <div className="animate-line-reveal my-1.5">
              <p className="font-cinzel text-[11px] sm:text-xs tracking-[0.28em] text-amber-900 font-extrabold uppercase drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">
                are getting married
              </p>
            </div>
          )}

          {/* LINE 6: LUXURY DATE DISPLAY (FRIDAY / NOV | 07 | 2026) */}
          {textStep >= 6 && (
            <div className="animate-line-reveal mt-3 flex flex-col items-center">
              {/* Day of Week */}
              <div className="flex items-center gap-2 mb-1">
                <span className="w-6 h-[1px] bg-amber-800/40"></span>
                <span className="font-cinzel text-[11px] sm:text-xs font-black tracking-[0.3em] uppercase text-amber-900 drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">
                  {dayOfWeek}
                </span>
                <span className="w-6 h-[1px] bg-amber-800/40"></span>
              </div>

              {/* NOV | 07 | 2026 */}
              <div className="flex items-center justify-center gap-3.5 py-1 px-5 border-y border-amber-800/40 text-amber-950">
                <span className="font-cinzel text-xs sm:text-sm font-black tracking-widest text-amber-900 uppercase drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">
                  {monthStr}
                </span>
                <span className="text-amber-800/60 font-light text-base select-none">|</span>
                <span className="text-2xl sm:text-3xl font-black font-serif text-amber-950 tracking-tight leading-none px-1 drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
                  {dayStr}
                </span>
                <span className="text-amber-800/60 font-light text-base select-none">|</span>
                <span className="font-cinzel text-xs sm:text-sm font-black tracking-widest text-amber-900 drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">
                  {yearStr}
                </span>
              </div>
            </div>
          )}

        </div>

        {/* LINE 7: BOTTOM CTA BUTTON */}
        <div className="relative z-30 pb-7 sm:pb-9 text-center shrink-0 min-h-[48px]">
          {textStep >= 7 && (
            <div className="animate-line-reveal">
              <button
                onClick={handleScrollClick}
                className="group cursor-pointer inline-flex flex-col items-center gap-0.5 bg-gradient-to-r from-amber-800 to-amber-950 hover:from-amber-900 hover:to-black text-amber-100 hover:text-white px-5 py-2 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 border-2 border-amber-400/70"
                aria-label="Open Full Invitation"
              >
                <span className="text-[11px] font-cinzel font-bold tracking-wider uppercase flex items-center gap-1.5">
                  Open Full Invitation <Heart className="w-3 h-3 fill-rose-400 text-rose-400" />
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-amber-300 group-hover:translate-y-1 transition-transform animate-bounce" />
              </button>
            </div>
          )}
        </div>

      </div>

    </section>
  )
}
