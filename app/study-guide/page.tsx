'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdZone from '@/components/AdZone'
import Link from 'next/link'

export default function StudyGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Study Guide</h1>
          <p className="text-gray-700 mb-8">
            Comprehensive resources to help you prepare for the Canadian Citizenship Test. 
            Use this guide alongside our practice tests for the best results.
          </p>

          {/* Quick Navigation */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Navigation</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/practice/general" className="btn-primary text-center">
                Practice Tests
              </Link>
              <Link href="/progress" className="btn-secondary text-center">
                View Progress
              </Link>
            </div>
          </div>

          {/* Test Overview */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Overview</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Test Format</h3>
                                 <ul className="text-gray-700 space-y-1">
                   <li>• 20 multiple choice or true/false questions</li>
                   <li>• 45 minutes time limit</li>
                   <li>• 15 correct answers to pass (75%)</li>
                   <li>• Questions from Discover Canada guide</li>
                 </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Topics Covered</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Canadian history and geography</li>
                  <li>• Government and democracy</li>
                  <li>• Rights and responsibilities</li>
                  <li>• Canadian symbols and culture</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Study Categories */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Canadian History</h2>
                             <p className="text-gray-700 mb-4">
                 Learn about Canada&apos;s rich history from Indigenous peoples to modern times.
               </p>
              <h3 className="font-semibold text-gray-800 mb-2">Key Topics:</h3>
              <ul className="text-gray-700 space-y-1 mb-4">
                <li>• Indigenous peoples and early settlers</li>
                <li>• Confederation and nation building</li>
                <li>• World Wars and modern Canada</li>
                <li>• Important historical figures</li>
              </ul>
              <Link href="/practice/history" className="btn-primary">
                Practice History
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Government & Democracy</h2>
                             <p className="text-gray-700 mb-4">
                 Understand Canada&apos;s parliamentary democracy and political system.
               </p>
              <h3 className="font-semibold text-gray-800 mb-2">Key Topics:</h3>
              <ul className="text-gray-700 space-y-1 mb-4">
                <li>• Parliamentary system and elections</li>
                <li>• Federal, provincial, and municipal government</li>
                <li>• Constitution and Charter of Rights</li>
                <li>• Political parties and voting</li>
              </ul>
              <Link href="/practice/government" className="btn-primary">
                Practice Government
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Geography & Regions</h2>
                             <p className="text-gray-700 mb-4">
                 Explore Canada&apos;s diverse geography, provinces, and territories.
               </p>
              <h3 className="font-semibold text-gray-800 mb-2">Key Topics:</h3>
              <ul className="text-gray-700 space-y-1 mb-4">
                <li>• Provinces and territories</li>
                <li>• Major cities and landmarks</li>
                <li>• Natural resources and climate</li>
                <li>• Indigenous territories</li>
              </ul>
              <Link href="/practice/geography" className="btn-primary">
                Practice Geography
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Rights & Responsibilities</h2>
              <p className="text-gray-700 mb-4">
                Learn about your rights as a Canadian citizen and civic responsibilities.
              </p>
              <h3 className="font-semibold text-gray-800 mb-2">Key Topics:</h3>
              <ul className="text-gray-700 space-y-1 mb-4">
                <li>• Charter of Rights and Freedoms</li>
                <li>• Voting and civic participation</li>
                <li>• Obeying laws and paying taxes</li>
                <li>• Respecting others&apos; rights</li>
              </ul>
              <Link href="/practice/rights" className="btn-primary">
                Practice Rights
              </Link>
            </div>
          </div>

          {/* Study Tips */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Study Tips</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Before the Test</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Read the Discover Canada guide thoroughly</li>
                  <li>• Take practice tests regularly</li>
                  <li>• Focus on areas where you struggle</li>
                  <li>• Get plenty of rest the night before</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">During the Test</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Read each question carefully</li>
                  <li>• Eliminate obviously wrong answers</li>
                  <li>• Don&apos;t spend too long on one question</li>
                  <li>• Review your answers if time permits</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Resources</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Official Resources</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• <a href="https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/discover-canada.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Discover Canada: The Rights and Responsibilities of Citizenship</a></li>
                  <li>• <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/become-canadian-citizen/citizenship-test.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Official Citizenship Test Information</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Practice Resources</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Take our <Link href="/practice/full" className="text-blue-600 hover:underline">full-length practice test</Link></li>
                  <li>• Review your <Link href="/progress" className="text-blue-600 hover:underline">progress and results</Link></li>
                  <li>• Practice by specific categories</li>
                </ul>
              </div>
            </div>
          </div>

          <AdZone position="study-guide" />
        </div>
      </main>

      <Footer />
    </div>
  )
}
