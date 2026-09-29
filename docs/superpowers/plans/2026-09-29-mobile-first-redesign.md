# Mobile-First Editorial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform Balasangham Kannur website into an editorial magazine mobile-first web app with a persistent bottom thumb bar, festival palette styling, and an interactive client-side "Find My Photos" flow.

**Architecture:** Implement safe-area layout primitives and responsive styling tokens matching `balasangham-festival-theme.jpeg`. Introduce a dedicated mobile bottom navigation bar (`BottomNav.tsx`) and mobile drawer, refactor `HomePage.tsx` editorial sections to fluid clamp/touch scales, and enhance `FindMyPhotos.tsx` with one-tap camera capture and touch-friendly lightbox viewer.

**Tech Stack:** React 18, React Router v6, TypeScript 5.7, Tailwind CSS 3.4, Lucide React, Vitest 3, Testing Library.

**Spec:** `docs/superpowers/specs/2026-09-29-mobile-first-redesign-design.md`

## Global Constraints
- Mobile-first viewports base: 360px, 375px, 390px, 412px, 430px up to desktop.
- Touch target minimum: 48px × 48px for thumb reachability.
- Safe area insets: `pt-[env(safe-area-inset-top)]` and `pb-[env(safe-area-inset-bottom)]`.
- Malayalam font line-height: min 1.65–1.7 to prevent conjunct/descender clipping.
- Privacy in "Find My Photos": 100% client-side, zero face embeddings persisted, probabilistic labeling ("POSSIBLE MATCHES").
- Never commit directly to `main`; all work on feature branch `feat/mobile-first-redesign`.

## Review Focus
1. Bottom bar collision with footer / main content — ensure `<main>` has `pb-20 md:pb-0` so nothing is hidden behind the fixed bar.
2. Horizontal overflow on narrow screens (360px) — ensure `overflow-x-hidden` and zero fixed-width child containers exceeding 100vw.
3. Camera input fallback on non-mobile devices — verify `<input type="file" accept="image/*">` works reliably on desktops/laptops without crashing.
4. Malayalam conjunct descender rendering — ensure headings and body lines never clip descending ligatures (e.g. ്യ, ്ര, ്ള).
5. Language toggle state synchronization — verify language switch updates both top header, bottom thumb labels, and modals simultaneously.

---

### Task 1: Color Tokens & Safe Area Base Styles

**Files:**
- Modify: `tailwind.config.js:55-88`
- Modify: `src/index.css:5-83`
- Test: `src/index.css`

**Interfaces:**
- Consumes: Festival theme values from spec (`#D32020`, `#F5A623`, `#257A3E`, `#FDF7EB`, `#F5E9D3`, `#2A1610`, `#FFFDF7`)
- Produces: Tailwind color utility classes (`bg-festival-red`, `text-festival-red`, `bg-parchment-bg`, `bg-paper-surface`, `text-earth-umber`) and safe-area utilities.

- [ ] **Step 1: Write tests for palette class availability and safe-area styles**
Add test in `src/App.test.tsx` verifying safe-area utility and festival theme tokens render.

- [ ] **Step 2: Run test to observe baseline state**
Run: `npm test src/App.test.tsx`

- [ ] **Step 3: Update `tailwind.config.js` and `src/index.css`**
Update `tailwind.config.js` with festival palette tokens:
```javascript
festival: {
  red: '#D32020',
  gold: '#F5A623',
  green: '#257A3E',
  umber: '#2A1610',
},
parchment: '#FDF7EB',
paper: '#F5E9D3',
'warm-white': '#FFFDF7',
```
Add safe-area padding helpers in `src/index.css`:
```css
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom);
}
.pt-safe {
  padding-top: env(safe-area-inset-top);
}
```

- [ ] **Step 4: Run test to verify it passes**
Run: `npm test src/App.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add tailwind.config.js src/index.css src/App.test.tsx
git commit -m "feat(ui): add festival theme tokens and safe-area utilities"
```

---

### Task 2: Mobile Bottom Thumb Navigation Component

