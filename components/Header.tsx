'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { HeartIcon } from '@heroicons/react/24/solid'

export default function Header() {
  const { data: session } = useSession()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-4 z-50 px-4 max-w-7xl mx-auto w-full">
      {/* Floating Pill Container */}
      <div className="bg-white/90 backdrop-blur-md border-2 border-slate-200 shadow-soft rounded-2xl px-6 py-4 flex items-center justify-between transition-all duration-300">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-teal-500 text-white w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-xl shadow-3d-primary group-active:translate-y-1 group-active:shadow-none transition-all">
            C
          </div>
          <span className="font-extrabold tracking-tight text-xl text-slate-800">
            Citizen<span className="text-teal-600">Test</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-bold text-slate-500">
          <Link href="/practice" className="hover:text-teal-500 transition-colors">Practice</Link>
          <Link href="/study-guide" className="hover:text-teal-500 transition-colors">Study Guide</Link>
          
          {/* Header Donate Button */}
          <a 
            href="https://buymeacoffee.com/citizentestcanada" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-500 font-bold rounded-xl border-2 border-rose-100 hover:bg-rose-100 hover:border-rose-200 transition-all active:scale-95"
          >
            <HeartIcon className="w-5 h-5" />
            <span className="hidden lg:inline">Support Us</span>
          </a>
          
          {session ? (
            <div className="flex items-center gap-4 border-l-2 border-slate-100 pl-6 lg:pl-8">
              <Link href="/dashboard" className="text-slate-800 hover:text-teal-500 transition-colors">Dashboard</Link>
              <button 
                onClick={() => signOut()}
                className="px-5 py-2 rounded-xl font-bold text-rose-500 bg-rose-50 border-2 border-rose-100 hover:bg-rose-100 hover:border-rose-200 transition-all active:scale-95"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4 border-l-2 border-slate-100 pl-6 lg:pl-8">
              <Link href="/auth/signin" className="hover:text-teal-500 transition-colors">Log In</Link>
              <Link href="/auth/signup" className="px-6 py-2.5 rounded-xl font-bold text-white bg-teal-500 border-2 border-teal-600 border-b-4 hover:bg-teal-400 active:border-b-2 active:translate-y-[2px] transition-all">
                Sign Up Free
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-24 left-4 right-4 bg-white border-2 border-slate-200 rounded-2xl shadow-xl p-4 flex flex-col gap-4 md:hidden animate-slide-up">
          <Link href="/practice" className="p-4 bg-slate-50 rounded-xl font-bold text-slate-700 text-center">Practice Tests</Link>
          <Link href="/study-guide" className="p-4 bg-slate-50 rounded-xl font-bold text-slate-700 text-center">Study Guide</Link>
          
          {/* Mobile Donate Button */}
          <a 
            href="https://buymeacoffee.com/citizentestcanada" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-4 bg-rose-50 rounded-xl font-bold text-rose-600 flex items-center justify-center gap-2"
          >
            <HeartIcon className="w-5 h-5" /> Support the Project
          </a>

          {session ? (
            <>
              <Link href="/dashboard" className="p-4 bg-teal-50 rounded-xl font-bold text-teal-700 text-center">Dashboard</Link>
              <button onClick={() => signOut()} className="p-4 bg-slate-100 rounded-xl font-bold text-slate-600 text-center">Log Out</button>
            </>
          ) : (
            <Link href="/auth/signup" className="p-4 bg-teal-500 text-white rounded-xl font-bold text-center border-b-4 border-teal-700 active:border-b-0 active:translate-y-1 mt-2">
              Create Free Account
            </Link>
          )}
        </div>
      )}
    </header>
  )
}
