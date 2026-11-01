import { ArchiveImage } from '../types/content';

export interface VideoArchiveItem {
  id: string;
  title: string;
  titleMl: string;
  description: string;
  descriptionMl: string;
  youtubeUrl: string;
  duration: string;
  category: string;
}

// Verified Photo Archive (Historical)
export const photosList: ArchiveImage[] = [
  {
    id: 'photo-troupe-singing',
    src: '/images/children-troupe-singing.png',
    thumbnail: '/images/children-troupe-singing.png',
    alt: {
      en: 'Venalthumbikal cultural troupe singing on stage in uniform attire',
      ml: 'വേദിയിൽ സാംസ്കാരിക ഗാനങ്ങൾ ആലപിക്കുന്ന വേനൽത്തുമ്പികൾ കുട്ടിക്കൂട്ടം',
    },
    caption: {
      en: 'Venalthumbikal cultural troupe presenting revolutionary children’s songs and choral theater in Kannur.',
      ml: 'കണ്ണൂരിലെ വേദിയിൽ വിപ്ലവ ഗാനങ്ങളും സംഗീതശില്പവും അവതരിപ്പിക്കുന്ന വേനൽത്തുമ്പികൾ കുട്ടിക്കൂട്ടം.',
    },
    category: 'historical',
    dimensions: { width: 1200, height: 800 },
  },
  {
    id: 'photo-children-dancing',
    src: '/images/children-dancing.jpeg',
    thumbnail: '/images/children-dancing.jpeg',
    alt: {
      en: 'Joyful children of Balasangham dancing together in camaraderie',
      ml: 'സൗഹൃദത്തോടെയും ആഹ്ലാദത്തോടെയും ഒത്തുചേർന്ന് നൃത്തം ചെയ്യുന്ന കുട്ടികൾ',
    },
    caption: {
      en: 'Children participating in secular creative arts and dance at the District Cultural Camp.',
      ml: 'ജില്ലാ സാംസ്കാരിക ക്യാമ്പിൽ മതേതര കൂട്ടായ്മയോടെ കുട്ടികളുടെ നൃത്താവിഷ്കാരം.',
    },
    category: 'historical',
    dimensions: { width: 1200, height: 800 },
  },
  {
    id: 'photo-venalthumbikal-stage',
    src: '/images/venalthumbikal-children.jpeg',
    thumbnail: '/images/venalthumbikal-children.jpeg',
    alt: {
      en: 'Venalthumbikal children cultural artists on village stage',
      ml: 'ഗ്രാമീണ വേദിയിൽ വേനൽത്തുമ്പികൾ ബാലകലാകാരന്മാരുടെ നാടകം',
    },
    caption: {
      en: 'Traveling street theater performance addressing child rights and progressive education.',
      ml: 'കുട്ടികളുടെ അവകാശങ്ങളും ജനാധിപത്യ വിദ്യാഭ്യാസവും ഉയർത്തിപ്പിടിക്കുന്ന തെരുവുനാടകം.',
    },
    category: 'historical',
    dimensions: { width: 1200, height: 800 },
  },
  {
    id: 'photo-conf-poster-children',
    src: '/images/conference-poster-2026.jpg',
    thumbnail: '/images/conference-poster-2026.jpg',
    alt: {
      en: 'Children looking towards the red star flag of Balasangham with inspiration',
      ml: 'ബാലസംഘത്തിന്റെ ചെങ്കൊടിയിലേക്ക് പ്രതീക്ഷയോടെ നോക്കുന്ന കുട്ടികൾ',
    },
    caption: {
      en: 'Inaugural conference visual artwork: "Childhood of Struggle" (പോരാട്ടത്തിന്റെ ബാല്യം).',
      ml: 'സമ്മേളന സാംസ്കാരിക പോസ്റ്റർ: "പോരാട്ടത്തിന്റെ ബാല്യം", കല്ല്യാശ്ശേരി 2026.',
    },
    category: 'poster',
    dimensions: { width: 1200, height: 1600 },
  },
];

