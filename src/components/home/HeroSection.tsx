import { useLanguage } from '../../context/LanguageContext';
import { RedStarIcon } from '../motifs/RedStarIcon';
import { FestiveBunting } from '../motifs/FestiveBunting';
import { StatsRibbon } from './StatsRibbon';
import { Music, ArrowDown, Sparkles, Star } from 'lucide-react';

interface HeroSectionProps {
  onOpenAnthem: () => void;
}

export const HeroSection = ({ onOpenAnthem }: HeroSectionProps) => {
  const { t, language } = useLanguage();
  const ml = language === 'ml';

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFD84D] via-[#FFC928] to-[#FFB703] text-[#321A12] pt-4 sm:pt-6 pb-12 sm:pb-20 border-b border-[#F57C00]/20">
      {/* Festive Pennant Flags / Bunting along the top */}
      <FestiveBunting className="absolute top-0 inset-x-0 z-20" />

      {/* Radiant Organic Sun Circle Motif behind children */}
      <div
        className="pointer-events-none absolute top-12 right-4 sm:right-16 w-72 sm:w-96 lg:w-[480px] h-72 sm:h-96 lg:h-[480px] rounded-full bg-[#FFF4D6]/70 blur-xl opacity-90"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-16 w-80 h-80 rounded-full bg-[#FF9F00]/25 blur-3xl opacity-70"
        aria-hidden="true"
      />

      {/* Playful Confetti & Stars */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0" aria-hidden="true">
        {/* Floating Confetti Shapes */}
        <div className="absolute top-16 left-8 text-[#D71920] opacity-80 animate-float-y">
          <Star className="w-5 h-5 fill-[#D71920] text-[#D71920]" />
        </div>
        <div className="absolute top-36 left-1/4 text-[#7B2CBF] opacity-75 animate-sway">
          <div className="w-3 h-3 rounded-full bg-[#7B2CBF]" />
        </div>
        <div className="absolute top-24 right-1/3 text-[#168BD4] opacity-70 animate-drift-x">
          <Sparkles className="w-5 h-5 text-[#168BD4]" />
        </div>
        <div className="absolute bottom-40 right-12 text-[#2E9E5B] opacity-80 animate-float-y-slow">
          <div className="w-3.5 h-3.5 rotate-45 bg-[#2E9E5B]" />
        </div>
        <div className="absolute top-1/2 left-10 text-[#F57C00] opacity-60">
          <div className="w-2.5 h-2.5 rounded-full bg-[#F57C00]" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 pt-4">
        {/* Playful District Pill Badge */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5 sm:mb-8 animate-rise-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#321A12]/15 text-[#321A12] text-xs font-bold uppercase tracking-wider shadow-xs">
            <RedStarIcon size={14} className="text-[#D71920]" />
            <span className={ml ? 'font-malayalam normal-case text-sm font-semibold' : ''}>
              {ml ? 'ബാലസംഘം കണ്ണൂർ ജില്ലാ കമ്മിറ്റി' : 'Balasangham Kannur District Committee'}
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#321A12]/10 text-[11px] font-mono text-[#321A12] uppercase tracking-wider font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]" />
            {ml ? 'സ്ഥാപിതം 1938 • കല്ല്യാശ്ശേരി' : 'Estd. 1938 • Kalliasseri, Kannur'}
          </span>
        </div>

        {/* Hero Main Content Spread: Large Malayalam Headline + Children Illustration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Expressive Typography & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <h1
                className={`text-4xl sm:text-6xl xl:text-7xl font-black text-[#D71920] tracking-tight leading-[1.08] ${
                  ml ? 'font-malayalam normal-case text-5xl sm:text-6xl xl:text-7xl leading-[1.15]' : ''
                }`}
              >
                {ml ? 'ബാലസംഘം' : 'Balasangham'}
              </h1>
              <p
                className={`text-2xl sm:text-4xl xl:text-5xl font-black text-[#321A12] tracking-tight leading-tight ${
                  ml ? 'font-malayalam normal-case leading-[1.35]' : ''
                }`}
              >
                {ml ? 'കുട്ടികളും സംസ്കാരവും ചേർത്തുപിടിച്ച മുന്നേറ്റം' : 'Children, Culture & Creative Expression'}
              </p>
            </div>

            {/* Conference / Motto Highlight Pill */}
            <div className="inline-flex flex-wrap items-center gap-2 px-4 py-2 rounded-2xl bg-white/95 border border-[#321A12]/15 shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D71920] animate-pulse" />
              <span className="text-xs sm:text-sm font-black text-[#D71920] uppercase tracking-wider">
                {t.hero.headline} • {ml ? 'പഠനം, മനനം, ചലനം' : 'Study, Contemplate, Act'}
              </span>
            </div>

            <p
              className={`text-base sm:text-lg text-[#321A12]/90 leading-relaxed font-medium max-w-2xl ${
                ml ? 'font-malayalam-body text-base sm:text-lg leading-[1.8]' : ''
              }`}
            >
              {ml
                ? '1938-ൽ കല്ല്യാശ്ശേരിയിൽ തുടക്കമിട്ട കുട്ടികളുടെ സാംസ്കാരിക മുന്നേറ്റം. അറിവും ജനാധിപത്യ ബോധവും മതനിരപേക്ഷ സ്നേഹവും പകർന്ന് കേരളത്തിലെ ലക്ഷക്കണക്കിന് കുട്ടികൾ ഒന്നിക്കുന്ന വേദി.'
                : 'The world’s largest democratic children’s cultural movement, nurturing critical thinking, secular fraternity, and fearless creative expression across Kerala since 1938.'}
            </p>

            {/* Primary & Secondary Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href="#about"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#D71920] hover:bg-[#B31219] text-white font-bold text-sm shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all min-h-[48px]"
              >
                <span className={ml ? 'font-malayalam text-base' : ''}>
                  {ml ? 'ബാലസംഘത്തെ അറിയുക' : 'Explore Balasangham'}
                </span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={onOpenAnthem}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/95 text-[#321A12] font-bold text-sm border-2 border-[#321A12]/15 hover:border-[#D71920] hover:text-[#D71920] hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-xs min-h-[48px]"
                aria-label={t.hero.listenAnthemBtn}
              >
                <Music className="w-4 h-4 text-[#D71920]" />
                <span className={ml ? 'font-malayalam text-base' : ''}>{t.hero.listenAnthemBtn}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Joyous Children Jumping Group Illustration (from reference screenshot) */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div className="relative w-full max-w-md lg:max-w-none">
              {/* Organic circular halo behind illustration */}
              <div className="absolute inset-0 rounded-full bg-[#FFF4D6]/80 scale-95 blur-sm" />

              <img
                src="/images/happy-children-jumping.png"
                alt="Joyous children jumping and celebrating cultural unity in Balasangham"
                className="relative z-10 w-full h-auto object-contain max-h-[380px] sm:max-h-[460px] drop-shadow-md transition-transform duration-500 hover:scale-[1.02]"
                loading="eager"
              />
            </div>
          </div>
        </div>

        {/* 2x2 Stats Ribbon at bottom of hero */}
        <StatsRibbon />
      </div>
    </section>
  );
};
