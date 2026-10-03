import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { getMiniMapEmbedUrl, getGoogleMapsRedirectUrl } from '../../lib/mapUtils';
import { useLanguage } from '../../context/LanguageContext';

interface EventLocationSectionProps {
  event: {
    venue?: string | null;
    venue_ml?: string | null;
    location?: string | null;
    location_ml?: string | null;
    map_url?: string | null;
    title?: string;
  };
}

export const EventLocationSection: React.FC<EventLocationSectionProps> = ({ event }) => {
  const { language } = useLanguage();
  const ml = language === 'ml';

  const venue = (ml && event.venue_ml) ? event.venue_ml : (event.venue || '');
  const location = (ml && event.location_ml) ? event.location_ml : (event.location || '');
  const hasMapUrl = Boolean(event.map_url && event.map_url.trim());

  // If no location info and no map URL at all, omit section entirely (Requirement 10)
  if (!venue && !location && !hasMapUrl) {
    return null;
  }

  const embedUrl = hasMapUrl ? getMiniMapEmbedUrl(event) : null;
  const redirectUrl = getGoogleMapsRedirectUrl(event);

  return (
    <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
        <div className="w-10 h-10 rounded-full bg-deep-red/10 flex items-center justify-center text-deep-red">
          <MapPin className="w-5 h-5" />
        </div>
        <div>
          <h2 className={`text-xl md:text-2xl font-black text-dark-brown ${ml ? 'font-malayalam' : ''}`}>
            {ml ? 'വേദി വിവരങ്ങൾ' : 'Event Location'}
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            {ml ? 'സ്ഥലവും വഴിയും' : 'Venue & Directions'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Mini Map Preview (Requirement 5) */}
        {embedUrl ? (
          <div className="md:col-span-7 w-full overflow-hidden rounded-2xl border border-slate-200 shadow-inner bg-slate-50 relative">
            <iframe
              title={`Map of ${event.venue || event.location || 'Event Location'}`}
              src={embedUrl}
              className="w-full h-[220px] sm:h-[260px] md:h-[280px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen={false}
            />
          </div>
        ) : null}

        {/* Location Details & Google Maps Action (Requirement 4 & 7) */}
        <div className={`${embedUrl ? 'md:col-span-5' : 'md:col-span-12'} flex flex-col justify-between h-full space-y-5`}>
          <div className="space-y-3">
            {venue && (
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block mb-1">
                  {ml ? 'വേദി' : 'Venue'}
                </span>
                <p className={`text-lg md:text-xl font-bold text-dark-brown ${ml ? 'font-malayalam leading-snug' : ''}`}>
                  {venue}
                </p>
              </div>
            )}

            {location && (
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block mb-1">
                  {ml ? 'മേൽവിലാസം / സ്ഥലം' : 'Address / City'}
                </span>
                <p className={`text-base text-slate-700 ${ml ? 'font-malayalam-body leading-relaxed' : ''}`}>
                  {location}
                </p>
              </div>
            )}
          </div>

          {/* Open in Google Maps Button (Requirement 7 & 8) */}
          {redirectUrl && (
            <div className="pt-2">
              <Button
                asChild
                className="w-full sm:w-auto min-h-[44px] bg-deep-red hover:bg-rose-900 text-white font-bold px-6 py-3 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <a
                  href={redirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open Google Maps for ${venue || location || 'event location'}`}
                >
                  <span>{ml ? 'ഗൂഗിൾ മാപ്പിൽ തുറക്കുക' : 'Open in Google Maps'}</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
