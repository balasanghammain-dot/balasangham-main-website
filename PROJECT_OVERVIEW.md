# Comprehensive Project Overview: Balasangham Kannur Official Website

**Document Status:** Grounded Verification & Complete Architecture Audit  
**Date of Audit:** 2026-11-01  
**Repository Branch:** `main` (commit `1bd8a11`)  
**Working Directory:** `/home/dhyandevp/Documents/WayveEnterprises/clientproject/balasangham`

---

## 1. PURPOSE

### 1.1 Organizational Identity & Target Audience
This repository contains the production code for the official bilingual web application of the **Balasangham Kannur District Committee** (ബാലസംഘം കണ്ണൂർ ജില്ലാ കമ്മിറ്റി) (`docs/ORGANIZATION_KB.md:1-15`, `src/data/organizationData.ts:46-57`).

- **Organization**: Balasangham is the world's largest democratic, secular, and progressive children's cultural and social movement, established on **December 28, 1938 in Kalliasseri, Kannur District, Kerala** (`docs/ORGANIZATION_KB.md:12-25`, `src/data/organizationData.ts:55-57`).
- **Guiding Pioneers**: Founded during the Malabar peasant awakening under the mentorship of historic freedom fighters and leaders including P. Krishna Pillai, A.K. Gopalan (AKG), E.M.S. Namboodiripad, K.P.R. Gopalan, and the young E.K. Nayanar (`docs/ORGANIZATION_KB.md:20-25`, `server/db.js:146-147`, `src/data/verifiedContent.ts:16-25`).
- **Scale**: Over **1,000,000 child members** (aged 6 to 18) organized into **20,000+ grassroots neighborhood/school units** across all 14 districts of Kerala (`docs/BALASANGHAM_MAIN_WEBSITE_SPEC.md:15-16`, `src/data/organizationData.ts:58-67`, `src/pages/JoinPage.tsx:18-30`).
- **Client**: Balasangham Kannur District Committee (Office: AKG Memorial Building, P.O. Civil Station, Kannur - 670002; `src/data/organizationData.ts:108-117`).

### 1.2 Problems Solved by the Platform
1. **Public Digital Presence & Historical Preservation**: Documenting 88+ years of heritage, democratic structure, pioneers, and symbols (`docs/ORGANIZATION_KB.md:1-50`, `src/pages/HistoryPage.tsx:1-120`).
2. **Flagship Event Publishing**: Publicizing the upcoming **Balasangham Kannur District Conference 2026** at Kalliasseri on October 10–11, 2026, themed *"Childhood of Struggle"* (*പോരാട്ടത്തിന്റെ ബാല്യം ✊🏻*) (`docs/EVENT_CONFERENCE_2026.md:1-40`, `server/db.js:142-162`, `src/components/sections/EventsSection.tsx:1-80`).
3. **Verified Archival & Documentary Media**: Serving high-definition photography, village street theater tours (*Venalthumbikal*), district conferences, and video recordings (`src/pages/MediaPage.tsx:25-205`, `src/data/mediaCloudinary.json:1-450`).
4. **Youth Engagement & Cultural Interactivity**:
   - Audio anthem player with bilingual lyrics and synchronized playback for the official Flag Song (*"ഉണരുക ഉയരുക ശുഭ്രപതാകേ"*) (`src/components/anthem/AnthemModal.tsx:1-190`, `src/data/flagSong.ts:1-75`).
   - Interactive Poster Reveal Tetris Game (`/game`) providing a gamified cultural challenge revealing the official conference poster (`src/components/game/PosterTetris.tsx:1-1111`).
   - Event attendee photo gallery with SnapShare (`src/pages/SnapSharePage.tsx:1-160`).
5. **Decentralized District Administration**: Full-featured administrative portal (`/admin`) for non-technical committee organizers to manage events, upload media to Cloudinary, and toggle draft/publish statuses (`src/pages/admin/AdminDashboardPage.tsx`, `AdminEventsPage.tsx`, `AdminMediaPage.tsx`).

---

## 2. TECH STACK

### 2.1 Core Framework & Runtime
- **Frontend Framework**: React `18.3.1` (`package.json:42`), React DOM `18.3.1` (`package.json:43`).
- **Language**: TypeScript `5.7.3` (`package.json:68`), ECMAScript Modules (`package.json:5`).
- **Build Tool & Bundler**: Vite `6.0.11` (`package.json:69`), `@vitejs/plugin-react` `4.3.4` (`package.json:62`).
- **Routing**: React Router DOM `7.18.4` (`package.json:44`) with code-splitting via `React.lazy` and `Suspense` (`src/App.tsx:13-37`).
- **Backend Runtime**: Node.js (v18+ / v20+), Express `5.2.1` (`package.json:36`).

### 2.2 UI Libraries, Styling & Asset Handling
- **Styling**: Tailwind CSS `3.4.17` (`package.json:66`), PostCSS `8.5.1` (`package.json:65`), Autoprefixer `10.4.20` (`package.json:63`), `tailwindcss-animate` `1.0.7` (`package.json:46`).
- **Typography**: Custom fonts configured in `index.html:15-20` and `tailwind.config.js:20-30`:
  - English: *Plus Jakarta Sans*, *Cinzel*, *JetBrains Mono*.
  - Malayalam: *Gayathri*, *Manjari*, *Chilanka*, *Anek Malayalam*.
- **UI Components & Primitives**:
  - Radix UI (`@radix-ui/react-dialog` `1.1.23`, `@radix-ui/react-accordion` `1.2.20`, `@radix-ui/react-tabs` `1.1.21`, `@radix-ui/react-slot` `1.3.3`, `@radix-ui/react-separator` `1.1.15`, `@radix-ui/react-scroll-area` `1.2.18`, `@radix-ui/react-aspect-ratio` `1.1.15`, `@radix-ui/react-avatar` `1.2.6`, `@radix-ui/react-navigation-menu` `1.2.22`, `@radix-ui/react-tooltip` `1.2.16`) (`package.json:17-26`).
  - Class merging: `clsx` `2.1.1` (`package.json:32`), `tailwind-merge` `3.7.0` (`package.json:45`), `class-variance-authority` `0.7.1` (`package.json:30`).
- **Icons**: `lucide-react` `1.16.0` (`package.json:40`).
- **Carousel**: `embla-carousel-react` `8.6.0` (`package.json:35`).
- **Audio & Sound Synthesis**:
  - HTML5 Audio for anthem (`src/components/anthem/AnthemModal.tsx:30-48`).
  - Web Audio API real-time chiptune synthesis (`AudioContext`, square/triangle waves) for game effects (`src/lib/gameAudio.ts:1-170`).

