'use client'

import Link from 'next/link'
import { ArrowPathIcon, ForwardIcon, ChartBarIcon } from '@heroicons/react/24/solid'

interface TestResultsProps {
  score: number
  totalQuestions: number
  onRetake: () => void
  category?: string
}

export default function TestResults({ score, totalQuestions, onRetake, category = 'all' }: TestResultsProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const passed = percentage >= 75; // 15 out of 20 is exactly 75%

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 animate-enter">
      <div className={`p-8 md:p-12 rounded-[2rem] border-4 text-center relative overflow-hidden ${
        passed 
          ? 'bg-emerald-50 border-emerald-400' 
          : 'bg-rose-50 border-rose-400'
      }`}>
        
        {/* Big Celebration/Warning Emoji */}
        <div className="text-7xl mb-6 animate-bounce">
          {passed ? '🏆' : '📚'}
        </div>

        <h2 className={`text-4xl font-extrabold tracking-tight mb-4 ${passed ? 'text-emerald-800' : 'text-rose-800'}`}>
          {passed ? "You Passed!" : "Keep Practicing!"}
        </h2>
        
        <p className={`text-xl font-bold mb-8 ${passed ? 'text-emerald-600/80' : 'text-rose-600/80'}`}>
          You scored {score} out of {totalQuestions}
        </p>

        {/* The Big Score Card */}
        <div className="bg-white rounded-3xl p-8 shadow-soft border-2 border-slate-100 max-w-xs mx-auto mb-10">
          <div className="relative flex items-center justify-center">
            {/* SVG Progress Circle */}
            <svg className="w-40 h-40 transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-slate-100"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray="439.8"
                strokeDashoffset={439.8 - (439.8 * percentage) / 100}
                strokeLinecap="round"
                className={`${passed ? 'text-emerald-500' : 'text-rose-500'} transition-all duration-1000 ease-out`}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className={`text-5xl font-black ${passed ? 'text-emerald-600' : 'text-rose-600'}`}>
                {percentage}%
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onRetake}
            className="flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-extrabold text-slate-600 bg-white border-2 border-slate-200 border-b-[6px] hover:bg-slate-50 active:border-b-[2px] active:translate-y-[4px] transition-all"
          >
            <ArrowPathIcon className="w-6 h-6" />
            Try Again
          </button>
          
          <Link
            href="/practice"
            className="flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-extrabold text-white bg-teal-500 border-2 border-teal-600 border-b-[6px] hover:bg-teal-400 active:border-b-[2px] active:translate-y-[4px] transition-all"
          >
            More Tests
            <ForwardIcon className="w-6 h-6" />
          </Link>
        </div>

        {/* Dashboard Link for Logged in Users */}
        <div className="mt-8 pt-6 border-t-2 border-slate-200/50">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-500 font-bold hover:text-teal-600 transition-colors">
            <ChartBarIcon className="w-5 h-5" />
            View My Overall Progress
          </Link>
        </div>

      </div>
    </div>
  )
}
