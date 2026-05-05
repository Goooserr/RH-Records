import type { Metadata } from 'next';
import Portfolio from '@/components/sections/Portfolio';

export const metadata: Metadata = {
  title: 'Portfolio — Beats, Mix & DJ Sets',
  description: 'Écoutez les productions de RH Records : beats Trap, UK Drill, Afro, R&B et DJ sets. Beatmaker professionnel basé à Chambéry.',
};

export default function PortfolioPage() {
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
          <p className="text-rh-pink font-mono text-sm tracking-widest uppercase mb-3">Portfolio audio</p>
          <h1 className="font-syne font-extrabold text-rh-white leading-tight mb-4"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}>
            Productions <span className="text-gradient-purple">RH Records</span>
          </h1>
          <p className="text-rh-grey text-lg">
            Beats exclusifs, mixes et DJ sets — écoutez l'univers sonore de RH Records.
          </p>
        </div>
      </section>

      <Portfolio />
    </>
  );
}
