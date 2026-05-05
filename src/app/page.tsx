import Hero          from '@/components/sections/Hero';
import About         from '@/components/sections/About';
import Services      from '@/components/sections/Services';
import StudioSection from '@/components/sections/StudioSection';
import Portfolio     from '@/components/sections/Portfolio';
import InstagramFeed from '@/components/sections/InstagramFeed';
import BookingForm   from '@/components/sections/BookingForm';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <StudioSection />
      <Portfolio />
      <InstagramFeed />

      {/* Booking rapide en bas de home */}
      <section className="section-padding bg-rh-black" aria-label="Réservation rapide">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-rh-purple font-mono text-sm tracking-widest uppercase mb-2">Réservation</p>
            <h2 className="font-syne font-extrabold text-rh-white text-3xl">
              Prêt à <span className="text-gradient-neon">créer ?</span>
            </h2>
          </div>
          <BookingForm />
        </div>
      </section>
    </>
  );
}
