import { ArchiveImage, LocalizedText, ContentSource } from '../types/content';

const officialSource: ContentSource = {
  type: 'official',
  verified: true,
  referenceDoc: 'docs/EVENT_CONFERENCE_2026.md',
  notes: 'Verified directly from Balasangham Kannur District Committee conference announcements'
};

const posterSource: ContentSource = {
  type: 'poster-artwork',
  verified: true,
  referenceDoc: 'example images for design/WhatsApp Image 2026-09-24 at 6.56.09 PM.jpeg',
  notes: 'Extracted directly from authentic supplied poster artwork'
};

const historySource: ContentSource = {
  type: 'historical-record',
  verified: true,
  referenceDoc: 'docs/ORGANIZATION_KB.md',
  notes: 'Historical record of Balasangham founding on December 28, 1938 in Kalliasseri'
};

export const editorialSource: ContentSource = {
  type: 'editorial',
  verified: true,
  notes: 'Authorized editorial English translation of authentic Malayalam text'
};

export const conferenceVerifiedData = {
  title: {
    ml: 'ബാലസംഘം കണ്ണൂർ ജില്ലാ സമ്മേളനം',
    en: 'Balasangham Kannur District Conference',
    source: posterSource
  } as LocalizedText,

  theme: {
    ml: 'പോരാട്ടത്തിന്റെ ബാല്യം ✊🏻',
    en: 'Childhood of Struggle ✊🏻',
    source: {
      type: 'poster-artwork',
      verified: true,
      notes: 'Malayalam theme verified from poster; English is authorized editorial translation'
    }
  } as LocalizedText,

  dates: {
    ml: '2026 ഒക്ടോബർ 10, 11',
    en: '10–11 October 2026',
    source: posterSource
  } as LocalizedText,

  location: {
    ml: 'കല്ല്യാശ്ശേരി, കണ്ണൂർ',
    en: 'Kalliasseri, Kannur, Kerala',
    source: posterSource
  } as LocalizedText,

  venueAuditorium: {
    ml: 'പിസിആർ ബാങ്ക് ഓഡിറ്റോറിയം, കല്ല്യാശ്ശേരി',
    en: 'PCR Bank Auditorium, Kalliasseri',
    source: officialSource
  } as LocalizedText,

  signature: {
    ml: '> ബാലസംഘം കണ്ണൂർ',
    en: '> Balasangham Kannur',
    source: posterSource
  } as LocalizedText,

  scheduleAdvisory: {
    ml: 'വിശദമായ സെഷൻ സമയവിവരപ്പട്ടിക ഔദ്യോഗികമായി അംഗീകരിക്കപ്പെടുന്ന മുറയ്ക്ക് പ്രസിദ്ധീകരിക്കും. എല്ലാ ഏരിയകളിൽ നിന്നുമുള്ള തിരഞ്ഞെടുക്കപ്പെട്ട പ്രതിനിധികൾ ഒക്ടോബർ 10 രാവിലെ കല്ല്യാശ്ശേരിയിലെ സ്വീകരണ കൗണ്ടറിൽ റിപ്പോർട്ട് ചെയ്യേണ്ടതാണ്.',
    en: 'Detailed session-by-session schedules will be updated upon official ratification. Elected delegates from all Area Committees of Kannur should report at the Kalliasseri reception desk on the morning of October 10.',
    source: officialSource
  } as LocalizedText,

  transitAdvisory: {
    bus: {
      ml: 'കണ്ണൂർ - പയ്യന്നൂർ റൂട്ടിൽ സർവീസ് നടത്തുന്ന എല്ലാ ബസുകളും കല്ല്യാശ്ശേരി ജംഗ്ഷനിൽ നിർത്തും.',
      en: 'Regular buses along the Kannur – Payyanur highway stop at Kalliasseri Junction.',
      source: officialSource
    } as LocalizedText,
    rail: {
      ml: 'അടുത്തുള്ള റെയിൽവേ സ്റ്റേഷനുകൾ: കണ്ണൂർ (12 കി.മീ), വളപട്ടണം (5 കി.മീ), കണ്ണാപുരം (4 കി.മീ).',
      en: 'Nearest railway stations: Kannur (12 km), Valapattanam (5 km), Kannapuram (4 km).',
      source: officialSource
    } as LocalizedText
  },

  kalliasseriHeritageNarrative: {
    heading: {
      ml: '1938-ന്റെ ജന്മഭൂമിയിലേക്ക് വീണ്ടും',
      en: 'Returning to the Birthplace of 1938',
      source: historySource
    } as LocalizedText,
    summary: {
      ml: '1938 ഡിസംബർ 28-ന് വടക്കേ മലബാറിലെ കർഷക പോരാട്ടങ്ങളുടെ കനലുകളിൽ നിന്നാണ് കല്ല്യാശ്ശേരിയിൽ ബാലസംഘം രൂപംകൊണ്ടത്. പി. കൃഷ്ണപിള്ള, എ.കെ.ജി, ഇ.എം.എസ്, കെ.പി.ആർ. ഗോപാലൻ, ഇ.കെ. നായനാർ തുടങ്ങിയ ധീരനേതാക്കളുടെ പ്രചോദനത്തിൽ ആരംഭിച്ച ഈ കുട്ടികളുടെ പ്രസ്ഥാനം, 88 വർഷങ്ങൾക്ക് ശേഷം വീണ്ടും അതിന്റെ ചരിത്രപരമായ ജന്മഭൂമിയിൽ ജില്ലാ സമ്മേളനത്തിനായി സംഗമിക്കുന്നു.',
      en: 'On December 28, 1938, amidst the historic peasant awakening of North Malabar, Balasangham was born in Kalliasseri. Guided by pioneering freedom fighters including P. Krishna Pillai, A.K. Gopalan (AKG), E.M.S. Namboodiripad, K.P.R. Gopalan, and the young E.K. Nayanar, this movement gave children dignity and voice. After 88 years of continuous struggle and cultural elevation, the Kannur District Conference returns to its historic birthplace.',
      source: historySource
    } as LocalizedText
  }
};

