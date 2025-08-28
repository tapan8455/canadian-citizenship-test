import { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdZone from '@/components/AdZone'

export const metadata: Metadata = {
  title: 'Canadian Citizenship Test Questions and Answers - Complete Guide',
  description: 'Get the most common Canadian citizenship test questions with detailed answers. Practice with real exam-style questions covering history, government, geography, and rights.',
  keywords: [
    'Canadian citizenship test questions',
    'citizenship test questions and answers',
    'Canada citizenship exam questions',
    'citizenship test practice questions',
    'Canadian citizenship test sample questions',
    'citizenship exam questions',
    'Canada citizenship test questions',
    'citizenship test questions 2024',
    'Canadian citizenship test practice',
    'citizenship test questions free'
  ],
  alternates: {
    canonical: 'https://citizentestcanada.com/blog/canadian-citizenship-test-questions',
  },
}

export default function CitizenshipTestQuestionsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <article className="bg-white rounded-lg shadow-lg p-8">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Canadian Citizenship Test Questions and Answers: Complete Guide
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                Published on {new Date().toLocaleDateString('en-CA', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <span>By CitizenTest Canada Team</span>
                <span className="mx-2">•</span>
                <span>15 min read</span>
              </div>
            </header>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 mb-6">
                Preparing for the Canadian Citizenship Test? This comprehensive guide provides you with the most common 
                questions and detailed answers to help you succeed. Our practice questions are based on the official 
                Discover Canada study guide and reflect the actual test format.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Understanding the Canadian Citizenship Test Format
              </h2>
              <p className="text-gray-700 mb-4">
                The Canadian Citizenship Test consists of 20 multiple-choice or true/false questions. You have 45 minutes 
                to complete the test, and you need to answer at least 15 questions correctly (75%) to pass. All questions 
                are based on the official study guide "Discover Canada: The Rights and Responsibilities of Citizenship."
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                <h3 className="font-semibold text-blue-900 mb-2">Test Format Summary:</h3>
                <ul className="text-blue-800 space-y-1">
                  <li>• <strong>Number of Questions:</strong> 20</li>
                  <li>• <strong>Time Limit:</strong> 45 minutes</li>
                  <li>• <strong>Passing Score:</strong> 15 correct answers (75%)</li>
                  <li>• <strong>Question Types:</strong> Multiple choice and true/false</li>
                  <li>• <strong>Language:</strong> English or French</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Most Common Canadian Citizenship Test Questions
              </h2>
              <p className="text-gray-700 mb-6">
                Based on our analysis of thousands of practice tests and official resources, here are the most frequently 
                asked questions on the Canadian Citizenship Test:
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                1. What are the three main groups of Aboriginal peoples in Canada?
              </h3>
              <p className="text-gray-700 mb-4">
                <strong>Answer:</strong> First Nations, Inuit, and Métis
              </p>
              <p className="text-gray-600 mb-6">
                This is one of the most fundamental questions about Canadian history and identity. Understanding the 
                diversity of Indigenous peoples is crucial for the test. The three groups have distinct histories, 
                cultures, and contributions to Canadian society.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                2. What is the capital city of Canada?
              </h3>
              <p className="text-gray-700 mb-4">
                <strong>Answer:</strong> Ottawa
              </p>
              <p className="text-gray-600 mb-6">
                While Toronto is the largest city, Ottawa is the capital. This question tests basic Canadian geography 
                knowledge. Ottawa was chosen as the capital in 1857 by Queen Victoria and is home to Parliament Hill.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                3. What are the three levels of government in Canada?
              </h3>
              <p className="text-gray-700 mb-4">
                <strong>Answer:</strong> Federal, Provincial/Territorial, and Municipal
              </p>
              <p className="text-gray-600 mb-6">
                Understanding Canada's federal system is essential for citizenship. Each level has different 
                responsibilities and powers. The federal government handles national issues, provinces manage 
                regional matters, and municipalities handle local services.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                4. What is the significance of the Canadian Charter of Rights and Freedoms?
              </h3>
              <p className="text-gray-700 mb-4">
                <strong>Answer:</strong> It guarantees fundamental rights and freedoms to all Canadians
              </p>
              <p className="text-gray-600 mb-6">
                The Charter is a cornerstone of Canadian democracy and protects individual rights from government 
                interference. It was enacted in 1982 and includes rights such as freedom of speech, religion, 
                and equality before the law.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                5. What are the three branches of government?
              </h3>
              <p className="text-gray-700 mb-4">
                <strong>Answer:</strong> Executive, Legislative, and Judicial
              </p>
              <p className="text-gray-600 mb-6">
                This question tests understanding of how Canadian democracy works and the separation of powers. 
                The executive branch implements laws, the legislative branch makes laws, and the judicial branch 
                interprets laws.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                6. What is the significance of the date July 1, 1867?
              </h3>
              <p className="text-gray-700 mb-4">
                <strong>Answer:</strong> Confederation - the birth of Canada as a country
              </p>
              <p className="text-gray-600 mb-6">
                This is a crucial date in Canadian history when the British North America Act created the Dominion 
                of Canada. It's celebrated as Canada Day and marks the beginning of Canada as a self-governing nation.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                7. What are the three territories of Canada?
              </h3>
              <p className="text-gray-700 mb-4">
                <strong>Answer:</strong> Northwest Territories, Nunavut, and Yukon
              </p>
              <p className="text-gray-600 mb-6">
                Understanding the difference between provinces and territories is important. Territories have 
                different governance structures and are primarily in the northern regions of Canada.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                8. What is the role of the Governor General?
              </h3>
              <p className="text-gray-700 mb-4">
                <strong>Answer:</strong> The representative of the Queen in Canada
              </p>
              <p className="text-gray-600 mb-6">
                The Governor General is the Queen's representative in Canada and performs ceremonial duties. 
                They also have constitutional responsibilities such as giving royal assent to bills.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                9. What are the official languages of Canada?
              </h3>
              <p className="text-gray-700 mb-4">
                <strong>Answer:</strong> English and French
              </p>
              <p className="text-gray-600 mb-6">
                Canada is officially bilingual, reflecting its history and cultural diversity. Both languages 
                have equal status in federal institutions and services.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                10. What is the significance of the maple leaf on the Canadian flag?
              </h3>
              <p className="text-gray-700 mb-4">
                <strong>Answer:</strong> It is a symbol of Canada and Canadian identity
              </p>
              <p className="text-gray-600 mb-6">
                The maple leaf has been a symbol of Canada since the 18th century and represents Canadian 
                values, nature, and national identity. The current flag was adopted in 1965.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Study Tips for Success
              </h2>
              <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
                <h3 className="font-semibold text-green-900 mb-2">Effective Study Strategies:</h3>
                <ul className="text-green-800 space-y-1">
                  <li>• Read the Discover Canada guide thoroughly</li>
                  <li>• Take practice tests regularly</li>
                  <li>• Focus on understanding concepts, not just memorizing</li>
                  <li>• Study in short, focused sessions</li>
                  <li>• Review areas where you make mistakes</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Common Mistakes to Avoid
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li><strong>Not reading the official guide:</strong> Relying only on practice tests without understanding the source material</li>
                <li><strong>Memorizing without understanding:</strong> Focus on understanding concepts rather than just memorizing facts</li>
                <li><strong>Ignoring current events:</strong> Stay informed about recent developments in Canadian politics and society</li>
                <li><strong>Not practicing enough:</strong> Take multiple practice tests to build confidence and familiarity</li>
                <li><strong>Rushing through questions:</strong> Take your time to read and understand each question carefully</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Additional Resources
              </h2>
              <p className="text-gray-700 mb-4">
                In addition to our practice platform, here are some valuable resources:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li><a href="https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/discover-canada.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Official Discover Canada Study Guide</a></li>
                <li><a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/become-canadian-citizen/citizenship-test.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Government of Canada Citizenship Test Information</a></li>
                <li><Link href="/study-guide" className="text-blue-600 hover:underline">Our Comprehensive Study Guide</Link></li>
                <li><Link href="/practice" className="text-blue-600 hover:underline">Free Practice Tests</Link></li>
              </ul>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-8">
                <h3 className="font-semibold text-yellow-900 mb-2">Ready to Practice?</h3>
                <p className="text-yellow-800 mb-4">
                  Take advantage of our free practice tests to prepare for your Canadian Citizenship Test. 
                  Our questions are designed to match the official test format and difficulty level.
                </p>
                <Link href="/practice" className="inline-block bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                  Start Free Practice Test
                </Link>
              </div>
            </div>
          </article>
        </div>
      </main>

      <AdZone position="blog-content" />
      <Footer />
    </div>
  )
}
