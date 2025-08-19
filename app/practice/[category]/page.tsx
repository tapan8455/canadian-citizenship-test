'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ClockIcon, CheckCircleIcon, UserIcon } from '@heroicons/react/24/outline'
import Header from '@/components/Header'
import TestQuestion from '@/components/TestQuestion'
import TestResults from '@/components/TestResults'
import AdZone from '@/components/AdZone'
import LoadingSpinner from '@/components/LoadingSpinner'
import { useSession } from 'next-auth/react'

const categories = {
  general: {
    name: 'General Knowledge',
    description: 'Basic facts about Canada, its people, and culture',
    color: 'bg-blue-500'
  },
  history: {
    name: 'Canadian History',
    description: 'Important historical events and figures in Canadian history',
    color: 'bg-green-500'
  },
  government: {
    name: 'Government & Politics',
    description: 'Canadian government structure, political system, and democracy',
    color: 'bg-purple-500'
  },
  geography: {
    name: 'Geography',
    description: 'Canadian provinces, territories, cities, and natural features',
    color: 'bg-orange-500'
  },
  rights: {
    name: 'Rights & Responsibilities',
    description: 'Canadian Charter of Rights and Freedoms, citizenship responsibilities',
    color: 'bg-red-500'
  }
}

export default function PracticeTestPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const category = params.category as string
  
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(45 * 60) // 45 minutes in seconds
  const [isTestComplete, setIsTestComplete] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [testStarted, setTestStarted] = useState(false)

  // Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/questions?category=${category}&limit=20`)
        if (!response.ok) {
          throw new Error('Failed to fetch questions')
        }
        const data = await response.json()
        setQuestions(data.questions || [])
        setIsLoading(false)
      } catch (err) {
        setError('Failed to load questions. Please try again.')
        setIsLoading(false)
      }
    }

    if (category && categories[category]) {
      fetchQuestions()
    } else {
      router.push('/practice')
    }
  }, [category, router])

  // Timer countdown
  useEffect(() => {
    if (!testStarted || isTestComplete) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsTestComplete(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [testStarted, isTestComplete])

  const startTest = () => {
    setTestStarted(true)
    setTimeLeft(45 * 60) // Reset timer
  }

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      setIsTestComplete(true)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

     const calculateScore = () => {
     let correct = 0
     questions.forEach((question) => {
       const userAnswer = userAnswers[question.id]
       if (userAnswer === question.correct_answer) {
         correct++
       }
     })
     return {
       correct,
       total: questions.length,
       percentage: Math.round((correct / questions.length) * 100)
     }
   }

  if (!categories[category]) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
            <p className="text-gray-600 mb-6">The requested category does not exist.</p>
            <button
              onClick={() => router.push('/practice')}
              className="btn-primary"
            >
              Back to Practice Tests
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (isTestComplete) {
    const score = calculateScore()
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <TestResults
            score={score.percentage}
            correctAnswers={score.correct}
            totalQuestions={score.total}
            questions={questions}
            userAnswers={userAnswers}
            timeTaken={45 * 60 - timeLeft}
          />
        </div>
      </div>
    )
  }

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="text-center mb-8">
              <div className={`w-16 h-16 ${categories[category].color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <CheckCircleIcon className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {categories[category].name} Practice Test
              </h1>
              <p className="text-gray-600 mb-6">
                {categories[category].description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-2">Test Format</h3>
                <ul className="text-blue-800 space-y-1">
                  <li>• {questions.length} multiple choice questions</li>
                  <li>• 45 minutes time limit</li>
                  <li>• Need 75% to pass (15/20 correct)</li>
                  <li>• Can review and change answers</li>
                </ul>
              </div>
              
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="font-semibold text-green-900 mb-2">Instructions</h3>
                <ul className="text-green-800 space-y-1">
                  <li>• Read each question carefully</li>
                  <li>• Select the best answer</li>
                  <li>• Use the timer to pace yourself</li>
                  <li>• Review your answers before submitting</li>
                </ul>
              </div>
            </div>

            {session && (
              <div className="bg-yellow-50 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <UserIcon className="h-5 w-5 text-yellow-600 mr-2" />
                  <span className="text-yellow-800">
                    <strong>Signed in as {session.user?.email}</strong> - Your progress will be saved!
                  </span>
                </div>
              </div>
            )}

            <div className="text-center">
              <button
                onClick={startTest}
                className="btn-primary text-lg px-8 py-3"
              >
                Start Practice Test
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Progress Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-700">
                <ClockIcon className="h-4 w-4 mr-1" />
                <span className={timeLeft < 300 ? 'text-red-600 font-semibold' : ''}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {currentQuestion && (
          <TestQuestion
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            userAnswer={userAnswers[currentQuestion.id]}
            onAnswerSelect={(answerIndex) => handleAnswerSelect(currentQuestion.id, answerIndex)}
            onNext={handleNextQuestion}
            onPrevious={handlePreviousQuestion}
            isLastQuestion={currentQuestionIndex === questions.length - 1}
            isFirstQuestion={currentQuestionIndex === 0}
          />
        )}
      </div>

      {/* Ad Zone */}
      <AdZone position="practice-bottom" />
    </div>
  )
}
