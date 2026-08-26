import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdZone from '@/components/AdZone'
import Link from 'next/link'
import { BookOpenIcon, ChartBarIcon, MapIcon, BuildingLibraryIcon, ScaleIcon, CheckCircleIcon } from '@heroicons/react/24/solid'

export const metadata: Metadata = {
  title: 'Study Guide - Canadian Citizenship Test Preparation',
  description: 'Comprehensive study guide for the Canadian Citizenship Test. Learn about Canadian history, government, geography, and rights with detailed explanations and practice resources.',
  alternates: {
    canonical: 'https://www.citizentestcanada.com/study-guide',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function StudyGuidePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />

      <main className="flex-grow max-w-5xl mx-auto px-4 py-12 w-full animate-enter">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 text-blue-600 rounded-3xl mb-6 shadow-soft">
            <BookOpenIcon className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">Study Guide Hub</h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
            Comprehensive resources to help you prepare for the Canadian Citizenship Test. 
            Use this guide alongside our practice tests for the best results.
          </p>
        </div>

        {/* Quick Navigation - Gamified */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Link href="/practice/general" className="flex items-center p-6 bg-teal-500 text-white rounded-3xl border-2 border-teal-600 border-b-[8px] hover:bg-teal-400 hover:border-b-[8px] active:border-b-[2px] active:translate-y-[6px] transition-all group">
            <div className="w-14 h-14 bg-teal-400 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
              <CheckCircleIcon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xl font-extrabold">Start Practicing</p>
              <p className="text-teal-100 font-medium">Jump into a mock test</p>
            </div>
          </Link>

          <Link href="/progress" className="flex items-center p-6 bg-white text-slate-700 rounded-3xl border-2 border-slate-200 border-b-[8px] hover:bg-slate-50 active:border-b-[2px] active:translate-y-[6px] transition-all group">
            <div className="w-14 h-14 bg-slate-100 text-slate-500 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
              <ChartBarIcon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xl font-extrabold">View Progress</p>
              <p className="text-slate-400 font-medium">Check your weak spots</p>
            </div>
          </Link>
        </div>

        {/* Study Categories */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-[2rem] shadow-soft border-2 border-slate-100 p-8 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                <BuildingLibraryIcon className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Canadian History</h2>
            </div>
            <p className="text-slate-600 font-medium mb-6">Learn about Canada's rich history from Indigenous peoples to modern times.</p>
            <ul className="space-y-3 mb-8 font-medium text-slate-500">
              <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400"></div> Indigenous peoples and early settlers</li>
              <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400"></div> Confederation and nation building</li>
              <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400"></div> World Wars and modern Canada</li>
            </ul>
            <Link href="/practice/history" className="block w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-center transition-colors">
              Practice History
            </Link>
          </div>

          <div className="bg-white rounded-[2rem] shadow-soft border-2 border-slate-100 p-8 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                <ScaleIcon className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Government</h2>
            </div>
            <p className="text-slate-600 font-medium mb-6">Understand Canada's parliamentary democracy and political system.</p>
            <ul className="space-y-3 mb-8 font-medium text-slate-500">
              <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-400"></div> Parliamentary system and elections</li>
              <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-400"></div> Federal, provincial, and municipal</li>
              <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-400"></div> Political parties and voting</li>
            </ul>
            <Link href="/practice/government" className="block w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-center transition-colors">
              Practice Government
            </Link>
          </div>

          <div className="bg-white rounded-[2rem] shadow-soft border-2 border-slate-100 p-8 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-rose-100 text-rose-600 rounded-xl">
                <MapIcon className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Geography</h2>
            </div>
            <p className="text-slate-600 font-medium mb-6">Explore Canada's diverse geography, provinces, and territories.</p>
            <ul className="space-y-3 mb-8 font-medium text-slate-500">
              <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-rose-400"></div> Provinces and territories</li>
              <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-rose-400"></div> Major cities and landmarks</li>
              <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-rose-400"></div> Natural resources and climate</li>
            </ul>
            <Link href="/practice/geography" className="block w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-center transition-colors">
              Practice Geography
            </Link>
          </div>

          <div className="bg-white rounded-[2rem] shadow-soft border-2 border-slate-100 p-8 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
                <BookOpenIcon className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Rights & Duties</h2>
            </div>
            <p className="text-slate-600 font-medium mb-6">Learn about your rights as a Canadian citizen and civic responsibilities.</p>
            <ul className="space-y-3 mb-8 font-medium text-slate-500">
              <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-400"></div> Charter of Rights and Freedoms</li>
              <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-400"></div> Voting and civic participation</li>
              <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-400"></div> Obeying laws and paying taxes</li>
            </ul>
            <Link href="/practice/rights" className="block w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-center transition-colors">
              Practice Rights
            </Link>
          </div>
        </div>

        {/* Official Resources Banner */}
        <div className="bg-blue-600 rounded-[2rem] p-8 md:p-12 text-center text-white relative overflow-hidden shadow-soft">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-screen opacity-50 blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
          <h2 className="text-3xl font-black mb-4 relative z-10">Official Resources</h2>
          <p className="text-blue-100 font-medium mb-8 max-w-2xl mx-auto relative z-10">
            For the most accurate and up-to-date information, always refer to the official government resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <a href="https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/discover-canada.html" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors">
              Read 'Discover Canada'
            </a>
            <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/become-canadian-citizen/citizenship-test.html" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 border-2 border-blue-500 transition-colors">
              Official Test Info
            </a>
          </div>
        </div>

        <div className="mt-12">
          <AdZone position="study-guide" />
        </div>
      </main>

      <Footer />
    </div>
  )
}
