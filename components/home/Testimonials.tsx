'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const testimonials = [
  {
    id: 0,
    quote: "The first sip felt like waking up in a forest. Fore Street has permanently changed my relationship with morning coffee.",
    author: "Mara Lindenbaum",
    role: "Architect, Portland ME",
    bg: 'var(--bg-dark)',
    accent: 'var(--green-accent)',
    img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1400&q=80',
  },
  {
    id: 1,
    quote: "I've visited roasteries on three continents. None tell the story from soil to cup the way Fore Street does.",
    author: "Théo Marchand",
    role: "Travel Writer, Paris",
    bg: 'var(--brown-deep)',
    accent: 'var(--brown-accent)',
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1400&q=80',
  },
  {
    id: 2,
    quote: "Their Ethiopia Yirgacheffe is the cleanest, most floral coffee I've ever tasted. Absolutely transcendent.",
    author: "Priya Subramaniam",
    role: "Barista Champion, 2023",
    bg: 'var(--green-deep)',
    accent: 'var(--green-pale)',
    img: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=1400&q=80',
  },
  {
    id: 3,
    quote: "My morning routine is sacred because of Fore Street. The consistency, the sourcing ethics — it's rare to find a brand that lives up to its promise.",
    author: "David Chen",
    role: "Chef, NYC",
    bg: '#100D08',
    accent: 'var(--brown-pale)',
    img: 'https://images.unsplash.com/photo-1442975631134-a099765a6ced?w=1400&q=80',
  },
]

const AUTOPLAY_INTERVAL = 5000

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const goto = (idx: number) => {
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }

  const next = () => {
    const nxt = (current + 1) % testimonials.length
    setDirection(1)
    setCurrent(nxt)
  }

  const prev = () => {
    const prv = (current - 1 + testimonials.length) % testimonials.length
    setDirection(-1)
    setCurrent(prv)
  }

  // Autoplay
  useEffect(() => {
    intervalRef.current = setInterval(next, AUTOPLAY_INTERVAL)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [current]) // eslint-disable-line react-hooks/exhaustive-deps

  const slide = testimonials[current]

  return (
    <section
      id="journal"
      className="relative h-screen overflow-hidden"
    >
      <AnimatePresence mode="sync" custom={direction}>
        <motion.div
          key={slide.id}
          className="absolute inset-0"
          custom={direction}
          initial={{ x: `${direction * 100}%` }}
          animate={{ x: 0 }}
          exit={{ x: `${direction * -100}%` }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* BG Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.img}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, rgba(12,9,5,0.9) 0%, rgba(12,9,5,0.4) 60%, rgba(12,9,5,0.85) 100%)`,
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-10 md:p-16">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <span
            className="text-[9px] font-semibold tracking-[0.5em] uppercase"
            style={{ color: 'rgba(244,235,224,0.4)' }}
          >
            What People Say
          </span>
          <span
            className="text-[9px] font-semibold tracking-[0.4em] uppercase tabular-nums"
            style={{ color: 'rgba(244,235,224,0.4)' }}
          >
            {String(current + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
          </span>
        </div>

        {/* Quote */}
        <div className="max-w-3xl">
          <motion.div
            key={`quote-${slide.id}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Large quote mark */}
            <span
              className="block text-8xl font-black leading-none mb-4 select-none"
              style={{ color: slide.accent, lineHeight: 0.8 }}
            >
              "
            </span>
            <blockquote
              className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight leading-tight"
              style={{ color: 'var(--cream)' }}
            >
              {slide.quote}
            </blockquote>
          </motion.div>

          <motion.div
            key={`author-${slide.id}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mt-8"
          >
            <span
              className="block w-8 h-px"
              style={{ background: slide.accent }}
            />
            <div>
              <p
                className="text-sm font-semibold"
                style={{ color: 'var(--cream)' }}
              >
                {slide.author}
              </p>
              <p
                className="text-xs font-light"
                style={{ color: 'rgba(244,235,224,0.5)' }}
              >
                {slide.role}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goto(i)}
                className="block h-[2px] rounded-full transition-all duration-500"
                style={{
                  width: i === current ? '32px' : '12px',
                  background: i === current ? slide.accent : 'rgba(244,235,224,0.25)',
                }}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          {/* Arrow buttons */}
          <div className="flex gap-3">
            {[
              { fn: prev, label: 'Previous', dir: 'left' },
              { fn: next, label: 'Next', dir: 'right' },
            ].map(({ fn, label, dir }) => (
              <button
                key={dir}
                onClick={fn}
                className="w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 hover:bg-white/10"
                style={{ borderColor: 'rgba(244,235,224,0.2)', color: 'var(--cream)' }}
                aria-label={label}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  {dir === 'left'
                    ? <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    : <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  }
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] w-full"
        style={{ background: 'rgba(244,235,224,0.1)' }}
      >
        <motion.div
          key={`progress-${slide.id}`}
          className="h-full origin-left"
          style={{ background: slide.accent }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: AUTOPLAY_INTERVAL / 1000, ease: 'linear' }}
        />
      </div>
    </section>
  )
}