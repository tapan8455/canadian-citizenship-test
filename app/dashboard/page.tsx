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
} from '@heroicons/react/24/outline'
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

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <TrophyIcon className="h-5 w-5 text-green-600" />
    if (score >= 60) return <CheckCircleIcon className="h-5 w-5 text-yellow-600" />
    return <XCircleIcon className="h-5 w-5 text-red-600" />
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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="loading-spinner"></div>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const totalTests = testResults.length
  const averageScore = totalTests > 0 
    ? Math.round(testResults.reduce((sum, result) => sum + result.score, 0) / totalTests)
    : 0
  const totalQuestions = testResults.reduce((sum, result) => sum + result.total_questions, 0)
  const totalCorrect = testResults.reduce((sum, result) => sum + result.correct_answers, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {session.user?.name || 'Student'}!
          </h1>
          <p className="text-gray-600">
            Track your progress and continue your Canadian citizenship test preparation
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <ChartBarIcon className="h-8 w-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tests Completed</p>
                <p className="text-2xl font-bold text-gray-900">{totalTests}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <TrophyIcon className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className={`text-2xl font-bold ${getScoreColor(averageScore)}`}>
                  {averageScore}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <BookOpenIcon className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Questions Answered</p>
                <p className="text-2xl font-bold text-gray-900">{totalQuestions}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <CheckCircleIcon className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Correct Answers</p>
                <p className="text-2xl font-bold text-gray-900">{totalCorrect}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="/practice"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors"
              >
                <BookOpenIcon className="h-6 w-6 text-red-500 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Take Practice Test</p>
                  <p className="text-sm text-gray-600">Choose a category to practice</p>
                </div>
              </a>

              <a
                href="/practice/full"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors"
              >
                <TrophyIcon className="h-6 w-6 text-yellow-500 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Full Practice Test</p>
                  <p className="text-sm text-gray-600">Complete test simulation</p>
                </div>
              </a>

              <a
                href="/progress"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors"
              >
                <ChartBarIcon className="h-6 w-6 text-blue-500 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">View Progress</p>
                  <p className="text-sm text-gray-600">Detailed analytics</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Recent Test Results */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Test Results</h2>
          </div>
          <div className="p-6">
            {testResults.length === 0 ? (
              <div className="text-center py-8">
                <BookOpenIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No test results yet</p>
                <a
                  href="/practice"
                  className="btn-primary"
                >
                  Take Your First Test
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {testResults.slice(0, 5).map((result) => (
                  <div
                    key={result.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center">
                      {getScoreIcon(result.score)}
                      <div className="ml-4">
                        <p className="font-medium text-gray-900">
                          {getCategoryDisplayName(result.category)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatDate(result.completed_at)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className={`font-semibold ${getScoreColor(result.score)}`}>
                          {result.score}%
                        </p>
                        <p className="text-sm text-gray-600">
                          {result.correct_answers}/{result.total_questions} correct
                        </p>
                      </div>
                      
                      {result.time_taken && (
                        <div className="flex items-center text-sm text-gray-600">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          {formatTime(result.time_taken)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {testResults.length > 5 && (
              <div className="mt-6 text-center">
                <a
                  href="/progress"
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  View All Results →
                </a>
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
