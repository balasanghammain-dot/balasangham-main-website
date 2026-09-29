import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { LightboxModal } from '../components/conference/LightboxModal';
import { RedStarIcon } from '../components/motifs/RedStarIcon';
import { ArchiveImage } from '../types/content';
import {
  Camera,
  Video,
  Image as ImageIcon,
  Archive,
  ExternalLink,
  Eye
} from 'lucide-react';
import { YoutubeIcon } from '../components/common/SocialIcons';

// Verified Photo Archive
const photosList: ArchiveImage[] = [
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
      ml: 'സമ്മേളന സാംസ്കാരിക പോസ്റ്റർ: "പോരാട്ടത്തിന്റെ ബാല്യം" — കല്ല്യാശ്ശേരി 2026.',
    },
    category: 'poster',
    dimensions: { width: 1200, height: 1600 },
  },
];

// Verified Poster Archive
const postersList: ArchiveImage[] = [
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
const archiveList: ArchiveImage[] = [
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

// Verified Video Recordings
const videosList = [
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

export const MediaPage = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';

  const [activeSection, setActiveSection] = useState<'photos' | 'posters' | 'archive' | 'videos'>('photos');
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxImages, setLightboxImages] = useState<ArchiveImage[]>(photosList);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  const openLightbox = (images: ArchiveImage[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="bg-cream min-h-screen text-ink bg-paper-grain">
      <Breadcrumb items={[{ label: 'Media Archive', labelMl: 'മീഡിയ & ആർക്കൈവ്' }]} />

      {/* Editorial Page Header */}
      <section className="pt-8 sm:pt-12 pb-12 border-b border-festival/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#D32020] text-white text-xs font-mono uppercase font-bold tracking-wider shadow-xs">
                  <RedStarIcon size={12} className="text-white" />
                  VISUAL REPOSITORY
                </span>
                <span className="text-xs font-mono text-ink/60 uppercase tracking-widest hidden sm:inline">
                  // VERIFIED HISTORICAL CAPTURES
                </span>
              </div>

              <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-black text-ink tracking-tight uppercase leading-[1.05] ${ml ? 'font-malayalam normal-case' : ''}`}>
                {ml ? 'മീഡിയ & വിഷ്വൽ ആർക്കൈവ്' : 'Media, Posters & Visual Archive'}
              </h1>

              <p className={`text-base sm:text-lg text-ink/80 leading-relaxed font-medium ${ml ? 'font-malayalam-body leading-[1.8]' : ''}`}>
                {ml
                  ? 'ബാലസംഘത്തിന്റെ ഔദ്യോഗിക ഫോട്ടോകൾ, സമ്മേളന പോസ്റ്ററുകൾ, വേദി പശ്ചാത്തലങ്ങൾ, വീഡിയോ രേഖകൾ എന്നിവയുടെ ശേഖരം.'
                  : 'Documentary photography, verified conference posters, stage backdrops, and official video archives of Balasangham.'}
              </p>
            </div>
          </div>

          {/* 4 Primary Editorial Archive Tabs */}
          <div className="flex items-center gap-2 sm:gap-3 mt-10 pt-6 border-t border-festival/20 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            <button
              type="button"
              onClick={() => setActiveSection('photos')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-mono uppercase font-bold tracking-wider transition-all min-h-[48px] shrink-0 active:scale-95 ${
                activeSection === 'photos'
                  ? 'bg-[#D32020] text-white shadow-festive border-2 border-[#D32020]'
                  : 'bg-white/90 text-ink hover:bg-festival/20 border-2 border-festival/30'
              }`}
            >
              <Camera className="w-4 h-4 text-festival" />
              <span>PHOTOS ({photosList.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection('posters')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-mono uppercase font-bold tracking-wider transition-all min-h-[48px] shrink-0 active:scale-95 ${
                activeSection === 'posters'
                  ? 'bg-[#D32020] text-white shadow-festive border-2 border-[#D32020]'
                  : 'bg-white/90 text-ink hover:bg-festival/20 border-2 border-festival/30'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-festival" />
              <span>POSTERS ({postersList.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection('archive')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-mono uppercase font-bold tracking-wider transition-all min-h-[48px] shrink-0 active:scale-95 ${
                activeSection === 'archive'
                  ? 'bg-[#D32020] text-white shadow-festive border-2 border-[#D32020]'
                  : 'bg-white/90 text-ink hover:bg-festival/20 border-2 border-festival/30'
              }`}
            >
              <Archive className="w-4 h-4 text-festival" />
              <span>STAGE BACKDROPS ({archiveList.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection('videos')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-mono uppercase font-bold tracking-wider transition-all min-h-[48px] shrink-0 active:scale-95 ${
                activeSection === 'videos'
                  ? 'bg-[#D32020] text-white shadow-festive border-2 border-[#D32020]'
                  : 'bg-white/90 text-ink hover:bg-festival/20 border-2 border-festival/30'
              }`}
            >
              <Video className="w-4 h-4 text-festival" />
              <span>VIDEOS & SONGS ({videosList.length})</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Showcase */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          {/* SECTION 1: PHOTOS */}
          {activeSection === 'photos' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between text-xs font-mono text-ink/60 border-b border-festival/20 pb-3">
                <span>DOCUMENTARY PHOTOGRAPHY // REAL CAPTURES</span>
                <span>CLICK PHOTO TO OPEN FULLSCREEN LIGHTBOX</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {photosList.map((photo, index) => (
                  <article
                    key={photo.id}
                    onClick={() => openLightbox(photosList, index)}
                    className="bg-white/95 rounded-3xl p-5 sm:p-6 border-2 border-festival/30 shadow-warm hover:shadow-warm-lg hover:border-[#D32020]/40 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="relative rounded-2xl overflow-hidden aspect-16/10 bg-[#2A1610] mb-4">
                      <img
                        src={photo.src}
                        alt={photo.alt[language]}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2A1610]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-white bg-[#D32020] px-3.5 py-1.5 rounded-full shadow-xs">
                          <Eye className="w-3.5 h-3.5" />
                          VIEW LIGHTBOX
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className={`text-sm font-bold text-ink leading-snug ${ml ? 'font-malayalam leading-[1.65]' : ''}`}>
                        {photo.caption[language]}
                      </p>
                      <div className="pt-2 border-t border-festival/20 flex items-center justify-between text-[11px] font-mono text-ink/50">
                        <span>PHOTO ID: {photo.id.toUpperCase()}</span>
                        <span className="text-[#D32020] font-bold group-hover:underline flex items-center gap-1">
                          EXPAND &darr;
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 2: POSTERS */}
          {activeSection === 'posters' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between text-xs font-mono text-ink/60 border-b border-festival/20 pb-3">
                <span>CONFERENCE & THEMATIC POSTER ARTWORKS</span>
                <span>AUTHENTIC PRINT ARCHIVE // KALLIASSERI 2026</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {postersList.map((poster, index) => (
                  <article
                    key={poster.id}
                    onClick={() => openLightbox(postersList, index)}
                    className="bg-white/95 rounded-3xl p-5 sm:p-6 border-2 border-festival/30 shadow-warm hover:shadow-warm-lg hover:border-[#D32020]/40 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="relative rounded-2xl overflow-hidden aspect-3/4 bg-[#2A1610] mb-4">
                      <img
                        src={poster.src}
                        alt={poster.alt[language]}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-[#D32020] text-white font-mono text-[9px] font-bold uppercase shadow-xs">
                        ORIGINAL POSTER
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2A1610]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-white bg-[#2A1610] px-3.5 py-1.5 rounded-full">
                          <Eye className="w-3.5 h-3.5" />
                          VIEW LIGHTBOX
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className={`text-xs sm:text-sm font-bold text-ink leading-snug ${ml ? 'font-malayalam leading-[1.65]' : ''}`}>
                        {poster.caption[language]}
                      </p>
                      <div className="pt-2 border-t border-festival/20 flex items-center justify-between text-[10px] font-mono text-ink/50">
                        <span>FORMAT: 3:4 VERIFIED PRINT</span>
                        <span className="text-[#D32020] font-bold">VIEW</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 3: STAGE BACKDROPS */}
          {activeSection === 'archive' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between text-xs font-mono text-ink/60 border-b border-festival/20 pb-3">
                <span>STAGE ARCHIVAL PANORAMAS // AUDITORIUM INSTALLATIONS</span>
                <span>HISTORIC 10X8 AND WIDE STAGE CANVAS DESIGNS</span>
              </div>

              <div className="space-y-8">
                {archiveList.map((item, index) => (
                  <article
                    key={item.id}
                    onClick={() => openLightbox(archiveList, index)}
                    className="bg-white/95 rounded-3xl p-5 sm:p-6 border-2 border-festival/30 shadow-warm hover:shadow-warm-lg hover:border-[#D32020]/40 transition-all cursor-pointer group"
                  >
                    <div className="relative rounded-2xl overflow-hidden aspect-16/7 sm:aspect-21/9 bg-[#2A1610] mb-4">
                      <img
                        src={item.src}
                        alt={item.alt[language]}
                        className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#D32020] text-white font-mono text-[10px] font-bold uppercase shadow-xs">
                        STAGE BACKDROP
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                      <p className={`text-sm font-bold text-ink ${ml ? 'font-malayalam' : ''}`}>
                        {item.caption[language]}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#D32020] shrink-0">
                        <Eye className="w-3.5 h-3.5" />
                        <span>FULLSCREEN LIGHTBOX</span>
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 4: VIDEOS & CHORAL PERFORMANCES */}
          {activeSection === 'videos' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between text-xs font-mono text-ink/60 border-b border-festival/20 pb-3">
                <span>OFFICIAL YOUTUBE BROADCAST RECORDINGS</span>
                <span>CHORAL ANTHEMS & TRAVELING THEATER</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {videosList.map((vid) => (
                  <article
                    key={vid.id}
                    className="bg-white/95 rounded-3xl p-6 border-2 border-festival/30 shadow-warm flex flex-col justify-between group hover:border-[#D32020]/40 transition-all"
                  >
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#D32020]/10 text-[#D32020] flex items-center justify-center">
                        <YoutubeIcon className="w-6 h-6" />
                      </div>

                      <div className="flex items-center justify-between text-xs font-mono text-ink/60">
                        <span className="text-[#D32020] font-bold">{vid.category.toUpperCase()}</span>
                        <span>{vid.duration}</span>
                      </div>

                      <h3 className={`text-lg font-black text-ink leading-snug group-hover:text-[#D32020] transition-colors ${ml ? 'font-malayalam leading-[1.4]' : ''}`}>
                        {ml ? vid.titleMl : vid.title}
                      </h3>

                      <p className={`text-xs text-ink/75 leading-relaxed font-medium ${ml ? 'font-malayalam-body leading-[1.7]' : ''}`}>
                        {ml ? vid.descriptionMl : vid.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-festival/20">
                      <a
                        href={vid.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[48px] inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#D32020] hover:text-[#B31219]"
                      >
                        <span>{ml ? 'യൂട്യൂബിൽ കാണുക' : 'WATCH ON YOUTUBE'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>

              {/* YouTube Channel Banner */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#2A1610] via-[#382622] to-[#2A1610] text-[#FAF7F2] flex flex-col sm:flex-row items-center justify-between gap-6 border-2 border-festival/30 shadow-warm-lg">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-xs font-mono uppercase text-[#F5A623] font-bold block">
                    OFFICIAL BROADCAST ARCHIVE
                  </span>
                  <h4 className={`text-xl font-black text-white ${ml ? 'font-malayalam' : ''}`}>
                    {ml ? 'ബാലസംഘം കേരളം യൂട്യൂബ് ചാനൽ' : 'Balasangham Kerala YouTube Channel'}
                  </h4>
                  <p className="text-xs text-[#FAF7F2]/70 max-w-xl">
                    Subscribe to the official YouTube channel for high-definition recordings of state assemblies, choir training, and cultural theater tours.
                  </p>
                </div>

                <a
                  href="https://www.youtube.com/@balasanghamkerala2817"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#D32020] hover:bg-[#B31219] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-festive shrink-0 active:scale-95"
                >
                  <YoutubeIcon className="w-4 h-4" />
                  <span>SUBSCRIBE ON YOUTUBE</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        images={lightboxImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(index) => setLightboxIndex(index)}
      />
    </div>
  );
};
