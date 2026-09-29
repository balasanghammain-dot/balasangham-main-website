# BALASANGHAM KANNUR — COMPLETE WEBSITE SPECIFICATION

## Master Blueprint for Implementation

**Document Version**: 1.0
**Research Date**: September 28, 2026
**Project**: Balasangham Kannur District Committee Website
**Tech Stack**: React + TypeScript + Vite + Tailwind CSS
**Language Strategy**: English canonical + Malayalam (Google Translate + original preserved texts)

---

## 1. Executive Summary

This specification defines the complete information architecture, content structure, and feature set for the Balasangham Kannur organization website. It is based on:

- Benchmarking 8 real organization websites across children's, youth, scouting, nonprofit, and mass organization sectors
- Verified research on Balasangham's history, structure, programs, events, leadership, and publications
- User journey analysis for 7 distinct visitor types
- Feature inventory of 80 website features classified by priority

The website should present Balasangham Kannur as a **complete organization** — not a conference landing page, not a political campaign site, and not an empty shell waiting for content.

**Key principle**: Only verified information becomes website content. Unknown information is marked as gaps, not invented.

---

## 2. What a Complete Organization Website Normally Contains

Based on studying BSG India, BGCA, WOSM, Bal Raksha Bharat, SFI, DYFI, KSSP, and UNICEF:

**Universal features** (present in 7/8 organizations):
- About / Who We Are
- Mission / Objectives
- Leadership / Office Bearers
- Programs / Activities
- Events
- News / Updates
- Contact + Social Media
- Footer with navigation

**Very common features** (5-6/8):
- History
- Organization structure
- Publications / Reports
- Photo/Video gallery
- Privacy / Legal pages

**Common features** (3-4/8):
- Membership information
- Document library
- Search
- FAQ
- Multilingual support
- Newsletter

**Sector-specific** (not universal):
- Donation/fundraising — nonprofits only, NOT mass organizations
- Online shop — large orgs only
- Member login portals — large orgs only
- Role-based routing — complex sites only

---

## 3. Research Methodology

1. **Web search**: Searched for Balasangham's history, structure, programs, publications, and digital presence using English, Malayalam, and organization-specific terms
2. **Website analysis**: Fetched and analyzed full navigation structures of BSG India, BGCA, WOSM, and Bal Raksha Bharat
3. **Existing research integration**: Incorporated verified content from 10 existing research documents in the project
4. **Source verification**: Every claim tagged with source and confidence level (HIGH/MEDIUM/LOW/UNVERIFIED)
5. **Feature mapping**: Each discovered feature evaluated for Balasangham relevance before inclusion

---

## 4. Organizations Researched

| Organization | Type | Country | Key Learnings |
|---|---|---|---|
| BSG India | Children's scouting | India | Deep governance, age groups, circulars, documents, multiple portals |
| BGCA | Youth development | USA | Role-based routing, impact stats, alumni, clean IA |
| WOSM | International scouting | Global | 4-language support, regional tabs, event types, child safety |
| Bal Raksha Bharat | Child rights nonprofit | India | Interactive map, FAQ, campaigns, donor-focused |
| SFI | Student mass org | India | District units, conference docs, ideological documents |
| DYFI | Youth mass org | India | State units, campaign tracking, conference reports |
| KSSP | People's science | India (Kerala) | District pages, science publications, Malayalam content |
| UNICEF | Children's intl org | Global | Research library, country pages, comprehensive reports |

Full comparison matrix: See `research/organization-website-benchmark.md`

---

## 5. Common Website Features (Cross-Organization)

See `research/website-feature-inventory.md` for the complete 80-feature inventory.

Summary: 35 REQUIRED, 19 RECOMMENDED, 10 OPTIONAL, 11 FUTURE, 5 NOT APPROPRIATE.

---

## 6. Balasangham-Relevant Features

### Included (with verified content)
- Organization identity (name, emblem, motto, symbols)
- History (1938–present, 8 verified milestones)
- Objectives (5 documented pillars)
- Organization structure (State → District → Area → Unit)
- Leadership (verified Kannur committee + state reference)
- Programs (7 verified active programs)
- Events (upcoming conference + 5 past events + 6 annual observances)
- Publications (Kilikkoodu, Spark, Thathamma reference)
- Social media (4 verified accounts)
- Bilingual support (EN + ML)

