import Link from 'next/link'
import { CheckCircleIcon, BookOpenIcon, ChartBarIcon, ClockIcon, TrophyIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { InContentAd } from '@/components/AdSense'

export const metadata = {
  title: 'About Canadian Citizenship Test - Your Trusted Study Partner',
  description: 'Learn about our mission to help thousands of Canadians prepare for and pass the citizenship test with confidence. Discover our comprehensive study platform.',
  keywords: [
    'Canadian citizenship test about',
    'citizenship test preparation platform',
    'Canada citizenship exam help',
    'citizenship test study resources',
    'Canadian citizenship test mission'
  ]
}

const features = [
  {
    icon: BookOpenIcon,
    title: 'Comprehensive Study Materials',
    description: 'Access to 223 carefully curated practice questions covering all test categories including history, government, geography, and rights & responsibilities.'
  },
  {
    icon: ChartBarIcon,
    title: 'Progress Tracking',
    description: 'Monitor your performance with detailed analytics, identify weak areas, and track your improvement over time.'
  },
  {
    icon: ClockIcon,
    title: 'Realistic Test Environment',
    description: 'Practice with timed tests that mirror the official 45-minute, 20-question format of the actual citizenship test.'
  },
  {
    icon: TrophyIcon,
    title: 'Proven Success Rate',
    description: 'Thousands of successful candidates have used our platform to prepare for and pass their Canadian citizenship test.'
  },
  {
    icon: UserGroupIcon,
    title: 'Expert Guidance',
    description: 'Detailed explanations for every question, helping you understand not just the answer, but the reasoning behind it.'
  },
  {
    icon: CheckCircleIcon,
    title: 'Official Test Format',
    description: 'Our practice tests follow the exact format of the official citizenship test, ensuring you know what to expect on test day.'
  }
]

const stats = [
  { number: '223', label: 'Practice Questions' },
  { number: '5', label: 'Study Categories' },
  { number: '45', label: 'Minute Time Limit' },
  { number: '75%', label: 'Pass Rate Required' }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About Canadian Citizenship Test
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted partner in preparing for the Canadian citizenship test. We're dedicated to helping thousands of candidates achieve their dream of becoming Canadian citizens.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
              We believe that every person who wants to become a Canadian citizen deserves access to high-quality, comprehensive study materials. Our platform is designed to make the citizenship test preparation process accessible, effective, and stress-free. We're committed to helping you understand not just the facts, but the values and principles that make Canada the great country it is.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* In-Content Ad */}
        <InContentAd className="my-12" />

        {/* Test Format Information */}
        <div className="bg-blue-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding the Citizenship Test</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Test Format</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 20 multiple-choice or true/false questions</li>
                <li>• 45 minutes to complete the test</li>
                <li>• Need 15 correct answers (75%) to pass</li>
                <li>• Questions based on "Discover Canada" study guide</li>
                <li>• Computer-based test with immediate results</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Topics Covered</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Canadian history and important dates</li>
                <li>• Government structure and democracy</li>
                <li>• Geography, provinces, and territories</li>
                <li>• Rights and responsibilities of citizenship</li>
                <li>• Canadian symbols and culture</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Success Stories */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-l-4 border-green-500 pl-6">
              <p className="text-gray-600 italic mb-3">
                "This platform made studying for the citizenship test so much easier. The practice questions were exactly like the real test, and I passed with flying colors!"
              </p>
              <p className="text-sm text-gray-500">- Maria S., New Canadian Citizen</p>
            </div>
            <div className="border-l-4 border-green-500 pl-6">
              <p className="text-gray-600 italic mb-3">
                "The detailed explanations helped me understand not just the answers, but the reasoning behind them. Highly recommended for anyone preparing for the test."
              </p>
              <p className="text-sm text-gray-500">- Ahmed K., Citizenship Test Graduate</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-blue-100 mb-6">
            Join thousands of successful candidates who have used our platform to prepare for the citizenship test
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/practice"
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg inline-flex items-center justify-center"
            >
              <BookOpenIcon className="h-5 w-5 mr-2" />
              Start Practice Test
            </Link>
            <Link 
              href="/study-guide"
              className="bg-blue-700 text-white hover:bg-blue-800 font-semibold py-3 px-6 rounded-lg inline-flex items-center justify-center"
            >
              View Study Guide
            </Link>
            <Link 
              href="/progress"
              className="bg-green-600 text-white hover:bg-green-700 font-semibold py-3 px-6 rounded-lg inline-flex items-center justify-center"
            >
              <ChartBarIcon className="h-5 w-5 mr-2" />
              Track Progress
            </Link>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-100 rounded-lg p-8 mt-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Get in Touch</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
            <div>
              <p><strong>Email:</strong> info@citizentest.ca</p>
              <p><strong>Location:</strong> Toronto, Ontario, Canada</p>
            </div>
            <div>
              <p><strong>Official Resources:</strong></p>
              <a 
                href="https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/become-canadian-citizen/citizenship-test.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Government of Canada Citizenship Test Information
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


