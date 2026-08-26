import { Metadata } from 'next'
import { Suspense } from 'react'
import PracticePageClient from './PracticePageClient'

export const metadata: Metadata = {
  title: 'Free Canadian Citizenship Practice Tests - 223+ Questions | CitizenTest Canada',
  description: 'Take free Canadian citizenship practice tests with 223+ official format questions. Practice by category: history, government, geography, rights. Pass your citizenship exam with confidence!',
  keywords: [
    'Canadian citizenship practice test',
    'citizenship test practice online',
    'Canada citizenship exam practice',
    'citizenship test questions',
    'Canadian citizenship study',
    'citizenship test preparation',
    'free citizenship practice'
  ],
  alternates: {
    canonical: 'https://www.citizentestcanada.com/practice',
  },
  openGraph: {
    title: 'Free Canadian Citizenship Practice Tests - 223+ Questions',
    description: 'Take free Canadian citizenship practice tests with 223+ official format questions. Practice by category and pass your exam!',
    url: 'https://www.citizentestcanada.com/practice',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PracticePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin"></div>
      </div>
    }>
      <PracticePageClient />
    </Suspense>
  )
}