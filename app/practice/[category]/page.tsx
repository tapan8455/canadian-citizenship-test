import { Metadata } from 'next'
import { Suspense } from 'react'
import PracticeCategoryClient from './PracticeCategoryClient'

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const categoryName = params.category.charAt(0).toUpperCase() + params.category.slice(1)
  
  return {
    title: `${categoryName} Practice Test - Canadian Citizenship`,
    description: `Free ${categoryName} practice questions for the Canadian citizenship test. Prepare with official format questions and detailed explanations.`,
    alternates: {
      canonical: `https://www.citizentestcanada.com/practice/${params.category}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default function PracticeCategoryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin"></div>
      </div>
    }>
      <PracticeCategoryClient />
    </Suspense>
  )
}