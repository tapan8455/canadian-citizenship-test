'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowPathIcon, ForwardIcon, ChartBarIcon, ArrowLeftIcon, ListBulletIcon } from '@heroicons/react/24/solid'
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

  // Calculate results
  const totalQuestions = questions.length
  const answeredQuestions = answers.filter(answer => answer !== undefined).length
  const correctAnswers = answers.filter((answer, index) => answer === questions[index].correctAnswer).length
  const score = Math.round((correctAnswers / totalQuestions) * 100)
  const passed = score >= 75 // 15 out of 20 is exactly 75%

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  // --- REVIEW MODE VIEW ---
  if (showReview) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8 animate-enter px-4">
        {/* Review Header */}
        <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-soft mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800">Review Answers</h2>
            <p className="text-slate-500 font-medium">Question {currentReviewQuestion + 1} of {totalQuestions}</p>
          </div>
          <button
            onClick={() => setShowReview(false)}
            className="px-6 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all flex items-center gap-2"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Score
          </button>
        </div>

        {/* Question Component */}
        <div className="bg-white p-6 md:p-10 rounded-[2rem] border-2 border-slate-200 shadow-soft">
          <TestQuestion
            question={questions[currentReviewQuestion]}
            selectedAnswer={answers[currentReviewQuestion]}
            onAnswerSelect={() => {}} // Disabled in review mode
            questionNumber={currentReviewQuestion + 1}
            totalQuestions={questions.length}
            showCorrectAnswer={true}
          />
          
          {/* Navigation Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t-2 border-slate-100 gap-6">
            <button
              onClick={() => setCurrentReviewQuestion(Math.max(0, currentReviewQuestion - 1))}
              disabled={currentReviewQuestion === 0}
              className="w-full md:w-auto px-8 py-4 rounded-xl font-extrabold text-slate-600 bg-white border-2 border-slate-200 border-b-[6px] hover:bg-slate-50 active:border-b-[2px] active:translate-y-[4px] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>
            
            {/* Quick jump dots */}
            <div className="flex flex-wrap justify-center gap-2 max-w-[200px] md:max-w-md">
              {questions.map((_, index) => {
                const isCorrect = answers[index] === questions[index].correctAnswer;
                const isCurrent = index === currentReviewQuestion;
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentReviewQuestion(index)}
                    className={`w-10 h-10 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center ${
                      isCurrent
                        ? 'bg-slate-800 text-white shadow-lg scale-110'
                        : isCorrect
                        ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                        : 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                )
              })}
            </div>
            
            <button
              onClick={() => setCurrentReviewQuestion(Math.min(questions.length - 1, currentReviewQuestion + 1))}
              disabled={currentReviewQuestion === questions.length - 1}
              className="w-full md:w-auto px-8 py-4 rounded-xl font-extrabold text-white bg-teal-500 border-2 border-teal-600 border-b-[6px] hover:bg-teal-400 active:border-b-[2px] active:translate-y-[4px] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    )
  }

  // --- SCORE SUMMARY VIEW ---
  return (
    <div className="w-full max-w-3xl mx-auto mt-8 animate-enter px-4">
      <AdZone position="results-header" />

      <div className={`mt-8 p-8 md:p-12 rounded-[2rem] border-4 text-center relative overflow-hidden ${
        passed 
          ? 'bg-emerald-50 border-emerald-400' 
          : 'bg-rose-50 border-rose-400'
      }`}>
        
        {/* Big Celebration/Warning Emoji */}
        <div className="text-7xl mb-6 animate-bounce">
          {passed ? '🏆' : '📚'}
        </div>

        <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-4 ${passed ? 'text-emerald-800' : 'text-rose-800'}`}>
          {passed ? "You Passed!" : "Keep Practicing!"}
        </h2>
        
        <p className={`text-xl font-bold mb-8 ${passed ? 'text-emerald-600/80' : 'text-rose-600/80'}`}>
          You scored {correctAnswers} out of {totalQuestions}
        </p>

        {/* The Big Score Card */}
        <div className="bg-white rounded-3xl p-8 shadow-soft border-2 border-slate-100 max-w-sm mx-auto mb-10">
          <div className="relative flex items-center justify-center mb-6">
            <svg className="w-48 h-48 transform -rotate-90">
              <circle
                cx="96" cy="96" r="84"
                stroke="currentColor" strokeWidth="16" fill="transparent"
                className="text-slate-100"
              />
              <circle
                cx="96" cy="96" r="84"
                stroke="currentColor" strokeWidth="16" fill="transparent"
                strokeDasharray="527.7"
                strokeDashoffset={527.7 - (527.7 * score) / 100}
                strokeLinecap="round"
                className={`${passed ? 'text-emerald-500' : 'text-rose-500'} transition-all duration-1000 ease-out`}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className={`text-6xl font-black ${passed ? 'text-emerald-600' : 'text-rose-600'}`}>
                {score}%
              </span>
            </div>
          </div>
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mt-6 border-t-2 border-slate-100 pt-6">
             <div className="bg-slate-50 p-4 rounded-2xl">
               <div className="text-2xl font-black text-slate-800">{formatTime(timeTaken)}</div>
               <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Time Taken</div>
             </div>
             <div className="bg-slate-50 p-4 rounded-2xl">
               <div className="text-2xl font-black text-blue-500">{answeredQuestions}</div>
               <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Answered</div>
             </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
          <button
            onClick={() => setShowReview(true)}
            className="flex-1 flex items-center justify-center gap-2 px-8 py-5 rounded-2xl font-extrabold text-white bg-slate-800 border-2 border-slate-900 border-b-[6px] hover:bg-slate-700 active:border-b-[2px] active:translate-y-[4px] transition-all"
          >
            <ListBulletIcon className="w-6 h-6" />
            Review Answers
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="flex-1 flex items-center justify-center gap-2 px-8 py-5 rounded-2xl font-extrabold text-white bg-teal-500 border-2 border-teal-600 border-b-[6px] hover:bg-teal-400 active:border-b-[2px] active:translate-y-[4px] transition-all"
          >
            <ArrowPathIcon className="w-6 h-6" />
            Take Another Test
          </button>
        </div>

        {/* Dashboard Link */}
        <div className="mt-8 pt-6 border-t-2 border-emerald-200/50">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-600 font-bold hover:text-teal-700 transition-colors">
            <ChartBarIcon className="w-5 h-5" />
            View My Overall Progress
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <AdZone position="results-bottom" />
      </div>
    </div>
  )
}
