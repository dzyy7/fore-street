"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  useScroll,
  useMotionValueEvent,
  motion,
  AnimatePresence,
} from "motion/react";

const FRAME_COUNT = 192;
const FRAMES_DIR = "/sequence/";

function frameSrc(i: number) {
  return `${FRAMES_DIR}ezgif-frame-${String(i).padStart(3, "0")}.jpg`;
}

interface SequenceScrollProps {
  onLoadProgress: (p: number) => void;
  onLoadComplete: () => void;
}

/* ── text shadow util ── */
const SHADOW = "0 2px 24px rgba(0,0,0,0.7), 0 0 48px rgba(0,0,0,0.4)";
const SHADOW_SM = "0 1px 12px rgba(0,0,0,0.6)";

/* ── Magnetic CTA ── */
function MagneticButton() {
  const btnRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0),
    yRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
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
      cx = lerp(cx, xRef.current, 0.12);
      cy = lerp(cy, yRef.current, 0.12);
      if (btnRef.current)
        btnRef.current.style.transform = `translate(${cx}px, ${cy}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      ref={btnRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="inline-flex"
    >
      <a
        href="/menu"
        className="group relative overflow-hidden flex items-center gap-3 px-8 py-4 rounded-full text-sm font-medium tracking-[0.15em] uppercase"
        style={{
          background: "var(--green-mid)",
          color: "var(--cream)",
          border: "1px solid var(--green-accent)",
        }}
      >
        <span className="relative z-10">See Our Menu</span>
        <span
          className="relative z-10 w-5 h-5 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1"
          style={{ background: "var(--green-accent)" }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M1 5h8M5 1l4 4-4 4"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span
          className="absolute inset-0 scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100"
          style={{ background: "var(--green-deep)" }}
        />
      </a>
    </div>
  );
}

/* ── Overlay wrapper ── */
function Overlay({
  children,
  align,
  visible,
}: {
  children: React.ReactNode;
  align: "center" | "left" | "right";
  visible: boolean;
}) {
  const alignClass =
    align === "center"
      ? "items-center text-center"
      : align === "left"
        ? "items-start text-left pl-10 md:pl-20"
        : "items-end text-right pr-10 md:pr-20";
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`absolute inset-0 flex flex-col justify-center pointer-events-none px-6 ${alignClass}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Main ── */
export default function SequenceScroll({
  onLoadProgress,
  onLoadComplete,
}: SequenceScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const frameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const needsDrawRef = useRef(false);
  const [activeOverlay, setActiveOverlay] = useState<0 | 1 | 2 | 3>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[index];
    if (!ctx || !img || !canvas || !img.complete || img.naturalWidth === 0)
      return;
    const { width: cw, height: ch } = canvas;
    const imgW = img.naturalWidth,
      imgH = img.naturalHeight;
    const canvasAspect = cw / ch,
      imgAspect = imgW / imgH;
    let sx = 0,
      sy = 0,
      sw = imgW,
      sh = imgH;
    if (imgAspect > canvasAspect) {
      sw = imgH * canvasAspect;
      sx = (imgW - sw) / 2;
    } else {
      sh = imgW / canvasAspect;
      sy = (imgH - sh) / 2;
    }
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
  }, []);

  useEffect(() => {
    const tick = () => {
      if (needsDrawRef.current) {
        drawFrame(frameRef.current);
        needsDrawRef.current = false;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [drawFrame]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const newFrame = Math.min(
      FRAME_COUNT - 1,
      Math.floor(latest * FRAME_COUNT),
    );
    if (newFrame !== frameRef.current) {
      frameRef.current = newFrame;
      needsDrawRef.current = true;
    }
    if (latest < 0.18) setActiveOverlay(0);
    else if (latest < 0.45) setActiveOverlay(1);
    else if (latest < 0.72) setActiveOverlay(2);
    else setActiveOverlay(3);
  });

  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      needsDrawRef.current = true;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    let loadedCount = 0;
    imagesRef.current = new Array(FRAME_COUNT).fill(null);
    const loadOne = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.src = frameSrc(i + 1);
        img.onload = img.onerror = () => {
          imagesRef.current[i] = img;
          loadedCount++;
          onLoadProgress(loadedCount / FRAME_COUNT);
          if (loadedCount === FRAME_COUNT) onLoadComplete();
          if (i === 0) {
            frameRef.current = 0;
            needsDrawRef.current = true;
          }
          resolve();
        };
      });
    loadOne(0).then(() => {
      Promise.all(
        Array.from({ length: FRAME_COUNT - 1 }, (_, i) => loadOne(i + 1)),
      );
    });
  }, [onLoadProgress, onLoadComplete]);

  return (
    <div
      ref={containerRef}
      className="relative h-[400vh]"
      style={{ background: "var(--canvas-bg)" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ background: "var(--canvas-bg)" }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 35%, rgba(12,9,5,0.65) 100%)",
          }}
        />

        {/* ── Overlay 0: Hero ── */}
        <Overlay align="center" visible={activeOverlay === 0}>
          <motion.p
            className="mb-3 text-[10px] font-semibold tracking-[0.5em] uppercase"
            style={{ color: "var(--green-accent)", textShadow: SHADOW_SM }}
          >
            Portland, Maine — Est. 2012
          </motion.p>
          <h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tight leading-none"
            style={{ color: "var(--cream)", textShadow: SHADOW }}
          >
            Fore
            <br />
            <span style={{ color: "var(--green-accent)", textShadow: SHADOW }}>
              Street
            </span>
          </h1>
          <p
            className="mt-5 text-base md:text-lg font-light tracking-[0.1em]"
            style={{ color: "rgba(244,235,224,0.85)", textShadow: SHADOW_SM }}
          >
            Where craft meets ritual
          </p>
          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <motion.div
              className="w-px h-12"
              style={{
                background:
                  "linear-gradient(to bottom, var(--green-accent), transparent)",
              }}
              animate={{ scaleY: [0, 1, 0], originY: 0 }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span
              className="text-[9px] tracking-[0.4em] uppercase"
              style={{ color: "rgba(244,235,224,0.5)", textShadow: SHADOW_SM }}
            >
              Scroll
            </span>
          </div>
        </Overlay>

        {/* ── Overlay 1: Left ── */}
        <Overlay align="left" visible={activeOverlay === 1}>
          <p
            className="mb-2 text-[9px] font-semibold tracking-[0.5em] uppercase"
            style={{ color: "var(--green-accent)", textShadow: SHADOW_SM }}
          >
            The Experience
          </p>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight max-w-sm"
            style={{ color: "var(--cream)", textShadow: SHADOW }}
          >
            Every cup
            <br />
            <em
              className="not-italic"
              style={{ color: "var(--brown-accent)", textShadow: SHADOW }}
            >
              tells a story.
            </em>
          </h2>
          <p
            className="mt-4 text-sm font-light leading-relaxed max-w-xs"
            style={{ color: "rgba(244,235,224,0.8)", textShadow: SHADOW_SM }}
          >
            Carefully crafted drinks, served in a space designed for comfort and
            community.
          </p>
        </Overlay>

        {/* ── Overlay 2: Right ── */}
        <Overlay align="right" visible={activeOverlay === 2}>
          <p
            className="mb-2 text-[9px] font-semibold tracking-[0.5em] uppercase"
            style={{ color: "var(--green-accent)", textShadow: SHADOW_SM }}
          >
            The Ritual
          </p>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight max-w-sm"
            style={{ color: "var(--cream)", textShadow: SHADOW }}
          >
            Brewed with
            <br />
            <em
              className="not-italic"
              style={{ color: "var(--green-pale)", textShadow: SHADOW }}
            >
              purpose.
            </em>
          </h2>
          <p
            className="mt-4 text-sm font-light leading-relaxed max-w-xs"
            style={{ color: "rgba(244,235,224,0.8)", textShadow: SHADOW_SM }}
          >
            From your first morning espresso to your afternoon cold brew — we're
            here for every moment.
          </p>
        </Overlay>

        {/* ── Overlay 3: CTA ── */}
        <Overlay align="center" visible={activeOverlay === 3}>
          <p
            className="mb-3 text-[9px] font-semibold tracking-[0.5em] uppercase"
            style={{ color: "var(--green-accent)", textShadow: SHADOW_SM }}
          >
            Your next favourite spot
          </p>
          <h2
            className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-none mb-2"
            style={{ color: "var(--cream)", textShadow: SHADOW }}
          >
            Begin your
            <br />
            <span style={{ color: "var(--brown-accent)", textShadow: SHADOW }}>
              ritual.
            </span>
          </h2>
          <p
            className="mt-4 mb-10 text-sm font-light tracking-wide"
            style={{ color: "rgba(244,235,224,0.75)", textShadow: SHADOW_SM }}
          >
            Open daily · Portland, Maine
          </p>
          <div className="pointer-events-auto">
            <MagneticButton />
          </div>
        </Overlay>
      </div>
    </div>
  );
}
