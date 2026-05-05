'use client';

import { motion } from 'framer-motion';
import { Disc3, Music2, Mic2, Headphones, Radio, Star } from 'lucide-react';
import GlowCard from '@/components/ui/GlowCard';
import Link from 'next/link';

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const services = [
  {
    icon:    Disc3,
    color:   'rh-purple',
    glow:    'purple' as const,
    title:   'DJ Sets & Événements',
    desc:    'Soirées privées, clubs, mariages, événements d\'entreprise. Mix live adapté à votre ambiance.',
    price:   'Sur devis',
    tags:    ['Clubbing', 'Mariage', 'Corporate', 'Festival'],
  },
  {
    icon:    Music2,
    color:   'rh-cyan',
    glow:    'cyan' as const,
    title:   'Beatmaking',
    desc:    'Beats exclusifs Trap, UK Drill, Afro, R&B. Licence exclusive ou non-exclusive disponible.',
    price:   'Dès 50€',
    tags:    ['Trap', 'Drill', 'Afro', 'R&B'],
  },
  {
    icon:    Mic2,
    color:   'rh-pink',
    glow:    'pink' as const,
    title:   'Sessions Studio',
    desc:    'Enregistrement vocal, prise de son professionnelle dans un studio acoustiquement traité.',
    price:   'Dès 30€/h',
    tags:    ['Recording', 'Rap', 'Chant', 'Podcast'],
  },
  {
    icon:    Headphones,
    color:   'rh-purple',
    glow:    'purple' as const,
    title:   'Mixage & Mastering',
    desc:    'Post-production professionnelle pour un son radio-ready. Format livré : WAV 24bit.',
    price:   'Dès 80€',
    tags:    ['Mix', 'Master', 'Radio-ready', 'WAV 24bit'],
  },
  {
    icon:    Radio,
    color:   'rh-cyan',
    glow:    'cyan' as const,
    title:   'Production musicale',
    desc:    'Arrangements complets, direction artistique, production d\'EP ou single de A à Z.',
    price:   'Sur devis',
    tags:    ['EP', 'Single', 'Arrangements', 'Direction'],
  },
  {
    icon:    Star,
    color:   'rh-pink',
    glow:    'pink' as const,
    title:   'Coaching artistique',
    desc:    'Accompagnement pour artistes émergents : identité sonore, technique, stratégie.',
    price:   'Dès 60€/h',
    tags:    ['Coaching', 'Artiste', 'Stratégie', 'Identité'],
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="section-padding bg-rh-black relative"
      aria-labelledby="services-title"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="text-rh-purple font-mono text-sm tracking-widest uppercase mb-3">
            Ce que je propose
          </motion.p>
          <motion.h2
            id="services-title"
            variants={fadeUp}
            className="font-syne font-extrabold text-rh-white leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Services <span className="text-gradient-neon">RH Records</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-rh-grey max-w-xl mx-auto">
            De la création beatmaking jusqu'au mastering final, un accompagnement complet pour vos projets musicaux à Chambéry.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {services.map(({ icon: Icon, color, glow, title, desc, price, tags }) => (
            <motion.div key={title} variants={fadeUp}>
              <GlowCard glow={glow} className="p-6 h-full flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `var(--${color})22` }}
                  >
                    <Icon size={22} style={{ color: `var(--${color})` }} strokeWidth={1.8} />
                  </div>
                  <span
                    className="text-xs font-mono font-semibold px-3 py-1 rounded-full"
                    style={{
                      background: `var(--${color})18`,
                      color:      `var(--${color})`,
                    }}
                  >
                    {price}
                  </span>
                </div>

                <div>
                  <h3 className="font-syne font-bold text-rh-white text-base mb-2">{title}</h3>
                  <p className="text-rh-grey text-sm leading-relaxed">{desc}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full bg-rh-surface text-rh-grey border border-rh-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-neon text-white font-semibold transition-all duration-200 hover:glow-purple cursor-pointer font-inter"
          >
            Demander un devis
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
