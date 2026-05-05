'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';

interface LiquidButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export default function LiquidButton({ 
  children, 
  className, 
  onClick, 
  variant = 'primary' 
}: LiquidButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const filterId = "liquid-filter-" + Math.random().toString(36).substr(2, 9);

  return (
    <div className="relative group">
      {/* SVG Filter for the liquid effect */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" 
              result="goo" 
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <motion.button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "relative px-10 py-5 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-300",
          variant === 'primary' 
            ? "bg-rh-white text-rh-black" 
            : "border border-white/10 text-rh-white hover:bg-white/5",
          className
        )}
        style={{ filter: isHovered ? `url(#${filterId})` : 'none' }}
      >
        <span className="relative z-10 flex items-center gap-3">
          {children}
        </span>

        {/* Animated Background Blobs for primary variant */}
        {variant === 'primary' && (
          <div className="absolute inset-0 z-0 pointer-events-none">
            <motion.div
              animate={{
                x: isHovered ? [0, 20, -20, 0] : 0,
                y: isHovered ? [0, -10, 10, 0] : 0,
                scale: isHovered ? [1, 1.2, 0.8, 1] : 1,
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1/2 -left-1/2 w-full h-full bg-rh-purple/20 blur-3xl rounded-full"
            />
            <motion.div
              animate={{
                x: isHovered ? [0, -20, 20, 0] : 0,
                y: isHovered ? [0, 10, -10, 0] : 0,
                scale: isHovered ? [1, 0.8, 1.2, 1] : 1,
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-rh-cyan/20 blur-3xl rounded-full"
            />
          </div>
        )}
      </motion.button>

      {/* Outer Glow on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -inset-4 bg-rh-purple/10 blur-2xl rounded-[40px] -z-10 pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
