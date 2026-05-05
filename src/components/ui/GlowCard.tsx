'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlowCardProps {
  children:   ReactNode;
  glow?:      'purple' | 'cyan' | 'pink' | 'none';
  className?: string;
  hover?:     boolean;
}

const glowHoverMap = {
  purple: 'hover:glow-purple hover:border-rh-purple/40',
  cyan:   'hover:glow-cyan   hover:border-rh-cyan/40',
  pink:   'hover:glow-pink   hover:border-rh-pink/40',
  none:   '',
};

export default function GlowCard({ children, glow = 'purple', className, hover = true }: GlowCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className={cn(
        'glass-dark rounded-2xl border border-rh-border transition-all duration-200',
        hover && glowHoverMap[glow],
        className
      )}
    >
      {children}
    </motion.div>
  );
}
