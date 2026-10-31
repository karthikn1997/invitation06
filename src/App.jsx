import React, { useState, useEffect } from 'react'
import { DEFAULT_INVITATION } from './data/defaultInvitation'
import HeroOpening from './components/HeroOpening'
import OurMomentsScroll from './components/OurMomentsScroll'
import MarriageDetailsSection from './components/MarriageDetailsSection'
import MandapamVenueSection from './components/MandapamVenueSection'
import WeddingScheduleSection from './components/WeddingScheduleSection'
import CountdownHandsSection from './components/CountdownHandsSection'
import AudioPlayer from './components/AudioPlayer'
import CountdownTimer from './components/CountdownTimer'
import EventTimeline from './components/EventTimeline'
import VenueMap from './components/VenueMap'
import RsvpForm from './components/RsvpForm'
import WishesWall from './components/WishesWall'
import ShareBar from './components/ShareBar'
import CustomizerModal from './components/CustomizerModal'
import WeddingTemplate from './components/templates/WeddingTemplate'
import BirthdayTemplate from './components/templates/BirthdayTemplate'
import HousewarmingTemplate from './components/templates/HousewarmingTemplate'
import { Sparkles, Sliders, Heart, RefreshCw } from 'lucide-react'

export default function App() {
  const [invitation, setInvitation] = useState(DEFAULT_INVITATION)
  const [wishes, setWishes] = useState(DEFAULT_INVITATION.initialWishes || [])
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Track scroll position: Only show floating audio and share buttons once user scrolls past moments into main invitation details
  useEffect(() => {
    const handleScroll = () => {
      const contentEl = document.getElementById('invitation-content')
      if (contentEl) {
        const rect = contentEl.getBoundingClientRect()
        setScrolled(rect.top < window.innerHeight * 0.8)
      } else {
        setScrolled(window.scrollY > window.innerHeight * 1.5)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle new RSVP / wish posted
  const handleAddWish = (newWish) => {
    setWishes(prev => [
      {
        id: Date.now(),
        ...newWish
      },
      ...prev
    ])
  }

  // Handle template switch from top navigation
  const handleSwitchTemplate = (tpl) => {
    setInvitation(prev => ({ ...prev, template: tpl }))
  }

  const getTargetDate = () => {
    if (invitation.template === 'birthday') {
      return invitation.birthdayDetails?.date || '2026-12-05T17:30:00'
    } else if (invitation.template === 'housewarming') {
      return invitation.housewarmingDetails?.date || '2026-11-15T06:00:00'
    }
    return invitation.eventDate || '2026-11-28T09:30:00'
  }

  const scrollToMoments = () => {
    const el = document.getElementById('moments-section') || document.getElementById('invitation-content')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/70 via-orange-50/40 to-amber-50/80 text-stone-800 relative selection:bg-amber-400 selection:text-amber-950 pb-20">
      
      {/* 1st OPENING: Choreographed Step-by-Step Hero Screen (NO BOX AROUND NAMES) */}
      <HeroOpening
        invitation={invitation}
        onScrollNext={scrollToMoments}
      />

      {/* 2nd SECTION: "Our Moments" Scroll-Driven Polaroid Cards Reveal */}
      <div id="moments-section" className="scroll-mt-0">
        <OurMomentsScroll invitation={invitation} />
      </div>

      {/* 3rd SECTION: Mandapam Pillar & Kuthuvilakku with Side Marriage Details */}
      {invitation.template === 'wedding' && (
        <MarriageDetailsSection invitation={invitation} />
      )}

      {/* 4th SECTION: Wedding Schedule / Functions Timeline (Alternating iPad Style) */}
      {invitation.template === 'wedding' && (
        <WeddingScheduleSection invitation={invitation} />
      )}

      {/* 5th SECTION: Wedding Day Countdown with Sacred Holding Hands */}
      {invitation.template === 'wedding' && (
        <CountdownHandsSection invitation={invitation} />
      )}

      {/* 6th SECTION: Mandapam Hall & Venue Details (Temple Town Landscape - Right Above RSVP) */}
      {invitation.template === 'wedding' && (
        <MandapamVenueSection invitation={invitation} />
      )}

      {/* Main Interactive Celebration Sections: RSVP Form & Wishes Wall */}
      <main id="invitation-content" className="max-w-4xl mx-auto px-4 pt-10 scroll-mt-6">
        {/* Render Selected Non-Wedding Templates if switched */}
        {invitation.template === 'birthday' && (
          <>
            <BirthdayTemplate invitation={invitation} />
            <CountdownTimer targetDate={getTargetDate()} />
            <VenueMap
              venue={invitation.venue}
              eventTitle={`${invitation.birthdayDetails?.celebrantName}'s Birthday Party`}
              eventDate={getTargetDate()}
              formattedDate={invitation.formattedDate}
            />
          </>
        )}
        {invitation.template === 'housewarming' && (
          <>
            <HousewarmingTemplate invitation={invitation} />
            <CountdownTimer targetDate={getTargetDate()} />
            <VenueMap
              venue={invitation.venue}
              eventTitle={`${invitation.housewarmingDetails?.homeName} Housewarming`}
              eventDate={getTargetDate()}
              formattedDate={invitation.formattedDate}
            />
          </>
        )}

        {/* Interactive WhatsApp RSVP Form */}
        <RsvpForm invitation={invitation} onNewWish={handleAddWish} />
      </main>

      {/* Always-Accessible Floating Audio Player with Auspicious Wedding Song */}
      <AudioPlayer />

      {/* Live Customizer Modal */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        invitation={invitation}
        onUpdateInvitation={(updated) => setInvitation(updated)}
      />

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-amber-200/60 text-center text-xs text-stone-500">
        <div className="flex items-center justify-center gap-1.5 text-amber-800 mb-2 font-serif font-bold text-sm">
          <Heart className="w-4 h-4 fill-amber-600 text-amber-600" />
          <span>With love & blessings from our families</span>
        </div>
        <p className="text-[11px] text-stone-500">
          Created with <span className="text-rose-500">♥</span> • Dr. Keerthana & Karthik Raja
        </p>
      </footer>
    </div>
  )
}
