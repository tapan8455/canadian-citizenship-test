'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { 
  ChartBarIcon, 
  ClockIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  BookOpenIcon,
  TrophyIcon
} from '@heroicons/react/24/solid'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdZone from '@/components/AdZone'

interface TestResult {
  id: number
  category: string
  score: number
  total_questions: number
  correct_answers: number
  time_taken: number
  completed_at: string
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetchTestResults()
    }
  }, [session])

  const fetchTestResults = async () => {
    try {
      const response = await fetch('/api/results')
      const data = await response.json()
      if (data.success) {
        setTestResults(data.data)
      }
    } catch (error) {
      console.error('Error fetching test results:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCategoryDisplayName = (category: string) => {
    const names: { [key: string]: string } = {
      general: 'General Knowledge',
      history: 'Canadian History',
      government: 'Government & Politics',
      geography: 'Geography & Symbols',
      rights: 'Rights & Responsibilities',
      full: 'Full Practice Test'
    }
    return names[category] || category
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-CA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="loading-spinner"></div>
        </div>
      </div>
    )
  }

  if (!session) return null

  const totalTests = testResults.length
  const averageScore = totalTests > 0 
    ? Math.round(testResults.reduce((sum, result) => sum + (result.correct_answers / result.total_questions * 100), 0) / totalTests)
    : 0
  const totalQuestions = testResults.reduce((sum, result) => sum + result.total_questions, 0)
  const totalCorrect = testResults.reduce((sum, result) => sum + result.correct_answers, 0)

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-8 animate-enter">
        {/* Welcome Section */}
        <div className="mb-10 text-center md:text-left bg-teal-500 rounded-3xl p-8 md:p-12 text-white shadow-3d-primary relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-400 rounded-full mix-blend-screen opacity-50 blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <h1 className="text-4xl font-black mb-2 relative z-10">
            Welcome back, {session.user?.name || 'Student'}! 👋
          </h1>
          <p className="text-teal-50 text-lg font-medium relative z-10">
            Keep your streak alive. Continue your citizenship test preparation below.
          </p>
        </div>

        {/* Gamified Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          <div className="bg-white rounded-3xl p-6 shadow-soft border-2 border-slate-100 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-rose-100 text-rose-500 rounded-2xl flex items-center justify-center mb-4">
              <ChartBarIcon className="w-8 h-8" />
            </div>
            <div className="text-3xl font-black text-slate-800">{totalTests}</div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Tests Done</div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-soft border-2 border-slate-100 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-amber-100 text-amber-500 rounded-2xl flex items-center justify-center mb-4">
              <TrophyIcon className="w-8 h-8" />
            </div>
            <div className="text-3xl font-black text-amber-500">{averageScore}%</div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Avg Score</div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-soft border-2 border-slate-100 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-blue-100 text-blue-500 rounded-2xl flex items-center justify-center mb-4">
              <BookOpenIcon className="w-8 h-8" />
            </div>
            <div className="text-3xl font-black text-slate-800">{totalQuestions}</div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Answered</div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-soft border-2 border-slate-100 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-500 rounded-2xl flex items-center justify-center mb-4">
              <CheckCircleIcon className="w-8 h-8" />
            </div>
            <div className="text-3xl font-black text-slate-800">{totalCorrect}</div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Correct</div>
          </div>
        </div>

        {/* Quick Actions (3D Buttons) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <a
            href="/practice"
            className="flex items-center p-6 bg-white border-2 border-slate-200 border-b-[8px] rounded-3xl hover:bg-slate-50 hover:border-b-[8px] active:border-b-[2px] active:translate-y-[6px] transition-all group"
          >
            <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform">
              <BookOpenIcon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-slate-800">Practice By Topic</p>
              <p className="text-slate-500 font-medium">Focus on specific chapters</p>
            </div>
          </a>

          <a
            href="/practice/full"
            className="flex items-center p-6 bg-blue-500 text-white border-2 border-blue-600 border-b-[8px] rounded-3xl hover:bg-blue-400 hover:border-b-[8px] active:border-b-[2px] active:translate-y-[6px] transition-all group"
          >
            <div className="w-16 h-16 bg-blue-400 text-white rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform">
              <TrophyIcon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xl font-extrabold">Full Mock Exam</p>
              <p className="text-blue-100 font-medium">20 Questions • 45 Mins</p>
            </div>
          </a>
        </div>

        {/* Recent Test Results */}
        <div className="bg-white rounded-3xl shadow-soft border-2 border-slate-100 overflow-hidden">
          <div className="p-6 md:p-8 border-b-2 border-slate-100 bg-slate-50">
            <h2 className="text-2xl font-extrabold text-slate-800">Recent Activity</h2>
          </div>
          <div className="p-6 md:p-8">
            {testResults.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🌱</div>
                <p className="text-xl font-bold text-slate-600 mb-6">You haven&apos;t taken any tests yet!</p>
                <a href="/practice" className="btn-primary inline-flex">Start Your First Test</a>
              </div>
            ) : (
              <div className="space-y-4">
                {testResults.slice(0, 5).map((result) => {
                  const scorePct = Math.round((result.correct_answers / result.total_questions) * 100);
                  const passed = scorePct >= 75;
                  
                  return (
                    <div key={result.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border-2 border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${passed ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                          {passed ? <CheckCircleIcon className="w-7 h-7" /> : <XCircleIcon className="w-7 h-7" />}
                        </div>
                        <div>
                          <p className="font-bold text-lg text-slate-800">{getCategoryDisplayName(result.category)}</p>
                          <p className="text-sm font-medium text-slate-500">{formatDate(result.completed_at)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6 sm:justify-end">
                        {result.time_taken > 0 && (
                          <div className="flex items-center text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-lg">
                            <ClockIcon className="w-4 h-4 mr-1" />
                            {formatTime(result.time_taken)}
                          </div>
                        )}
                        <div className="text-right">
                          <p className={`text-xl font-black ${passed ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {scorePct}%
                          </p>
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            {result.correct_answers}/{result.total_questions}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      <AdZone position="bottom" />
      <Footer />
    </div>
  )
}
