'use client';

import { motion } from 'framer-motion';

export default function AnimatedLogo() {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.5, ease: "easeInOut" },
        opacity: { duration: 0.01 }
      }
    }
  };

  const glowVariants = {
    initial: { filter: "drop-shadow(0 0 2px rgba(168, 85, 247, 0))" },
    animate: {
      filter: [
        "drop-shadow(0 0 2px rgba(168, 85, 247, 0.4))",
        "drop-shadow(0 0 8px rgba(168, 85, 247, 0.8))",
        "drop-shadow(0 0 4px rgba(168, 85, 247, 0.6))",
        "drop-shadow(0 0 12px rgba(168, 85, 247, 0.9))",
        "drop-shadow(0 0 2px rgba(168, 85, 247, 0.4))"
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const flickerVariants = {
    animate: {
      opacity: [1, 0.8, 1, 0.9, 1, 0.4, 1],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "mirror" as const,
        repeatDelay: 5
      }
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <motion.svg
        width="280"
        height="120"
        viewBox="0 0 280 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
        variants={glowVariants}
        initial="initial"
        animate="animate"
      >
        {/* Stylized RH */}
        <motion.path
          d="M20 100V20M20 60H80M80 20V100M80 60L100 100"
          stroke="white"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />
        
        {/* RECORDS text in a sleek font-like path */}
        <motion.path
          d="M120 40H160C170 40 175 45 175 55C175 65 170 70 160 70H120V100M160 70L175 100M190 40H230V55H190V70H220V85H190V100H230M245 40C245 40 240 40 240 70C240 100 245 100 245 100H270"
          stroke="url(#neonGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          className="opacity-80"
        />

        <defs>
          <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="50%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Subtle flicker overlay */}
      <motion.div
        variants={flickerVariants}
        animate="animate"
        className="absolute inset-0 pointer-events-none bg-rh-purple/5 mix-blend-overlay blur-3xl rounded-full"
      />
    </div>
  );
}
