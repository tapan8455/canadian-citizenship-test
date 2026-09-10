'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type SignInForm = z.infer<typeof signInSchema>

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit = async (data: SignInForm) => {
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else {
        router.push('/dashboard')
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
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

        <div className="max-w-md w-full relative z-10">
          <div className="bg-white rounded-[2rem] shadow-soft border-2 border-slate-100 p-8 md:p-10">
            <div className="text-center mb-10">
              <div className="mx-auto h-16 w-16 bg-teal-500 rounded-2xl flex items-center justify-center shadow-lg border-b-[4px] border-teal-700 mb-6">
                <span className="text-white font-black text-3xl">C</span>
              </div>
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                Welcome back!
              </h2>
              <p className="mt-3 text-slate-500 font-medium">
                Log in to continue your progress
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {error && (
                <div className="bg-rose-50 border-2 border-rose-200 rounded-xl p-4 animate-fade-in">
                  <p className="text-sm font-bold text-rose-600 text-center">{error}</p>
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
                    Email address
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-slate-800 font-medium"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm font-bold text-rose-500">{errors.email.message}</p>
                  )}
                </div>

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
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
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
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-5 w-5 text-teal-600 focus:ring-teal-500 border-2 border-slate-300 rounded text-teal-500"
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm font-bold text-slate-600">
                    Remember me
                  </label>
                </div>


              <div className="flex items-center justify-between mt-4">
                <div className="text-sm">
                  <Link 
                    href="/auth/forgot-password" 
                    className="font-medium text-primary-600 hover:text-primary-500" >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 rounded-2xl font-extrabold text-white text-lg bg-teal-500 border-2 border-teal-600 border-b-[6px] hover:bg-teal-400 active:border-b-[2px] active:translate-y-[4px] disabled:opacity-70 disabled:cursor-not-allowed transition-all flex justify-center"
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </button>
              </div>

              <div className="text-center pt-4 border-t-2 border-slate-100">
                <p className="text-slate-500 font-medium">
                  Don&apos;t have an account?{' '}
                  <Link href="/auth/signup" className="font-extrabold text-teal-600 hover:text-teal-500">
                    Sign up here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}