### 2.3 Databases & ORM / Storage
- **Primary Cloud Database**: Google Cloud Firestore via Firebase Web SDK `12.19.0` (`package.json:39`, `src/lib/firebase.ts:1-23`). Project ID: `balasangam-8e562`.
- **Primary Media CDN**: Cloudinary `2.11.0` (`package.json:31`, `server/cloudinary.js:1-226`, `api/upload.js:1-98`). Cloud Name: `dj4apdzk`.
- **Local / Serverful Database**: SQLite 3 via `better-sqlite3` `13.0.3` (`package.json:28`, `server/db.js:1-168`), with WAL mode enabled (`server/db.js:19`).
- **Session Store**: `better-sqlite3-session-store` `0.1.0` (`package.json:29`, `server/index.js:6,82-99`).
- **Local File Uploads**: `multer` `2.4.0` (`package.json:41`, `server/index.js:101-123`, `api/upload.js:11-15`).

### 2.4 Authentication & Security
- **Firebase Authentication**: Email/Password authentication for admin login (`src/pages/admin/AdminLoginPage.tsx:28`, `src/lib/firebase.ts:22`, `src/components/admin/AdminRoute.tsx:18-39`).
- **Express Session & Password Verification**: `express-session` `1.19.0` (`package.json:38`), `bcryptjs` `3.0.3` (`package.json:27`, `server/auth.js:37`), `express-rate-limit` `8.7.0` (`package.json:37`, `server/auth.js:13-18`).
- **CORS**: `cors` `2.8.6` (`package.json:33`, `server/index.js:41-67`).

### 2.5 Hosting & Deployment Configuration
- **Firebase Hosting**: `firebase.json:1-41` — serves compiled `dist/` directory, redirects all routes to `/index.html` for client routing, sets 1-year immutable caching on static assets (`firebase.json:21-27`) and `no-cache` on `index.html` (`firebase.json:30-36`).
- **Vercel Serverless Hosting**: `vercel.json:1-20` — rewrites `/api/admin/upload`, `/api/admin/media/upload`, and `/api/upload` to the serverless function `/api/upload.js`, fallback to `/index.html`.
- **Standalone Node/Express Server**: `server/index.js` running on `PORT=3001` or serving `dist/` in production mode (`server/index.js:144-150`).

---

## 3. STRUCTURE

Directory tree of important folders and files with a one-line description:

