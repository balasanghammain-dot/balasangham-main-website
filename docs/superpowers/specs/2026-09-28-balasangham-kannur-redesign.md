# Balasangham Kannur & District Conference 2026 — Design Specification

**Date:** 2026-09-28  
**Status:** Approved Design Document  
**Target:** Balasangham Kannur Official Bilingual Publication & District Conference 2026 Experience  

---

## 1. Executive Summary & Intent

Build the official bilingual web application for **Balasangham Kannur** with a dedicated, high-end editorial digital experience for the **Balasangham Kannur District Conference 2026** (*ബാലസംഘം കണ്ണൂർ ജില്ലാ സമ്മേളനം 2026*).

### Core Tenets
1. **Factual Integrity & Content Provenance:**
   - Zero fabrication of schedules, speakers, committee officers, delegate statistics, or times.
   - Provenance data model (`ContentSource` + `LocalizedText`) tagging every string with its verified origin.
2. **Editorial Digital Publication Aesthetic:**
   - Cultural, youthful, documentary, modern, Kerala-rooted.
   - Replaces generic SaaS cards and unverified player widgets with documentary typography, archival photography, and editorial stanza reading layouts.
3. **Dual Distinct Experiences:**
   - **Main Portal (Home):** Movement identity, foundational motto (*പഠനം, മനനം, ചലനം*), 1938 Kalliasseri roots, 4 signature initiatives, and conference announcement.
   - **District Conference 2026 Experience:** Verified event publication, Kalliasseri heritage narrative, visual archive with accessible lightbox, and verbatim Flag Song (*പതാകഗാനം*) reading layout.

---

## 2. Architecture & Information Architecture

### 2.1 Route / View Structure
The single-page application manages view switching seamlessly with URL hash/query routing or lightweight state navigation:
- `view: 'home'` → Balasangham Kannur Movement Portal.
- `view: 'conference'` → Dedicated 2026 District Conference Publication.
- Persistent header with brand emblem, view switcher, language toggle (`EN | മലയാളം`), and quick conference link.

### 2.2 Data Model & Content Provenance (`src/types/content.ts`)
```typescript
export type Language = 'en' | 'ml';

export type SourceType = 'official' | 'historical-record' | 'poster-artwork' | 'editorial';

export interface ContentSource {
  type: SourceType;
  verified: boolean;
  referenceDoc?: string;
  notes?: string;
}

export interface LocalizedText {
  en: string;
  ml: string;
  source: ContentSource;
}

export interface ConferenceEventData {
  title: LocalizedText;
  theme: LocalizedText;
  date: LocalizedText;
  venue: LocalizedText;
  hall: LocalizedText;
  statusNotice: LocalizedText;
}

export interface ArchiveImage {
  id: string;
  src: string;
  thumbnail: string;
  alt: LocalizedText;
  caption: LocalizedText;
  category: 'poster' | 'backdrop' | 'historical';
  dimensions: { width: number; height: number };
}
```

### 2.3 Verified Conference Baseline
- **Title:**
  - Malayalam: *ബാലസംഘം കണ്ണൂർ ജില്ലാ സമ്മേളനം*
  - English: *Balasangham Kannur District Conference*
- **Theme:**
  - Malayalam: *പോരാട്ടത്തിന്റെ ബാല്യം ✊🏻*
  - English (Editorial translation): *Childhood of Struggle ✊🏻*
- **Date:**
  - Malayalam: *2026 ഒക്ടോബർ 10, 11*
  - English: *10–11 October 2026*
- **Venue:**
  - Malayalam: *കല്ല്യാശ്ശേരി, പിസിആർ ബാങ്ക് ഓഡിറ്റോറിയം*
  - English: *PCR Bank Auditorium, Kalliasseri, Kannur*
- **Schedule Policy:**
  - Hour-by-hour schedule is unverified and omitted from public display until officially ratified. Replaced with verified delegate arrival notice.

---

