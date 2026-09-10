'use client'

import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'

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
    <div className="w-full max-w-3xl mx-auto space-y-8 animate-enter mt-8">
      
      {/* Playful Header */}
      <div className="flex items-center justify-between">
        <div className="bg-slate-200 text-slate-600 font-bold px-4 py-1.5 rounded-2xl uppercase tracking-widest text-sm">
          Question {questionNumber} of {totalQuestions}
        </div>
      </div>

      {/* Massive, bold question text */}
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 leading-tight">
          {question.question}
        </h2>
      </div>

      {/* Chunky, Gamified Options */}
      <div className="grid grid-cols-1 gap-4" role="radiogroup">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrectOption = index === question.correctAnswer;
          const optionId = `question-${question.id}-option-${index}`;

          // Base classes for the 3D block look
          let optionClasses = "block w-full p-5 rounded-2xl border-2 cursor-pointer transition-all duration-150 text-left relative outline-none select-none";
          
          if (showResult) {
            // RESULT STATE
            if (isCorrectOption) {
              optionClasses += " bg-emerald-100 border-emerald-500 text-emerald-900 shadow-3d-success translate-y-0";
            } else if (isSelected && !isCorrect) {
              optionClasses += " bg-rose-100 border-rose-500 text-rose-900 shadow-3d-error translate-y-0";
            } else {
              optionClasses += " bg-slate-50 border-slate-200 text-slate-400 opacity-60";
            }
          } else {
            // INTERACTIVE STATE
            if (isSelected) {
              // The "Pressed" state - shadow goes to 0, box moves down
              optionClasses += " bg-teal-50 border-teal-500 text-teal-900 translate-y-1";
            } else {
              // Default state - high shadow, moves down when actively clicked
              optionClasses += " bg-white border-slate-300 text-slate-700 shadow-3d hover:bg-slate-50 hover:shadow-3d-hover hover:-translate-y-0.5 active:shadow-3d-active active:translate-y-1";
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
              />
              
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  {/* Option Letter Badge (A, B, C, D) */}
                  <div className={`w-8 h-8 rounded-lg flex flex-shrink-0 items-center justify-center font-bold text-lg transition-colors duration-150 ${
                     showResult 
                      ? isCorrectOption ? "bg-emerald-500 text-white" : isSelected && !isCorrect ? "bg-rose-500 text-white" : "bg-slate-200 text-slate-400"
                      : isSelected ? "bg-teal-500 text-white" : "bg-slate-100 text-slate-500"
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  
                  <span className="text-lg md:text-xl font-bold leading-snug">{option}</span>
                </div>
                
                {/* Result Icons */}
                {showResult && isCorrectOption && (
                  <CheckCircleIcon className="h-8 w-8 text-emerald-500 flex-shrink-0 animate-bounce" />
                )}
                {showResult && isSelected && !isCorrect && (
                  <XCircleIcon className="h-8 w-8 text-rose-500 flex-shrink-0" />
                )}
              </div>
            </label>
          )
        })}
      </div>

      {/* Gamified Explanation Banner */}
      {showResult && hasAnswered && question.explanation && (
        <div aria-live="polite" className="mt-8 p-6 bg-amber-50 border-2 border-amber-200 rounded-2xl relative overflow-hidden animate-slide-up">
          <div className="absolute top-0 left-0 w-2 h-full bg-amber-400"></div>
          <h3 className="text-amber-800 font-extrabold flex items-center gap-2 mb-2 text-lg">
            <span>💡</span> Did you know?
          </h3>
          <p className="text-amber-900 leading-relaxed font-semibold text-lg">
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  )
}