```
balasangham/
├── .env.example                               # Environment template for Firebase, Cloudinary, and session keys
├── .gitignore                                 # Git exclusions for node_modules, dist, .env, and local media
├── CLAUDE.md                                  # Git workflow, branch naming, and commit guidelines
├── DESIGN.md                                  # Design system tokens, color dial, and visual personality
├── firebase.json                              # Firebase Hosting, Firestore rules & indexes deployment config
├── firestore.indexes.json                     # Firestore composite query index definitions
├── firestore.rules                            # Hardened security rules for events and media collections
├── index.html                                 # Single-page HTML shell with font preloads and metadata
├── package.json                               # npm project manifest, dependencies, and execution scripts
├── tailwind.config.js                         # Custom theme colors (sun-primary, deep-red, soft-cream) & fonts
├── tsconfig.json                              # TypeScript project configuration and path alias (@/ -> src/)
├── vercel.json                                # Vercel deployment rewrites for serverless upload API
├── vite.config.ts                             # Vite build config, dev proxy (/api -> :3001), and Vitest setup
│
├── api/                                       # Vercel Serverless Functions
│   └── upload.js                              # Serverless Cloudinary streaming upload handler
│
├── content/                                   # Verified editorial raw content (legacy reference)
│   ├── events.json                            # Historical events list
│   ├── organization.json                      # Organizational facts and numbers
│   ├── programs.json                          # Cultural program definitions
│   ├── sources.json                           # Source citations
│   └── updates.json                           # Press releases and announcements
│
├── docs/                                      # Ground truth documentation and knowledge base
│   ├── BALASANGHAM_MAIN_WEBSITE_SPEC.md       # Primary architectural specifications
│   ├── DESIGN_SYSTEM.md                       # UI design system and color specs
│   ├── EVENT_CONFERENCE_2026.md               # 2026 Kannur District Conference specifications
│   ├── MAIN_AGENT_PROMPT.md                   # Builder agent instruction prompt
│   └── ORGANIZATION_KB.md                     # Single Source of Truth on history, motto, and symbols
│
├── public/                                    # Public static web assets
│   ├── audio/                                 # Audio assets
│   │   └── flagsong.mp3                       # Studio vocal rendition of Balasangham Flag Song
│   ├── images/                                # Static images, posters, and conference artworks
│   │   ├── conference-2026/                   # 2026 Conference posters and stage backdrop designs
│   │   ├── conference-poster-2026.jpg         # Main conference poster visual
│   │   ├── kannur-conference-2026-poster.jpg  # Static festival artwork
│   │   └── tetris-poster.jpg                  # Poster image used for Poster Tetris puzzle
│   ├── qr/                                    # High-resolution SVG/PNG QR codes linking to website
│   ├── robots.txt                             # Search engine crawling instructions
│   └── sitemap.xml                            # SEO URL index
│
├── scripts/                                   # Automation and migration scripts
│   ├── generate_qr.py                         # Generates branded Balasangham QR codes
│   ├── migrate_all_to_firestore.mjs           # Batch migration of events and media to Firestore REST
│   └── upload-leadership-photos.mjs           # Uploads committee portraits to Cloudinary
│
├── server/                                    # Express & SQLite serverful backend
│   ├── auth.js                                # Session auth, rate limiting, and bcrypt verification
│   ├── cloudinary.js                          # Cloudinary SDK wrapper with local filesystem fallback
│   ├── db.js                                  # better-sqlite3 database initialization and seeding
│   ├── firestoreSync.js                       # Syncs SQLite changes directly to Firestore REST API
│   ├── index.js                               # Express application entry point, middleware, and listeners
│   ├── utils.js                               # Slug and ID generation helpers
│   ├── data/                                  # SQLite runtime database directory (gitignored)
│   │   ├── balasangham.db                     # Application events and media database
│   │   └── sessions.db                        # Session cookie store database
│   └── routes/
│       ├── admin.js                           # Authenticated admin CRUD routes for events and media
│       └── public.js                          # Public endpoints for events, media, and latest conference
│
└── src/                                       # React / TypeScript application source
    ├── main.tsx                               # Application bootstrapper and DOM mounter
    ├── App.tsx                                # Main router, code-split routes, and layout shell
    ├── index.css                              # Tailwind base, Malayalam font utilities, and animations
    ├── components/
    │   ├── admin/                             # Admin portal layout and route guards
    │   │   ├── AdminLayout.tsx                # Admin sidebar and top navigation
    │   │   └── AdminRoute.tsx                 # Authentication barrier checking Firebase/session
    │   ├── anthem/                            # Flag Song modal player
    │   │   └── AnthemModal.tsx                # Audio player, animated waveform, and lyrics
    │   ├── common/                            # Shared widgets
    │   │   ├── Breadcrumb.tsx                 # Breadcrumb navigation bar
    │   │   ├── LanguageToggle.tsx             # Malayalam / English language switcher
    │   │   ├── ScrollToTop.tsx                # Automatic route transition scroll reset
    │   │   └── SocialIcons.tsx                # SVG social icons (YouTube, Facebook, etc.)
    │   ├── conference/                        # 2026 Conference specific editorial components
    │   │   ├── ConferenceHero.tsx             # Conference banner and countdown timer
    │   │   ├── EventDetails.tsx               # Agenda, venue, and delegate logistics
    │   │   ├── FlagSongEditorial.tsx          # Editorial presentation of the flag song
    │   │   ├── KalliasseriHeritage.tsx        # Historic birthplace heritage section
    │   │   ├── LightboxModal.tsx              # Fullscreen image viewer with keyboard navigation
    │   │   └── VisualArchive.tsx              # Conference poster and backdrop gallery
    │   ├── event/                             # Event specific reusable widgets
    │   │   ├── CalendarDropdown.tsx           # Google, Apple, and ICS calendar exports
    │   │   ├── EventLocationSection.tsx       # Venue description with embedded Google Map
    │   │   ├── EventMediaGallery.tsx          # Event photo gallery grid
    │   │   └── ShareButton.tsx                # Web Share API and social sharing buttons
    │   ├── game/                              # Interactive game components
    │   │   └── PosterTetris.tsx               # Custom Tetris game revealing poster slices
    │   ├── home/                              # Landing page sections
    │   │   ├── GameSection.tsx                # Homepage promo block for Poster Tetris game
    │   │   ├── HeroSection.tsx                # Editorial hero banner with audio play button
    │   │   ├── MediaShowcaseSection.tsx       # Photo and video preview strip
    │   │   └── StatsRibbon.tsx                # Membership, unit, and heritage stat badges
    │   ├── layout/                            # Core page layout components
    │   │   ├── BottomNav.tsx                  # Mobile bottom app-bar navigation
    │   │   ├── Footer.tsx                     # Global footer with links, address, and symbols
    │   │   └── Navbar.tsx                     # Responsive navigation bar with mobile drawer
    │   ├── media/                             # Media players
    │   │   └── VideoPlayerModal.tsx           # Custom video modal player for MP4 and YouTube
    │   ├── motifs/                            # Cultural SVG emblems and branding
    │   │   ├── BackdropSunburst.tsx           # Golden sunburst background motif
    │   │   ├── BalasanghamFlag.tsx            # Official white flag with red star SVG
    │   │   ├── BalasanghamLogo.tsx            # Balasangham Kerala seal logo
    │   │   ├── PeaceDove.tsx                  # Secular white peace dove SVG
    │   │   └── RedStarIcon.tsx                # Five-pointed red star icon
    │   ├── sections/                          # Reusable informational page sections
    │   │   ├── AboutSection.tsx               # Core values and organizational philosophy
    │   │   ├── EventsSection.tsx              # Featured event spotlight and calendar listing
    │   │   ├── GovernanceDiagram.tsx          # Diagram of 5-tier democratic structure
    │   │   ├── HistorySection.tsx             # 1938 founding story and pioneer leaders
    │   │   ├── MilestoneTimeline.tsx          # Chronological timeline from 1938 to 2026
    │   │   └── PioneersGallery.tsx            # Portraits of historic movement founders
    │   └── ui/                                # Headless UI primitives (Radix + Tailwind)
    │       ├── badge.tsx                      # Badge styling variants
    │       ├── button.tsx                     # Button styling variants (default, festive, outline)
    │       ├── dialog.tsx                     # Modal dialog wrapper
    │       ├── separator.tsx                  # Horizontal divider
    │       └── sheet.tsx                      # Mobile slide-out drawer
    ├── context/
    │   └── LanguageContext.tsx                # Language state provider ('en' | 'ml') with localStorage
    ├── data/                                  # Pre-seeded application data and content sources
    │   ├── flagSong.ts                        # 7 stanzas of flag song in Malayalam and English
    │   ├── leadershipCloudinary.json          # Cloudinary photos of 8 Kannur district leaders
    │   ├── mediaCloudinary.json               # 27 Cloudinary assets (photos and videos)
    │   ├── organizationData.ts                # District office contacts, leaders, and statistics
    │   ├── verifiedContent.ts                 # Approved history, pioneers, values, and timeline
    │   └── verifiedEvents.ts                  # Static array of 7 verified district events
    ├── hooks/
    │   └── useScrollReveal.ts                 # IntersectionObserver hook for fade-in animations
    ├── i18n/
    │   └── translations.ts                    # Bilingual string dictionary for UI chrome and navigation
    ├── lib/                                   # Shared services and business utilities
    │   ├── api.ts                             # Fetch wrapper for Express REST API
    │   ├── calendar.ts                        # Generates Google Calendar URLs and ICS download files
    │   ├── confetti.ts                        # Canvas confetti animation utility
    │   ├── eventsService.ts                   # Firestore queries, real-time listeners, and event CRUD
    │   ├── firebase.ts                        # Firebase App, Firestore, and Auth initialization
    │   ├── gameAudio.ts                       # Web Audio API 8-bit sound synthesizer for Tetris
    │   ├── mapUtils.ts                        # Google Maps URL sanitization and embed URL generator
    │   ├── mediaService.ts                    # Firestore media queries, updates, and dashboard stats
    │   ├── uploadService.ts                   # Universal media uploader (Server API -> Cloudinary fallback)
    │   └── utils.ts                           # Tailwind class merger (cn helper)
    ├── pages/                                 # Route page components
    │   ├── AboutPage.tsx                      # Pillars, philosophy, and democratic model
    │   ├── AlumniPage.tsx                     # Distinguished former Balasangham members
    │   ├── ContactPage.tsx                    # Office address, phones, email, and social links
    │   ├── EventDetailPage.tsx                # Single event details, map, poster, and schedule
    │   ├── EventsPage.tsx                     # Full events directory with upcoming/past filters
    │   ├── HistoryPage.tsx                    # Deep-dive 1938 history, Malabar peasant struggle
    │   ├── HomePage.tsx                       # Primary landing page
    │   ├── JoinPage.tsx                       # Membership application guidelines (ages 6-18)
    │   ├── LeadershipPage.tsx                 # Kannur District Committee office bearers
    │   ├── MediaPage.tsx                      # Photo archive, videos, posters, and backdrops
    │   ├── NotFoundPage.tsx                   # 404 error page
    │   ├── ObjectivesPage.tsx                 # 10 core organizational objectives
    │   ├── PosterGamePage.tsx                 # Game page hosting the PosterTetris widget
    │   ├── PrivacyPage.tsx                    # Privacy Policy
    │   ├── SnapSharePage.tsx                  # Event attendee photo wall
    │   ├── StructurePage.tsx                  # 5-tier democratic structure
    │   ├── TermsPage.tsx                      # Terms of Service
    │   └── admin/                             # Administrative portal views
    │       ├── AdminDashboardPage.tsx         # Content metrics and quick action links
    │       ├── AdminEventEditorPage.tsx       # Event creation/editing with map validator & uploads
    │       ├── AdminEventsPage.tsx            # Event listing table with publish/unpublish & delete
    │       ├── AdminLoginPage.tsx             # Admin sign-in screen (Firebase Auth + session sync)
    │       └── AdminMediaPage.tsx             # Media repository management, batch uploader, & tagger
    └── types/
        ├── content.ts                         # Content schemas, localized text, and archive models
        └── event.ts                           # EventData, FirestoreEventDoc, and MediaItem interfaces
```