**Files:**
- Create: `src/components/layout/BottomNav.tsx`
- Create: `src/components/layout/BottomNav.test.tsx`
- Modify: `src/App.tsx:30-84`

**Interfaces:**
- Consumes: React Router `NavLink`, `useLocation`, `useLanguage`
- Produces: `<BottomNav />` with 5 touch destinations (Home, Programs, Media/Photos, News, Join).

- [ ] **Step 1: Write the failing test for `BottomNav`**
Create `src/components/layout/BottomNav.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from '../../context/LanguageContext';
import { BottomNav } from './BottomNav';

describe('BottomNav', () => {
  it('renders all 5 thumb navigation destinations', () => {
    render(
      <LanguageProvider>
        <BrowserRouter>
          <BottomNav />
        </BrowserRouter>
      </LanguageProvider>
    );
    expect(screen.getByRole('link', { name: /home|ഹോം/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /programs|പരിപാടികൾ/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /media|മീഡിയ/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /news|വാർത്തകൾ/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /join|അംഗത്വം/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**
Run: `npm test src/components/layout/BottomNav.test.tsx`
Expected: FAIL with "Cannot find module './BottomNav'"

- [ ] **Step 3: Implement `BottomNav.tsx`**
Create `src/components/layout/BottomNav.tsx`:
```tsx
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Home, Sparkles, Camera, Newspaper, UserPlus } from 'lucide-react';

export const BottomNav = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';

  const navItems = [
    { to: '/', label: 'Home', labelMl: 'ഹോം', icon: Home },
    { to: '/programs', label: 'Programs', labelMl: 'പരിപാടികൾ', icon: Sparkles },
    { to: '/media', label: 'Photos', labelMl: 'ഫോട്ടോകൾ', icon: Camera },
    { to: '/news', label: 'News', labelMl: 'വാർത്തകൾ', icon: Newspaper },
    { to: '/join', label: 'Join', labelMl: 'അംഗത്വം', icon: UserPlus, highlight: true },
  ];

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 inset-x-0 z-40 bg-[#FFFDF7]/95 backdrop-blur-md border-t border-[#2A1610]/15 pb-[env(safe-area-inset-bottom)] md:hidden transition-all shadow-warm-lg"
    >
      <div className="grid grid-cols-5 h-16 max-w-lg mx-auto items-center px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center h-full min-h-[48px] py-1 text-center transition-transform active:scale-95 ${
                  isActive
                    ? 'text-[#D32020] font-black'
                    : 'text-[#2A1610]/70 hover:text-[#D32020]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`relative p-1 rounded-full transition-colors ${
                      item.highlight
                        ? 'bg-[#D32020] text-white p-1.5 -mt-2 shadow-xs'
                        : isActive
                        ? 'bg-[#D32020]/10'
                        : ''
                    }`}
                  >
                    <Icon className={item.highlight ? 'w-5 h-5 text-white' : 'w-5 h-5'} />
                  </div>
                  <span
                    className={`text-[10px] tracking-tight leading-tight mt-0.5 ${
                      ml ? 'font-malayalam' : 'font-sans'
                    } ${item.highlight ? 'font-bold text-[#D32020]' : ''}`}
                  >
                    {ml ? item.labelMl : item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
```
Integrate into `src/App.tsx` and add `pb-20 md:pb-0` to `<main>`.

- [ ] **Step 4: Run test to verify it passes**
Run: `npm test src/components/layout/BottomNav.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add src/components/layout/BottomNav.tsx src/components/layout/BottomNav.test.tsx src/App.tsx
git commit -m "feat(nav): add mobile bottom thumb navigation bar"
```

---

### Task 3: Sticky Top Header & Mobile Drawer Refinements

**Files:**
- Modify: `src/components/layout/Navbar.tsx:66-272`
- Test: `src/components/layout/Navbar.test.tsx`

**Interfaces:**
- Consumes: Safe-area top padding, 48px touch targets, Drawer sheet
- Produces: Compact responsive header with Malayalam branding, quick language toggle, and audio anthem trigger.

