'use client';

import { motion } from 'framer-motion';
import { Instagram, ExternalLink } from 'lucide-react';

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };

// Placeholders — remplacer par les vraies photos Instagram via API ou embed
const posts = Array.from({ length: 6 }, (_, i) => ({
  id:      String(i + 1),
  caption: `Post Instagram #${i + 1} — @dj.r_h`,
  gradient: [
    'from-rh-purple/30 to-rh-cyan/20',
    'from-rh-pink/30 to-rh-purple/20',
    'from-rh-cyan/30 to-rh-violet/20',
    'from-rh-gold/20 to-rh-pink/20',
    'from-rh-violet/30 to-rh-cyan/20',
    'from-rh-purple/20 to-rh-pink/30',
  ][i],
}));

export default function InstagramFeed() {
  return (
    <section
      id="instagram"
      className="section-padding bg-rh-dark relative"
      aria-labelledby="instagram-title"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <div>
            <motion.p variants={fadeUp} className="text-rh-pink font-mono text-sm tracking-widest uppercase mb-2">
              Instagram
            </motion.p>
            <motion.h2
              id="instagram-title"
              variants={fadeUp}
              className="font-syne font-extrabold text-rh-white text-2xl md:text-3xl"
            >
              Suivre <span className="text-gradient-purple">@dj.r_h</span>
            </motion.h2>
          </div>

          <motion.a
            variants={fadeUp}
            href="https://instagram.com/dj.r_h"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass-dark border border-rh-pink/30 text-rh-pink text-sm font-medium transition-all duration-200 hover:glow-pink cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Voir le profil Instagram @dj.r_h"
          >
            <Instagram size={16} />
            Voir le profil
            <ExternalLink size={13} />
          </motion.a>
        </motion.div>

        {/* Grid posts */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
          variants={stagger}
          initial="hidden"
          whileInView="viewable"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {posts.map((post) => (
            <motion.a
              key={post.id}
              variants={fadeUp}
              href="https://instagram.com/dj.r_h"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden border border-rh-border cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              aria-label={post.caption}
            >
              {/* Gradient placeholder */}
              <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient}`} />

              {/* Icon centré */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Instagram size={28} className="text-white/30" />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-rh-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <ExternalLink size={22} className="text-white" />
              </div>
            </motion.a>
          ))}
        </motion.div>

        <p className="text-center text-rh-grey text-xs mt-6 font-mono">
          * Intégration Instagram API disponible — remplacer les placeholders par les vraies photos
        </p>
      </div>
    </section>
  );
}
