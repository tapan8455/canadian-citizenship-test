import Link from 'next/link'
import { QuestionMarkCircleIcon, BookOpenIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdZone from '@/components/AdZone'

export const metadata = {
  title: 'Canadian Citizenship Test FAQ - Frequently Asked Questions',
  description: 'Find answers to the most frequently asked questions about the Canadian citizenship test, eligibility, preparation, and the application process.',
  keywords: [
    'Canadian citizenship test FAQ',
    'citizenship test questions',
    'Canada citizenship exam FAQ',
    'citizenship test preparation',
    'Canadian citizenship requirements'
  ]
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
    question: 'What topics are covered on the test?',
    answer: 'The test covers Canadian history, geography, government structure, rights and responsibilities of citizenship, Canadian symbols, and current events. All questions are based on the official study guide "Discover Canada: The Rights and Responsibilities of Citizenship."'
  },
  {
    question: 'How do I prepare for the citizenship test?',
    answer: 'Start by reading the official study guide "Discover Canada" thoroughly. Take practice tests to familiarize yourself with the format and identify weak areas. Study regularly, create flashcards for important dates and facts, and consider joining study groups or taking preparation classes.'
  },
  {
    question: 'What happens if I fail the citizenship test?',
    answer: 'If you don\'t pass the test, you can retake it after 4-8 weeks. You\'ll receive a letter with the date and time for your retest. If you fail the second attempt, you may need to attend a hearing with a citizenship officer.'
  },
  {
    question: 'How long does it take to become a Canadian citizen?',
    answer: 'The entire process typically takes 12-18 months from the time you submit your application. This includes processing time, the citizenship test, and the citizenship ceremony.'
  },
  {
    question: 'What are the eligibility requirements for citizenship?',
    answer: 'You must be a permanent resident, have lived in Canada for at least 1,095 days (3 years) in the 5 years before applying, have filed your taxes, pass a language test (if required), and pass the citizenship test.'
  },
  {
    question: 'Do I need to speak English or French?',
    answer: 'Yes, you must demonstrate adequate knowledge of English or French. This is usually assessed through your citizenship test and interview. If you\'re between 18-54, you may need to provide language test results.'
  },
  {
    question: 'What documents do I need for the citizenship test?',
    answer: 'Bring your test invitation letter, permanent resident card, and another piece of government-issued photo identification (like a driver\'s license or passport).'
  },
  {
    question: 'Can I take the test in my native language?',
    answer: 'No, the citizenship test is only available in English and French. However, you can request an interpreter for the interview portion if needed.'
  },
  {
    question: 'What is the citizenship ceremony?',
    answer: 'The citizenship ceremony is the final step in becoming a Canadian citizen. During the ceremony, you\'ll take the Oath of Citizenship, receive your citizenship certificate, and officially become a Canadian citizen.'
  },
  {
    question: 'How much does it cost to apply for citizenship?',
    answer: 'The current fee for adult citizenship applications is $630 CAD, which includes a $530 processing fee and a $100 right of citizenship fee. There may be additional costs for language tests or other requirements.'
  },
  {
    question: 'Can I travel outside Canada during the application process?',
    answer: 'Yes, you can travel, but you must maintain your permanent resident status and meet the residency requirements. Make sure to keep track of your time in Canada and return for any required appointments.'
  },
  {
    question: 'What rights do I get as a Canadian citizen?',
    answer: 'Canadian citizens have the right to vote, run for political office, obtain a Canadian passport, and cannot be deported. You also have the right to live and work anywhere in Canada.'
  },
  {
    question: 'What are my responsibilities as a Canadian citizen?',
    answer: 'Responsibilities include obeying the law, paying taxes, voting in elections, serving on juries when called, and helping others in the community. You should also respect the rights and freedoms of others.'
  }
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <QuestionMarkCircleIcon className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to the most common questions about the Canadian citizenship test and application process
          </p>
        </div>

        {/* FAQ List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-8">
            <div className="space-y-8">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ad Zone */}
        <AdZone position="faq-content" />

        {/* Additional Resources */}
        <div className="bg-blue-50 rounded-lg p-8 mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need More Help?
          </h2>
          <p className="text-gray-600 mb-6">
            Explore our comprehensive resources to help you prepare for the citizenship test
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              href="/practice"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-flex items-center justify-center"
            >
              <BookOpenIcon className="h-5 w-5 mr-2" />
              Take Practice Tests
            </Link>
            <Link 
              href="/study-guide"
              className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 inline-flex items-center justify-center"
            >
              View Study Guide
            </Link>
            <Link 
              href="/progress"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 inline-flex items-center justify-center"
            >
              <ChartBarIcon className="h-5 w-5 mr-2" />
              Go to Dashboard
            </Link>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-100 rounded-lg p-8 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Official Resources
          </h3>
          <div className="space-y-2 text-gray-600">
            <p><strong>Government of Canada:</strong> <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/become-canadian-citizen/citizenship-test.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Official Citizenship Test Information</a></p>
            <p><strong>Study Guide:</strong> <a href="https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/discover-canada.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Discover Canada: The Rights and Responsibilities of Citizenship</a></p>
            <p><strong>Application Status:</strong> <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/application/check-status.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Check Your Application Status</a></p>
          </div>
        </div>
      </div>

      {/* Ad Zone */}
      <AdZone position="faq-bottom" />

      <Footer />
    </div>
  )
}
