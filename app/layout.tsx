import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'bitbybit',
  description: 'Innovative solutions, one bit at a time',
  generator: 'bitbybit',
  icons: {
    icon: [
      { url: '/inverted_image.png', sizes: '16x16', type: 'image/png' },
      { url: '/inverted_image.png', sizes: '32x32', type: 'image/png' },
      { url: '/inverted_image.png', sizes: '48x48', type: 'image/png' },
    ],
    shortcut: '/inverted_image.png',
    apple: '/inverted_image.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
