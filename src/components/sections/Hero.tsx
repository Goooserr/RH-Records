'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, Variants, useMotionValue, useSpring } from 'framer-motion';
import { Play, Calendar, ChevronDown, Music, Sparkles } from 'lucide-react';
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
  
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Spotlight Mouse Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX - innerWidth / 2);
      mouseY.set(clientY - innerHeight / 2);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[110vh] flex flex-col items-center justify-center overflow-hidden"
      aria-label="Accueil RH Records"
    >
      {/* Spotlight Effect */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none opacity-40"
        style={{
          background: useTransform(
            [springX, springY],
            ([x, y]) => `radial-gradient(600px circle at ${50 + (x as number) / 20}% ${50 + (y as number) / 20}%, rgba(168, 85, 247, 0.15), transparent 80%)`
          ),
        }}
      />

      {/* Decorative Aurora Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-rh-purple/5 blur-[180px] -z-10 pointer-events-none" />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ y: textY, opacity }}
      >
        <div className="flex flex-col items-center">
          {/* Animated Badge */}
          <motion.div 
            variants={fadeSlideUp} 
            className="mb-10 group"
          >
            <div className="relative px-6 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="relative flex items-center gap-2 text-rh-purple text-[10px] font-mono uppercase tracking-[0.5em] font-bold">
                <Sparkles size={12} className="animate-pulse" />
                Sound Engineering Excellence
              </span>
            </div>
          </motion.div>

          {/* Title with staggered characters or just clean reveal */}
          <motion.div variants={fadeSlideUp} className="relative mb-10">
            <h1
              className="font-syne font-extrabold text-center leading-[0.85] tracking-tighter"
              style={{ fontSize: 'clamp(4rem, 15vw, 12rem)' }}
            >
              <span className="text-rh-white block mix-blend-difference">RH</span>
              <span className="text-gradient-neon block">RECORDS</span>
            </h1>
            
            {/* Subtle floating elements around title */}
            <motion.div 
              animate={{ y: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-10 -right-10 w-20 h-20 bg-rh-cyan/20 blur-3xl rounded-full"
            />
          </motion.div>

          {/* Subtitle with reveal */}
          <motion.p
            variants={fadeSlideUp}
            className="text-rh-grey text-lg md:text-2xl max-w-3xl mx-auto text-center leading-relaxed mb-16 opacity-90 font-light"
          >
            L'excellence sonore à <span className="text-rh-white font-semibold underline decoration-rh-purple/40 underline-offset-8">Chambéry</span>. 
            Production, Mixage & Mastering de classe mondiale.
          </motion.p>

          {/* CTA Group with improved hover states */}
          <motion.div
            variants={fadeSlideUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-24"
          >
            <Link
              href="/booking"
              className="group relative px-12 py-6 rounded-2xl bg-rh-white text-rh-black font-bold text-xl transition-all duration-500 hover:scale-[1.05] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Calendar size={22} />
                Réserver une session
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Link>

            <Link
              href="/portfolio"
              className="group px-12 py-6 rounded-2xl border border-white/10 hover:border-rh-purple/50 text-rh-white font-bold text-xl transition-all duration-500 hover:bg-white/5"
            >
              <span className="flex items-center gap-3">
                <Play size={22} fill="currentColor" className="group-hover:scale-110 transition-transform" />
                Découvrir le son
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Improved Floating Visualizer Card */}
        <motion.div 
          variants={fadeIn}
          className="max-w-md mx-auto"
        >
          <div className="relative p-1 rounded-[32px] bg-gradient-to-br from-white/10 via-transparent to-white/5 overflow-hidden">
             <div className="p-8 rounded-[28px] bg-rh-black/40 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-rh-purple/20 flex items-center justify-center">
                    <Music size={18} className="text-rh-purple" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-rh-grey uppercase tracking-widest">Studio Engine</span>
                    <span className="text-xs font-bold text-rh-white">Processing Live Audio...</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[1,2,3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-rh-purple/40" />)}
                </div>
              </div>
              <SoundWaveAnim bars={40} color="purple" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator with more style */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-rh-grey/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-rh-purple/40 to-transparent" />
        <span className="text-[10px] font-mono tracking-[0.4em] uppercase">Scroll</span>
      </motion.div>

      {/* Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
    </section>
  );
}
