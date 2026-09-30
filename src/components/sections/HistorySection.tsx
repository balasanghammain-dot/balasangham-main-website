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
    <section id="history" className="py-20 sm:py-28 bg-soft-cream scroll-mt-16 relative overflow-hidden border-b border-sun-primary/20">
      {/* Decorative Flying Peace Dove */}
      <div className="absolute top-10 right-12 text-sun-primary/30 pointer-events-none hidden lg:block animate-float-y">
        <PeaceDove filled className="w-28 h-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sun-primary/20 border border-sun-primary/40 text-dark-brown text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <RedStarIcon size={14} className="text-deep-red" />
            <span className={ml ? 'font-malayalam' : ''}>{t.history.sectionTag}</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-black text-dark-brown tracking-tight mb-4 uppercase ${
              ml ? 'font-malayalam normal-case text-3xl sm:text-4xl' : ''
            }`}
          >
            {t.history.heading}
          </h2>
          <p className={`text-base sm:text-lg text-dark-brown/80 max-w-2xl mx-auto leading-relaxed font-medium ${ml ? 'font-malayalam-body leading-[1.8]' : ''}`}>
            {ml
              ? '1938-ൽ കണ്ണൂരിലെ കല്ല്യാശ്ശേരിയിൽ തുടക്കമിട്ട കുട്ടികളുടെ വീരോചിതമായ ചരിത്രവും പൈതൃകവും.'
              : 'Traced from the historic anti-feudal awakening in Kalliasseri, Kannur in 1938 to today’s million-strong democratic movement.'}
          </p>
        </div>

        {/* 1938 Genesis Spotlight Card with Festive Theme Backdrop */}
        <div className="bg-gradient-to-br from-berry via-berry-dark to-ink text-white rounded-3xl p-8 sm:p-12 shadow-warm-lg mb-20 relative overflow-hidden border-2 border-sun-primary/40">
          {/* Subtle Sunburst Arc in card background */}
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-gradient-radial from-sun-primary/25 via-deep-red/15 to-transparent rounded-full pointer-events-none animate-pulse-glow" />

          <div className="relative z-10 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-sun-primary mb-6">
              <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
                <Calendar className="w-4 h-4 text-sun-primary" />
                <span>{t.history.foundationDate}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
                <MapPin className="w-4 h-4 text-sun-primary" />
                <span>{t.history.foundationPlace}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-sun-primary/25 px-4 py-1.5 rounded-full text-sun-primary font-black border border-sun-primary/40">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{ml ? '88 വർഷത്തെ പാരമ്പര്യം' : '88+ Years Legacy'}</span>
              </span>
            </div>

            <h3
              className={`text-2xl sm:text-4xl font-black mb-6 leading-tight text-white drop-shadow-sm ${
                ml ? 'font-malayalam' : ''
              }`}
            >
              {ml
                ? 'കല്ല്യാശ്ശേരിയിലെ വിപ്ലവ മണ്ണിൽ പിറന്ന കുട്ടികളുടെ പ്രസ്ഥാനം'
                : 'Born on the Revolutionary Soil of Kalliasseri, Kannur'}
            </h3>

            <p
              className={`text-base sm:text-lg text-soft-cream/95 leading-relaxed font-medium ${
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
