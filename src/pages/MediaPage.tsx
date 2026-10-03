import { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { LightboxModal } from '../components/conference/LightboxModal';
import { VideoPlayerModal, VideoModalItem } from '../components/media/VideoPlayerModal';
import { RedStarIcon } from '../components/motifs/RedStarIcon';
import { ArchiveImage } from '../types/content';
import { MediaItem } from '../types/event';
import {
  Camera,
  Video,
  Image as ImageIcon,
  Archive,
  ExternalLink,
  Eye,
  Play,
  Layers,
  Filter
} from 'lucide-react';
import { YoutubeIcon } from '../components/common/SocialIcons';
import mediaCloudinaryData from '../data/mediaCloudinary.json';

// Verified Photo Archive (Historical)
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
      ml: 'സമ്മേളന സാംസ്കാരിക പോസ്റ്റർ: "പോരാട്ടത്തിന്റെ ബാല്യം", കല്ല്യാശ്ശേരി 2026.',
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

// Verified Video Recordings (Anthems & YouTube Broadcasts)
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

  const [activeSection, setActiveSection] = useState<'all' | 'photos' | 'videos' | 'posters' | 'archive'>('photos');
  const [selectedEventFilter, setSelectedEventFilter] = useState<string>('all');
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxImages, setLightboxImages] = useState<ArchiveImage[]>(photosList);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [dynamicMedia, setDynamicMedia] = useState<MediaItem[]>(mediaCloudinaryData as unknown as MediaItem[]);
  const [activeVideoModal, setActiveVideoModal] = useState<VideoModalItem | null>(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await fetch('/api/public/media');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const flatList: MediaItem[] = [];
            for (const item of data) {
              if (item.items && Array.isArray(item.items)) {
                flatList.push(...item.items);
              } else {
                flatList.push(item);
              }
            }
            if (flatList.length > 0) {
              setDynamicMedia(flatList);
            }
          }
        }
      } catch (err) {
        // Fallback already pre-seeded from mediaCloudinaryData
      }
    };
    fetchMedia();
  }, []);

  // Filter out any potential leadership photos (Strict security constraint)
  const safeDynamicMedia = useMemo(() => {
    return dynamicMedia.filter((item) => {
      const publicId = item.cloudinary_public_id || item.publicId || '';
      const url = item.secureUrl || item.url || '';
      return !publicId.includes('balasangham/leadership/') && !url.includes('balasangham/leadership/');
    });
  }, [dynamicMedia]);

  // Dynamic Photos from Cloudinary
  const dynamicPhotos = useMemo(() => {
    return safeDynamicMedia.filter(
      (item) => (item.type === 'image' || item.resource_type === 'image' || item.media_type === 'photo' || item.media_type !== 'video')
    );
  }, [safeDynamicMedia]);

  // Dynamic Videos from Cloudinary
  const dynamicVideos = useMemo(() => {
    return safeDynamicMedia.filter(
      (item) => (item.type === 'video' || item.resource_type === 'video' || item.media_type === 'video')
    );
  }, [safeDynamicMedia]);

  // Convert a MediaItem to an ArchiveImage for the LightboxModal
  const toArchiveImage = (item: MediaItem, defaultTitle: string): ArchiveImage => {
    const url = item.secureUrl || item.url || '';
    const thumb = item.thumbnailUrl || item.thumbnail_url || url;
    const title = item.caption || item.title || defaultTitle;
    const desc = item.caption_ml || item.description || title;
    return {
      id: String(item.id),
      src: url,
      thumbnail: thumb,
      alt: {
        en: title,
        ml: desc,
      },
      caption: {
        en: title,
        ml: desc,
      },
      category: (item.media_type as any) || 'historical',
      dimensions: { width: item.width || 1280, height: item.height || 853 },
    };
  };

  const openLightbox = (images: ArchiveImage[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Convert all dynamic photos to ArchiveImages
  const allDynamicArchivePhotos: ArchiveImage[] = useMemo(() => {
    return dynamicPhotos.map((p, idx) => toArchiveImage(p, `Balasangham Capture #${idx + 1}`));
  }, [dynamicPhotos]);


  // Group photos by event
  const eventPhotosGrouped = useMemo(() => {
    const groups: {
      eventId: string;
      title: string;
      titleMl: string;
      photos: MediaItem[];
      archiveImages: ArchiveImage[];
    }[] = [];

    const map = new Map<string, typeof groups[0]>();

    for (let i = 0; i < dynamicPhotos.length; i++) {
      const item = dynamicPhotos[i];
      const eventId = item.eventId || item.event_id || 'general';
      const eventTitle = item.event_title || (eventId === 'venalthumbikal-district-sangamam-2025' ? 'Venalthumbikal 2025 Kannur District Sangamam' : 'General Balasangham Archive');
      const eventTitleMl = item.event_title_ml || (eventId === 'venalthumbikal-district-sangamam-2025' ? 'വേനൽത്തുമ്പികൾ 2025 കണ്ണൂർ ജില്ലാ സംഗമം' : 'ബാലസംഘം പൊതു ആർക്കൈവ്');

      if (!map.has(eventId)) {
        const group = {
          eventId,
          title: eventTitle,
          titleMl: eventTitleMl,
          photos: [],
          archiveImages: [],
        };
        map.set(eventId, group);
        groups.push(group);
      }
      map.get(eventId)!.photos.push(item);
      map.get(eventId)!.archiveImages.push(toArchiveImage(item, `Capture #${i + 1}`));
    }

    return groups;
  }, [dynamicPhotos]);

  // Events list for filter pills
  const availableEvents = useMemo(() => {
    const list: { id: string; title: string; titleMl: string; count: number }[] = [];
    eventPhotosGrouped.forEach((grp) => {
      list.push({
        id: grp.eventId,
        title: grp.title,
        titleMl: grp.titleMl,
        count: grp.photos.length,
      });
    });
    return list;
  }, [eventPhotosGrouped]);

  const totalPhotosCount = dynamicPhotos.length + photosList.length;
  const totalVideosCount = dynamicVideos.length + videosList.length;
  const totalAllCount = totalPhotosCount + totalVideosCount + postersList.length + archiveList.length;

  return (
    <div className="bg-soft-cream min-h-screen text-dark-brown overflow-x-hidden">
      <Breadcrumb items={[{ label: 'Media Archive', labelMl: 'മീഡിയ & ആർക്കൈവ്' }]} />

      {/* Editorial Page Header */}
      <section className="pt-8 sm:pt-12 pb-12 border-b border-sun-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#D32020] text-white text-xs font-mono uppercase font-bold tracking-wider shadow-xs">
                  <RedStarIcon size={12} className="text-white" />
                  VISUAL REPOSITORY
                </span>
                <span className="text-xs font-mono text-dark-brown/60 uppercase tracking-widest hidden sm:inline">
                  // VERIFIED HISTORICAL CAPTURES
                </span>
              </div>

              <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-black text-dark-brown tracking-tight uppercase leading-[1.05] ${ml ? 'font-malayalam normal-case' : ''}`}>
                {ml ? 'മീഡിയ & വിഷ്വൽ ആർക്കൈവ്' : 'Media, Photos & Video Archive'}
              </h1>

              <p className={`text-base sm:text-lg text-dark-brown/80 leading-relaxed font-medium ${ml ? 'font-malayalam-body leading-[1.8]' : ''}`}>
                {ml
                  ? 'ബാലസംഘത്തിന്റെ ഔദ്യോഗിക ഫോട്ടോകൾ, സമ്മേളന പോസ്റ്ററുകൾ, വേദി പശ്ചാത്തലങ്ങൾ, വീഡിയോ രേഖകൾ എന്നിവയുടെ ശേഖരം.'
                  : 'Documentary photography, verified conference posters, stage backdrops, and official video archives of Balasangham.'}
              </p>
            </div>
          </div>

          {/* Primary Editorial Archive Tabs */}
          <div className="flex items-center gap-2 sm:gap-3 mt-10 pt-6 border-t border-sun-primary/20 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            <button
              type="button"
              onClick={() => setActiveSection('photos')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-mono uppercase font-bold tracking-wider transition-all min-h-[48px] shrink-0 active:scale-95 ${
                activeSection === 'photos'
                  ? 'bg-[#D32020] text-white shadow-festive border-2 border-[#D32020]'
                  : 'bg-white/90 text-dark-brown hover:bg-sun-primary/20 border-2 border-sun-primary/30'
              }`}
            >
              <Camera className="w-4 h-4 text-sun-primary" />
              <span>{ml ? `ഫോട്ടോകൾ (${totalPhotosCount})` : `PHOTOS (${totalPhotosCount})`}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection('videos')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-mono uppercase font-bold tracking-wider transition-all min-h-[48px] shrink-0 active:scale-95 ${
                activeSection === 'videos'
                  ? 'bg-[#D32020] text-white shadow-festive border-2 border-[#D32020]'
                  : 'bg-white/90 text-dark-brown hover:bg-sun-primary/20 border-2 border-sun-primary/30'
              }`}
            >
              <Video className="w-4 h-4 text-sun-primary" />
              <span>{ml ? `വീഡിയോകൾ (${totalVideosCount})` : `VIDEOS (${totalVideosCount})`}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection('all')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-mono uppercase font-bold tracking-wider transition-all min-h-[48px] shrink-0 active:scale-95 ${
                activeSection === 'all'
                  ? 'bg-[#D32020] text-white shadow-festive border-2 border-[#D32020]'
                  : 'bg-white/90 text-dark-brown hover:bg-sun-primary/20 border-2 border-sun-primary/30'
              }`}
            >
              <Layers className="w-4 h-4 text-sun-primary" />
              <span>{ml ? `എല്ലാം (${totalAllCount})` : `ALL MEDIA (${totalAllCount})`}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection('posters')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-mono uppercase font-bold tracking-wider transition-all min-h-[48px] shrink-0 active:scale-95 ${
                activeSection === 'posters'
                  ? 'bg-[#D32020] text-white shadow-festive border-2 border-[#D32020]'
                  : 'bg-white/90 text-dark-brown hover:bg-sun-primary/20 border-2 border-sun-primary/30'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-sun-primary" />
              <span>{ml ? `പോസ്റ്ററുകൾ (${postersList.length})` : `POSTERS (${postersList.length})`}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection('archive')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-mono uppercase font-bold tracking-wider transition-all min-h-[48px] shrink-0 active:scale-95 ${
                activeSection === 'archive'
                  ? 'bg-[#D32020] text-white shadow-festive border-2 border-[#D32020]'
                  : 'bg-white/90 text-dark-brown hover:bg-sun-primary/20 border-2 border-sun-primary/30'
              }`}
            >
              <Archive className="w-4 h-4 text-sun-primary" />
              <span>{ml ? `വേദി പശ്ചാത്തലങ്ങൾ (${archiveList.length})` : `STAGE BACKDROPS (${archiveList.length})`}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Showcase */}
      <section className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          {/* SECTION 1: PHOTOS */}
          {activeSection === 'photos' && (
            <div className="space-y-12">
              {/* Event Filter Pills */}
              {availableEvents.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap pb-2 border-b border-sun-primary/20">
                  <span className="text-xs font-mono text-dark-brown/70 font-bold uppercase tracking-wider flex items-center gap-1 mr-2">
                    <Filter className="w-3.5 h-3.5 text-[#D32020]" />
                    {ml ? 'ഫിൽട്ടർ:' : 'FILTER BY EVENT:'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedEventFilter('all')}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all min-h-[36px] ${
                      selectedEventFilter === 'all'
                        ? 'bg-[#D32020] text-white'
                        : 'bg-white/80 text-dark-brown hover:bg-sun-primary/20 border border-sun-primary/30'
                    }`}
                  >
                    {ml ? `എല്ലാ പരിപാടികളും (${totalPhotosCount})` : `All Events (${totalPhotosCount})`}
                  </button>
                  {availableEvents.map((evt) => (
                    <button
                      key={evt.id}
                      type="button"
                      onClick={() => setSelectedEventFilter(evt.id)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all min-h-[36px] ${
                        selectedEventFilter === evt.id
                          ? 'bg-[#D32020] text-white'
                          : 'bg-white/80 text-dark-brown hover:bg-sun-primary/20 border border-sun-primary/30'
                      }`}
                    >
                      {ml ? evt.titleMl : evt.title} ({evt.count})
                    </button>
                  ))}
                </div>
              )}

              {/* Grouped Event Photos */}
              {eventPhotosGrouped
                .filter((grp) => selectedEventFilter === 'all' || selectedEventFilter === grp.eventId)
                .map((grp) => (
                  <div key={grp.eventId} className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sun-primary/20 pb-3">
                      <div>
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D32020]">
                          // EVENT GALLERY
                        </span>
                        <h2 className={`text-xl sm:text-2xl font-black text-dark-brown ${ml ? 'font-malayalam' : ''}`}>
                          {ml ? grp.titleMl : grp.title}
                        </h2>
                      </div>
                      <span className="text-xs font-mono text-dark-brown/60">
                        {grp.photos.length} {ml ? 'ചിത്രങ്ങൾ' : 'VERIFIED PHOTOS'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                      {grp.photos.map((item, idx) => (
                        <article
                          key={item.id}
                          onClick={() => openLightbox(grp.archiveImages, idx)}
                          className="bg-white/95 rounded-2xl p-4 border border-sun-primary/30 shadow-warm hover:shadow-warm-lg hover:border-[#D32020]/40 transition-all cursor-pointer group flex flex-col justify-between"
                        >
                          <div className="relative rounded-xl overflow-hidden aspect-4/3 bg-[#2A1610] mb-3">
                            <img
                              src={item.thumbnail_url || item.thumbnailUrl || item.url}
                              alt={ml ? item.caption_ml || item.caption || '' : item.caption || ''}
                              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                            <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-[#D32020] text-white font-mono text-[9px] font-bold uppercase tracking-wider shadow-xs">
                              PHOTO
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#2A1610]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-white bg-[#D32020] px-3 py-1 rounded-full shadow-xs">
                                <Eye className="w-3 h-3" />
                                {ml ? 'വലുതായി കാണുക' : 'VIEW LIGHTBOX'}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <h3 className={`text-xs sm:text-sm font-bold text-dark-brown line-clamp-2 leading-snug ${ml ? 'font-malayalam' : ''}`}>
                              {ml ? item.caption_ml || item.caption : item.caption}
                            </h3>
                            <div className="pt-2 border-t border-sun-primary/20 flex items-center justify-between text-[10px] font-mono text-dark-brown/50">
                              <span>{item.width && item.height ? `${item.width}×${item.height}` : 'HD PHOTO'}</span>
                              <span className="text-[#D32020] font-bold group-hover:underline">
                                EXPAND &darr;
                              </span>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                ))}

              {/* Historical Captures Section */}
              {(selectedEventFilter === 'all') && (
                <div className="space-y-6 pt-6">
                  <div className="flex items-center justify-between border-b border-sun-primary/20 pb-3">
                    <div>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D32020]">
                        // HISTORICAL ARCHIVE
                      </span>
                      <h2 className={`text-xl sm:text-2xl font-black text-dark-brown ${ml ? 'font-malayalam' : ''}`}>
                        {ml ? 'ചരിത്രപരമായ ചിത്രങ്ങൾ' : 'Historical Balasangham Captures'}
                      </h2>
                    </div>
                    <span className="text-xs font-mono text-dark-brown/60">
                      {photosList.length} {ml ? 'ചിത്രങ്ങൾ' : 'ARCHIVE CAPTURES'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    {photosList.map((photo, index) => (
                      <article
                        key={photo.id}
                        onClick={() => openLightbox(photosList, index)}
                        className="bg-white/95 rounded-3xl p-5 sm:p-6 border-2 border-sun-primary/30 shadow-warm hover:shadow-warm-lg hover:border-[#D32020]/40 transition-all cursor-pointer group flex flex-col justify-between"
                      >
                        <div className="relative rounded-2xl overflow-hidden aspect-16/10 bg-[#2A1610] mb-4">
                          <img
                            src={photo.src}
                            alt={photo.alt[language]}
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-[#D32020] text-white font-mono text-[9px] font-bold uppercase tracking-wider shadow-xs">
                            PHOTO
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-[#2A1610]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-white bg-[#D32020] px-3.5 py-1.5 rounded-full shadow-xs">
                              <Eye className="w-3.5 h-3.5" />
                              VIEW LIGHTBOX
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className={`text-sm font-bold text-dark-brown leading-snug ${ml ? 'font-malayalam leading-[1.65]' : ''}`}>
                            {photo.caption[language]}
                          </p>
                          <div className="pt-2 border-t border-sun-primary/20 flex items-center justify-between text-[11px] font-mono text-dark-brown/50">
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
            </div>
          )}

          {/* SECTION 2: VIDEOS */}
          {activeSection === 'videos' && (
            <div className="space-y-12">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sun-primary/20 pb-3">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D32020]">
                    // VIDEO CAPTURES & FIELD ACTIVITIES
                  </span>
                  <h2 className={`text-xl sm:text-2xl font-black text-dark-brown ${ml ? 'font-malayalam' : ''}`}>
                    {ml ? 'ബാലസംഘം പ്രവർത്തനങ്ങളും വീഡിയോ രേഖകളും' : 'Balasangham Activities & Video Recordings'}
                  </h2>
                </div>
                <span className="text-xs font-mono text-dark-brown/60">
                  {totalVideosCount} {ml ? 'വീഡിയോകൾ' : 'VERIFIED RECORDINGS'}
                </span>
              </div>

              {/* Imported Cloudinary Activities Videos */}
              {dynamicVideos.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-dark-brown/70 font-bold tracking-wider">
                      {ml ? 'ഗ്രാമീണ പ്രവർത്തനങ്ങൾ & മേളകൾ' : 'VILLAGE ACTIVITIES & FESTIVAL RECORDINGS'}
                    </span>
                    <span className="text-xs font-mono text-dark-brown/50">
                      {dynamicVideos.length} {ml ? 'ക്ലിപ്പുകൾ' : 'ACTIVITY CLIPS'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dynamicVideos.map((vid) => {
                      const videoModalItem: VideoModalItem = {
                        id: String(vid.id),
                        title: vid.caption || vid.title || 'Balasangham Video',
                        titleMl: vid.caption_ml || undefined,
                        description: vid.description || undefined,
                        url: vid.secureUrl || vid.url,
                        poster: vid.thumbnail_url || vid.thumbnailUrl || undefined,
                        duration: vid.duration,
                        category: 'Activity',
                      };

                      return (
                        <article
                          key={vid.id}
                          onClick={() => setActiveVideoModal(videoModalItem)}
                          className="bg-white/95 rounded-2xl p-4 border border-sun-primary/30 shadow-warm hover:shadow-warm-lg hover:border-[#D32020]/40 transition-all cursor-pointer group flex flex-col justify-between"
                        >
                          <div className="relative rounded-xl overflow-hidden aspect-16/10 bg-[#2A1610] mb-3">
                            {vid.thumbnail_url || vid.thumbnailUrl ? (
                              <img
                                src={vid.thumbnail_url || vid.thumbnailUrl || ''}
                                alt={ml ? vid.caption_ml || vid.caption || '' : vid.caption || ''}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-white/50">
                                <Video className="w-8 h-8" />
                              </div>
                            )}

                            {/* Badges */}
                            <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-[#D32020] text-white font-mono text-[9px] font-bold uppercase tracking-wider shadow-xs">
                              VIDEO
                            </div>

                            {/* Centered Play Button */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/40 transition-colors">
                              <div className="w-12 h-12 rounded-full bg-[#D32020] text-white flex items-center justify-center shadow-festive group-hover:scale-110 transition-transform">
                                <Play className="w-5 h-5 ml-0.5 fill-current" />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <h3 className={`text-sm sm:text-base font-bold text-dark-brown line-clamp-2 leading-snug group-hover:text-[#D32020] transition-colors ${ml ? 'font-malayalam' : ''}`}>
                              {ml ? vid.caption_ml || vid.caption : vid.caption}
                            </h3>
                            <div className="pt-2 border-t border-sun-primary/20 flex items-center justify-between text-[10px] font-mono text-dark-brown/50">
                              <span>MP4 // H.264</span>
                              <span className="text-[#D32020] font-bold flex items-center gap-1">
                                {ml ? 'പ്ലേ ചെയ്യുക' : 'PLAY VIDEO'} &rarr;
                              </span>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* YouTube Anthem & Broadcast Archive */}
              <div className="space-y-6 pt-6">
                <div className="flex items-center justify-between border-t border-sun-primary/20 pt-6">
                  <span className="text-xs font-mono uppercase text-dark-brown/70 font-bold tracking-wider">
                    {ml ? 'ഔദ്യോഗിക യൂട്യൂബ് ചാനൽ ആർക്കൈവ്' : 'OFFICIAL YOUTUBE BROADCAST RECORDINGS'}
                  </span>
                  <span className="text-xs font-mono text-dark-brown/50">
                    {videosList.length} {ml ? 'റെക്കോർഡിംഗുകൾ' : 'RECORDINGS'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {videosList.map((vid) => (
                    <article
                      key={vid.id}
                      className="bg-white/95 rounded-3xl p-6 border-2 border-sun-primary/30 shadow-warm flex flex-col justify-between group hover:border-[#D32020]/40 transition-all"
                    >
                      <div className="space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-[#D32020]/10 text-[#D32020] flex items-center justify-center">
                          <YoutubeIcon className="w-6 h-6" />
                        </div>

                        <div className="flex items-center justify-between text-xs font-mono text-dark-brown/60">
                          <span className="text-[#D32020] font-bold">{vid.category.toUpperCase()}</span>
                          <span>{vid.duration}</span>
                        </div>

                        <h3 className={`text-lg font-black text-dark-brown leading-snug group-hover:text-[#D32020] transition-colors ${ml ? 'font-malayalam leading-[1.4]' : ''}`}>
                          {ml ? vid.titleMl : vid.title}
                        </h3>

                        <p className={`text-xs text-dark-brown/75 leading-relaxed font-medium ${ml ? 'font-malayalam-body leading-[1.7]' : ''}`}>
                          {ml ? vid.descriptionMl : vid.description}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-sun-primary/20">
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
                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#2A1610] via-[#382622] to-[#2A1610] text-[#FAF7F2] flex flex-col sm:flex-row items-center justify-between gap-6 border-2 border-sun-primary/30 shadow-warm-lg">
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
            </div>
          )}

          {/* SECTION 3: ALL MEDIA (Combined Repository) */}
          {activeSection === 'all' && (
            <div className="space-y-12">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sun-primary/20 pb-3">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D32020]">
                    // COMPREHENSIVE ARCHIVE
                  </span>
                  <h2 className={`text-xl sm:text-2xl font-black text-dark-brown ${ml ? 'font-malayalam' : ''}`}>
                    {ml ? 'എല്ലാ മീഡിയ ശേഖരങ്ങളും' : 'All Archival Media & Captures'}
                  </h2>
                </div>
                <span className="text-xs font-mono text-dark-brown/60">
                  {totalAllCount} {ml ? 'ഇനങ്ങൾ' : 'TOTAL ITEMS'}
                </span>
              </div>

              {/* Event Photos */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className={`text-lg font-bold text-dark-brown ${ml ? 'font-malayalam' : ''}`}>
                    {ml ? 'വേനൽത്തുമ്പികൾ 2025 ജില്ലാ സംഗമം ഫോട്ടോകൾ' : 'Venalthumbikal 2025 Kannur District Sangamam Photos'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveSection('photos')}
                    className="text-xs font-mono font-bold text-[#D32020] hover:underline"
                  >
                    {ml ? 'എല്ലാ ഫോട്ടോകളും കാണുക →' : 'VIEW ALL PHOTOS →'}
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {dynamicPhotos.slice(0, 8).map((photo, idx) => (
                    <article
                      key={photo.id}
                      onClick={() => openLightbox(allDynamicArchivePhotos, idx)}
                      className="group relative aspect-4/3 rounded-xl overflow-hidden bg-[#2A1610] cursor-pointer shadow-warm border border-sun-primary/30"
                    >
                      <img
                        src={photo.thumbnail_url || photo.thumbnailUrl || photo.url}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#D32020] text-white font-mono text-[8px] font-bold uppercase">
                        PHOTO
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                        <span className="text-[10px] text-white font-medium line-clamp-1">
                          {ml ? photo.caption_ml || photo.caption : photo.caption}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Videos Highlight */}
              <div className="space-y-6 pt-6 border-t border-sun-primary/20">
                <div className="flex items-center justify-between">
                  <h3 className={`text-lg font-bold text-dark-brown ${ml ? 'font-malayalam' : ''}`}>
                    {ml ? 'പ്രവർത്തന വീഡിയോകൾ' : 'Activity & Festival Videos'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveSection('videos')}
                    className="text-xs font-mono font-bold text-[#D32020] hover:underline"
                  >
                    {ml ? 'എല്ലാ വീഡിയോകളും കാണുക →' : 'VIEW ALL VIDEOS →'}
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {dynamicVideos.slice(0, 3).map((vid) => {
                    const videoModalItem: VideoModalItem = {
                      id: String(vid.id),
                      title: vid.caption || vid.title || 'Balasangham Video',
                      titleMl: vid.caption_ml || undefined,
                      url: vid.secureUrl || vid.url,
                      poster: vid.thumbnail_url || vid.thumbnailUrl || undefined,
                    };
                    return (
                      <article
                        key={vid.id}
                        onClick={() => setActiveVideoModal(videoModalItem)}
                        className="group relative aspect-16/10 rounded-2xl overflow-hidden bg-black cursor-pointer shadow-warm border border-sun-primary/30"
                      >
                        <img
                          src={vid.thumbnail_url || vid.thumbnailUrl || ''}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                          loading="lazy"
                        />
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#D32020] text-white font-mono text-[8px] font-bold uppercase">
                          VIDEO
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-[#D32020] text-white flex items-center justify-center shadow-festive group-hover:scale-110 transition-transform">
                            <Play className="w-4 h-4 ml-0.5 fill-current" />
                          </div>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                          <p className={`text-xs font-bold text-white line-clamp-1 ${ml ? 'font-malayalam' : ''}`}>
                            {ml ? vid.caption_ml || vid.caption : vid.caption}
                          </p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>

              {/* Posters & Backdrops Highlight */}
              <div className="space-y-6 pt-6 border-t border-sun-primary/20">
                <div className="flex items-center justify-between">
                  <h3 className={`text-lg font-bold text-dark-brown ${ml ? 'font-malayalam' : ''}`}>
                    {ml ? 'സമ്മേളന പോസ്റ്ററുകളും വേദി പശ്ചാത്തലങ്ങളും' : 'Conference Posters & Stage Backdrops'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveSection('posters')}
                    className="text-xs font-mono font-bold text-[#D32020] hover:underline"
                  >
                    {ml ? 'പോസ്റ്ററുകൾ കാണുക →' : 'VIEW POSTERS →'}
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {postersList.map((poster, idx) => (
                    <article
                      key={poster.id}
                      onClick={() => openLightbox(postersList, idx)}
                      className="group relative aspect-3/4 rounded-xl overflow-hidden bg-[#2A1610] cursor-pointer shadow-warm border border-sun-primary/30"
                    >
                      <img
                        src={poster.thumbnail || poster.src}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#D32020] text-white font-mono text-[8px] font-bold uppercase">
                        POSTER
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SECTION 4: POSTERS */}
          {activeSection === 'posters' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between text-xs font-mono text-dark-brown/60 border-b border-sun-primary/20 pb-3">
                <span>CONFERENCE & THEMATIC POSTER ARTWORKS</span>
                <span>AUTHENTIC PRINT ARCHIVE // KALLIASSERI 2026</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {postersList.map((poster, index) => (
                  <article
                    key={poster.id}
                    onClick={() => openLightbox(postersList, index)}
                    className="bg-white/95 rounded-3xl p-5 sm:p-6 border-2 border-sun-primary/30 shadow-warm hover:shadow-warm-lg hover:border-[#D32020]/40 transition-all cursor-pointer group flex flex-col justify-between"
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
                      <p className={`text-xs sm:text-sm font-bold text-dark-brown leading-snug ${ml ? 'font-malayalam leading-[1.65]' : ''}`}>
                        {poster.caption[language]}
                      </p>
                      <div className="pt-2 border-t border-sun-primary/20 flex items-center justify-between text-[10px] font-mono text-dark-brown/50">
                        <span>FORMAT: 3:4 VERIFIED PRINT</span>
                        <span className="text-[#D32020] font-bold">VIEW</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 5: STAGE BACKDROPS */}
          {activeSection === 'archive' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between text-xs font-mono text-dark-brown/60 border-b border-sun-primary/20 pb-3">
                <span>STAGE ARCHIVAL PANORAMAS // AUDITORIUM INSTALLATIONS</span>
                <span>HISTORIC 10X8 AND WIDE STAGE CANVAS DESIGNS</span>
              </div>

              <div className="space-y-8">
                {archiveList.map((item, index) => (
                  <article
                    key={item.id}
                    onClick={() => openLightbox(archiveList, index)}
                    className="bg-white/95 rounded-3xl p-5 sm:p-6 border-2 border-sun-primary/30 shadow-warm hover:shadow-warm-lg hover:border-[#D32020]/40 transition-all cursor-pointer group"
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
                      <p className={`text-sm font-bold text-dark-brown ${ml ? 'font-malayalam' : ''}`}>
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

      {/* Video Player Modal */}
      <VideoPlayerModal
        isOpen={Boolean(activeVideoModal)}
        onClose={() => setActiveVideoModal(null)}
        video={activeVideoModal}
      />
    </div>
  );
};
