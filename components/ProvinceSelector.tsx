'use client'

import { useState, useRef, useEffect } from 'react'
import { MapPinIcon, ChevronDownIcon, CheckIcon } from '@heroicons/react/24/solid'

interface ProvinceSelectorProps {
  selectedProvince: string
  onProvinceChange: (province: string) => void
  className?: string
}

const provinces = [
  { code: 'all', name: 'All Provinces & Territories' },
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
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedProvinceData = provinces.find(p => p.code === selectedProvince) || provinces[0]

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [dropdownRef])

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      <label className="block text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 text-center">
        Customize Test For Your Province
      </label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-6 py-4 flex items-center justify-between hover:bg-slate-100 hover:border-slate-300 transition-all focus:outline-none focus:ring-4 focus:ring-teal-500/20"
      >
        <div className="flex items-center gap-3">
          <div className="bg-rose-100 text-rose-500 p-2 rounded-lg">
             <MapPinIcon className="w-5 h-5" />
          </div>
          <span className="block font-extrabold text-slate-700 text-lg">
            {selectedProvinceData.name}
          </span>
        </div>
        <ChevronDownIcon className={`w-6 h-6 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border-2 border-slate-100 shadow-2xl max-h-80 rounded-2xl py-2 overflow-auto animate-fade-in">
          {provinces.map((province) => {
            const isSelected = selectedProvince === province.code;
            return (
              <button
                key={province.code}
                onClick={() => {
                  onProvinceChange(province.code)
                  setIsOpen(false)
                }}
                className={`w-full text-left px-6 py-4 flex items-center justify-between transition-colors ${
                  isSelected ? 'bg-teal-50 text-teal-800' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className={`block text-base ${isSelected ? 'font-extrabold' : 'font-semibold'}`}>
                  {province.name}
                </span>
                {isSelected && <CheckIcon className="w-5 h-5 text-teal-500" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
