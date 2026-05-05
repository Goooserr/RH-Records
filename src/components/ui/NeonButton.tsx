'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface NeonButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  size?:    'sm' | 'md' | 'lg';
  glow?:    'purple' | 'cyan' | 'pink';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  ariaLabel?: string;
}

const variantStyles = {
  primary: 'bg-gradient-neon text-white',
  outline: 'glass-dark border border-rh-purple/40 text-rh-white hover:border-rh-purple',
  ghost:   'text-rh-grey hover:text-rh-white',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-6 py-3 text-sm rounded-xl',
  lg: 'px-8 py-4 text-base rounded-2xl',
};

const glowStyles = {
  purple: 'hover:glow-purple',
  cyan:   'hover:glow-cyan',
  pink:   'hover:glow-pink',
};

export default function NeonButton({
  children,
  variant  = 'primary',
  size     = 'md',
  glow     = 'purple',
  className,
  onClick,
  type     = 'button',
  disabled = false,
  ariaLabel,
}: NeonButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      whileHover={disabled ? {} : { scale: 1.04 }}
      whileTap={disabled  ? {} : { scale: 0.97 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold font-inter transition-all duration-200 cursor-pointer',
        variantStyles[variant],
        sizeStyles[size],
        glowStyles[glow],
        disabled && 'opacity-40 cursor-not-allowed',
        className
      )}
    >
      {children}
    </motion.button>
  );
}
