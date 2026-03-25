"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const stats = [
  {
    value: 12,
    suffix: "+",
    label: "Years Serving",
    sub: "Est. 2012, Portland ME",
  },
  {
    value: 24,
    suffix: "",
    label: "Menu Items",
    sub: "Always fresh, always rotating",
  },
  {
    value: 500,
    suffix: "K+",
    label: "Cups Served",
    sub: "And counting every day",
  },
  {
    value: 4,
    suffix: ".9★",
    label: "Customer Rating",
    sub: "Google & Tripadvisor",
  },
];

const MARQUEE_ITEMS = [
  "Open Daily",
  "·",
  "Dine In",
  "·",
  "Takeaway",
  "·",
  "Portland ME",
  "·",
  "Est. 2012",
  "·",
  "Good Coffee",
  "·",
];

function useCountUp(target: number, started: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const raf = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(raf);
      else setCount(target);
    };
    requestAnimationFrame(raf);
  }, [started, target, duration]);
  return count;
}

function StatCard({
  stat,
  index,
  started,
}: {
  stat: (typeof stats)[0];
  index: number;
  started: boolean;
}) {
  const count = useCountUp(stat.value, started);
  return (
    <motion.div
      className="relative flex flex-col py-10 px-8 border-r last:border-r-0"
      style={{ borderColor: "rgba(244,235,224,0.07)" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.1,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div
        className="flex items-end gap-1 leading-none mb-3"
        style={{ color: "var(--cream)" }}
      >
        <span className="text-6xl md:text-7xl font-black tabular-nums">
          {count}
        </span>
        <span
          className="text-2xl font-bold mb-1"
          style={{ color: "var(--green-accent)" }}
        >
          {stat.suffix}
        </span>
      </div>
      <h3
        className="text-sm font-semibold tracking-tight mb-1"
        style={{ color: "var(--cream)" }}
      >
        {stat.label}
      </h3>
      <p className="text-xs font-light" style={{ color: "var(--text-muted)" }}>
        {stat.sub}
      </p>
      <span
        className="absolute top-10 right-8 w-1.5 h-1.5 rounded-full"
        style={{ background: "var(--green-accent)" }}
      />
    </motion.div>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="process"
      className="overflow-hidden"
      style={{ background: "var(--green-deep)" }}
    >
      {/* Top marquee */}
      <div
        className="overflow-hidden border-b py-3 whitespace-nowrap"
        style={{ borderColor: "rgba(244,235,224,0.07)" }}
      >
        <div className="marquee-track inline-flex gap-6">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="text-[10px] font-semibold tracking-[0.4em] uppercase"
              style={{ color: "rgba(168,212,184,0.5)" }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Stats grid */}
      <div ref={sectionRef} className="max-w-[1200px] mx-auto">
        <div
          className="grid grid-cols-2 md:grid-cols-4 border-b"
          style={{ borderColor: "rgba(244,235,224,0.07)" }}
        >
          {stats.map((stat, i) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={i}
              started={isInView}
            />
          ))}
        </div>

        {/* Quote */}
        <motion.div
          className="py-16 px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p
            className="text-2xl md:text-3xl font-semibold tracking-tight leading-snug max-w-lg"
            style={{ color: "var(--cream)" }}
          >
            "A place to slow down, connect, and find comfort in every cup."
          </p>
          <div className="flex flex-col gap-1">
            <span
              className="text-xs font-semibold"
              style={{ color: "var(--green-pale)" }}
            >
              — James Porter
            </span>
            <span
              className="text-xs font-light"
              style={{ color: "rgba(168,212,184,0.5)" }}
            >
              Founder, Fore Street Coffee
            </span>
          </div>
        </motion.div>
      </div>

      {/* Bottom marquee */}
      <div
        className="overflow-hidden border-t py-3 whitespace-nowrap"
        style={{ borderColor: "rgba(244,235,224,0.07)" }}
      >
        <div
          className="inline-flex gap-6"
          style={{ animation: "marquee 25s linear infinite reverse" }}
        >
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="text-[10px] font-semibold tracking-[0.4em] uppercase"
              style={{ color: "rgba(168,212,184,0.5)" }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
