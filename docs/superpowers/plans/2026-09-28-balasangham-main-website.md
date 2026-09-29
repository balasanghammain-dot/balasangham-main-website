# Balasangham Main Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Build the official, responsive, WCAG 2.2 AA compliant bilingual (English & Malayalam) single-page web application for Balasangham covering its 4 foundational pillars, grounded in historical facts and the stage backdrop design aesthetic.

**Architecture:** A lightweight single-page application built with Vite + React 18 + TypeScript + Tailwind CSS. The app features a client-side i18n localization store with `localStorage` persistence, custom SVG vector motifs (Emblem, Red Star, White Dove, Backdrop Arc, Silhouettes), modular section components with smooth scroll anchor navigation, an interactive Flag Song anthem module, and filterable tabs for activities/events.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, Lucide React, Vitest, `@testing-library/react`, `@testing-library/jest-dom`, jsdom.

**Spec:** `docs/BALASANGHAM_MAIN_WEBSITE_SPEC.md` and `docs/MAIN_WEBSITE_BUILD_PROMPT.md`

## Global Constraints
- Primary Brand Red: `#D32F2F` (hover `#B71C1C`).
- Sunburst Golden Yellow: `#FBC02D`, Radiant Amber: `#F57F17`.
- Azure Sky Blue: `#1976D2`, Meadow Green: `#388E3C`.
- Shubhra White: `#FFFFFF`, Charcoal Slate: `#121826`, Warm Cream Surface: `#FFFDF7`.
- Google Fonts: `'Gayathri'` (700) and `'Manjari'` (400, 700) for Malayalam; `'Plus Jakarta Sans'` / `'Inter'` for English.
- Malayalam Rendering Rule: `line-height: 1.65` or greater on all Malayalam text blocks to prevent conjunct clipping (കൂട്ടക്ഷരങ്ങൾ, ചന്ദ്രക്കല, വള്ളികൾ).
- Bilingual Engine: Toggle between `EN` and `മലയാളം`, default English on first visit, persist selection in `localStorage`. Zero English leaks when Malayalam is active.
- Verified Authenticity: Strictly use verified historical dates (Foundation: December 28, 1938 at Kalliasseri, Kannur; Reconstitution: December 28, 1980; Pioneers: P. Krishna Pillai, A.K. Gopalan, E.M.S. Namboodiripad, K.P.R. Gopalan, E.K. Nayanar).
- Accessibility: WCAG 2.2 AA compliant, minimum touch target 44px, semantic HTML elements.

## Review Focus
1. **Malayalam Conjunct Typography & Clipping**: Test that Malayalam text elements render with `line-height >= 1.65` and do not clip descenders/ascenders across headings and body paragraphs.
2. **Language Switching & Persistence**: Test that toggling language updates all UI strings across all 4 pillars and persists to `localStorage`, with graceful fallback to English when no preference exists.
3. **Modal & Drawer Focus Trapping & Accessibility**: Test that the Flag Song anthem modal and mobile navigation menu manage ARIA attributes (`aria-expanded`, `aria-label`, `role="dialog"`), close on `Escape`, and prevent background scroll.
4. **Responsive Layout at Narrow Mobile (360px)**: Test that grid containers, stat counters, and navigation break down cleanly without causing horizontal body overflow (`overflow-x: hidden`).
5. **Strict Content Authenticity**: Verify that all historic dates, pioneer names, statistics (1M+ members, 20K+ units), and anthem lyrics precisely match `docs/BALASANGHAM_MAIN_WEBSITE_SPEC.md`.

---

### Task 1: Project Scaffolding & Testing Infrastructure

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `index.html`
- Create: `src/index.css`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/test/setup.ts`
- Test: `src/App.test.tsx`

**Interfaces:**
- Consumes: Node.js, npm
- Produces: Runnable Vite React TS app with Tailwind CSS and Vitest test runner.

- [x] **Step 1: Create package.json and configuration files**

```json
{
  "name": "balasangham-website",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "lucide-react": "^1.16.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.2.0",
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "jsdom": "^26.0.0",
    "postcss": "^8.5.1",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.7.3",
    "vite": "^6.0.11",
    "vitest": "^3.0.4"
  }
}
```

- [x] **Step 2: Create Vite, Tailwind, PostCSS, and TypeScript configs**

Write `vite.config.ts`:
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
});
```

Write `src/test/setup.ts`:
```typescript
import '@testing-library/jest-dom';
```

Write `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-red': '#D32F2F',
        'brand-red-dark': '#B71C1C',
        'sun-yellow': '#FBC02D',
        'amber-gold': '#F57F17',
        'sky-blue': '#1976D2',
        'meadow-green': '#388E3C',
        'surface-cream': '#FFFDF7',
        'charcoal': '#121826',
        'slate-muted': '#4B5563',
      },
      fontFamily: {
        malayalam: ['Gayathri', 'Manjari', 'sans-serif'],
        'malayalam-body': ['Manjari', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

Write `postcss.config.js`:
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

Write `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": false,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src", "vite.config.ts"]
}
```

Write `index.html`:
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/star-emblem.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Balasangham (ബാലസംഘം) - Official Website</title>
    <!-- Google Fonts for English and Malayalam -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Gayathri:wght@700&family=Inter:wght@400;500;600;700&family=Manjari:wght@400;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
  </head>
  <body class="bg-surface-cream text-charcoal font-sans antialiased">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

Write `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  
  /* Critical Malayalam conjunct preservation */
  [lang="ml"], .font-malayalam, .font-malayalam-body {
    line-height: 1.7;
    font-feature-settings: "kern" 1;
  }
}
```

- [x] **Step 3: Write initial failing test**

Write `src/App.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import App from './App';

describe('App Scaffolding', () => {
  it('renders Balasangham title', () => {
    render(<App />);
    expect(screen.getByText(/Balasangham/i)).toBeInTheDocument();
  });
});
```

- [x] **Step 4: Install dependencies and run test to verify failure**

Run: `npm install && npx vitest run src/App.test.tsx`
Expected: FAIL because `App.tsx` does not exist yet.

- [x] **Step 5: Write minimal App.tsx and main.tsx to pass test**

Write `src/App.tsx`:
```typescript
import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-surface-cream text-charcoal">
      <header className="p-4 bg-brand-red text-white">
        <h1 className="text-2xl font-bold">Balasangham (ബാലസംഘം)</h1>
      </header>
    </div>
  );
}
```

Write `src/main.tsx`:
```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- [x] **Step 6: Run test to verify it passes**

Run: `npx vitest run src/App.test.tsx`
Expected: PASS

- [x] **Step 7: Build verification**

Run: `npm run build`
Expected: PASS

---

### Task 2: Type Definitions & Bilingual Content Store

**Files:**
- Create: `src/types/content.ts`
- Create: `src/i18n/translations.ts`
- Test: `src/i18n/translations.test.ts`

**Interfaces:**
- Consumes: Spec data (`docs/BALASANGHAM_MAIN_WEBSITE_SPEC.md`)
- Produces: `TranslationDictionary`, `Language` ('en' | 'ml'), typed content store for all 4 pillars, mottos, stats, and anthem.

- [x] **Step 1: Write the failing test for translations completeness**

Write `src/i18n/translations.test.ts`:
```typescript
import { describe, it, expect } from 'vitest';
import { translations } from './translations';

describe('Translations Store', () => {
  it('has both en and ml language entries with identical key structures', () => {
    expect(translations.en).toBeDefined();
    expect(translations.ml).toBeDefined();
    expect(translations.en.nav.about).toBe('What is Balasangham?');
    expect(translations.ml.nav.about).toBe('ആരാണ് ബാലസംഘം?');
  });

  it('contains verified historical facts and dates in both languages', () => {
    expect(translations.en.history.foundationDate).toContain('December 28, 1938');
    expect(translations.ml.history.foundationDate).toContain('1938 ഡിസംബർ 28');
    expect(translations.en.stats.membersCount).toBe('1,000,000+');
    expect(translations.en.stats.unitsCount).toBe('20,000+');
  });

  it('contains full official flag song lyrics in Malayalam and English poetic translation', () => {
    expect(translations.ml.anthem.lyrics).toContain('ഉണരുക ഉയരുക ശുഭ്രപതാകേ');
    expect(translations.en.anthem.lyrics).toContain('Awaken and arise, pure white banner');
  });
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/i18n/translations.test.ts`
Expected: FAIL ("Cannot find module './translations'")

