/**
 * PWA Configuration
 * Centralized configuration for Progressive Web App settings
 */

export const pwaConfig = {
  // Basic app info
  name: 'Unsere Sammlung',
  shortName: 'Sammlung',
  description: 'Unsere Sammlung von Figuren',
  lang: 'de-DE',
  startUrl: '/',
  display: 'standalone' as const,

  // Theme colors
  themeColor: '#6366f1',
  backgroundColor: '#111827',

  // Icons configuration
  icons: [
    {
      src: '/icons/icon-192x192.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'any' as const,
    },
    {
      src: '/icons/icon-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any' as const,
    },
    {
      src: '/icons/icon-maskable-192x192.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'maskable' as const,
    },
    {
      src: '/icons/icon-maskable-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'maskable' as const,
    },
  ],

  // Screenshots for install prompts
  screenshots: [
    {
      src: '/screenshots/screenshot-1.png',
      sizes: '540x720',
      type: 'image/png',
      form_factor: 'narrow' as const,
    },
    {
      src: '/screenshots/screenshot-2.png',
      sizes: '1280x720',
      type: 'image/png',
      form_factor: 'wide' as const,
    },
  ],

  // Service Worker caching strategies
  caching: {
    // Pages to precache on install
    precache: ['/', '/offline'],

    // Cache-first: Static assets (JS, CSS, fonts)
    cacheFirst: ['/_next/static/**', '/fonts/**', '/images/**', '*.woff2', '*.woff', '*.ttf'],

    // Stale-while-revalidate: Pages and content
    staleWhileRevalidate: ['/**/*.html', '/api/search/**', '/api/items/**', '/api/media/**'],

    // Network-first: API calls (with network timeout)
    networkFirst: ['/api/**', '/graphql'],

    // Network-only: Dashboard and auth (never cache)
    networkOnly: ['/dashboard/**', '/auth/**', '/api/auth/**', '/api/users/**'],
  },

  // Service Worker settings
  sw: {
    // Cache lifespan in days
    cacheDuration: 7,

    // Network timeout in ms before falling back to cache
    networkTimeout: 4000,

    // Maximum number of items per cache
    maxCacheItems: 100,

    // Enable offline page fallback
    enableOfflineFallback: true,
    offlinePagePath: '/offline',
  },

  // Features
  features: {
    enableOfflineMode: true,
    enableNotifications: false,
    enableBackgroundSync: false,
  },
}

export type PWAConfig = typeof pwaConfig
