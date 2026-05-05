'use client';

import { motion } from 'framer-motion';
import { Instagram, ExternalLink } from 'lucide-react';

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };

import Image from 'next/image';

const posts = [
  {
    id: '1',
    url: 'https://www.instagram.com/p/DX7Oxf9IrPY/',
    image: '/images/instagram/post1.png',
    caption: 'Studio session vibes at RH Records',
  },
  {
    id: '2',
    url: 'https://www.instagram.com/p/DWb-4HXDEE-/',
    image: '/images/instagram/post2.png',
    caption: 'Mixing the new track',
  },
  {
    id: '3',
    url: 'https://www.instagram.com/p/DShyb38iLV7/',
    image: '/images/instagram/post3.png',
    caption: 'Late night recordings',
  },
  {
    id: '4',
    url: 'https://www.instagram.com/p/DPtyWFlCHkZ/',
    image: '/images/instagram/post4.png',
    caption: 'Analog gear showcase',
  },
  {
    id: '5',
    url: 'https://www.instagram.com/p/DJJIEQ4N27p/',
    image: '/images/instagram/post5.png',
    caption: 'Vinyl collection at the studio',
  },
];

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
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {posts.map((post) => (
            <motion.a
              key={post.id}
              variants={fadeUp}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden border border-rh-border cursor-pointer bg-rh-surface"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              aria-label={post.caption}
            >
              <Image 
                src={post.image}
                alt={post.caption}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-rh-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <Instagram size={22} className="text-white" />
                  <span className="text-[10px] text-white uppercase font-bold tracking-widest">Voir le post</span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
  );
}
