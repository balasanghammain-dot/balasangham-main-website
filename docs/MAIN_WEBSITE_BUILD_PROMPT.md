# Master Build Agent Prompt: Balasangham Official Main Website

> **Instructions for User:** Copy and paste the prompt block below directly into your primary autonomous code-generation / build agent (e.g. Claude Code, Cursor Composer, or Lovable/v0).

---

```markdown
You are a senior frontend engineer, UI/UX specialist, and cultural historian tasked with building the official, production-ready bilingual web application for **Balasangham** (ബാലസംഘം) — the world's largest democratic and progressive children's movement.

## Reference Grounding & Source of Truth
Before writing code, study the specification in `docs/BALASANGHAM_MAIN_WEBSITE_SPEC.md`. You must adhere strictly to the historical facts, organizational principles, and visual aesthetic documented there.

The design is visually grounded in the authentic stage backdrops and event posters located in:
`example images for design/` (specifically `10x8new.jpg.jpeg`, `dummygr.jpg.jpeg`, and `WhatsApp Image 2026-09-27 at 11.02.32 AM.jpeg`).

---

## 1. Scope & Core Purpose
This website is dedicated exclusively to presenting the four foundational pillars of Balasangham:
1. **What is Balasangham? (ആരാണ് ബാലസംഘം?)**: Identity, scale (1,000,000+ children, 20,000+ units across Kerala), democratic constitution run by children with adult facilitators, core values (secularism, scientific temper, child rights protection, universal fraternity).
2. **What They Do (പ്രവർത്തനങ്ങൾ)**: Signature programs and initiatives:
   - *Venalthumbikal (വേനൽത്തുമ്പികൾ)*: Traveling children's street theater and cultural troupes.
   - *Venal Kalari (വേനൽ കളരി)*: Vacation creative workshops (theater, painting, folk songs, ecology).
   - *Kilikkoodu (കിളിക്കൂട്)*: Official monthly children's magazine.
   - *Shasthra Deepthi & Nature Camps (ശാസ്ത്ര ദീപ്തി & പരിസ്ഥിതി ക്യാമ്പുകൾ)*: Science popularization and environmental protection.
   - *Kutti Koottams (കുട്ടിക്കൂട്ടങ്ങൾ)*: Weekly neighborhood democratic reading & cultural circles.
   - *Anti-Drug & Child Safety Campaigns (ലഹരിവിരുദ്ധ പോരാട്ടം)*: Community defense of child rights.
3. **Events Conducted (നടന്നതും നടക്കുന്നതുമായ മേളകൾ)**:
   - *Bala Kalolsavam*: Non-commercial children's arts festivals celebrating universal expression.
   - *State & District Conferences*: Democratic delegates, child-led assemblies, and giant Children's Rallies (*കുട്ടികളുടെ മഹാറാലി*).
   - *Venalthumbi Cultural Caravans*: Statewide street performance tours.
   - *Commemoration Days*: Foundation Day (Dec 28), Anti-War/Peace Days (Aug 6/9), Children's Day (Nov 14).
4. **History & Heritage of Balasangham (ചരിത്രവും നാൾവഴികളും)**:
   - **Genesis: December 28, 1938 at Kalliasseri, Kannur District, Malabar**.
   - Historic founders and pioneers: P. Krishna Pillai, A.K. Gopalan (AKG), E.M.S. Namboodiripad, K.P.R. Gopalan, with young leaders like E.K. Nayanar.
   - The fight against feudal oppression, child labor, and illiteracy.
   - **Statewide Reconstitution: December 28, 1980** establishing the modern democratic constitution.
   - Interactive timeline: 1938 -> 1980 -> 1990 (Venalthumbikal) -> Present Day (1 Million+ children).

---

## 2. Visual Design System & Aesthetic (Extracted from Images)

The visual design must capture the joyous, energetic, celebratory festival stage backdrop aesthetic seen in `10x8new.jpg.jpeg`:

### 2.1 Color Tokens
- **Revolutionary Primary Red**: `#D32F2F` (hover `#B71C1C`) — Accent badge, CTA buttons, red star emblem.
- **Sunburst Golden Yellow**: `#FBC02D` — Hero gradient, celebratory solar rays, star glows.
- **Warm Radiant Amber**: `#F57F17` — Accents, spotlight tags, stage highlights.
- **Azure Sky Blue**: `#1976D2` — Stage backdrop sky contrast, badges, secondary borders.
- **Meadow Nature Green**: `#388E3C` — Environmental and nature study badges.
- **Shubhra White (ശുഭ്രപതാക)**: `#FFFFFF` — Crisp flag background, clean container cards.
- **Warm Cream Surface**: `#FFFDF7` — Warm textured section background.
- **Charcoal Slate**: `#121826` — Deep readable typography.

### 2.2 Typography
- Import Google Fonts:
  - English: `'Plus Jakarta Sans'`, `'Inter'`, sans-serif.
  - Malayalam: `'Gayathri'` (weight 700 for headings), `'Manjari'` (weights 400, 700 for body and subheadings).
