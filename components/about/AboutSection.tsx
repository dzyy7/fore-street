"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";

const HEADLINE =
  "We believe great coffee is grown with care, roasted with precision, and shared with intention — connecting you to the hands that brought it to life.";

/* ── Char component: owns its own hooks ── */
function Char({
  char,
  index,
  total,
  scrollYProgress,
}: {
  char: string;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = index / total;
  const end = Math.min(start + 0.06, 1);
  const opacity = useTransform(scrollYProgress, [start, end], [0.12, 1]);
  const color = useTransform(
    scrollYProgress,
    [start, end],
    ["rgba(12,9,5,0.12)", "rgba(12,9,5,1)"],
  );
  return (
    <motion.span style={{ opacity, color, display: "inline" }} aria-hidden>
      {char}
    </motion.span>
  );
}

export default function AboutSection() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 0.8", "end 0.4"], // Sesuaikan angka "0.4" ini kalau pengen kelar lebih cepet/lambat
  });

  const chars = Array.from(HEADLINE);

  return (
    <section
      id="about"
      className="relative py-32 md:py-48 px-6 md:px-16 overflow-hidden"
      style={{ background: "var(--bg-light)" }}
    >
      {/* Large ghost number */}
      <span
        className="absolute top-12 right-8 text-[160px] md:text-[240px] font-black select-none pointer-events-none leading-none"
        style={{
          color: "transparent",
          WebkitTextStroke: "1px rgba(44,90,62,0.07)",
        }}
      >
        01
      </span>

      <div className="max-w-5xl mx-auto">
        {/* Label */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="block w-12 h-px"
            style={{ background: "var(--green-mid)" }}
          />
          <span
            className="text-[10px] font-semibold tracking-[0.5em] uppercase"
            style={{ color: "var(--green-mid)" }}
          >
            About the craft
          </span>
        </motion.div>

        {/* Scroll-reveal headline */}
        <p
          ref={textRef}
          className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight"
          aria-label={HEADLINE}
        >
          {chars.map((char, i) => (
            <Char
              key={i}
              char={char}
              index={i}
              total={chars.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </p>

        {/* Two info columns */}
        <div
          className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 border-t pt-12"
          style={{ borderColor: "rgba(12,9,5,0.08)" }}
        >
          {[
            {
              heading: "Our Origin",
              body: "Founded on the cobbled streets of Portland's Old Port, Fore Street Coffee has been a beacon for those who believe coffee is more than a commodity — it's a ritual.",
              num: "2012",
            },
            {
              heading: "Our Promise",
              body: "Direct-trade relationships with 48 farms across Ethiopia, Colombia, and Guatemala mean every bean we roast comes with a story, and a fair wage for the people who grew it.",
              num: "48+",
            },
          ].map((item) => (
            <motion.div
              key={item.heading}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="block text-5xl font-black mb-4 leading-none"
                style={{ color: "var(--green-mid)" }}
              >
                {item.num}
              </span>
              <h3
                className="text-lg font-semibold mb-3 tracking-tight"
                style={{ color: "var(--text-dark)" }}
              >
                {item.heading}
              </h3>
              <p
                className="text-sm leading-relaxed font-light"
                style={{ color: "rgba(12,9,5,0.6)" }}
              >
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
