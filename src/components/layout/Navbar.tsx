'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import RHLogo from '@/components/ui/RHLogo';

const navLinks = [
  { label: 'Accueil',   href: '/' },
  { label: 'Studio',    href: '/studio' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Services',  href: '/#services' },
  { label: 'Booking',   href: '/booking' },
  { label: 'Contact',   href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={cn(
          'fixed top-4 left-4 right-4 z-50 rounded-2xl transition-all duration-300',
          scrolled
            ? 'glass-dark glow-purple'
            : 'bg-transparent'
        )}
        aria-label="Navigation principale"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-0 group" aria-label="RH Records – Accueil">
            <RHLogo size={52} glow priority />
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {navLinks.map(({ label, href }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      'relative text-sm font-inter font-medium transition-colors duration-200 cursor-pointer',
                      active
                        ? 'text-rh-purple'
                        : 'text-rh-grey hover:text-rh-white'
                    )}
                  >
                    {label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-neon"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA */}
          <Link
            href="/booking"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-neon text-white text-sm font-semibold font-inter transition-all duration-200 hover:scale-105 hover:glow-purple cursor-pointer"
          >
            Réserver
          </Link>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-rh-grey hover:text-rh-white transition-colors cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-24 z-40 rounded-2xl glass-dark p-6 md:hidden"
          >
            <ul className="flex flex-col gap-4" role="list">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="block text-rh-grey hover:text-rh-white font-medium text-lg transition-colors cursor-pointer py-1"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-rh-border">
                <Link
                  href="/booking"
                  className="block text-center px-5 py-3 rounded-xl bg-gradient-neon text-white font-semibold cursor-pointer"
                >
                  Réserver une session
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
