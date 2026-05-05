'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface TextRevealProps {
  children: ReactNode;
  className?: string;
}

export default function TextReveal({ children, className }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Staggered reveal effect
  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0.1, 0.3], [50, 0]);
  const blur = useTransform(scrollYProgress, [0.1, 0.3, 0.5], ["blur(10px)", "blur(0px)", "blur(0px)"]);
  
  // Spring for smoother movement
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={containerRef}
      style={{ 
        opacity, 
        y: springY,
        filter: blur
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
