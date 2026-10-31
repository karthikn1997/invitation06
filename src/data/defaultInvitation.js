export const DEFAULT_INVITATION = {
  template: 'wedding', // 'wedding' | 'birthday' | 'housewarming'
  themeColor: 'royal-gold', // 'royal-gold' | 'rose-romance' | 'emerald-luxury' | 'sapphire-night'
  
  // Wedding Specifics
  bride: {
    name: 'Dr. Keerthana',
    title: 'Bride',
    subtitle: 'Daughter of Mrs. Lakshmi & Mr. Sundaram',
    photo: '/images/moment-bride.jpg',
    bio: 'Radiant, compassionate, and passionate about music and healing.'
  },
  groom: {
    name: 'Karthik Raja',
    title: 'Groom',
    subtitle: 'Son of Mrs. Shanthi & Mr. Rajasekaran',
    photo: '/images/moment-groom.jpg',
    bio: 'Adventurous spirit, tech enthusiast, and lover of traditional melodies.'
  },
  coupleTagline: 'Two souls, one destiny',

  // General Event Details
  eventTitle: 'Wedding Celebration',
  blessingTagline: 'With the divine blessings of Lord Venkateswara and our beloved elders',
  quote: '“Where there is love, there is life. We request the pleasure of your gracious company as we step into our forever.”',
  
  // Dates
  eventDate: '2026-11-07T09:30:00',
  formattedDate: 'Friday, 7th November 2026',
  auspiciousMuhurtham: 'Dhanur Lagnam (9:00 AM - 10:30 AM)',
  
  // Venue Details
  venue: {
    name: 'Sri Krishna Grand Palace Convention Centre',
    address: 'No. 45, Royal Enclave, Gandhi Road, Anna Nagar',
    city: 'Chennai, Tamil Nadu - 600040',
    landmark: 'Opposite Metro Station Pillar #142',
    mapLink: 'https://maps.google.com/?q=Chennai+Convention+Center',
    phone: '+91 98401 23456'
  },

  // Event Schedule Timeline
  schedule: [
    {
      id: 'sch-1',
      title: 'Nichayathartham & Sangeet',
      time: 'Friday, 27 Nov - 6:00 PM onwards',
      venue: 'Emerald Banquet Hall, 1st Floor',
      description: 'Exchange of rings, musical performances, joyful dances & dinner feast.',
      tag: 'Celebration'
    },
    {
      id: 'sch-2',
      title: 'Mangala Snanam & Kasi Yatra',
      time: 'Saturday, 28 Nov - 6:30 AM to 8:00 AM',
      venue: 'Main Temple Courtyard',
      description: 'Auspicious pre-wedding rituals with close family and nadaswaram recital.',
      tag: 'Sacred Ritual'
    },
    {
      id: 'sch-3',
      title: 'Subha Muhurtham',
      time: 'Saturday, 28 Nov - 9:00 AM to 10:30 AM',
      venue: 'Sri Krishna Grand Palace - Mandapam',
      description: 'Tying of the Sacred Mangalsutra followed by traditional South Indian Sadhya.',
      tag: 'Main Event'
    },
    {
      id: 'sch-4',
      title: 'Grand Reception & Live Melodies',
      time: 'Saturday, 28 Nov - 6:30 PM to 10:30 PM',
      venue: 'Royal Lawn & Air-Conditioned Hall',
      description: 'Cocktail mocktails, photo sessions with the newlyweds, and gala dinner.',
      tag: 'Reception'
    }
  ],

  // Birthday Details (when template is 'birthday')
  birthdayDetails: {
    celebrantName: 'Aarav Sharma',
    milestone: 'Turning 1 Year Old!',
    subtitle: 'Little Prince’s First Birthday Carnival',
    date: '2026-12-05T17:30:00',
    formattedDate: 'Saturday, 5th December 2026 at 5:30 PM',
    theme: 'Little Jungle Safari Adventure 🦁🎈',
    parents: 'Proud Parents: Priya & Varun Sharma',
    photo: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80'
  },

  // Housewarming Details (when template is 'housewarming')
  housewarmingDetails: {
    familyName: 'The Natarajan Family',
    homeName: '“Ananda Nilayam” (Abode of Joy)',
    subtitle: 'Grahapravesam & Vaastu Pooja Invitation',
    date: '2026-11-15T06:00:00',
    formattedDate: 'Sunday, 15th November 2026',
    muhurthamTime: 'Auspicious Cow Pooja & Milk Boiling: 6:00 AM - 7:30 AM',
    hosts: 'Deepa & R. Natarajan with family',
    photo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'
  },

  // Photo Gallery
  gallery: [
    {
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
      caption: 'The Beginning of Forever'
    },
    {
      url: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=600&q=80',
      caption: 'Together, Always'
    },
    {
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
      caption: 'Laughter & Love'
    },
    {
      url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=600&q=80',
      caption: 'A Celebration of Souls'
    }
  ],

  // Initial Wishes / Guestbook Messages
  initialWishes: [
    {
      id: 1,
      sender: 'Suresh & Preethi Family',
      relation: 'Cousins',
      message: 'Heartiest congratulations to Keerthana and Karthik! May your married life be blessed with endless happiness, health and prosperities! 🎉❤️',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      sender: 'Dr. Anand Kumar',
      relation: 'Colleague',
      message: 'So thrilled for you both! Looking forward to celebrating this grand day in Chennai! 💐',
      timestamp: 'Yesterday'
    },
    {
      id: 3,
      sender: 'Vijay & Divya',
      relation: 'Best Friends',
      message: 'Can’t wait to rock the Sangeet dance floor! Wishing you both a lifetime of togetherness and fun! 🕺💃',
      timestamp: '2 days ago'
    }
  ]
}
