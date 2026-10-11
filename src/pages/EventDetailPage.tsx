import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Calendar, MapPin, ArrowRight, Camera, Gamepad2, Loader2 } from 'lucide-react';
import { EventData, MediaItem } from '../types/event';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { CalendarDropdown } from '../components/event/CalendarDropdown';
import { ShareButton } from '../components/event/ShareButton';
import { EventMediaGallery } from '../components/event/EventMediaGallery';
import { EventLocationSection } from '../components/event/EventLocationSection';

import { VERIFIED_EVENTS } from '../data/verifiedEvents';
import { getEventBySlug } from '../lib/eventsService';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const EventDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const ml = language === 'ml';

  // Seed with static verified event if matching slug
  const [event, setEvent] = useState<EventData | null>(() => 
    VERIFIED_EVENTS.find(e => e.slug === slug) || null
  );
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState<boolean>(!event);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    if (!slug) return;

    const fetchLiveEvent = async () => {
      try {
        // 1. Fetch live event document from Firestore by slug
        const liveEvent = await getEventBySlug(slug);
        if (isMounted && liveEvent) {
          setEvent(liveEvent);
        }

        // 2. Fetch associated media from Firestore media collection
        const mediaCol = collection(db, 'media');
        const eventId = liveEvent?.id || slug;
        
        // Try querying by eventId or slug
        const mediaQ = query(
          mediaCol,
          where('eventId', '==', eventId),
          where('published', '==', true)
        );
        const mediaSnap = await getDocs(mediaQ);
        const items: MediaItem[] = [];
        mediaSnap.forEach(d => {
          items.push({ id: d.id, ...d.data() } as MediaItem);
        });

        // Also fallback to API media if empty
        if (items.length === 0) {
          try {
            const res = await fetch(`/api/public/events/${slug}`);
            if (res.ok) {
              const data = await res.json();
              if (data.media && Array.isArray(data.media)) {
                items.push(...data.media);
              }
            }
          } catch {
            // API optional
          }
        }

        if (isMounted) {
          setMedia(items);
        }
      } catch (err: any) {
        console.warn('Failed to load live event from Firestore:', err);
        if (isMounted && !event) {
          setError('Event not found.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchLiveEvent();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-soft-cream pt-32 pb-20 px-4 text-center flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-dark-brown/60 mb-4" />
        <p className="text-dark-brown/70">{ml ? 'വിവരങ്ങൾ ലഭ്യമാക്കുന്നു...' : 'Loading event details...'}</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-soft-cream pt-32 pb-20 px-4 text-center">
        <h2 className="text-2xl font-bold text-dark-brown mb-4">{error || (ml ? 'പരിപാടി കണ്ടെത്താനായില്ല' : 'Event Not Found')}</h2>
        <Button asChild>
          <Link to="/events">{ml ? 'എല്ലാ പരിപാടികളും' : 'Back to Events'}</Link>
        </Button>
      </div>
    );
  }

  const title = (ml && event.title_ml) ? event.title_ml : event.title;
  const shortDesc = (ml && event.short_description_ml) ? event.short_description_ml : event.short_description;
  const fullDesc = (ml && event.full_description_ml) ? event.full_description_ml : event.full_description;
  const additionalInfo = (ml && event.additional_info_ml) ? event.additional_info_ml : event.additional_info;
  const scheduleInfo = (ml && event.schedule_info_ml) ? event.schedule_info_ml : event.schedule_info;
  const locationText = (ml && event.location_ml) ? event.location_ml : event.location;
  
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString(ml ? 'ml-IN' : 'en-US', {
      month: 'long', day: 'numeric', year: 'numeric'
    });
  };

  const calendarEvent = {
    title: event.title,
    start_date: event.start_date || new Date().toISOString(),
    end_date: event.end_date || event.start_date || new Date().toISOString(),
    venue: event.venue || '',
    location: event.location || '',
    description: event.short_description || '',
    map_url: event.map_url || event.mapUrl || null
  };

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="min-h-screen bg-soft-cream pt-24 pb-20">
      <div className="editorial-container mb-6">
        <Breadcrumb
          items={[
            { label: 'Events', labelMl: 'പരിപാടികൾ', path: '/events' },
            { label: title }
          ]}
        />
      </div>

      <article className="editorial-container">
        {/* Hero Section */}
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {event.poster_url && (
              <div className="bg-warm-cream aspect-video lg:aspect-auto lg:h-full relative">
                <img 
                  src={event.poster_url} 
                  alt={title} 
                  className="w-full h-full object-cover object-center absolute inset-0"
                  onError={(e) => {
                    const target = e.currentTarget;
                    const fallback = event.slug?.includes('conference-2026')
                      ? '/images/kannur-conference-2026-poster.jpg'
                      : '/images/balasangham-festival-theme.jpeg';
                    if (!target.src.endsWith(fallback)) {
                      target.src = fallback;
                    }
                  }}
                />
              </div>
            )}
            <div className={`p-8 lg:p-12 flex flex-col justify-center ${!event.poster_url ? 'lg:col-span-2' : ''}`}>
              {event.category && (
                <Badge variant="default" className="w-max mb-4">{event.category}</Badge>
              )}
              <h1 className={`text-3xl md:text-4xl lg:text-5xl font-black text-dark-brown mb-6 leading-tight ${ml ? 'font-malayalam' : ''}`}>
                {title}
              </h1>
              
              <div className="space-y-3 mb-6 text-slate-700">
                {event.start_date && (
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-deep-red" />
                    <span className="font-medium text-lg">
                      {formatDate(event.start_date)}
                      {event.end_date && event.end_date !== event.start_date && ` - ${formatDate(event.end_date)}`}
                    </span>
                  </div>
                )}
                {locationText && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-deep-red" />
                    <span className="font-medium text-lg">{event.venue ? `${event.venue}, ` : ''}{locationText}</span>
                  </div>
                )}
              </div>

              {shortDesc && (
                <p className={`text-lg text-slate-600 mb-8 ${ml ? 'font-malayalam-body leading-relaxed' : ''}`}>
                  {shortDesc}
                </p>
              )}

              {/* Actions Bar */}
              <div className="flex flex-wrap gap-3 pt-6 border-t border-slate-100">
                <Button asChild className="bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold border border-amber-500/30 shadow-xs">
                  <Link to="/game">
                    <Gamepad2 className="w-4 h-4 text-deep-red mr-2" />
                    <span>{ml ? 'പോസ്റ്റർ ഗെയിം കളിക്കൂ' : 'Play Poster Game 🎮'}</span>
                  </Link>
                </Button>
                <CalendarDropdown event={calendarEvent} />
                <ShareButton title={title} url={currentUrl} />
                {event.registration_url && (
                  <Button asChild className="bg-deep-red hover:bg-rose-900 text-white">
                    <a href={event.registration_url} target="_blank" rel="noopener noreferrer">
                      {ml ? 'രജിസ്റ്റർ ചെയ്യുക' : 'Register Now'}
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {fullDesc && (
              <section>
                <h2 className={`text-2xl font-bold text-dark-brown mb-4 ${ml ? 'font-malayalam' : ''}`}>
                  {ml ? 'വിശദാംശങ്ങൾ' : 'About the Event'}
                </h2>
                <div className={`prose max-w-none text-slate-700 ${ml ? 'font-malayalam-body leading-[1.8]' : ''}`}
                     dangerouslySetInnerHTML={{ __html: fullDesc.replace(/\\n/g, '<br/>') }} />
              </section>
            )}

            {scheduleInfo && (
              <section>
                <h2 className={`text-2xl font-bold text-dark-brown mb-4 ${ml ? 'font-malayalam' : ''}`}>
                  {ml ? 'സമയക്രമം' : 'Schedule'}
                </h2>
                <div className={`prose max-w-none text-slate-700 bg-white p-6 rounded-2xl border border-slate-200 ${ml ? 'font-malayalam-body leading-[1.8]' : ''}`}
                     dangerouslySetInnerHTML={{ __html: scheduleInfo.replace(/\\n/g, '<br/>') }} />
              </section>
            )}

            {additionalInfo && (
              <section>
                <h2 className={`text-2xl font-bold text-dark-brown mb-4 ${ml ? 'font-malayalam' : ''}`}>
                  {ml ? 'കൂടുതൽ വിവരങ്ങൾ' : 'Additional Information'}
                </h2>
                <div className={`prose max-w-none text-slate-700 ${ml ? 'font-malayalam-body leading-[1.8]' : ''}`}
                     dangerouslySetInnerHTML={{ __html: additionalInfo.replace(/\\n/g, '<br/>') }} />
              </section>
            )}

            {/* Event Location & Mini-Map Section (Requirements 4, 5, 7, 8, 10) */}
            <EventLocationSection event={{ ...event, map_url: event.map_url || event.mapUrl }} />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Poster Tetris Game Card */}
            <div className="bg-gradient-to-br from-amber-100 via-warm-cream to-sun-primary/20 rounded-3xl p-6 sm:p-8 border border-amber-300 shadow-sm text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-deep-red border border-amber-200">
                <Gamepad2 className="w-8 h-8" />
              </div>
              <h3 className={`text-xl font-black text-dark-brown mb-2 ${ml ? 'font-malayalam' : ''}`}>
                {ml ? 'പോസ്റ്റർ ടെട്രിസ് പസിൽ' : 'Poster Tetris Puzzle'}
              </h3>
              <p className={`text-sm text-slate-700 mb-6 ${ml ? 'font-malayalam-body' : ''}`}>
                {ml
                  ? 'ടെട്രിസ് കളിച്ച് ബ്ലോക്കുകൾ നിറച്ച് ഈ സമ്മേളന പോസ്റ്റർ അൺലോക്ക് ചെയ്യൂ!'
                  : 'Play easy Tetris to permanently reveal this official conference poster!'}
              </p>
              <Button asChild className="w-full bg-deep-red hover:bg-bright-red text-white font-bold">
                <Link to="/game">
                  {ml ? 'ഗെയിം കളിക്കുക' : 'Play Poster Game'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            {Boolean(event.snapshare_enabled) && (
              <div className="bg-gradient-to-br from-warm-orange/20 to-sun-primary/20 rounded-3xl p-8 border border-warm-orange/30 text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-deep-red">
                  <Camera className="w-8 h-8" />
                </div>
                <h3 className={`text-xl font-bold text-dark-brown mb-3 ${ml ? 'font-malayalam' : ''}`}>
                  {ml ? 'സ്നാപ്പ്ഷെയർ' : 'SnapShare'}
                </h3>
                <p className={`text-sm text-slate-700 mb-6 ${ml ? 'font-malayalam-body' : ''}`}>
                  {ml ? 'ഈ പരിപാടിയുടെ തത്സമയ ചിത്രങ്ങൾ കാണുക.' : 'View live photos from this event.'}
                </p>
                <Button asChild className="w-full bg-deep-red hover:bg-rose-900 text-white">
                  <Link to={`/events/${event.slug}/snapshare`}>
                    {ml ? 'ചിത്രങ്ങൾ കാണുക' : 'View Photos'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Media Gallery */}
        {media && media.length > 0 && (
          <div className="mt-16 pt-16 border-t border-slate-200">
            <h2 className={`text-2xl font-bold text-dark-brown mb-8 ${ml ? 'font-malayalam' : ''}`}>
              {ml ? 'ചിത്രങ്ങൾ' : 'Event Gallery'}
            </h2>
            <EventMediaGallery media={media} />
          </div>
        )}
      </article>
    </div>
  );
};