### Excluded (with reason)
- Donation/fundraising: Not a charity, no verified donation mechanism
- Online membership: No online system exists
- Job listings: Not applicable
- Press releases: District-level org doesn't issue formal press releases
- Financial reports: Not publicly documented
- Chat widget: No real-time staff
- User accounts: No verified need

---

## 7. Final Information Architecture

See `research/information-architecture.md` for full details.

### Primary Navigation
```
Home | About ▾ | Programs | Events | News | Media | Publications | Contact | [EN|ML]
```

### About Submenu
```
Who We Are | History | Objectives | Organization Structure | Leadership | Notable Alumni
```

---

## 8. Final Sitemap

See `research/balasangham-site-map.md` for the complete tree.

**Summary**: ~23 static pages + dynamic content (news articles, event details, program details)

### Route Structure
```
/                    Homepage
/about               Who We Are
/about/history       History & Milestones
/about/objectives    Mission & Objectives
/about/structure     Organization Structure
/about/leadership    Current Leadership
/about/alumni        Notable Alumni
/programs            All Programs
/programs/:slug      Program Detail
/events              Events Listing
/events/:slug        Event Detail
/news                News & Updates
/news/:slug          News Article
/media               Gallery & Videos
/publications        Publications
/join                How to Join
/contact             Contact
/privacy             Privacy Policy
/terms               Terms of Use
```

---

## 9. Main Navigation

| Position | Item | URL | Type |
|---|---|---|---|
| 1 | Home | / | Link |
| 2 | About | /about | Dropdown |
| 3 | Programs | /programs | Link |
| 4 | Events | /events | Link |
| 5 | News | /news | Link |
| 6 | Media | /media | Link |
| 7 | Publications | /publications | Link |
| 8 | Contact | /contact | Link |
| Right | EN \| ML | — | Language toggle |

Mobile: Hamburger menu with full navigation tree.

---

## 10. Homepage Sections

Top to bottom:

| # | Section | Content | Source |
|---|---|---|---|
| 1 | Hero | Organization name (EN + ML), motto, white flag with red star, brief tagline | Verified |
| 2 | Introduction | 2-3 sentence "Who We Are" + "Learn More" link | Verified |
| 3 | Stats Ribbon | 1M+ members \| 20,000+ units \| 14 districts \| Founded 1938 | Verified |
| 4 | Programs Grid | 4-6 program cards (Venalthumbikal, Venal Kalari, Bala Kalolsavam, Kilikkoodu, Shasthra Deepthi, Kutti Koottams) | Verified |
| 5 | Featured Event | Conference 2026 card — date, venue, theme | Verified |
| 6 | Latest News | 3 most recent items (Sodarathwena, Pinarayi Area Conference, etc.) | Verified |
| 7 | Flag Song | Teaser with opening line + "Read Full" link/modal | User-provided |
| 8 | Media Preview | 3-4 visual items (posters, photos if available) | Needs assets |
| 9 | Join CTA | "Children ages 5-16 can join through local units" | Verified |
| 10 | Footer | Navigation, social, contact, legal, language | Standard |

---

## 11. About Structure

### Who We Are (/about)
- Full organization description
- Scope: 1M+ members, 20,000+ units, 14 districts
- Target audience: children ages 5-16
- Identity: progressive, secular, democratic children's cultural and social organization
- Official symbols: white flag with red star, white dove
- Mottos: "പഠനം, മനനം, ചലനം" / "പഠിക്കുക, പോരാടുക, വളരുക"
- Source: `research/organization.md`

---

## 12. History Structure

### Timeline (/about/history)

| Year | Milestone | Confidence |
|---|---|---|
| 1938 | Founded as Desheeya Balasangham at Kalliasseri, Kannur. First President: E.K. Nayanar | HIGH |
| 1940-43 | Anti-colonial role; Kayyur martyrdom connection (Chirukandan, Choorukkadan Krishnan Nair) | HIGH |
| 1972 | Re-established as Deshabhimani Balasangham | MEDIUM |
| 1980 | Statewide reconstitution with modern constitution, flag, and motto | HIGH |
| 1990 | Launch of Venalthumbikal traveling children's theater | HIGH |
| 2014 | 3rd State Conference, Palakkad | HIGH |
| 2016 | 4th State Conference, Perinthalmanna | HIGH |
| 2022 | 6th State Conference, Thrissur | HIGH |
| 2024 | Kannur District Conference, Pilathara | HIGH |
| 2026 | Kannur District Conference returns to Kalliasseri (birthplace) | HIGH |

