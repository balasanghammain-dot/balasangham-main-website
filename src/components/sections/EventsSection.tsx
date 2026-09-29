import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { RedStarIcon } from '../motifs/RedStarIcon';
import { Calendar, MapPin, ArrowRight, Sparkles } from 'lucide-react';

export const EventsSection = () => {
  const { t, language } = useLanguage();
  const ml = language === 'ml';
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filterTabs = [
    { id: 'all', label: t.events.filterAll },
    { id: 'arts', label: t.events.filterArts },
    { id: 'conferences', label: t.events.filterConferences },
    { id: 'jathas', label: t.events.filterJathas },
    { id: 'memorials', label: t.events.filterMemorials },
  ];

  const filteredItems =
    activeCategory === 'all'
      ? t.events.items
      : t.events.items.filter((item) => item.category === activeCategory);

  // Conference is Oct 10–11, 2026. Automatically classify as PAST EVENT after 2026-10-11.
  const conferenceEndDate = new Date('2026-10-11T23:59:59');
  const isConferencePast = new Date() > conferenceEndDate;

  return (
    <section id="events" className="py-16 sm:py-24 bg-[#F4EBDD] scroll-mt-16 relative overflow-hidden border-b border-[#241914]/15 bg-paper-grain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#E9DDC9] border border-[#241914]/15 text-[#241914] text-xs font-bold uppercase tracking-wider shadow-2xs">
              <Calendar className="w-3.5 h-3.5 text-[#C90000]" />
              <span className={ml ? 'font-malayalam' : ''}>{t.events.sectionTag}</span>
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#241914]/60">
              // EDITORIAL EVENT CALENDAR
            </span>
          </div>

          <h2
            className={`text-3xl sm:text-5xl font-black text-[#171514] tracking-tight uppercase leading-[1.05] mb-4 ${
              ml ? 'font-malayalam normal-case text-3xl sm:text-4xl' : ''
            }`}
          >
            {t.events.heading}
          </h2>

          <p className={`text-base sm:text-lg text-[#241914]/80 max-w-2xl font-medium leading-relaxed ${ml ? 'font-malayalam-body leading-[1.8]' : ''}`}>
            {ml
              ? 'കുട്ടികളുടെ സർഗ്ഗാത്മകതയും ജനാധിപത്യ ബോധവും ഉയർത്തുന്ന സംസ്ഥാന, ജില്ലാ, യൂണിറ്റ് തല മേളകളും സമ്മേളനങ്ങളും.'
              : 'Celebrating youthful artistry, democratic reflection, and solidarity through statewide children’s festivals.'}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-12 border-b border-[#241914]/15 pb-4">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCategory(tab.id)}
              aria-pressed={activeCategory === tab.id}
              className={`px-4 py-2 rounded-md text-xs sm:text-sm font-mono uppercase font-bold tracking-wider transition-all min-h-[40px] ${
                activeCategory === tab.id
                  ? 'bg-[#C90000] text-white shadow-xs'
                  : 'bg-[#E9DDC9] text-[#241914] hover:bg-[#E9DDC9]/70 border border-[#241914]/15'
              } ${ml ? 'font-malayalam normal-case' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((event) => {
            const isConference2026 = event.id === 'ev-conf-2026';

            if (isConference2026) {
              return (
                <article
                  key={event.id}
                  className="md:col-span-2 lg:col-span-3 bg-[#241914] text-[#F4EBDD] rounded-xl p-6 sm:p-9 shadow-warm-lg border border-[#241914] relative overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Left: Poster image representation */}
                    <div className="lg:col-span-4 relative">
                      <div className="relative overflow-hidden rounded-lg border border-[#F4EBDD]/20 shadow-md aspect-3/4 max-w-xs mx-auto">
                        <img
                          src="/images/conference-poster-2026.jpg"
                          alt="Balasangham Kannur District Conference 2026 Official Poster - Kalliasseri"
                          className="w-full h-full object-cover object-center"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-xs bg-[#C90000] text-white text-[10px] font-mono uppercase font-bold tracking-wider">
                          OFFICIAL POSTER
                        </div>
                      </div>
                    </div>

                    {/* Right: Conference details */}
                    <div className="lg:col-span-8 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F4EBDD]/15 pb-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-xs text-[11px] font-mono uppercase font-bold tracking-wider ${
                              isConferencePast
                                ? 'bg-[#5C544E] text-white'
                                : 'bg-[#C90000] text-white'
                            }`}
                          >
                            {isConferencePast
                              ? (ml ? 'കഴിഞ്ഞ പരിപാടി // PAST EVENT' : 'PAST EVENT')
                              : (ml ? 'വരാനിരിക്കുന്ന പരിപാടി // UPCOMING' : 'UPCOMING CONFERENCE')}
                          </span>
                          <span className="text-xs font-mono text-[#F4EBDD]/60 uppercase tracking-widest hidden sm:inline">
                            VOL. 2026 // KALLIASSERI
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-mono text-[#F4EBDD]/80">
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#B99658]" />
                            {event.dateOrFreq}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#B99658]" />
                            {event.scope}
                          </span>
                        </div>
                      </div>

                      <h3
                        className={`text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight ${
                          ml ? 'font-malayalam' : ''
                        }`}
                      >
                        {event.title}
                      </h3>

                      <p
                        className={`text-sm sm:text-base text-[#F4EBDD]/85 leading-relaxed font-medium ${
                          ml ? 'font-malayalam-body leading-[1.8]' : ''
                        }`}
                      >
                        {event.description}
                      </p>

                      <div className="p-4 rounded-lg bg-[#171514] border border-[#F4EBDD]/10 space-y-2">
                        <div className="flex flex-wrap items-center justify-between text-xs font-mono text-[#F4EBDD]/70 gap-2">
                          <span className="flex items-center gap-1.5 text-[#B99658] font-bold">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>{ml ? 'മുദ്രാവാക്യം: പോരാട്ടത്തിന്റെ ബാല്യം' : 'THEME: CHILDHOOD OF STRUGGLE'}</span>
                          </span>
                          <span>VENUE: PCR BANK AUDITORIUM, KALLIASSERI</span>
                        </div>
                      </div>

                      <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-xs font-mono text-[#F4EBDD]/60">
                          <RedStarIcon size={12} className="text-[#C90000]" />
                          <span>{ml ? 'കണ്ണൂർ ജില്ലാ കമ്മിറ്റി' : 'BALASANGHAM KANNUR'}</span>
                        </div>
                        <a
                          href="/events/kannur-district-conference-2026"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#C90000] hover:bg-[#A30000] text-white text-xs font-mono uppercase font-bold tracking-wider transition-colors shadow-xs"
                        >
                          <span>{ml ? 'സമ്മേളന വിവരങ്ങൾ കാണുക' : 'VIEW CONFERENCE DETAILS'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              );
            }

            return (
              <article
                key={event.id}
                className="bg-[#FFF9EF] rounded-xl p-6 border border-[#241914]/15 shadow-warm hover:border-[#C90000]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#241914]/70 mb-3 pb-2.5 border-b border-[#241914]/10">
                    <span className="inline-flex items-center gap-1.5 font-bold text-[#C90000]">
                      <Calendar className="w-3.5 h-3.5" />
                      {event.dateOrFreq}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[#241914]/60">
                      <MapPin className="w-3.5 h-3.5 text-[#B99658]" />
                      {event.scope}
                    </span>
                  </div>

                  <h3
                    className={`font-black text-xl text-[#171514] mb-3 group-hover:text-[#C90000] transition-colors leading-snug ${
                      ml ? 'font-malayalam' : ''
                    }`}
                  >
                    {event.title}
                  </h3>

                  <p
                    className={`text-sm text-[#241914]/80 leading-relaxed font-medium mb-4 ${
                      ml ? 'font-malayalam-body leading-[1.75]' : ''
                    }`}
                  >
                    {event.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#241914]/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#241914]/50 uppercase tracking-wider">
                    {event.category.toUpperCase()}
                  </span>
                  <a
                    href={`/events/${event.id}`}
                    className="font-bold text-[#C90000] hover:text-[#A30000] flex items-center gap-1"
                  >
                    <span>{ml ? 'വിശദാംശങ്ങൾ' : 'Details'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
