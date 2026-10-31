import React, { useState, useEffect } from 'react'
import { Clock, Calendar } from 'lucide-react'

export default function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false
  })

  useEffect(() => {
    const calculateTime = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime()

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((difference / 1000 / 60) % 60)
      const seconds = Math.floor((difference / 1000) % 60)

      setTimeLeft({ days, hours, minutes, seconds, isPast: false })
    }

    calculateTime()
    const timer = setInterval(calculateTime, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ]

  return (
    <div className="w-full max-w-xl mx-auto my-8">
      <div className="glass-card border border-amber-200/80 rounded-2xl p-6 sm:p-8 shadow-xl text-center relative overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-1/4 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center justify-center gap-2 mb-4 text-amber-800">
          <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
          <span className="font-cinzel text-xs font-bold tracking-[0.2em] uppercase text-amber-900">
            Countdown To The Auspicious Moment
          </span>
        </div>

        {timeLeft.isPast ? (
          <div className="py-4">
            <span className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-serif font-bold text-lg shadow-md">
              ✨ The Big Day Has Arrived! Welcome All! ✨
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {timeBlocks.map((block, idx) => (
              <div 
                key={idx}
                className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-gradient-to-b from-white to-amber-50/80 border border-amber-300/60 shadow-md group hover:border-amber-400 transition-colors"
              >
                <span className="font-serif text-2xl sm:text-4xl font-extrabold text-amber-900 leading-none group-hover:scale-105 transition-transform">
                  {String(block.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-stone-500 mt-1">
                  {block.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-amber-200/50 flex items-center justify-center gap-2 text-xs text-stone-600 font-medium">
          <Calendar className="w-3.5 h-3.5 text-amber-700" />
          <span>Mark your calendar & join us with family</span>
        </div>
      </div>
    </div>
  )
}