Source: `research/history.md`

---

## 13. Objectives Structure

### Five Core Pillars (/about/objectives)

1. **Democratic Agency**: Children elect their own leadership, formulate demands, lead discussions
2. **Secularism & Human Fraternity**: Bringing children together irrespective of religion, caste, gender, economic status
3. **Scientific Temper**: Astronomy camps, environmental observation, dismantling superstition
4. **Child Rights & Social Protection**: Vigilance against child labor, abuse; anti-drug campaigns
5. **Creative Arts & Culture**: Street theater, vacation camps, art festivals; inclusion over competition

Source: `research/objectives.md`

---

## 14. Programs Structure

### Verified Programs (/programs)

| Program | Malayalam Name | Category | Schedule | Scope |
|---|---|---|---|---|
| Venalthumbikal | വേനൽത്തുമ്പികൾ | Cultural | April-May (annual) | State |
| Venal Kalari | വേനൽ കളരി | Educational | April-May (annual) | Area/Unit |
| Bala Kalolsavam | ബാല കലോത്സവം | Cultural | Oct-Dec (annual) | Unit → State |
| Kilikkoodu Magazine | കിളിക്കൂട് | Literary | Monthly | State |
| Shasthra Deepthi | ശാസ്ത്ര ദീപ്തി | Educational | Ongoing | District |
| Kutti Koottams | കുട്ടിക്കൂട്ടങ്ങൾ | Social | Weekly/fortnightly | Unit |
| Anti-Substance Campaigns | ലഹരിവിരുദ്ധ ജാഗ്രത | Social | Campaign-based | State |
| Sodarathwena | സോദരത്വേന | Social | Specific dates | State |

Each program gets a detail page with: name (EN + ML), description, activities, schedule, scope.

Source: `research/programs.md`

---

## 15. Events Structure

### Event Types (/events)

1. **Conferences** (District, State) — biennial/triennial delegate assemblies
2. **Annual Observances** — Foundation Day, Children's Rights Day, Peace Days, Reading Week, Environment Day
3. **Programs** — Venalthumbikal, Bala Kalolsavam, camps
4. **Campaigns** — Anti-substance, Sodarathwena, human chains

### Current Highlight
- **Kannur District Conference 2026**: October 10-11, Kalliasseri, PCR Bank Auditorium
- Theme: "പോരാട്ടത്തിന്റെ ബാല്യം" (Childhood of Struggle)

Source: `research/events.md`, `research/current-updates.md`

---

## 16. News Structure

### Categories (/news)
- District Updates (Kannur-specific)
- State Updates (statewide org news)
- Event Reports
- Program Reports

### Initial Content (Verified)
1. Sodarathwena secular gatherings (Sep 22, 2026) — Source: Deshabhimani
2. Pinarayi Area Conference (Sep 6, 2026) — Source: Official announcement
3. Kannur District Conference 2024 proceedings — Source: Deshabhimani
4. Venalthumbikal 2026 tour — Source: Annual program

---

## 17. Publications Structure

### Verified Publications (/publications)

| Publication | Type | Status | Publisher |
|---|---|---|---|
| Kilikkoodu (കിളിക്കൂട്) | Monthly magazine | Active | Balasangham State Committee |
| Spark (സ്പാർക്ക്) | Online magazine | Active | Balasangham |
| Thathamma (തത്തമ്മ) | Children's magazine | Associated (Deshabhimani) | Not Balasangham |
| Conference Souvenirs | Commemorative volumes | Per conference | District/State committees |

Source: `research/publications.md`

---

## 18. Gallery / Media Structure

### Sections (/media)
- **Photo Gallery**: Albums by event (when photos supplied)
- **Video Gallery**: YouTube embeds from official channel
- **Poster Archive**: Conference and event posters

