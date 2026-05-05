import Link from 'next/link';
import { Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import RHLogo from '@/components/ui/RHLogo';

const links = {
  navigation: [
    { label: 'Accueil',   href: '/' },
    { label: 'Studio',    href: '/studio' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Booking',   href: '/booking' },
    { label: 'Contact',   href: '/contact' },
  ],
  services: [
    { label: 'DJ Sets & Événements',     href: '/#services' },
    { label: 'Beatmaking & Prod',        href: '/#services' },
    { label: 'Sessions Studio',          href: '/studio' },
    { label: 'Mixage & Mastering',       href: '/studio' },
    { label: 'Coaching artistique',      href: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-rh-dark border-t border-rh-border" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 w-fit group" aria-label="RH Records">
              <RHLogo size={68} glow />
            </Link>
            <p className="text-rh-grey text-sm leading-relaxed max-w-xs">
              DJ, beatmaker et studio d'enregistrement professionnel basé à Chambéry, Savoie.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://instagram.com/dj.r_h"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass-dark flex items-center justify-center text-rh-grey hover:text-rh-pink hover:glow-pink transition-all duration-200 cursor-pointer"
                aria-label="Instagram RH Records"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass-dark flex items-center justify-center text-rh-grey hover:text-rh-purple hover:glow-purple transition-all duration-200 cursor-pointer"
                aria-label="YouTube RH Records"
              >
                <Youtube size={18} />
              </a>
              <a
                href="mailto:contact@rh-records.fr"
                className="w-10 h-10 rounded-xl glass-dark flex items-center justify-center text-rh-grey hover:text-rh-cyan hover:glow-cyan transition-all duration-200 cursor-pointer"
                aria-label="Email RH Records"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-syne font-semibold text-rh-white mb-4 text-sm uppercase tracking-widest">Navigation</h3>
            <ul className="flex flex-col gap-2.5" role="list">
              {links.navigation.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-rh-grey hover:text-rh-white text-sm transition-colors cursor-pointer">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-syne font-semibold text-rh-white mb-4 text-sm uppercase tracking-widest">Services</h3>
            <ul className="flex flex-col gap-2.5" role="list">
              {links.services.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-rh-grey hover:text-rh-white text-sm transition-colors cursor-pointer">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-syne font-semibold text-rh-white mb-4 text-sm uppercase tracking-widest">Contact</h3>
            <address className="not-italic flex flex-col gap-3">
              <div className="flex items-start gap-2.5 text-sm text-rh-grey">
                <MapPin size={15} className="mt-0.5 text-rh-purple shrink-0" />
                <span>Chambéry, Savoie<br />Auvergne-Rhône-Alpes</span>
              </div>
              <a href="tel:+33600000000" className="flex items-center gap-2.5 text-sm text-rh-grey hover:text-rh-white transition-colors cursor-pointer">
                <Phone size={15} className="text-rh-cyan shrink-0" />
                <span>+33 6 00 00 00 00</span>
              </a>
              <a href="mailto:contact@rh-records.fr" className="flex items-center gap-2.5 text-sm text-rh-grey hover:text-rh-white transition-colors cursor-pointer">
                <Mail size={15} className="text-rh-pink shrink-0" />
                <span>contact@rh-records.fr</span>
              </a>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-rh-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-rh-grey text-xs">
            © {new Date().getFullYear()} RH Records — Tous droits réservés · Chambéry, Savoie
          </p>
          <p className="text-rh-grey text-xs">
            DJ Chambéry · Beatmaker Chambéry · Studio d'enregistrement Chambéry
          </p>
        </div>
      </div>
    </footer>
  );
}