export const archiveImages: ArchiveImage[] = [
  {
    id: 'poster-main',
    src: '/images/conference-2026/poster-main.jpg',
    thumbnail: '/images/conference-2026/poster-main-thumb.jpg',
    alt: {
      ml: 'ബാലസംഘം കണ്ണൂർ ജില്ലാ സമ്മേളനം 2026 ഔദ്യോഗിക പോസ്റ്റർ',
      en: 'Official poster of Balasangham Kannur District Conference 2026',
      source: posterSource
    },
    caption: {
      ml: 'ഔദ്യോഗിക പ്രചാരണ പോസ്റ്റർ: പോരാട്ടത്തിന്റെ ബാല്യം: 2026 ഒക്ടോബർ 10, 11 കല്ല്യാശ്ശേരി',
      en: 'Official campaign poster: Childhood of Struggle, 10–11 October 2026, Kalliasseri',
      source: posterSource
    },
    category: 'poster',
    dimensions: { width: 780, height: 1040 },
    source: posterSource
  },
  {
    id: 'poster-secondary',
    src: '/images/conference-2026/poster-secondary.jpg',
    thumbnail: '/images/conference-2026/poster-secondary-thumb.jpg',
    alt: {
      ml: 'ജില്ലാ സമ്മേളന പ്രചാരണ ചിത്രരചന',
      en: 'District Conference campaign visual illustration',
      source: posterSource
    },
    caption: {
      ml: 'പ്രചാരണ ചിത്രരചന: പതാകയേന്തി നിൽക്കുന്ന ബാല്യത്തിന്റെ ദൃഢനിശ്ചയം',
      en: 'Campaign illustration: Resolute childhood holding the red-star flag',
      source: posterSource
    },
    category: 'poster',
    dimensions: { width: 900, height: 1200 },
    source: posterSource
  },
  {
    id: 'poster-creative',
    src: '/images/conference-2026/poster-creative.jpg',
    thumbnail: '/images/conference-2026/poster-creative-thumb.jpg',
    alt: {
      ml: 'സമ്മേളന സാംസ്കാരിക പോസ്റ്റർ',
      en: 'Conference cultural campaign poster',
      source: posterSource
    },
    caption: {
      ml: 'സാംസ്കാരിക പ്രമേയ പോസ്റ്റർ: സർഗ്ഗാത്മകതയും പ്രതിരോധവും',
      en: 'Cultural theme artwork: Creativity, solidarity, and education',
      source: posterSource
    },
    category: 'poster',
    dimensions: { width: 685, height: 1039 },
    source: posterSource
  },
  {
    id: 'stage-backdrop-10x8',
    src: '/images/conference-2026/stage-backdrop-10x8.jpg',
    thumbnail: '/images/conference-2026/stage-backdrop-10x8-thumb.jpg',
    alt: {
      ml: 'സമ്മേളന വേദി പശ്ചാത്തല രൂപകൽപ്പന (10x8)',
      en: 'Conference main stage backdrop design layout',
      source: officialSource
    },
    caption: {
      ml: 'വേദി പശ്ചാത്തല രൂപകൽപ്പന: സൂര്യോദയ വർണ്ണങ്ങളും നക്ഷത്ര ചിഹ്നങ്ങളും',
      en: 'Stage backdrop layout: Golden sunrise palette with official star emblem',
      source: officialSource
    },
    category: 'backdrop',
    dimensions: { width: 1280, height: 1600 },
    source: officialSource
  },
  {
    id: 'stage-backdrop-wide',
    src: '/images/conference-2026/stage-backdrop-wide.jpg',
    thumbnail: '/images/conference-2026/stage-backdrop-wide-thumb.jpg',
    alt: {
      ml: 'വിശാലമായ പശ്ചാത്തല കലാവിരുന്ന്',
      en: 'Panoramic conference backdrop artwork',
      source: officialSource
    },
    caption: {
      ml: 'വിശാല വേദി രൂപകൽപ്പന: കുട്ടികളുടെ സർഗ്ഗാത്മക ചലന ചിത്രങ്ങൾ',
      en: 'Panoramic backdrop: Dynamic movement of children learning and creating',
      source: officialSource
    },
    category: 'backdrop',
    dimensions: { width: 1221, height: 1600 },
    source: officialSource
  }
];
