'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { ClockIcon, CheckCircleIcon, UserIcon } from '@heroicons/react/24/outline'
import Header from '@/components/Header'
import TestQuestion from '@/components/TestQuestion'
import TestResults from '@/components/TestResults'
// import AdZone from '@/components/AdZone'
import LoadingSpinner from '@/components/LoadingSpinner'
import { useSession } from 'next-auth/react'
import Script from 'next/script'

const categories: Record<string, { name: string; description: string; color: string }> = {
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
  },
  full: {
    name: 'Official Practice Test',
    description: 'Exact simulation of the actual citizenship test - 20 questions, 45 minutes',
    color: 'bg-indigo-500'
  }
}

export default function PracticeCategoryClient() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session } = useSession()
  const [questions, setQuestions] = useState<Array<{
    id: number;
    question: string;
    options: string[];
    correct_answer: number;
    explanation: string;
  }>>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [timeLeft, setTimeLeft] = useState(45 * 60) // 45 minutes in seconds
  const [isTestStarted, setIsTestStarted] = useState(false)
  const [isTestCompleted, setIsTestCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [testResults, setTestResults] = useState<{
    score: number;
    passed: boolean;
    correctAnswers: number;
    totalQuestions: number;
    timeSpent: number;
    answers: Array<{
      questionIndex: number;
      question: {
        id: number;
        question: string;
        options: string[];
        correct_answer: number;
        explanation: string;
      };
      userAnswer: number;
      isCorrect: boolean;
    }>;
  } | null>(null)

  const category = params.category as string
  const categoryInfo = categories[category] || { name: 'Practice Test', description: 'Test your knowledge', color: 'bg-gray-500' }

  const handleTestComplete = useCallback(async () => {
    setIsTestCompleted(true)
    
    // Calculate results
    const correctAnswers = questions.filter((question, index) => {
      const userAnswer = answers[index]
      return userAnswer === question.correct_answer
    }).length

    const score = Math.round((correctAnswers / questions.length) * 100)
    const passed = score >= 75

    const results = {
      score,
      passed,
      correctAnswers,
      totalQuestions: questions.length,
      timeSpent: 45 * 60 - timeLeft,
      answers: Object.keys(answers).map(index => ({
        questionIndex: parseInt(index),
        question: questions[parseInt(index)],
        userAnswer: answers[parseInt(index)],
        isCorrect: answers[parseInt(index)] === questions[parseInt(index)].correct_answer
      }))
    }

    setTestResults(results)

    // Save results to database if user is logged in
    if (session?.user?.email) {
      try {
        await fetch('/api/results', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            category,
            score,
            correctAnswers,
            totalQuestions: questions.length,
            timeTaken: 45 * 60 - timeLeft
          }),
        })
      } catch (error) {
        console.error('Error saving results:', error)
      }
    }
  }, [questions, answers, timeLeft, session, category])

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true)
        const province = searchParams.get('province') || 'all'
        const response = await fetch(`/api/questions?category=${category}&province=${province}&limit=20`)
        const data = await response.json()
        
        if (data.success) {
          setQuestions(data.data)
        } else {
          console.error('Failed to fetch questions:', data.error)
        }
      } catch (error) {
        console.error('Error fetching questions:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuestions()
  }, [category, searchParams])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isTestStarted && !isTestCompleted && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTestComplete()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTestStarted, isTestCompleted, timeLeft, handleTestComplete])

  const startTest = () => {
    setIsTestStarted(true)
    setTimeLeft(45 * 60) // Reset timer
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answerIndex
    }))
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }


  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">No Questions Available</h1>
            <p className="text-gray-600 mb-8">
              We&apos;re sorry, but there are no questions available for this category at the moment.
            </p>
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

  if (isTestCompleted && testResults) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <TestResults 
          questions={questions.map(q => ({
            ...q,
            correctAnswer: q.correct_answer
          }))}
          answers={Object.keys(answers).map(index => answers[parseInt(index)])}
          category={category}
          timeTaken={45 * 60 - timeLeft}
        />
      </div>
    )
  }

  if (!isTestStarted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Test Introduction */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className={`w-16 h-16 ${categoryInfo.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <CheckCircleIcon className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{categoryInfo.name}</h1>
              <p className="text-lg text-gray-600">{categoryInfo.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <UserIcon className="h-6 w-6 text-gray-600" />
                </div>
                <h3 className="font-semibold text-gray-900">20 Questions</h3>
                <p className="text-sm text-gray-600">Multiple choice format</p>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <ClockIcon className="h-6 w-6 text-gray-600" />
                </div>
                <h3 className="font-semibold text-gray-900">45 Minutes</h3>
                <p className="text-sm text-gray-600">Time limit</p>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircleIcon className="h-6 w-6 text-gray-600" />
                </div>
                <h3 className="font-semibold text-gray-900">75% to Pass</h3>
                <p className="text-sm text-gray-600">Minimum score</p>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={startTest}
                className="btn-primary text-lg px-8 py-3"
              >
                Start Test
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Test Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{categoryInfo.name}</h1>
              <p className="text-sm text-gray-600">Question {currentQuestionIndex + 1} of {questions.length}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{formatTime(timeLeft)}</div>
              <div className="text-sm text-gray-600">Time remaining</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Test Question */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <TestQuestion
          question={{
            ...currentQuestion,
            correctAnswer: currentQuestion.correct_answer
          }}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          selectedAnswer={answers[currentQuestionIndex]}
          onAnswerSelect={(answerIndex) => handleAnswerSelect(answerIndex)}
        />
        
        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={previousQuestion}
            disabled={currentQuestionIndex === 0}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <div className="flex space-x-4">
            {currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={nextQuestion}
                className="btn-primary"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleTestComplete}
                className="btn-primary"
              >
                Complete Test
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Structured Data for Educational Content */}
      <Script
        id="educational-program-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOccupationalProgram",
            "name": `${categoryInfo.name} Practice Test`,
            "description": categoryInfo.description,
            "provider": {
              "@type": "Organization",
              "name": "CitizenTest Canada",
              "url": "https://citizentestcanada.com"
            },
            "educationalLevel": "Adult Education",
            "occupationalCategory": "Citizenship Test Preparation",
            "timeRequired": "PT45M",
            "courseMode": "online",
            "educationalCredentialAwarded": "Practice Test Completion Certificate"
          })
        }}
      />
    </div>
  )
}