### YouTube Channel
- URL: https://www.youtube.com/@balasanghamkerala2817
- Content: Cultural songs, play recordings, jatha clips

**Note**: Media page requires actual assets (photos, posters). Do not populate with stock images or unattributed content.

---

## 19. Documents Structure

**Status**: OPTIONAL / FUTURE

No verified public documents available for download. Constitution, rules, and official reports are not confirmed as publicly shareable.

**Recommendation**: Omit from Phase 1. Add when official documents are supplied for publication.

---

## 20. Leadership Structure

### Current Kannur District Committee (/about/leadership)

Elected October 2024 at Pilathara. Term: 2024-2026.

| Role | Name | Malayalam |
|---|---|---|
| District President | K. Surya | കെ. സൂര്യ |
| District Secretary | M.P. Gokul | എം. പി. ഗോകുൽ |
| District Convener | P. Sumeshan | പി. സുമേശൻ |
| District Coordinator | Vishnu Jayan | വിഷ്ണുജയൻ |
| Vice Presidents | Darshana Sanoj, Amal Prem | ദർശന സനോജ്, അമൽ പ്രേം |
| Joint Secretaries | K.V. Aadith, Devika S. Dev | കെ. വി. ആദിത്ത്, ദേവിക എസ്. ദേവ് |
| Joint Conveners | T. Satheesh Kumar, P.K. Sheela | ടി. സതീഷ് കുമാർ, പി. കെ. ഷീല |

Source: Deshabhimani (Oct 7, 2024). Confidence: HIGH.

### State Committee Reference

| Role | Name |
|---|---|
| State Secretary | N. Aadil |
| State President | Pravisha Pramod |
| State Convener | M. Prakashan Master (Ex-MLA) |

---

## 21. Contact Structure

### Verified Contact Information (/contact)

**Social Media**:
| Platform | Account | URL |
|---|---|---|
| Facebook (Kannur) | Balasangham Kannur | https://www.facebook.com/balasangham.kannur/ |
| Facebook (Kerala) | Balasangham Kerala | https://www.facebook.com/balasangham.kerala/ |
| Instagram | @balasanghamkeralam | https://www.instagram.com/balasanghamkeralam/ |
| YouTube | Balasangham Kerala | https://www.youtube.com/@balasanghamkerala2817 |

**Unverified (NOT to be published)**:
- Physical address: Only "Kannur" known — no street address
- Email: Not found
- Phone: Not found

**Recommendation**: Show verified social links prominently. Add physical contact details when officially provided. Do NOT invent placeholder contact information.

---

## 22. Membership / Participation

### Verified Information (/join)
- **Age range**: Children 5-16 years
- **How to join**: Through local neighborhood or school units
- **Unit structure**: 20,000+ units across Kerala
- **Democratic process**: Children elect their own unit leaders
- **Adult role**: Conveners/mentors in supportive capacity only

### NOT Verified
- Online membership registration
- Membership fees
- Membership card/ID
- Specific eligibility requirements beyond age

**Recommendation**: Create an informational "Join Us" page explaining what Balasangham is and directing people to local units via area committees. Do NOT create a registration form.

---

## 23. Search

**Phase 1**: No site search. Content volume is small enough for navigation.

**Future**: When content grows (50+ news items, many events), implement client-side search using:
- Page titles and descriptions
- News article content
- Event names and descriptions
- Program names

---

## 24. Archives

### Implemented as Sections
- **Conference Archive**: State conferences 1-6 listed in Events
- **News Archive**: Date-based with year filtering
- **Event Archive**: Past events section

### Future
- Publication archive (when digital files available)
- Photo archive (when historical photos supplied)

---

## 25. Multilingual Strategy

### Architecture
- **English**: Canonical website content
- **Malayalam**: Google Translate for general content
- **Language Toggle**: Persistent in header, accessible from every page

### Original Malayalam (NEVER machine-translate)
The following must remain in original Malayalam, displayed alongside any English translation:

