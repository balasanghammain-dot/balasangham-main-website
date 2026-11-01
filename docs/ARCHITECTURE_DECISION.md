# Architecture Decision Record: Data Store & Backend Consolidation

**Status:** Proposed (Under Review)  
**Date:** 2026-11-01  
**Author:** Engineering Team  
**Subject:** Resolving dual-architecture redundancy between Firebase Firestore and Express/SQLite

---

## Context and Problem Statement

The Balasangham Kannur codebase currently operates on two parallel architectures:
1. **Serverless Cloud Architecture**: React frontend communicates directly with Google Cloud Firestore (`events` and `media` collections) using the Firebase Client Web SDK, authenticated by Firebase Authentication and secured by `firestore.rules`. File uploads stream through Vercel's serverless function (`api/upload.js`) to Cloudinary.
2. **Serverful Architecture**: An Express 5.2.1 application backed by a local SQLite 3 database (`server/data/balasangham.db`), session store (`server/data/sessions.db`), and background REST sync to Firestore (`server/firestoreSync.js`).

Additionally, static JSON records (`src/data/verifiedEvents.ts` and `src/data/mediaCloudinary.json`) provide a third offline fallback layer.

This creates code duplication across data models, validators, and endpoints. To reduce maintenance overhead and prevent synchronization drift, the project must standardize on a single primary data architecture.

---

## Evaluated Options

### Option A: Firestore-Only (Serverless) with Static JSON Fallback

In this architecture, Google Cloud Firestore is the sole primary source of truth. The frontend queries Firestore directly via Firebase Web SDK. Administrative operations authenticate via Firebase Auth. The Express server and SQLite databases are decommissioned. Static pre-seeded JSON files remain bundled as an immutable fallback in case of network severance.

#### Pros:
- **Zero Compute Cost**: Operates entirely within the free tiers of Firebase Hosting, Google Cloud Firestore (50,000 reads/day, 20,000 writes/day), and Vercel. Hosting cost is **$0/month**.
- **Zero Server Maintenance**: No operating system security patches, PM2 process daemons, disk space monitoring, or TLS certificates to manage.
- **Instant Real-Time Reactivity**: `onSnapshot` listeners update the homepage, conference banner, and attendee photo wall live across all visitors without polling or page reloads.
- **Built-in Offline & Caching**: Firebase Web SDK provides automatic IndexedDB client-side persistence and multi-tab synchronization.
- **Declarative Security**: `firestore.rules` enforces key allowlisting, schema types, length limits, and role-based access control at the database engine level.

#### Cons:
- Vendor lock-in to Google Cloud Firebase.
- Front-end bundle includes Firebase Web SDK (~250kB gzipped).

#### What Would Be Deleted:
- `server/` directory (`server/index.js`, `server/db.js`, `server/auth.js`, `server/routes/admin.js`, `server/routes/public.js`, `server/firestoreSync.js`, `server/cloudinary.js`, `server/data/`).
- npm dependencies: `express`, `better-sqlite3`, `better-sqlite3-session-store`, `express-session`, `express-rate-limit`, `cors`, `bcryptjs`, and all associated `@types/*`.
- `api.ts` REST wrapper (replaced by Firestore client services).

#### Migration Steps:
1. Verify all historical events and media records exist in live Firestore (completed via `scripts/migrate_all_to_firestore.mjs`).
2. Update `AdminLoginPage.tsx` and `AdminRoute.tsx` to solely use Firebase Authentication without synchronizing Express session cookies.
3. Remove Express dev server proxy from `vite.config.ts`.
4. Delete `server/` directory and remove backend dependencies from `package.json`.
5. Remove `dev:full` and `server` scripts from `package.json`.

---

### Option B: Express / SQLite as Primary Store

In this architecture, SQLite (`balasangham.db`) is the primary database running inside a persistent Node.js/Express server. The React frontend communicates strictly with Express REST endpoints (`/api/public/...` and `/api/admin/...`). Firestore is removed entirely.

