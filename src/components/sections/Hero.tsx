'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { Play, Calendar, ChevronDown, Music } from 'lucide-react';
import SoundWaveAnim from '@/components/ui/SoundWaveAnim';

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const fadeSlideUp: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, ease: 'easeOut' },
  },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Accueil RH Records"
    >
      {/* Cinematic Background Gradient (handled by layout but adding local highlights) */}
      <div className="absolute inset-0 bg-radial-at-t from-rh-purple/10 via-transparent to-transparent pointer-events-none" />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ y: textY, opacity }}
      >
        <div className="flex flex-col items-center">
          {/* Overline */}
          <motion.div variants={fadeSlideUp} className="mb-8">
            <span className="px-4 py-2 rounded-full border border-rh-purple/30 bg-rh-purple/5 text-rh-purple text-[10px] font-mono uppercase tracking-[0.4em]">
              DJ · Beatmaker · Studio
            </span>
          </motion.div>

          {/* Main Title - Exaggerated Minimalism */}
          <motion.h1
            variants={fadeSlideUp}
            className="font-syne font-extrabold text-center leading-[0.9] tracking-tighter mb-8"
            style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)' }}
          >
            <span className="text-rh-white block">RH</span>
            <span className="text-gradient-neon block">RECORDS</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeSlideUp}
            className="text-rh-grey text-lg md:text-xl max-w-2xl mx-auto text-center leading-relaxed mb-12 opacity-80"
          >
            L'excellence sonore à <span className="text-rh-white font-semibold">Chambéry</span>. 
            Donnez vie à vos projets musicaux avec une production de classe mondiale.
          </motion.p>

          {/* CTA Group */}
          <motion.div
            variants={fadeSlideUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link
              href="/booking"
              className="group relative px-10 py-5 rounded-2xl bg-rh-white text-rh-black font-bold text-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-white/5"
            >
              <span className="flex items-center gap-2">
                <Calendar size={20} />
                Réserver
              </span>
            </Link>

            <Link
              href="/portfolio"
              className="group px-10 py-5 rounded-2xl border border-white/10 hover:border-rh-purple/50 text-rh-white font-bold text-lg transition-all duration-300 hover:bg-white/5 active:scale-[0.98]"
            >
              <span className="flex items-center gap-2">
                <Play size={20} fill="currentColor" />
                Portfolio
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Floating SoundWave Anim */}
        <motion.div 
          variants={fadeIn}
          className="mt-24 flex justify-center"
        >
          <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-8 rounded-full bg-rh-purple/20 flex items-center justify-center">
                <Music size={14} className="text-rh-purple" />
              </div>
              <span className="text-xs font-mono text-rh-grey uppercase tracking-widest">Live Visualizer</span>
            </div>
            <SoundWaveAnim bars={40} color="purple" />
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-rh-grey/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase">Découvrir</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>

      {/* Background Noise Texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
    </section>
  );
}
