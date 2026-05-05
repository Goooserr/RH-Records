'use client';

import { motion } from 'framer-motion';
import { Disc3, Zap, Mic2, Star } from 'lucide-react';
import GlowCard from '@/components/ui/GlowCard';

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const traits = [
  { icon: Disc3,  label: 'DJ Professionnel',    desc: 'Sets techniques, mix fluide, lecture de salle' },
  { icon: Zap,    label: 'Beatmaker',             desc: 'Trap, Afro, UK Drill, R&B — 100% exclusif' },
  { icon: Mic2,   label: 'Ingénieur son',         desc: 'Mixage & mastering haute définition' },
  { icon: Star,   label: 'Expérience 5★',         desc: 'Références artistiques locales et nationales' },
];

export default function About() {
  return (
    <section
      id="about"
      className="section-padding bg-rh-dark relative overflow-hidden"
      aria-labelledby="about-title"
    >
      {/* Glow gauche */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #A855F7 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Texte */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p variants={fadeUp} className="text-rh-purple font-mono text-sm tracking-widest uppercase mb-3">
              À propos
            </motion.p>

            <motion.h2
              id="about-title"
              variants={fadeUp}
              className="font-syne font-extrabold leading-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
            >
              <span className="text-rh-white">L'art du son</span><br />
              <span className="text-gradient-neon">à Chambéry</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="text-rh-grey leading-relaxed mb-4">
              DJ R_H est un artiste complet basé à Chambéry, alliant l'énergie des DJ sets à la précision du beatmaking
              professionnel. Passionné par la musique depuis plus de 10 ans, il développe une identité sonore unique entre
              trap, afro et UK drill.
            </motion.p>

            <motion.p variants={fadeUp} className="text-rh-grey leading-relaxed mb-8">
              Son studio, équipé de matériels haut de gamme, accueille artistes, rappeurs et chanteurs de toute la région
              Auvergne-Rhône-Alpes pour des sessions d'enregistrement, de mixage et de mastering.
            </motion.p>

            <motion.a
              variants={fadeUp}
              href="/booking"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-neon text-white font-semibold transition-all duration-200 hover:glow-purple cursor-pointer font-inter text-sm"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Travailler avec RH
            </motion.a>
          </motion.div>

          {/* Cards traits */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {traits.map(({ icon: Icon, label, desc }) => (
              <motion.div key={label} variants={fadeUp}>
                <GlowCard className="p-5 h-full" glow="purple">
                  <div className="w-10 h-10 rounded-xl bg-gradient-purple flex items-center justify-center mb-3">
                    <Icon size={18} className="text-white" strokeWidth={1.8} />
                  </div>
                  <p className="font-syne font-semibold text-rh-white text-sm mb-1">{label}</p>
                  <p className="text-rh-grey text-xs leading-relaxed">{desc}</p>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
