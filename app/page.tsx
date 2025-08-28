import Link from 'next/link'
import { ArrowRightIcon, CheckCircleIcon, BookOpenIcon, ChartBarIcon, ClockIcon, TrophyIcon, StarIcon, UserGroupIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
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
              Pass the Canadian Citizenship Test with confidence using our official format practice questions.
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

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Thousands of Successful Candidates
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join the community of immigrants who have successfully passed the Canadian Citizenship Test using our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "This practice test helped me pass the Canadian Citizenship Test on my first try. The questions are very similar to the real exam!"
              </p>
              <div className="flex items-center">
                <UserGroupIcon className="h-8 w-8 text-primary-600 mr-3" />
                <div>
                  <p className="font-semibold text-gray-900">Maria S.</p>
                  <p className="text-sm text-gray-500">New Canadian Citizen</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "The study guide is comprehensive and the practice tests are excellent. I felt confident going into the citizenship exam."
              </p>
              <div className="flex items-center">
                <UserGroupIcon className="h-8 w-8 text-primary-600 mr-3" />
                <div>
                  <p className="font-semibold text-gray-900">Ahmed K.</p>
                  <p className="text-sm text-gray-500">Citizenship Test Pass</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Free access to quality practice questions made all the difference. The progress tracking helped me focus on weak areas."
              </p>
              <div className="flex items-center">
                <UserGroupIcon className="h-8 w-8 text-primary-600 mr-3" />
                <div>
                  <p className="font-semibold text-gray-900">Sarah L.</p>
                  <p className="text-sm text-gray-500">Successful Candidate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about the Canadian Citizenship Test
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What is the Canadian Citizenship Test?
              </h3>
              <p className="text-gray-600">
                The Canadian Citizenship Test is a mandatory exam for permanent residents applying for Canadian citizenship. 
                It consists of 20 multiple-choice questions based on the Discover Canada study guide, with a 45-minute time limit. 
                You need to answer 15 questions correctly (75%) to pass.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How many questions are in the citizenship test?
              </h3>
              <p className="text-gray-600">
                The official Canadian Citizenship Test contains exactly 20 questions. Our practice tests follow the same format 
                to give you the most realistic preparation experience possible.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What topics are covered in the citizenship test?
              </h3>
              <p className="text-gray-600">
                The test covers Canadian history, geography, government, rights and responsibilities, symbols, and culture. 
                All questions are based on the official Discover Canada: The Rights and Responsibilities of Citizenship guide.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Is this practice test free?
              </h3>
              <p className="text-gray-600">
                Yes! All our practice tests, study materials, and resources are completely free. We believe everyone should 
                have access to quality citizenship test preparation materials.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How accurate are these practice questions?
              </h3>
              <p className="text-gray-600">
                Our practice questions are carefully crafted to match the style and difficulty of the official citizenship test. 
                They cover the same topics and follow the same format as the real exam.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How long should I study for the citizenship test?
              </h3>
              <p className="text-gray-600">
                We recommend studying for at least 2-3 months before your test date. This gives you enough time to thoroughly 
                read the Discover Canada guide, take multiple practice tests, and identify areas that need more focus.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What happens if I fail the citizenship test?
              </h3>
              <p className="text-gray-600">
                If you don't pass the test, you'll be given another opportunity to retake it after 4-8 weeks. You may also be 
                asked to attend an interview with a citizenship officer to discuss your application.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Can I take the test in French?
              </h3>
              <p className="text-gray-600">
                Yes, the Canadian Citizenship Test is available in both English and French. You can choose your preferred 
                language when scheduling your test appointment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Study Topics Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Study Topics Covered
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our practice tests cover all the essential topics you need to know for the Canadian Citizenship Test
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpenIcon className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Canadian History</h3>
              <p className="text-gray-600 text-sm">
                Indigenous peoples, Confederation, World Wars, and modern Canada
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChartBarIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Government & Democracy</h3>
              <p className="text-gray-600 text-sm">
                Parliamentary system, elections, and political processes
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrophyIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Geography & Regions</h3>
              <p className="text-gray-600 text-sm">
                Provinces, territories, major cities, and natural landmarks
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Rights & Responsibilities</h3>
              <p className="text-gray-600 text-sm">
                Charter of Rights, voting, and civic participation
              </p>
            </div>
          </div>
        </div>
      </section>

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
