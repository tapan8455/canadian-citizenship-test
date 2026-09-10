import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdZone from '@/components/AdZone'

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.citizentestcanada.com',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col overflow-hidden">
      <Header />
      <AdZone position="header" />

      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative">
        {/* Decorative Background Elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

        <div className="max-w-4xl w-full text-center relative z-10 animate-enter">
          {/* Fun little pill badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-800 font-bold text-sm uppercase tracking-widest mb-8 border-2 border-amber-200">
            <span>🎉</span> Updated for 2026
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-8">
            Pass the Canadian <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">
              Citizenship Test.
            </span>
          </h1>
          
          <p className="mt-4 text-xl md:text-2xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed mb-12">
            Master the official Discover Canada guide with 500+ gamified practice questions. Fast, fun, and 100% free.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link 
              href="/practice" 
              className="w-full sm:w-auto px-10 py-5 rounded-2xl font-extrabold text-white text-xl bg-teal-500 border-2 border-teal-600 border-b-[8px] hover:bg-teal-400 hover:border-b-[8px] active:border-b-[2px] active:translate-y-[6px] transition-all flex items-center justify-center gap-3"
            >
              Start Practicing <span>🚀</span>
            </Link>
            
            <Link 
              href="/study-guide" 
              className="w-full sm:w-auto px-10 py-5 rounded-2xl font-extrabold text-slate-600 text-xl bg-white border-2 border-slate-200 border-b-[8px] hover:bg-slate-50 active:border-b-[2px] active:translate-y-[6px] transition-all flex items-center justify-center"
            >
              Read Study Guide
            </Link>
          </div>

          {/* Gamified Stat Bar */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-soft">
              <div className="text-4xl font-extrabold text-teal-500 mb-2">500+</div>
              <div className="font-bold text-slate-400 uppercase text-sm tracking-wider">Official Questions</div>
            </div>
            <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-soft">
              <div className="text-4xl font-extrabold text-blue-500 mb-2">100%</div>
              <div className="font-bold text-slate-400 uppercase text-sm tracking-wider">Free Forever</div>
            </div>
            <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-soft hidden md:block">
              <div className="text-4xl font-extrabold text-amber-500 mb-2">15/20</div>
              <div className="font-bold text-slate-400 uppercase text-sm tracking-wider">Score to Pass</div>
            </div>
          </div>
        </div>
      </main>

      <AdZone position="footer" />
      <Footer />
    </div>
  )
}
