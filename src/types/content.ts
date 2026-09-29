export type Language = 'en' | 'ml';

export type SourceType = 'official' | 'historical-record' | 'poster-artwork' | 'editorial' | 'news' | 'social';

export interface ContentSource {
  type: SourceType;
  verified: boolean;
  referenceDoc?: string;
  url?: string;
  notes?: string;
  lastVerified?: string;
}

export interface LocalizedText {
  en: string;
  ml: string;
  source?: ContentSource;
}

export interface ArchiveImage {
  id: string;
  src: string;
  thumbnail: string;
  alt: LocalizedText;
  caption: LocalizedText;
  category: 'poster' | 'backdrop' | 'historical';
  dimensions: { width: number; height: number };
  source?: ContentSource;
}

export interface FlagSongStanza {
  stanzaNumber: number;
  malayalamLines: string[];
  poeticTranslationLines: string[];
}

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
