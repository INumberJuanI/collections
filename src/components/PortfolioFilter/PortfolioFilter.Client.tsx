'use client'

import { useState, useTransition, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { User } from '@/payload-types'
import Image from 'next/image'

interface PortfolioFilterClientProps {
  owners: User[]
}

export function PortfolioFilterClient({ owners }: PortfolioFilterClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [searchText, setSearchText] = useState('')
  const [selectedOwners, setSelectedOwners] = useState<string[]>([])
  const [isExpanded, setIsExpanded] = useState(false)

  // Initialize state from URL params on mount
  useEffect(() => {
    const search = searchParams.get('search') || ''
    const ownersParam = searchParams.get('owners') || ''

    setSearchText(search)
    setSelectedOwners(ownersParam ? ownersParam.split(',') : [])
  }, [searchParams])

  const handleFilter = () => {
    startTransition(() => {
      // Build query params
      const params = new URLSearchParams()
      if (searchText) params.set('search', searchText)
      if (selectedOwners.length > 0) params.set('owners', selectedOwners.join(','))

      // Update URL
      router.push(`/?${params.toString()}`)
    })
  }

  const handleClear = () => {
    setSearchText('')
    setSelectedOwners([])
    startTransition(() => {
      router.push('/')
    })
  }

  return (
    <div className="w-full mb-4">
      {/* Glass Header Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl text-white font-semibold hover:bg-white/15 transition-all duration-300 flex items-center justify-between group shadow-xl hover:shadow-2xl"
      >
        <span className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Kollektion filtern
        </span>
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>

      {/* Glass Panel - Expandable */}
      {isExpanded && (
        <div className="mt-3 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-4 shadow-xl animate-in fade-in duration-300">
          <div className="space-y-4">
            {/* Owner Multi-Select */}
            <div>
              <label className="block text-sm font-medium text-gray-100 mb-2">
                Filter by Owner
              </label>
              <div className="flex gap-4">
                {owners.map((owner) => (
                  <label
                    key={owner.id}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedOwners.includes(String(owner.id))}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedOwners([...selectedOwners, String(owner.id)])
                        } else {
                          setSelectedOwners(selectedOwners.filter((id) => id !== String(owner.id)))
                        }
                      }}
                      className="w-4 h-4 rounded border-gray-300 text-cyan-500 focus:ring-cyan-500 cursor-pointer"
                      disabled={isPending}
                    />
                    <span className="text-gray-100">{owner.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Text Search */}
            <div>
              <label className="block text-sm font-medium text-gray-100 mb-2">
                Search (Title, ID, Slug, or Image Alt)
              </label>
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search portfolio items..."
                className="w-full px-4 py-2 backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-300"
                disabled={isPending}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleFilter}
                disabled={isPending}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 disabled:opacity-50 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {isPending ? 'Filtering...' : 'Apply Filter'}
              </button>
              <button
                onClick={handleClear}
                disabled={isPending}
                className="flex-1 px-4 py-2 backdrop-blur-sm bg-red-500/20 border border-red-400/30 hover:bg-red-500/30 disabled:opacity-50 text-red-200 rounded-lg font-medium transition-all duration-300"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

interface PortfolioItemProps {
  title?: string
  description?: string
  gradient?: string
  mediaUrl?: string
  bgText?: string
  aspectRatio?: string
  link?: { href: string; label: string }
}

export function PortfolioItemClient({
  title,
  description,
  gradient,
  mediaUrl,
  bgText,
  aspectRatio,
  link,
}: PortfolioItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleClick = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="relative group overflow-hidden rounded-xl cursor-pointer" onClick={handleClick}>
      <div
        className={`absolute inset-0 ${gradient ? gradient : 'bg-linear-to-br from-slate-600/80 to-slate-900/80'} transition-all duration-300 z-10 flex items-center justify-center ${
          isExpanded ? 'opacity-90' : 'opacity-0 group-hover:opacity-90'
        }`}
      >
        <div
          className={`text-center p-4 transform transition-transform duration-300 ${
            isExpanded ? 'translate-y-0' : 'translate-y-8 group-hover:translate-y-0'
          }`}
        >
          {title && <div className="text-xl font-medium text-white mb-2">{title}</div>}
          {description && <p className="text-gray-200 mb-4">{description}</p>}
          {link && (
            <a
              href={link.href}
              onClick={(e) => e.stopPropagation()}
              className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded text-white hover:bg-white/30 transition-colors duration-300"
            >
              {link.label}
            </a>
          )}
        </div>
      </div>
      <div
        className={`${aspectRatio ? aspectRatio : 'aspect-video'} bg-linear-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center overflow-hidden`}
      >
        {mediaUrl ? (
          <Image
            src={mediaUrl}
            alt={title ?? 'Project Image'}
            fill
            className="object-cover h-full"
          />
        ) : (
          <div className="text-cyan-400/30 font-medium">{bgText ?? 'Project Image'}</div>
        )}
      </div>
    </div>
  )
}
