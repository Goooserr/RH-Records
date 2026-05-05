import type { Metadata } from 'next';
import { motion } from 'framer-motion';
import StudioSection from '@/components/sections/StudioSection';
import BookingForm   from '@/components/sections/BookingForm';

export const metadata: Metadata = {
  title: 'Studio d\'enregistrement Chambéry',
  description: 'Studio d\'enregistrement professionnel à Chambéry. Enregistrement vocal, mixage & mastering avec RH Records. Cabine traitée, matériel haut de gamme.',
};

export default function StudioPage() {
  return (
    <>
      {/* Hero Studio */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-rh-dark pt-28 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-15"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 100%, #06B6D4 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <p className="text-rh-cyan font-mono text-sm tracking-widest uppercase mb-3">Studio professionnel</p>
          <h1 className="font-syne font-extrabold text-rh-white leading-tight mb-4"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}>
            Studio <span className="text-gradient-neon">RH Records</span><br />
            Chambéry
          </h1>
          <p className="text-rh-grey text-lg">
            Un espace professionnel acoustiquement traité pour donner vie à vos projets musicaux.
          </p>
        </div>
      </section>

      <StudioSection />

      {/* Booking section */}
      <section className="section-padding bg-rh-black">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-rh-cyan font-mono text-sm tracking-widest uppercase mb-2">Réserver</p>
            <h2 className="font-syne font-extrabold text-rh-white text-3xl">
              Réservez votre <span className="text-gradient-neon">session studio</span>
            </h2>
          </div>
          <BookingForm />
        </div>
      </section>
    </>
  );
}
