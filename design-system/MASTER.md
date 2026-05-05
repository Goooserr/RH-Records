# RH Records — Design System MASTER

> Généré automatiquement via UI/UX Pro Max Skill  
> Date : 2026-05-05 | Projet : RH Records Chambéry

---

## 1. DIRECTION ARTISTIQUE

### Style principal
**Dark Mode OLED + Retro-Futurism (Cyberpunk / Synthwave)**

Ambiance : studio d'enregistrement nocturne, univers underground, énergie électronique.  
Références : Ableton Live UI, NTS Radio, XO (The Weeknd), SoundCloud dark.

### Styles alternatifs disponibles
| Style              | Description                          | Usage recommandé              |
|--------------------|--------------------------------------|-------------------------------|
| Aurora UI          | Gradients nord-lumineux, doux        | Hero alternative, landing soft|
| Vaporwave          | 80s-90s retro, sunset gradient       | Section Instagram, visuels     |
| Cyberpunk UI       | Terminal, HUD, scanlines             | Portfolio, badges, code esthétique |

---

## 2. PALETTE COULEURS

| Variable        | Valeur    | Usage                          |
|-----------------|-----------|--------------------------------|
| `rh-black`      | `#0A0A0A` | Fond principal OLED            |
| `rh-dark`       | `#111111` | Sections alternées             |
| `rh-surface`    | `#1A1A1A` | Cards, composants              |
| `rh-border`     | `rgba(255,255,255,0.08)` | Bordures subtiles  |
| `rh-purple`     | `#A855F7` | Accent primaire / CTA          |
| `rh-violet`     | `#7C3AED` | Gradient purple foncé          |
| `rh-cyan`       | `#06B6D4` | Accent secondaire / Studio     |
| `rh-pink`       | `#EC4899` | Accent tertiaire / Instagram   |
| `rh-white`      | `#F8F8F8` | Texte principal                |
| `rh-grey`       | `#9CA3AF` | Texte secondaire               |
| `rh-gold`       | `#F59E0B` | Accent décoratif (rare)        |

### Dégradés
- **Gradient néon** : `135deg, #A855F7 → #06B6D4`
- **Gradient purple** : `135deg, #7C3AED → #A855F7`
- **Gradient purple/pink** : `135deg, #EC4899 → #A855F7`

---

## 3. TYPOGRAPHIE

| Usage        | Police          | Poids        | Notes                    |
|--------------|-----------------|--------------|--------------------------|
| Titres       | **Syne**        | 700–800 ExtraBold | Identité forte, angular |
| Corps        | **Inter**       | 300–500      | Lisibilité optimale      |
| Code / Mono  | **JetBrains Mono** | 400–500 | Labels, badges, stats   |

**Import Google Fonts :**
```css
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
```

**Tailles :**
- H1 : `clamp(2.8rem, 7vw, 5.5rem)`
- H2 : `clamp(2rem, 4vw, 3.2rem)`  
- Body : `1rem` / line-height `1.65`
- Small : `0.875rem`

---

## 4. COMPOSANTS DESIGN

### Glass Dark
```css
background: rgba(255,255,255,0.04);
backdrop-filter: blur(16px);
border: 1px solid rgba(255,255,255,0.08);
border-radius: 16px;
```

### Glow Effects
```css
/* Purple */  box-shadow: 0 0 20px rgba(168,85,247,0.45), 0 0 60px rgba(168,85,247,0.2);
/* Cyan */    box-shadow: 0 0 20px rgba(6,182,212,0.45),  0 0 60px rgba(6,182,212,0.2);
/* Pink */    box-shadow: 0 0 20px rgba(236,72,153,0.45), 0 0 60px rgba(236,72,153,0.2);
```

### NeonButton
- Primary : `bg-gradient-neon` + `hover:glow-purple`
- Outline : `glass-dark border-rh-purple/40` + `hover:border-rh-purple hover:glow-purple`
- Taille : min 44×44px (touch compliant)

---

## 5. ANIMATIONS FRAMER MOTION

### Variants réutilisables (Hero.tsx)
```ts
// Fade + Slide up
const fadeSlideUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
};

// Stagger container
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
};

// Parallax scroll (useTransform)
const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
```

### Durées (règle UI/UX Pro Max)
| Interaction     | Durée        |
|-----------------|--------------|
| Hover buttons   | 180ms        |
| Fade-in         | 600–700ms    |
| Stagger delay   | 80–120ms     |
| Sound wave bars | 1200–1600ms  |
| Parallax scroll | Continu      |

---

## 6. GRID & LAYOUT

- Container max : `max-w-7xl` (1280px)
- Section padding : `6rem` desktop / `4rem` mobile
- Grid services : 3 colonnes desktop, 2 tablet, 1 mobile
- Navbar : floating `top-4 left-4 right-4 rounded-2xl`

---

## 7. ACCESSIBILITÉ (WCAG AA)

- [ ] Contraste texte/fond : 7:1+ sur OLED noir
- [ ] Focus visible : `outline: 2px solid #A855F7`
- [ ] Touch targets : min 44×44px
- [ ] `aria-label` sur tous boutons icônes
- [ ] `prefers-reduced-motion` respecté dans globals.css
- [ ] `alt` sur toutes les images
- [ ] Landmarks ARIA : `<nav>`, `<main>`, `<section>`, `<footer>`

---

## 8. SEO LOCAL

**Mots-clés ciblés :**
- DJ Chambéry
- Beatmaker Chambéry  
- Studio d'enregistrement Chambéry
- Mixage mastering Savoie
- DJ soirée Chambéry
- Production musicale Chambéry
- RH Records

**Métadonnées intégrées** dans `layout.tsx` (OpenGraph + Twitter Cards + siteName).

---

## 9. FONCTIONNALITÉS FUTURES (Roadmap)

| Feature                    | Priorité | Notes                          |
|----------------------------|----------|--------------------------------|
| Boutique beats (Stripe)    | Haute    | Vente de beats non-exclusifs   |
| Packs de samples           | Haute    | Téléchargement payant          |
| Espace client connecté     | Moyenne  | Suivi de sessions, livraisons  |
| Blog / Actualités          | Moyenne  | SEO + storytelling             |
| Lecteur Soundcloud intégré | Basse    | Alternative audio player       |
| Système de notation        | Basse    | Avis clients vérifiés          |

---

## 10. STACK TECHNIQUE

```
Next.js 14 (App Router)
React 18
TypeScript 5
Tailwind CSS 3
Framer Motion 11
Lucide React (icônes SVG)
```

**Structure fichiers :**
```
src/
  app/          → Pages (App Router)
  components/
    layout/     → Navbar, Footer
    sections/   → Hero, About, Services, Studio, Portfolio, Booking, Instagram
    ui/         → AudioPlayer, SoundWaveAnim, NeonButton, GlowCard
  lib/          → utils.ts
```
