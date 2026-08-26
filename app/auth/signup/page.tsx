'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdZone from '@/components/AdZone'

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type SignupFormData = z.infer<typeof signupSchema>

export default function SignupPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      })

      const result = await response.json()

      if (result.success) {
        // Redirect to signin page with success message
        router.push('/auth/signin?message=Account created successfully! Please sign in.')
      } else {
        setError(result.error || 'Failed to create account')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-enter relative">
        {/* Decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

        <div className="max-w-xl w-full relative z-10">
          <div className="bg-white rounded-[2rem] shadow-soft border-2 border-slate-100 p-8 md:p-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight mb-2">Create Account</h1>
              <p className="text-slate-500 font-medium">Join thousands preparing for their citizenship test</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-rose-50 border-2 border-rose-200 rounded-xl animate-fade-in">
                <p className="text-rose-600 text-sm font-bold text-center">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
                  Full Name
                </label>
                <input
                  {...register('name')}
                  type="text"
                  id="name"
                  className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-slate-800 font-medium"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-2 text-sm font-bold text-rose-500">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
                  Email Address
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-slate-800 font-medium"
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="mt-2 text-sm font-bold text-rose-500">{errors.email.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="password" className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      {...register('password')}
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-slate-800 font-medium pr-12"
                      placeholder="Create password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-6 w-6 text-slate-400 hover:text-teal-600 transition-colors" />
                      ) : (
                        <EyeIcon className="h-6 w-6 text-slate-400 hover:text-teal-600 transition-colors" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm font-bold text-rose-500">{errors.password.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
                    Confirm 
                  </label>
                  <div className="relative">
                    <input
                      {...register('confirmPassword')}
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-slate-800 font-medium pr-12"
                      placeholder="Confirm password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <EyeSlashIcon className="h-6 w-6 text-slate-400 hover:text-teal-600 transition-colors" />
                      ) : (
                        <EyeIcon className="h-6 w-6 text-slate-400 hover:text-teal-600 transition-colors" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-2 text-sm font-bold text-rose-500">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 rounded-2xl font-extrabold text-white text-lg bg-teal-500 border-2 border-teal-600 border-b-[6px] hover:bg-teal-400 active:border-b-[2px] active:translate-y-[4px] disabled:opacity-70 disabled:cursor-not-allowed transition-all flex justify-center"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t-2 border-slate-100 text-center">
              <p className="text-slate-500 font-medium">
                Already have an account?{' '}
                <Link href="/auth/signin" className="font-extrabold text-teal-600 hover:text-teal-500">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <AdZone position="bottom" />
      <Footer />
    </div>
  )
}