1. **Flag Song** (പതാകഗാനം): "ഉണരുക ഉയരുക ശുഭ്രപതാകേ..."
2. **Mottos**: "പഠനം, മനനം, ചലനം" / "പഠിക്കുക, പോരാടുക, വളരുക"
3. **Conference Theme**: "പോരാട്ടത്തിന്റെ ബാല്യം"
4. **Official Names**: ബാലസംഘം, കണ്ണൂർ ജില്ലാ കമ്മിറ്റി
5. **Event Titles** in original Malayalam
6. **Program Names** in original Malayalam
7. **Office bearer names** in Malayalam script
8. **Slogans and formulations** from official sources

### Implementation
```
lang="en" (default)
lang="ml" (Malayalam mode)

Google Translate:
- Applied to English canonical text
- Skipped for elements marked data-notranslate or class="notranslate"
- Original Malayalam content marked with notranslate to prevent double-translation
```

### Content Disclaimer
When in Malayalam mode, display a small notice: "This content is machine-translated. Original Malayalam texts are preserved as-is."

---

## 26. SEO

### Structured Data
- **Organization Schema**: Name, founding date, logo, social links
- **Event Schema**: Conference 2026 (date, location, description)
- **Article Schema**: News items (date, headline)
- **BreadcrumbList Schema**: For deep pages

### Meta Tags
- Unique `<title>` per page: "Page Name — Balasangham Kannur"
- Meta description per page
- Open Graph tags (og:title, og:description, og:image, og:url)
- `hreflang` tags when Malayalam version available
- Canonical URLs

### Technical SEO
- `sitemap.xml` generated from routes
- `robots.txt` allowing all crawlers
- Clean URL structure (no query params for navigation)
- Semantic HTML (h1-h6 hierarchy, article, nav, main, footer)

---

## 27. Accessibility

### Requirements
- **WCAG 2.1 Level AA** as target
- Keyboard navigation for all interactive elements
- Skip-to-content link
- Focus visible indicators
- Color contrast ratio ≥ 4.5:1 for text
- Alt text for all images
- `lang` attribute on HTML element (and `lang="ml"` for Malayalam blocks)
- Aria labels for navigation, buttons, toggles
- Reduced motion support (`prefers-reduced-motion`)
- Form labels (when forms added)
- Responsive text sizing (no fixed px for body text)

---

## 28. Performance

### Targets
- Lighthouse Performance score ≥ 90
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Total Blocking Time < 200ms

### Strategies
- Image optimization: WebP format, responsive `srcset`, lazy loading
- Font loading: `font-display: swap`, subset Malayalam fonts
- Code splitting: Route-based lazy loading
- Minimal JavaScript: Tailwind CSS (purged), no heavy libraries
- Video: YouTube embed (no self-hosted video)
- Static generation: Pre-rendered HTML where possible

---

## 29. Security / Privacy

### Phase 1 (No Backend)
- No user data collection
- No cookies beyond Google Translate
- No analytics tracking (add if requested later)
- Privacy policy explains: what data is NOT collected, Google Translate usage
- HTTPS enforced (deployment platform)
- No external scripts beyond Google Translate and YouTube embed

### Future (If Forms/Accounts Added)
- CSRF protection
- Input validation and sanitization
- Rate limiting
- No unnecessary personal data collection
- Data minimization principle

---

## 30. Future CMS / Content Model

### Recommended Approach
Phase 1: Static data files (TypeScript objects) for all content.
Phase 2: Headless CMS (e.g., Sanity, Strapi, or simple JSON API) for:

| Content Type | CMS Priority |
|---|---|
| News/Updates | Phase 2 — most frequently changing |
| Events | Phase 2 — time-sensitive |
| Media/Gallery | Phase 2 — asset management |
| Programs | Low — rarely changes |
| Leadership | Low — changes every 2-3 years |
| About/History | Very low — rarely changes |

### Content Model Types
See `research/content-types.md` for full TypeScript interfaces.

---

## 31. Phase 1 Features

Everything that ships in the initial release:

1. Homepage (hero, intro, stats, programs, featured event, news, flag song, footer)
2. About / Who We Are
3. History (timeline)
4. Objectives (5 pillars)
5. Organization Structure
6. Leadership (Kannur committee + state reference)
7. Programs listing + 8 program detail pages
8. Events listing (upcoming + past)
9. Event detail (Conference 2026)
10. News page (4 verified items)
11. Publications page
12. Contact page (social links)
13. Bilingual toggle (EN/ML)
14. Original Malayalam text preservation
15. Privacy Policy
16. Terms of Use
17. Responsive mobile design
18. SEO basics (meta, OG, schema)
19. Accessibility (WCAG 2.1 AA target)
20. 404 page
21. Navbar + Footer

