'use client'

import { useEffect } from 'react'

interface AdSenseProps {
  adSlot: string
  adFormat?: 'auto' | 'fluid'
  style?: React.CSSProperties
  className?: string
  fullWidthResponsive?: boolean
}

export default function AdSense({ 
  adSlot, 
  adFormat = 'auto', 
  style, 
  className = '',
  fullWidthResponsive = true 
}: AdSenseProps) {
  useEffect(() => {
    try {
      // @ts-expect-error - Google AdSense types
      if (window.adsbygoogle) {
        // @ts-expect-error - Google AdSense push method
        window.adsbygoogle.push({})
      }
    } catch (error) {
      console.error('AdSense error:', error)
    }
  }, [])

  return (
    <div className={`ad-container ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-8085911050404684"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive}
      />
    </div>
  )
}

// Predefined ad units for common placements
export function HeaderAd() {
  return (
    <div className="w-full bg-gray-50 py-4">
      <div className="max-w-7xl mx-auto px-4">
        <AdSense 
          adSlot="9798354925"
          className="text-center"
        />
      </div>
    </div>
  )
}

export function SidebarAd() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <AdSense 
        adSlot="YOUR_SIDEBAR_AD_SLOT"
        className="text-center"
      />
    </div>
  )
}

export function FooterAd() {
  return (
    <div className="w-full bg-gray-50 py-4">
      <div className="max-w-7xl mx-auto px-4">
        <AdSense 
          adSlot="5117723947"
          className="text-center"
        />
      </div>
    </div>
  )
}

export function InContentAd() {
  return (
    <div className="my-8">
              <AdSense 
          adSlot="9274227850"
          className="text-center"
        />
    </div>
  )
}
