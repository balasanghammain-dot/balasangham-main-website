import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Calendar, MapPin, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { EventData } from '../types/event';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

import { VERIFIED_EVENTS } from '../data/verifiedEvents';

export const EventsPage = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'past' | 'observances'>('all');
  
  // Use static verified events (published only)
  const events = VERIFIED_EVENTS.filter(e => e.published === 1 || e.published === true);

  const now = new Date().getTime();
  const upcomingEvents = events
    .filter(e => {
      const start = e.start_date ? new Date(e.start_date).getTime() : 0;
      const end = e.end_date ? new Date(e.end_date).getTime() : start;
      return start >= now || end >= now;
    })
    .sort((a, b) => new Date(a.start_date || 0).getTime() - new Date(b.start_date || 0).getTime());

  const pastEvents = events
    .filter(e => {
      const start = e.start_date ? new Date(e.start_date).getTime() : 0;
      const end = e.end_date ? new Date(e.end_date).getTime() : start;
      return start < now && end < now;
    })
    .sort((a, b) => new Date(b.start_date || 0).getTime() - new Date(a.start_date || 0).getTime());

  const annualObservances = [
    {
      date: 'December 28', dateMl: 'ഡിസംബർ 28',
      name: 'Balasangham Foundation Day', nameMl: 'ബാലസംഘം സ്ഥാപക ദിനം',
      desc: 'Commemorates the 1938 founding at Kalliasseri. Flag hoisting and pledge renewals across 20,000+ units.',
      descMl: '1938-ൽ കല്ല്യാശ്ശേരിയിൽ സംഘടന രൂപംകൊണ്ടതിന്റെ വാർഷികം. മുഴുവൻ യൂണിറ്റുകളിലും പതാക ഉയർത്തലും പ്രതിജ്ഞയും.',
    },
    {
      date: 'November 14–20', dateMl: 'നവംബർ 14–20',
      name: 'Child Rights & Children’s Week', nameMl: 'ശിശുദിന - ബാലാവകാശ വാരം',
      desc: 'Advocacy for child protection, secular values, education rights, and recreational spaces.',
      descMl: 'കുട്ടികളുടെ അവകാശ സംരക്ഷണത്തിനും വിനോദത്തിനും ഊന്നൽ നൽകുന്ന പരിപാടികൾ.',
    },
    {
      date: 'June 5', dateMl: 'ജൂൺ 5',
      name: 'World Environment Day', nameMl: 'ലോക പരിസ്ഥിതി ദിനം',
      desc: 'Tree planting drives, neighborhood sanitation, biodiversity documentation, and eco-pledges.',
      descMl: 'വൃക്ഷത്തൈ നടീലും പരിസ്ഥിതി ശുചീകരണവും പ്രകൃതി സംരക്ഷണ പ്രവർത്തനങ്ങളും.',
    },
    {
      date: 'June 19–25', dateMl: 'ജൂൺ 19–25',
      name: 'Reading Week & Literary Festivals', nameMl: 'വായനാ വാരം',
      desc: 'Book exhibitions, storytelling, poetry recitations, and neighborhood library visits.',
      descMl: 'പുസ്തക പ്രദർശനങ്ങൾ, കഥാകഥനം, വായനശാലാ സന്ദർശനം.',
    },
    {
      date: 'August 6', dateMl: 'ഓഗസ്റ്റ് 6',
      name: 'Hiroshima Peace Day', nameMl: 'ഹിരോഷിമ - സമാധാന ദിനം',
      desc: 'Peace rallies, Sadako crane origami crafting, anti-war exhibitions, and peace pledge ceremonies.',
      descMl: 'സമാധാന റാലികൾ, യുദ്ധവിരുദ്ധ പ്രദർശനങ്ങൾ, സമാധാന പ്രതിജ്ഞ.',
    }
  ];

  const tabs = [
    { id: 'all', label: ml ? 'എല്ലാം' : 'All Events' },
    { id: 'upcoming', label: ml ? 'വരാനിരിക്കുന്നവ' : 'Upcoming' },
    { id: 'past', label: ml ? 'കഴിഞ്ഞവ' : 'Past Events' },
    { id: 'observances', label: ml ? 'ദിനാചരണങ്ങൾ' : 'Observances' }
  ] as const;

  const EventCard = ({ event }: { event: EventData }) => {
    const title = ml && event.title_ml ? event.title_ml : event.title;
    const desc = ml && event.short_description_ml ? event.short_description_ml : event.short_description;
    const location = ml && event.location_ml ? event.location_ml : event.location;
    const dateStr = event.start_date ? new Date(event.start_date).toLocaleDateString(ml ? 'ml-IN' : 'en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    }) : '';

    return (
      <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col h-full group">
        <div className="aspect-[4/3] bg-warm-cream relative overflow-hidden">
          {event.poster_url ? (
            <img src={event.poster_url} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="flex w-full h-full items-center justify-center text-warm-orange/30">
              <ImageIcon className="w-12 h-12" />
            </div>
          )}
          {event.category && (
            <div className="absolute top-4 left-4">
              <Badge variant="default" className="bg-white/90 text-dark-brown backdrop-blur-sm border-none shadow-sm">{event.category}</Badge>
            </div>
          )}
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className={`text-xl font-bold text-dark-brown mb-2 line-clamp-2 ${ml ? 'font-malayalam' : ''}`}>
            {title}
          </h3>
          <div className="space-y-1.5 mb-4 text-sm text-slate-600">
            {dateStr && (
              <p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-deep-red" /> {dateStr}</p>
            )}
            {location && (
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-deep-red" /> {location}</p>
            )}
          </div>
          {desc && (
            <p className={`text-sm text-slate-600 mb-6 line-clamp-3 ${ml ? 'font-malayalam-body leading-relaxed' : ''}`}>
              {desc}
            </p>
          )}
          <div className="mt-auto pt-4 border-t border-slate-100">
            <Button asChild variant="ghost" className="w-full justify-between hover:bg-red-50 hover:text-deep-red">
              <Link to={`/events/${event.slug}`}>
                <span className={ml ? 'font-malayalam text-sm' : ''}>{ml ? 'കൂടുതൽ വിവരങ്ങൾ' : 'View Details'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderEventGrid = (eventsList: EventData[]) => {
    if (eventsList.length === 0) {
      return (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
          <p className="text-slate-500 font-medium">
            {ml ? 'ഇതുവരെ പരിപാടികൾ ഒന്നും ചേർത്തിട്ടില്ല.' : 'No events found.'}
          </p>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
        {eventsList.map(event => <EventCard key={event.id} event={event} />)}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-soft-cream pt-24 pb-20">
      <section className="bg-gradient-to-br from-amber-500 via-deep-red to-rose-900 text-white relative overflow-hidden py-16 sm:py-24 mb-12">
        <div className="editorial-container relative z-10 text-center">
          <Breadcrumb
            items={[
              { label: 'Events', labelMl: 'പരിപാടികൾ' },
            ]}
            className="mb-8 justify-center [&_a]:text-white/80 [&_a:hover]:text-white [&_span]:text-white/50"
          />
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-black mb-6 ${ml ? 'font-malayalam' : ''}`}>
            {ml ? 'പരിപാടികൾ' : 'Events'}
          </h1>
          <p className={`text-lg md:text-xl text-amber-50 max-w-2xl mx-auto ${ml ? 'font-malayalam-body leading-relaxed' : ''}`}>
            {ml
              ? 'ബാലസംഘം സംഘടിപ്പിക്കുന്ന പ്രധാന പരിപാടികളും സമ്മേളനങ്ങളും വാർഷിക ദിനാചരണങ്ങളും'
              : 'Join our conferences, cultural festivals, and community gatherings empowering children.'}
          </p>
        </div>
      </section>

      <section className="editorial-container">
        <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-deep-red text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              } ${ml ? 'font-malayalam' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {(activeTab === 'all' || activeTab === 'upcoming' || activeTab === 'past') && (
          <div className="mb-14">
            <h2 className={`text-2xl font-bold text-dark-brown mb-6 ${ml ? 'font-malayalam' : ''}`}>
              {activeTab === 'upcoming' ? (ml ? 'വരാനിരിക്കുന്നവ' : 'Upcoming Events') : 
               activeTab === 'past' ? (ml ? 'കഴിഞ്ഞവ' : 'Past Events') : 
               (ml ? 'എല്ലാ പരിപാടികളും' : 'All Featured Events')}
            </h2>
            {renderEventGrid(
              activeTab === 'upcoming' ? upcomingEvents : 
              activeTab === 'past' ? pastEvents : events
            )}
          </div>
        )}

        {/* Annual Observances Section */}
        {(activeTab === 'all' || activeTab === 'observances') && (
          <div className="mb-14">
            <h2 className={`text-2xl font-bold text-dark-brown mb-6 ${ml ? 'font-malayalam' : ''}`}>
              {ml ? 'വാർഷിക ദിനാചരണങ്ങൾ' : 'Annual Observances & Peace Days'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {annualObservances.map((obs, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm flex flex-col">
                  <span className="inline-block px-3 py-1 rounded-full bg-red-50 text-deep-red font-bold text-xs mb-3 w-max">
                    {ml ? obs.dateMl : obs.date}
                  </span>
                  <h3 className={`text-lg font-bold text-dark-brown mb-2 ${ml ? 'font-malayalam' : ''}`}>
                    {ml ? obs.nameMl : obs.name}
                  </h3>
                  <p className={`text-sm text-slate-600 leading-relaxed ${ml ? 'font-malayalam-body' : ''}`}>
                    {ml ? obs.descMl : obs.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </section>
    </div>
  );
};
