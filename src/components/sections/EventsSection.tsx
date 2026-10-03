import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { EventData } from '../../types/event';
import { CalendarDropdown } from '../event/CalendarDropdown';
import { VERIFIED_EVENTS } from '../../data/verifiedEvents';

/**
 * Selects the best event to feature on the homepage from static data:
 * 1. Nearest upcoming event
 * 2. If none upcoming, most recently completed event
 */
function selectFeaturedEvent(): EventData | null {
  const now = Date.now();
  const upcoming = VERIFIED_EVENTS
    .filter(e => {
      const start = e.start_date ? new Date(e.start_date).getTime() : 0;
      const end = e.end_date ? new Date(e.end_date).getTime() : start;
      return (e.published === 1 || e.published === true) && (start >= now || end >= now);
    })
    .sort((a, b) => new Date(a.start_date!).getTime() - new Date(b.start_date!).getTime());

  if (upcoming.length > 0) return upcoming[0];

  const past = VERIFIED_EVENTS
    .filter(e => e.published === 1 || e.published === true)
    .sort((a, b) => new Date(b.start_date!).getTime() - new Date(a.start_date!).getTime());

  return past.length > 0 ? past[0] : null;
}

export const EventSection = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';
  const sectionRef = useScrollReveal<HTMLElement>();
  const event = selectFeaturedEvent();

  if (!event) {
    return (
      <section className="bg-gradient-to-br from-sun-bright/40 via-warm-cream to-warm-orange/20 section-padding relative overflow-hidden">
        <div className="editorial-container text-center reveal">
          <Badge variant="default" className="mb-4">{ml ? 'വരാനിരിക്കുന്ന പരിപാടികൾ' : 'UPCOMING EVENTS'}</Badge>
          <h2 className={`text-2xl sm:text-3xl font-black text-dark-brown mt-4 ${ml ? 'font-malayalam' : ''}`}>
            {ml ? 'കൂടുതൽ വിവരങ്ങൾ ഉടൻ പ്രതീക്ഷിക്കുക' : 'Stay tuned for upcoming events'}
          </h2>
        </div>
      </section>
    );
  }

  const title = (ml && event.title_ml) ? event.title_ml : event.title;
  const description = (ml && event.short_description_ml) ? event.short_description_ml : (event.short_description || '');
  const locationText = (ml && event.location_ml) ? event.location_ml : (event.location || '');
  
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString(ml ? 'ml-IN' : 'en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  const calendarEvent = {
    title: event.title,
    start_date: event.start_date || new Date().toISOString(),
    end_date: event.end_date || event.start_date || new Date().toISOString(),
    venue: event.venue || '',
    location: event.location || '',
    description: event.short_description || ''
  };

  return (
    <section ref={sectionRef} className="bg-gradient-to-br from-sun-bright/40 via-warm-cream to-warm-orange/20 section-padding relative overflow-hidden">
      {/* Decorative dot */}
      <div className="absolute top-10 right-10 w-6 h-6 rounded-full bg-deep-red/10 animate-float-y" aria-hidden="true" />

      <div className="editorial-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Event info */}
          <div className="lg:col-span-6 space-y-5 reveal">
            <Badge variant="default">
              {ml ? 'മുഖ്യ പരിപാടി' : 'FEATURED EVENT'}
            </Badge>

            <div className="space-y-1">
              {event.start_date && (
                <span className="text-5xl sm:text-7xl font-black text-dark-brown/10 font-mono block leading-none">
                  {new Date(event.start_date).getFullYear()}
                </span>
              )}
              <h2 className={`text-heading font-black text-dark-brown ${ml ? 'font-malayalam' : ''}`}>
                {title}
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 text-sm text-dark-brown/70 font-medium my-4">
              {event.start_date && (
                <span className="inline-flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-deep-red" />
                  {formatDate(event.start_date)}
                  {event.end_date && event.end_date !== event.start_date && ` - ${formatDate(event.end_date)}`}
                </span>
              )}
              {locationText && (
                <span className="inline-flex items-center gap-2 flex-wrap">
                  <MapPin className="w-4 h-4 text-deep-red shrink-0" />
                  <span>{locationText}</span>
                  {(event.map_url || event.mapUrl) && (
                    <a
                      href={event.map_url || event.mapUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-deep-red font-semibold hover:underline inline-flex items-center gap-0.5 ml-1"
                      aria-label={`View map for ${locationText}`}
                    >
                      <span>({ml ? 'മാപ്പ്' : 'View Map'})</span>
                    </a>
                  )}
                </span>
              )}
            </div>

            {description && (
              <p className={`text-sm text-dark-brown/80 ${ml ? 'font-malayalam-body leading-[1.8]' : 'leading-relaxed'}`}>
                {description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 mt-6">
              <Button asChild>
                <Link to={`/events/${event.slug}`}>
                  <span className={ml ? 'font-malayalam normal-case text-sm' : ''}>
                    {ml ? 'കൂടുതൽ വിവരങ്ങൾ' : 'VIEW EVENT'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              
              <CalendarDropdown event={calendarEvent} />
            </div>
          </div>

          {/* Conference poster */}
          {event.poster_url && (
            <div className="lg:col-span-6 reveal" style={{ transitionDelay: '150ms' }}>
              <div className="relative rounded-2xl overflow-hidden shadow-warm-lg aspect-[3/4] sm:aspect-[4/5] group border-2 border-white/50 bg-warm-cream">
                <img
                  src={event.poster_url}
                  alt={event.slug === 'kannur-district-conference-2026' ? 'Balasangham Kannur District Conference 2026 poster' : title}
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
