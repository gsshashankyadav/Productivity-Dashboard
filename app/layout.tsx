import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Productivity Dashboard',
  description: 'Productivity Dashboard To Improve your Productivity'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
