'use client'

import { motion } from 'motion/react'
import Link from 'next/link'

const hours = [
  { day: 'Mon – Fri', time: '07:00 – 22:00' },
  { day: 'Saturday',  time: '08:00 – 23:00' },
  { day: 'Sunday',    time: '08:00 – 21:00' },
]

const navLinks = [
  { label: 'Home',  href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Menu',  href: '/menu' },
]

const socials = [
  { label: 'Instagram', href: '#' },
  { label: 'TikTok',    href: '#' },
  { label: 'WhatsApp',  href: 'https://wa.me/6281234567890' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: 'var(--bg-dark)' }}>
      {/* Top border gradient */}
      <div className="w-full h-px"
        style={{ background: 'linear-gradient(to right, transparent, var(--green-mid), transparent)' }} />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1.5fr] gap-12 md:gap-8">

          {/* Brand column */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="mb-6">
              <span className="block text-[10px] font-bold tracking-[0.4em] uppercase"
                style={{ color: 'var(--green-accent)' }}>fore</span>
              <span className="block text-[10px] font-bold tracking-[0.4em] uppercase"
                style={{ color: 'var(--cream)' }}>street</span>
            </div>
            <p className="text-sm font-light leading-relaxed max-w-[220px] mb-8"
              style={{ color: 'var(--text-muted)' }}>
              A specialty coffee shop crafted for slow mornings and good conversations. Portland, Maine.
            </p>
            {/* Newsletter */}
            <div>
              <p className="text-[10px] font-semibold tracking-[0.35em] uppercase mb-3"
                style={{ color: 'rgba(244,235,224,0.3)' }}>Stay in the loop</p>
              <div className="flex items-center border rounded-full overflow-hidden"
                style={{ borderColor: 'rgba(244,235,224,0.1)' }}>
                <input type="email" placeholder="your@email.com"
                  className="flex-1 bg-transparent text-xs px-4 py-2.5 outline-none"
                  style={{ color: 'var(--cream)' }} />
                <button className="px-4 py-2.5 text-[10px] font-semibold tracking-[0.25em] uppercase"
                  style={{ color: 'var(--green-accent)' }}>Join</button>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.08, duration: 0.8 }}>
            <h4 className="text-[9px] font-bold tracking-[0.5em] uppercase mb-6"
              style={{ color: 'rgba(244,235,224,0.3)' }}>Navigate</h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href}
                    className="text-xs font-light transition-colors duration-300 hover:text-white"
                    style={{ color: 'var(--text-muted)' }}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t mt-1" style={{ borderColor: 'rgba(244,235,224,0.06)' }}>
                {socials.map((s) => (
                  <a key={s.label} href={s.href}
                    className="block text-xs font-light mt-3 transition-colors duration-300 hover:text-white"
                    style={{ color: 'var(--text-muted)' }}>{s.label}</a>
                ))}
              </li>
            </ul>
          </motion.div>

          {/* Hours */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.14, duration: 0.8 }}>
            <h4 className="text-[9px] font-bold tracking-[0.5em] uppercase mb-6"
              style={{ color: 'rgba(244,235,224,0.3)' }}>Hours</h4>
            <ul className="flex flex-col gap-3">
              {hours.map((h) => (
                <li key={h.day}>
                  <p className="text-[10px] font-semibold tracking-wide mb-0.5"
                    style={{ color: 'rgba(244,235,224,0.4)' }}>{h.day}</p>
                  <p className="text-xs font-light" style={{ color: 'var(--text-muted)' }}>{h.time}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--green-accent)' }} />
              <span className="text-[10px] font-semibold tracking-[0.25em] uppercase"
                style={{ color: 'var(--green-accent)' }}>Open Now</span>
            </div>
          </motion.div>

          {/* Map + Address */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.8 }}>
            <h4 className="text-[9px] font-bold tracking-[0.5em] uppercase mb-6"
              style={{ color: 'rgba(244,235,224,0.3)' }}>Find Us</h4>

            {/* Map embed */}
            <div className="relative w-full rounded-xl overflow-hidden mb-5"
              style={{ height: '140px', background: '#1A1108' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2839.7!2d-70.2568!3d43.6591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDM5JzMyLjgiTiA3MMKwMTUnMjQuNSJX!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%" height="100%" style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(0.8)' }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title="Fore Street Coffee location"
              />
            </div>

            <p className="text-xs font-semibold mb-1" style={{ color: 'var(--cream)' }}>
              288 Fore Street
            </p>
            <p className="text-xs font-light mb-4" style={{ color: 'var(--text-muted)' }}>
              Portland, Maine 04101, USA
            </p>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.25em] uppercase transition-colors duration-300 hover:text-white"
              style={{ color: 'var(--green-accent)' }}>
              Get directions
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 5h8M5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="mt-16 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t"
          style={{ borderColor: 'rgba(244,235,224,0.06)' }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
          <p className="text-[10px] font-light tracking-wider"
            style={{ color: 'rgba(154,123,98,0.4)' }}>
            © {new Date().getFullYear()} Fore Street Coffee Co. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy', 'Terms'].map((item) => (
              <a key={item} href="#"
                className="text-[10px] font-light transition-colors duration-300 hover:text-white"
                style={{ color: 'rgba(154,123,98,0.4)' }}>{item}</a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Ghost wordmark */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[15vw] font-black leading-none select-none pointer-events-none whitespace-nowrap"
        style={{ color: 'transparent', WebkitTextStroke: '1px rgba(244,235,224,0.025)' }}>
        FORE STREET
      </div>
    </footer>
  )
}