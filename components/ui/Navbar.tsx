'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'

const navLinks = [
  { label: 'Home',  number: '01', href: '/' },
  { label: 'About', number: '02', href: '/about' },
  { label: 'Menu',  number: '03', href: '/menu' },
]

const socials = [
  { label: 'Instagram', href: '#' },
  { label: 'TikTok',   href: '#' },
  { label: 'WhatsApp', href: 'https://wa.me/6281234567890' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const close = () => setIsOpen(false)

  return (
    <>
      {/* ── Bar ── */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-6 md:px-10 py-5"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ mixBlendMode: 'normal' }}
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={close}
          className="relative z-[201] flex flex-col leading-none"
        >
          <span className="text-[11px] font-bold tracking-[0.35em] uppercase"
            style={{ color: 'var(--green-accent)', textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}>
            fore
          </span>
          <span className="text-[11px] font-bold tracking-[0.35em] uppercase"
            style={{ color: 'var(--cream)', textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}>
            street
          </span>
        </Link>

        {/* Burger */}
        <button
          onClick={() => setIsOpen(v => !v)}
          className="relative z-[201] flex flex-col gap-[5px] w-8 h-8 items-end justify-center"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <motion.span
            className="block h-px rounded-full"
            style={{ background: isOpen ? 'var(--text-dark)' : 'var(--cream)', width: '28px',
              boxShadow: isOpen ? 'none' : '0 1px 6px rgba(0,0,0,0.5)' }}
            animate={isOpen ? { rotate: -45, y: 3 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.span
            className="block h-px rounded-full"
            style={{ background: isOpen ? 'var(--text-dark)' : 'var(--cream)', width: '20px',
              boxShadow: isOpen ? 'none' : '0 1px 6px rgba(0,0,0,0.5)' }}
            animate={isOpen ? { rotate: 45, y: -2, width: 28 } : { rotate: 0, y: 0, width: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </button>
      </motion.nav>

      {/* ── Fullscreen Menu ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[199] flex flex-col justify-between overflow-hidden"
            style={{ background: 'var(--bg-cream)' }}
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Left accent line */}
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-[2px]"
              style={{ background: 'var(--green-mid)' }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />

            {/* Nav links */}
            <ul className="flex flex-col justify-center flex-1 px-12 md:px-20 pt-28 gap-1">
              {navLinks.map((link, i) => (
                <li key={link.label} className="overflow-hidden border-b"
                  style={{ borderColor: 'rgba(12,9,5,0.07)' }}>
                  <motion.div
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '110%' }}
                    transition={{ delay: 0.12 + i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={close}
                      className="group relative flex items-baseline gap-4 py-4 no-underline"
                    >
                      <span className="text-[10px] font-semibold tracking-[0.3em] tabular-nums"
                        style={{ color: 'var(--green-mid)' }}>
                        {link.number}
                      </span>
                      <span className="relative overflow-hidden inline-block">
                        <span
                          className="block font-semibold tracking-tight leading-none transition-transform duration-500 ease-out group-hover:-translate-y-full"
                          style={{ color: 'var(--text-dark)', fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
                        >
                          {link.label}
                        </span>
                        <span
                          className="absolute inset-0 block font-semibold tracking-tight leading-none translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0"
                          style={{ color: 'var(--green-mid)', fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
                        >
                          {link.label}
                        </span>
                      </span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>

            {/* Footer row */}
            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-12 md:px-20 pb-10 gap-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="flex gap-6">
                {socials.map((s) => (
                  <a key={s.label} href={s.href}
                    className="text-[11px] tracking-[0.3em] uppercase transition-colors duration-300 hover:text-black"
                    style={{ color: 'var(--text-muted)' }}>
                    {s.label}
                  </a>
                ))}
              </div>
              <a href="mailto:hello@forestreet.coffee"
                className="text-[11px] tracking-[0.25em] uppercase transition-colors duration-300 hover:text-black"
                style={{ color: 'var(--text-muted)' }}>
                hello@forestreet.coffee
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}