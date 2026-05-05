/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // RH Records — Dark Neon Design System
        'rh-black':    '#0A0A0A',
        'rh-dark':     '#111111',
        'rh-surface':  '#1A1A1A',
        'rh-border':   '#2A2A2A',
        'rh-purple':   '#A855F7',
        'rh-violet':   '#7C3AED',
        'rh-cyan':     '#06B6D4',
        'rh-pink':     '#EC4899',
        'rh-white':    '#F8F8F8',
        'rh-grey':     '#9CA3AF',
        'rh-gold':     '#F59E0B',
      },
      fontFamily: {
        syne:  ['Syne', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono:  ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-neon':   'linear-gradient(135deg, #A855F7 0%, #06B6D4 100%)',
        'gradient-purple': 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
        'gradient-dark':   'linear-gradient(180deg, #0A0A0A 0%, #111111 100%)',
        'hero-radial':     'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(168,85,247,0.15) 0%, transparent 60%)',
      },
      boxShadow: {
        'neon-purple': '0 0 20px rgba(168,85,247,0.4), 0 0 40px rgba(168,85,247,0.2)',
        'neon-cyan':   '0 0 20px rgba(6,182,212,0.4), 0 0 40px rgba(6,182,212,0.2)',
        'neon-pink':   '0 0 20px rgba(236,72,153,0.4), 0 0 40px rgba(236,72,153,0.2)',
        'card-dark':   '0 4px 24px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.05)',
      },
      animation: {
        'sound-wave':   'soundWave 1.2s ease-in-out infinite',
        'float':        'float 6s ease-in-out infinite',
        'glow-pulse':   'glowPulse 2s ease-in-out infinite',
        'scan-line':    'scanLine 8s linear infinite',
        'gradient-x':   'gradientX 6s ease infinite',
      },
      keyframes: {
        soundWave: {
          '0%, 100%': { transform: 'scaleY(0.4)' },
          '50%':      { transform: 'scaleY(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.6' },
          '50%':      { opacity: '1' },
        },
        scanLine: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};
