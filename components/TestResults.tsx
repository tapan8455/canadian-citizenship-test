'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { XCircleIcon, TrophyIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import TestQuestion from './TestQuestion'
import AdZone from './AdZone'

interface TestResultsProps {
  questions: Array<{
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }>
  answers: number[]
  category: string
  timeTaken?: number
}

export default function TestResults({ questions, answers, category, timeTaken = 0 }: TestResultsProps) {
  const [showReview, setShowReview] = useState(false)
  const [currentReviewQuestion, setCurrentReviewQuestion] = useState(0)
  const [resultsSaved, setResultsSaved] = useState(false)

  // Calculate results
  const totalQuestions = questions.length
  const answeredQuestions = answers.filter(answer => answer !== undefined).length
  const correctAnswers = answers.filter((answer, index) => answer === questions[index].correctAnswer).length
  const score = Math.round((correctAnswers / totalQuestions) * 100)
  const passed = score >= 75 // 75% is typically the passing score

    // Save results to database
  useEffect(() => {
    const saveResults = async () => {
      if (!resultsSaved) {
        try {
          // Get the category key from the display name
          const categoryMap: { [key: string]: string } = {
            'General Knowledge': 'general',
            'Canadian History': 'history',
            'Government & Politics': 'government',
            'Geography & Symbols': 'geography',
            'Rights & Responsibilities': 'rights',
            'Full Practice Test': 'full'
          }
          
          const categoryKey = categoryMap[category] || 'general'
          
          const response = await fetch('/api/results', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              category: categoryKey,
              score: score,
              totalQuestions: totalQuestions,
              correctAnswers: correctAnswers,
              timeTaken: timeTaken
            }),
          })

          if (response.ok) {
            setResultsSaved(true)
            console.log('Test results saved successfully!')
          }
        } catch (error) {
          console.error('Error saving test results:', error)
        }
      }
    }

    saveResults()
  }, [resultsSaved, category, score, totalQuestions, correctAnswers, timeTaken])

  // Prepare data for charts

  // Prepare data for charts
  const pieData = [
    { name: 'Correct', value: correctAnswers, color: '#10B981' },
    { name: 'Incorrect', value: totalQuestions - correctAnswers, color: '#EF4444' },
    { name: 'Unanswered', value: totalQuestions - answeredQuestions, color: '#6B7280' }
  ]

  const barData = questions.map((question, index) => ({
    question: `Q${index + 1}`,
    correct: answers[index] === question.correctAnswer ? 1 : 0,
    answered: answers[index] !== undefined ? 1 : 0
  }))

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 75) return 'text-blue-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreMessage = (score: number) => {
    if (score >= 90) return 'Excellent! You have a strong understanding of the material.'
    if (score >= 75) return 'Good job! You passed the test with a solid score.'
    if (score >= 60) return 'You\'re on the right track, but need more practice.'
    return 'Keep studying! Focus on the areas where you struggled.'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Test Results</h1>
              <p className="text-gray-600">{category}</p>
            </div>
            <Link href="/practice" className="btn-secondary inline-flex items-center">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Practice
            </Link>
          </div>
        </div>
      </div>

      {/* Ad Zone */}
      <AdZone position="results-header" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showReview ? (
          <>
            {/* Score Summary */}
            <div className="card mb-8">
              <div className="text-center">
                <div className={`text-6xl font-bold mb-4 ${getScoreColor(score)}`}>
                  {score}%
                </div>
                <div className="flex items-center justify-center mb-4">
                  {passed ? (
                    <div className="flex items-center space-x-2 text-green-600">
                      <TrophyIcon className="h-6 w-6" />
                      <span className="text-lg font-semibold">PASSED</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-red-600">
                      <XCircleIcon className="h-6 w-6" />
                      <span className="text-lg font-semibold">NOT PASSED</span>
                    </div>
                  )}
                </div>
                <p className="text-gray-600 mb-6">{getScoreMessage(score)}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{totalQuestions}</div>
                    <div className="text-gray-600">Total Questions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
                    <div className="text-gray-600">Correct Answers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{answeredQuestions}</div>
                    <div className="text-gray-600">Questions Answered</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Pie Chart */}
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">Answer Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center space-x-4 mt-4">
                  {pieData.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-gray-600">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bar Chart */}
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">Question Performance</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="question" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="correct" fill="#10B981" name="Correct" />
                      <Bar dataKey="answered" fill="#3B82F6" name="Answered" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="card">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowReview(true)}
                  className="btn-primary flex-1"
                >
                  Review Answers
                </button>
                <Link href="/practice" className="btn-secondary flex-1 text-center">
                  Take Another Test
                </Link>
                <Link href="/study-guide" className="btn-secondary flex-1 text-center">
                  Study Guide
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Review Header */}
            <div className="card mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Review Your Answers</h2>
                  <p className="text-gray-600">
                    Question {currentReviewQuestion + 1} of {questions.length}
                  </p>
                </div>
                <button
                  onClick={() => setShowReview(false)}
                  className="btn-secondary"
                >
                  Back to Results
                </button>
              </div>
            </div>

            {/* Question Review */}
            <div className="card">
              <TestQuestion
                question={questions[currentReviewQuestion]}
                selectedAnswer={answers[currentReviewQuestion]}
                onAnswerSelect={() => {}}
                questionNumber={currentReviewQuestion + 1}
                totalQuestions={questions.length}
                showCorrectAnswer={true}
              />
              
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setCurrentReviewQuestion(Math.max(0, currentReviewQuestion - 1))}
                  disabled={currentReviewQuestion === 0}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                <div className="flex space-x-2">
                  {questions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentReviewQuestion(index)}
                      className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                        index === currentReviewQuestion
                          ? 'bg-primary-600 text-white'
                          : answers[index] === questions[index].correctAnswer
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => setCurrentReviewQuestion(Math.min(questions.length - 1, currentReviewQuestion + 1))}
                  disabled={currentReviewQuestion === questions.length - 1}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Ad Zone */}
      <AdZone position="results-bottom" />
    </div>
  )
}
