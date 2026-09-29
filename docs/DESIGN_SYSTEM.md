# Design System & Visual Guidelines: Balasangham Kannur

This document outlines the UI/UX design system, color palette, typography, component rules, and visual guidelines for building the Balasangham Kannur website.

---

## 1. Design Philosophy

- **Youthful & Energetic**: Tailored for children, young students, parents, and educators.
- **Progressive & Dignified**: Reflects social justice, scientific temper, child rights, and cultural heritage.
- **Bilingual First**: Seamless, balanced visual hierarchy whether rendered in English or Malayalam.
- **Poster Faithful**: Direct visual harmony with the official 2026 Kalliasseri District Conference artwork.

---

## 2. Color Palette & Design Tokens

### 2.1 Primary Brand Colors
| Token Name | Hex Code | Role | Description |
| :--- | :--- | :--- | :--- |
| `color-primary-red` | `#D32F2F` | Primary Action / Accent | Revolutionary Red, flag star color, primary buttons, badges |
| `color-primary-dark-red` | `#B71C1C` | Hover / Contrast | Dark crimson for hover states and text emphasis on white |
| `color-white` | `#FFFFFF` | Background / Flag Base | Pure crisp white representing the *Shubhrapathaka* (White Flag) |
| `color-charcoal-dark` | `#121826` | Primary Typography | Deep slate-black for high legibility copy |
| `color-slate-gray` | `#4B5563` | Secondary Typography | Neutral gray for metadata, sub-labels, borders |
| `color-warm-gold` | `#F59E0B` | Highlight Accent | Golden yellow for badges, star glows, spotlight tags |
| `color-cream-bg` | `#F9FAFB` | Section Background | Soft off-white to break monotony between alternating sections |
| `color-card-border` | `#E5E7EB` | Dividers & Borders | Subtle border for clean modern cards |

### 2.2 Semantic & State Colors
- **Success / Eco**: `#10B981` (for environmental programs and confirmations).
- **Warning**: `#F59E0B`.
- **Focus Ring**: `2px solid #D32F2F` with `offset-2`.

---

## 3. Typography Stack & Font Hierarchy

Malayalam rendering requires appropriate line-heights and glyph clearance to avoid clipping conjunct characters (കൂട്ടക്ഷരങ്ങൾ).

### 3.1 Recommended Fonts
- **English**:
  - Primary UI & Body: `Plus Jakarta Sans` or `Inter`, sans-serif.
  - Display / Slogan: `Poppins` or `Outfit`, sans-serif.
- **Malayalam**:
  - Primary Headlines: `Gayathri` (Google Fonts, weights: 700) or `Manjari` (weights: 700).
  - Primary Body & Sub-labels: `Manjari` (regular, clean humanist lines, friendly for children) or `Noto Sans Malayalam`.

### 3.2 Malayalam Rendering Rules
- Set `line-height` for Malayalam text to at least `1.6` to `1.75` (Malayalam diacritics and signs like ചന്ദ്രക്കല, വള്ളികൾ require vertical clearance).
- Ensure `font-feature-settings: "kern" 1` is enabled.
- Avoid all-caps transformations on bilingual containers (`uppercase` must only apply to Latin characters).

---

## 4. Iconography & Symbolic Motifs

1. **The Raised Fist (`✊🏻` / `✊`)**:
   - Represents "പോരാട്ടത്തിന്റെ ബാല്യം" (Childhood of Struggle) and active agency of youth.
2. **The Red Five-Pointed Star (`★` / `രക്തതാര`)**:
   - Central motif of the Balasangham flag. Used on buttons, list bullets, section dividers.
3. **The White Dove (`🕊️` / `വെള്ളിപ്രാവ്`)**:
   - Represents the Flag Song lyric: *"വിണ്ണിൻ നെഞ്ചിൻ കൂട്ടിൽ വളർത്തിയ വെള്ളിപ്രാവ കണക്കല്ലോ മാനവശാന്തിക്കുയിരിന്നുയിരായ്..."* (Peace and human fraternity).
4. **The Book & Torch / Lamp (`📖` / `🔥`)**:
   - Represents "പഠനം, മനനം, ചലനം" (Study, Contemplation, Action).
5. **The Dragonfly (`വേനൽത്തുമ്പി`)**:
   - Emblematic of the iconic *Venalthumbikal* children's cultural troupe.

---

## 5. UI Component Specifications

### 5.1 Bilingual Language Toggle (`EN | മലയാളം`)
- Located in the top navigation bar (desktop and mobile drawer).
- Clear indicator of active language with high contrast.
- Instant client-side or router-level switch preserving current scroll position and page route.

### 5.2 Hero Banner (Event & Home)
- High visual impact card with red and white split or crisp white card with red structural borders.
- Floating badge with the official motto or conference slogan.
- Responsive layout: clean vertical stack on mobile (`< 768px`), side-by-side or layered grid on desktop (`>= 1024px`).

### 5.3 Flag Song Player & Lyrics Card
- Interactive component showing the full Malayalam song alongside English meaning.
- Audio playback controller: Play/Pause, timeline scrubber, volume, and playback speed.
- Expandable / collapsible verse cards with line-by-line translation.

### 5.4 Live Countdown Timer (Conference 2026)
- 4-column counter: `Days | Hours | Minutes | Seconds`.
- Monospace or tabular numerals (`font-variant-numeric: tabular-nums`) to prevent layout jitter.
- Target Date: `2026-10-10T09:00:00+05:30` (IST).

### 5.5 Mobile & Accessibility Standards
- Fully responsive across 320px to 4K displays.
- Minimum tap target size: `44x44px` for all interactive elements.
- WCAG AA contrast compliance: text contrast >= 4.5:1 against backgrounds.
