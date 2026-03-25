"use client";

import { useRef, useCallback, useEffect } from "react";
import { motion } from "motion/react";

/* ── Magnetic button ── */
function MagneticOrderBtn() {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const xRef = useRef(0);
  const yRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = btnRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    xRef.current = (e.clientX - (r.left + r.width / 2)) * 0.45;
    yRef.current = (e.clientY - (r.top + r.height / 2)) * 0.45;
  }, []);

  const onLeave = useCallback(() => {
    xRef.current = 0;
    yRef.current = 0;
  }, []);

  useEffect(() => {
    let cx = 0,
      cy = 0;
    const tick = () => {
      cx = lerp(cx, xRef.current, 0.1);
      cy = lerp(cy, yRef.current, 0.1);
      if (btnRef.current)
        btnRef.current.style.transform = `translate(${cx}px,${cy}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <a
      ref={btnRef}
      href="/menu"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative inline-flex items-center gap-4"
      style={{ willChange: "transform" }}
    >
      <span
        className="relative flex items-center justify-center w-16 h-16 rounded-full transition-transform duration-300 group-hover:scale-110"
        style={{ background: "var(--green-mid)" }}
      >
        <svg
          className="transition-transform duration-300 group-hover:translate-x-0.5"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M2 9h14M9 2l7 7-7 7"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span
        className="text-sm font-semibold tracking-[0.2em] uppercase"
        style={{ color: "var(--text-dark)" }}
      >
        See Our Menu
      </span>
    </a>
  );
}

/* ── CTA Section ──
   Performance rules:
   - NO parallax motion divs (removed useScroll/useTransform entirely)
   - NO inline SVG feTurbulence grain (replaced with CSS background-image png pattern)
   - Static background, GPU-friendly
   - Decorative orbs are plain divs, no animation
── */
export default function CTASection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden py-28 md:py-40 px-6 md:px-12"
      style={{ background: "#F0E8DA" }}
    >
      {/* Static decorative orb — top left, no animation */}
      <div
        className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(42,90,62,0.1) 0%, transparent 65%)",
          // GPU-composited via opacity only, no transform animation
        }}
      />

      {/* Static decorative orb — bottom right */}
      <div
        className="absolute bottom-[-10%] right-[-3%] w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(196,137,90,0.09) 0%, transparent 65%)",
        }}
      />

      {/* Grain: CSS-only, no SVG filter, no JS, GPU-friendly */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.4,
          backgroundImage:
            // Small repeating noise pattern — pure CSS, zero JS overhead
            `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAUVBMVEWFhYWDg4N3d3dtbW17e3t1dXWBgYGHh4t5eXlzc3OLi4ubm5uVlZWPj4+NjY19fX2JiYl/f39ra2uRkZGZmZlpaWmXl5dvb29xcXGTk5NnZ2c8TV1mAAAAG3RSTlNAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAvEOwtAAAFVklEQVR4XpWWB67c2BUFb3g557T/hRo9/WUMZHlgr4Bg8Z4qQgQJlHI4A8SzFVrapvmTF9O7dmYRFZ60YiBhJRCgh1FYhiLAmdvX0CzTOpNE77ME0Zty/nWWzchDtiqrmQDeuv3powQ5ta2eN0FY0InkqDD73lT9c9lEzwUNqgFHs9VQce3TVClFCQrSTfOiYkVJQBmpbq2L6iZavPnAPcoU0dSw0SUTqz/GtrGuXfbyyBniKykOWQWGqwwma7ikVygbChHb6YOwSojk7QivQkOKFVdmPEYewoBthkQLlfEZcLeYagCnkYI3j8OmYth5nYHi/SeWIF5Ig1iRs6Hc3aj9BXbAXNuFxWjJSKH1YLp3CVCxe+FvMZvh1VUoGCHuNxJuCxIcFJr15H50bHHIFpLqSiuq1mWnDWRGQOTbDpXKPvLuOwgVSJkGk1M6VFyBGSqvTWiQAAA==")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.p
          className="text-[10px] font-semibold tracking-[0.6em] uppercase mb-6"
          style={{ color: "var(--green-mid)" }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Your morning ritual starts here
        </motion.p>

        <motion.h2
          className="text-5xl sm:text-6xl md:text-8xl font-semibold tracking-tight leading-none mb-8"
          style={{ color: "var(--text-dark)" }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Come visit
          <br />
          <span style={{ color: "var(--green-mid)" }}>us today.</span>
        </motion.h2>

        <motion.p
          className="text-base md:text-lg font-light leading-relaxed max-w-md mx-auto mb-14"
          style={{ color: "rgba(12,9,5,0.5)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
        >
          Open daily in Portland's Old Port. Every cup made fresh, every visit
          worth it.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.7 }}
        >
          <MagneticOrderBtn />
          <a
            href="/about"
            className="text-sm font-medium tracking-[0.15em] uppercase border-b pb-1"
            style={{
              color: "var(--brown-mid)",
              borderColor: "rgba(124,74,43,0.25)",
              transition: "color 0.3s",
            }}
          >
            Our story →
          </a>
        </motion.div>

        {/* Badges */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 mt-16 pt-10 border-t"
          style={{ borderColor: "rgba(12,9,5,0.08)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45 }}
        >
          {[
            "Open Daily",
            "Dine In & Takeaway",
            "Portland, Maine",
            "Est. 2012",
          ].map((badge) => (
            <span
              key={badge}
              className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.25em] uppercase"
              style={{ color: "rgba(42,90,62,0.6)" }}
            >
              <span
                className="w-1 h-1 rounded-full flex-shrink-0"
                style={{ background: "var(--green-mid)" }}
              />
              {badge}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
