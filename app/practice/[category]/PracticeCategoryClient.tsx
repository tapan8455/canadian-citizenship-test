'use client'

import Link from 'next/link'
import { useState, Suspense } from 'react'
import { BookOpenIcon, ClockIcon, StarIcon, TrophyIcon, ShieldCheckIcon, GlobeAmericasIcon, BuildingLibraryIcon } from '@heroicons/react/24/solid'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdZone from '@/components/AdZone'
import ProvinceSelector from '@/components/ProvinceSelector'
import LoadingSpinner from '@/components/LoadingSpinner'

const testCategories = [
  {
    id: 'general',
    title: 'General Knowledge',
    description: 'Mixed questions covering all citizenship test topics',
    questions: 20,
    timeLimit: 45,
    difficulty: 'Mixed',
    icon: BookOpenIcon,
    color: 'bg-blue-500',
    borderColor: 'border-blue-600',
  },
  {
    id: 'history',
    title: 'Canadian History',
    description: 'Focus on important historical events and figures',
    questions: 20,
    timeLimit: 45,
    difficulty: 'Focused',
    icon: BuildingLibraryIcon,
    color: 'bg-emerald-500',
    borderColor: 'border-emerald-600',
  },
  {
    id: 'government',
    title: 'Government & Politics',
    description: 'Elections, government structure, and political systems',
    questions: 20,
    timeLimit: 45,
    difficulty: 'Focused',
    icon: ShieldCheckIcon,
    color: 'bg-purple-500',
    borderColor: 'border-purple-600',
  },
  {
    id: 'geography',
    title: 'Geography & Symbols',
    description: 'Provinces, territories, and national symbols',
    questions: 20,
    timeLimit: 45,
    difficulty: 'Focused',
    icon: GlobeAmericasIcon,
    color: 'bg-rose-500',
    borderColor: 'border-rose-600',
  },
  {
    id: 'rights',
    title: 'Rights & Responsibilities',
    description: 'Charter of rights, freedoms, and civic duties',
    questions: 20,
    timeLimit: 45,
    difficulty: 'Focused',
    icon: StarIcon,
    color: 'bg-amber-500',
    borderColor: 'border-amber-600',
  },
  {
    id: 'full',
    title: 'Official Practice Test',
    description: 'Exact simulation of the actual test - 20 questions, 45 mins',
    questions: 20,
    timeLimit: 45,
    difficulty: 'Official Format',
    icon: TrophyIcon,
    color: 'bg-teal-500',
    borderColor: 'border-teal-600',
  },
]

// 1. Rename the main logic component
function PracticePageContent() {
  const [selectedProvince, setSelectedProvince] = useState('all')

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Header Section */}
        <section className="pt-12 pb-8 px-4">
          <div className="max-w-4xl mx-auto text-center animate-enter">
            <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-6">
              Select a <span className="text-teal-500">Practice Mode</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 font-medium">
              Choose your focus area below. Want the real experience? Select the Official Practice Test.
            </p>
          </div>
        </section>

        {/* Ad Zone */}
        <AdZone position="practice-hero" />

        {/* Province Selection */}
        <section className="py-8 px-4 animate-enter" style={{ animationDelay: '0.1s' }}>
          <div className="max-w-xl mx-auto bg-white p-6 rounded-[2rem] border-2 border-slate-200 shadow-soft">
             <ProvinceSelector
                selectedProvince={selectedProvince}
                onProvinceChange={setSelectedProvince}
              />
          </div>
        </section>

        {/* Test Categories */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-enter" style={{ animationDelay: '0.2s' }}>
              {testCategories.map((category) => (
                <Link 
                  href={`/practice/${category.id}?province=${selectedProvince}`}
                  key={category.id} 
                  className="block bg-white p-8 rounded-[2rem] border-2 border-slate-200 border-b-[8px] hover:bg-slate-50 active:border-b-[2px] active:translate-y-[6px] transition-all group"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <category.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex items-center space-x-1 bg-slate-100 px-3 py-1.5 rounded-full">
                      <StarIcon className="h-4 w-4 text-amber-500" />
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">{category.difficulty}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-extrabold text-slate-800 mb-3">{category.title}</h3>
                  <p className="text-slate-500 font-medium mb-6 line-clamp-2 min-h-[3rem]">{category.description}</p>
                  
                  <div className="flex items-center justify-between text-sm font-bold text-slate-400 bg-slate-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2">
                      <BookOpenIcon className="h-5 w-5 text-slate-500" />
                      <span>{category.questions} Qs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-5 w-5 text-slate-500" />
                      <span>{category.timeLimit} Mins</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Ad Zone */}
        <AdZone position="practice-bottom" />
      </main>

      <Footer />
    </div>
  )
}

// 2. Wrap the export in Suspense to satisfy Next.js 14 static build requirements
export default function PracticePageClient() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    }>
      <PracticePageContent />
    </Suspense>
  )
}
