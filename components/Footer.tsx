import Link from 'next/link'
import { HeartIcon, EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/solid'

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-slate-300 py-12 md:py-16 mt-auto border-t-8 border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand & Contact Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-6 w-max">
              <div className="bg-teal-500 text-white w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-xl shadow-lg group-hover:scale-105 transition-transform">
                C
              </div>
              <span className="font-extrabold tracking-tight text-2xl text-white">
                Citizen<span className="text-teal-400">Test</span>
              </span>
            </Link>
            
            <p className="text-slate-400 font-medium mb-8 max-w-sm leading-relaxed">
              Helping thousands of people prepare for and pass their Canadian Citizenship test with gamified, 100% free practice exams.
            </p>

            {/* Contact Details */}
            <div className="space-y-4 font-medium text-slate-400">
              <a href="mailto:info@citizentestcanada.com" className="flex items-center gap-3 hover:text-teal-400 transition-colors">
                <EnvelopeIcon className="w-5 h-5 text-slate-500" />
                info@citizentestcanada.com
              </a>
              <a href="tel:+1-519-639-5744" className="flex items-center gap-3 hover:text-teal-400 transition-colors">
                <PhoneIcon className="w-5 h-5 text-slate-500" />
                (555) 123-4567 {/* <-- Replace with your actual phone number */}
              </a>
              <div className="flex items-center gap-3">
                <MapPinIcon className="w-5 h-5 text-slate-500" />
                Toronto, Ontario, Canada
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-extrabold mb-6 uppercase tracking-wider text-sm">Practice</h3>
            <ul className="space-y-4 font-medium">
              <li><Link href="/practice" className="hover:text-teal-400 transition-colors">Practice Tests</Link></li>
              <li><Link href="/practice/full" className="hover:text-teal-400 transition-colors">Official Mock Exam</Link></li>
              <li><Link href="/study-guide" className="hover:text-teal-400 transition-colors">Study Guide</Link></li>
              <li><Link href="/dashboard" className="hover:text-teal-400 transition-colors">My Progress</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-extrabold mb-6 uppercase tracking-wider text-sm">CitizenTest</h3>
            <ul className="space-y-4 font-medium">
              <li><Link href="/about" className="hover:text-teal-400 transition-colors">About Us</Link></li>
              <li><Link href="/faq" className="hover:text-teal-400 transition-colors">FAQ</Link></li>
              <li><Link href="/blog" className="hover:text-teal-400 transition-colors">Blog & Tips</Link></li>
              <li><Link href="/privacy" className="hover:text-teal-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Donation Section */}
          <div className="lg:col-span-1">
            <div className="bg-slate-700/50 p-6 rounded-3xl border-2 border-slate-600 flex flex-col h-full justify-center text-center">
              <p className="text-sm font-bold text-white mb-4">Found this site helpful?</p>
              <a 
                href="YOUR_DONATION_LINK_HERE" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-extrabold text-white bg-rose-500 border-2 border-rose-600 border-b-[4px] hover:bg-rose-400 active:border-b-0 active:translate-y-[4px] transition-all w-full"
              >
                <HeartIcon className="w-5 h-5" />
                Support Us
              </a>
              <p className="text-xs font-medium text-slate-400 mt-4 leading-relaxed">
                Your donations keep this platform 100% free and ad-light.
              </p>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 border-t-2 border-slate-700 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4 font-medium text-sm text-slate-500">
          <p>© {new Date().getFullYear()} CitizenTest Canada. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="https://www.canada.ca/en/immigration-refugees-citizenship/corporate/publications-manuals/discover-canada.html" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">Official Discover Canada Guide</a>
            <span>•</span>
            <p>Not affiliated with the Government of Canada.</p>
          </div>
        </div>

      </div>
    </footer>
  )
}