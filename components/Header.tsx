'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Bars3Icon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session } = useSession()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Practice Tests', href: '/practice' },
    { name: 'Study Guide', href: '/study-guide' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Progress', href: '/progress' },
    { name: 'About', href: '/about' },
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-xl font-bold text-gray-900">CitizenTest Canada</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" className="text-gray-600 hover:text-primary-600 text-sm font-medium">
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-gray-600 hover:text-primary-600 text-sm font-medium"
                >
                  Sign Out
                </button>
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <UserIcon className="h-4 w-4 text-primary-600" />
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/auth/signin" className="text-gray-600 hover:text-primary-600 text-sm font-medium">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="btn-primary text-sm">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-primary-600 p-2"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-600 hover:text-primary-600 block px-3 py-2 text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  {session ? (
                    <div className="space-y-2">
                      <Link
                        href="/dashboard"
                        className="text-gray-600 hover:text-primary-600 block px-3 py-2 text-base font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          signOut()
                          setIsMenuOpen(false)
                        }}
                        className="text-gray-600 hover:text-primary-600 block w-full text-left px-3 py-2 text-base font-medium"
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        href="/auth/signin"
                        className="text-gray-600 hover:text-primary-600 block px-3 py-2 text-base font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/auth/signup"
                        className="btn-primary block text-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
