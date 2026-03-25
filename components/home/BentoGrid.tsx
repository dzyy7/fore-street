"use client";

import { motion } from "motion/react";
import Image from "next/image";

const cards = [
  {
    id: "ca",
    title: "Signature Fore Latte",
    tag: "⭐ Best Seller",
    desc: "Our house espresso blended with oat milk, vanilla bean, and a hint of caramel. The drink that started it all.",
    price: "IDR 45K",
    img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&q=80",
    accent: "var(--green-mid)",
  },
  {
    id: "cb",
    title: "Matcha Oat Latte",
    tag: "Fan Favourite",
    desc: "Ceremonial grade matcha, steamed oat milk, light sweetness.",
    price: "IDR 42K",
    img: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=800&q=80",
    accent: "var(--green-accent)",
  },
  {
    id: "cc",
    title: "Cold Brew Float",
    tag: "Seasonal",
    desc: "18-hour cold brew, vanilla soft serve, salted caramel drizzle.",
    price: "IDR 52K",
    img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80",
    accent: "var(--brown-deep)",
  },
  {
    id: "cd",
    title: "Croffle & Cream",
    tag: "Food Pairing",
    desc: "Crispy croissant waffle, whipped cream, house berry jam. Best paired with any latte.",
    price: "IDR 38K",
    img: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=800&q=80",
    accent: "var(--brown-mid)",
  },
  {
    id: "ce",
    title: "Brown Sugar Espresso",
    tag: "Top Rated",
    desc: "Double shot espresso over brown sugar syrup and fresh milk.",
    price: "IDR 40K",
    img: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=800&q=80",
    accent: "var(--brown-accent)",
  },
];

function BentoCard({
  card,
  index,
  style,
}: {
  card: (typeof cards)[0];
  index: number;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className="bento-card relative overflow-hidden rounded-2xl cursor-pointer"
      style={{ background: "#1A1108", minHeight: 220, ...style }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div
        className="bento-img absolute inset-0"
        style={{ transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)" }}
      >
        <Image
          src={card.img}
          alt={card.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 600px"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(12,9,5,0.92) 0%, rgba(12,9,5,0.08) 55%)",
          }}
        />
      </div>

      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <span
          className="inline-block self-start text-[9px] font-semibold tracking-[0.35em] uppercase px-3 py-1 rounded-full mb-3"
          style={{
            background: "rgba(244,235,224,0.1)",
            color: "var(--cream)",
            border: "1px solid rgba(244,235,224,0.14)",
          }}
        >
          {card.tag}
        </span>
        <h3
          className="text-xl md:text-2xl font-semibold tracking-tight leading-snug"
          style={{ color: "var(--cream)" }}
        >
          {card.title}
        </h3>
        <p
          className="bento-desc mt-2 text-xs leading-relaxed font-light max-w-xs"
          style={{
            color: "rgba(244,235,224,0.65)",
            opacity: 0,
            transform: "translateY(6px)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
          }}
        >
          {card.desc}
        </p>
        <div className="bento-arrow mt-3 inline-flex items-center gap-2 self-start">
          <span
            className="text-xs font-semibold tracking-wide"
            style={{
              color: "var(--cream)",
              opacity: 0,
              transition: "opacity 0.35s ease",
            }}
          >
            {card.price}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function BentoGrid() {
  return (
    <section
      id="coffee"
      className="py-24 md:py-36 overflow-hidden"
      style={{ background: "var(--bg-dark)" }}
    >
      <style>{`
        .bento-card:hover .bento-img   { transform: scale(1.05); }
        .bento-card:hover .bento-desc  { opacity: 1 !important; transform: translateY(0) !important; }
        .bento-card:hover .bento-arrow span { opacity: 1 !important; }
      `}</style>

      <div className="px-6 md:px-10 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <motion.p
              className="flex items-center gap-3 text-[10px] font-semibold tracking-[0.5em] uppercase mb-4"
              style={{ color: "var(--green-accent)" }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span
                className="block w-6 h-px"
                style={{ background: "var(--green-accent)" }}
              />
              Best Sellers
            </motion.p>
            <motion.h2
              className="text-4xl md:text-6xl font-semibold tracking-tight leading-none"
              style={{ color: "var(--cream)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              Crowd
              <br />
              <span style={{ color: "var(--green-accent)" }}>favourites</span>
            </motion.h2>
          </div>
          <motion.a
            href="/menu"
            className="self-start md:self-auto text-sm font-medium tracking-[0.15em] uppercase border-b pb-1"
            style={{
              color: "var(--text-muted)",
              borderColor: "rgba(154,123,98,0.3)",
              transition: "color 0.3s",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Full menu →
          </motion.a>
        </div>

        {/* Desktop bento */}
        <div
          className="hidden md:grid gap-4"
          style={{
            gridTemplateColumns: "2fr 1fr 1fr",
            gridTemplateRows: "300px 300px",
            gridTemplateAreas: `"ca cb cc" "ca cd ce"`,
          }}
        >
          {cards.map((card, i) => (
            <BentoCard
              key={card.id}
              card={card}
              index={i}
              style={{ gridArea: card.id }}
            />
          ))}
        </div>

        {/* Mobile */}
        <div className="flex flex-col gap-4 md:hidden">
          {cards.map((card, i) => (
            <BentoCard
              key={card.id}
              card={card}
              index={i}
              style={{ height: "260px" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
