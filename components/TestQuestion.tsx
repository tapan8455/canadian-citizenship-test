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
    <fieldset className="space-y-8 animate-enter">
      {/* Top Header - Question Progress & Status */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <legend className="flex items-baseline space-x-2">
          <span className="text-sm font-bold tracking-wide uppercase text-primary-600">Question {questionNumber}</span>
          <span className="text-sm font-medium text-slate-400">/ {totalQuestions}</span>
        </legend>
        
        {/* Status Indicator */}
        {hasAnswered && showCorrectAnswer && (
          <div aria-live="polite" className="flex items-center space-x-2 animate-fade-in">
            {isCorrect ? (
              <div className="flex items-center space-x-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                <CheckCircleIcon className="h-5 w-5" />
                <span className="text-sm font-bold tracking-wide">Correct</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1.5 px-3 py-1 bg-rose-100 text-rose-700 rounded-full">
                <XCircleIcon className="h-5 w-5" />
                <span className="text-sm font-bold tracking-wide">Incorrect</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Question Text */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 leading-snug">
          {question.question}
        </h2>
      </div>

      {/* Answer Options */}
      <div className="space-y-4" role="radiogroup" aria-labelledby={`question-${questionNumber}`}>
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrectOption = index === question.correctAnswer;
          const optionId = `question-${question.id}-option-${index}`;

          // Base styles for the label: thicker border, rounded-xl, smooth transition
          let optionClasses = "block w-full p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 text-left relative focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2";
          
          if (showResult) {
            if (isCorrectOption) {
              optionClasses += " bg-emerald-50 border-emerald-400 text-emerald-900 shadow-sm";
            } else if (isSelected && !isCorrect) {
              optionClasses += " bg-rose-50 border-rose-300 text-rose-900";
            } else {
              optionClasses += " bg-slate-50/50 border-slate-200 text-slate-500 opacity-60";
            }
          } else {
            if (isSelected) {
              optionClasses += " bg-primary-50 border-primary-500 text-primary-900 shadow-[0_0_15px_rgba(20,184,166,0.15)] -translate-y-0.5";
            } else {
              optionClasses += " bg-white border-slate-200 hover:border-primary-300 hover:bg-slate-50 hover:shadow-soft hover:-translate-y-0.5 text-slate-700";
            }
          }

          return (
            <label key={index} htmlFor={optionId} className={optionClasses}>
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
              
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  {/* Custom Radio Circle */}
                  <div className={`w-7 h-7 rounded-full border-2 flex flex-shrink-0 items-center justify-center transition-colors duration-300 ${
                    showResult
                      ? isCorrectOption
                        ? "border-emerald-500 bg-emerald-500"
                        : isSelected && !isCorrect
                        ? "border-rose-500 bg-rose-500"
                        : "border-slate-300"
                      : isSelected
                      ? "border-primary-500 bg-primary-500"
                      : "border-slate-300 bg-white"
                  }`}>
                    {showResult ? (
                      isCorrectOption ? (
                        <CheckCircleIcon className="h-5 w-5 text-white" />
                      ) : isSelected && !isCorrect ? (
                        <XCircleIcon className="h-5 w-5 text-white" />
                      ) : null
                    ) : isSelected ? (
                      <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                    ) : null}
                  </div>
                  
                  {/* Option Text */}
                  <span className="font-semibold text-lg flex-shrink-0 opacity-50">{String.fromCharCode(65 + index)}.</span>
                  <span className="text-base md:text-lg font-medium leading-snug pt-0.5">{option}</span>
                </div>
                
                {/* Visual success/fail markers for the right side */}
                {showResult && isCorrectOption && (
                  <CheckCircleIcon id={`${optionId}-status`} className="h-7 w-7 text-emerald-500 flex-shrink-0 animate-fade-in" />
                )}
                {showResult && isSelected && !isCorrect && (
                  <XCircleIcon className="h-7 w-7 text-rose-500 flex-shrink-0 animate-fade-in" />
                )}
              </div>
            </label>
          )
        })}
      </div>

      {/* Modern Explanation Box */}
      {showResult && hasAnswered && question.explanation && (
        <div aria-live="polite" className="mt-8 p-6 bg-slate-100 border border-slate-200 rounded-2xl animate-slide-up">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">Explanation</h3>
          <p className="text-base text-slate-800 leading-relaxed font-medium">
            {question.explanation}
          </p>
        </div>
      )}
    </fieldset>
  )
}
