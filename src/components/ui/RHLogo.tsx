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

/* Fallback SVG si le fichier PNG est absent
   Toutes les valeurs sont en unités SVG (viewBox 100×100) — indépendantes du size px */
function LogoFallback({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ overflow: 'visible' }}
    >
      {/* Cercles vinyle */}
      <circle cx="50" cy="50" r="46" stroke="url(#rh-grd)" strokeWidth="2" />
      <circle cx="50" cy="50" r="34" stroke="url(#rh-grd)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
      <circle cx="50" cy="50" r="6"  fill="url(#rh-grd)" />

      {/* Texte "DJ·Rh" — taille fixe SVG = 18 unités */}
      <text
        x="50"
        y="47"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="Syne, Arial, sans-serif"
        fontWeight="800"
        fontSize="18"
        fill="url(#rh-grd)"
      >
        DJ·Rh
      </text>

      {/* Texte "RH Records" — taille fixe SVG = 9 unités */}
      <text
        x="50"
        y="63"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="Inter, Arial, sans-serif"
        fontWeight="600"
        fontSize="9"
        fill="#9CA3AF"
        letterSpacing="0.5"
      >
        RH Records
      </text>

      <defs>
        <linearGradient id="rh-grd" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#A855F7" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
    </svg>
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
          <LogoFallback size={size} />
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
