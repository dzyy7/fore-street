'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useEffect, useRef } from 'react'

interface PreloaderProps {
  progress: number
  isComplete: boolean
}

export default function Preloader({ progress, isComplete }: PreloaderProps) {
  const pct = Math.round(progress * 100)

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center"
          style={{ background: 'var(--bg-dark)' }}
          exit={{
            opacity: 0,
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Animated logo mark */}
          <motion.div
            className="relative mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Rotating ring */}
            <motion.div
              className="absolute inset-0 rounded-full border border-[#2A5A3E]/40"
              style={{ width: 96, height: 96, margin: 'auto', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-t border-[#3D8A60]"
              style={{ width: 120, height: 120, margin: 'auto', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
              animate={{ rotate: -360 }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            />

            {/* Logo text center */}
            <div className="relative z-10 flex flex-col items-center justify-center w-[96px] h-[96px]">
              <span
                className="text-xs font-semibold tracking-[0.3em] uppercase"
                style={{ color: 'var(--green-accent)' }}
              >
                fore
              </span>
              <span
                className="text-xs font-semibold tracking-[0.3em] uppercase"
                style={{ color: 'var(--cream)' }}
              >
                street
              </span>
            </div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="w-[240px] h-[1px] overflow-hidden"
            style={{ background: 'rgba(244,235,224,0.1)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="h-full origin-left"
              style={{ background: 'var(--green-accent)' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: progress }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </motion.div>

          {/* Percentage counter */}
          <motion.p
            className="mt-4 text-xs font-light tracking-[0.4em]"
            style={{ color: 'var(--text-muted)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {pct.toString().padStart(3, '0')}
          </motion.p>

          {/* Brand statement */}
          <motion.p
            className="absolute bottom-12 text-[10px] font-light tracking-[0.5em] uppercase"
            style={{ color: 'rgba(164,139,121,0.4)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Roasted with intention
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}