// Verified Poster Archive
export const postersList: ArchiveImage[] = [
  {
    id: 'poster-main-2026',
    src: '/images/conference-poster-2026.jpg',
    thumbnail: '/images/conference-poster-2026.jpg',
    alt: {
      en: 'Balasangham Kannur District Conference 2026 Official Poster',
      ml: 'ബാലസംഘം കണ്ണൂർ ജില്ലാ സമ്മേളനം 2026 ഔദ്യോഗിക പോസ്റ്റർ',
    },
    caption: {
      en: 'Official poster for the 2026 Kannur District Conference at Kalliasseri, designed by the Reception Committee.',
      ml: 'കല്ല്യാശ്ശേരിയിൽ നടക്കുന്ന 2026 കണ്ണൂർ ജില്ലാ സമ്മേളനത്തിന്റെ ഔദ്യോഗിക പോസ്റ്റർ.',
    },
    category: 'poster',
    dimensions: { width: 1200, height: 1600 },
  },
  {
    id: 'poster-creative-2026',
    src: '/images/conference-2026/poster-creative.jpg',
    thumbnail: '/images/conference-2026/poster-creative-thumb.jpg',
    alt: {
      en: 'Creative thematic poster: Childhood of Struggle',
      ml: 'വിഷയാധിഷ്ഠിത പോസ്റ്റർ: പോരാട്ടത്തിന്റെ ബാല്യം',
    },
    caption: {
      en: 'Creative interpretation of secular child education and resistance against social inequality.',
      ml: 'മതനിരപേക്ഷ കുട്ടിക്കാലവും സാമൂഹിക സമത്വവും ഉയർത്തുന്ന ക്രിയേറ്റീവ് പോസ്റ്റർ.',
    },
    category: 'poster',
    dimensions: { width: 1200, height: 1600 },
  },
  {
    id: 'poster-secondary-2026',
    src: '/images/conference-2026/poster-secondary.jpg',
    thumbnail: '/images/conference-2026/poster-secondary-thumb.jpg',
    alt: {
      en: 'Delegate assembly and cultural proclamation poster',
      ml: 'പ്രതിനിധി സമ്മേളനവും സാംസ്കാരിക വിളംബര പോസ്റ്ററും',
    },
    caption: {
      en: 'District Conference announcement poster with Kalliasseri historic venue details.',
      ml: 'കല്ല്യാശ്ശേരി വേദിയാകുന്ന ജില്ലാ സമ്മേളന വിളംബര പോസ്റ്റർ.',
    },
    category: 'poster',
    dimensions: { width: 1200, height: 1600 },
  },
];

// Verified Stage Backdrops & Historical Materials
export const archiveList: ArchiveImage[] = [
  {
    id: 'backdrop-wide',
    src: '/images/conference-2026/stage-backdrop-wide.jpg',
    thumbnail: '/images/conference-2026/stage-backdrop-wide-thumb.jpg',
    alt: {
      en: 'Official Stage Backdrop Panorama (Wide Angle)',
      ml: 'ഔദ്യോഗിക വേദി പശ്ചാത്തല രൂപകൽപ്പന (വൈഡ് ആംഗിൾ)',
    },
    caption: {
      en: 'Conference main auditorium stage panoramic backdrop featuring the historic red star and white dove motif.',
      ml: 'പ്രധാന ഓഡിറ്റോറിയം സ്റ്റേജ് പശ്ചാത്തലം: ചുവപ്പൻ നക്ഷത്രവും സമാധാന പ്രാവുകളും.',
    },
    category: 'backdrop',
    dimensions: { width: 1920, height: 800 },
  },
  {
    id: 'backdrop-10x8',
    src: '/images/conference-2026/stage-backdrop-10x8.jpg',
    thumbnail: '/images/conference-2026/stage-backdrop-10x8-thumb.jpg',
    alt: {
      en: 'Official Stage Backdrop 10x8 proportions',
      ml: 'സ്റ്റേജ് പശ്ചാത്തല രൂപകൽപ്പന (10x8 അനുപാതം)',
    },
    caption: {
      en: 'Delegate hall backdrop design with golden sunburst arc and historic emblem.',
      ml: 'പ്രതിനിധി സമ്മേളന നഗരിയിലെ ഔദ്യോഗിക പശ്ചാത്തല രൂപകൽപ്പന.',
    },
    category: 'backdrop',
    dimensions: { width: 1500, height: 1200 },
  },
];

// Verified Video Recordings (Anthems & YouTube Broadcasts)
export const videosList: VideoArchiveItem[] = [
  {
    id: 'vid-flag-song',
    title: 'Balasangham Official Flag Song (കൊടിപ്പാട്ട്)',
    titleMl: 'ബാലസംഘം ഔദ്യോഗിക പതാകഗാനം (കൊടിപ്പാട്ട്)',
    description: 'Bilingual studio choral rendition of the historic anthem of Balasangham.',
    descriptionMl: 'ബാലസംഘത്തിന്റെ ഔദ്യോഗിക പതാകഗാനത്തിന്റെ സമ്പൂർണ്ണ ആലാപനം.',
    youtubeUrl: 'https://www.youtube.com/@balasanghamkerala2817',
    duration: '04:15',
    category: 'Anthem',
  },
  {
    id: 'vid-venalthumbikal',
    title: 'Venalthumbikal Children’s Theater Troupe Tour',
    titleMl: 'വേനൽത്തുമ്പികൾ സംസ്ഥാനതല പര്യടനം',
    description: 'Live village street play recording of children performing social skits.',
    descriptionMl: 'ഗ്രാമങ്ങളിൽ കുട്ടികൾ അവതരിപ്പിച്ച തെരുവുനാടകങ്ങളുടെ ദൃശ്യങ്ങൾ.',
    youtubeUrl: 'https://www.youtube.com/@balasanghamkerala2817',
    duration: '18:40',
    category: 'Cultural Theater',
  },
  {
    id: 'vid-state-conf',
    title: 'Balasangham State Conference Cultural Proclamation',
    titleMl: 'ബാലസംഘം സംസ്ഥാന സമ്മേളന സാംസ്കാരിക റാലി',
    description: 'Mass children’s peace rally and cultural demonstration.',
    descriptionMl: 'ആയിരക്കണക്കിന് കുട്ടികൾ അണിനിരന്ന സാംസ്കാരിക വിളംബര ഘോഷയാത്ര.',
    youtubeUrl: 'https://www.youtube.com/@balasanghamkerala2817',
    duration: '12:10',
    category: 'Conference',
  },
];
