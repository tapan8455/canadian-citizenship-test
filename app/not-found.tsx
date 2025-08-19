import Link from 'next/link'
import { HomeIcon, ArrowLeftIcon, BookOpenIcon } from '@heroicons/react/24/outline'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-md mx-auto">
          {/* 404 Icon */}
          <div className="mb-8">
            <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl font-bold text-red-600">404</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
            <p className="text-gray-600 mb-8">
              Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link 
              href="/"
              className="btn-primary w-full inline-flex items-center justify-center"
            >
              <HomeIcon className="h-5 w-5 mr-2" />
              Go to Homepage
            </Link>
            
            <Link 
              href="/practice"
              className="btn-secondary w-full inline-flex items-center justify-center"
            >
              <BookOpenIcon className="h-5 w-5 mr-2" />
              Start Practice Test
            </Link>
            
            <Link 
              href="/"
              className="w-full px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors inline-flex items-center justify-center"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Go Back
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Popular Pages</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <Link href="/practice" className="text-blue-600 hover:text-blue-800 transition-colors">
                Practice Tests
              </Link>
              <Link href="/study-guide" className="text-blue-600 hover:text-blue-800 transition-colors">
                Study Guide
              </Link>
              <Link href="/about" className="text-blue-600 hover:text-blue-800 transition-colors">
                About Us
              </Link>
              <Link href="/progress" className="text-blue-600 hover:text-blue-800 transition-colors">
                Progress
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
