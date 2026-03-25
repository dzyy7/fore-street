'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Star } from 'lucide-react'
import PageHero from '@/components/about/PageHero'
import MenuCard, { type MenuItem } from '@/components/menu/MenuCard'
import Footer from '@/components/ui/Footer'

const menuItems: MenuItem[] = [
  /* ── Coffee ── */
  {
    id: 'c1', category: 'coffee', isBestSeller: true,
    name: 'Signature Fore Latte',
    tag: 'Our Icon',
    desc: 'House espresso, oat milk, vanilla bean, caramel drizzle. The drink that started it all.',
    price: 'IDR 45K',
    img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&q=80',
  },
  {
    id: 'c2', category: 'coffee', isBestSeller: true,
    name: 'Brown Sugar Espresso',
    tag: 'Top Rated',
    desc: 'Double shot over brown sugar syrup, fresh milk, cinnamon dust.',
    price: 'IDR 40K',
    img: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=600&q=80',
  },
  {
    id: 'c3', category: 'coffee',
    name: 'Classic Cappuccino',
    desc: 'Balanced espresso, silky microfoam, light cocoa dusting.',
    price: 'IDR 35K',
    img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80',
  },
  {
    id: 'c4', category: 'coffee',
    name: 'Cold Brew Float',
    tag: 'Seasonal',
    desc: '18-hour cold brew, vanilla soft serve, salted caramel. A dessert in a cup.',
    price: 'IDR 52K',
    img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80',
  },
  {
    id: 'c5', category: 'coffee', isNew: true,
    name: 'Dirty Horchata',
    tag: 'New Arrival',
    desc: 'Espresso poured over cinnamon rice milk, lightly sweetened.',
    price: 'IDR 48K',
    img: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=600&q=80',
  },
  {
    id: 'c6', category: 'coffee',
    name: 'Flat White',
    desc: 'Ristretto shots, velvety whole milk, perfect ratio.',
    price: 'IDR 38K',
    img: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&q=80',
  },
  /* ── Non-Coffee ── */
  {
    id: 'n1', category: 'non-coffee', isBestSeller: true,
    name: 'Matcha Oat Latte',
    tag: 'Fan Favourite',
    desc: 'Ceremonial grade matcha whisked with steamed oat milk, light sweetness.',
    price: 'IDR 42K',
    img: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=600&q=80',
  },
  {
    id: 'n2', category: 'non-coffee',
    name: 'Hojicha Latte',
    desc: 'Roasted green tea, warm and toasty, with steamed milk.',
    price: 'IDR 40K',
    img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80',
  },
  {
    id: 'n3', category: 'non-coffee',
    name: 'Dark Choco Malt',
    desc: 'Rich 70% cacao, malt powder, steamed milk, sea salt flakes.',
    price: 'IDR 38K',
    img: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=600&q=80',
  },
  {
    id: 'n4', category: 'non-coffee', isNew: true,
    name: 'Yuzu Sparkling Tea',
    tag: 'New & Cold',
    desc: 'Chilled sencha, yuzu juice, soda water, honey. Refreshingly bright.',
    price: 'IDR 45K',
    img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80',
  },
  /* ── Food ── */
  {
    id: 'f1', category: 'food', isBestSeller: true,
    name: 'Croffle & Cream',
    tag: 'Must Try',
    desc: 'Crispy croissant waffle, whipped cream, house berry jam. Best paired with any latte.',
    price: 'IDR 38K',
    img: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=600&q=80',
  },
  {
    id: 'f2', category: 'food',
    name: 'Avocado Toast',
    desc: 'Sourdough, smashed avo, chilli flakes, poached egg, micro herbs.',
    price: 'IDR 52K',
    img: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=600&q=80',
  },
  {
    id: 'f3', category: 'food',
    name: 'Banana Bread Slice',
    desc: 'House-baked daily, served warm with cultured butter.',
    price: 'IDR 28K',
    img: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=600&q=80',
  },
  {
    id: 'f4', category: 'food', isNew: true,
    name: 'Breakfast Sandwich',
    tag: 'New',
    desc: 'Brioche bun, fried egg, cheddar, smoked turkey, house aioli.',
    price: 'IDR 55K',
    img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=80',
  },
]

