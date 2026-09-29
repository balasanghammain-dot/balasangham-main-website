import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Calendar, MapPin, Sparkles } from 'lucide-react';

export const EventsSection = () => {
  const { t, language } = useLanguage();
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

  return (
    <section id="events" className="py-20 sm:py-28 bg-surface-cream scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-red mb-2 block">
            {t.events.sectionTag}
          </span>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight mb-4 ${
              language === 'ml' ? 'font-malayalam' : ''
            }`}
          >
            {t.events.heading}
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCategory(tab.id)}
              aria-pressed={activeCategory === tab.id}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 min-h-[40px] focus:outline-hidden focus:ring-2 focus:ring-brand-red ${
                activeCategory === tab.id
                  ? 'bg-brand-red text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              } ${language === 'ml' ? 'font-malayalam' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-brand-red mb-3">
                  <span className="inline-flex items-center gap-1.5 bg-red-50 px-2.5 py-1 rounded-full">
                    <Calendar className="w-3.5 h-3.5" />
                    {event.dateOrFreq}
                  </span>
                  <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
                    <MapPin className="w-3.5 h-3.5" />
                    {event.scope}
                  </span>
                </div>

                <h3
                  className={`text-xl font-bold text-charcoal mb-3 ${
                    language === 'ml' ? 'font-malayalam' : ''
                  }`}
                >
                  {event.title}
                </h3>

                <p
                  className={`text-sm text-slate-600 leading-relaxed mb-6 ${
                    language === 'ml' ? 'font-malayalam-body' : ''
                  }`}
                >
                  {event.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-amber-600">
                <Sparkles className="w-4 h-4 text-sun-yellow" />
                <span>Balasangham Official Event</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
