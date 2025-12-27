import React from 'react'
import './globals.css'
import { BackgroundElements } from '@/components/BackgroundElements'
import { ServiceWorkerProvider } from '@/components/ServiceWorkerProvider'

export const metadata = {
  description: 'Eine Sammlung unserer Figuren',
  title: 'Unsere Sammlungen',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
  },
  formatDetection: {
    telephone: false,
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="de">
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Collections" />
        <link rel="icon" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body
        className="bg-black text-white font-['Space_Grotesk'] overflow-x-hidden"
        suppressHydrationWarning
      >
        <ServiceWorkerProvider />
        <BackgroundElements />
        {children}
      </body>
    </html>
  )
}