- [x] **Step 3: Define TypeScript interfaces**

Write `src/types/content.ts`:
```typescript
export type Language = 'en' | 'ml';

export interface NavTranslations {
  about: string;
  whatWeDo: string;
  events: string;
  history: string;
  anthemButton: string;
  langSwitch: string;
}

export interface HeroTranslations {
  badge: string;
  headline: string;
  subheadline: string;
  exploreHistoryBtn: string;
  listenAnthemBtn: string;
}

export interface StatItem {
  value: string;
  label: string;
  subtext: string;
}

export interface ValueCard {
  id: string;
  iconName: string;
  title: string;
  description: string;
}

export interface GovernanceLevel {
  level: string;
  role: string;
  desc: string;
}

export interface InitiativeItem {
  id: string;
  badge: string;
  icon: string;
  title: string;
  summary: string;
  highlights: string[];
}

export interface EventItem {
  id: string;
  category: 'arts' | 'conferences' | 'jathas' | 'memorials';
  title: string;
  dateOrFreq: string;
  scope: string;
  description: string;
}

export interface PioneerItem {
  name: string;
  role: string;
  contribution: string;
}

export interface MilestoneItem {
  year: string;
  title: string;
  description: string;
}

export interface TranslationDictionary {
  nav: NavTranslations;
  hero: HeroTranslations;
  stats: {
    membersCount: string;
    membersLabel: string;
    unitsCount: string;
    unitsLabel: string;
    districtsCount: string;
    districtsLabel: string;
    legacyCount: string;
    legacyLabel: string;
  };
  about: {
    sectionTag: string;
    heading: string;
    intro: string;
    values: ValueCard[];
    governanceTitle: string;
    governanceSubtitle: string;
    governanceLevels: GovernanceLevel[];
  };
  whatWeDo: {
    sectionTag: string;
    heading: string;
    intro: string;
    initiatives: InitiativeItem[];
  };
  events: {
    sectionTag: string;
    heading: string;
    filterAll: string;
    filterArts: string;
    filterConferences: string;
    filterJathas: string;
    filterMemorials: string;
    items: EventItem[];
  };
  history: {
    sectionTag: string;
    heading: string;
    foundationDate: string;
    foundationPlace: string;
    genesisStory: string;
    pioneersTitle: string;
    pioneersSubtitle: string;
    pioneers: PioneerItem[];
    timelineTitle: string;
    milestones: MilestoneItem[];
  };
  anthem: {
    title: string;
    subtitle: string;
    badge: string;
    lyrics: string[];
    audioMockupPlay: string;
    audioMockupPause: string;
    durationLabel: string;
  };
  footer: {
    mottoMalayalam: string;
    mottoEnglish: string;
    solidarityNote: string;
    copyright: string;
  };
}
```

- [x] **Step 4: Implement translations in `src/i18n/translations.ts`**

Write `src/i18n/translations.ts` with complete and verified English and Malayalam dictionaries based on the spec. Ensure zero English leaks in the Malayalam branch and strict historical accuracy.

- [x] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/i18n/translations.test.ts`
Expected: PASS

---

### Task 3: Localization Context & Language Switcher

**Files:**
- Create: `src/context/LanguageContext.tsx`
- Create: `src/components/common/LanguageToggle.tsx`
- Test: `src/context/LanguageContext.test.tsx`
- Test: `src/components/common/LanguageToggle.test.tsx`

**Interfaces:**
- Consumes: `TranslationDictionary`, `Language` from `src/types/content.ts`
- Produces: `LanguageProvider`, `useLanguage()` hook with `{ language, setLanguage, t }`, and `<LanguageToggle />` component.

- [x] **Step 1: Write failing test for LanguageContext**

Write `src/context/LanguageContext.test.tsx`:
```typescript
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import React from 'react';
import { LanguageProvider, useLanguage } from './LanguageContext';

function TestConsumer() {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div>
      <span data-testid="current-lang">{language}</span>
      <span data-testid="nav-about">{t.nav.about}</span>
      <button onClick={() => setLanguage('ml')}>Switch ML</button>
      <button onClick={() => setLanguage('en')}>Switch EN</button>
    </div>
  );
}

