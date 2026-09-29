import { useLanguage } from '../../context/LanguageContext';
import { PioneersGallery } from './PioneersGallery';
import { MilestoneTimeline } from './MilestoneTimeline';
import { RedStarIcon } from '../motifs/RedStarIcon';
import { PeaceDove } from '../motifs/PeaceDove';
import { MapPin, Calendar, Sparkles } from 'lucide-react';

export const HistorySection = () => {
  const { t, language } = useLanguage();
  const ml = language === 'ml';

  return (
    <section id="history" className="py-20 sm:py-28 bg-surface-cream scroll-mt-16 relative overflow-hidden">
      {/* Decorative Flying Peace Dove */}
      <div className="absolute top-10 right-12 text-amber-200/40 pointer-events-none hidden lg:block">
        <PeaceDove filled className="w-28 h-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-100 text-brand-red text-xs sm:text-sm font-bold uppercase tracking-wider mb-3">
            <RedStarIcon className="w-3.5 h-3.5 text-brand-red" />
            <span className={ml ? 'font-malayalam' : ''}>{t.history.sectionTag}</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-black text-charcoal tracking-tight mb-4 ${
              ml ? 'font-malayalam' : ''
            }`}
          >
            {t.history.heading}
          </h2>
          <p className={`text-base sm:text-lg text-slate-600 max-w-2xl mx-auto ${ml ? 'font-malayalam-body leading-[1.8]' : ''}`}>
            {ml
              ? '1938-ൽ കണ്ണൂരിലെ കല്ല്യാശ്ശേരിയിൽ തുടക്കമിട്ട കുട്ടികളുടെ വീരോചിതമായ ചരിത്രവും പൈതൃകവും.'
              : 'Traced from the historic anti-feudal awakening in Kalliasseri, Kannur in 1938 to today’s million-strong democratic movement.'}
          </p>
        </div>

        {/* 1938 Genesis Spotlight Card with Festive Theme Backdrop */}
        <div className="bg-gradient-to-br from-[#D32F2F] via-[#B71C1C] to-[#880E4F] text-white rounded-3xl p-8 sm:p-12 shadow-2xl mb-20 relative overflow-hidden border border-red-500/30">
          {/* Subtle Sunburst Arc in card background */}
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-radial from-amber-400/25 via-red-500/10 to-transparent rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-200 mb-6">
              <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                <Calendar className="w-4 h-4 text-sun-yellow" />
                <span>{t.history.foundationDate}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                <MapPin className="w-4 h-4 text-sun-yellow" />
                <span>{t.history.foundationPlace}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-amber-400/20 px-3 py-1.5 rounded-full text-sun-yellow font-black">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{ml ? '88 വർഷത്തെ പാരമ്പര്യം' : '88+ Years Legacy'}</span>
              </span>
            </div>

            <h3
              className={`text-2xl sm:text-4xl font-black mb-6 leading-tight text-white drop-shadow-md ${
                ml ? 'font-malayalam' : ''
              }`}
            >
              {ml
                ? 'കല്ല്യാശ്ശേരിയിലെ വിപ്ലവ മണ്ണിൽ പിറന്ന കുട്ടികളുടെ പ്രസ്ഥാനം'
                : 'Born on the Revolutionary Soil of Kalliasseri, Kannur'}
            </h3>

            <p
              className={`text-base sm:text-lg text-amber-50 leading-relaxed font-medium ${
                ml ? 'font-malayalam-body leading-[1.85]' : ''
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
