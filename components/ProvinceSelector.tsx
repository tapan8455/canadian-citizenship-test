'use client'

import { useState } from 'react'

interface ProvinceSelectorProps {
  selectedProvince: string
  onProvinceChange: (province: string) => void
  className?: string
}

const provinces = [
  { code: 'all', name: 'All Provinces' },
  { code: 'ab', name: 'Alberta' },
  { code: 'bc', name: 'British Columbia' },
  { code: 'mb', name: 'Manitoba' },
  { code: 'nb', name: 'New Brunswick' },
  { code: 'nl', name: 'Newfoundland and Labrador' },
  { code: 'ns', name: 'Nova Scotia' },
  { code: 'nt', name: 'Northwest Territories' },
  { code: 'nu', name: 'Nunavut' },
  { code: 'on', name: 'Ontario' },
  { code: 'pe', name: 'Prince Edward Island' },
  { code: 'qc', name: 'Quebec' },
  { code: 'sk', name: 'Saskatchewan' },
  { code: 'yt', name: 'Yukon' }
]

export default function ProvinceSelector({ selectedProvince, onProvinceChange, className = '' }: ProvinceSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const selectedProvinceData = provinces.find(p => p.code === selectedProvince) || provinces[0]

  return (
    <div className={`relative ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Province
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <span className="block truncate">{selectedProvinceData.name}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {provinces.map((province) => (
              <button
                key={province.code}
                onClick={() => {
                  onProvinceChange(province.code)
                  setIsOpen(false)
                }}
                className={`${
                  selectedProvince === province.code
                    ? 'text-primary-900 bg-primary-100'
                    : 'text-gray-900'
                } cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-gray-50 w-full text-left`}
              >
                <span className={`block truncate ${
                  selectedProvince === province.code ? 'font-semibold' : 'font-normal'
                }`}>
                  {province.name}
                </span>
                {selectedProvince === province.code && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary-600">
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
