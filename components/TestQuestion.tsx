'use client'

import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

interface TestQuestionProps {
  question: {
    id: number
    question: string
    options: string[]
    correctAnswer: number
    explanation: string
  }
  selectedAnswer?: number
  onAnswerSelect: (answerIndex: number) => void
  questionNumber: number
  totalQuestions: number
  showCorrectAnswer?: boolean
}

export default function TestQuestion({
  question,
  selectedAnswer,
  onAnswerSelect,
  questionNumber,
  totalQuestions,
  showCorrectAnswer = false
}: TestQuestionProps) {
  const isCorrect = selectedAnswer === question.correctAnswer
  const hasAnswered = selectedAnswer !== undefined
  const showResult = showCorrectAnswer && hasAnswered

  return (
    <div className="space-y-6">
      {/* Question Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-500">Question {questionNumber}</span>
          <span className="text-sm text-gray-400">of {totalQuestions}</span>
        </div>
        {hasAnswered && showCorrectAnswer && (
          <div className="flex items-center space-x-2">
            {isCorrect ? (
              <div className="flex items-center space-x-1 text-green-600">
                <CheckCircleIcon className="h-4 w-4" />
                <span className="text-sm font-medium">Correct</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 text-red-600">
                <XCircleIcon className="h-4 w-4" />
                <span className="text-sm font-medium">Incorrect</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Question Text */}
      <div>
        <h2 
          className="text-lg font-medium text-gray-900 leading-relaxed"
          id={`question-${questionNumber}`}
          aria-label={`Question ${questionNumber} of ${totalQuestions}`}
        >
          {question.question}
        </h2>
      </div>

      {/* Answer Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index
          const isCorrectOption = index === question.correctAnswer

          let optionClasses = "w-full p-4 border rounded-lg cursor-pointer transition-all duration-200 text-left"
          
          if (showResult) {
            if (isCorrectOption) {
              optionClasses += " bg-green-50 border-green-300 text-green-900"
            } else if (isSelected && !isCorrect) {
              optionClasses += " bg-red-50 border-red-300 text-red-900"
            } else {
              optionClasses += " bg-gray-50 border-gray-200 text-gray-600"
            }
          } else {
            if (isSelected) {
              optionClasses += " bg-primary-50 border-primary-300 text-primary-900"
            } else {
              optionClasses += " bg-white border-gray-300 hover:border-primary-300 hover:bg-primary-50"
            }
          }

          return (
            <div
              key={index}
              className={optionClasses}
              onClick={() => !showResult && onAnswerSelect(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  if (!showResult) onAnswerSelect(index)
                }
              }}
              role="button"
              tabIndex={showResult ? -1 : 0}
              aria-label={`Option ${String.fromCharCode(65 + index)}: ${option}`}
              aria-pressed={isSelected}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    showResult
                      ? isCorrectOption
                        ? "border-green-500 bg-green-500"
                        : isSelected && !isCorrect
                        ? "border-red-500 bg-red-500"
                        : "border-gray-300"
                      : isSelected
                      ? "border-primary-500 bg-primary-500"
                      : "border-gray-300"
                  }`}>
                    {showResult ? (
                      isCorrectOption ? (
                        <CheckCircleIcon className="h-4 w-4 text-white" />
                      ) : isSelected && !isCorrect ? (
                        <XCircleIcon className="h-4 w-4 text-white" />
                      ) : null
                    ) : isSelected ? (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    ) : null}
                  </div>
                  <span className="font-medium">{String.fromCharCode(65 + index)}.</span>
                  <span>{option}</span>
                </div>
                
                {showResult && isCorrectOption && (
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                )}
                {showResult && isSelected && !isCorrect && (
                  <XCircleIcon className="h-5 w-5 text-red-500" />
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Explanation */}
      {showResult && hasAnswered && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Explanation:</h3>
          <p className="text-sm text-blue-800 leading-relaxed">
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  )
}
