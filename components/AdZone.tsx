'use client'

import { useEffect, useRef } from 'react'

interface AdZoneProps {
  position: string
  size?: 'banner' | 'sidebar' | 'content' | 'leaderboard'
  adSlot?: string
}

export default function AdZone({ position, size = 'banner', adSlot }: AdZoneProps) {
  const adRef = useRef<HTMLModElement>(null)

  // Known positions mapped to NEXT_PUBLIC env var names for slot IDs
  const SLOT_ENV_MAP: Record<string, string> = {
    'header': 'NEXT_PUBLIC_ADSENSE_SLOT_HEADER',
    'hero-bottom': 'NEXT_PUBLIC_ADSENSE_SLOT_HERO_BOTTOM',
    'features-bottom': 'NEXT_PUBLIC_ADSENSE_SLOT_FEATURES_BOTTOM',
    'home-content': 'NEXT_PUBLIC_ADSENSE_SLOT_HOME_CONTENT',
    'footer': 'NEXT_PUBLIC_ADSENSE_SLOT_FOOTER',
    'practice-hero': 'NEXT_PUBLIC_ADSENSE_SLOT_PRACTICE_HERO',
    'practice-bottom': 'NEXT_PUBLIC_ADSENSE_SLOT_PRACTICE_BOTTOM',
    'results-header': 'NEXT_PUBLIC_ADSENSE_SLOT_RESULTS_HEADER',
    'results-bottom': 'NEXT_PUBLIC_ADSENSE_SLOT_RESULTS_BOTTOM',
    'blog-content': 'NEXT_PUBLIC_ADSENSE_SLOT_BLOG_CONTENT',
    'blog-bottom': 'NEXT_PUBLIC_ADSENSE_SLOT_BLOG_BOTTOM',
    'faq-content': 'NEXT_PUBLIC_ADSENSE_SLOT_FAQ_CONTENT',
    'faq-bottom': 'NEXT_PUBLIC_ADSENSE_SLOT_FAQ_BOTTOM',
    'about-content': 'NEXT_PUBLIC_ADSENSE_SLOT_ABOUT_CONTENT',
    'about-bottom': 'NEXT_PUBLIC_ADSENSE_SLOT_ABOUT_BOTTOM',
    'privacy-bottom': 'NEXT_PUBLIC_ADSENSE_SLOT_PRIVACY_BOTTOM',
    'study-guide': 'NEXT_PUBLIC_ADSENSE_SLOT_STUDY_GUIDE',
    'bottom': 'NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM',
  }

  const getEnvSlot = (pos: string): string | undefined => {
    const key = SLOT_ENV_MAP[pos]
    if (!key) return undefined
    return (process.env as Record<string, string | undefined>)[key]
  }

  const resolvedSlot = adSlot || getEnvSlot(position) || process.env.NEXT_PUBLIC_ADSENSE_DEFAULT_SLOT

  useEffect(() => {
    // Only load ads in production and when AdSense is available
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
      try {
        // Push the ad to AdSense
        const adsbygoogle = (window as { adsbygoogle?: unknown[] }).adsbygoogle || []
        adsbygoogle.push({})
      } catch (error) {
        console.error('Error loading AdSense ad:', error)
      }
    }
  }, [])

  const getAdStyles = () => {
    switch (size) {
      case 'banner':
        return 'w-full h-[90px]'
      case 'sidebar':
        return 'w-full h-[250px]'
      case 'content':
        return 'w-full h-[60px]'
      case 'leaderboard':
        return 'w-full h-[90px]'
      default:
        return 'w-full h-[90px]'
    }
  }

  const getAdSlotId = () => {
    // Generate unique ad slot IDs based on position and size
    const baseSlot = adSlot || `ad-${position}-${size}`
    return baseSlot.replace(/[^a-zA-Z0-9-]/g, '-')
  }

  // Don't render ads in development to avoid policy violations
  if (process.env.NODE_ENV === 'development') {
    return (
      <div className={`${getAdStyles()} my-4 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center`}>
        <div className="text-center">
          <p className="text-gray-500 text-sm font-medium">Ad Zone: {position}</p>
          <p className="text-gray-400 text-xs">Size: {size}</p>
          <p className="text-gray-400 text-xs">Slot: {resolvedSlot || getAdSlotId()}</p>
        </div>
      </div>
    )
  }

  // In production, ensure a valid numeric adSlot is provided; otherwise, don't render
  if (!resolvedSlot) {
    return null
  }

  // Production: Render actual AdSense ads
  return (
    <div className={`${getAdStyles()} my-4`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-8085911050404684"
        data-ad-slot={resolvedSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
