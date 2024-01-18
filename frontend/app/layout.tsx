import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './common/providers'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bloc2Win',
  description: 'Win Sol',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{backgroundColor: '#070709'}}>
      <body className={`${inter.className} text-white `}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
