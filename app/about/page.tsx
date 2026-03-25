"use client";

import { motion } from "motion/react";
import Image from "next/image";
import PageHero from "@/components/about/PageHero";
import OpenStatus from "@/components/about/OpenStatus";
import Footer from "@/components/ui/Footer";
import {
  ArrowRight,
  Coffee,
  Leaf,
  Mail,
  Phone,
  Sparkles,
  Users,
} from "lucide-react";

const hours = [
  { day: "Monday", short: "Mon", time: "07:00 – 22:00" },
  { day: "Tuesday", short: "Tue", time: "07:00 – 22:00" },
  { day: "Wednesday", short: "Wed", time: "07:00 – 22:00" },
  { day: "Thursday", short: "Thu", time: "07:00 – 22:00" },
  { day: "Friday", short: "Fri", time: "07:00 – 22:00" },
  { day: "Saturday", short: "Sat", time: "08:00 – 23:00" },
  { day: "Sunday", short: "Sun", time: "08:00 – 21:00" },
];

const values = [
  {
    icon: Coffee,
    title: "Quality First",
    desc: "Every drink made with precision, no shortcuts.",
  },
  {
    icon: Leaf,
    title: "Sustainably Sourced",
    desc: "Beans from ethical farms that pay fair wages.",
  },
  {
    icon: Users,
    title: "Community Driven",
    desc: "A space for Portland to gather, work, and connect.",
  },
  {
    icon: Sparkles,
    title: "Craft & Intention",
    desc: "Each cup is a small act of care.",
  },
];

