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
  const isCorrect = selectedAnswer === question.correctAnswer;
  const hasAnswered = selectedAnswer !== undefined;
  const showResult = showCorrectAnswer && hasAnswered;

  return (
    <fieldset className="space-y-6">
      {/* Question Header & Screen-Reader Legend */}
      <div className="flex items-center justify-between">
        <legend className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-500">Question {questionNumber}</span>
          <span className="text-sm text-gray-400">of {totalQuestions}</span>
        </legend>
        
        {/* Status Indicator */}
        {hasAnswered && showCorrectAnswer && (
          <div aria-live="polite" className="flex items-center space-x-2">
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
        <h2 className="text-lg font-medium text-gray-900 leading-relaxed">
          {question.question}
        </h2>
      </div>

      {/* Answer Options as Native Radios */}
      <div className="space-y-3" role="radiogroup" aria-labelledby={`question-${questionNumber}`}>
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrectOption = index === question.correctAnswer;
          const optionId = `question-${question.id}-option-${index}`;

          // ADDED 'block' to force correct label layout rendering
          let optionClasses = "block w-full p-4 border rounded-lg cursor-pointer transition-all duration-200 text-left relative focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2";
          
          if (showResult) {
            if (isCorrectOption) {
              optionClasses += " bg-green-50 border-green-300 text-green-900";
            } else if (isSelected && !isCorrect) {
              optionClasses += " bg-red-50 border-red-300 text-red-900";
            } else {
              optionClasses += " bg-gray-50 border-gray-200 text-gray-600 opacity-75";
            }
          } else {
            if (isSelected) {
              optionClasses += " bg-primary-50 border-primary-300 text-primary-900";
            } else {
              optionClasses += " bg-white border-gray-300 hover:border-primary-300 hover:bg-primary-50";
            }
          }

          return (
            <label key={index} htmlFor={optionId} className={optionClasses}>
              {/* FIXED: Hides native input without causing visual clipping artifacts */}
              <input
                type="radio"
                id={optionId}
                name={`question-${question.id}`}
                value={index}
                checked={isSelected}
                onChange={() => !showResult && onAnswerSelect(index)}
                disabled={showResult}
                className="absolute opacity-0 w-0 h-0 appearance-none -z-10" 
                aria-describedby={showResult && isCorrectOption ? `${optionId}-status` : undefined}
              />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex flex-shrink-0 items-center justify-center ${
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
                  <span className="font-medium flex-shrink-0">{String.fromCharCode(65 + index)}.</span>
                  <span className="leading-snug">{option}</span>
                </div>
                
                {/* Visual success/fail markers for the end of the row */}
                {showResult && isCorrectOption && (
                  <CheckCircleIcon id={`${optionId}-status`} className="h-5 w-5 text-green-500 flex-shrink-0" />
                )}
                {showResult && isSelected && !isCorrect && (
                  <XCircleIcon className="h-5 w-5 text-red-500 flex-shrink-0" />
                )}
              </div>
            </label>
          )
        })}
      </div>

      {/* Explanation Box */}
      {showResult && hasAnswered && question.explanation && (
        <div aria-live="polite" className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Explanation:</h3>
          <p className="text-sm text-blue-800 leading-relaxed">
            {question.explanation}
          </p>
        </div>
      )}
    </fieldset>
  )
}