describe('LanguageContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('defaults to English when localStorage is empty', () => {
    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    );
    expect(screen.getByTestId('current-lang').textContent).toBe('en');
    expect(screen.getByTestId('nav-about').textContent).toBe('What is Balasangham?');
  });

  it('switches to Malayalam and updates translations', () => {
    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    );
    act(() => {
      screen.getByText('Switch ML').click();
    });
    expect(screen.getByTestId('current-lang').textContent).toBe('ml');
    expect(screen.getByTestId('nav-about').textContent).toBe('ആരാണ് ബാലസംഘം?');
    expect(localStorage.getItem('balasangham_lang')).toBe('ml');
  });
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/context/LanguageContext.test.tsx`
Expected: FAIL

- [x] **Step 3: Implement `LanguageContext.tsx`**

Write `src/context/LanguageContext.tsx`:
```typescript
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, TranslationDictionary } from '../types/content';
import { translations } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: TranslationDictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'balasangham_lang';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'ml' || saved === 'en' ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLangState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ml' : 'en');
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t: translations[language],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
```

- [x] **Step 4: Implement and test `<LanguageToggle />`**

Write `src/components/common/LanguageToggle.tsx`:
```typescript
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const LanguageToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div 
      role="group" 
      aria-label="Language selection" 
      className={`inline-flex items-center rounded-full bg-slate-100 p-1 border border-slate-200 shadow-sm ${className}`}
    >
      <button
        type="button"
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        className={`px-3 py-1 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 min-h-[36px] min-w-[44px] ${
          language === 'en'
            ? 'bg-brand-red text-white shadow-sm'
            : 'text-slate-700 hover:text-brand-red'
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage('ml')}
        aria-pressed={language === 'ml'}
        className={`px-3 py-1 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 font-malayalam min-h-[36px] min-w-[54px] ${
          language === 'ml'
            ? 'bg-brand-red text-white shadow-sm'
            : 'text-slate-700 hover:text-brand-red'
        }`}
      >
        മലയാളം
      </button>
    </div>
  );
};
```

Write `src/components/common/LanguageToggle.test.tsx`:
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import { LanguageProvider } from '../../context/LanguageContext';
import { LanguageToggle } from './LanguageToggle';

describe('LanguageToggle Component', () => {
  it('renders both language buttons and updates aria-pressed', () => {
    render(
      <LanguageProvider>
        <LanguageToggle />
      </LanguageProvider>
    );

    const enBtn = screen.getByRole('button', { name: 'EN' });
    const mlBtn = screen.getByRole('button', { name: 'മലയാളം' });

    expect(enBtn).toHaveAttribute('aria-pressed', 'true');
    expect(mlBtn).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(mlBtn);
    expect(enBtn).toHaveAttribute('aria-pressed', 'false');
    expect(mlBtn).toHaveAttribute('aria-pressed', 'true');
  });
});
```

- [x] **Step 5: Run tests**

Run: `npx vitest run src/context/LanguageContext.test.tsx src/components/common/LanguageToggle.test.tsx`
Expected: PASS

---

### Task 4: Visual Motifs & Brand Components

**Files:**
- Create: `src/components/motifs/RedStarIcon.tsx`
- Create: `src/components/motifs/BalasanghamFlag.tsx`
- Create: `src/components/motifs/PeaceDove.tsx`
- Create: `src/components/motifs/BackdropSunburst.tsx`
- Create: `src/components/motifs/ChildrenSilhouettes.tsx`
- Test: `src/components/motifs/Motifs.test.tsx`

**Interfaces:**
- Consumes: SVG vector primitives, brand colors (`#D32F2F`, `#FBC02D`, `#F57F17`, `#FFFFFF`)
- Produces: Scalable, accessible SVG vector motifs matching design backdrop (`10x8new.jpg.jpeg`).

- [x] **Step 1: Write test for motifs**

Write `src/components/motifs/Motifs.test.tsx`:
```typescript
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import { RedStarIcon } from './RedStarIcon';
import { BalasanghamFlag } from './BalasanghamFlag';
import { PeaceDove } from './PeaceDove';
import { BackdropSunburst } from './BackdropSunburst';

describe('Brand Motifs', () => {
  it('renders RedStarIcon with proper fill color and accessibility title', () => {
    const { container } = render(<RedStarIcon className="w-8 h-8" title="Balasangham Red Star" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-label', 'Balasangham Red Star');
  });

  it('renders BalasanghamFlag with white rectangular body and central red star', () => {
    const { container } = render(<BalasanghamFlag className="w-12 h-8" />);
    const rect = container.querySelector('rect');
    const star = container.querySelector('polygon');
    expect(rect).toBeInTheDocument();
    expect(star).toBeInTheDocument();
  });

  it('renders PeaceDove and BackdropSunburst SVGs cleanly', () => {
    const { container: doveContainer } = render(<PeaceDove className="w-6 h-6" />);
    expect(doveContainer.querySelector('svg')).toBeInTheDocument();

    const { container: sunburstContainer } = render(<BackdropSunburst />);
    expect(sunburstContainer.querySelector('svg')).toBeInTheDocument();
  });
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/motifs/Motifs.test.tsx`
Expected: FAIL

- [x] **Step 3: Implement SVG motifs**

Write `src/components/motifs/RedStarIcon.tsx`:
```typescript
import React from 'react';

export const RedStarIcon: React.FC<{ className?: string; title?: string }> = ({
  className = 'w-6 h-6',
  title = 'Red Star',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-label={title}
    role="img"
    className={`text-brand-red inline-block drop-shadow-sm ${className}`}
  >
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);
```

Write `src/components/motifs/BalasanghamFlag.tsx`:
```typescript
import React from 'react';

export const BalasanghamFlag: React.FC<{ className?: string; title?: string }> = ({
  className = 'w-10 h-6',
  title = 'Balasangham Official Flag',
}) => (
  <svg
    viewBox="0 0 60 36"
    className={`inline-block rounded-sm shadow-sm border border-slate-300 overflow-hidden ${className}`}
    aria-label={title}
    role="img"
  >
    {/* Pure White Background (ശുഭ്രപതാക) */}
    <rect width="60" height="36" fill="#FFFFFF" />
    {/* Central Blood Red 5-Pointed Star (രക്തതാരം) */}
    <polygon
      points="30,8 33.5,15.5 41.5,16.5 35.5,22 37,30 30,26 23,30 24.5,22 18.5,16.5 26.5,15.5"
      fill="#D32F2F"
    />
  </svg>
);
```

Write `src/components/motifs/PeaceDove.tsx`:
```typescript
import React from 'react';

export const PeaceDove: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`inline-block ${className}`}
    aria-hidden="true"
  >
    <path d="M10 13c-2.5 0-5 2-7 1 0-3 2-6 5-8 1-0.7 2.5-1 4-1 2 0 4 1 5 3l4-2c0 2-1 4-2 5l3 2c-1 1-3 1-5 0l-2 3c-1.5 2-3 3-5 3-1 0-2-1-2-2 0-2 2-3 4-3z" />
    <circle cx="15" cy="7" r="1" fill="currentColor" />
  </svg>
);
```

Write `src/components/motifs/BackdropSunburst.tsx`:
```typescript
import React from 'react';

export const BackdropSunburst: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 1440 600"
    fill="none"
    preserveAspectRatio="none"
    className={`w-full h-full absolute inset-0 pointer-events-none opacity-40 mix-blend-screen ${className}`}
    aria-hidden="true"
  >
    <defs>
      <radialGradient id="sunGlow" cx="50%" cy="30%" r="60%">
        <stop offset="0%" stopColor="#FFF176" stopOpacity="0.8" />
        <stop offset="40%" stopColor="#FBC02D" stopOpacity="0.4" />
        <stop offset="70%" stopColor="#F57F17" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#D32F2F" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="1440" height="600" fill="url(#sunGlow)" />
    {/* Radiating solar celebration rays */}
    <g stroke="#FBC02D" strokeWidth="2" opacity="0.3">
      <line x1="720" y1="180" x2="0" y2="0" />
      <line x1="720" y1="180" x2="180" y2="0" />
      <line x1="720" y1="180" x2="360" y2="0" />
      <line x1="720" y1="180" x2="540" y2="0" />
      <line x1="720" y1="180" x2="900" y2="0" />
      <line x1="720" y1="180" x2="1080" y2="0" />
      <line x1="720" y1="180" x2="1260" y2="0" />
      <line x1="720" y1="180" x2="1440" y2="0" />
    </g>
  </svg>
);
```

Write `src/components/motifs/ChildrenSilhouettes.tsx`:
```typescript
import React from 'react';

export const ChildrenSilhouettes: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex justify-center items-end gap-3 text-white/90 ${className}`} aria-hidden="true">
    {/* Stylized joyful children figures with books, flags, and open arms */}
    <svg viewBox="0 0 400 120" className="w-full max-w-lg h-auto" fill="currentColor">
      {/* Child with flag */}
      <circle cx="60" cy="40" r="10" />
      <path d="M50,55 Q60,52 70,55 L75,90 L67,90 L65,115 L55,115 L53,90 L45,90 Z" />
      <line x1="72" y1="58" x2="95" y2="25" stroke="#FFFFFF" strokeWidth="3" />
      <polygon points="95,25 115,20 115,35 95,40" fill="#D32F2F" />
      {/* Child reading book */}
      <circle cx="140" cy="48" r="9" />
      <path d="M130,62 Q140,60 150,62 L152,95 L144,95 L143,115 L137,115 L136,95 L128,95 Z" />
      <path d="M125,70 L140,75 L155,70 L155,80 L140,85 L125,80 Z" fill="#FBC02D" />
      {/* Children holding hands in fraternity */}
      <circle cx="210" cy="42" r="10" />
      <path d="M200,56 Q210,54 220,56 L224,90 L216,90 L215,115 L205,115 L204,90 L196,90 Z" />
      <circle cx="270" cy="40" r="10" />
      <path d="M260,54 Q270,52 280,54 L284,90 L276,90 L275,115 L265,115 L264,90 L256,90 Z" />
      {/* Interlinked arms */}
      <path d="M218,65 Q245,78 262,63" stroke="currentColor" strokeWidth="4" fill="none" />
      {/* Child releasing dove */}
      <circle cx="340" cy="44" r="9" />
      <path d="M330,58 Q340,56 350,58 L353,92 L345,92 L344,115 L336,115 L335,92 L327,92 Z" />
      {/* Dove flying overhead */}
      <path d="M360,25 Q370,18 380,22 Q372,28 368,32 Q362,30 360,25 Z" fill="#FFFFFF" />
    </svg>
  </div>
);
```

- [x] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/motifs/Motifs.test.tsx`
Expected: PASS

---

### Task 5: Sticky Header Navigation & Quick Actions

**Files:**
- Create: `src/components/layout/Navbar.tsx`
- Test: `src/components/layout/Navbar.test.tsx`

**Interfaces:**
- Consumes: `useLanguage()` from `LanguageContext`, `BalasanghamFlag`, `RedStarIcon`, `LanguageToggle`
- Produces: Sticky navigation header with mobile hamburger drawer, desktop nav links, Flag Song modal trigger button (`onOpenAnthem`).

- [x] **Step 1: Write failing test for Navbar**

Write `src/components/layout/Navbar.test.tsx`:
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { LanguageProvider } from '../../context/LanguageContext';
import { Navbar } from './Navbar';