---

## 4. ENTRY POINTS AND FLOW

### 4.1 Client Routing Architecture
- **Browser Entry**: `index.html` loads `src/main.tsx`, which mounts `src/App.tsx` (`src/main.tsx:1-10`).
- **Context Wrappers**: `App` is wrapped in `LanguageProvider` (`src/context/LanguageContext.tsx:1-40`) and `BrowserRouter` (`src/App.tsx:107-116`).
- **Code-Splitting**: Route components are dynamically imported using `React.lazy()` (`src/App.tsx:13-37`) with a fallback spinner (`src/App.tsx:49-53`).
- **Route Definitions** (`src/App.tsx:55-98`):
  - `/`: `HomePage` (eagerly loaded for instant First Contentful Paint).
  - `/about`: `AboutPage`.
  - `/about/history`: `HistoryPage`.
  - `/about/objectives`: `ObjectivesPage`.
  - `/about/structure`: `StructurePage`.
  - `/about/leadership`: `LeadershipPage`.
  - `/about/alumni`: `AlumniPage`.
  - `/events`: `EventsPage`.
  - `/events/:slug`: `EventDetailPage`.
  - `/events/:slug/snapshare`: `SnapSharePage`.
  - `/media`: `MediaPage`.
  - `/contact`: `ContactPage`.
  - `/join`: `JoinPage`.
  - `/game` & `/poster-game`: `PosterGamePage`.
  - `/privacy`: `PrivacyPage`.
  - `/terms`: `TermsPage`.
  - `/admin/login`: `AdminLoginPage`.
  - `/admin`: Guarded by `AdminRoute` (`src/components/admin/AdminRoute.tsx:1-55`), rendering `AdminLayout`:
    - `/admin` (index): `AdminDashboardPage`.
    - `/admin/events`: `AdminEventsPage`.
    - `/admin/events/new`: `AdminEventEditorPage`.
    - `/admin/events/:id` & `/admin/events/:id/edit`: `AdminEventEditorPage`.
    - `/admin/media`: `AdminMediaPage`.
  - `*`: `NotFoundPage`.

### 4.2 API Endpoints
The platform supports both serverless execution (Vercel) and traditional serverful execution (Express):

#### Serverless Endpoint (`api/upload.js`):
- `POST /api/upload`: Receives multipart form data via Multer in-memory storage, pipes to Cloudinary streaming upload (`api/upload.js:47-73`), and returns secure URLs. Rewritten by `vercel.json:2-15` to also handle `/api/admin/upload` and `/api/admin/media/upload`.

#### Express API Endpoints (`server/routes/`):
- **Public API** (`server/routes/public.js`):
  - `GET /api/public/events`: Fetches all published events (`server/routes/public.js:6-14`).
  - `GET /api/public/events/latest`: Retrieves nearest upcoming event or most recent completed event (`server/routes/public.js:17-54`).
  - `GET /api/public/events/:slug`: Retrieves single published event by slug (`server/routes/public.js:57-73`).
  - `GET /api/public/events/:slug/snapshare`: Retrieves event media if SnapShare is enabled (`server/routes/public.js:76-97`).
  - `GET /api/public/media`: Retrieves all published images and videos with optional type/eventId filters (`server/routes/public.js:132-184`).
- **Admin API** (`server/routes/admin.js`, guarded by `requireAuth` in `server/auth.js:5-10`):
  - `POST /api/admin/login`: Verifies password against `ADMIN_PASSWORD_HASH` with rate limiting (`server/routes/admin.js:15`, `server/auth.js:19-47`).
  - `POST /api/admin/logout`: Destroys session and clears cookie (`server/routes/admin.js:16`, `server/auth.js:49-58`).
  - `GET /api/admin/session`: Returns authentication status (`server/routes/admin.js:17`, `server/auth.js:60-65`).
  - `GET /api/admin/stats`: Event and media counts (`server/routes/admin.js:23-44`).
  - `GET /api/admin/events`: Lists all events (drafts + published) (`server/routes/admin.js:47-55`).
  - `GET /api/admin/events/:id`: Single event with associated media (`server/routes/admin.js:58-75`).
  - `POST /api/admin/events`: Creates event in SQLite and syncs to Firestore (`server/routes/admin.js:123-224`).
  - `PUT /api/admin/events/:id`: Updates event and syncs to Firestore (`server/routes/admin.js:227-334`).
  - `DELETE /api/admin/events/:id`: Deletes event and associated Cloudinary assets (`server/routes/admin.js:337-370`).
  - `POST /api/admin/events/:id/publish`: Toggles publish (`server/routes/admin.js:373-384`).
  - `POST /api/admin/events/:id/unpublish`: Toggles unpublish (`server/routes/admin.js:387-398`).
  - `GET /api/admin/media`: Lists media with search and filters (`server/routes/admin.js:436-483`).
  - `GET /api/admin/media/:id`: Retrieves single media record (`server/routes/admin.js:486-501`).
  - `POST /api/admin/media/upload`: Dedicated media uploader to Cloudinary (`server/routes/admin.js:504-589`).
  - `POST /api/admin/upload`: Legacy uploader for event posters (`server/routes/admin.js:592-672`).
  - `PUT /api/admin/media/:id`: Updates media metadata (`server/routes/admin.js:675-735`).
  - `POST /api/admin/media/:id/publish`: Publishes media (`server/routes/admin.js:738-748`).
  - `POST /api/admin/media/:id/unpublish`: Unpublishes media (`server/routes/admin.js:751-761`).
  - `DELETE /api/admin/media/:id`: Deletes media from DB and Cloudinary (`server/routes/admin.js:764-787`).
  - `POST /api/admin/media/import-local`: Bulk imports local files from `/media` (`server/routes/admin.js:790-890`).

