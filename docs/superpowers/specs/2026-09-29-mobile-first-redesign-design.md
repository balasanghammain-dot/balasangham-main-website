# Design Specification: Balasangham Kannur Mobile-First Editorial Redesign

## 1. Overview & Objectives
- **Target Platform**: Mobile-first responsive web application optimized for modern smartphones (360px, 375px, 390px, 412px, 430px) scaling cleanly to tablet (768px) and desktop (1024px+).
- **Aesthetic Direction**: Editorial cultural magazine inspired by the Balasangham Kannur District Conference poster and festival theme artwork (`public/images/balasangham-festival-theme.jpeg`).
- **Core Principles**:
  - Zero horizontal overflow.
  - Safe-area insets for notched and dynamic island devices.
  - Thumb-zone ergonomics (min 48px touch targets, sticky bottom navigation).
  - Uncompromised Malayalam typography (min 1.65–1.7 line height for conjunct scripts).
  - Privacy-preserving client-side face discovery flow ("Find My Photos").

---

## 2. Design Tokens & Festive Color Palette

Extracted from `/public/images/balasangham-festival-theme.jpeg`:

| Token | Hex Value | Role & Usage |
|---|---|---|
| `festival-red` | `#D32020` | Brand primary, action buttons, active navigation, star badges |
| `festival-gold` | `#F5A623` | Warm sunburst glow, secondary highlights, award badges |
| `festival-green` | `#257A3E` | Cultural & ecological accents, Venalthumbikal markers |
| `parchment-bg` | `#FDF7EB` | Main page background, warm paper grain texture |
| `paper-surface`| `#F5E9D3` | Elevated cards, secondary containers, header borders |
| `earth-umber`  | `#2A1610` | Dark contrast sections, lead headings, footer background |
| `pure-warm`    | `#FFFDF7` | Card surfaces, modal sheets, lightbox overlays |

### Typography
- **Latin Font Family**: Inter / system sans-serif with tight letter-spacing for uppercase headlines.
- **Malayalam Font Family**: `'Gayathri'`, `'Manjari'`, `'Noto Sans Malayalam'`.
- **Line Heights**: `1.7` for body Malayalam; `1.35` for display Malayalam.
- **Font Sizes**: Responsive `clamp()` units for display (`clamp(1.85rem, 8vw, 3.25rem)`), 16px minimum for form controls to prevent iOS zoom.

---

## 3. Layout, Safe Areas & Navigation Architecture

### Safe Area Support
```css
padding-top: env(safe-area-inset-top);
padding-bottom: env(safe-area-inset-bottom);
padding-left: env(safe-area-inset-left);
padding-right: env(safe-area-inset-right);
```

### Sticky Top Bar (`h-14`, `z-40`)
- Brand identification: Balasangham Red Star + "ബാലസംഘം കണ്ണൂർ".
- Action buttons: Bilingual language switcher (`മലയാളം` / `EN`), Anthem audio trigger, Mobile slide-over drawer toggle.
- Touch target: 48px × 48px minimum.

### Fixed Bottom Thumb Bar (`h-16`, `z-40`, mobile-only `md:hidden`)
- Position: `fixed bottom-0 inset-x-0` with `pb-[env(safe-area-inset-bottom)]`.
- Page offset: `<main>` tag receives `pb-20 md:pb-0` to eliminate overlap.
- 5 Primary Destinations:
  1. **Home** (`/`) - Icon: `Home`
  2. **Programs** (`/programs`) - Icon: `Sparkles`
  3. **Photos / Cam** (`/media`) - Icon: `Camera`
  4. **News** (`/news`) - Icon: `Newspaper`
  5. **Join** (`/join`) - Icon: `UserPlus` (prominent red pill)

### Mobile Drawer Menu
- Off-canvas drawer sliding from right for secondary routes:
  - History & Pioneers (`#history`)
  - District Committee (`/about/committee`)
  - Flag Song Lyrics & Music
  - Contact & Office Directory (`/contact`)

---

## 4. Mobile Editorial Components

### 1. Hero Section
- Single-column vertical stack with festival badge ("കണ്ണൂർ ജില്ലാ സമ്മേളനം 2026").
- Headline with fluid typography and cultural motif accents.
- 2×2 metric touch cards:
  - `20,000+` Units
  - `10 Lakh+` Members
  - `1938` Heritage
  - `100%` Secular
- Primary CTAs stacked for easy thumb tap.

### 2. About & 4 Pillars
- Compact cards on `#FDF7EB` paper grain.
- 4 Pillars with colored vertical status strips:
  - Secularism (`#D32020`)
  - Democracy (`#F5A623`)
  - Scientific Temper (`#257A3E`)
  - Cultural Creativity (`#2A1610`)

### 3. Programs Showcase
- Vertical stack of mobile magazine cards (Venalthumbikal, Kalari, Kilikkoodu).
- Visual header with 4:3 ratio, dark gradient overlay, and festival gold badge.
- Expandable checkmark highlights per program.

### 4. Events & Conference Hub
- Horizontal touch-scroll filter pill bar (`All`, `Arts`, `Conferences`, `Memorials`).
- Featured District Conference card with full poster preview, venue details, and action link.

### 5. Verified News Dispatches
- Asymmetric editorial layout adapted for mobile:
  - Lead story with 16:10 preview, badge, date, summary, and full read link.
  - Secondary dispatches as swipeable horizontal cards.

---

## 5. Dedicated "Find My Photos" Mobile Workflow

### Flow Steps
1. **Event Selector**:
   - Touch pills selecting event gallery (`District Conference 2026`, `Venalthumbikal Troupe`, `State Kalolsavam`).
2. **Camera & Upload Trigger**:
   - `<input type="file" accept="image/*" capture="user">` for one-tap native front-camera selfie.
   - Secondary button for photo gallery upload.
   - Immediate client-side thumbnail preview with "Retake" button.
3. **Privacy Architecture & Guarantees**:
   - Informational card: "100% Client-Side Search. No selfies are sent to any server. No biometric templates saved."
   - Search results clearly designated: "POSSIBLE MATCHES // സാധ്യതയുള്ള ചിത്രങ്ങൾ".
4. **Results Grid**:
   - 2-column touch photo grid with subtle match tags.
   - Empty state with retry suggestions (lighting, framing).
5. **Full-Screen Photo Viewer / Lightbox**:
   - Full-screen modal (`fixed inset-0 z-50 bg-[#2A1610]/95`).
   - Touch gestures: swipe left/right for next/prev photo.
   - Actions: Web Share API button, high-resolution download, close button.

---

## 6. Testing & Verification Plan

1. **Unit & Component Testing (Vitest)**:
   - Bottom navigation active state and route matching.
   - Language toggle persistence and text translation rendering.
   - Photo filter matching and empty states.
2. **Responsive Viewport Testing (Playwright MCP)**:
   - iPhone SE / Android Small (360×800)
   - iPhone 13/14/15/16 (390×844)
   - iPhone Pro Max / Plus (430×932)
   - iPad / Tablet (768×1024)
   - Desktop (1280×800)
3. **Visual Quality & Overflow Checks**:
   - Zero horizontal document scroll (`scrollWidth === innerWidth`).
   - Touch target sizes ≥ 48px.
   - Malayalam conjunct rendering without clipped glyphs.
