import { useLanguage } from '../../context/LanguageContext';
import { BackdropSunburst } from '../motifs/BackdropSunburst';
import { ChildrenSilhouettes } from '../motifs/ChildrenSilhouettes';
import { RedStarIcon } from '../motifs/RedStarIcon';
import { StatsRibbon } from './StatsRibbon';
import { Music, ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  onOpenAnthem: () => void;
}

export const HeroSection = ({ onOpenAnthem }: HeroSectionProps) => {
  const { t, language } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FBC02D] via-[#F57F17] to-[#D32F2F] text-white pt-16 sm:pt-24 pb-20 sm:pb-28">
      {/* Sunburst Stage Arc Backdrop */}
      <BackdropSunburst />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs sm:text-sm font-bold uppercase tracking-wider mb-6 shadow-sm">
          <RedStarIcon className="w-4 h-4 text-white drop-shadow" />
          <span className={language === 'ml' ? 'font-malayalam' : ''}>{t.hero.badge}</span>
        </div>

        {/* Primary Celebratory Slogan */}
        <h1
          className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-md leading-tight sm:leading-tight mb-4 ${
            language === 'ml' ? 'font-malayalam' : ''
          }`}
        >
          {t.hero.headline}
        </h1>

        {/* Sub-headline */}
        <p
          className={`text-base sm:text-xl lg:text-2xl text-amber-100 max-w-3xl mx-auto font-medium mb-8 sm:mb-10 drop-shadow-xs leading-relaxed ${
            language === 'ml' ? 'font-malayalam-body' : ''
          }`}
        >
          {t.hero.subheadline}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 sm:mb-10">
          <a
            href="#about"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-brand-red font-bold text-sm sm:text-base shadow-lg hover:bg-amber-50 hover:shadow-xl transition-all duration-200 min-h-[48px]"
          >
            <span className={language === 'ml' ? 'font-malayalam' : ''}>{t.hero.exploreHistoryBtn}</span>
            <ArrowDown className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={onOpenAnthem}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#B71C1C]/80 text-white font-bold text-sm sm:text-base border border-white/30 shadow-lg hover:bg-[#B71C1C] transition-all duration-200 min-h-[48px]"
          >
            <Music className="w-4 h-4 text-sun-yellow" />
            <span className={language === 'ml' ? 'font-malayalam' : ''}>{t.hero.listenAnthemBtn}</span>
          </button>
        </div>

        {/* Featured Current Event Spotlight (2026 District Conference) */}
        <div className="max-w-2xl mx-auto mb-10 p-4 sm:p-5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-sun-yellow uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-sun-yellow animate-pulse"></span>
              <span>{language === 'ml' ? 'പ്രധാന സമകാലിക പരിപാടി' : 'Featured Current Event'}</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white notranslate">
              {language === 'ml' ? 'ബാലസംഘം കണ്ണൂർ ജില്ലാ സമ്മേളനം 2026' : 'Balasangham Kannur District Conference 2026'}
            </h2>
            <p className="text-xs sm:text-sm text-amber-100">
              {language === 'ml'
                ? '2026 ഒക്ടോബർ 10, 11 — കല്ല്യാശ്ശേരി, കണ്ണൂർ • '
                : '10–11 October 2026 — Kalliasseri, Kannur • '}
              <span className="font-bold text-white notranslate">പോരാട്ടത്തിന്റെ ബാല്യം ✊🏻</span>
            </p>
          </div>
          <a
            href="#events"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-brand-red font-bold text-xs shadow-sm hover:bg-amber-50 transition-colors whitespace-nowrap"
          >
            <span>{language === 'ml' ? 'വിവരങ്ങൾ കാണുക' : 'Explore Event'}</span>
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>

        {/* Silhouettes of Joyful Children */}
        <ChildrenSilhouettes className="mt-4" />
      </div>

      {/* Stats Counter Ribbon */}
      <StatsRibbon />
    </section>
  );
};
