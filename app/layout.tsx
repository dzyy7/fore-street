import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/components/providers/LenisProvider'

/* ── Load Outfit via next/font — NOT via CSS @import ── */
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['100','200','300','400','500','600','700','800','900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Fore Street Coffee — Where Craft Meets Ritual',
  description:
    'Specialty coffee roasted with precision and intention. Direct-trade beans from 48 farms, roasted in Portland, Maine.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={outfit.variable}>
      {/*
        grain class adds the fixed noise overlay via ::after pseudo-element.
        antialiased is a Tailwind utility — works fine on <body>.
      */}
      <body className="antialiased grain">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}