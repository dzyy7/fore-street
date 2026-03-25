"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Navbar from "@/components/ui/Navbar";
import Preloader from "@/components/ui/Preloader";
import SequenceScroll from "@/components/menu/SequenceScroll";
import AboutSection from "@/components/about/AboutSection";
import BentoGrid from "@/components/home/BentoGrid";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/ui/Footer";
import { motion } from "motion/react";
/* ── Custom cursor (desktop only) ── */
function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0),
    yRef = useRef(0);
  const cxRef = useRef(0),
    cyRef = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      xRef.current = e.clientX;
      yRef.current = e.clientY;
    };
    window.addEventListener("mousemove", onMove);
    let raf: number;
    const tick = () => {
      cxRef.current += (xRef.current - cxRef.current) * 0.15;
      cyRef.current += (yRef.current - cyRef.current) * 0.15;
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${cxRef.current - 6}px, ${cyRef.current - 6}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9997] hidden md:block mix-blend-difference"
      style={{ background: "var(--green-accent)", willChange: "transform" }}
    />
  );
}

/* ── Page ── */
export default function Home() {
  const [loadProgress, setLoadProgress] = useState(0);
  const [loadComplete, setLoadComplete] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const handleProgress = useCallback((p: number) => setLoadProgress(p), []);
  const handleComplete = useCallback(() => {
    setLoadComplete(true);
    setTimeout(() => setRevealed(true), 1200);
  }, []);

  return (
    <>
      <Cursor />
      <Preloader progress={loadProgress} isComplete={loadComplete} />
      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* ── Hero: 400vh scroll canvas ── */}
        <SequenceScroll
          onLoadProgress={handleProgress}
          onLoadComplete={handleComplete}
        />

        {/*
          All sections below sit in a z-10 wrapper that
          pulls up by 100vh to overlap the tail end of the hero.
          Each section carries its own background — no wrapper bg needed.
        */}
        <div className="-mt-[100vh] relative z-10">
          {/* Gradient bridge: canvas-dark → cream */}
          <div
            style={{
              height: "100vh",
              background:
                "linear-gradient(to bottom, var(--canvas-bg) 0%, var(--bg-light) 100%)",
              pointerEvents: "none",
            }}
          />

          {/* About — cream bg */}
          <AboutSection />

          {/* Bento grid — dark bg (self-contained) */}
          <BentoGrid />

          {/* Stats — green bg */}
          <Stats />

          {/* Testimonials — fullscreen */}
          <Testimonials />

          {/* CTA — dark bg */}
          <CTASection />

          {/* Footer */}
          <Footer />
        </div>
      </motion.main>
    </>
  );
}
