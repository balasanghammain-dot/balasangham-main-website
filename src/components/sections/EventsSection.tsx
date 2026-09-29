import { useState } from 'react';
import { Link } from 'react-router-dom';
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
    <section id="events" className="py-16 sm:py-24 bg-cream scroll-mt-16 relative overflow-hidden border-b border-festival/20 bg-paper-grain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-festival/20 border border-festival/40 text-ink text-xs font-bold uppercase tracking-wider shadow-2xs">
              <Calendar className="w-3.5 h-3.5 text-berry" />
              <span className={ml ? 'font-malayalam' : ''}>{t.events.sectionTag}</span>
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-ink/60">
              // EVENT CALENDAR
            </span>
          </div>

          <h2
            className={`text-3xl sm:text-5xl font-black text-ink tracking-tight uppercase leading-[1.05] mb-4 ${
              ml ? 'font-malayalam normal-case text-3xl sm:text-4xl' : ''
            }`}
          >
            {t.events.heading}
          </h2>

          <p className={`text-base sm:text-lg text-ink/80 max-w-2xl font-medium leading-relaxed ${ml ? 'font-malayalam-body leading-[1.8]' : ''}`}>
            {ml
              ? 'കുട്ടികളുടെ സർഗ്ഗാത്മകതയും ജനാധിപത്യ ബോധവും ഉയർത്തുന്ന സംസ്ഥാന, ജില്ലാ, യൂണിറ്റ് തല മേളകളും സമ്മേളനങ്ങളും.'
              : 'Celebrating youthful artistry, democratic reflection, and solidarity through statewide children’s festivals.'}
          </p>
        </div>

        {/* Filter Tabs with Rounded-Full Festive Pills (Horizontal touch-scroll on mobile) */}
        <div className="flex items-center gap-2 sm:gap-3 mb-12 border-b border-ink/10 pb-4 overflow-x-auto no-scrollbar scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCategory(tab.id)}
              aria-pressed={activeCategory === tab.id}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-mono uppercase font-bold tracking-wider transition-all min-h-[48px] shrink-0 active:scale-95 ${
                activeCategory === tab.id
                  ? 'bg-[#D32020] text-white shadow-festive border-2 border-[#D32020]'
                  : 'bg-white/90 text-ink hover:bg-festival/20 border-2 border-festival/30'
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
                  className="md:col-span-2 lg:col-span-3 bg-gradient-to-br from-ink via-[#382622] to-berry/40 text-cream rounded-3xl p-6 sm:p-9 shadow-warm-lg border-2 border-festival/40 relative overflow-hidden group"
                >
                  {/* Decorative corner glow */}
                  <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-festival/20 blur-3xl pointer-events-none" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                    {/* Left: Poster image representation */}
                    <div className="lg:col-span-4 relative">
                      <div className="relative overflow-hidden rounded-2xl border-2 border-festival/40 shadow-md aspect-3/4 max-w-xs mx-auto group">
                        <img
                          src="/images/conference-poster-2026.jpg"
                          alt="Balasangham Kannur District Conference 2026 Official Poster - Kalliasseri"
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-berry text-white text-[11px] font-mono uppercase font-bold tracking-wider shadow-sm">
                          OFFICIAL POSTER
                        </div>
                      </div>
                    </div>

                    {/* Right: Conference details */}
                    <div className="lg:col-span-8 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cream/15 pb-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3.5 py-1 rounded-full text-xs font-mono uppercase font-bold tracking-wider ${
                              isConferencePast
                                ? 'bg-ink/70 text-cream border border-cream/20'
                                : 'bg-berry text-white shadow-xs'
                            }`}
                          >
                            {isConferencePast
                              ? (ml ? 'കഴിഞ്ഞ പരിപാടി // PAST EVENT' : 'PAST EVENT')
                              : (ml ? 'വരാനിരിക്കുന്ന പരിപാടി // UPCOMING' : 'UPCOMING CONFERENCE')}
                          </span>
                          <span className="text-xs font-mono text-festival uppercase tracking-widest hidden sm:inline">
                            VOL. 2026 // KALLIASSERI
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-mono text-cream/90">
                          <span className="inline-flex items-center gap-1.5 bg-ink/40 px-3 py-1 rounded-full border border-cream/10">
                            <Calendar className="w-3.5 h-3.5 text-festival" />
                            {event.dateOrFreq}
                          </span>
                          <span className="inline-flex items-center gap-1.5 bg-ink/40 px-3 py-1 rounded-full border border-cream/10">
                            <MapPin className="w-3.5 h-3.5 text-festival" />
                            {event.scope}
                          </span>
                        </div>
                      </div>

                      <h3
                        className={`text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight ${
                          ml ? 'font-malayalam leading-[1.35]' : ''
                        }`}
                      >
                        {event.title}
                      </h3>

                      <p
                        className={`text-sm sm:text-base text-cream/85 leading-relaxed font-medium ${
                          ml ? 'font-malayalam-body leading-[1.8]' : ''
                        }`}
                      >
                        {event.description}
                      </p>

                      <div className="p-4 rounded-2xl bg-ink/60 border border-festival/20 space-y-2">
                        <div className="flex flex-wrap items-center justify-between text-xs font-mono text-cream/80 gap-2">
                          <span className="flex items-center gap-1.5 text-festival font-bold">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>{ml ? 'മുദ്രാവാക്യം: പോരാട്ടത്തിന്റെ ബാല്യം' : 'THEME: CHILDHOOD OF STRUGGLE'}</span>
                          </span>
                          <span className="text-cream/60">VENUE: PCR BANK AUDITORIUM, KALLIASSERI</span>
                        </div>
                      </div>

                      <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-xs font-mono text-cream/70">
                          <RedStarIcon size={12} className="text-berry" />
                          <span>{ml ? 'കണ്ണൂർ ജില്ലാ കമ്മിറ്റി' : 'BALASANGHAM KANNUR'}</span>
                        </div>
                        <Link
                          to="/events/kannur-district-conference-2026"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-berry hover:bg-berry-dark text-white text-xs font-mono uppercase font-bold tracking-wider transition-all shadow-festive hover:scale-105 active:scale-95 min-h-[48px]"
                        >
                          <span>{ml ? 'സമ്മേളന വിവരങ്ങൾ കാണുക' : 'VIEW CONFERENCE DETAILS'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            }

            return (
              <article
                key={event.id}
                className="bg-white/95 rounded-3xl p-6 border-2 border-festival/30 shadow-warm hover:shadow-warm-lg hover:border-berry/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-ink/70 mb-3 pb-2.5 border-b border-ink/10">
                    <span className="inline-flex items-center gap-1.5 font-bold text-berry">
                      <Calendar className="w-3.5 h-3.5" />
                      {event.dateOrFreq}
                    </span>
                    <span className="inline-flex items-center gap-1 text-ink/60">
                      <MapPin className="w-3.5 h-3.5 text-festival-deep" />
                      {event.scope}
                    </span>
                  </div>

                  <h3
                    className={`font-black text-xl text-ink mb-3 group-hover:text-berry transition-colors leading-snug ${
                      ml ? 'font-malayalam leading-[1.4]' : ''
                    }`}
                  >
                    {event.title}
                  </h3>

                  <p
                    className={`text-sm text-ink/80 leading-relaxed font-medium mb-4 ${
                      ml ? 'font-malayalam-body leading-[1.75]' : ''
                    }`}
                  >
                    {event.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-ink/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-xs font-mono uppercase tracking-wider text-berry font-bold px-2.5 py-0.5 rounded-full bg-berry/10">
                    {event.category.toUpperCase()}
                  </span>
                  <Link
                    to={`/events/${event.id}`}
                    className="font-bold text-berry hover:text-berry-dark inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform min-h-[48px] px-2 -my-2"
                  >
                    <span>{ml ? 'വിശദാംശങ്ങൾ' : 'Details'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