### 4.3 End-to-End Request & Data Flow
```
[ User Browser ]
       │
       ▼ (Direct Read / Real-time Sync)
[ Google Cloud Firestore ] ◄─── (Fallback read if empty) ───► [ Express Public API / Static JSON ]
       ▲
       │ (Admin Auth via Firebase Auth: signInWithEmailAndPassword)
       │
[ Admin Browser Portal ]
       ├── 1. Direct Writes: setDoc/updateDoc/deleteDoc in events & media
       │
       ├── 2. Uploads: POST /api/admin/upload or /api/upload
       │         │
       │         ▼
       │     [ Cloudinary CDN ] (stores image/video binaries)
       │         │
       │         ▼ returns secure_url & public_id metadata
       │     [ Firestore Document ] (stores metadata only, NO binaries)
       │
       └── 3. Legacy Express Sync: POST /api/admin/events
                 │
                 ▼
             [ SQLite Database ] ──(firestoreSync.js)──► [ Firestore REST API ]
```

---

## 5. DATA ARCHITECTURE

### 5.1 Firestore Document Schemas
The application defines two main collections in Firestore, governed by `firestore.rules` and typed in `src/types/event.ts`:

1. **`events` Collection**:
   - `id` / `slug`: string (unique URL identifier, immutable on update; `firestore.rules:15,178-182`).
   - `title`: string (1-200 chars; `firestore.rules:194-196`).
   - `title_ml` / `malayalamTitle`: string (optional, 0-300 chars; `firestore.rules:237-238`).
   - `short_description` / `shortDescription`: string (optional, 0-1000 chars; `firestore.rules:239-242`).
   - `full_description` / `description`: string (optional, 0-10000 chars; `firestore.rules:243-246`).
   - `startDate` / `start_date`: Timestamp or ISO string (`firestore.rules:213-216`).
   - `endDate` / `end_date`: Timestamp or ISO string (`firestore.rules:217-218`).
   - `venue`, `venue_ml`: string (optional, 0-300 chars; `firestore.rules:247-249`).
   - `location`, `location_ml`, `address`: string (optional, 0-500 chars; `firestore.rules:250-253`).
   - `mapUrl`, `map_url`: string (optional, 8-1000 chars, regex `^https://.*`; `firestore.rules:221-222`).
   - `category`: string (e.g., `'conference'`, `'memorials'`, `'festival'`; `firestore.rules:254`).
   - `poster`: Map containing `{ publicId: string, secureUrl: string }` (`firestore.rules:166-173`).
   - `published`: boolean (`firestore.rules:204-205`).
   - `snapshare_enabled` / `snapShareEnabled`: boolean or integer `0|1` (`firestore.rules:207-210`).
   - `registration_url`: string (optional HTTPS URL; `firestore.rules:223`).
   - `additional_info`, `schedule_info`: string (optional, 0-5000 chars; `firestore.rules:255-258`).
   - `createdAt`, `updatedAt`: Timestamp (`firestore.rules:230-234`).

2. **`media` Collection**:
   - `url` / `secureUrl`: string (required HTTPS URL, 8-1000 chars; `firestore.rules:330-337`).
   - `publicId` / `cloudinary_public_id`: string (required, 1-500 chars; `firestore.rules:339-347`).
   - `type` / `resource_type`: string (required, `'image'` or `'video'`; `firestore.rules:349-355`).
   - `published`: boolean or integer `0|1` (`firestore.rules:357-362`).
   - `title`, `description`, `caption`, `caption_ml`: string (optional bounded strings; `firestore.rules:389-394`).
   - `format`: string (optional, 1-20 chars; `firestore.rules:364-365`).
   - `width`, `height`, `duration`: non-negative numbers (`firestore.rules:367-370`).
   - `thumbnail_url` / `thumbnailUrl`: string (optional, HTTPS or relative `/`; `firestore.rules:375-377`).
   - `eventId`: string (optional, 0-150 chars; `firestore.rules:379-381`).
   - `sort_order`: number (`firestore.rules:372-373`).
   - `createdAt`, `updatedAt`: Timestamp (`firestore.rules:383-387`).

### 5.2 SQLite Schema (`server/db.js`)
- Table `events`: 26 columns (`server/db.js:24-52`).
- Table `media`: 18 columns with foreign key `event_id REFERENCES events(id) ON DELETE SET NULL` (`server/db.js:63-84`). Indexes on `event_id`, `published`, and `resource_type` (`server/db.js:106-109`).
- Session store: `sessions.db` with automated expired session cleanup every 15 minutes (`server/index.js:83-89`).

### 5.3 Static Data Sets
- `src/data/verifiedEvents.ts:1-117`: 7 verified regional events including the Kannur District Conference 2026, Sodarathwena 2026, and Pinarayi Area Conference.
- `src/data/leadershipCloudinary.json:1-130`: Verified records of 8 Kannur district leaders with Cloudinary URLs.
- `src/data/mediaCloudinary.json:1-455`: 27 verified Cloudinary media items (16 photos from Venalthumbikal 2025 and 11 field activity videos).
- `src/data/flagSong.ts:1-75`: Full 7-stanza anthem with Malayalam text and poetic English translations.
- `src/data/organizationData.ts:46-270`: Core stats, symbols, contact info, and leadership structures.

---

## 6. FEATURES

### 6.1 User-Facing Features
| Feature | Implementation Path | Description |
| :--- | :--- | :--- |
| **Bilingual Toggle** | `src/components/common/LanguageToggle.tsx`, `src/context/LanguageContext.tsx` | Seamless real-time switching between English and Malayalam with font adaptations and `localStorage` persistence. |
| **Flag Song Anthem Player** | `src/components/anthem/AnthemModal.tsx`, `public/audio/flagsong.mp3`, `src/data/flagSong.ts` | Modal music player with play/pause controls, animated audio wave bars, full 7-stanza Malayalam lyrics, and English poetic translations. |
| **Featured Conference Section** | `src/components/sections/EventsSection.tsx`, `src/components/conference/ConferenceHero.tsx` | Homepage showcase for the 2026 Kannur District Conference with countdown timer, transit routes, and calendar sync. |
| **Calendar Sync Export** | `src/components/event/CalendarDropdown.tsx`, `src/lib/calendar.ts` | One-click export to Google Calendar, Apple Calendar, and download of `.ics` calendar files. |
| **Events Directory** | `src/pages/EventsPage.tsx` | Searchable and filterable directory of all published events with tabs for All, Upcoming, and Past events. |
| **Event Details & Maps** | `src/pages/EventDetailPage.tsx`, `src/components/event/EventLocationSection.tsx` | Detailed event agenda, logistics, poster lightbox, and embedded interactive Google Maps. |
| **Social Event Sharing** | `src/components/event/ShareButton.tsx` | Web Share API integration with fallbacks for WhatsApp, Facebook, X/Twitter, and clipboard copying. |
| **SnapShare Photo Wall** | `src/pages/SnapSharePage.tsx` | High-contrast dark-mode attendee photo gallery for events with SnapShare enabled. |
| **Visual Media Repository** | `src/pages/MediaPage.tsx`, `src/components/conference/LightboxModal.tsx` | Media gallery with tabbed views for Photos, Videos, Posters, and Stage Backdrops with keyboard-accessible lightbox. |
| **Embedded Video Modal** | `src/components/media/VideoPlayerModal.tsx` | Direct playback for HTML5 MP4 videos and external YouTube broadcasts. |
| **Poster Reveal Tetris Game** | `src/pages/PosterGamePage.tsx`, `src/components/game/PosterTetris.tsx`, `src/lib/gameAudio.ts` | Full-featured Tetris engine with 8-bit sound synthesis that progressively reveals the official conference poster in permanently locked blocks. |
| **Heritage & Pioneers Section** | `src/pages/HistoryPage.tsx`, `src/components/sections/PioneersGallery.tsx` | Comprehensive historical documentation of the 1938 Kalliasseri founding, Malabar peasant struggle, and early leaders. |
| **District Leadership Showcase** | `src/pages/LeadershipPage.tsx`, `src/data/organizationData.ts` | Circular portrait gallery of Kannur district leaders with graceful SVG placeholder fallbacks. |
| **Membership Guidelines** | `src/pages/JoinPage.tsx` | Explains membership criteria (ages 6–18), democratic rights, and contact information for local units. |
| **Contact Directory** | `src/pages/ContactPage.tsx` | Office address, phone numbers, email, interactive map link, and social media channels. |

