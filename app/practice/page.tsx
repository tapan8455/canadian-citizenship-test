'use client'

import Link from 'next/link'
import { useState } from 'react'
import { BookOpenIcon, ClockIcon, ChartBarIcon, StarIcon } from '@heroicons/react/24/outline'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdZone from '@/components/AdZone'
import ProvinceSelector from '@/components/ProvinceSelector'

const testCategories = [
  {
    id: 'general',
    title: 'General Knowledge',
    description: 'Mixed questions covering all citizenship test topics',
    questions: 20,
    timeLimit: 45,
    difficulty: 'Mixed',
    icon: BookOpenIcon,
    color: 'bg-blue-500',
  },
  {
    id: 'history',
    title: 'Canadian History',
    description: 'Focus on important historical events and figures in Canadian history',
    questions: 20,
    timeLimit: 45,
    difficulty: 'Focused',
    icon: BookOpenIcon,
    color: 'bg-green-500',
  },
  {
    id: 'government',
    title: 'Government & Politics',
    description: 'Learn about Canadian government structure, elections, and political system',
    questions: 20,
    timeLimit: 45,
    difficulty: 'Focused',
    icon: BookOpenIcon,
    color: 'bg-purple-500',
  },
  {
    id: 'geography',
    title: 'Geography & Symbols',
    description: 'Explore Canadian geography, provinces, territories, and national symbols',
    questions: 20,
    timeLimit: 45,
    difficulty: 'Focused',
    icon: BookOpenIcon,
    color: 'bg-red-500',
  },
  {
    id: 'rights',
    title: 'Rights & Responsibilities',
    description: 'Understand Canadian rights, freedoms, and civic responsibilities',
    questions: 20,
    timeLimit: 45,
    difficulty: 'Focused',
    icon: BookOpenIcon,
    color: 'bg-yellow-500',
  },
  {
    id: 'full',
    title: 'Official Practice Test',
    description: 'Exact simulation of the actual citizenship test - 20 questions, 45 minutes',
    questions: 20,
    timeLimit: 45,
    difficulty: 'Official Format',
    icon: BookOpenIcon,
    color: 'bg-indigo-500',
  },
]

export default function PracticePage() {
  const [selectedProvince, setSelectedProvince] = useState('all')

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Practice Tests
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our comprehensive collection of practice tests designed to help you 
              master every aspect of the Canadian Citizenship Test.
            </p>
          </div>
        </div>
      </section>

      {/* Ad Zone */}
      <AdZone position="practice-hero" />

      {/* Province Selection */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <ProvinceSelector
              selectedProvince={selectedProvince}
              onProvinceChange={setSelectedProvince}
            />
            <p className="text-sm text-gray-600 mt-2 text-center">
              Select your province to customize your practice experience
            </p>
          </div>
        </div>
      </section>

      {/* Test Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testCategories.map((category) => (
              <div key={category.id} className="card hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <StarIcon className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm text-gray-600">{category.difficulty}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <BookOpenIcon className="h-4 w-4" />
                    <span>{category.questions} questions</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ClockIcon className="h-4 w-4" />
                    <span>{category.timeLimit} min</span>
                  </div>
                </div>
                
                <Link 
                  href={`/practice/${category.id}?province=${selectedProvince}`}
                  className="btn-primary w-full text-center"
                >
                  Start Test
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Why Practice with Us?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our practice tests are designed to mirror the actual citizenship test 
              and help you build confidence for exam day.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChartBarIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Detailed Analytics</h3>
              <p className="text-gray-600">
                Track your progress with comprehensive analytics and identify areas 
                that need improvement.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpenIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Official Content</h3>
              <p className="text-gray-600">
                All questions are based on the official Discover Canada study guide 
                and actual test content.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ClockIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Timed Practice</h3>
              <p className="text-gray-600">
                Experience real test conditions with timed practice sessions that 
                prepare you for the actual exam.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Zone */}
      <AdZone position="practice-bottom" />

      <Footer />
    </div>
  )
}
