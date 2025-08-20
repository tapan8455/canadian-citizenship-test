'use client'

import { useEffect, useRef } from 'react'

interface AdZoneProps {
  position: string
  size?: 'banner' | 'sidebar' | 'content' | 'leaderboard'
  adSlot?: string
}

export default function AdZone({ position, size = 'banner', adSlot }: AdZoneProps) {
  const adRef = useRef<HTMLModElement>(null)

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
        return 'w-full h-90'
      case 'sidebar':
        return 'w-full h-250'
      case 'content':
        return 'w-full h-60'
      case 'leaderboard':
        return 'w-full h-90'
      default:
        return 'w-full h-90'
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
          <p className="text-gray-400 text-xs">Slot: {getAdSlotId()}</p>
        </div>
      </div>
    )
  }

  // Production: Render actual AdSense ads
  return (
    <div className={`${getAdStyles()} my-4`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-8085911050404684"
        data-ad-slot={getAdSlotId()}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