## 3. Component Hierarchy

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx              // Persistent navigation, view switcher, i18n toggle
│   │   ├── Footer.tsx              // Verified heritage tribute, copyright, bilingual motto
│   │   └── ViewSwitcher.tsx        // Toggle between Main Portal and Conference Experience
│   ├── home/
│   │   ├── HeroSection.tsx         // Editorial hero with backdrop motif & motto
│   │   ├── AboutSection.tsx        // 1938 Kalliasseri genesis & democratic structure
│   │   ├── WhatWeDoSection.tsx     // 4 signature programs with editorial documentary styling
│   │   └── ConferenceBanner.tsx    // Callout linking to the 2026 conference experience
│   ├── conference/
│   │   ├── ConferenceHero.tsx      // Typography-driven poster theme & verified dates
│   │   ├── KalliasseriHeritage.tsx // 1938 birthplace narrative & historical significance
│   │   ├── EventDetails.tsx        // Verified venue, travel access, and delegate advisory
│   │   ├── VisualArchive.tsx       // Responsive poster gallery grid
│   │   ├── LightboxModal.tsx       // Accessible modal (focus trap, Esc, ARIA)
│   │   └── FlagSongEditorial.tsx   // Verbatim 4-stanza poetic layout (no fake audio)
│   ├── common/
│   │   ├── LanguageToggle.tsx
│   │   └── ProvenanceBadge.tsx     // Subtle indicator for verified factual provenance
│   └── motifs/                     // Star emblem, dove, sunburst, flag SVGs
├── context/
│   ├── LanguageContext.tsx         // Localized state with localStorage persistence
│   └── NavigationContext.tsx       // Active view ('home' | 'conference')
├── data/
│   ├── verifiedContent.ts          // Single source of truth with ContentSource metadata
│   └── flagSong.ts                 // Verbatim Malayalam lyrics and poetic translation
└── types/
    └── content.ts                  // Strict TypeScript interfaces
```

---

## 4. Visual Archive & Accessible Lightbox Specification

1. **Asset Pipeline:**
   - Optimize high-resolution files from `example images for design/` into responsive web formats in `public/images/conference-2026/`.
2. **Lightbox Accessibility (WCAG 2.2 AA):**
   - Modal container has `role="dialog"`, `aria-modal="true"`, and `aria-label`.
   - Focus is trapped inside the lightbox while open.
   - Body scroll is locked (`document.body.style.overflow = 'hidden'`).
   - Pressing `Escape` closes the lightbox and returns focus to the triggering thumbnail.
   - Keyboard left/right arrow keys navigate between archive images.

---

## 5. Typography & Bilingual Styling

1. **Malayalam Typographic Safety:**
   - Fonts: `'Gayathri'`, `'Manjari'`, `'Noto Sans Malayalam'`, sans-serif.
   - Strict CSS rules:
     - `line-height: 1.65` or greater on all Malayalam text containers.
     - `font-feature-settings: "kern" 1`.
     - Explicit vertical padding to prevent glyph clipping of ascenders (*ചന്ദ്രക്കല*, *വള്ളികൾ*) and descenders (*കൂട്ടക്ഷരങ്ങൾ*).
2. **Color Palette:**
   - Primary Crimson Red: `#D32F2F` (Deep: `#B71C1C`)
   - Shubhra Pure White: `#FFFFFF`
   - Warm Amber Gold: `#F59E0B`
   - Charcoal Slate: `#121826`
   - Editorial Cream Surface: `#FFFDF7`

---

## 6. Testing & Quality Assurance Plan

1. **Unit & Integration Tests (Vitest + React Testing Library):**
   - Provenance integrity: verify verifiedContent entries adhere to `ContentSource`.
   - View navigation: switching between 'home' and 'conference' updates DOM properly.
   - Language persistence: language changes persist across reloads and update all rendered text.
   - Lightbox interaction: opens on click, closes on `Escape`, navigates via arrows, traps focus.
   - Flag Song: verify exact 4 stanzas without fabricated audio controls.
2. **Build Verification:**
   - Clean `tsc --noEmit` and `vite build`.