export default function AboutPage() {
  const todayIndex = new Date().getDay(); // 0=Sun
  // Remap: our array is Mon=0…Sun=6
  const todayRow = todayIndex === 0 ? 6 : todayIndex - 1;

  return (
    <div style={{ background: "var(--bg-dark)" }}>
      <PageHero
        label="Our Story"
        title="More than"
        accent="a coffee shop."
        sub="A place to slow down, connect, and find comfort in every cup."
        breadcrumb={{ label: "Home", href: "/" }}
      />

      {/* ── Profile Section ── */}
      <section className="py-24 md:py-36 px-6 md:px-10 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="text-[10px] font-semibold tracking-[0.5em] uppercase mb-6"
              style={{ color: "var(--green-accent)" }}
            >
              Est. 2012
            </p>
            <h2
              className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight mb-8"
              style={{ color: "var(--cream)" }}
            >
              Born on the cobbled streets of Portland's Old Port
            </h2>
            <div
              className="space-y-5 text-sm font-light leading-relaxed"
              style={{ color: "rgba(244,235,224,0.6)" }}
            >
              <p>
                Fore Street Coffee opened its doors in 2012 with a single
                vision: to create a space where great coffee and genuine
                hospitality could exist in perfect harmony. Nestled in
                Portland's historic Old Port district, we've grown from a small
                neighbourhood favourite into a beloved gathering place for
                locals and travellers alike.
              </p>
              <p>
                We believe coffee is more than a beverage — it's a ritual, a
                conversation starter, a reason to pause. That belief guides
                everything we do, from the way we source our beans to the way we
                design our space.
              </p>
              <p>
                Every drink on our menu is crafted with intention, using quality
                ingredients and techniques refined over more than a decade of
                practice.
              </p>
            </div>
          </motion.div>

          {/* Image grid */}
          <motion.div
            className="grid grid-cols-2 gap-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ height: "280px" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1442975631134-a099765a6ced?w=600&q=80"
                alt="Inside Fore Street"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="relative rounded-2xl overflow-hidden flex-1">
                <Image
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80"
                  alt="Barista at work"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden flex-1">
                <Image
                  src="https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&q=80"
                  alt="Coffee close up"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <div
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 border-t pt-16"
          style={{ borderColor: "rgba(244,235,224,0.06)" }}
        >
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.8 }}
              className="flex flex-col gap-3"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "rgba(61,138,96,0.12)",
                  border: "1px solid rgba(61,138,96,0.2)",
                }}
              >
                <v.icon
                  size={18}
                  strokeWidth={1.5}
                  style={{ color: "var(--green-accent)" }}
                />
              </div>
              <h3
                className="text-sm font-semibold tracking-tight"
                style={{ color: "var(--cream)" }}
              >
                {v.title}
              </h3>
              <p
                className="text-xs font-light leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Hours Section ── */}
      <section
        className="py-24 md:py-32 px-6 md:px-10"
        style={{ background: "var(--bg-light)" }}
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <motion.p
                className="flex items-center gap-3 text-[10px] font-semibold tracking-[0.5em] uppercase mb-5"
                style={{ color: "var(--green-mid)" }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span
                  className="block w-6 h-px"
                  style={{ background: "var(--green-mid)" }}
                />
                Opening Hours
              </motion.p>
              <motion.h2
                className="text-4xl md:text-5xl font-semibold tracking-tight leading-none mb-8"
                style={{ color: "var(--text-dark)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                We're here
                <br />
                <span style={{ color: "var(--green-mid)" }}>every day.</span>
              </motion.h2>
              <OpenStatus />
            </div>

            {/* Hours table */}
            <motion.div
              className="flex flex-col divide-y"
              style={{ borderColor: "rgba(12,9,5,0.07)" }}
            >
              {hours.map((h, i) => {
                const isToday = i === todayRow;
                return (
                  <div
                    key={h.day}
                    className="flex items-center justify-between py-4 px-4 rounded-xl transition-all"
                    style={{
                      background: isToday
                        ? "rgba(42,90,62,0.08)"
                        : "transparent",
                      borderLeft: isToday
                        ? "2px solid var(--green-mid)"
                        : "2px solid transparent",
                    }}
                  >
                    <span
                      className="text-sm font-medium"
                      style={{
                        color: isToday
                          ? "var(--text-dark)"
                          : "rgba(12,9,5,0.5)",
                      }}
                    >
                      {h.day}
                      {isToday && (
                        <span
                          className="ml-2 text-[9px] font-bold tracking-[0.3em] uppercase"
                          style={{ color: "var(--green-mid)" }}
                        >
                          Today
                        </span>
                      )}
                    </span>
                    <span
                      className="text-sm font-semibold tabular-nums"
                      style={{
                        color: isToday
                          ? "var(--green-mid)"
                          : "rgba(12,9,5,0.6)",
                      }}
                    >
                      {h.time}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Location Section ── */}
      <section
        className="py-24 md:py-32 px-6 md:px-10"
        style={{ background: "var(--bg-dark)" }}
      >
        <div className="max-w-[1200px] mx-auto">
          <motion.p
            className="flex items-center gap-3 text-[10px] font-semibold tracking-[0.5em] uppercase mb-5"
            style={{ color: "var(--green-accent)" }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span
              className="block w-6 h-px"
              style={{ background: "var(--green-accent)" }}
            />
            Location
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl font-semibold tracking-tight leading-none mb-12"
            style={{ color: "var(--cream)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Come find us
            <br />
            <span style={{ color: "var(--green-accent)" }}>
              in the Old Port.
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 items-start">
            {/* Address card */}
            <motion.div
              className="rounded-2xl p-8"
              style={{
                background: "rgba(244,235,224,0.04)",
                border: "1px solid rgba(244,235,224,0.07)",
              }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3
                className="text-xs font-semibold tracking-[0.3em] uppercase mb-6"
                style={{ color: "var(--green-accent)" }}
              >
                Address
              </h3>
              <p
                className="text-2xl font-semibold mb-1"
                style={{ color: "var(--cream)" }}
              >
                288 Fore Street
              </p>
              <p
                className="text-sm font-light mb-6"
                style={{ color: "var(--text-muted)" }}
              >
                Portland, Maine 04101
                <br />
                United States
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2.5">
                  <Phone
                    size={13}
                    strokeWidth={1.5}
                    style={{ color: "var(--green-accent)", flexShrink: 0 }}
                  />
                  <span
                    className="text-xs font-light"
                    style={{ color: "var(--text-muted)" }}
                  >
                    +1 (207) 555-0123
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail
                    size={13}
                    strokeWidth={1.5}
                    style={{ color: "var(--green-accent)", flexShrink: 0 }}
                  />
                  <span
                    className="text-xs font-light"
                    style={{ color: "var(--text-muted)" }}
                  >
                    hello@forestreet.coffee
                  </span>
                </div>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.25em] uppercase px-5 py-3 rounded-full transition-all duration-300 hover:bg-[#3D8A60]"
                style={{
                  background: "var(--green-mid)",
                  color: "var(--cream)",
                }}
              >
                Open in Maps
                <ArrowRight size={12} strokeWidth={2} />
              </a>
            </motion.div>

            {/* Map */}
            <motion.div
              className="relative rounded-2xl overflow-hidden"
              style={{ height: "420px", background: "#1A1108" }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.9 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2839.7!2d-70.2568!3d43.6591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDM5JzMyLjgiTiA3MMKwMTUnMjQuNSJX!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: "grayscale(1) brightness(0.7) contrast(1.1)",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Fore Street Coffee map"
              />
              {/* Map overlay label */}
              <div
                className="absolute bottom-4 left-4 px-4 py-2 rounded-lg"
                style={{
                  background: "rgba(12,9,5,0.85)",
                  border: "1px solid rgba(244,235,224,0.1)",
                }}
              >
                <p
                  className="text-xs font-semibold"
                  style={{ color: "var(--cream)" }}
                >
                  Fore Street Coffee
                </p>
                <p
                  className="text-[10px]"
                  style={{ color: "var(--text-muted)" }}
                >
                  288 Fore St, Portland ME
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
