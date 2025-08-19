'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { 
  ChartBarIcon, 
  ClockIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  CalendarIcon,
  ArrowTrendingUpIcon
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

export default function ProgressPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

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
      setLoading(true)
      const response = await fetch('/api/results')
      const data = await response.json()
      if (data.success) {
        setTestResults(data.data)
        console.log('Fetched test results:', data.data)
      } else {
        console.error('Failed to fetch test results:', data.error)
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
    if (score >= 80) return <CheckCircleIcon className="h-5 w-5 text-green-600" />
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

  const filteredResults = selectedCategory === 'all' 
    ? testResults 
    : testResults.filter(result => result.category === selectedCategory)

  const totalTests = testResults.length
  const averageScore = totalTests > 0 
    ? Math.round(testResults.reduce((sum, result) => sum + result.score, 0) / totalTests)
    : 0
  const totalQuestions = testResults.reduce((sum, result) => sum + result.total_questions, 0)
  const totalCorrect = testResults.reduce((sum, result) => sum + result.correct_answers, 0)
  const totalTime = testResults.reduce((sum, result) => sum + (result.time_taken || 0), 0)

  const categoryStats = ['general', 'history', 'government', 'geography', 'rights', 'full'].map(category => {
    const categoryResults = testResults.filter(result => result.category === category)
    const categoryTests = categoryResults.length
    const categoryAverage = categoryTests > 0 
      ? Math.round(categoryResults.reduce((sum, result) => sum + result.score, 0) / categoryTests)
      : 0
    return { category, tests: categoryTests, average: categoryAverage }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Progress</h1>
              <p className="text-gray-600">
                Track your performance across all Canadian citizenship test categories
              </p>
            </div>
            <button
              onClick={fetchTestResults}
              disabled={loading}
              className="btn-secondary flex items-center"
            >
              {loading ? (
                <div className="loading-spinner mr-2"></div>
              ) : (
                <ArrowTrendingUpIcon className="h-4 w-4 mr-2" />
              )}
              Refresh
            </button>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <ChartBarIcon className="h-8 w-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Tests</p>
                <p className="text-2xl font-bold text-gray-900">{totalTests}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <ArrowTrendingUpIcon className="h-8 w-8 text-green-500" />
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
              <CheckCircleIcon className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <ClockIcon className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Time</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(totalTime / 60)}m
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Performance */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Performance by Category</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryStats.map(({ category, tests, average }) => (
                <div key={category} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">
                      {getCategoryDisplayName(category)}
                    </h3>
                    <span className={`text-sm font-semibold ${getScoreColor(average)}`}>
                      {average}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{tests} tests taken</span>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${average >= 80 ? 'bg-green-500' : average >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${average}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filter and Results */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Test History</h2>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="general">General Knowledge</option>
                <option value="history">Canadian History</option>
                <option value="government">Government & Politics</option>
                <option value="geography">Geography & Symbols</option>
                <option value="rights">Rights & Responsibilities</option>
                <option value="full">Full Practice Test</option>
              </select>
            </div>
          </div>
          <div className="p-6">
            {filteredResults.length === 0 ? (
              <div className="text-center py-8">
                <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">
                  {selectedCategory === 'all' 
                    ? 'No test results yet' 
                    : `No results for ${getCategoryDisplayName(selectedCategory)}`
                  }
                </p>
                <a
                  href="/practice"
                  className="btn-primary"
                >
                  Take a Test
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredResults.map((result) => (
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
                    
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Score</p>
                        <p className={`font-semibold ${getScoreColor(result.score)}`}>
                          {result.score}%
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Correct</p>
                        <p className="font-semibold text-gray-900">
                          {result.correct_answers}/{result.total_questions}
                        </p>
                      </div>
                      
                      {result.time_taken && (
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Time</p>
                          <p className="font-semibold text-gray-900">
                            {formatTime(result.time_taken)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
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
