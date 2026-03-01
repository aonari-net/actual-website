import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { SmoothScroller } from '@/components/smooth-scroller'

import './globals.css'

const _inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Hydrogen VPN — Invisible Protection',
  description: 'The fastest, most private VPN. Built for the modern internet. Zero logs. Maximum speed. Pure privacy.',
}

export const viewport: Viewport = {
  themeColor: '#f3f4f6',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${_inter.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden">
        <SmoothScroller />
        {children}
      </body>
    </html>
  )
}
