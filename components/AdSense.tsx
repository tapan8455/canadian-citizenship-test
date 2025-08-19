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
      // @ts-ignore - Google AdSense types
      if (window.adsbygoogle) {
        // @ts-ignore
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
        data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
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
          adSlot="YOUR_HEADER_AD_SLOT"
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
          adSlot="YOUR_FOOTER_AD_SLOT"
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
        adSlot="YOUR_IN_CONTENT_AD_SLOT"
        className="text-center"
      />
    </div>
  )
}
