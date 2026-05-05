# RH Records — Site Web Professionnel

DJ, Beatmaker & Studio d'enregistrement — Chambéry, Savoie

## Démarrage rapide

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build production
npm run build
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## Structure du projet

```
RH-Records/
├── src/
│   ├── app/                    # Pages Next.js (App Router)
│   │   ├── page.tsx            # Accueil
│   │   ├── studio/page.tsx     # Page Studio
│   │   ├── portfolio/page.tsx  # Portfolio audio
│   │   ├── booking/page.tsx    # Réservation
│   │   ├── contact/page.tsx    # Contact
│   │   ├── layout.tsx          # Layout global + SEO
│   │   └── globals.css         # Design system CSS
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx      # Navigation flottante
│   │   │   └── Footer.tsx      # Pied de page
│   │   ├── sections/
│   │   │   ├── Hero.tsx        # Hero Framer Motion
│   │   │   ├── About.tsx       # Bio DJ
│   │   │   ├── Services.tsx    # Grille services
│   │   │   ├── StudioSection.tsx # Studio + tarifs
│   │   │   ├── Portfolio.tsx   # Audio player + filtres
│   │   │   ├── InstagramFeed.tsx # Feed Instagram
│   │   │   └── BookingForm.tsx # Formulaire réservation
│   │   └── ui/
│   │       ├── AudioPlayer.tsx # Lecteur audio custom
│   │       ├── SoundWaveAnim.tsx # Animation barres son
│   │       ├── NeonButton.tsx  # Bouton avec glow
│   │       └── GlowCard.tsx    # Card avec effet hover
│   └── lib/
│       └── utils.ts            # cn() helper
├── public/
│   ├── images/                 # Photos DJ, studio
│   └── audio/                  # Fichiers audio MP3
└── design-system/
    └── MASTER.md               # Design system complet
```

## À compléter

1. **Photos** → ajouter dans `/public/images/`
2. **Audio** → ajouter les MP3 dans `/public/audio/`
3. **Email** → configurer Resend ou Formspree dans `BookingForm.tsx`
4. **Instagram** → intégrer l'API Instagram Basic Display
5. **Domaine** → déployer sur Vercel avec `rh-records.fr`

## Design System

Voir [design-system/MASTER.md](./design-system/MASTER.md) pour la documentation complète.

**Stack :** Next.js 14 · React 18 · TypeScript · Tailwind CSS · Framer Motion 11