### 6.2 Administrative Features
| Feature | Implementation Path | Description |
| :--- | :--- | :--- |
| **Dual Admin Authentication** | `src/pages/admin/AdminLoginPage.tsx`, `src/components/admin/AdminRoute.tsx`, `server/auth.js` | Firebase Auth as primary authority, synchronized with Express session cookies and bcrypt password verification. |
| **Metrics Dashboard** | `src/pages/admin/AdminDashboardPage.tsx`, `src/lib/mediaService.ts` | Live statistics displaying total events, published count, draft count, and media asset totals computed directly from Firestore. |
| **Events Management** | `src/pages/admin/AdminEventsPage.tsx`, `src/lib/eventsService.ts` | Real-time event listing table with quick-action toggles for publishing/unpublishing and event deletion. |
| **Bilingual Event Editor** | `src/pages/admin/AdminEventEditorPage.tsx` | Form editor supporting English and Malayalam titles/descriptions, start/end date-time, category, poster upload, gallery upload, and live Google Maps URL validation and preview. |
| **Media Repository Manager** | `src/pages/admin/AdminMediaPage.tsx`, `src/lib/uploadService.ts` | Media grid supporting image and video uploads, batch upload queue with progress bars, title/caption editing, event tagging, and deletion. |
| **Local Media Importer** | `server/routes/admin.js:790-890` | Server-side utility to scan and import local images/videos from the `media/` directory into Cloudinary and the database. |

---

## 7. ENVIRONMENT AND SECRETS

### 7.1 Environment Variables Overview
| Variable Name | Context / Location | Purpose | Gitignored? |
| :--- | :--- | :--- | :--- |
| `NODE_ENV` | `server/index.js:74,96,144,154`, `server/auth.js:15` | Runtime environment mode (`production` vs `development`). | Yes (`.env`) |
| `PORT` | `server/index.js:14` | Express HTTP server listen port (default: 3001). | Yes (`.env`) |
| `SESSION_SECRET` | `server/index.js:72-80` | Express session encryption secret (32+ random characters). | Yes (`.env`) |
| `ADMIN_PASSWORD_HASH` | `server/auth.js:21-38` | Bcrypt hash of admin password for backend authentication. | Yes (`.env`) |
| `ALLOWED_ORIGINS` | `server/index.js:46-48` | Comma-separated list of allowed CORS origins. | Yes (`.env`) |
| `PRODUCTION_URL` | `server/index.js:45` | Optional production URL for CORS allowlist. | Yes (`.env`) |
| `CLOUDINARY_CLOUD_NAME` | `server/cloudinary.js:6,13`, `api/upload.js:6` | Cloudinary account identifier for backend media uploads. | Yes (`.env`) |
| `CLOUDINARY_API_KEY` | `server/cloudinary.js:7,14`, `api/upload.js:7` | Cloudinary API key for asset uploads and deletions. | Yes (`.env`) |
| `CLOUDINARY_API_SECRET` | `server/cloudinary.js:8,15`, `api/upload.js:8` | Cloudinary API secret (server-side only, never expose to client). | Yes (`.env`) |
| `VITE_CLOUDINARY_CLOUD_NAME` | `src/lib/uploadService.ts:3,72` | Cloud name exposed to client for direct upload fallbacks. | Yes (`.env.local`) |
| `VITE_FIREBASE_API_KEY` | `src/lib/firebase.ts:6`, `scripts/migrate_events_to_firestore.mjs:12` | Public Firebase Web SDK API key. | Yes (`.env`) |
| `VITE_FIREBASE_AUTH_DOMAIN` | `src/lib/firebase.ts:7`, `scripts/migrate_events_to_firestore.mjs:13` | Firebase Authentication domain (`balasangam-8e562.firebaseapp.com`). | Yes (`.env`) |
| `VITE_FIREBASE_PROJECT_ID` | `src/lib/firebase.ts:8`, `server/firestoreSync.js:4`, `scripts/migrate_events_to_firestore.mjs:14` | Google Cloud Project ID (`balasangam-8e562`). | Yes (`.env`) |
| `VITE_FIREBASE_STORAGE_BUCKET` | `src/lib/firebase.ts:9`, `scripts/migrate_events_to_firestore.mjs:15` | Firebase Storage bucket domain. | Yes (`.env`) |
| `VITE_FIREBASE_MESSAGING_SENDER_ID`| `src/lib/firebase.ts:10`, `scripts/migrate_events_to_firestore.mjs:16`| Firebase Cloud Messaging sender identifier. | Yes (`.env`) |
| `VITE_FIREBASE_APP_ID` | `src/lib/firebase.ts:11`, `scripts/migrate_events_to_firestore.mjs:17` | Firebase Application unique ID. | Yes (`.env`) |
| `VITE_FIREBASE_MEASUREMENT_ID` | `src/lib/firebase.ts:12`, `scripts/migrate_events_to_firestore.mjs:18` | Google Analytics measurement ID for Firebase. | Yes (`.env`) |

### 7.2 Gitignore Security Verification
`.gitignore` lines 18–31 strictly exclude:
- `.env`, `.env.local`, `.env.*.local`, `.env.production` (allowing only `!.env.example`).
- Service account keys: `*serviceAccount*.json`, `*service-account*.json`, `*credentials*.json`, `*.pem`, `*.key`.
- SQLite database files: `server/data/*.db`, `*.db-journal`, `*.db-wal`, `*.db-shm`.

