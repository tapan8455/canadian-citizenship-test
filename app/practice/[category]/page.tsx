'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import Header from '@/components/Header'
import TestQuestion from '@/components/TestQuestion'
import TestResults from '@/components/TestResults'
import AdZone from '@/components/AdZone'
import LoadingSpinner from '@/components/LoadingSpinner'

// Sample questions - in a real app, these would come from a database
const generalQuestions = [
  {
    id: 1,
    question: "What is the capital city of Canada?",
    options: ["Toronto", "Montreal", "Ottawa", "Vancouver"],
    correctAnswer: 2,
    explanation: "Ottawa is the capital city of Canada, located in the province of Ontario."
  },
  {
    id: 2,
    question: "Which of the following is a Canadian province?",
    options: ["Alaska", "Quebec", "Greenland", "Hawaii"],
    correctAnswer: 1,
    explanation: "Quebec is one of Canada's 10 provinces, located in eastern Canada."
  },
  {
    id: 3,
    question: "What is the national animal of Canada?",
    options: ["Moose", "Beaver", "Polar Bear", "Caribou"],
    correctAnswer: 1,
    explanation: "The beaver is Canada's national animal and appears on the Canadian nickel."
  },
  {
    id: 4,
    question: "How many provinces does Canada have?",
    options: ["8", "9", "10", "11"],
    correctAnswer: 2,
    explanation: "Canada has 10 provinces: Alberta, British Columbia, Manitoba, New Brunswick, Newfoundland and Labrador, Nova Scotia, Ontario, Prince Edward Island, Quebec, and Saskatchewan."
  },
  {
    id: 5,
    question: "What is the largest city in Canada by population?",
    options: ["Toronto", "Montreal", "Vancouver", "Calgary"],
    correctAnswer: 0,
    explanation: "Toronto is the largest city in Canada by population, with over 2.9 million people in the city proper."
  }
]

const historyQuestions = [
  {
    id: 1,
    question: "In what year did Canada become a country?",
    options: ["1865", "1867", "1870", "1871"],
    correctAnswer: 1,
    explanation: "Canada became a country on July 1, 1867, with the Confederation of four provinces: Ontario, Quebec, Nova Scotia, and New Brunswick."
  },
  {
    id: 2,
    question: "Who was the first Prime Minister of Canada?",
    options: ["John A. Macdonald", "Alexander Mackenzie", "Wilfrid Laurier", "Robert Borden"],
    correctAnswer: 0,
    explanation: "Sir John A. Macdonald was Canada's first Prime Minister, serving from 1867 to 1873 and again from 1878 to 1891."
  },
  {
    id: 3,
    question: "What was the name of the document that established Canada as a country?",
    options: ["The Constitution Act", "The British North America Act", "The Canadian Charter", "The Confederation Act"],
    correctAnswer: 1,
    explanation: "The British North America Act (now called the Constitution Act, 1867) established Canada as a country."
  }
]

const governmentQuestions = [
  {
    id: 1,
    question: "What type of government does Canada have?",
    options: ["Presidential Republic", "Parliamentary Democracy", "Absolute Monarchy", "Dictatorship"],
    correctAnswer: 1,
    explanation: "Canada is a parliamentary democracy with a constitutional monarchy, where the monarch is the head of state and the Prime Minister is the head of government."
  },
  {
    id: 2,
    question: "Who is the current head of state of Canada?",
    options: ["The Prime Minister", "The Governor General", "The Queen", "The President"],
    correctAnswer: 2,
    explanation: "The Queen (currently Queen Elizabeth II) is the head of state of Canada, represented by the Governor General."
  },
  {
    id: 3,
    question: "How often are federal elections typically held in Canada?",
    options: ["Every 2 years", "Every 3 years", "Every 4 years", "Every 5 years"],
    correctAnswer: 2,
    explanation: "Federal elections in Canada are typically held every 4 years, though they can be called earlier."
  }
]

const geographyQuestions = [
  {
    id: 1,
    question: "How many provinces and territories does Canada have in total?",
    options: ["10 provinces, 3 territories", "10 provinces, 2 territories", "9 provinces, 3 territories", "11 provinces, 2 territories"],
    correctAnswer: 0,
    explanation: "Canada has 10 provinces and 3 territories: Yukon, Northwest Territories, and Nunavut."
  },
  {
    id: 2,
    question: "What is the largest province in Canada by area?",
    options: ["Ontario", "Quebec", "British Columbia", "Alberta"],
    correctAnswer: 1,
    explanation: "Quebec is the largest province in Canada by area, covering over 1.5 million square kilometers."
  },
  {
    id: 3,
    question: "What is the national flag of Canada called?",
    options: ["The Maple Leaf", "The Red Ensign", "The Union Jack", "The Canadian Flag"],
    correctAnswer: 0,
    explanation: "The Canadian flag is commonly known as 'The Maple Leaf' due to the prominent red maple leaf in the center."
  }
]