- [ ] **Step 1: Write test for 48px mobile touch targets and drawer behavior**
Update `src/components/layout/Navbar.test.tsx` to verify touch button accessibility and safe-area compatibility.

- [ ] **Step 2: Run test to observe current behavior**
Run: `npm test src/components/layout/Navbar.test.tsx`

- [ ] **Step 3: Update `Navbar.tsx` for mobile ergonomics**
- Add `pt-[env(safe-area-inset-top)]`.
- Restyle with festival palette: border top `#D32020`, background `#FFFDF7/95`, borders `#2A1610/15`.
- Ensure all interactive buttons (Menu, Language, Anthem) have minimum 48px × 48px touch target area.
- Enhance drawer with festival styling and complete quick navigation links.

- [ ] **Step 4: Run test to verify it passes**
Run: `npm test src/components/layout/Navbar.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add src/components/layout/Navbar.tsx src/components/layout/Navbar.test.tsx
git commit -m "feat(header): optimize sticky header and mobile drawer for safe areas"
```

---

### Task 4: Hero Section & Stats Ribbon Mobile Overhaul

**Files:**
- Modify: `src/components/home/HeroSection.tsx:1-240`
- Modify: `src/components/home/StatsRibbon.tsx:1-80`
- Test: `src/components/home/HeroSection.test.tsx`

**Interfaces:**
- Consumes: Language context, Anthem open callback
- Produces: Mobile-first Hero with festival colors, fluid type (`clamp`), 2×2 stats touch grid, and stacked thumb CTAs.

- [ ] **Step 1: Write test for Hero fluid headings and 2×2 stats grid**
Update `src/components/home/HeroSection.test.tsx` to verify mobile stats rendering and CTA links.

- [ ] **Step 2: Run test to verify current state**
Run: `npm test src/components/home/HeroSection.test.tsx`

- [ ] **Step 3: Update `HeroSection.tsx` and `StatsRibbon.tsx`**
- Replace legacy colors with `#D32020` (Vermilion), `#F5A623` (Ochre), `#FDF7EB` (Parchment), and `#2A1610` (Umber).
- Ensure mobile headline uses `clamp(2rem, 8.5vw, 3.25rem)` with `line-height: 1.35` in Malayalam.
- Turn Stats Ribbon into a 2×2 grid on screens < 640px, each cell with rounded borders and warm shadow.
- Stack CTAs on mobile (`w-full sm:w-auto`, min-h-[48px]).

- [ ] **Step 4: Run test to verify it passes**
Run: `npm test src/components/home/HeroSection.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add src/components/home/HeroSection.tsx src/components/home/StatsRibbon.tsx src/components/home/HeroSection.test.tsx
git commit -m "feat(hero): mobile-first editorial hero and 2x2 stats ribbon"
```

---

### Task 5: Mobile Editorial Sections (About, Programs, Events, News)

**Files:**
- Modify: `src/components/sections/AboutSection.tsx`
- Modify: `src/components/sections/WhatWeDoSection.tsx`
- Modify: `src/components/sections/EventsSection.tsx`
- Modify: `src/pages/HomePage.tsx:31-155`
- Test: `src/components/sections/AboutSection.test.tsx`
- Test: `src/components/sections/WhatWeDoSection.test.tsx`
- Test: `src/components/sections/EventsSection.test.tsx`

**Interfaces:**
- Consumes: verifiedNews data, organizationData, translations
- Produces: Touch-friendly cards, horizontal swipeable filters, and zero horizontal page overflow.

- [ ] **Step 1: Run existing section tests to verify baseline**
Run: `npm test src/components/sections/`

- [ ] **Step 2: Update `WhatWeDoSection.tsx` for mobile magazine cards**
- Set full width image headers (4:3 aspect ratio), gold badge overlays (`#F5A623`).
- Single-column cards on mobile, 48px touch links.
- Apply Malayalam line height `1.7` across summary and highlight items.

- [ ] **Step 3: Update `EventsSection.tsx` with horizontal swipe filter**
- Ensure category filter bar scrolls horizontally smoothly with `overflow-x-auto no-scrollbar py-2`.
- Minimum 44px–48px touch targets for each category pill.
- Prominent 2026 District Conference card in `#2A1610` Umber with festival red badge.