---

## 32. Phase 1.5 Features

Enhance after initial launch:

1. Notable Alumni page
2. Media/Photo gallery (when photos supplied)
3. Video gallery (YouTube embeds)
4. Poster archive
5. Annual observances detail
6. Conference archive
7. Join Us page (membership info)
8. Kannur area committees directory
9. News categories/filter
10. Accessibility statement
11. Content disclaimer for translations
12. Breadcrumb navigation

---

## 33. Future Features

Requires infrastructure or content that doesn't yet exist:

1. Contact form (needs backend)
2. Global site search (needs search index)
3. Event registration (needs backend + database)
4. Newsletter signup (needs email service)
5. CMS for dynamic content (needs CMS platform)
6. Interactive Kannur district map (needs location data)
7. Document download center (needs documents)
8. Publication digital archive (needs digitized files)
9. Event calendar view (needs frequent events)
10. RSS feed

---

## 34. Missing / Unknown Information

| Information | Status | Workaround |
|---|---|---|
| Physical office address | Not verified | Show "Kannur, Kerala" only |
| Email address | Not found | Omit; show social links |
| Phone number | Not found | Omit; show social links |
| Leader photographs | Not available | Text-only leadership listing |
| Historical photographs | Not available | Text-only history timeline |
| Activity photos | Not available | Placeholder section "Coming Soon" or omit |
| Constitution document | Not publicly available | Omit documents section |
| Kilikkoodu subscription link | Not found | Describe magazine, no subscription CTA |
| Spark magazine URL | Not found | Mention existence, no link |
| Complete area committee list | Partial (10/~18) | List known, note incomplete |
| Unit-level data | Not available | Describe structure, no directory |
| Bala Kalolsavam 2026 dates | Not found | List as annual program |
| Exact member count in Kannur | Not verified | Use state-level "1M+" stat |

---

## 35. Research Sources

See `research/sources.md` for the complete source registry.

### Primary Categories
- **User-provided**: Organization KB, conference poster, flag song
- **Wikipedia**: English and Malayalam articles on Balasangham
- **News**: Deshabhimani daily newspaper (multiple articles)
- **Official records**: Kerala Legislature, Parliament of India
- **Social media audit**: Facebook, Instagram, YouTube channels
- **Benchmark websites**: 8 organization websites analyzed

---

## APPENDIX A: Visual Identity Notes

### Existing Design Elements (from project)
- White flag with blood-red five-pointed star (SVG emblem exists)
- Red as primary accent color
- White as peace/purity color
- Sunburst backdrop motif
- Children's silhouettes motif
- Peace dove motif

### Design Principles
1. The website is the ORGANIZATION's website — not a conference poster
2. Conference poster artwork can inform visual identity but should not dominate
3. Red + white as primary palette, with supporting neutrals
4. Typography: clean, readable, bilingual-friendly (Latin + Malayalam)
5. Photography/illustration style: documentary, authentic — no stock photos as organizational content
6. Mobile-first responsive design

---

## APPENDIX B: Event Positioning

**The 2026 Kannur District Conference is ONE EVENT within the website — not the website's reason to exist.**

- Conference appears as: featured event card on homepage, detail page under /events
- Conference does NOT define: site navigation, overall visual identity, homepage structure
- After the conference concludes: it moves to past events, and the next upcoming event takes its place
- The website continues to serve as the Balasangham Kannur organization website regardless of any specific event

---

## APPENDIX C: Content Verification Commitment

This specification distinguishes between:

| Type | Treatment |
|---|---|
| **Verified Fact** | Published as website content with source attribution where relevant |
| **Common Pattern** | Evaluated for Balasangham relevance before inclusion |
| **Unverified Claim** | NOT published; listed in "Missing Information" section |
| **Invented Content** | NEVER created; no fake programs, statistics, contacts, or committee names |

The implementation agent must maintain this distinction throughout development.
