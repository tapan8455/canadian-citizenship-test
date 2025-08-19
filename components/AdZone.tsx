'use client'

import { useState, useEffect } from 'react'

interface AdZoneProps {
  position: string
  size?: 'banner' | 'sidebar' | 'content' | 'leaderboard'
}

export default function AdZone({ position, size = 'banner' }: AdZoneProps) {
  const [isAdLoaded, setIsAdLoaded] = useState(false)
  const [adError] = useState(false)

  useEffect(() => {
    // Simulate ad loading
    const timer = setTimeout(() => {
      setIsAdLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const getAdStyles = () => {
    switch (size) {
      case 'banner':
        return 'w-full h-90 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center'
      case 'sidebar':
        return 'w-full h-250 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center'
      case 'content':
        return 'w-full h-60 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center'
      case 'leaderboard':
        return 'w-full h-90 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center'
      default:
        return 'w-full h-90 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center'
    }
  }

  const getAdContent = () => {
    if (adError) {
      return (
        <div className="text-center">
          <p className="text-gray-500 text-sm">Ad temporarily unavailable</p>
        </div>
      )
    }

    if (!isAdLoaded) {
      return (
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-2"></div>
          <p className="text-gray-500 text-sm">Loading advertisement...</p>
        </div>
      )
    }

    return (
      <div className="text-center">
        <p className="text-gray-500 text-sm mb-2">Advertisement</p>
        <div className="bg-white rounded p-4 shadow-sm">
          <p className="text-gray-700 font-medium">Premium Study Materials</p>
          <p className="text-gray-500 text-xs mt-1">Get exclusive access to advanced practice tests</p>
          <button className="mt-2 bg-primary-600 text-white px-4 py-1 rounded text-xs hover:bg-primary-700 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    )
  }

  // Don't render ad zones in development
  if (process.env.NODE_ENV === 'development') {
    return (
      <div className={`${getAdStyles()} my-4`}>
        <div className="text-center">
          <p className="text-gray-500 text-sm font-medium">Ad Zone: {position}</p>
          <p className="text-gray-400 text-xs">Size: {size}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`${getAdStyles()} my-4`}>
      {getAdContent()}
    </div>
  )
}
