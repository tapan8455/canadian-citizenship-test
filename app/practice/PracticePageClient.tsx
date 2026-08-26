'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { ClockIcon, CheckCircleIcon, UserIcon } from '@heroicons/react/24/solid'
import Header from '@/components/Header'
import TestQuestion from '@/components/TestQuestion'
import TestResults from '@/components/TestResults'
import LoadingSpinner from '@/components/LoadingSpinner'
import { useSession } from 'next-auth/react'
import Script from 'next/script'

const categories: Record<string, { name: string; description: string; color: string }> = {
  general: {
    name: 'General Knowledge',
    description: 'Basic facts about Canada, its people, and culture',
    color: 'bg-blue-500 text-white border-blue-600'
  },
  history: {
    name: 'Canadian History',
    description: 'Important historical events and figures in Canadian history',
    color: 'bg-emerald-500 text-white border-emerald-600'
  },
  government: {
    name: 'Government & Politics',
    description: 'Canadian government structure, political system, and democracy',
    color: 'bg-purple-500 text-white border-purple-600'
  },
  geography: {
    name: 'Geography',
    description: 'Canadian provinces, territories, cities, and natural features',
    color: 'bg-rose-500 text-white border-rose-600'
  },
  rights: {
    name: 'Rights & Responsibilities',
    description: 'Canadian Charter of Rights and Freedoms, citizenship responsibilities',
    color: 'bg-amber-500 text-white border-amber-600'
  },
  full: {
    name: 'Official Practice Test',
    description: 'Exact simulation of the actual citizenship test - 20 questions, 45 minutes',
    color: 'bg-teal-500 text-white border-teal-600'
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

  const category = params.category as string
  const categoryInfo = categories[category] || { name: 'Practice Test', description: 'Test your knowledge', color: 'bg-slate-500 text-white border-slate-600' }

  const handleTestComplete = useCallback(async () => {
    setIsTestCompleted(true)
    
    const correctAnswers = questions.filter((question, index) => {
      return answers[index] === question.correct_answer
    }).length

    const score = Math.round((correctAnswers / questions.length) * 100)

    if (session?.user?.email) {
      try {
        await fetch('/api/results', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
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
    setTimeLeft(45 * 60)
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-20 text-center animate-enter">
          <div className="text-7xl mb-6">🏜️</div>
          <h1 className="text-3xl font-black text-slate-800 mb-4">No Questions Found</h1>
          <p className="text-slate-500 font-medium mb-8">
            We don&apos;t have questions for this specific category and province yet.
          </p>
          <button
            onClick={() => router.push('/practice')}
            className="px-8 py-4 rounded-2xl font-extrabold text-white bg-teal-500 border-2 border-teal-600 border-b-[6px] hover:bg-teal-400 active:border-b-[2px] active:translate-y-[4px] transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  if (isTestCompleted) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <TestResults 
          questions={questions.map(q => ({
            ...q,
            correctAnswer: q.correct_answer
          }))}
          answers={Object.keys(answers).map(index => answers[parseInt(index)])}
          timeTaken={45 * 60 - timeLeft}
        />
      </div>
    )
  }

  if (!isTestStarted) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header />
        
        <div className="flex-grow max-w-4xl w-full mx-auto px-4 py-12 flex items-center justify-center animate-enter">
          <div className="bg-white rounded-[2rem] shadow-soft border-2 border-slate-200 p-8 md:p-12 w-full text-center">
            
            <div className={`w-24 h-24 ${categoryInfo.color} rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg border-b-[6px]`}>
              <CheckCircleIcon className="h-12 w-12 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">{categoryInfo.name}</h1>
            <p className="text-xl text-slate-500 font-medium mb-12 max-w-2xl mx-auto">{categoryInfo.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="text-center p-6 bg-slate-50 border-2 border-slate-100 rounded-2xl">
                <UserIcon className="h-8 w-8 text-slate-400 mx-auto mb-3" />
                <h3 className="font-extrabold text-slate-800 text-xl">20 Questions</h3>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mt-1">Multiple Choice</p>
              </div>
              
              <div className="text-center p-6 bg-slate-50 border-2 border-slate-100 rounded-2xl">
                <ClockIcon className="h-8 w-8 text-slate-400 mx-auto mb-3" />
                <h3 className="font-extrabold text-slate-800 text-xl">45 Minutes</h3>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mt-1">Time Limit</p>
              </div>
              
              <div className="text-center p-6 bg-slate-50 border-2 border-slate-100 rounded-2xl">
                <CheckCircleIcon className="h-8 w-8 text-slate-400 mx-auto mb-3" />
                <h3 className="font-extrabold text-slate-800 text-xl">75% to Pass</h3>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mt-1">Min. Score</p>
              </div>
            </div>

            <button
              onClick={startTest}
              className="w-full md:w-auto px-12 py-5 rounded-2xl font-extrabold text-white text-xl bg-teal-500 border-2 border-teal-600 border-b-[6px] hover:bg-teal-400 hover:border-b-[8px] active:border-b-[2px] active:translate-y-[6px] transition-all"
            >
              Start Your Test Now
            </button>
          </div>
        </div>

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
              "courseMode": "online"
            })
          }}
        />
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Gamified Test Header */}
      <div className="bg-white border-b-2 border-slate-200 sticky top-0 z-40 shadow-soft">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-black text-slate-800">{categoryInfo.name}</h1>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Question {currentQuestionIndex + 1} / {questions.length}</p>
            </div>
            <div className="text-right flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl">
              <ClockIcon className="w-6 h-6 text-slate-500" />
              <div className="text-xl font-black text-slate-700">{formatTime(timeLeft)}</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-slate-100 rounded-full h-3">
            <div 
              className="bg-teal-500 h-3 rounded-full transition-all duration-300 shadow-[inset_0_-2px_0_rgba(0,0,0,0.1)]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Test Question Component */}
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
        <div className="flex justify-between mt-12 pt-8 border-t-2 border-slate-200 gap-4">
          <button
            onClick={previousQuestion}
            disabled={currentQuestionIndex === 0}
            className="w-full md:w-auto px-8 py-4 rounded-xl font-extrabold text-slate-600 bg-white border-2 border-slate-200 border-b-[6px] hover:bg-slate-50 active:border-b-[2px] active:translate-y-[4px] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Previous
          </button>
          
          {currentQuestionIndex < questions.length - 1 ? (
            <button
              onClick={nextQuestion}
              className="w-full md:w-auto px-8 py-4 rounded-xl font-extrabold text-white bg-slate-800 border-2 border-slate-900 border-b-[6px] hover:bg-slate-700 active:border-b-[2px] active:translate-y-[4px] transition-all"
            >
              Next Question
            </button>
          ) : (
            <button
              onClick={handleTestComplete}
              className="w-full md:w-auto px-8 py-4 rounded-xl font-extrabold text-white bg-teal-500 border-2 border-teal-600 border-b-[6px] hover:bg-teal-400 active:border-b-[2px] active:translate-y-[4px] transition-all"
            >
              Submit & Finish
            </button>
          )}
        </div>
      </div>
    </div>
  )
}