const TABS = [
  { id: 'all',       label: 'All',        count: menuItems.length },
  { id: 'coffee',    label: 'Coffee',     count: menuItems.filter(m => m.category === 'coffee').length },
  { id: 'non-coffee',label: 'Non-Coffee', count: menuItems.filter(m => m.category === 'non-coffee').length },
  { id: 'food',      label: 'Food',       count: menuItems.filter(m => m.category === 'food').length },
] as const

type Tab = typeof TABS[number]['id']

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState<Tab>('all')

  const filtered = activeTab === 'all'
    ? menuItems
    : menuItems.filter(m => m.category === activeTab)

  return (
    <div style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
      <PageHero
        label="Our Menu"
        title="Crafted with"
        accent="care."
        sub="Every item on our menu is made fresh, from quality ingredients, every single day."
        breadcrumb={{ label: 'Home', href: '/' }}
      />

      <section className="py-20 px-6 md:px-10 max-w-[1400px] mx-auto">

        {/* ── Filter Tabs ── */}
        <motion.div
          className="flex items-center gap-2 mb-14 overflow-x-auto pb-2"
          style={{ scrollbarWidth: 'none' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-300"
              style={{
                background: activeTab === tab.id ? 'var(--green-mid)' : 'rgba(244,235,224,0.05)',
                color: activeTab === tab.id ? 'var(--cream)' : 'var(--text-muted)',
                border: activeTab === tab.id ? '1px solid var(--green-accent)' : '1px solid rgba(244,235,224,0.07)',
              }}
            >
              {tab.label}
              <span
                className="text-[9px] px-1.5 py-0.5 rounded-full tabular-nums"
                style={{
                  background: activeTab === tab.id ? 'rgba(244,235,224,0.2)' : 'rgba(244,235,224,0.06)',
                  color: activeTab === tab.id ? 'var(--cream)' : 'rgba(244,235,224,0.3)',
                }}
              >
                {tab.count}
              </span>
            </button>
          ))}

          {/* Divider + note */}
          <div className="ml-auto flex-shrink-0">
            <span className="text-[10px] font-light" style={{ color: 'rgba(244,235,224,0.25)' }}>
              Prices are per item · Dine-in & takeaway
            </span>
          </div>
        </motion.div>

        {/* ── Best Sellers Banner (only on All tab) ── */}
        <AnimatePresence mode="wait">
          {activeTab === 'all' && (
            <motion.div
              className="mb-10 px-6 py-4 rounded-2xl flex items-center gap-4"
              style={{ background: 'rgba(42,90,62,0.1)', border: '1px solid rgba(61,138,96,0.15)' }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Star
                size={16}
                strokeWidth={2}
                fill="currentColor"
                style={{ color: 'var(--green-accent)', flexShrink: 0 }}
              />
              <p className="text-xs font-light" style={{ color: 'rgba(244,235,224,0.6)' }}>
                Items marked with{' '}
                <span className="inline-flex items-center gap-1 font-semibold" style={{ color: 'var(--green-accent)' }}>
                  <Star size={11} strokeWidth={2} fill="currentColor" />
                  Best Seller
                </span>{' '}
                are our most loved drinks and bites — the perfect starting point if it's your first visit.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {filtered.map((item, i) => (
              <MenuCard key={item.id} item={item} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Allergy note ── */}
        <motion.div
          className="mt-20 pt-10 border-t text-center"
          style={{ borderColor: 'rgba(244,235,224,0.06)' }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          <p className="text-xs font-light" style={{ color: 'rgba(244,235,224,0.25)' }}>
            Please inform our staff of any allergies or dietary requirements. Menu and prices subject to change without notice.
          </p>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}