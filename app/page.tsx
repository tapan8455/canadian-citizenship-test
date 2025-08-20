import Link from 'next/link'
import { ArrowRightIcon, CheckCircleIcon, BookOpenIcon, ChartBarIcon, ClockIcon, TrophyIcon } from '@heroicons/react/24/outline'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

import AdZone from '@/components/AdZone'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      {/* Header Ad */}
      <AdZone position="header" />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Master the{' '}
              <span className="text-primary-600">Canadian Citizenship Test</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Prepare for your citizenship exam with our comprehensive practice platform. 
              Free online tests, detailed explanations, and progress tracking to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/practice" className="btn-primary text-lg px-8 py-3 inline-flex items-center">
                Start Free Practice Test
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/study-guide" className="btn-secondary text-lg px-8 py-3">
                View Study Guide
              </Link>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary-600">223</div>
                <div className="text-gray-600">Practice Questions</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600">20</div>
                <div className="text-gray-600">Questions Per Test</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600">45</div>
                <div className="text-gray-600">Minutes Time Limit</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600">100%</div>
                <div className="text-gray-600">Free Access</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Zone 1 */}
      <AdZone position="hero-bottom" />

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools and resources you need 
              to pass the Canadian Citizenship Test with confidence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpenIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Comprehensive Study Guide</h3>
              <p className="text-gray-600">
                Access detailed study materials covering all topics from the official 
                Discover Canada guide with easy-to-understand explanations.
              </p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChartBarIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Progress Tracking</h3>
              <p className="text-gray-600">
                Monitor your performance with detailed analytics and identify areas 
                that need more focus to improve your score.
              </p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ClockIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Official Format Tests</h3>
              <p className="text-gray-600">
                Experience the real test with 20 questions in 45 minutes. Need 15 correct 
                answers (75%) to pass, just like the official citizenship test.
              </p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Detailed Explanations</h3>
              <p className="text-gray-600">
                Learn from your mistakes with comprehensive explanations for every 
                question and reference to official study materials.
              </p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrophyIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Achievement System</h3>
              <p className="text-gray-600">
                Stay motivated with badges and achievements as you progress through 
                different topics and improve your knowledge.
              </p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRightIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Mobile Friendly</h3>
              <p className="text-gray-600">
                Study anywhere, anytime with our responsive design that works perfectly 
                on desktop, tablet, and mobile devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Zone 2 */}
      <AdZone position="features-bottom" />
      
      {/* In-Content Ad */}
      <AdZone position="home-content" />

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful candidates who have used our platform to 
            prepare for and pass the Canadian Citizenship Test.
          </p>
          <Link href="/practice" className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg text-lg inline-flex items-center transition-colors">
            Start Your Free Practice Test
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer Ad */}
      <AdZone position="footer" />

      <Footer />
    </div>
  )
}
