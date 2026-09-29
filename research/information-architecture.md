# Information Architecture

## Design Principles

1. **Identity-first**: Visitors must immediately understand what Balasangham is
2. **Content over features**: Only build what has verified content behind it
3. **District focus with state context**: This is a Kannur district website that acknowledges the statewide organization
4. **Event as component, not container**: The 2026 conference is ONE event, not the site's reason to exist
5. **Bilingual by design**: English canonical + Malayalam (Google Translate for general content, original Malayalam preserved for official texts)
6. **No invented features**: If no verified content exists, mark as "Coming Soon" or omit entirely

---

## Navigation Architecture

### Primary Navigation (Persistent Header)

```
[Logo + Name]  Home  About ▾  Programs  Events  News  Media  Publications  Contact  [EN|ML]
```

### About Submenu
```
About ▾
├── Who We Are
├── History
├── Objectives
├── Organization Structure
├── Leadership
└── Notable Alumni
```

### Mobile Navigation
```
[Hamburger Menu]
├── Home
├── About
│   ├── Who We Are
│   ├── History
│   ├── Objectives
│   ├── Organization Structure
│   ├── Leadership
│   └── Notable Alumni
├── Programs
├── Events
├── News
├── Media
├── Publications
├── Join Us
├── Contact
└── [Language Toggle: EN | മലയാളം]
```

---

## Page Architecture

### Level 0: Homepage
Single-page scroll with sections linking deeper:
- Hero (Organization identity + current highlight)
- Introduction / Who We Are (brief)
- Key Statistics ribbon
- Programs overview (cards → /programs)
- Upcoming Event highlight (→ /events/conference-2026)
- Latest News (→ /news)
- Flag Song teaser (→ /about/flag-song or modal)
- Media highlights (→ /media)
- Contact CTA
- Footer

### Level 1: Section Landing Pages

| Page | URL | Purpose |
|---|---|---|
| About: Who We Are | /about | Organization overview, identity, scope |
| History | /about/history | Timeline from 1938 to present |
| Objectives | /about/objectives | 5 core pillars |
| Organization Structure | /about/structure | State → District → Area → Unit |
| Leadership | /about/leadership | Current Kannur office bearers + state reference |
| Notable Alumni | /about/alumni | Arya Rajendran, M. Vijin, VP Sanu, etc. |
| Programs | /programs | All programs as cards/list |
| Events | /events | Upcoming + past events |
| News | /news | Latest updates and district news |
| Media | /media | Photo gallery, video embeds, posters |
| Publications | /publications | Kilikkoodu, Spark, conference souvenirs |
| Join Us | /join | How to become a member (informational) |
| Contact | /contact | Social links, verified contact info |
| Privacy Policy | /privacy | Privacy and data notice |
| Terms | /terms | Terms of use |

### Level 2: Detail Pages

| Page | URL | Purpose |
|---|---|---|
| Program Detail | /programs/:slug | Individual program page |
| Event Detail | /events/:slug | Individual event page |
| News Article | /news/:slug | Individual news item |

---

## Content Zones Per Page

### Homepage Sections (Top to Bottom)
1. **Hero**: Organization name, motto, flag emblem, brief tagline
2. **Introduction**: 2-3 sentence "Who We Are" with "Learn More" link
3. **Stats Ribbon**: 1M+ members | 20,000+ units | 14 districts | Founded 1938
4. **Programs Grid**: 4-6 program cards with icons and brief descriptions
5. **Featured Event**: Conference 2026 card (when current) or next upcoming event
6. **Latest News**: 3 most recent news items
7. **Flag Song**: Brief reference with "Read Full Song" link or modal
8. **Media Preview**: 3-4 recent photos/posters
9. **Join CTA**: "Become a member" informational block
10. **Footer**: Navigation, social, contact, legal, language

### About Page
- Organization description (English canonical)
- Scope and geographic presence
- Identity and symbols (flag, dove, star)
- Mottos and slogans (original Malayalam preserved)
- Links to sub-pages (History, Objectives, Structure, Leadership, Alumni)

### History Page
- Timeline format: 1938 → 1940s → 1972 → 1980 → 1990 → 2014-2026
- Each milestone: date, description, significance
- Historical figures mentioned in context
- Source attribution for each claim

### Programs Page
- Grid or list of all verified programs
- Each card: name (ML + EN), brief description, season/timing
- Click through to detail page

### Events Page
- Two sections: Upcoming Events | Past Events
- Annual observances listed separately
- Conference archive

### News Page
- Reverse chronological list
- Category filter (District | State | Events)
- Each item: title, date, brief excerpt, source

### Media Page
- Photo gallery (albums by event/year)
- Video embeds (YouTube channel integration)
- Poster archive

### Publications Page
- Kilikkoodu magazine description
- Spark online magazine link
- Thathamma reference
- Conference souvenir tradition

### Contact Page
- Verified social media links
- District committee info (what's verified)
- Placeholder for physical address/phone when provided
- No contact form in Phase 1 (no backend)

---

## URL Structure

```
/                           → Homepage
/about                      → Who We Are
/about/history              → History & Milestones
/about/objectives           → Mission & Objectives
/about/structure            → Organization Structure
/about/leadership           → Current Leadership
/about/alumni               → Notable Alumni
/programs                   → All Programs
/programs/:slug             → Program Detail
/events                     → Events Listing
/events/:slug               → Event Detail
/news                       → News & Updates
/news/:slug                 → News Article
/media                      → Gallery & Videos
/publications               → Publications
/join                       → How to Join
/contact                    → Contact Information
/privacy                    → Privacy Policy
/terms                      → Terms of Use
```

---

## Navigation Priority (Left to Right)

1. **Home** — entry point
2. **About** — identity and trust
3. **Programs** — what the org does
4. **Events** — what's happening
5. **News** — ongoing activity
6. **Media** — visual proof
7. **Publications** — intellectual output
8. **Contact** — how to reach

This order follows the "identity → activity → engagement" user journey pattern observed across all benchmarked organizations.
