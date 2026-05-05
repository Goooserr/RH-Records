'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { Play, Calendar, ChevronDown, Headphones } from 'lucide-react';
import SoundWaveAnim from '@/components/ui/SoundWaveAnim';
import RHLogo from '@/components/ui/RHLogo';

/* ============================================================
   FRAMER MOTION VARIANTS — modulaires et réutilisables
   ============================================================ */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const fadeSlideUp: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const glowBadge: Variants = {
  hidden:  { opacity: 0, scale: 0.85, y: -10 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.5, ease: 'backOut' },
  },
};

const buttonHover = {
  scale: 1.04,
  transition: { duration: 0.18, ease: 'easeOut' },
};

const buttonTap = { scale: 0.97 };

/* ============================================================
   SOUND WAVE BACKGROUND SVG — ambiance studio
   ============================================================ */
function SoundWaveBg() {
  const bars = Array.from({ length: 60 }, (_, i) => i);

  return (
    <div
      className="absolute inset-0 flex items-center justify-center opacity-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {bars.map((i) => {
        const height = 20 + Math.sin(i * 0.4) * 60 + Math.random() * 40;
        const delay  = (i * 0.05) % 1.2;
        return (
          <motion.div
            key={i}
            className="w-1 mx-px rounded-full bg-gradient-to-t from-rh-purple to-rh-cyan"
            style={{ height: `${height}px` }}
            animate={{
              scaleY: [0.4, 1, 0.6, 0.9, 0.4],
              opacity: [0.4, 0.9, 0.5, 0.8, 0.4],
            }}
            transition={{
              duration: 1.6 + (i % 5) * 0.3,
              delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </div>
  );
}

/* ============================================================
   GRID NEON — lignes de fond cyberpunk
   ============================================================ */
function NeonGrid() {
  return (
    <div
      className="absolute inset-0 opacity-[0.04] pointer-events-none"
      aria-hidden="true"
      style={{
        backgroundImage: `
          linear-gradient(rgba(168,85,247,0.8) 1px, transparent 1px),
          linear-gradient(90deg, rgba(168,85,247,0.8) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 0%, transparent 70%)',
      }}
    />
  );
}

/* ============================================================
   HERO COMPONENT
   ============================================================ */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Parallax scroll — image DJ descend légèrement */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const imgY     = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity  = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-rh-black"
      aria-label="Accueil RH Records"
    >
      {/* ---- Backgrounds ---- */}
      <NeonGrid />

      {/* Radial glow centré */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 40%, rgba(168,85,247,0.12) 0%, rgba(6,182,212,0.06) 40%, transparent 70%)',
        }}
      />

      {/* Sound wave background */}
      <SoundWaveBg />

      {/* Logo vinyle en watermark de fond — tourne lentement */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]"
        aria-hidden="true"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <RHLogo size={600} glow={false} priority />
      </motion.div>

      {/* ---- Contenu principal ---- */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-20 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo officiel animé */}
        <motion.div variants={glowBadge} className="flex justify-center mb-6">
          <RHLogo size={160} glow animated={false} priority className="md:!w-[176px] md:!h-[176px]" />
        </motion.div>

        {/* Badge live */}
        <motion.div variants={glowBadge} className="inline-flex items-center gap-2 mb-6">
          <span className="flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark border border-rh-purple/30 text-rh-purple text-sm font-mono">
            <span className="w-2 h-2 rounded-full bg-rh-purple animate-pulse" />
            DJ · Beatmaker · Studio — Chambéry
          </span>
        </motion.div>

        {/* Titre principal */}
        <motion.h1
          variants={fadeSlideUp}
          className="font-syne font-extrabold leading-[1.05] tracking-tight mb-6"
          style={{ fontSize: 'clamp(2.2rem, 6vw, 4.8rem)' }}
        >
          <span className="text-rh-white block">L'univers sonore</span>
          <span className="text-gradient-neon block">de RH Records</span>
        </motion.h1>

        {/* Sous-titre — apparition progressive */}
        <motion.p
          variants={fadeSlideUp}
          className="text-rh-grey text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
        >
          DJ professionnel, beatmaker et studio d'enregistrement à{' '}
          <span className="text-rh-purple font-medium">Chambéry</span>.
          Beats exclusifs, mixage professionnel, sessions studio sur mesure.
        </motion.p>

        {/* Sound wave animée inline */}
        <motion.div variants={fadeIn} className="flex justify-center mb-10">
          <SoundWaveAnim bars={20} color="purple" />
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          variants={fadeSlideUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Bouton primaire — Réserver */}
          <motion.div whileHover={buttonHover} whileTap={buttonTap}>
            <Link
              href="/booking"
              className="
                inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl
                bg-gradient-neon text-white font-semibold text-base
                transition-shadow duration-200 hover:glow-purple cursor-pointer
                font-inter
              "
            >
              <Calendar size={18} strokeWidth={2} />
              Réserver une session
            </Link>
          </motion.div>

          {/* Bouton secondaire — Portfolio */}
          <motion.div whileHover={buttonHover} whileTap={buttonTap}>
            <Link
              href="/portfolio"
              className="
                inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl
                glass-dark border border-rh-purple/40 text-rh-white font-semibold text-base
                transition-all duration-200 hover:border-rh-purple hover:glow-purple cursor-pointer
                font-inter
              "
            >
              <Play size={18} strokeWidth={2} />
              Écouter le portfolio
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={fadeSlideUp}
          className="mt-16 grid grid-cols-3 gap-4 max-w-sm mx-auto sm:max-w-none sm:flex sm:items-center sm:justify-center sm:gap-12"
        >
          {[
            { value: '100+', label: 'Beats produits' },
            { value: '50+',  label: 'Événements DJ' },
            { value: '5★',   label: 'Qualité studio' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-syne font-bold text-2xl text-gradient-neon leading-none">{value}</p>
              <p className="text-rh-grey text-xs mt-1">{label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ---- Image DJ avec parallax ---- */}
      <motion.div
        className="absolute bottom-0 right-0 w-80 md:w-[420px] lg:w-[520px] opacity-20 md:opacity-30 pointer-events-none"
        style={{ y: imgY, opacity }}
        aria-hidden="true"
      >
        {/* Placeholder silhouette DJ — remplacer par une vraie photo */}
        <div
          className="w-full aspect-[3/4] rounded-tl-[80px]"
          style={{
            background:
              'linear-gradient(135deg, rgba(168,85,247,0.3) 0%, rgba(6,182,212,0.15) 100%)',
            maskImage:
              'linear-gradient(to top, transparent 0%, black 40%, black 80%, transparent 100%)',
          }}
        />
      </motion.div>

      {/* ---- Scroll indicator ---- */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-rh-grey"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.4 }}
        aria-hidden="true"
      >
        <span className="text-xs font-mono tracking-widest uppercase opacity-60">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="text-rh-purple" />
        </motion.div>
      </motion.div>

      {/* ---- Instagram badge flottant ---- */}
      <motion.a
        href="https://instagram.com/dj.r_h"
        target="_blank"
        rel="noopener noreferrer"
        className="
          absolute bottom-10 right-6 z-10 hidden md:flex items-center gap-2.5
          px-4 py-2.5 rounded-2xl glass-dark border border-rh-pink/30
          text-rh-pink text-sm font-medium transition-all duration-200 hover:glow-pink cursor-pointer
        "
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        aria-label="Instagram RH Records @dj.r_h"
      >
        <Headphones size={16} />
        @dj.r_h
      </motion.a>
    </section>
  );
}
