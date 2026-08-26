'use client'

import { useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    adsbygoogle?: unknown[]
    __adsScriptAppended?: boolean
  }
}

interface AdZoneProps {
  position: string
  size?: 'banner' | 'sidebar' | 'content' | 'leaderboard'
  adSlot?: string
}

export default function AdZone({ position, size = 'banner', adSlot }: AdZoneProps) {
  const adRef = useRef<HTMLModElement>(null)
  const [inView, setInView] = useState(false)
  const [ready, setReady] = useState(false)

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
    const el = adRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.25 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined' || ready) return
    let fired = false
    const onReady = () => {
      if (!fired) {
        fired = true
        setReady(true)
        window.removeEventListener('pointerdown', onReady)
        window.removeEventListener('keydown', onReady)
      }
    }
    const opts: AddEventListenerOptions = { passive: true }
    window.addEventListener('pointerdown', onReady, opts)
    window.addEventListener('keydown', onReady)
    return () => {
      window.removeEventListener('pointerdown', onReady)
      window.removeEventListener('keydown', onReady)
    }
  }, [ready])

  useEffect(() => {
    if (!inView || !ready) return
    if (process.env.NODE_ENV !== 'production' || typeof window === 'undefined' || typeof document === 'undefined') return

    const ensureAdSenseScript = () => {
      if (window.__adsScriptAppended) return
      const s = document.createElement('script')
      s.async = true
      s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8085911050404684'
      s.crossOrigin = 'anonymous'
      document.head.appendChild(s)
      window.__adsScriptAppended = true
    }

    try {
      ensureAdSenseScript()
      window.adsbygoogle = window.adsbygoogle || []
      window.adsbygoogle.push({})
    } catch (error) {
      console.error('Error loading AdSense ad:', error)
    }
  }, [inView, ready])

  const getAdStyles = () => {
    switch (size) {
      case 'banner':
        return 'w-full min-h-[90px]'
      case 'sidebar':
        return 'w-full min-h-[250px]'
      case 'content':
        return 'w-full min-h-[60px]'
      case 'leaderboard':
        return 'w-full min-h-[90px]'
      default:
        return 'w-full min-h-[90px]'
    }
  }

  const getAdSlotId = () => {
    const baseSlot = adSlot || `ad-${position}-${size}`
    return baseSlot.replace(/[^a-zA-Z0-9-]/g, '-')
  }

  if (process.env.NODE_ENV === 'development') {
    return (
      <div className="w-full px-4 my-8">
        <div className={`max-w-7xl mx-auto bg-slate-100/50 border-2 border-dashed border-slate-300 rounded-3xl flex items-center justify-center p-6 ${getAdStyles()}`}>
          <div className="text-center">
            <span className="inline-block px-3 py-1 bg-slate-200 text-slate-500 rounded-full text-xs font-bold uppercase tracking-wider mb-2">Advertisement</span>
            <p className="text-slate-600 font-extrabold text-sm">{position}</p>
            <p className="text-slate-400 font-medium text-xs mt-1">Slot: {resolvedSlot || getAdSlotId()}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!resolvedSlot) return null

  // Production Render
  return (
    <div className="w-full px-4 my-8 flex justify-center overflow-hidden">
      <div className={`bg-white rounded-3xl shadow-soft border-2 border-slate-100 p-2 overflow-hidden ${getAdStyles()}`}>
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', height: '100%' }}
          data-ad-client="ca-pub-8085911050404684"
          data-ad-slot={resolvedSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  )
}
