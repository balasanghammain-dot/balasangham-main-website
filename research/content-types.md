# Content Types

## Overview

Content types define the structured data models needed to represent all website content. These are designed for a static site (Phase 1) with future CMS compatibility in mind.

---

## 1. Page Content

**Purpose**: Static informational pages (About, History, Objectives, etc.)

```typescript
interface PageContent {
  slug: string;           // URL slug
  title: string;          // English title
  titleMl?: string;       // Malayalam title (original, if available)
  body: string;           // Main content (English canonical)
  bodyMl?: string;        // Original Malayalam body (if exists)
  lastUpdated: string;    // ISO date
  sourceAttribution?: string;  // Where this info comes from
}
```

**Used by**: About, History, Objectives, Structure, Join, Privacy, Terms

---

## 2. Person

**Purpose**: Leadership, historical figures, notable alumni

```typescript
interface Person {
  name: string;           // English name
  nameMl: string;         // Malayalam name
  role: string;           // Current role/title
  roleMl?: string;        // Malayalam role
  organizationLevel: 'state' | 'district' | 'area' | 'unit' | 'historical';
  period?: string;        // Term or historical period
  biography?: string;     // Brief bio (verified only)
  source: string;         // Verification source
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  isCurrent: boolean;     // Is this a current office bearer?
  // Photo deliberately omitted — only add when verified photos supplied
}
```

**Used by**: Leadership page, Notable Alumni, Historical Pioneers

---

## 3. Program

**Purpose**: Organizational programs and activities

```typescript
interface Program {
  slug: string;
  name: string;           // English name
  nameMl: string;         // Malayalam name
  description: string;    // English description
  category: 'cultural' | 'educational' | 'social' | 'environmental' | 'literary';
  schedule?: string;      // When it occurs (e.g., "April-May annually")
  scope: 'state' | 'district' | 'area' | 'unit';
  isOngoing: boolean;
  activities?: string[];  // List of specific activities
  source: string;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
}
```

**Used by**: Programs page, Homepage programs grid

---

## 4. Event

**Purpose**: Conferences, observances, activities

```typescript
interface Event {
  slug: string;
  title: string;
  titleMl?: string;
  date: string;           // ISO date or date range
  endDate?: string;
  venue?: string;
  venueMl?: string;
  location: string;
  locationMl?: string;
  description: string;
  theme?: string;         // Conference theme/slogan
  themeMl?: string;
  type: 'conference' | 'observance' | 'program' | 'campaign';
  scope: 'state' | 'district' | 'area' | 'unit';
  isUpcoming: boolean;
  source: string;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
}
```

**Used by**: Events page, Homepage featured event

---

## 5. News Item

**Purpose**: Updates, announcements, activity reports

```typescript
interface NewsItem {
  slug: string;
  title: string;
  titleMl?: string;
  date: string;           // ISO date
  category: 'district' | 'state' | 'event' | 'program';
  excerpt: string;        // Brief summary
  body: string;           // Full content
  source?: string;        // External source URL (e.g., Deshabhimani)
  sourceAttribution?: string;
  // No images unless verified and credited
}
```

**Used by**: News page, Homepage latest news

---

## 6. Publication

**Purpose**: Magazines, online publications, souvenirs

```typescript
interface Publication {
  name: string;
  nameMl: string;
  type: 'magazine' | 'online' | 'souvenir' | 'associated';
  description: string;
  publisher?: string;
  frequency?: string;     // e.g., "Monthly"
  url?: string;           // External link if available
  isActive: boolean;
  source: string;
}
```

**Used by**: Publications page

---

## 7. Media Item

**Purpose**: Photos, videos, posters

```typescript
interface MediaItem {
  title: string;
  titleMl?: string;
  type: 'photo' | 'video' | 'poster';
  url: string;            // Image path or YouTube URL
  caption?: string;
  credit?: string;        // Attribution / copyright
  date?: string;
  event?: string;         // Related event
  album?: string;         // Gallery grouping
}
```

**Used by**: Media page, Homepage media preview

---

## 8. Organization Structure Node

**Purpose**: Representing the hierarchical structure

```typescript
interface StructureNode {
  level: 'state' | 'district' | 'area' | 'unit';
  name: string;
  nameMl: string;
  parent?: string;        // Parent node name
  description?: string;
  isVerified: boolean;
}
```

**Used by**: Organization Structure page

---

## 9. Social Link

**Purpose**: Verified social media accounts

```typescript
interface SocialLink {
  platform: 'facebook' | 'instagram' | 'youtube' | 'twitter';
  url: string;
  label: string;          // e.g., "Balasangham Kannur"
  scope: 'kannur' | 'state';
  isVerified: boolean;
}
```

**Used by**: Contact page, Footer, Social icons

---

## 10. Flag Song / Official Text

**Purpose**: Preserving original Malayalam organizational texts

```typescript
interface OfficialText {
  title: string;
  titleMl: string;
  textMl: string;         // Original Malayalam text (NEVER translate)
  transliteration?: string; // Optional romanized version
  translation?: string;   // Optional English meaning
  context: string;        // When/how it's used
  source: string;
}
```

**Used by**: Flag Song display, About page, Homepage teaser

---

## Content Sourcing Rules

| Content Type | Source Requirement |
|---|---|
| Organization facts | Verified from research docs or user-provided KB |
| Historical claims | Must have source citation with confidence level |
| Leadership names | Must match most recent verified conference report |
| Programs | Must be documented in research/programs.md |
| Events | Must have date, venue, and source |
| News | Must have external source or official announcement |
| Photos/Media | Must have attribution; no stock photos as organizational content |
| Contact details | Only publish what's verified; no placeholder phones/emails |
| Malayalam text | Original texts preserved verbatim; never machine-translate official texts |
