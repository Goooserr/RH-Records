import type { Metadata } from 'next';
import BookingForm from '@/components/sections/BookingForm';
import { Calendar, Clock, CheckCircle, Headphones } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Réservation — Session Studio & DJ',
  description: 'Réservez une session studio, un DJ set ou un coaching avec RH Records à Chambéry. Réponse sous 24h.',
};

const steps = [
  { icon: Calendar,     title: 'Envoyez votre demande',  desc: 'Remplissez le formulaire avec vos besoins et disponibilités.' },
  { icon: Clock,        title: 'Confirmation sous 24h',   desc: 'Je vous réponds rapidement pour confirmer le créneau.' },
  { icon: Headphones,   title: 'Préparez votre session',  desc: 'J\'envoie un guide de préparation adapté à votre projet.' },
  { icon: CheckCircle,  title: 'Session & livraison',     desc: 'Votre projet livré en haute qualité dans les délais convenus.' },
];

export default function BookingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-12 bg-rh-dark overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-15"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, #A855F7 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <p className="text-rh-purple font-mono text-sm tracking-widest uppercase mb-3">Réservation</p>
          <h1 className="font-syne font-extrabold text-rh-white leading-tight mb-4"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}>
            Réserver avec <span className="text-gradient-neon">RH Records</span>
          </h1>
          <p className="text-rh-grey text-lg">
            Studio, DJ set, beatmaking ou coaching — je m'adapte à votre projet.
          </p>
        </div>
      </section>

      <section className="section-padding bg-rh-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Process */}
            <div>
              <h2 className="font-syne font-bold text-rh-white text-2xl mb-8">
                Comment ça <span className="text-gradient-neon">fonctionne ?</span>
              </h2>
              <ol className="space-y-6" role="list">
                {steps.map(({ icon: Icon, title, desc }, idx) => (
                  <li key={title} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-xl bg-gradient-neon flex items-center justify-center shrink-0 glow-purple">
                        <Icon size={16} className="text-white" />
                      </div>
                      {idx < steps.length - 1 && (
                        <div className="w-px h-full min-h-[24px] bg-gradient-to-b from-rh-purple/40 to-transparent mt-2" aria-hidden="true" />
                      )}
                    </div>
                    <div className="pb-6">
                      <p className="font-syne font-semibold text-rh-white text-sm mb-1">{title}</p>
                      <p className="text-rh-grey text-sm leading-relaxed">{desc}</p>
                    </div>
                  </li>
                ))}
              </ol>

              {/* Tarif rapide */}
              <div className="glass-dark border border-rh-border rounded-2xl p-5 mt-4">
                <p className="font-syne font-semibold text-rh-white mb-3 text-sm">Tarifs indicatifs</p>
                <div className="space-y-2">
                  {[
                    ['Session studio 1h',  '30€'],
                    ['Demi-journée studio','100€'],
                    ['Beat exclusif',      'dès 50€'],
                    ['Mixage + Master',    'dès 80€'],
                    ['DJ Set événement',   'Sur devis'],
                  ].map(([label, price]) => (
                    <div key={label} className="flex items-center justify-between text-sm">
                      <span className="text-rh-grey">{label}</span>
                      <span className="text-rh-purple font-syne font-bold">{price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <BookingForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
