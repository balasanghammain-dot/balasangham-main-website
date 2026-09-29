import { useLanguage } from '../../context/LanguageContext';
import { PioneersGallery } from './PioneersGallery';
import { MilestoneTimeline } from './MilestoneTimeline';
import { MapPin, Calendar } from 'lucide-react';

export const HistorySection = () => {
  const { t, language } = useLanguage();

  return (
    <section id="history" className="py-20 sm:py-28 bg-surface-cream scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-red mb-2 block">
            {t.history.sectionTag}
          </span>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight mb-4 ${
              language === 'ml' ? 'font-malayalam' : ''
            }`}
          >
            {t.history.heading}
          </h2>
        </div>

        {/* 1938 Genesis Spotlight Card */}
        <div className="bg-gradient-to-br from-brand-red to-[#B71C1C] text-white rounded-3xl p-8 sm:p-12 shadow-xl mb-20 relative overflow-hidden">
          <div className="relative z-10 max-w-4xl">
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-200 mb-4">
              <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
                <Calendar className="w-4 h-4" />
                {t.history.foundationDate}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
                <MapPin className="w-4 h-4" />
                {t.history.foundationPlace}
              </span>
            </div>

            <h3
              className={`text-2xl sm:text-4xl font-extrabold mb-6 leading-tight ${
                language === 'ml' ? 'font-malayalam' : ''
              }`}
            >
              {language === 'ml'
                ? 'കല്ല്യാശ്ശേരിയിലെ വിപ്ലവ മണ്ണിൽ പിറന്ന കുട്ടികളുടെ പ്രസ്ഥാനം'
                : 'Born on the Revolutionary Soil of Kalliasseri'}
            </h3>

            <p
              className={`text-base sm:text-lg text-amber-50 leading-relaxed ${
                language === 'ml' ? 'font-malayalam-body' : ''
              }`}
            >
              {t.history.genesisStory}
            </p>
          </div>
        </div>

        {/* Historic Pioneers */}
        <PioneersGallery />

        {/* Timeline */}
        <MilestoneTimeline />
      </div>
    </section>
  );
};