const rightsQuestions = [
  {
    id: 1,
    question: "What document protects the rights and freedoms of Canadians?",
    options: ["The Constitution", "The Charter of Rights and Freedoms", "The Bill of Rights", "The Declaration of Independence"],
    correctAnswer: 1,
    explanation: "The Canadian Charter of Rights and Freedoms protects the fundamental rights and freedoms of all Canadians."
  },
  {
    id: 2,
    question: "Which of the following is a right guaranteed to Canadian citizens?",
    options: ["Right to bear arms", "Right to vote", "Right to free healthcare", "Right to free education"],
    correctAnswer: 1,
    explanation: "The right to vote in federal and provincial elections is guaranteed to Canadian citizens aged 18 and older."
  },
  {
    id: 3,
    question: "What is one responsibility of Canadian citizens?",
    options: ["Paying taxes", "Owning property", "Having a job", "Speaking English"],
    correctAnswer: 0,
    explanation: "Paying taxes is one of the key responsibilities of Canadian citizens."
  }
]

const questionsData = {
  general: generalQuestions,
  history: historyQuestions,
  government: governmentQuestions,
  geography: geographyQuestions,
  rights: rightsQuestions,
  full: [
    // Combine questions from all categories for the full test
    ...generalQuestions,
    ...historyQuestions,
    ...governmentQuestions,
    ...geographyQuestions,
    ...rightsQuestions
  ]
}

const categoryNames = {
  general: 'General Knowledge',
  history: 'Canadian History',
  government: 'Government & Politics',
  geography: 'Geography & Symbols',
  rights: 'Rights & Responsibilities',
  full: 'Full Practice Test'
}

export default function TestPage() {
  const params = useParams()
  const router = useRouter()
  const category = params.category as string
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '')
  const province = searchParams.get('province') || 'all'
  
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState(30 * 60) // 30 minutes default
  const [isTestComplete, setIsTestComplete] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [questions, setQuestions] = useState<Array<{
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }>>([])

  useEffect(() => {
    const fetchQuestions = async () => {
      if (category) {
        try {
          const response = await fetch(`/api/questions?category=${category}&province=${province}&limit=20`)
          const data = await response.json()
          
          if (data.success && data.data.length > 0) {
            setQuestions(data.data)
          } else {
            // Fallback to hardcoded questions if API fails
            if (questionsData[category as keyof typeof questionsData]) {
              setQuestions(questionsData[category as keyof typeof questionsData])
            } else {
              router.push('/practice')
              return
            }
          }
          
                // Set time limit based on category (official test is 45 minutes for 20 questions)
      const timeLimits: { [key: string]: number } = {
        general: 45 * 60,
        history: 45 * 60,
        government: 45 * 60,
        geography: 45 * 60,
        rights: 45 * 60,
        full: 45 * 60
      }
          setTimeLeft(timeLimits[category] || 30 * 60)
        } catch (error) {
          console.error('Error fetching questions:', error)
          // Fallback to hardcoded questions
          if (questionsData[category as keyof typeof questionsData]) {
            setQuestions(questionsData[category as keyof typeof questionsData])
          } else {
            router.push('/practice')
          }
        }
      } else {
        router.push('/practice')
      }
    }

    fetchQuestions()
  }, [category, router, province])

  useEffect(() => {
    if (timeLeft > 0 && !isTestComplete) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsTestComplete(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [timeLeft, isTestComplete])

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answerIndex
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setIsTestComplete(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleFinish = () => {
    setIsTestComplete(true)
    setShowResults(true)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  if (!questions.length) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner size="lg" text="Loading questions..." />
        </div>
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <TestResults 
          questions={questions}
          answers={answers}
          category={categoryNames[category as keyof typeof categoryNames]}
          timeTaken={30 * 60 - timeLeft} // Calculate time taken
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Test Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {categoryNames[category as keyof typeof categoryNames]}
              </h1>
              <p className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <ClockIcon className="h-4 w-4 text-red-500" />
                <span className={`font-medium ${timeLeft < 300 ? 'text-red-600' : 'text-gray-600'}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Progress:</span>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ad Zone */}
      <AdZone position="test-header" size="content" />

      {/* Test Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card">
          <TestQuestion
            question={questions[currentQuestion]}
            selectedAnswer={answers[currentQuestion]}
            onAnswerSelect={handleAnswer}
            questionNumber={currentQuestion + 1}
            totalQuestions={questions.length}
          />
          
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <div className="flex items-center space-x-2">
              {answers[currentQuestion] !== undefined && (
                <div className="flex items-center space-x-1 text-green-600">
                  <CheckCircleIcon className="h-4 w-4" />
                  <span className="text-sm">Answered</span>
                </div>
              )}
            </div>
            
            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={handleFinish}
                className="btn-primary"
              >
                Finish Test
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="btn-primary"
              >
                Next Question
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Ad Zone */}
      <AdZone position="test-bottom" size="content" />
    </div>
  )
}
