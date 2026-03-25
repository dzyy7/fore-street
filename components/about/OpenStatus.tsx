'use client'

import { useEffect, useState } from 'react'

const schedule: Record<number, { open: number; close: number }> = {
  0: { open: 8,  close: 21 }, // Sun
  1: { open: 7,  close: 22 }, // Mon
  2: { open: 7,  close: 22 }, // Tue
  3: { open: 7,  close: 22 }, // Wed
  4: { open: 7,  close: 22 }, // Thu
  5: { open: 7,  close: 22 }, // Fri
  6: { open: 8,  close: 23 }, // Sat
}

export default function OpenStatus() {
  const [isOpen, setIsOpen] = useState(false)
  const [nextChange, setNextChange] = useState('')

  useEffect(() => {
    const check = () => {
      const now = new Date()
      const day = now.getDay()
      const hour = now.getHours()
      const { open, close } = schedule[day]
      const open_ = hour >= open && hour < close
      setIsOpen(open_)
      setNextChange(open_ ? `Closes at ${close}:00` : `Opens at ${open}:00`)
    }
    check()
    const interval = setInterval(check, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full"
      style={{ background: isOpen ? 'rgba(42,90,62,0.15)' : 'rgba(61,26,10,0.15)',
        border: `1px solid ${isOpen ? 'rgba(61,138,96,0.3)' : 'rgba(124,74,43,0.3)'}` }}>
      <span className="relative flex w-2 h-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
          style={{ background: isOpen ? 'var(--green-accent)' : 'var(--brown-accent)' }} />
        <span className="relative inline-flex rounded-full w-2 h-2"
          style={{ background: isOpen ? 'var(--green-accent)' : 'var(--brown-accent)' }} />
      </span>
      <span className="text-[11px] font-semibold tracking-[0.25em] uppercase"
        style={{ color: isOpen ? 'var(--green-accent)' : 'var(--brown-accent)' }}>
        {isOpen ? 'Open Now' : 'Closed'}
      </span>
      <span className="text-[10px] font-light" style={{ color: 'var(--text-muted)' }}>
        · {nextChange}
      </span>
    </div>
  )
}