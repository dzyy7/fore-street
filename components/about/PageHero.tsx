'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import Navbar from '@/components/ui/Navbar'

interface PageHeroProps {
  label: string
  title: string
  accent: string
  sub?: string
  breadcrumb?: { label: string; href: string }
}

export default function PageHero({ label, title, accent, sub, breadcrumb }: PageHeroProps) {
  return (
    <div className="relative overflow-hidden" style={{ background: 'var(--bg-dark)', paddingTop: '120px', paddingBottom: '80px' }}>
      <Navbar />

      {/* Subtle radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center top, rgba(42,90,62,0.15) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10">
        {/* Breadcrumb */}
        {breadcrumb && (
          <motion.div className="flex items-center gap-2 mb-10"
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}>
            <Link href={breadcrumb.href}
              className="text-[10px] font-semibold tracking-[0.35em] uppercase transition-colors hover:text-white"
              style={{ color: 'var(--text-muted)' }}>{breadcrumb.label}</Link>
            <span style={{ color: 'rgba(244,235,224,0.2)' }}>·</span>
            <span className="text-[10px] font-semibold tracking-[0.35em] uppercase"
              style={{ color: 'var(--green-accent)' }}>{label}</span>
          </motion.div>
        )}

        {/* Label */}
        <motion.p className="flex items-center gap-3 text-[10px] font-semibold tracking-[0.5em] uppercase mb-5"
          style={{ color: 'var(--green-accent)' }}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}>
          <span className="block w-8 h-px" style={{ background: 'var(--green-accent)' }} />
          {label}
        </motion.p>

        {/* Title */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-none"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
          <span style={{ color: 'var(--cream)' }}>{title} </span>
          <span style={{ color: 'var(--green-accent)' }}>{accent}</span>
        </motion.h1>

        {sub && (
          <motion.p className="mt-4 text-base font-light max-w-md"
            style={{ color: 'rgba(244,235,224,0.5)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}>
            {sub}
          </motion.p>
        )}

        {/* Bottom rule */}
        <motion.div className="mt-12 w-full h-px"
          style={{ background: 'linear-gradient(to right, var(--green-mid), transparent)' }}
          initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }} />
      </div>
    </div>
  )
}