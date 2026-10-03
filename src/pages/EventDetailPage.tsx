import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Calendar, MapPin, ArrowRight, Camera } from 'lucide-react';
import { EventData, MediaItem } from '../types/event';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { CalendarDropdown } from '../components/event/CalendarDropdown';
import { ShareButton } from '../components/event/ShareButton';
import { EventMediaGallery } from '../components/event/EventMediaGallery';
import { EventLocationSection } from '../components/event/EventLocationSection';

import { getEventBySlug } from '../lib/eventsService';

export const EventDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const ml = language === 'ml';

  const [event, setEvent] = useState<EventData | null>(null);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError(null);
        if (!slug) return;

        // 1. Retrieve event document from Firestore
        let eventData: EventData | null = null;
        try {
          eventData = await getEventBySlug(slug);
        } catch (fsErr) {
          console.warn('Firestore fetch failed, checking fallback:', fsErr);
        }

        // 2. Fetch media from server / fallback API
        let mediaItems: MediaItem[] = [];
        try {
          const res = await fetch(`/api/public/events/${slug}`);
          if (res.ok) {
            const apiData = await res.json();
            mediaItems = apiData.media || [];
            if (!eventData) {
              eventData = apiData.event || apiData;
            }
          }
        } catch (apiErr) {
          // Fallback fetch failed
        }

        if (isMounted) {
          if (eventData) {
            setEvent(eventData);
            setMedia(mediaItems);
          } else {
            setError('Event not found or failed to load.');
          }
        }
      } catch (err) {
        console.error('Error in EventDetailPage:', err);
        if (isMounted) setError('Event not found or failed to load.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchEvent();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-soft-cream flex justify-center items-center">
        <div className="w-8 h-8 rounded-full border-3 border-sun-primary border-t-deep-red animate-spin" />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-soft-cream pt-32 pb-20 px-4 text-center">
        <h2 className="text-2xl font-bold text-dark-brown mb-4">{error || 'Event Not Found'}</h2>
        <Button asChild>
          <Link to="/events">Back to Events</Link>
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
              <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-100">
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