- [ ] **Step 4: Update `HomePage.tsx` News & Membership Banners**
- Restyle lead story with responsive 16:10 aspect ratio and festival tag.
- Secondary stories stack cleanly with generous tap padding.
- Join movement banner adapts to single column on mobile with stacked action buttons.

- [ ] **Step 5: Run tests across sections**
Run: `npm test`
Expected: ALL PASS

- [ ] **Step 6: Commit**
```bash
git add src/components/sections/WhatWeDoSection.tsx src/components/sections/EventsSection.tsx src/pages/HomePage.tsx
git commit -m "feat(sections): mobile editorial magazine cards and swipeable event filters"
```

---

### Task 6: Dedicated Mobile "Find My Photos" Flow & Lightbox

**Files:**
- Modify: `src/components/common/FindMyPhotos.tsx`
- Modify: `src/components/conference/LightboxModal.tsx`
- Modify: `src/pages/MediaPage.tsx`
- Test: `src/components/common/FindMyPhotos.test.tsx` (Create)

**Interfaces:**
- Consumes: HTML5 file input with `capture="user"`, native Web Share API
- Produces: Self-contained camera capture, probabilistic match display, and touch-swipeable lightbox.

- [ ] **Step 1: Write test for Find My Photos camera upload and privacy disclosure**
Create `src/components/common/FindMyPhotos.test.tsx`:
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider } from '../../context/LanguageContext';
import { FindMyPhotos } from './FindMyPhotos';

describe('FindMyPhotos', () => {
  it('renders privacy notice and native camera trigger', () => {
    render(
      <LanguageProvider>
        <FindMyPhotos />
      </LanguageProvider>
    );
    expect(screen.getByText(/client-side|ഉപകരണത്തിൽ/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /camera|സെൽഫി|selfie/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify initial failure / missing assertions**
Run: `npm test src/components/common/FindMyPhotos.test.tsx`

- [ ] **Step 3: Enhance `FindMyPhotos.tsx`**
- Add native mobile front camera capture `<input type="file" accept="image/*" capture="user">`.
- Render explicit privacy commitment card: "100% Client-Side. No selfies uploaded. No biometric templates stored."
- Results header: "POSSIBLE MATCHES // സാധ്യതയുള്ള ചിത്രങ്ങൾ".
- Touch-friendly 2-column mobile photo grid with click-to-lightbox.
- Connect to full-screen mobile swipe lightbox with Web Share API (`navigator.share`).

- [ ] **Step 4: Run test to verify it passes**
Run: `npm test src/components/common/FindMyPhotos.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add src/components/common/FindMyPhotos.tsx src/components/common/FindMyPhotos.test.tsx src/components/conference/LightboxModal.tsx src/pages/MediaPage.tsx
git commit -m "feat(photos): mobile-first camera capture, privacy card and touch lightbox"
```

---

### Task 7: Viewport Verification & End-to-End Build

**Files:**
- Modify: Any files needing polish after verification
- Test: Full Vitest test suite (`npm test`) and production build (`npm run build`)

- [ ] **Step 1: Run full test suite**
Run: `npm test`
Expected: All tests PASS.

- [ ] **Step 2: Run production build**
Run: `npm run build`
Expected: Clean build with 0 TypeScript and 0 bundler errors.

- [ ] **Step 3: Verify running dev server across mobile viewports via Playwright**
Inspect `http://127.0.0.1:5173/` at 360×800, 390×844, and 430×932 using `mcp__playwright__browser_navigate`, `mcp__playwright__browser_resize`, and `mcp__playwright__browser_take_screenshot`. Verify:
- No horizontal scrollbar (`document.documentElement.scrollWidth <= window.innerWidth`).
- Bottom navigation renders and navigates to `/programs`, `/media`, `/news`.
- Language toggle switches text cleanly.

- [ ] **Step 4: Final commit on feature branch**
```bash
git add -A
git commit -m "feat(mobile): complete mobile-first redesign with festival theme and bottom nav"
```
