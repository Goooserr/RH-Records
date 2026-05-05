'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle, Cpu, Mic, Speaker, Monitor, ArrowRight } from 'lucide-react';
import GlowCard from '@/components/ui/GlowCard';

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const equipment = [
  { icon: Cpu,     name: 'DAW',        value: 'Ableton Live 11 Suite' },
  { icon: Mic,     name: 'Micro',      value: 'Shure SM7B + Rode NT1' },
  { icon: Speaker, name: 'Monitoring', value: 'Yamaha HS8 Studio' },
  { icon: Monitor, name: 'Interface',  value: 'Focusrite Scarlett 4i4' },
];

const features = [
  'Cabine acoustiquement traitée',
  'Enregistrement 24bit / 96kHz',
  'Monitoring professionnel',
  'Plug-ins haut de gamme (Waves, FabFilter)',
  'Accès direct depuis le centre de Chambéry',
  'Sessions flexibles (demi-journée / journée)',
];

const rates = [
  { label: '1 heure',       price: '30€',  note: 'Idéal pour un couplet' },
  { label: 'Demi-journée',  price: '100€', note: '4 heures + mixage inclus' },
  { label: 'Journée',       price: '180€', note: '8 heures + mixage + master' },
];

export default function StudioSection() {
  return (
    <section
      id="studio-section"
      className="section-padding bg-rh-dark relative overflow-hidden"
      aria-labelledby="studio-section-title"
    >
      {/* Glow droit */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.p variants={fadeUp} className="text-rh-cyan font-mono text-sm tracking-widest uppercase mb-3">
            Studio d'enregistrement
          </motion.p>
          <motion.h2
            id="studio-section-title"
            variants={fadeUp}
            className="font-syne font-extrabold text-rh-white leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Un studio <span className="text-gradient-neon">pro à Chambéry</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

          {/* Équipements + Features */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="space-y-8"
          >
            {/* Équipement */}
            <motion.div variants={fadeUp}>
              <h3 className="font-syne font-semibold text-rh-white mb-4 text-lg">Équipement studio</h3>
              <div className="grid grid-cols-2 gap-3">
                {equipment.map(({ icon: Icon, name, value }) => (
                  <GlowCard key={name} glow="cyan" className="p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-rh-cyan/10 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-rh-cyan" strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="text-rh-grey text-xs">{name}</p>
                      <p className="text-rh-white text-sm font-medium font-syne leading-tight">{value}</p>
                    </div>
                  </GlowCard>
                ))}
              </div>
            </motion.div>

            {/* Features */}
            <motion.div variants={fadeUp}>
              <h3 className="font-syne font-semibold text-rh-white mb-4 text-lg">Ce qui est inclus</h3>
              <ul className="space-y-2.5" role="list">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-rh-grey text-sm">
                    <CheckCircle size={15} className="text-rh-cyan shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Tarifs */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.h3 variants={fadeUp} className="font-syne font-semibold text-rh-white mb-6 text-lg">
              Tarifs studio
            </motion.h3>

            <div className="space-y-4 mb-8">
              {rates.map(({ label, price, note }) => (
                <motion.div key={label} variants={fadeUp}>
                  <GlowCard glow="purple" className="p-5 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-syne font-bold text-rh-white text-base">{label}</p>
                      <p className="text-rh-grey text-xs mt-0.5">{note}</p>
                    </div>
                    <span className="font-syne font-extrabold text-2xl text-gradient-neon shrink-0">{price}</span>
                  </GlowCard>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} className="flex flex-col gap-3">
              <Link
                href="/booking"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-neon text-white font-semibold transition-all duration-200 hover:glow-purple cursor-pointer font-inter"
              >
                Réserver le studio
              </Link>
              <Link
                href="/studio"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl glass-dark border border-rh-cyan/30 text-rh-white font-semibold transition-all duration-200 hover:border-rh-cyan hover:glow-cyan cursor-pointer font-inter text-sm"
              >
                En savoir plus
                <ArrowRight size={15} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
