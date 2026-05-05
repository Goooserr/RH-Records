'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AudioPlayer, { Track } from '@/components/ui/AudioPlayer';
import { Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

type Genre = 'Tous' | 'Trap' | 'UK Drill' | 'Afro' | 'R&B' | 'DJ Set';

const allTracks: (Track & { genre: string })[] = [
  { id: '1',  title: 'Nuit Sauvage',     genre: 'Trap',   bpm: 140, src: '/audio/beat-1.mp3', duration: '3:24' },
  { id: '2',  title: 'Shadow Run',       genre: 'UK Drill',bpm: 145, src: '/audio/beat-2.mp3', duration: '2:58' },
  { id: '3',  title: 'Lagos Vibes',      genre: 'Afro',   bpm: 103, src: '/audio/beat-3.mp3', duration: '3:42' },
  { id: '4',  title: 'Minuit à Chambé',  genre: 'Trap',   bpm: 138, src: '/audio/beat-4.mp3', duration: '3:11' },
  { id: '5',  title: 'Silk Road',        genre: 'R&B',    bpm: 88,  src: '/audio/beat-5.mp3', duration: '4:02' },
  { id: '6',  title: 'Alpes Sessions',   genre: 'DJ Set', bpm: undefined, src: '/audio/djset-1.mp3', duration: '12:00' },
  { id: '7',  title: 'Block Pressure',   genre: 'UK Drill',bpm: 142, src: '/audio/beat-6.mp3', duration: '2:45' },
  { id: '8',  title: 'Summer Heat',      genre: 'Afro',   bpm: 98,  src: '/audio/beat-7.mp3', duration: '3:55' },
];

const genres: Genre[] = ['Tous', 'Trap', 'UK Drill', 'Afro', 'R&B', 'DJ Set'];

export default function Portfolio() {
  const [activeGenre, setActiveGenre] = useState<Genre>('Tous');

  const filtered = activeGenre === 'Tous'
    ? allTracks
    : allTracks.filter((t) => t.genre === activeGenre);

  return (
    <section
      id="portfolio"
      className="section-padding bg-rh-black relative"
      aria-labelledby="portfolio-title"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.p variants={fadeUp} className="text-rh-pink font-mono text-sm tracking-widest uppercase mb-3">
            Portfolio audio
          </motion.p>
          <motion.h2
            id="portfolio-title"
            variants={fadeUp}
            className="font-syne font-extrabold text-rh-white leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Écouter les <span className="text-gradient-purple">productions</span>
          </motion.h2>
        </motion.div>

        {/* Filtres */}
        <motion.div
          className="flex items-center gap-3 mb-10 overflow-x-auto pb-2 scrollbar-thin"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          role="tablist"
          aria-label="Filtrer par genre"
        >
          <Filter size={16} className="text-rh-grey shrink-0" aria-hidden="true" />
          {genres.map((g) => (
            <button
              key={g}
              role="tab"
              aria-selected={activeGenre === g}
              onClick={() => setActiveGenre(g)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer font-inter',
                activeGenre === g
                  ? 'bg-gradient-neon text-white glow-purple'
                  : 'glass-dark border border-rh-border text-rh-grey hover:text-rh-white hover:border-rh-purple/40'
              )}
            >
              {g}
            </button>
          ))}
        </motion.div>

        {/* Track list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeGenre}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
          >
            {filtered.map((track, idx) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <AudioPlayer tracks={[track]} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Note */}
        <p className="text-center text-rh-grey text-xs mt-8 font-mono">
          * Extraits demo — fichiers audio à placer dans /public/audio/
        </p>
      </div>
    </section>
  );
}
