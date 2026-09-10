import Link from 'next/link'
import { QuestionMarkCircleIcon, BookOpenIcon, ChartBarIcon } from '@heroicons/react/24/solid'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdZone from '@/components/AdZone'
import Script from 'next/script'

export const metadata = {
  title: 'Canadian Citizenship Test FAQ - Frequently Asked Questions',
  description: 'Find answers to the most frequently asked questions about the Canadian citizenship test, eligibility, preparation, and the application process.',
  alternates: {
    canonical: 'https://www.citizentestcanada.com/faq',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const faqs = [
  {
    question: 'What is the Canadian citizenship test?',
    answer: 'The Canadian citizenship test is a written test that assesses your knowledge of Canada, including its history, geography, government, and the rights and responsibilities of citizenship. It consists of 20 multiple-choice or true/false questions, and you need to answer at least 15 correctly (75%) to pass.'
  },
  {
    question: 'Who needs to take the citizenship test?',
    answer: 'Most applicants between the ages of 18 and 54 must take the citizenship test. Children under 18 and adults 55 and older are not required to take the test, but they must still meet other citizenship requirements.'
  },
  {
    question: 'How long is the citizenship test?',
    answer: 'You have 45 minutes to complete the 20-question test. The test is usually conducted on a computer, and you receive your results immediately.'
  },
  {
    question: 'What happens if I fail the citizenship test?',
    answer: 'If you don\'t pass the test, you can retake it after 4-8 weeks. You\'ll receive a letter with the date and time for your retest. If you fail the second attempt, you may need to attend a hearing with a citizenship officer.'
  }
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Script
        id="faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
      <Header />
      
      <main className="flex-grow max-w-4xl mx-auto px-4 py-12 w-full animate-enter">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 text-indigo-600 rounded-3xl mb-6 shadow-soft">
            <QuestionMarkCircleIcon className="w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
            Find answers to the most common questions about the test and application process.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-6 mb-12">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-6 md:p-8 rounded-[2rem] border-2 border-slate-100 shadow-soft hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-start gap-3">
                <span className="text-indigo-500 text-2xl leading-none">Q.</span>
                {faq.question}
              </h3>
              <p className="text-slate-500 font-medium leading-relaxed pl-8">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <AdZone position="faq-content" />

        {/* CTA Banner */}
        <div className="mt-12 bg-slate-800 rounded-[2rem] p-8 md:p-12 text-center shadow-soft">
          <h2 className="text-3xl font-black text-white mb-4">Need More Help?</h2>
          <p className="text-slate-300 font-medium mb-8 max-w-xl mx-auto">
            The best way to prepare is to just jump in. Don&apos;t worry if you get things wrong—that&apos;s how you learn!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/practice"
              className="px-8 py-4 rounded-xl font-extrabold text-white bg-teal-500 border-2 border-teal-600 border-b-[6px] hover:bg-teal-400 active:border-b-[2px] active:translate-y-[4px] transition-all flex items-center justify-center gap-2"
            >
              <BookOpenIcon className="h-6 w-6" />
              Take Practice Tests
            </Link>
            <Link 
              href="/progress"
              className="px-8 py-4 rounded-xl font-extrabold text-slate-700 bg-white border-2 border-slate-200 border-b-[6px] hover:bg-slate-50 active:border-b-[2px] active:translate-y-[4px] transition-all flex items-center justify-center gap-2"
            >
              <ChartBarIcon className="h-6 w-6" />
              Go to Dashboard
            </Link>
          </div>
        </div>

      </main>
      
      <AdZone position="faq-bottom" />
      <Footer />
    </div>
  )
}