'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RHLogoProps {
  size?:      number;
  glow?:      boolean;
  animated?:  boolean;
  priority?:  boolean;
  className?: string;
}

/* Premium Neon SVG Logo
   Toutes les valeurs sont en unités SVG (viewBox 100×100) */
function LogoFallback({ size, glow }: { size: number, glow?: boolean }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ overflow: 'visible' }}
      animate={glow ? {
        filter: [
          'drop-shadow(0 0 2px rgba(168,85,247,0.4))',
          'drop-shadow(0 0 8px rgba(168,85,247,0.8))',
          'drop-shadow(0 0 2px rgba(168,85,247,0.4))',
        ]
      } : {}}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <defs>
        <linearGradient id="rh-neon-grd" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>

      {/* Stylized 'RH' path */}
      <motion.path
        d="M25 75V25M25 50H55M55 25V75M55 50L75 75"
        stroke="url(#rh-neon-grd)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Circle details */}
      <motion.circle 
        cx="50" cy="50" r="45" 
        stroke="white" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.3" 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
    </motion.svg>
  );
}

export default function RHLogo({
  size     = 64,
  glow     = false,
  animated = false,
  priority = false,
  className,
}: RHLogoProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      className={cn('shrink-0 flex items-center justify-center', className)}
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
      animate={
        glow
          ? {
              filter: [
                'drop-shadow(0 0 6px rgba(168,85,247,0.4))',
                'drop-shadow(0 0 18px rgba(168,85,247,0.8))',
                'drop-shadow(0 0 6px rgba(168,85,247,0.4))',
              ],
            }
          : undefined
      }
      transition={glow ? { duration: 2.8, repeat: Infinity, ease: 'easeInOut' } : undefined}
    >
      <motion.div
        className="relative"
        style={{ width: size, height: size }}
        animate={animated ? { rotate: 360 } : undefined}
        transition={animated ? { duration: 12, repeat: Infinity, ease: 'linear' } : undefined}
      >
        {imgError ? (
          <LogoFallback size={size} glow={glow} />
        ) : (
          <Image
            src="/images/logo-rh-records.png"
            alt="RH Records — DJ Beatmaker Chambéry"
            width={size}
            height={size}
            className="object-contain w-full h-full"
            style={{ filter: 'brightness(1.08) contrast(1.12) saturate(0.85)' }}
            priority={priority}
            onError={() => setImgError(true)}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
