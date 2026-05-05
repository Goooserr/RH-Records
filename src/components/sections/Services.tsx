'use client';

import { motion } from 'framer-motion';
import { Disc3, Music2, Mic2, Headphones, Radio, Star, ChevronRight } from 'lucide-react';
import GlowCard from '@/components/ui/GlowCard';
import Link from 'next/link';

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const services = [
  {
    icon:    Disc3,
    color:   'rh-purple',
    glow:    'purple' as const,
    title:   'DJ Sets & Événements',
    desc:    'Soirées privées, clubs, mariages, événements d\'entreprise. Mix live adapté à votre ambiance.',
    price:   'Sur devis',
    tags:    ['Clubbing', 'Mariage', 'Corporate'],
    className: 'md:col-span-2 md:row-span-2',
  },
  {
    icon:    Music2,
    color:   'rh-cyan',
    glow:    'cyan' as const,
    title:   'Beatmaking',
    desc:    'Beats exclusifs Trap, UK Drill, Afro, R&B.',
    price:   'Dès 50€',
    tags:    ['Trap', 'Drill'],
    className: 'md:col-span-2',
  },
  {
    icon:    Mic2,
    color:   'rh-pink',
    glow:    'pink' as const,
    title:   'Sessions Studio',
    desc:    'Enregistrement vocal, prise de son professionnelle.',
    price:   'Dès 30€/h',
    tags:    ['Recording', 'Rap'],
    className: 'md:col-span-1',
  },
  {
    icon:    Headphones,
    color:   'rh-purple',
    glow:    'purple' as const,
    title:   'Mix & Master',
    desc:    'Post-production radio-ready.',
    price:   'Dès 80€',
    tags:    ['Mix', 'Master'],
    className: 'md:col-span-1',
  },
  {
    icon:    Radio,
    color:   'rh-cyan',
    glow:    'cyan' as const,
    title:   'Production',
    desc:    'Arrangements complets, direction artistique EP/Single.',
    price:   'Sur devis',
    tags:    ['EP', 'Single'],
    className: 'md:col-span-2',
  },
  {
    icon:    Star,
    color:   'rh-pink',
    glow:    'pink' as const,
    title:   'Coaching',
    desc:    'Identité sonore, technique, stratégie.',
    price:   'Dès 60€/h',
    tags:    ['Artiste', 'Stratégie'],
    className: 'md:col-span-2',
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="section-padding relative overflow-hidden"
      aria-labelledby="services-title"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="text-rh-purple font-mono text-xs tracking-[0.3em] uppercase mb-4 opacity-80">
            Services & Expertise
          </motion.p>
          <motion.h2
            id="services-title"
            variants={fadeUp}
            className="font-syne font-extrabold text-rh-white leading-tight mb-6"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            L'excellence <span className="text-gradient-neon">Sonore</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-rh-grey max-w-2xl mx-auto text-lg leading-relaxed">
            De la première note jusqu'au mastering final, transformons votre vision en succès radio-ready à Chambéry.
          </motion.p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {services.map(({ icon: Icon, color, glow, title, desc, price, tags, className }) => (
            <motion.div key={title} variants={fadeUp} className={className}>
              <GlowCard 
                glow={glow} 
                className="p-8 h-full flex flex-col gap-6 transition-all duration-300 hover:translate-y-[-4px]"
              >
                <div className="flex items-start justify-between">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/5"
                    style={{ background: `var(--${color})15` }}
                  >
                    <Icon size={28} style={{ color: `var(--${color})` }} strokeWidth={1.5} />
                  </div>
                  <div
                    className="text-[10px] font-mono font-bold px-3 py-1.5 rounded-lg border"
                    style={{
                      background: `var(--${color})10`,
                      borderColor: `var(--${color})25`,
                      color:      `var(--${color})`,
                    }}
                  >
                    {price}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-syne font-bold text-rh-white text-xl leading-tight">{title}</h3>
                  <p className="text-rh-grey text-sm leading-relaxed opacity-80">{desc}</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/5 text-rh-grey border border-white/5"
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
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/booking"
            className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-rh-white text-rh-black font-bold transition-all duration-300 hover:bg-rh-purple hover:text-white overflow-hidden shadow-2xl shadow-purple-500/10"
          >
            <span className="relative z-10">Démarrer un projet</span>
            <ChevronRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            
            {/* Animated Glow on hover */}
            <div className="absolute inset-0 bg-gradient-neon opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </motion.div>
      </div>

      {/* Decorative Aurora Blob for section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-rh-purple/5 blur-[160px] -z-10 pointer-events-none" />
    </section>
  );
}
