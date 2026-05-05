import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Clock } from 'lucide-react';
import BookingForm from '@/components/sections/BookingForm';

export const metadata: Metadata = {
  title: 'Contact — RH Records Chambéry',
  description: 'Contactez RH Records à Chambéry pour un DJ set, une session studio ou une collaboration musicale. Réponse sous 24h.',
};

const contactItems = [
  {
    icon:  Mail,
    label: 'Email',
    value: 'contact@rh-records.fr',
    href:  'mailto:contact@rh-records.fr',
    color: 'rh-pink',
    glow:  'glow-pink',
  },
  {
    icon:  Phone,
    label: 'Téléphone',
    value: '+33 6 00 00 00 00',
    href:  'tel:+33600000000',
    color: 'rh-cyan',
    glow:  'glow-cyan',
  },
  {
    icon:  Instagram,
    label: 'Instagram',
    value: '@dj.r_h',
    href:  'https://instagram.com/dj.r_h',
    color: 'rh-purple',
    glow:  'glow-purple',
  },
  {
    icon:  MapPin,
    label: 'Localisation',
    value: 'Chambéry, Savoie (73)',
    href:  'https://maps.google.com/?q=Chambéry',
    color: 'rh-gold',
    glow:  '',
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-12 bg-rh-dark overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-15"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, #EC4899 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <p className="text-rh-pink font-mono text-sm tracking-widest uppercase mb-3">Contact</p>
          <h1 className="font-syne font-extrabold text-rh-white leading-tight mb-4"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}>
            Travaillons <span className="text-gradient-purple">ensemble</span>
          </h1>
          <p className="text-rh-grey text-lg">
            Pour tout projet musical à Chambéry et en Savoie — je vous réponds sous 24h.
          </p>
        </div>
      </section>

      <section className="section-padding bg-rh-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Infos contact */}
            <div className="space-y-6">
              <h2 className="font-syne font-bold text-rh-white text-2xl mb-6">
                Me contacter
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactItems.map(({ icon: Icon, label, value, href, color, glow }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`glass-dark border border-rh-border rounded-2xl p-5 flex items-start gap-3 transition-all duration-200 hover:border-${color}/40 ${glow ? `hover:${glow}` : ''} cursor-pointer`}
                    aria-label={`${label}: ${value}`}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `var(--${color})18` }}
                    >
                      <Icon size={18} style={{ color: `var(--${color})` }} strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="text-rh-grey text-xs mb-0.5">{label}</p>
                      <p className="text-rh-white text-sm font-medium font-inter">{value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Disponibilités */}
              <div className="glass-dark border border-rh-border rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={15} className="text-rh-purple" />
                  <p className="font-syne font-semibold text-rh-white text-sm">Disponibilités</p>
                </div>
                <div className="space-y-1.5 text-sm">
                  {[
                    ['Lundi — Vendredi', '10h — 22h'],
                    ['Samedi',           '12h — 23h'],
                    ['Dimanche',         'Sur demande'],
                  ].map(([day, hours]) => (
                    <div key={day} className="flex items-center justify-between">
                      <span className="text-rh-grey">{day}</span>
                      <span className="text-rh-white font-mono text-xs">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SEO local */}
              <div className="glass-dark border border-rh-border rounded-2xl p-5">
                <p className="font-syne font-semibold text-rh-white text-sm mb-2">Zone d'intervention</p>
                <p className="text-rh-grey text-sm leading-relaxed">
                  DJ et studio basé à <strong className="text-rh-white">Chambéry</strong>, intervient sur toute la
                  Savoie (Annecy, Grenoble, Lyon, Aix-les-Bains) et au niveau national pour les événements.
                </p>
              </div>
            </div>

            {/* Form contact / booking */}
            <div>
              <BookingForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
