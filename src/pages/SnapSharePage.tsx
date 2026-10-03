import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { EventData, MediaItem } from '../types/event';
import { EventMediaGallery } from '../components/event/EventMediaGallery';
import { Camera, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';

export const SnapSharePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const ml = language === 'ml';

  const [event, setEvent] = useState<EventData | null>(null);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSnapShare = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/public/events/${slug}/snapshare`);
        if (!res.ok) throw new Error('Failed to fetch snapshare data');
        const data = await res.json();
        setEvent(data.event || null);
        setMedia(data.media || []);
      } catch (err) {
        console.error('Error fetching snapshare:', err);
        setError('Failed to load SnapShare photos.');
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchSnapShare();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <div className="w-8 h-8 rounded-full border-3 border-sun-primary border-t-deep-red animate-spin" />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-black pt-32 pb-20 px-4 text-center">
        <h2 className="text-xl font-bold text-white mb-4">{error || 'Event Not Found'}</h2>
        <Button asChild variant="outline" className="text-white border-white/20 hover:bg-white/10">
          <Link to={`/events/${slug}`}>Back to Event</Link>
        </Button>
      </div>
    );
  }

  const title = (ml && event.title_ml) ? event.title_ml : event.title;
  const dateStr = event.start_date ? new Date(event.start_date).toLocaleDateString(ml ? 'ml-IN' : 'en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
  }) : '';

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="py-6 mb-6 border-b border-white/10 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div>
            <Link to={`/events/${slug}`} className="inline-flex items-center text-sm text-white/60 hover:text-white mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {ml ? 'തിരികെ പോകുക' : 'Back to Event'}
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-deep-red/20 flex items-center justify-center text-deep-red shrink-0">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <h1 className={`text-2xl md:text-3xl font-bold ${ml ? 'font-malayalam' : ''}`}>
                  {title} - SnapShare
                </h1>
                {dateStr && <p className="text-white/60 text-sm mt-1">{dateStr}</p>}
              </div>
            </div>
          </div>
          
          {event.poster_url && (
            <div className="hidden md:block w-24 h-24 rounded-lg overflow-hidden shrink-0 border border-white/10">
              <img src={event.poster_url} alt={title} className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        {/* Gallery */}
        {media.length > 0 ? (
          <EventMediaGallery media={media} className="mt-8" />
        ) : (
          <div className="text-center py-20 border border-white/10 rounded-2xl bg-white/5">
            <Camera className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white/60">
              {ml ? 'ചിത്രങ്ങൾ ഉടൻ അപ്ഡേറ്റ് ചെയ്യുന്നതാണ്' : 'Photos coming soon'}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};
