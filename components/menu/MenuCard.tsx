"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Star, Sparkles } from "lucide-react";

export interface MenuItem {
  id: string;
  name: string;
  desc: string;
  price: string;
  tag?: string;
  category: "coffee" | "non-coffee" | "food";
  img: string;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export default function MenuCard({
  item,
  index,
}: {
  item: MenuItem;
  index: number;
}) {
  return (
    <motion.div
      className="group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: "rgba(244,235,224,0.03)",
        border: "1px solid rgba(244,235,224,0.07)",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.7,
        delay: (index % 4) * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: "200px" }}>
        <Image
          src={item.img}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 300px"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(12,9,5,0.5) 0%, transparent 60%)",
          }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          {item.isBestSeller && (
            <span
              className="inline-flex items-center gap-1 text-[8px] font-bold tracking-[0.3em] uppercase px-2.5 py-1 rounded-full"
              style={{ background: "var(--green-mid)", color: "var(--cream)" }}
            >
              <Star size={9} strokeWidth={2.5} fill="currentColor" />
              Best Seller
            </span>
          )}
          {item.isNew && (
            <span
              className="inline-flex items-center gap-1 text-[8px] font-bold tracking-[0.3em] uppercase px-2.5 py-1 rounded-full"
              style={{
                background: "var(--brown-accent)",
                color: "var(--cream)",
              }}
            >
              <Sparkles size={9} strokeWidth={2.5} />
              New
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-2 flex-1">
        {item.tag && (
          <span
            className="text-[9px] font-semibold tracking-[0.35em] uppercase"
            style={{ color: "var(--green-accent)" }}
          >
            {item.tag}
          </span>
        )}
        <h3
          className="text-base font-semibold tracking-tight"
          style={{ color: "var(--cream)" }}
        >
          {item.name}
        </h3>
        <p
          className="text-xs font-light leading-relaxed flex-1"
          style={{ color: "var(--text-muted)" }}
        >
          {item.desc}
        </p>
        <div
          className="flex items-center justify-between mt-3 pt-3"
          style={{ borderTop: "1px solid rgba(244,235,224,0.06)" }}
        >
          <span
            className="text-sm font-semibold"
            style={{ color: "var(--cream)" }}
          >
            {item.price}
          </span>
          <span
            className="text-[9px] font-semibold tracking-[0.3em] uppercase px-3 py-1.5 rounded-full transition-all duration-300 group-hover:bg-[#2A5A3E] group-hover:text-white"
            style={{
              background: "rgba(244,235,224,0.06)",
              color: "var(--text-muted)",
            }}
          >
            Order
          </span>
        </div>
      </div>
    </motion.div>
  );
}
