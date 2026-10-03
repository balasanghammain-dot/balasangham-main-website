# Balasangham Kannur — Complete Site Map

```
BALASANGHAM KANNUR (ബാലസംഘം കണ്ണൂർ)
│
├── HOME (/)
│   ├── Hero (Identity + Motto + Emblem)
│   ├── Introduction
│   ├── Statistics Ribbon
│   ├── Programs Grid
│   ├── Featured Event
│   ├── Latest News
│   ├── Flag Song Teaser
│   ├── Media Preview
│   ├── Join CTA
│   └── Footer
│
├── ABOUT (/about)
│   ├── Who We Are (/about)
│   │   ├── Organization overview
│   │   ├── Identity & symbols
│   │   ├── Scope & geographic presence
│   │   └── Mottos & slogans (original Malayalam)
│   │
│   ├── History (/about/history)
│   │   ├── 1938: Founding at Kalliasseri
│   │   ├── 1940s: Anti-colonial role & Kayyur
│   │   ├── 1972: Deshabhimani Balasangham
│   │   ├── 1980: Statewide reconstitution
│   │   ├── 1990: Venalthumbikal launch
│   │   ├── 2014-present: Modern era
│   │   └── Source citations per milestone
│   │
│   ├── Objectives (/about/objectives)
│   │   ├── Democratic Agency
│   │   ├── Secularism & Human Fraternity
│   │   ├── Scientific Temper
│   │   ├── Child Rights & Social Protection
│   │   └── Creative Arts & Culture
│   │
│   ├── Organization Structure (/about/structure)
│   │   ├── State Committee
│   │   ├── District Committees (14 districts)
│   │   ├── Area Committees (Kannur: 10+ areas)
│   │   ├── Local Units (20,000+ statewide)
│   │   └── How the democratic structure works
│   │
│   ├── Leadership (/about/leadership)
│   │   ├── Current Kannur District Committee
│   │   │   ├── President: K. Surya
│   │   │   ├── Secretary: M.P. Gokul
│   │   │   ├── Convener: P. Sumeshan
│   │   │   ├── Coordinator: Vishnu Jayan
│   │   │   └── Vice Presidents, Joint Secretaries, Joint Conveners
│   │   ├── State Committee Reference
│   │   │   ├── State Secretary: N. Aadil
│   │   │   ├── State President: Pravisha Pramod
│   │   │   └── State Convener: M. Prakashan Master
│   │   └── Term: 2024-2026 (elected at Pilathara)
│   │
│   └── Notable Alumni (/about/alumni)
│       ├── E.K. Nayanar (First President → Chief Minister)
│       ├── Arya Rajendran (President → Youngest Mayor)
│       ├── M. Vijin (State Secretary → MLA Kalliasseri)
│       ├── V.P. Sanu (→ All India SFI President)
│       └── Dr. V. Sivadasan (→ Member of Parliament)
│
├── PROGRAMS (/programs)
│   ├── Overview grid/cards
│   ├── Venalthumbikal (/programs/venalthumbikal)
│   ├── Venal Kalari (/programs/venal-kalari)
│   ├── Bala Kalolsavam (/programs/bala-kalolsavam)
│   ├── Kilikkoodu Magazine (/programs/kilikkoodu)
│   ├── Shasthra Deepthi (/programs/shasthra-deepthi)
│   ├── Kutti Koottams (/programs/kutti-koottams)
│   ├── Anti-Substance Campaigns (/programs/anti-substance)
│   └── Sodarathwena (/programs/sodarathwena)
│
├── EVENTS (/events)
│   ├── Upcoming Events
│   │   └── Kannur District Conference 2026 (/events/conference-2026)
│   ├── Past Events
│   │   ├── Sodarathwena Sep 2026
│   │   ├── Pinarayi Area Conference Sep 2026
│   │   ├── Venalthumbikal 2026
│   │   └── Kannur District Conference 2024
│   ├── Annual Observances
│   │   ├── Foundation Day (Dec 28)
│   │   ├── Children's Rights Day (Nov 14)
│   │   ├── Hiroshima-Nagasaki Peace Days (Aug 6 & 9)
│   │   ├── Reading Day & Week (Jun 19)
│   │   └── World Environment Day (Jun 5)
│   └── Conference Archive
│       ├── 6th State Conference: Thrissur 2022
│       ├── 5th: Adoor
│       ├── 4th: Perinthalmanna 2016
│       ├── 3rd: Palakkad 2014
│       ├── 2nd: Pilicode
│       └── 1st: Kottayam
│
├── NEWS (/news)
│   ├── Latest Updates (reverse chronological)
│   ├── Categories: District | State | Events | Programs
│   └── Archive by year
│
├── MEDIA (/media)
│   ├── Photo Gallery (albums by event)
│   ├── Video Gallery (YouTube embeds)
│   └── Poster Archive
│
├── PUBLICATIONS (/publications)
│   ├── Kilikkoodu Magazine (കിളിക്കൂട്)
│   ├── Spark Online Magazine (സ്പാർക്ക്)
│   ├── Thathamma (തത്തമ്മ) — Associated
│   └── Conference Souvenirs (സ്മരണികകൾ)
│
├── JOIN US (/join)
│   ├── Who can join (age 6-18)
│   ├── How to join (through local unit)
│   ├── What members do
│   └── Find your local unit (area committee list)
│
├── CONTACT (/contact)
│   ├── Social Media Links
│   │   ├── Facebook: balasangham.kannur
│   │   ├── Facebook: balasangham.kerala
│   │   ├── Instagram: balasanghamkannur_dc
│   │   └── YouTube: balasanghamkerala2817
│   ├── District Committee Info
│   └── Address (when officially provided)
│
└── LEGAL
    ├── Privacy Policy (/privacy)
    ├── Terms of Use (/terms)
    └── Copyright Notice (in footer)
```

---

## Page Count Summary

| Category | Pages |
|---|---|
| Homepage | 1 |
| About (with sub-pages) | 6 |
| Programs (listing + detail) | 9 |
| Events (listing + detail) | Variable (data-driven) |
| News (listing + articles) | Variable (data-driven) |
| Media | 1 (with tabs/sections) |
| Publications | 1 |
| Join Us | 1 |
| Contact | 1 |
| Legal | 2 |
| **Total static pages** | **~23 + dynamic content** |

---

## Routing Strategy (React Router)

```
/                           → HomePage
/about                      → AboutPage
/about/history              → HistoryPage
/about/objectives           → ObjectivesPage
/about/structure            → StructurePage
/about/leadership           → LeadershipPage
/about/alumni               → AlumniPage
/programs                   → ProgramsPage
/programs/:slug             → ProgramDetailPage
/events                     → EventsPage
/events/:slug               → EventDetailPage
/news                       → NewsPage
/news/:slug                 → NewsArticlePage
/media                      → MediaPage
/publications               → PublicationsPage
/join                       → JoinPage
/contact                    → ContactPage
/privacy                    → PrivacyPage
/terms                      → TermsPage
*                           → NotFoundPage (404)
```
