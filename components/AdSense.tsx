'use client'

import { useEffect } from 'react'

interface AdSenseProps {
  className?: string
  style?: React.CSSProperties
}

// Header Banner Ad
export function HeaderAd({ className, style }: AdSenseProps) {
  useEffect(() => {
    try {
      console.log('🔍 AdSense Debug: Checking for adsbygoogle...')
      // @ts-expect-error - Google AdSense types
      if (window.adsbygoogle) {
        console.log('✅ AdSense Debug: adsbygoogle found, pushing ad...')
        // @ts-expect-error - Google AdSense push method
        window.adsbygoogle.push({})
        console.log('✅ AdSense Debug: Ad pushed successfully')
      } else {
        console.log('❌ AdSense Debug: adsbygoogle not found')
      }
    } catch (error) {
      console.error('❌ AdSense error:', error)
    }
  }, [])

  return (
    <div className={`ad-container ${className || ''}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-8085911050404684"
        data-ad-slot="9798354925"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}

// Sidebar Ad
export function SidebarAd({ className, style }: AdSenseProps) {
  useEffect(() => {
    try {
      // @ts-expect-error - Google AdSense types
      if (window.adsbygoogle) {
        // @ts-expect-error - Google AdSense push method
        window.adsbygoogle.push({})
      }
    } catch (error) {
      console.error('❌ AdSense error:', error)
    }
  }, [])

  return (
    <div className={`ad-container ${className || ''}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-8085911050404684"
        data-ad-slot="9798354925"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}

// Footer Banner Ad
export function FooterAd({ className, style }: AdSenseProps) {
  useEffect(() => {
    try {
      // @ts-expect-error - Google AdSense types
      if (window.adsbygoogle) {
        // @ts-expect-error - Google AdSense push method
        window.adsbygoogle.push({})
      }
    } catch (error) {
      console.error('❌ AdSense error:', error)
    }
  }, [])

  return (
    <div className={`ad-container ${className || ''}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-8085911050404684"
        data-ad-slot="5117723947"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}

// In-Content Ad
export function InContentAd({ className, style }: AdSenseProps) {
  useEffect(() => {
    try {
      // @ts-expect-error - Google AdSense types
      if (window.adsbygoogle) {
        // @ts-expect-error - Google AdSense push method
        window.adsbygoogle.push({})
      }
    } catch (error) {
      console.error('❌ AdSense error:', error)
    }
  }, [])

  return (
    <div className={`ad-container ${className || ''}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-8085911050404684"
        data-ad-slot="9274227850"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}

// Sticky Sidebar Ad
export function StickySidebarAd({ className, style }: AdSenseProps) {
  useEffect(() => {
    try {
      // @ts-expect-error - Google AdSense types
      if (window.adsbygoogle) {
        // @ts-expect-error - Google AdSense push method
        window.adsbygoogle.push({})
      }
    } catch (error) {
      console.error('❌ AdSense error:', error)
    }
  }, [])

  return (
    <div className={`ad-container sticky top-4 ${className || ''}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-8085911050404684"
        data-ad-slot="9798354925"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}

// Article In-Content Ad
export function ArticleInContentAd({ className, style }: AdSenseProps) {
  useEffect(() => {
    try {
      // @ts-expect-error - Google AdSense types
      if (window.adsbygoogle) {
        // @ts-expect-error - Google AdSense push method
        window.adsbygoogle.push({})
      }
    } catch (error) {
      console.error('❌ AdSense error:', error)
    }
  }, [])

  return (
    <div className={`ad-container my-8 ${className || ''}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-8085911050404684"
        data-ad-slot="9274227850"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
