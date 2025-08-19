'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdZone from '@/components/AdZone'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">About Canadian Citizenship Test Practice</h1>
          <p className="text-gray-700 mb-6">
            This site helps you prepare for the Canadian Citizenship Test with realistic practice questions,
            timed tests, detailed explanations, and progress tracking. Study smarter and build confidence
            before your exam day.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">What you get</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Practice by category and full-length tests</li>
                <li>Clear explanations for every question</li>
                <li>Progress tracking over time</li>
                <li>Mobile-first, fast experience</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Contact</h2>
              <p className="text-gray-700">Have feedback or found an issue? Reach out via the footer links or open an issue in the repository.</p>
            </div>
          </div>

          <AdZone position="about" />
        </div>
      </main>

      <Footer />
    </div>
  )
}


