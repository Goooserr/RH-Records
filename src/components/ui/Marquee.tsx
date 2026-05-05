'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MarqueeProps {
  items: string[];
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
  perspective?: boolean;
}

export default function Marquee({
  items,
  direction = 'left',
  speed = 40,
  className,
  perspective = false,
}: MarqueeProps) {
  const scrollVariants = {
    animate: {
      x: direction === 'left' ? [0, -1000] : [-1000, 0],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: speed,
          ease: 'linear',
        },
      },
    },
  };

  return (
    <div 
      className={cn(
        "relative flex overflow-hidden py-10 select-none",
        perspective && "[perspective:1000px] [transform-style:preserve-3d]",
        className
      )}
    >
      <motion.div
        variants={scrollVariants}
        animate="animate"
        className={cn(
          "flex flex-nowrap gap-12 min-w-full",
          perspective && "[transform:rotateX(15deg)_rotateY(-10deg)]"
        )}
      >
        {/* Render items multiple times to ensure seamless loop */}
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 flex items-center gap-4 text-rh-white/20 hover:text-rh-purple transition-colors duration-300 cursor-default"
          >
            <span className="text-4xl md:text-6xl font-syne font-black uppercase tracking-tighter italic">
              {item}
            </span>
            <div className="w-3 h-3 rounded-full bg-rh-purple/40" />
          </div>
        ))}
      </motion.div>

      {/* Fade Edges */}
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-rh-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-rh-black to-transparent z-10 pointer-events-none" />
    </div>
  );
}
