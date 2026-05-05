import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    default: 'RH Records — DJ, Beatmaker & Studio d\'enregistrement à Chambéry',
    template: '%s | RH Records Chambéry',
  },
  description:
    'RH Records — DJ professionnel, beatmaker et studio d\'enregistrement basé à Chambéry. Mixage, mastering, sessions studio, beats exclusifs. Réservez votre session dès maintenant.',
  keywords: [
    'DJ Chambéry', 'beatmaker Chambéry', 'studio enregistrement Chambéry',
    'mixage mastering Savoie', 'DJ soirée Chambéry', 'production musicale Chambéry',
    'RH Records', 'beats rap Chambéry', 'session studio Chambéry',
  ],
  authors: [{ name: 'RH Records', url: 'https://rh-records.fr' }],
  creator: 'RH Records',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://rh-records.fr',
    siteName: 'RH Records',
    title: 'RH Records — DJ, Beatmaker & Studio à Chambéry',
    description: 'DJ sets, beatmaking, production musicale et studio d\'enregistrement professionnel à Chambéry.',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'RH Records' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RH Records — DJ & Studio Chambéry',
    description: 'Beatmaker, DJ professionnel et studio d\'enregistrement à Chambéry.',
  },
  robots: { index: true, follow: true },
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="bg-rh-black text-rh-white font-inter antialiased">
        <AuroraBackground />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
