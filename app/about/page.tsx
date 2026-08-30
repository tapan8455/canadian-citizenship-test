import Link from 'next/link'
import { CheckCircleIcon, BookOpenIcon, ChartBarIcon, ClockIcon, TrophyIcon, UserGroupIcon } from '@heroicons/react/24/solid'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdZone from '@/components/AdZone'
import Script from 'next/script'

export const metadata = {
  title: 'About Canadian Citizenship Test - Your Trusted Study Partner',
  description: 'Learn about our mission to help thousands of Canadians prepare for and pass the citizenship test with confidence. Discover our comprehensive study platform.',
  alternates: {
    canonical: 'https://www.citizentestcanada.com/about',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const features = [
  {
    icon: BookOpenIcon,
    title: 'Comprehensive Study Materials',
    description: 'Access to 500 carefully curated practice questions covering all test categories including history, government, and rights.'
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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Script
        id="about-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Canadian Citizenship Test Practice",
            "url": "https://www.citizentestcanada.com",
            "description": "Free Canadian Citizenship Test practice platform with 500+ questions, official format, and detailed explanations."
          })
        }}
      />
      <Header />
      
      <main className="flex-grow max-w-6xl mx-auto px-4 py-12 w-full animate-enter">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 text-rose-800 font-bold text-sm uppercase tracking-widest mb-6 border-2 border-rose-200">
            <span>🇨🇦</span> Proudly Canadian
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-800 mb-6 tracking-tight">
            About <span className="text-rose-500">CitizenTest</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed">
            Your trusted partner in preparing for the Canadian citizenship test. We&apos;re dedicated to helping thousands of candidates achieve their dream of becoming Canadian citizens.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-[2rem] shadow-soft border-2 border-slate-100 p-8 hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center mb-6">
                <feature.icon className="h-7 w-7 text-teal-600" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-800 mb-3">{feature.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <AdZone position="about-content" />

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-br from-rose-500 to-rose-600 rounded-[2rem] p-8 md:p-12 text-center shadow-soft">
          <h2 className="text-3xl font-black text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-rose-100 font-medium mb-8 max-w-2xl mx-auto text-lg">
            Join thousands of successful candidates who have used our platform to prepare for the citizenship test.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/practice"
              className="px-8 py-4 rounded-xl font-extrabold text-rose-600 bg-white border-2 border-white border-b-[6px] hover:bg-slate-50 active:border-b-[2px] active:translate-y-[4px] transition-all flex items-center justify-center gap-2"
            >
              <BookOpenIcon className="h-6 w-6" />
              Start Practice Test
            </Link>
          </div>
        </div>
      </main>

      <AdZone position="about-bottom" />
      <Footer />
    </div>
  )
}