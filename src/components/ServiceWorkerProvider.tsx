'use client'

import { useEffect, useState } from 'react'

export function ServiceWorkerProvider() {
  const [_swStatus, setSwStatus] = useState<'idle' | 'installing' | 'installed' | 'error'>('idle')
  const [updateAvailable, setUpdateAvailable] = useState(false)

  useEffect(() => {
    // Check if service workers are supported
    if (typeof window === 'undefined') {
      return
    }

    if (!('serviceWorker' in navigator)) {
      console.warn('⚠️ Service Workers not supported in this browser')
      return
    }

    let registration: ServiceWorkerRegistration | null = null

    const registerSW = async () => {
      try {
        setSwStatus('installing')
        console.log('🔧 Registering Service Worker...')

        // Register compiled TypeScript Service Worker
        registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
          updateViaCache: 'none',
        })

        // Check for updates periodically
        const checkForUpdates = () => {
          registration?.update()
        }
        const updateInterval = setInterval(checkForUpdates, 60000) // Check every minute

        // Listen for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration!.installing
          if (!newWorker) return

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New service worker available
              setUpdateAvailable(true)
              console.log('✨ New PWA version available. Refresh to update.')
            } else if (newWorker.state === 'activated') {
              setSwStatus('installed')
              console.log('✅ Service Worker activated')
            }
          })
        })

        if (registration.active) {
          setSwStatus('installed')
          console.log('✅ Service Worker is active and running')
        } else if (registration.installing) {
          console.log('⏳ Service Worker is installing...')
        }

        console.log('✅ Service Worker registered successfully')
        console.log('📍 Scope:', registration.scope)

        return () => clearInterval(updateInterval)
      } catch (error) {
        setSwStatus('error')
        console.error('❌ Service Worker registration failed:', error)
        if (error instanceof Error) {
          console.error('   Error message:', error.message)
        }
      }
    }

    // Register service worker
    registerSW()
  }, [])

  // Auto-update if new version available after delay
  useEffect(() => {
    if (!updateAvailable) return

    const timeoutId = setTimeout(() => {
      window.location.reload()
    }, 5000) // Auto-reload after 5 seconds

    return () => clearTimeout(timeoutId)
  }, [updateAvailable])

  return null
}