---

## 8. BUILD AND RUN

### 8.1 Execution Commands
- **Install Dependencies**:
  ```bash
  npm install
  ```
- **Start Frontend Development Server**:
  ```bash
  npm run dev
  # Runs Vite on http://localhost:5173 with proxy /api -> http://localhost:3001
  ```
- **Start Backend Server**:
  ```bash
  npm run server
  # Or: npm start
  # Runs node server/index.js on port 3001
  ```
- **Start Full Stack Together**:
  ```bash
  npm run dev:full
  # Runs node server/index.js in background & vite frontend concurrently
  ```
- **Production Build**:
  ```bash
  npm run build
  # Runs tsc (type check) && vite build (bundles assets to dist/)
  ```
- **Preview Production Build**:
  ```bash
  npm run preview
  # Runs vite preview to serve dist/ locally
  ```
- **Run Test Suite**:
  ```bash
  npm test
  # Runs vitest run
  ```
- **Run Tests in Watch Mode**:
  ```bash
  npm run test:watch
  # Runs vitest in interactive watch mode
  ```
- **Deploy to Hosting**:
  - Deploy frontend to Firebase Hosting: `firebase deploy --only hosting`
  - Deploy Firestore security rules: `firebase deploy --only firestore:rules`
  - Deploy Firestore composite indexes: `firebase deploy --only firestore:indexes`
  - Deploy to Vercel: `vercel --prod`

### 8.2 Build Observations & Notes
- TypeScript compilation (`npx tsc --noEmit`) passes cleanly with **0 errors**.
- Vite emits an informational warning during build: `"NODE_ENV=production is not supported in the .env file. Only NODE_ENV=development is supported to create a development build of your project."` — this occurs because `.env` defines `NODE_ENV=production`.
- Bundle size warning: The main vendor chunk `dist/assets/index-fe99ainq.js` is **1,087 kB** (292 kB gzipped), exceeding Vite's 500 kB chunk warning threshold. This is primarily caused by bundling the Firebase Web SDK and React vendor packages without custom Rollup `manualChunks`.
- `package.json` does not include an `npm run lint` script.

---

## 9. QUALITY SNAPSHOT

### 9.1 Test Suite & Verification Status
- **Test Runner**: Vitest `3.2.7` with `jsdom` `26.0.0` environment (`vite.config.ts:20-24`).
- **Test Results**: **24 test files passed, 110 total tests passed, 0 failures** (Duration: ~17.7s).
- **Test Coverage Areas**:
  - User Pages: `App.test.tsx`, `HomePage.test.tsx`, `EventsPage.test.tsx`, `MediaPage.test.tsx`, `ContactPage.test.tsx`, `LeadershipPage.test.tsx`, `JoinPage.test.tsx`.
  - UI & Sections: `Navbar.test.tsx`, `BottomNav.test.tsx`, `AboutSection.test.tsx`, `EventsSection.test.tsx`, `HistorySection.test.tsx`, `HeroSection.test.tsx`, `GameSection.test.tsx`, `MediaShowcaseSection.test.tsx`, `AnthemModal.test.tsx`, `LightboxModal.test.tsx`, `LanguageToggle.test.tsx`, `Motifs.test.tsx`.
  - Game Engine: `PosterTetris.test.tsx` (7 tests verifying coordinate calculations, piece movement, hold queue, hard drop, and pixel coordinate mapping).
  - Business Logic & Security: `eventSystem.test.ts` (10 tests), `utils.test.ts`, `translations.test.ts`, and `firestoreRules.test.ts` (41 tests verifying Firestore security rules).

### 9.2 Code Cleanliness & Large Files
- **TODO / FIXME / HACK comments**: **0** instances in `src/`, `server/`, or `api/`.
- **`console.log` in production code**: **0** instances in `src/`. `console.warn` and `console.error` are used only inside error catch blocks.
- **Files Exceeding 800-Line Soft Ceiling**:
  1. `src/components/game/PosterTetris.tsx` (1,111 lines): Contains entire Tetris engine, canvas renderer, keyboard/touch handlers, and score logic.
  2. `src/pages/admin/AdminMediaPage.tsx` (1,078 lines): Contains media upload queue, filtering, inline modal editors, and Cloudinary management.
  3. `src/pages/MediaPage.tsx` (1,077 lines): Contains photo/video/poster data arrays, tab filtering, grouped event galleries, and lightbox orchestration.
  4. `server/routes/admin.js` (893 lines): Contains Express CRUD endpoints for events, media, and local media folder import.

---

## 10. SECURITY FIRST LOOK

*(Initial reconnaissance of attack surface, authorization gaps, and configuration risks; line citations included)*

1. **Unauthenticated Public Serverless Upload Endpoint**:
   - **File**: `api/upload.js:28-46`
   - **Vulnerability**: `api/upload.js` does NOT verify sessions, Firebase Auth tokens, or passwords before accepting file uploads. Any user on the internet can send `POST` requests to `/api/upload` (or via `vercel.json` rewrites to `/api/admin/upload` and `/api/admin/media/upload`) and upload files up to 50MB directly to the client's Cloudinary storage bucket.
   - **Risk**: Storage quota exhaustion, financial billing spikes on Cloudinary, hosting of illicit files.

2. **Unsigned Cloudinary Upload Preset Fallback**:
   - **File**: `src/lib/uploadService.ts:71-77`
   - **Vulnerability**: If server upload endpoints fail, the client falls back to direct browser uploads using `upload_preset: 'balasangham_uploads'` against `api.cloudinary.com`. If unsigned uploads are permitted in the Cloudinary dashboard without strict rate limits or incoming transformations, attackers can upload arbitrary files directly.

3. **Insecure CORS Configuration on Serverless Handler**:
   - **File**: `api/upload.js:30-31`
   - **Vulnerability**: `api/upload.js` sets `Access-Control-Allow-Origin: '*'` while simultaneously setting `Access-Control-Allow-Credentials: 'true'`. Web standards prohibit `*` when credentials are included; modern browsers will reject cross-origin credentialed requests.

4. **Hardcoded Fallback Cloudinary Account Identifier**:
   - **Files**: `api/upload.js:6`, `src/lib/uploadService.ts:3,72`
   - **Finding**: Fallback cloud name `'dj4apdzk'` is hardcoded in source if `process.env.CLOUDINARY_CLOUD_NAME` is absent.

5. **Local Home Directory Credential Dependency in Firestore Sync**:
   - **Files**: `server/firestoreSync.js:12-18`, `scripts/migrate_all_to_firestore.mjs:10-21`
   - **Finding**: Syncing from Express/SQLite to Firestore reads OAuth tokens from `~/.config/configstore/firebase-tools.json` in the developer's Linux user home directory. On a remote cloud host (Vercel, Render, Railway), this file will not exist and Firestore synchronization will fail silently.

