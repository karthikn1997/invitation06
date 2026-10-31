import React, { useState, useRef, useEffect } from 'react'
import { Sparkles, ChevronDown } from 'lucide-react'

export default function OurMomentsScroll({ invitation }) {
  // -1 = only background & header visible (no card yet)
  // 0  = 1st card (Bride) slides up from bottom automatically
  // 1  = 2nd card (Groom) slides up from bottom
  // 2  = 3rd card (Couple) slides up from bottom
  const [activeCard, setActiveCard] = useState(-1)
  const activeCardRef = useRef(-1)
  const card3ArrivedAtRef = useRef(0)
  const [canProceed, setCanProceed] = useState(false)
  const sectionRef = useRef(null)

  // Keep ref synchronized with state
  useEffect(() => {
    activeCardRef.current = activeCard
    if (activeCard === 2) {
      card3ArrivedAtRef.current = Date.now()
      // Give a mandatory 1.2s minimum viewing window before allowing scroll to next section
      const timer = setTimeout(() => {
        setCanProceed(true)
      }, 1200)
      return () => clearTimeout(timer)
    } else {
      setCanProceed(false)
    }
  }, [activeCard])

  // Automatically trigger 1st card sliding up when section enters view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setActiveCard((prev) => (prev === -1 ? 0 : prev))
            }, 450)
          }
        })
      },
      { threshold: 0.35 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const brideName = invitation?.bride?.name || 'Dr. Keerthana'
  const groomName = invitation?.groom?.name || 'Karthik Raja'

  const moments = [
    {
      id: 1,
      title: 'The Bride',
      name: brideName,
      role: 'Bride',
      quote: '“Every love story is beautiful, but ours is my favorite.”',
      photo: '/images/moment-bride.jpg',
      rotation: '-rotate-2'
    },
    {
      id: 2,
      title: 'The Groom',
      name: groomName,
      role: 'Groom',
      quote: '“In your arms, I have found my forever home.”',
      photo: '/images/moment-groom.jpg',
      rotation: 'rotate-2'
    },
    {
      id: 3,
      title: 'Together Forever',
      name: `${brideName} & ${groomName}`,
      role: 'The Happy Couple',
      quote: '“Two souls with but a single thought, two hearts that beat as one.”',
      photo: '/images/moment-couple.jpg',
      rotation: 'rotate-0'
    }
  ]

  // Robust Non-Passive Scroll & Touch Handling:
  // PREVENTS fast scroll from accidentally skipping past Card 3 to the next section!
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    let startY = 0
    let isMoving = false

    const onTouchStart = (e) => {
      startY = e.touches[0].clientY
      isMoving = false
    }

    const onTouchMove = (e) => {
      const currentY = e.touches[0].clientY
      const diff = startY - currentY

      // Swiping UP (scrolling down to next card)
      if (diff > 25) {
        if (activeCardRef.current < 2) {
          // Strictly lock page in this section
          if (e.cancelable) e.preventDefault()
          if (!isMoving) {
            isMoving = true
            startY = currentY
            setActiveCard((prev) => Math.min(prev + 1, 2))
            setTimeout(() => {
              isMoving = false
            }, 650)
          }
        } else {
          // At Card 3: Check if Card 3 has settled for at least 1000ms
          const timeAtCard3 = Date.now() - card3ArrivedAtRef.current
          if (timeAtCard3 < 1000) {
            // Still locked! Fast fling/momentum CANNOT skip to next section
            if (e.cancelable) e.preventDefault()
          }
          // After 1000ms, natural page scroll is permitted
        }
      }
      // Swiping DOWN (scrolling up to previous card)
      else if (diff < -25) {
        if (activeCardRef.current > 0) {
          if (e.cancelable) e.preventDefault()
          if (!isMoving) {
            isMoving = true
            startY = currentY
            setActiveCard((prev) => Math.max(prev - 1, 0))
            setTimeout(() => {
              isMoving = false
            }, 650)
          }
        }
      }
    }

    const onWheel = (e) => {
      if (isMoving) {
        if (e.cancelable) e.preventDefault()
        return
      }

      // Scrolling Down
      if (e.deltaY > 20) {
        if (activeCardRef.current < 2) {
          if (e.cancelable) e.preventDefault()
          isMoving = true
          setActiveCard((prev) => Math.min(prev + 1, 2))
          setTimeout(() => {
            isMoving = false
          }, 700)
        } else {
          // At Card 3: Lock for at least 1000ms so fast wheel spin does not fly away
          const timeAtCard3 = Date.now() - card3ArrivedAtRef.current
          if (timeAtCard3 < 1000) {
            if (e.cancelable) e.preventDefault()
          }
        }
      }
      // Scrolling Up
      else if (e.deltaY < -20) {
        if (activeCardRef.current > 0) {
          if (e.cancelable) e.preventDefault()
          isMoving = true
          setActiveCard((prev) => Math.max(prev - 1, 0))
          setTimeout(() => {
            isMoving = false
          }, 700)
        }
      }
    }

    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('wheel', onWheel)
    }
  }, [])

  const scrollToNextSection = () => {
    const el = document.getElementById('marriage-details-section') || document.getElementById('invitation-content')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleCardClick = () => {
    if (activeCard < 2) {
      setActiveCard((prev) => Math.min(prev + 1, 2))
    } else {
      scrollToNextSection()
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100dvh] min-h-[100dvh] flex flex-col justify-between items-center overflow-hidden bg-[#faf2de] py-5 sm:py-6 px-4 select-none"
    >
      {/* Background Layer: Sandalwood Parchment + Garlands + Banana Leaves + Border */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Base sandal parchment gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fffef8] via-[#fbf3e0] to-[#f6e7c7]"></div>
        
        {/* Side golden watercolor washes */}
        <div className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-amber-300/35 via-amber-200/15 to-transparent"></div>
        <div className="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-l from-amber-300/35 via-amber-200/15 to-transparent"></div>
        
        {/* Soft watercolor ambient blooms */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-amber-400/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl"></div>


        {/* Traditional Royal Golden Border Frame */}
        <div className="absolute inset-2 sm:inset-3 border border-amber-700/20 rounded-2xl pointer-events-none"></div>
        <div className="absolute inset-3 sm:inset-4 border border-amber-500/15 rounded-xl pointer-events-none"></div>
      </div>

      {/* Header: Celebrating the Moments / OUR MOMENTS */}
      <div className="relative z-20 text-center pt-3 sm:pt-5 px-4 shrink-0">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/85 border border-amber-300/70 shadow-2xs mb-1 backdrop-blur-xs">
          <Sparkles className="w-3 h-3 text-amber-700 animate-pulse" />
          <span className="font-cinzel text-[9.5px] sm:text-[10px] font-black tracking-[0.22em] text-amber-950 uppercase">
            Cherished Memories
          </span>
          <Sparkles className="w-3 h-3 text-amber-700 animate-pulse" />
        </div>

        <p className="font-script text-2xl sm:text-3xl text-amber-900 leading-tight">
          Celebrating the Moments
        </p>
        
        <div className="flex items-center justify-center gap-2 my-0.5">
          <span className="w-8 h-[1px] bg-amber-600/40"></span>
          <h2 className="font-cinzel text-lg sm:text-xl font-black tracking-[0.25em] text-amber-950 uppercase">
            Our Moments
          </h2>
          <span className="w-8 h-[1px] bg-amber-600/40"></span>
        </div>

        <div className="flex justify-center items-center gap-1.5 text-amber-800 text-xs mt-0.5 min-h-[20px]">
          {activeCard >= 0 && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100/80 border border-amber-300/50 shadow-2xs">
              <span className="text-[10px] font-serif font-bold text-amber-950">
                {activeCard === 0 ? '✨ 1 of 3: The Bride' : activeCard === 1 ? '✨ 2 of 3: The Groom' : '💖 3 of 3: Together Forever'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Center Polaroid Cards Deck (Stacked Reveal - Enlarged & Enhanced) */}
      <div 
        onClick={handleCardClick}
        className="relative z-20 w-full max-w-[330px] sm:max-w-[370px] h-[410px] sm:h-[450px] flex items-center justify-center my-auto cursor-pointer"
        title={activeCard < 2 ? "Tap for next photo" : "Tap for marriage details"}
      >
        {moments.map((item, index) => {
          const isVisible = activeCard >= 0 && index <= activeCard
          const isCurrent = index === activeCard

          return (
            <div
              key={item.id}
              className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ease-out ${
                isVisible
                  ? 'translate-y-0 opacity-100 pointer-events-auto'
                  : 'translate-y-[130%] opacity-0 pointer-events-none'
              }`}
              style={{
                zIndex: 10 + index,
                transform: isVisible
                  ? isCurrent
                    ? `translateY(0px) rotate(${index === 0 ? '-2deg' : index === 1 ? '2deg' : '0deg'}) scale(1)`
                    : `translateY(-14px) rotate(${index === 0 ? '-4deg' : '3deg'}) scale(0.96)`
                  : 'translateY(130%) scale(0.85)'
              }}
            >
              {/* Polaroid Photo Frame */}
              <div className="bg-white p-3 sm:p-3.5 pb-4 sm:pb-5 rounded-xl shadow-[0_15px_35px_rgba(180,83,9,0.18)] border border-amber-200/90 w-full max-w-[295px] sm:max-w-[335px] mx-auto text-center transition-transform hover:scale-[1.02] relative">
                
                {/* Washi Gold Tape Effect at top */}
                <div className="w-16 h-3.5 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 border border-amber-400/60 shadow-2xs -mt-5 mb-2 mx-auto rounded-xs rotate-[-1deg] opacity-90"></div>

                {/* Photo */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-stone-100 shadow-inner border border-stone-200/60">
                  <img
                    src={item.photo}
                    alt={item.title}
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />
                  <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-black/70 text-amber-200 text-[9.5px] font-cinzel font-bold tracking-wider backdrop-blur-xs border border-amber-300/40 shadow-xs">
                    {item.role}
                  </div>
                </div>

                {/* Caption Area */}
                <div className="pt-2.5 px-1 text-center">
                  <h3 className="font-serif text-base sm:text-lg font-black text-amber-950 leading-tight">
                    {item.name}
                  </h3>
                  <p className="font-script text-amber-800 text-sm sm:text-base italic mt-0.5 leading-snug">
                    {item.quote}
                  </p>
                </div>

              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom Action Area: Only show button on last card */}
      <div className="relative z-20 pb-4 sm:pb-5 h-10 shrink-0 flex items-center justify-center">
        {activeCard >= 2 && (
          <button
            onClick={scrollToNextSection}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white text-[10.5px] font-cinzel font-black tracking-wider shadow-md transition-all active:scale-95 animate-bounce border border-amber-400/50 cursor-pointer"
          >
            <span>Marriage Details</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

    </section>
  )
}
