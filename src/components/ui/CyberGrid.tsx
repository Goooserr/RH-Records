'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function CyberGrid() {
  const { scrollYProgress } = useScroll();
  
  // Create a parallax effect for the grid
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none bg-rh-black">
      {/* Perspective Grid Container */}
      <div className="absolute inset-0 [perspective:1000px]">
        <motion.div 
          style={{ y: gridY }}
          className="absolute inset-0 [transform:rotateX(60deg)] [transform-origin:top]"
        >
          {/* The Grid Lines */}
          <div className="absolute inset-0 w-[200%] h-[200%] -left-1/2 -top-1/2 bg-[linear-gradient(to_right,rgba(168,85,247,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(168,85,247,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
          
          {/* Radial Glow on the horizon */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-rh-black/80 to-rh-black" />
        </motion.div>
      </div>

      {/* Floating Ambient Blobs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-rh-purple/10 blur-[150px] rounded-full"
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-rh-cyan/10 blur-[150px] rounded-full"
      />

      {/* Scanline Effect Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
    </div>
  );
}