- **Malayalam Rendering Rule**: Apply `line-height: 1.65` or greater on all Malayalam text blocks to prevent clipping of conjunct characters (കൂട്ടക്ഷരങ്ങൾ, ചന്ദ്രക്കല, വള്ളികൾ).

### 2.3 Visual Motifs
- Top Hero banner features a stylized backdrop arc and golden ray glow.
- Red five-pointed star (`★` / രക്തതാരം) and White Dove (`🕊️` / വെള്ളിപ്രാവ്) emblems.
- Stylized vector silhouettes of children reading, singing, holding hands, and waving flags.

---

## 3. Bilingual Engine (English & Malayalam)
- Full client-side bilingual toggle (`EN | മലയാളം`) in the sticky navigation bar.
- Default to **English** on first visit with instant toggle to **Malayalam**.
- Store user language preference in `localStorage`.
- All text strings across all 4 pillars, buttons, tooltips, and badges must be fully localized with zero English leaks when Malayalam is active.

---

## 4. Key Interactive Components to Implement

1. **Sticky Header & Brand Identity**:
   - Balasangham emblem (Red star on white flag) + bilingual site title.
   - 4 Section navigation links: `About` (ആരാണ് ബാലസംഘം), `What We Do` (പ്രവർത്തനങ്ങൾ), `Events` (മേളകൾ), `History` (ചരിത്രം).
   - "🎵 Flag Song" modal trigger button.
   - `EN | മലയാളം` language toggle.

2. **Stage Backdrop Hero Banner**:
   - Radiant sunburst festive backdrop with children celebration silhouettes.
   - Bilingual core slogan:
     - Malayalam: *"പഠനം, മനനം, ചലനം - പോരാട്ടത്തിന്റെ ബാല്യം"*
     - English: *"Study, Contemplate, Act - The Vanguard of Children's Liberation"*
   - Quick Stat Counter Ribbon:
     - **1,000,000+** Children
     - **20,000+** Units
     - **14** Districts
     - **1938** Foundation Year (88 Years of Legacy)

3. **Section 1: What is Balasangham? (ആരാണ് ബാലസംഘം?)**:
   - Thematic cards detailing the 4 values:
     1. Childhood Democracy (കുട്ടികളുടെ നേതൃത്വം)
     2. Secular & Universal Fraternity (മതേതര സൗഹൃദം)
     3. Scientific Inquiry & Rationality (ശാസ്ത്രബോധം)
     4. Defense of Child Rights (അവകാശ പോരാട്ടം)
   - Interactive structure view showing the child-led governance hierarchy: Unit -> Area -> Municipality -> District -> State.

4. **Section 2: What We Do (പ്രവർത്തനങ്ങൾ)**:
   - Interactive card grid for:
     - 🎭 *Venalthumbikal* (Summer traveling theater troupe)
     - ⛺ *Venal Kalari* (Creative vacation camps)
     - 📖 *Kilikkoodu* (Children's magazine showcase with sample issue covers)
     - 🔬 *Shasthra Deepthi* (Science & environmental defense)
     - 📚 *Kutti Koottams* (Neighborhood reading circles)
     - 🛡️ *Anti-Drug & Safety Drives* (Children's human chains and pledges)

5. **Section 3: Events Conducted (മേളകളും പരിപാടികളും)**:
   - Filterable tabs: `All` | `Arts & Kalolsavam` | `Conferences & Rallies` | `Cultural Jathas` | `Memorial Days`.
   - Card displays featuring date, scope, artistic disciplines, and community impact.

6. **Section 4: History & Heritage (ചരിത്രവും നാൾവഴികളും)**:
   - Detailed historic account of the December 28, 1938 foundation in Kalliasseri, Kannur.
   - Tribute spotlight cards for pioneers: **P. Krishna Pillai, A.K. Gopalan (AKG), E.M.S. Namboodiripad, K.P.R. Gopalan, E.K. Nayanar**.
   - Interactive timeline from 1938 peasant resistance to 1980 statewide revival to today.

7. **The Official Flag Song (പതാകഗാനം) Audio & Lyrics Module**:
   - Styled after the white and red star flag.
   - Audio player controls (Play/Pause, scrub bar, duration ticker).
   - Complete Malayalam lyrics ("ഉണരുക ഉയരുക ശുഭ്രപതാകേ...") with synchronized line-by-line English poetic translation.

8. **Footer & Tribute**:
   - Official motto display, quick navigation, pledge of solidarity to children's liberation, and copyright.

---

## 5. Technical Stack & Quality Standards
- **Framework**: Vite + React + TypeScript or Next.js (Tailwind CSS, Lucide React icons).
- **Responsive**: Pixel-perfect across 360px mobile, tablet, and 4K desktop screens.
- **Accessibility**: WCAG 2.2 AA compliant, minimum touch target 44px, semantic HTML elements.
- **Strict Authenticity**: Zero synthetic or hallucinated dates or names. Rely exclusively on the verified facts in `docs/BALASANGHAM_MAIN_WEBSITE_SPEC.md`.

Build the application completely, verify responsive rendering and both language modes, and ensure all build checks pass.
```