#### Pros:
- **Zero Cloud Vendor Lock-In**: Complete ownership of database file and backend logic; runs on any standard Linux container or VPS.
- **Smaller Frontend Bundle**: Eliminates Firebase Web SDK from browser bundle (saves ~250kB gzipped).
- **Relational SQL Integrity**: Standard SQL queries, foreign keys, and WAL-mode transaction guarantees.

#### Cons:
- **Ongoing Compute & Hosting Costs**: Requires persistent server compute (VPS, Docker container, or cloud container with persistent disk such as DigitalOcean Droplet, Render, or Railway). Costs **$5 to $15/month**. Cannot run on static hosting (Firebase Hosting) or ephemeral serverless (Vercel) because SQLite database files are wiped whenever serverless instances scale down.
- **Operational Maintenance Overhead**: Requires managing Node process uptime, systemd/PM2 daemons, database disk backups, reverse proxies (Nginx), and TLS certificates (Let's Encrypt).
- **No Real-Time Capabilities**: Requires polling or manual WebSocket infrastructure for live updates.
- **No Native Offline Sync**: Requires hand-rolling service workers and IndexedDB caching on the frontend.

#### What Would Be Deleted:
- `src/lib/firebase.ts`, `src/lib/eventsService.ts`, `src/lib/mediaService.ts`.
- `firestore.rules`, `firestore.indexes.json`, `firebase.json`.
- `firebase` and `firebase-admin` npm dependencies.
- `api/upload.js` (uploads would be handled directly by Express `multer`).

#### Migration Steps:
1. Verify all events and media records are fully migrated into `server/data/balasangham.db`.
2. Refactor frontend data fetching in `EventsPage.tsx`, `EventDetailPage.tsx`, and `MediaPage.tsx` to call Express REST endpoints instead of Firestore.
3. Containerize Express application (create `Dockerfile` and `docker-compose.yml`) with persistent volume mount for `server/data/`.
4. Provision VPS or cloud container with persistent disk storage.
5. Decommission Firebase Firestore project and remove rules.

---

## Comparison Matrix

| Factor | Option A: Firestore-Only (Recommended) | Option B: Express/SQLite Primary |
| :--- | :--- | :--- |
| **Monthly Hosting Cost** | **$0 / month** (Within free tier) | **$5–$15 / month** (Requires VPS with persistent volume) |
| **Operational Maintenance** | **Zero** (Managed serverless) | **High** (VPS patches, PM2, disk backups, Nginx) |
| **Real-Time Client Updates** | **Built-in** (`onSnapshot` listeners) | **None** (Requires custom WebSocket or polling) |
| **Offline Client Resilience** | **Native IndexedDB + Static JSON** | **Custom Service Worker required** |
| **Data Integrity & Security** | **Declarative `firestore.rules`** | **Express middleware + custom SQL sanitization** |
| **Frontend Bundle Size** | Larger (+250 kB gzipped for Firebase SDK) | Leaner (-250 kB gzipped) |
| **Portability** | Bound to Google Cloud Platform | Runs on any standard Linux / Docker environment |

---

## Recommendation

**Option A (Firestore-Only)** is strongly recommended.

### Rationale:
1. **Organizational Profile**: Balasangham Kannur is a non-profit progressive children's cultural organization. The platform will be maintained by volunteer technical contributors and district committee staff. Eliminating server management, OS patching, and monthly VPS infrastructure bills aligns directly with the client's interests.
2. **Feature Requirements**: Key features—including live event updates during district conferences, immediate publication of cultural troupe photos, and the SnapShare attendee gallery—benefit directly from Firestore's managed real-time synchronization.
3. **Resilience**: Combining Firestore with pre-bundled static JSON fallbacks guarantees that visitors can view the website, history, and conference details even under spotty mobile network conditions or during temporary cloud disruptions.

---

## Next Steps
Awaiting client / stakeholder review before executing code deletion and architecture consolidation.