6. **Hardcoded Admin Email Allowlist in Security Rules**:
   - **File**: `firestore.rules:105-106`, `src/components/admin/AdminRoute.tsx:8-11`
   - **Finding**: Admin privileges are hardcoded to `balasangham.main@gmail.com` and `admin@balasanghamkannur.org`. Adding or changing administrators requires updating rules and redeploying Firestore.

7. **Dependency CVEs**:
   - `npm audit` flags 15 vulnerabilities (2 critical, 9 high, 4 moderate), including `tinypool` (prototype pollution gadget in Vitest worker options), `multer` (DoS via async fileFilter), and `body-parser` (DoS via trailing bytes).

---

## 11. GIT HISTORY & REPOSITORY DRIFT

### 11.1 Branch State
- Active Branch: `main` (clean working tree).
- Remote tracking: `origin/main` (up to date).
- Additional remote branches: `origin/feat/mobile-first-redesign`.

### 11.2 Recent Commits (Most Recent First)
1. `1bd8a11` (Sun Oct 11 13:35): `feat(events): add share event button to homepage featured event and events list` — added Web Share API and social sharing buttons.
2. `02c0d25` (Sun Oct 11 13:19): `fix: resolve poster image fallbacks, Cloudinary upload config, and add website QR assets` — added SVG and PNG QR assets for posters and cards.
3. `dff5d83` (Sun Oct 11 12:10): `fix(hero): show only 'Since 1938' in provenance badge` — streamlined hero badge text.
4. `fe3f8b9` (Sat Oct 10 12:01): `security: remove all hardcoded API keys and credentials, rely strictly on environment variables` — migrated client keys to environment variables.
5. `619f00c` (Sat Oct 10 10:31): `feat(serverless): make frontend and admin panel 100% serverless for Vercel with Firestore and Cloudinary` — added serverless upload handler and Firestore admin support.
6. `a7787b3` (Sat Oct 10 09:06): `feat(home): add dedicated GameSection for poster challenge matching design mock` — created homepage preview for Tetris game.
7. `36b9742` (Sat Oct 10 08:57): `security: harden admin authorization, firestore rules, CORS, session secrets, and upload middleware` — added rate limiting, regex validation, and secure session keys.
8. `936bae52` (Sat Oct 10 07:10): `feat: complete live Firestore persistence, backend sync, and Tetris poster game` — delivered live Firestore rules and the complete Tetris game engine.

### 11.3 High-Churn Code Areas
The most frequently modified components over recent commits are:
- `src/components/game/PosterTetris.tsx` (canvas coordinate mapping and mobile controls).
- `src/lib/eventsService.ts` and `src/lib/mediaService.ts` (Firestore client queries and schema normalization).
- `src/pages/admin/` (`AdminEventEditorPage.tsx`, `AdminMediaPage.tsx`).
- `firestore.rules` and `server/routes/admin.js`.

---

## 12. OPEN QUESTIONS FOR THE CLIENT

1. **Production Deployment Target**: Does Balasangham plan to deploy via **Firebase Hosting** (static frontend + direct Firestore client queries) or **Vercel** (serverless functions), or maintain a persistent VPS / Node.js container (Docker / Express)? Choosing one will allow decommissioning the duplicate backend architecture.
2. **Cloudinary Upload Authentication on Serverless**: Should `/api/upload.js` verify a Firebase Auth Admin ID Token before allowing media uploads, and should unsigned upload presets on Cloudinary be disabled?
3. **Admin Account Management**: Currently, admin access is hardcoded to `balasangham.main@gmail.com` and `admin@balasanghamkannur.org` in `firestore.rules:105-106`. Would the committee like a dynamic Firebase Custom Claims role system so additional area conveners can be granted admin access without modifying codebase rules?
4. **2026 District Conference Dates & Schedule**: The seed data sets conference dates as October 10–11, 2026 (`server/db.js:148-149`, `scripts/migrate_all_to_firestore.mjs:124-125`). Are delegate registration timings and guest speaker itineraries ratified and ready to be published as official schedule records?
5. **SnapShare Upload Policy**: Currently, attendee photo uploads are managed by administrators via `/admin/media`. Does the committee want public attendees to upload photos directly from their mobile phones during the conference, and if so, what moderation workflow is required?

---

## 13. EXECUTIVE SUMMARY

### The 5 Most Important Things to Know
1. **Culturally Grounded & Complete Feature Set**: The application is tailored for Balasangham Kannur with authentic Malayalam typography, verified historical documentation from 1938, official flag song audio player, interactive poster game, and bilingual navigation.
2. **Robust Dual-Mode Data Architecture**: The app operates in two modes: (1) serverless mode hitting Google Cloud Firestore directly, and (2) serverful mode hitting Express and SQLite. Both modes include fallback to verified static JSON data.
3. **Exceptional Test Suite Health**: 24 test suites and 110 tests pass with 100% success rate, including 41 automated security rule tests verifying Firestore access policies.
4. **Production-Hardened Firestore Security Rules**: `firestore.rules` implements strict key whitelisting (`hasOnly`), strict field length bounds, HTTPS URL validation, immutable field protection, and default-deny access.
5. **Clean TypeScript Build**: TypeScript compiles cleanly with 0 type errors across the entire codebase (`npx tsc --noEmit`).

### The 5 Riskiest or Messiest Parts of the Codebase
1. **Unauthenticated Serverless Upload Endpoint (`api/upload.js`)**: Lacks authentication guards. Anyone on the internet can POST files to `/api/upload` and upload to Cloudinary.
2. **Direct Unsigned Upload Fallback (`src/lib/uploadService.ts:71-77`)**: Fallback relies on an unsigned Cloudinary upload preset (`balasangham_uploads`), exposing Cloudinary storage to unauthorized uploads if enabled in Cloudinary settings.
3. **Local Home Directory Credential Dependency (`server/firestoreSync.js:12-18`)**: Syncing SQLite to Firestore reads tokens from `~/.config/configstore/firebase-tools.json`, which only works on the developer's local machine and will fail silently in cloud hosting.
4. **Duplicated Data & Model Layers**: Data models and formatting are duplicated across `server/db.js` (SQLite), `src/lib/eventsService.ts` (Firestore), `src/lib/mediaService.ts`, and static data files (`verifiedEvents.ts`, `mediaCloudinary.json`).
5. **Monolithic UI Component Files Exceeding 1,000 Lines**: `PosterTetris.tsx` (1,111 lines), `AdminMediaPage.tsx` (1,078 lines), and `MediaPage.tsx` (1,077 lines) bundle data, state, modals, and presentation into single large files.
