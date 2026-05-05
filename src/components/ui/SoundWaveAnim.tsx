'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SoundWaveAnimProps {
  bars?:  number;
  color?: 'purple' | 'cyan' | 'pink';
  className?: string;
}

const colorMap = {
  purple: 'bg-rh-purple',
  cyan:   'bg-rh-cyan',
  pink:   'bg-rh-pink',
};

const heights = [12, 24, 36, 48, 36, 20, 40, 32, 48, 28, 44, 16, 36, 48, 24, 40, 20, 36, 48, 28];

export default function SoundWaveAnim({ bars = 20, color = 'purple', className }: SoundWaveAnimProps) {
  return (
    <div
      className={cn('flex items-center gap-[3px]', className)}
      aria-hidden="true"
      role="img"
      aria-label="Animation sound wave"
    >
      {Array.from({ length: bars }, (_, i) => {
        const h     = heights[i % heights.length];
        const delay = (i * 0.07) % 1.4;
        return (
          <motion.div
            key={i}
            className={cn('w-1 rounded-full', colorMap[color])}
            style={{ height: `${h}px` }}
            animate={{
              scaleY: [0.3, 1, 0.5, 0.8, 0.3],
            }}
            transition={{
              duration: 1.2 + (i % 4) * 0.2,
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