describe('Navbar Component', () => {
  it('renders brand identity and 4 anchor links in English by default', () => {
    render(
      <LanguageProvider>
        <Navbar onOpenAnthem={vi.fn()} />
      </LanguageProvider>
    );

    expect(screen.getByText('Balasangham')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'What is Balasangham?' })).toHaveAttribute('href', '#about');
    expect(screen.getByRole('link', { name: 'What We Do' })).toHaveAttribute('href', '#what-we-do');
    expect(screen.getByRole('link', { name: 'Events' })).toHaveAttribute('href', '#events');
    expect(screen.getByRole('link', { name: 'History' })).toHaveAttribute('href', '#history');
  });

  it('triggers onOpenAnthem when Anthem button is clicked', () => {
    const handleOpenAnthem = vi.fn();
    render(
      <LanguageProvider>
        <Navbar onOpenAnthem={handleOpenAnthem} />
      </LanguageProvider>
    );

    const anthemBtn = screen.getByRole('button', { name: /Flag Song|പതാകഗാനം/i });
    fireEvent.click(anthemBtn);
    expect(handleOpenAnthem).toHaveBeenCalledTimes(1);
  });

  it('toggles mobile menu on mobile hamburger click with accessible aria-expanded', () => {
    render(
      <LanguageProvider>
        <Navbar onOpenAnthem={vi.fn()} />
      </LanguageProvider>
    );

    const menuBtn = screen.getByRole('button', { name: /toggle navigation menu/i });
    expect(menuBtn).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(menuBtn);
    expect(menuBtn).toHaveAttribute('aria-expanded', 'true');
  });
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/layout/Navbar.test.tsx`
Expected: FAIL

- [x] **Step 3: Implement `Navbar.tsx`**

Write `src/components/layout/Navbar.tsx`:
```typescript
import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { BalasanghamFlag } from '../motifs/BalasanghamFlag';
import { LanguageToggle } from '../common/LanguageToggle';
import { Music, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenAnthem: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAnthem }) => {
  const { t, language } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#about', label: t.nav.about },
    { href: '#what-we-do', label: t.nav.whatWeDo },
    { href: '#events', label: t.nav.events },
    { href: '#history', label: t.nav.history },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand Name */}
          <a 
            href="#" 
            className="flex items-center gap-3 group focus:outline-hidden focus:ring-2 focus:ring-brand-red rounded-lg p-1"
          >
            <BalasanghamFlag className="w-10 h-6 sm:w-12 sm:h-7 transition-transform group-hover:scale-105" />
            <div className="flex flex-col">
              <span className={`text-lg sm:text-xl font-bold tracking-tight text-charcoal group-hover:text-brand-red transition-colors ${language === 'ml' ? 'font-malayalam' : ''}`}>
                {language === 'ml' ? 'ബാലസംഘം' : 'Balasangham'}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-widest -mt-1">
                {language === 'ml' ? 'കേരളം' : 'Kerala, India'}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold text-slate-700 hover:text-brand-red transition-colors py-1 border-b-2 border-transparent hover:border-brand-red ${
                  language === 'ml' ? 'font-malayalam text-base' : ''
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Action Items: Anthem & Language Toggle */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              type="button"
              onClick={onOpenAnthem}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-full bg-brand-red/10 text-brand-red hover:bg-brand-red hover:text-white transition-all duration-200 min-h-[40px] focus:outline-hidden focus:ring-2 focus:ring-brand-red"
            >
              <Music className="w-4 h-4" />
              <span className={language === 'ml' ? 'font-malayalam' : ''}>{t.nav.anthemButton}</span>
            </button>
            <LanguageToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <LanguageToggle className="scale-90" />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-lg text-slate-700 hover:text-brand-red hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-hidden focus:ring-2 focus:ring-brand-red"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-md text-base font-semibold text-slate-800 hover:bg-slate-100 hover:text-brand-red ${
                  language === 'ml' ? 'font-malayalam' : ''
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAnthem();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-brand-red text-white font-semibold text-sm shadow-xs"
            >
              <Music className="w-4 h-4" />
              <span className={language === 'ml' ? 'font-malayalam' : ''}>{t.nav.anthemButton}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
```

- [x] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/layout/Navbar.test.tsx`
Expected: PASS

---

### Task 6: Festive Hero Section & Quick Stats Ribbon

**Files:**
- Create: `src/components/home/HeroSection.tsx`
- Create: `src/components/home/StatsRibbon.tsx`
- Test: `src/components/home/HeroSection.test.tsx`

**Interfaces:**
- Consumes: `useLanguage()`, `BackdropSunburst`, `ChildrenSilhouettes`, `RedStarIcon`
- Produces: Festive stage backdrop hero unit with slogans, primary/secondary CTAs, and 4-stat ribbon.

- [x] **Step 1: Write failing test for HeroSection & StatsRibbon**

Write `src/components/home/HeroSection.test.tsx`:
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { LanguageProvider } from '../../context/LanguageContext';
import { HeroSection } from './HeroSection';

describe('HeroSection Component', () => {
  it('renders hero headline, subtitle, and primary actions', () => {
    const handleOpenAnthem = vi.fn();
    render(
      <LanguageProvider>
        <HeroSection onOpenAnthem={handleOpenAnthem} />
      </LanguageProvider>
    );

    expect(screen.getByText(/Study, Contemplate, Act/i)).toBeInTheDocument();
    expect(screen.getByText('1,000,000+')).toBeInTheDocument();
    expect(screen.getByText('20,000+')).toBeInTheDocument();
    expect(screen.getByText('14')).toBeInTheDocument();

    const anthemCta = screen.getByRole('button', { name: /Listen to Flag Song|പതാകഗാനം കേൾക്കുക/i });
    fireEvent.click(anthemCta);
    expect(handleOpenAnthem).toHaveBeenCalledTimes(1);
  });
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/home/HeroSection.test.tsx`
Expected: FAIL

- [x] **Step 3: Implement `StatsRibbon.tsx`**

Write `src/components/home/StatsRibbon.tsx`:
```typescript
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Users, Landmark, MapPin, Sparkles } from 'lucide-react';

export const StatsRibbon: React.FC = () => {
  const { t, language } = useLanguage();

  const stats = [
    {
      value: t.stats.membersCount,
      label: t.stats.membersLabel,
      icon: Users,
      color: 'text-amber-gold',
    },
    {
      value: t.stats.unitsCount,
      label: t.stats.unitsLabel,
      icon: Landmark,
      color: 'text-brand-red',
    },
    {
      value: t.stats.districtsCount,
      label: t.stats.districtsLabel,
      icon: MapPin,
      color: 'text-sky-blue',
    },
    {
      value: t.stats.legacyCount,
      label: t.stats.legacyLabel,
      icon: Sparkles,
      color: 'text-meadow-green',
    },
  ];

  return (
    <div className="relative -mt-10 sm:-mt-14 z-20 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="bg-white rounded-2xl shadow-xl border border-amber-100 p-6 sm:p-8 backdrop-blur-md">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx} 
                className={`flex flex-col items-center text-center ${idx !== 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''}`}
              >
                <div className={`p-2.5 rounded-full bg-slate-50 mb-3 ${stat.color}`}>
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-charcoal">
                  {stat.value}
                </div>
                <div className={`text-xs sm:text-sm font-semibold text-slate-600 mt-1 ${language === 'ml' ? 'font-malayalam' : ''}`}>
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
```

- [x] **Step 4: Implement `HeroSection.tsx`**

Write `src/components/home/HeroSection.tsx`:
```typescript
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { BackdropSunburst } from '../motifs/BackdropSunburst';
import { ChildrenSilhouettes } from '../motifs/ChildrenSilhouettes';
import { RedStarIcon } from '../motifs/RedStarIcon';
import { StatsRibbon } from './StatsRibbon';
import { Music, ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  onOpenAnthem: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAnthem }) => {
  const { t, language } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FBC02D] via-[#F57F17] to-[#D32F2F] text-white pt-16 sm:pt-24 pb-20 sm:pb-28">
      {/* Sunburst Stage Arc Backdrop */}
      <BackdropSunburst />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs sm:text-sm font-bold uppercase tracking-wider mb-6 shadow-sm">
          <RedStarIcon className="w-4 h-4 text-white drop-shadow" />
          <span className={language === 'ml' ? 'font-malayalam' : ''}>{t.hero.badge}</span>
        </div>

        {/* Primary Celebratory Slogan */}
        <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-md leading-tight sm:leading-tight mb-4 ${
          language === 'ml' ? 'font-malayalam' : ''
        }`}>
          {t.hero.headline}
        </h1>

        {/* Sub-headline */}
        <p className={`text-base sm:text-xl lg:text-2xl text-amber-100 max-w-3xl mx-auto font-medium mb-8 sm:mb-10 drop-shadow-xs leading-relaxed ${
          language === 'ml' ? 'font-malayalam-body' : ''
        }`}>
          {t.hero.subheadline}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 sm:mb-16">
          <a
            href="#about"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-brand-red font-bold text-sm sm:text-base shadow-lg hover:bg-amber-50 hover:shadow-xl transition-all duration-200 min-h-[48px]"
          >
            <span className={language === 'ml' ? 'font-malayalam' : ''}>{t.hero.exploreHistoryBtn}</span>
            <ArrowDown className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={onOpenAnthem}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-brand-red-dark/80 text-white font-bold text-sm sm:text-base border border-white/30 shadow-lg hover:bg-brand-red-dark transition-all duration-200 min-h-[48px]"
          >
            <Music className="w-4 h-4 text-sun-yellow" />
            <span className={language === 'ml' ? 'font-malayalam' : ''}>{t.hero.listenAnthemBtn}</span>
          </button>
        </div>

        {/* Silhouettes of Joyful Children */}
        <ChildrenSilhouettes className="mt-4" />
      </div>

      {/* Stats Counter Ribbon */}
      <StatsRibbon />
    </section>
  );
};
```

- [x] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/components/home/HeroSection.test.tsx`
Expected: PASS

---

### Task 7: Pillar 1: "What is Balasangham?" Component

**Files:**
- Create: `src/components/sections/AboutSection.tsx`
- Create: `src/components/sections/GovernanceDiagram.tsx`
- Test: `src/components/sections/AboutSection.test.tsx`

**Interfaces:**
- Consumes: `useLanguage()`, `ValueCard`, `GovernanceLevel` from `LanguageContext`
- Produces: Complete Pillar 1 view with 4 foundational values cards and democratic child-led hierarchy.

- [x] **Step 1: Write failing test for AboutSection**

Write `src/components/sections/AboutSection.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import { LanguageProvider } from '../../context/LanguageContext';
import { AboutSection } from './AboutSection';

describe('AboutSection Component (Pillar 1)', () => {
  it('renders section heading and the 4 foundational core values cards', () => {
    render(
      <LanguageProvider>
        <AboutSection />
      </LanguageProvider>
    );

    expect(screen.getByRole('heading', { level: 2, name: /What is Balasangham\?|ആരാണ് ബാലസംഘം\?/i })).toBeInTheDocument();
    expect(screen.getByText(/Childhood Democracy|കുട്ടികളുടെ നേതൃത്വം/i)).toBeInTheDocument();
    expect(screen.getByText(/Secular & Universal Fraternity|മതേതര സൗഹൃദം/i)).toBeInTheDocument();
    expect(screen.getByText(/Scientific Inquiry & Rationality|ശാസ്ത്രബോധം/i)).toBeInTheDocument();
    expect(screen.getByText(/Defense of Child Rights|അവകാശ പോരാട്ടം/i)).toBeInTheDocument();
  });

  it('renders child-led democratic governance hierarchy levels', () => {
    render(
      <LanguageProvider>
        <AboutSection />
      </LanguageProvider>
    );

    expect(screen.getByText(/Unit Committee|യൂണിറ്റ് സമിതി/i)).toBeInTheDocument();
    expect(screen.getByText(/District Committee|ജില്ലാ സമിതി/i)).toBeInTheDocument();
    expect(screen.getByText(/State Committee|സംസ്ഥാന സമിതി/i)).toBeInTheDocument();
  });
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/sections/AboutSection.test.tsx`
Expected: FAIL

- [x] **Step 3: Implement `GovernanceDiagram.tsx`**

Write `src/components/sections/GovernanceDiagram.tsx`:
```typescript
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ChevronRight } from 'lucide-react';

export const GovernanceDiagram: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="mt-16 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm">
      <div className="max-w-3xl mb-8">
        <h3 className={`text-xl sm:text-2xl font-bold text-charcoal ${language === 'ml' ? 'font-malayalam' : ''}`}>
          {t.about.governanceTitle}
        </h3>
        <p className={`text-sm sm:text-base text-slate-600 mt-2 ${language === 'ml' ? 'font-malayalam-body' : ''}`}>
          {t.about.governanceSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
        {t.about.governanceLevels.map((lvl, index) => (
          <div
            key={index}
            className="flex flex-col p-4 rounded-xl bg-slate-50 border border-slate-200/60 hover:border-brand-red/40 hover:bg-red-50/20 transition-all duration-200 relative group"
          >
            <div className="text-xs font-bold text-brand-red uppercase tracking-wider mb-1">
              Step 0{index + 1}
            </div>
            <div className={`text-base font-bold text-charcoal mb-1 ${language === 'ml' ? 'font-malayalam' : ''}`}>
              {lvl.level}
            </div>
            <div className="text-xs font-semibold text-slate-500 mb-2">
              {lvl.role}
            </div>
            <p className={`text-xs text-slate-600 leading-relaxed ${language === 'ml' ? 'font-malayalam-body' : ''}`}>
              {lvl.desc}
            </p>
            {index < t.about.governanceLevels.length - 1 && (
              <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white border border-slate-200 items-center justify-center text-slate-400 group-hover:text-brand-red">
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
```

- [x] **Step 4: Implement `AboutSection.tsx`**

Write `src/components/sections/AboutSection.tsx`:
```typescript
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { GovernanceDiagram } from './GovernanceDiagram';
import { Vote, HeartHandshake, Compass, ShieldCheck } from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Vote,
  HeartHandshake,
  Compass,
  ShieldCheck,
};

export const AboutSection: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section id="about" className="py-20 sm:py-28 bg-surface-cream scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-red mb-2 block">
            {t.about.sectionTag}
          </span>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight mb-4 ${
            language === 'ml' ? 'font-malayalam' : ''
          }`}>
            {t.about.heading}
          </h2>
          <p className={`text-base sm:text-lg text-slate-600 leading-relaxed ${
            language === 'ml' ? 'font-malayalam-body' : ''
          }`}>
            {t.about.intro}
          </p>
        </div>

        {/* 4 Core Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {t.about.values.map((val) => {
            const Icon = iconMap[val.iconName] || Vote;
            return (
              <div
                key={val.id}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className={`text-lg sm:text-xl font-bold text-charcoal mb-3 ${
                  language === 'ml' ? 'font-malayalam' : ''
                }`}>
                  {val.title}
                </h3>
                <p className={`text-sm text-slate-600 leading-relaxed ${
                  language === 'ml' ? 'font-malayalam-body' : ''
                }`}>
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Democratic Child Governance Model */}
        <GovernanceDiagram />
      </div>
    </section>
  );
};
```

- [x] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/components/sections/AboutSection.test.tsx`
Expected: PASS

---

### Task 8: Pillar 2: "What We Do" Signature Initiatives Grid

**Files:**
- Create: `src/components/sections/WhatWeDoSection.tsx`
- Test: `src/components/sections/WhatWeDoSection.test.tsx`

**Interfaces:**
- Consumes: `useLanguage()`, `InitiativeItem` from `translations`
- Produces: 6-card interactive grid for Venalthumbikal, Venal Kalari, Kilikkoodu, Shasthra Deepthi, Kutti Koottams, and Anti-Drug campaigns.

- [x] **Step 1: Write failing test for WhatWeDoSection**

Write `src/components/sections/WhatWeDoSection.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import { LanguageProvider } from '../../context/LanguageContext';
import { WhatWeDoSection } from './WhatWeDoSection';

describe('WhatWeDoSection Component (Pillar 2)', () => {
  it('renders all 6 signature initiatives', () => {
    render(
      <LanguageProvider>
        <WhatWeDoSection />
      </LanguageProvider>
    );

    expect(screen.getByRole('heading', { level: 2, name: /What They Do|പ്രവർത്തനങ്ങൾ/i })).toBeInTheDocument();
    expect(screen.getByText(/Venalthumbikal|വേനൽത്തുമ്പികൾ/i)).toBeInTheDocument();
    expect(screen.getByText(/Venal Kalari|വേനൽ കളരി/i)).toBeInTheDocument();
    expect(screen.getByText(/Kilikkoodu|കിളിക്കൂട്/i)).toBeInTheDocument();
    expect(screen.getByText(/Shasthra Deepthi|ശാസ്ത്ര ദീപ്തി/i)).toBeInTheDocument();
    expect(screen.getByText(/Kutti Koottams|കുട്ടിക്കൂട്ടങ്ങൾ/i)).toBeInTheDocument();
    expect(screen.getByText(/Anti-Drug|ലഹരിവിരുദ്ധ/i)).toBeInTheDocument();
  });
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/sections/WhatWeDoSection.test.tsx`
Expected: FAIL

- [x] **Step 3: Implement `WhatWeDoSection.tsx`**

Write `src/components/sections/WhatWeDoSection.tsx`:
```typescript
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Drama, Tent, BookOpen, Microscope, Users, ShieldAlert, CheckCircle2 } from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Drama,
  Tent,
  BookOpen,
  Microscope,
  Users,
  ShieldAlert,
};

export const WhatWeDoSection: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section id="what-we-do" className="py-20 sm:py-28 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-red mb-2 block">
            {t.whatWeDo.sectionTag}
          </span>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight mb-4 ${
            language === 'ml' ? 'font-malayalam' : ''
          }`}>
            {t.whatWeDo.heading}
          </h2>
          <p className={`text-base sm:text-lg text-slate-600 leading-relaxed ${
            language === 'ml' ? 'font-malayalam-body' : ''
          }`}>
            {t.whatWeDo.intro}
          </p>
        </div>

        {/* 6 Signature Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.whatWeDo.initiatives.map((item) => {
            const Icon = iconMap[item.icon] || Drama;
            return (
              <div
                key={item.id}
                className="bg-surface-cream rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-amber-400/50 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-gold flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-red group-hover:text-white transition-all duration-300">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className={`text-xl font-bold text-charcoal mb-3 ${
                    language === 'ml' ? 'font-malayalam' : ''
                  }`}>
                    {item.title}
                  </h3>

                  <p className={`text-sm text-slate-600 leading-relaxed mb-6 ${
                    language === 'ml' ? 'font-malayalam-body' : ''
                  }`}>
                    {item.summary}
                  </p>
                </div>

                {/* Key Program Highlights */}
                <div className="pt-4 border-t border-slate-200/60 space-y-2">
                  {item.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs font-medium text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-meadow-green shrink-0 mt-0.5" />
                      <span className={language === 'ml' ? 'font-malayalam-body' : ''}>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
```

- [x] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/sections/WhatWeDoSection.test.tsx`
Expected: PASS

---

### Task 9: Pillar 3: "Events Conducted" Component

**Files:**
- Create: `src/components/sections/EventsSection.tsx`
- Test: `src/components/sections/EventsSection.test.tsx`

**Interfaces:**
- Consumes: `useLanguage()`, `EventItem` from `translations`
- Produces: Filterable events showcase by category (`all`, `arts`, `conferences`, `jathas`, `memorials`).

- [x] **Step 1: Write failing test for EventsSection**

Write `src/components/sections/EventsSection.test.tsx`:
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import { LanguageProvider } from '../../context/LanguageContext';
import { EventsSection } from './EventsSection';

describe('EventsSection Component (Pillar 3)', () => {
  it('renders section title and filters items based on selected tab', () => {
    render(
      <LanguageProvider>
        <EventsSection />
      </LanguageProvider>
    );

    expect(screen.getByRole('heading', { level: 2, name: /Events Conducted|മേളകളും പരിപാടികളും/i })).toBeInTheDocument();
    expect(screen.getByText(/Bala Kalolsavam|ബാല കലോത്സവം/i)).toBeInTheDocument();

    const memorialFilter = screen.getByRole('button', { name: /Memorial|സ്മരണാ/i });
    fireEvent.click(memorialFilter);

    expect(screen.getByText(/Hiroshima & Nagasaki|ഹിരോഷിമ - നാഗസാക്കി/i)).toBeInTheDocument();
  });
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/sections/EventsSection.test.tsx`
Expected: FAIL

- [x] **Step 3: Implement `EventsSection.tsx`**

Write `src/components/sections/EventsSection.tsx`:
```typescript
import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Calendar, MapPin, Sparkles, Filter } from 'lucide-react';

export const EventsSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filterTabs = [
    { id: 'all', label: t.events.filterAll },
    { id: 'arts', label: t.events.filterArts },
    { id: 'conferences', label: t.events.filterConferences },
    { id: 'jathas', label: t.events.filterJathas },
    { id: 'memorials', label: t.events.filterMemorials },
  ];

  const filteredItems = activeCategory === 'all'
    ? t.events.items
    : t.events.items.filter((item) => item.category === activeCategory);

  return (
    <section id="events" className="py-20 sm:py-28 bg-surface-cream scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-red mb-2 block">
            {t.events.sectionTag}
          </span>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight mb-4 ${
            language === 'ml' ? 'font-malayalam' : ''
          }`}>
            {t.events.heading}
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCategory(tab.id)}
              aria-pressed={activeCategory === tab.id}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 min-h-[40px] focus:outline-hidden focus:ring-2 focus:ring-brand-red ${
                activeCategory === tab.id
                  ? 'bg-brand-red text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              } ${language === 'ml' ? 'font-malayalam' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-brand-red mb-3">
                  <span className="inline-flex items-center gap-1.5 bg-red-50 px-2.5 py-1 rounded-full">
                    <Calendar className="w-3.5 h-3.5" />
                    {event.dateOrFreq}
                  </span>
                  <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
                    <MapPin className="w-3.5 h-3.5" />
                    {event.scope}
                  </span>
                </div>

                <h3 className={`text-xl font-bold text-charcoal mb-3 ${
                  language === 'ml' ? 'font-malayalam' : ''
                }`}>
                  {event.title}
                </h3>

                <p className={`text-sm text-slate-600 leading-relaxed mb-6 ${
                  language === 'ml' ? 'font-malayalam-body' : ''
                }`}>
                  {event.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-amber-600">
                <Sparkles className="w-4 h-4 text-sun-yellow" />
                <span>Balasangham Official Event</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
```

- [x] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/sections/EventsSection.test.tsx`
Expected: PASS

---

### Task 10: Pillar 4: "History & Heritage" Component

**Files:**
- Create: `src/components/sections/HistorySection.tsx`
- Create: `src/components/sections/PioneersGallery.tsx`
- Create: `src/components/sections/MilestoneTimeline.tsx`
- Test: `src/components/sections/HistorySection.test.tsx`

**Interfaces:**
- Consumes: `useLanguage()`, `PioneerItem`, `MilestoneItem` from `translations`
- Produces: Complete Pillar 4 view: 1938 Kalliasseri story, Pioneer cards (Krishna Pillai, AKG, EMS, KPR, Nayanar), 1980 Reconstitution, and Milestone Timeline.

- [x] **Step 1: Write failing test for HistorySection**

Write `src/components/sections/HistorySection.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import { LanguageProvider } from '../../context/LanguageContext';
import { HistorySection } from './HistorySection';

describe('HistorySection Component (Pillar 4)', () => {
  it('renders historic 1938 Kalliasseri genesis and pioneers gallery', () => {
    render(
      <LanguageProvider>
        <HistorySection />
      </LanguageProvider>
    );

    expect(screen.getByRole('heading', { level: 2, name: /History & Heritage|ചരിത്രവും നാൾവഴികളും/i })).toBeInTheDocument();
    expect(screen.getByText(/Kalliasseri|കല്ല്യാശ്ശേരി/i)).toBeInTheDocument();
    expect(screen.getByText(/P. Krishna Pillai|പി. കൃഷ്ണപിള്ള/i)).toBeInTheDocument();
    expect(screen.getByText(/A.K. Gopalan|എ.കെ. ജി/i)).toBeInTheDocument();
    expect(screen.getByText(/E.M.S. Namboodiripad|ഇ.എം.എസ്/i)).toBeInTheDocument();
  });

  it('renders chronological timeline milestones', () => {
    render(
      <LanguageProvider>
        <HistorySection />
      </LanguageProvider>
    );

    expect(screen.getByText('1938')).toBeInTheDocument();
    expect(screen.getByText('1980')).toBeInTheDocument();
    expect(screen.getByText('1990')).toBeInTheDocument();
  });
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/sections/HistorySection.test.tsx`
Expected: FAIL

- [x] **Step 3: Implement `PioneersGallery.tsx` and `MilestoneTimeline.tsx`**

Write `src/components/sections/PioneersGallery.tsx`:
```typescript
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Star } from 'lucide-react';

export const PioneersGallery: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="mb-20">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h3 className={`text-2xl sm:text-3xl font-bold text-charcoal mb-2 ${
          language === 'ml' ? 'font-malayalam' : ''
        }`}>
          {t.history.pioneersTitle}
        </h3>
        <p className={`text-sm sm:text-base text-slate-600 ${
          language === 'ml' ? 'font-malayalam-body' : ''
        }`}>
          {t.history.pioneersSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {t.history.pioneers.map((pioneer, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-brand-red/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-red-50 text-brand-red flex items-center justify-center mb-3">
                <Star className="w-5 h-5 fill-brand-red" />
              </div>
              <h4 className={`text-base font-bold text-charcoal mb-1 ${
                language === 'ml' ? 'font-malayalam' : ''
              }`}>
                {pioneer.name}
              </h4>
              <p className="text-xs font-semibold text-brand-red mb-2">
                {pioneer.role}
              </p>
            </div>
            <p className={`text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100 ${
              language === 'ml' ? 'font-malayalam-body' : ''
            }`}>
              {pioneer.contribution}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
```

Write `src/components/sections/MilestoneTimeline.tsx`:
```typescript
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const MilestoneTimeline: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200/90 shadow-sm">
      <h3 className={`text-2xl sm:text-3xl font-bold text-charcoal text-center mb-12 ${
        language === 'ml' ? 'font-malayalam' : ''
      }`}>
        {t.history.timelineTitle}
      </h3>

      <div className="relative border-l-2 border-brand-red/30 ml-4 sm:ml-32 space-y-10 sm:space-y-12">
        {t.history.milestones.map((m, idx) => (
          <div key={idx} className="relative pl-6 sm:pl-10">
            {/* Year Badge on the left for sm screens */}
            <div className="hidden sm:block absolute -left-32 top-0 w-24 text-right">
              <span className="text-xl font-extrabold text-brand-red tracking-tight">{m.year}</span>
            </div>

            {/* Bullet Point */}
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-brand-red border-4 border-white shadow-xs" />

            {/* Mobile Year Badge */}
            <div className="sm:hidden text-sm font-extrabold text-brand-red mb-1">
              {m.year}
            </div>

            <h4 className={`text-lg font-bold text-charcoal mb-2 ${
              language === 'ml' ? 'font-malayalam' : ''
            }`}>
              {m.title}
            </h4>

            <p className={`text-sm text-slate-600 leading-relaxed ${
              language === 'ml' ? 'font-malayalam-body' : ''
            }`}>
              {m.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
```

- [x] **Step 4: Implement `HistorySection.tsx`**

Write `src/components/sections/HistorySection.tsx`:
```typescript
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { PioneersGallery } from './PioneersGallery';
import { MilestoneTimeline } from './MilestoneTimeline';
import { History, MapPin, Calendar } from 'lucide-react';

export const HistorySection: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section id="history" className="py-20 sm:py-28 bg-surface-cream scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-red mb-2 block">
            {t.history.sectionTag}
          </span>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight mb-4 ${
            language === 'ml' ? 'font-malayalam' : ''
          }`}>
            {t.history.heading}
          </h2>
        </div>

        {/* 1938 Genesis Spotlight Card */}
        <div className="bg-gradient-to-br from-brand-red to-brand-red-dark text-white rounded-3xl p-8 sm:p-12 shadow-xl mb-20 relative overflow-hidden">
          <div className="relative z-10 max-w-4xl">
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-200 mb-4">
              <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
                <Calendar className="w-4 h-4" />
                {t.history.foundationDate}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
                <MapPin className="w-4 h-4" />
                {t.history.foundationPlace}
              </span>
            </div>

            <h3 className={`text-2xl sm:text-4xl font-extrabold mb-6 leading-tight ${
              language === 'ml' ? 'font-malayalam' : ''
            }`}>
              {language === 'ml'
                ? 'കല്ല്യാശ്ശേരിയിലെ വിപ്ലവ മണ്ണിൽ പിറന്ന കുട്ടികളുടെ പ്രസ്ഥാനം'
                : 'Born on the Revolutionary Soil of Kalliasseri'}
            </h3>

            <p className={`text-base sm:text-lg text-amber-50 leading-relaxed ${
              language === 'ml' ? 'font-malayalam-body' : ''
            }`}>
              {t.history.genesisStory}
            </p>
          </div>
        </div>

        {/* Historic Pioneers */}
        <PioneersGallery />

        {/* Timeline */}
        <MilestoneTimeline />
      </div>
    </section>
  );
};
```

- [x] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/components/sections/HistorySection.test.tsx`
Expected: PASS

---

### Task 11: Official Flag Song (പതാകഗാനം) Audio & Lyrics Module

**Files:**
- Create: `src/components/anthem/AnthemModal.tsx`
- Test: `src/components/anthem/AnthemModal.test.tsx`

**Interfaces:**
- Consumes: `useLanguage()`, `BalasanghamFlag`, `RedStarIcon`
- Produces: Accessible dialog modal (`role="dialog"`) with audio mockup controls (play/pause/scrub), full Malayalam lyrics, and parallel English translation.

- [x] **Step 1: Write failing test for AnthemModal**

Write `src/components/anthem/AnthemModal.test.tsx`:
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { LanguageProvider } from '../../context/LanguageContext';
import { AnthemModal } from './AnthemModal';

describe('AnthemModal Component', () => {
  it('renders modal when isOpen is true with lyrics and audio controls', () => {
    const handleClose = vi.fn();
    render(
      <LanguageProvider>
        <AnthemModal isOpen={true} onClose={handleClose} />
      </LanguageProvider>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/ഉണരുക ഉയരുക ശുഭ്രപതാകേ/)).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: /close anthem modal/i });
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('toggles play/pause state when play button is clicked', () => {
    render(
      <LanguageProvider>
        <AnthemModal isOpen={true} onClose={vi.fn()} />
      </LanguageProvider>
    );

    const playBtn = screen.getByRole('button', { name: /play anthem|pause anthem/i });
    expect(playBtn).toBeInTheDocument();
    fireEvent.click(playBtn);
  });
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/anthem/AnthemModal.test.tsx`
Expected: FAIL

- [x] **Step 3: Implement `AnthemModal.tsx`**

Write `src/components/anthem/AnthemModal.tsx`:
```typescript
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { BalasanghamFlag } from '../motifs/BalasanghamFlag';
import { Play, Pause, Volume2, X, Music } from 'lucide-react';

interface AnthemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AnthemModal: React.FC<AnthemModalProps> = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Audio simulation timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Balasangham Flag Song Anthem"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div 
        className="bg-white rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-red to-brand-red-dark text-white p-6 sm:p-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BalasanghamFlag className="w-12 h-7" />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-malayalam">
                {t.anthem.title}
              </h2>
              <p className="text-xs sm:text-sm text-amber-200">
                {t.anthem.subtitle}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close anthem modal"
            className="p-2 rounded-full hover:bg-white/20 text-white min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Audio Player Controls */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row items-center gap-4">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause anthem' : 'Play anthem'}
            className="w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center shadow-md hover:bg-brand-red-dark transition-colors shrink-0"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>

          <div className="flex-1 w-full">
            <div className="w-full bg-slate-200 rounded-full h-2 cursor-pointer overflow-hidden">
              <div 
                className="bg-brand-red h-full transition-all duration-300"
                style={{ width: `${progress}%` }} 
              />
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-1 font-medium">
              <span>{isPlaying ? '0:45' : '0:00'}</span>
              <span>{t.anthem.durationLabel}</span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-slate-400">
            <Volume2 className="w-4 h-4" />
            <span className="text-xs">Anthem Audio</span>
          </div>
        </div>

        {/* Dual-Column Lyrics Display */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {/* Malayalam Original */}
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-red block">
                മലയാളം വരികൾ (Original Lyrics)
              </span>
              <div className="font-malayalam text-base sm:text-lg text-charcoal leading-loose whitespace-pre-line font-medium">
                {t.anthem.lyrics.join('\n\n')}
              </div>
            </div>

            {/* English Poetic Translation */}
            <div className="space-y-4 pt-4 md:pt-0 md:pl-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                English Poetic Translation
              </span>
              <div className="text-sm sm:text-base text-slate-600 leading-relaxed whitespace-pre-line italic">
                {language === 'en'
                  ? `Awaken and arise, pure white banner,
Radiant flag of glorious action!
Adorned with blood-red stars upon your chest,
Proud banner of Balasangham!

Like the silver dove nurtured
In the heavenly nest of the sky,
As the very soul of human peace,
You awaken across our lands!

Stitched with the beauty of dawn's first ray,
Bearing the message of noble ideals,
With the sacred mantra of Study, Contemplate, Act,
Fly high across the boundless expanse!

Against hunger, prison walls, and exploitation,
When dark forces challenge India's childhood,
Against them all, we raise you high—
Our proud banner of resistance and freedom!`
                  : `ഉണരുക ഉയരുക ശുഭ്രപതാകേ
ഉജ്ജ്വല കർമ്മപതാകേ
രക്തതാരകൾ മാറിൽ ചാർത്തിയ
ബാലസംഘ പതാകേ!`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
```

- [x] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/anthem/AnthemModal.test.tsx`
Expected: PASS

---

### Task 12: Footer, App Integration, Mobile Responsiveness & E2E Validation

**Files:**
- Create: `src/components/layout/Footer.tsx`
- Modify: `src/App.tsx`
- Test: `src/App.test.tsx`

**Interfaces:**
- Consumes: All section components, `LanguageProvider`, `Navbar`, `HeroSection`, `AboutSection`, `WhatWeDoSection`, `EventsSection`, `HistorySection`, `AnthemModal`, `Footer`
- Produces: Complete, responsive, verified single-page production web application.

- [x] **Step 1: Write integration tests in `src/App.test.tsx`**

Write `src/App.test.tsx`:
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import App from './App';

describe('Balasangham Main Website Integration', () => {
  it('renders all four foundational pillars on the page', () => {
    render(<App />);

    // Pillar 1: What is Balasangham
    expect(screen.getByRole('heading', { level: 2, name: /What is Balasangham\?/i })).toBeInTheDocument();

    // Pillar 2: What They Do
    expect(screen.getByRole('heading', { level: 2, name: /What They Do/i })).toBeInTheDocument();

    // Pillar 3: Events Conducted
    expect(screen.getByRole('heading', { level: 2, name: /Events Conducted/i })).toBeInTheDocument();

    // Pillar 4: History & Heritage
    expect(screen.getByRole('heading', { level: 2, name: /History & Heritage/i })).toBeInTheDocument();
  });

  it('switches between English and Malayalam seamlessly without breaking content', () => {
    render(<App />);

    const mlButton = screen.getByRole('button', { name: 'മലയാളം' });
    fireEvent.click(mlButton);

    expect(screen.getByText('ആരാണ് ബാലസംഘം?')).toBeInTheDocument();
    expect(screen.getByText('പ്രവർത്തനങ്ങൾ')).toBeInTheDocument();
    expect(screen.getByText('മേളകളും പരിപാടികളും')).toBeInTheDocument();
    expect(screen.getByText('ചരിത്രവും നാൾവഴികളും')).toBeInTheDocument();
  });

  it('opens and closes the Flag Song modal', () => {
    render(<App />);

    const anthemButtons = screen.getAllByRole('button', { name: /Flag Song|പതാകഗാനം/i });
    fireEvent.click(anthemButtons[0]);

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: /close anthem modal/i });
    fireEvent.click(closeBtn);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
```

- [x] **Step 2: Implement `src/components/layout/Footer.tsx`**

Write `src/components/layout/Footer.tsx`:
```typescript
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { BalasanghamFlag } from '../motifs/BalasanghamFlag';
import { RedStarIcon } from '../motifs/RedStarIcon';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-charcoal text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Slogan */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <BalasanghamFlag className="w-10 h-6" />
              <span className={`text-xl font-bold tracking-tight text-white ${language === 'ml' ? 'font-malayalam' : ''}`}>
                {language === 'ml' ? 'ബാലസംഘം' : 'Balasangham'}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-amber-400 font-bold font-malayalam text-lg">
                {t.footer.mottoMalayalam}
              </p>
              <p className="text-slate-400 text-xs italic">
                {t.footer.mottoEnglish}
              </p>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <a href="#about" className="text-slate-300 hover:text-white transition-colors">
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a href="#what-we-do" className="text-slate-300 hover:text-white transition-colors">
                  {t.nav.whatWeDo}
                </a>
              </li>
              <li>
                <a href="#events" className="text-slate-300 hover:text-white transition-colors">
                  {t.nav.events}
                </a>
              </li>
              <li>
                <a href="#history" className="text-slate-300 hover:text-white transition-colors">
                  {t.nav.history}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Solidarity Tribute */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Our Legacy
            </h4>
            <p className={`text-xs text-slate-400 leading-relaxed ${language === 'ml' ? 'font-malayalam-body' : ''}`}>
              {t.footer.solidarityNote}
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-300 pt-2">
              <RedStarIcon className="w-4 h-4 text-brand-red" />
              <span>Founded December 28, 1938 • Kalliasseri, Malabar</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 text-center text-xs text-slate-500">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};
```

- [x] **Step 3: Assemble `src/App.tsx`**

Write `src/App.tsx`:
```typescript
import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/home/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { WhatWeDoSection } from './components/sections/WhatWeDoSection';
import { EventsSection } from './components/sections/EventsSection';
import { HistorySection } from './components/sections/HistorySection';
import { AnthemModal } from './components/anthem/AnthemModal';
import { Footer } from './components/layout/Footer';

export default function App() {
  const [anthemOpen, setAnthemOpen] = useState(false);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-surface-cream text-charcoal flex flex-col selection:bg-brand-red selection:text-white">
        <Navbar onOpenAnthem={() => setAnthemOpen(true)} />
        <main className="flex-1">
          <HeroSection onOpenAnthem={() => setAnthemOpen(true)} />
          <AboutSection />
          <WhatWeDoSection />
          <EventsSection />
          <HistorySection />
        </main>
        <Footer />
        <AnthemModal isOpen={anthemOpen} onClose={() => setAnthemOpen(false)} />
      </div>
    </LanguageProvider>
  );
}
```

- [x] **Step 4: Run test suite and production build**

Run: `npx vitest run && npm run build`
Expected: ALL PASS with zero TypeScript or styling errors.
