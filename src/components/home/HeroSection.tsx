import { useLanguage } from '../../context/LanguageContext';
import { RedStarIcon } from '../motifs/RedStarIcon';
import { StatsRibbon } from './StatsRibbon';
import { Music, ArrowDown, ArrowRight, Calendar, MapPin, Sparkles, Star } from 'lucide-react';

interface HeroSectionProps {
  onOpenAnthem: () => void;
}

export const HeroSection = ({ onOpenAnthem }: HeroSectionProps) => {
  const { t, language } = useLanguage();
  const ml = language === 'ml';

  return (
    <section className="relative overflow-hidden bg-cream text-ink pt-8 sm:pt-14 pb-16 sm:pb-24 border-b border-festival/20 bg-paper-grain">
      {/* Radiant Festive Ambient Glows */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-festival/25 blur-3xl opacity-70 animate-pulse-glow"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/4 -right-24 w-96 h-96 rounded-full bg-berry/15 blur-3xl opacity-60 animate-pulse-glow"
        style={{ animationDelay: '1.5s' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-10 left-1/3 w-80 h-80 rounded-full bg-mango/15 blur-3xl opacity-50"
        aria-hidden="true"
      />

      {/* Floating Festive Sparkles & Decorative Badges */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0" aria-hidden="true">
        {/* Floating Star 1 */}
        <div className="absolute top-12 left-10 text-festival opacity-80 animate-float-y">
          <Sparkles className="w-6 h-6 text-festival animate-twinkle" />
        </div>
        {/* Floating Star 2 */}
        <div className="absolute top-28 right-12 text-berry opacity-75 animate-sway">
          <Star className="w-5 h-5 fill-berry text-berry" />
        </div>
        {/* Floating Star 3 */}
        <div className="absolute bottom-36 left-16 text-festival-deep opacity-60 animate-drift-x">
          <Sparkles className="w-5 h-5 text-festival-deep" />
        </div>
        {/* Floating Star 4 */}
        <div className="absolute top-1/2 right-1/4 text-mango opacity-70 animate-float-y-slow">
          <Star className="w-4 h-4 fill-festival text-festival" />
        </div>
      </div>

      {/* Decorative vertical editorial margin markers */}
      <div className="hidden lg:flex flex-col items-center justify-between absolute left-4 top-16 bottom-16 text-[10px] font-mono tracking-widest text-ink/40 uppercase select-none pointer-events-none [writing-mode:vertical-lr] rotate-180 z-10">
        <span>BALASANGHAM KANNUR // DOCUMENTARY ARCHIVE</span>
        <span className="w-8 h-px bg-ink/20 my-2" />
        <span>ESTD. 1938 KALLIASSERI</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Festive Eyebrow Tag */}
        <div className="flex flex-wrap items-center gap-3 mb-6 animate-rise-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-festival/20 border border-festival/40 text-ink text-xs font-bold uppercase tracking-wider shadow-xs backdrop-blur-xs">
            <span className="animate-spin-slow">
              <RedStarIcon size={14} className="text-berry" />
            </span>
            <span className={ml ? 'font-malayalam normal-case text-sm font-semibold' : ''}>
              {ml ? 'ബാലസംഘം കണ്ണൂർ ജില്ലാ കമ്മിറ്റി' : 'Balasangham Kannur District Committee'}
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-deep/80 text-[11px] font-mono text-ink/70 uppercase tracking-wider border border-ink/10">
            <span className="w-1.5 h-1.5 rounded-full bg-berry animate-pulse" />
            {ml ? 'സ്ഥാപിതം 1938 • കല്ല്യാശ്ശേരി' : 'Estd. 1938 • Kalliasseri, Kannur'}
          </span>
        </div>

        {/* Main Hero Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Big Malayalam & English Typography & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <h1
              className={`text-4xl sm:text-6xl xl:text-7xl font-black text-ink tracking-tight leading-[1.05] uppercase ${
                ml ? 'font-malayalam normal-case text-4xl sm:text-5xl xl:text-6xl leading-[1.2]' : ''
              }`}
            >
              {ml ? (
                <>
                  കുട്ടികളും <br />
                  <span className="text-berry underline decoration-festival decoration-wavy decoration-3 underline-offset-8">
                    സംസ്കാരവും
                  </span> <br />
                  ചേർത്തുപിടിച്ച മുന്നേറ്റം.
                </>
              ) : (
                <>
                  A Movement <br />
                  Built Around <br />
                  <span className="text-berry underline decoration-festival decoration-wavy decoration-3 underline-offset-8">
                    Children,
                  </span> <br />
                  Culture & Change.
                </>
              )}
            </h1>

            {/* Philosophical Motto & Subtitle with Festival styling */}
            <div className="border-l-4 border-berry pl-4 sm:pl-5 space-y-2 bg-festival/10 py-3 pr-4 rounded-r-2xl border-y border-r border-festival/20">
              <p className="text-sm sm:text-base font-extrabold text-berry uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-festival-deep" />
                <span>{t.hero.headline} • {ml ? 'പഠനം, മനനം, ചലനം' : 'Study, Contemplate, Act'}</span>
              </p>
              <p
                className={`text-base sm:text-lg text-ink/85 leading-relaxed font-medium max-w-2xl ${
                  ml ? 'font-malayalam-body text-base sm:text-lg leading-[1.75]' : ''
                }`}
              >
                {ml
                  ? '1938-ൽ കല്ല്യാശ്ശേരിയിൽ തുടക്കമിട്ട കുട്ടികളുടെ സാംസ്കാരിക മുന്നേറ്റം. അറിവും ജനാധിപത്യ ബോധവും മതനിരപേക്ഷ സ്നേഹവും പകർന്ന് കേരളത്തിലെ ലക്ഷക്കണക്കിന് കുട്ടികൾ ഒന്നിക്കുന്ന വേദി.'
                  : 'The world’s largest democratic children’s cultural movement, nurturing critical thinking, secular fraternity, and fearless creative expression across Kerala since 1938.'}
              </p>
            </div>

            {/* Action Buttons with Festive Styling */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#about"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-berry text-white font-bold text-sm hover:bg-berry-dark hover:shadow-festive hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-xs min-h-[44px]"
              >
                <span className={ml ? 'font-malayalam text-base' : ''}>
                  {ml ? 'ബാലസംഘത്തെ അറിയുക' : 'Explore Balasangham'}
                </span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="/programs"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-festival hover:bg-sun text-ink font-bold text-sm shadow-xs border border-festival-deep/30 hover:-translate-y-0.5 active:translate-y-0 transition-all min-h-[44px]"
              >
                <span className={ml ? 'font-malayalam text-base' : ''}>
                  {ml ? 'പ്രവർത്തനങ്ങൾ' : 'Explore Programs'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={onOpenAnthem}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/90 text-ink font-bold text-sm border border-festival/40 hover:border-berry hover:text-berry hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-xs min-h-[44px]"
                aria-label={t.hero.listenAnthemBtn}
              >
                <Music className="w-4 h-4 text-berry animate-bounce" />
                <span className={ml ? 'font-malayalam text-base' : ''}>{t.hero.listenAnthemBtn}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Documentary Photography Visual Frame with Festive Accents */}
          <div className="lg:col-span-5 relative">
            <div className="relative bg-cream-deep/90 p-3 sm:p-5 rounded-3xl border-2 border-festival/30 shadow-warm-lg">
              {/* Archival corner stamp with sway animation */}
              <div className="absolute -top-3 -right-2 z-20 bg-berry text-white px-3.5 py-1 text-xs font-mono uppercase tracking-wider font-bold shadow-md rounded-full border-2 border-white animate-sway">
                KANNUR // 2026
              </div>

              {/* Decorative rotating emblem badge */}
              <div className="absolute -bottom-4 -left-4 z-20 w-16 h-16 rounded-full bg-festival border-2 border-white shadow-warm flex items-center justify-center p-2 text-ink text-center text-[10px] font-bold leading-tight animate-spin-slow">
                <span className="font-mono uppercase text-[9px] tracking-tighter">1938 • 2026</span>
              </div>

              {/* Main Authentic Photograph Frame */}
              <div className="relative overflow-hidden rounded-2xl aspect-3/4 sm:aspect-4/5 bg-ink shadow-sm group">
                <img
                  src="/images/conference-poster-2026.jpg"
                  alt="Balasangham Kannur District Conference Creative Visual"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
                {/* Subtle warm vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent pointer-events-none" />

                {/* Photo Caption / Provenance Tag */}
                <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                  <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-festival mb-1">
                    <span className="w-2 h-2 rounded-full bg-berry animate-ping" />
                    <span>പോരാട്ടത്തിന്റെ ബാല്യം // KALLIASSERI</span>
                  </div>
                  <p className={`text-xs sm:text-sm font-bold leading-snug ${ml ? 'font-malayalam' : ''}`}>
                    {ml
                      ? 'അറിവും ആദർശവും കരുത്താക്കി നാളെയുടെ കേരളത്തെ നയിക്കാൻ കുട്ടികൾ'
                      : 'Nurturing democratic courage, creative unity, and scientific temper'}
                  </p>
                </div>
              </div>

              {/* Editorial Under-card Detail */}
              <div className="pt-3 px-2 flex items-center justify-between text-[11px] font-mono text-ink/70 uppercase tracking-wider">
                <span>ARCHIVAL REF: KNR-1938-2026</span>
                <span className="text-berry font-bold">VOL. 88 // 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Conference 2026 Spotlight Banner with Festive Styling */}
        <div className="mt-12 bg-white/90 rounded-3xl border-2 border-festival/40 p-5 sm:p-7 shadow-warm-lg relative overflow-hidden group hover:border-berry/40 transition-all duration-300">
          <div className="absolute top-0 left-0 bottom-0 w-3 bg-gradient-to-b from-berry via-mango to-festival" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pl-3 sm:pl-4">
            <div className="space-y-2 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-berry uppercase tracking-wider">
                <span className="px-3 py-1 rounded-full bg-berry/10 text-berry font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-festival-deep" />
                  {ml ? 'പ്രധാന പരിപാടി' : 'Featured Event'}
                </span>
                <span className="text-ink/40">•</span>
                <span className="text-ink/80 font-mono">
                  {ml ? 'കണ്ണൂർ ജില്ലാ സമ്മേളനം 2026' : 'Kannur District Conference 2026'}
                </span>
              </div>

              <h2 className={`text-xl sm:text-2xl font-black text-ink tracking-tight ${ml ? 'font-malayalam' : ''}`}>
                {ml
                  ? 'ബാലസംഘം കണ്ണൂർ ജില്ലാ സമ്മേളനം — 2026 ഒക്ടോബർ 10, 11'
                  : 'Balasangham Kannur District Conference — 10–11 October 2026'}
              </h2>

              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-ink/75">
                <span className="flex items-center gap-1.5 bg-cream-deep/80 px-3 py-1 rounded-full border border-ink/5">
                  <Calendar className="w-3.5 h-3.5 text-berry" />
                  <span>{ml ? '2026 ഒക്ടോബർ 10, 11' : '10–11 October 2026'}</span>
                </span>
                <span className="flex items-center gap-1.5 bg-cream-deep/80 px-3 py-1 rounded-full border border-ink/5">
                  <MapPin className="w-3.5 h-3.5 text-berry" />
                  <span>{ml ? 'കല്ല്യാശ്ശേരി, കണ്ണൂർ' : 'Kalliasseri, Kannur'}</span>
                </span>
                <span className="flex items-center gap-1.5 text-berry font-bold bg-festival/20 px-3 py-1 rounded-full border border-festival/40">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{ml ? 'ഉദ്ഘാടനം: പ്രൊഫ. സി രവീന്ദ്രനാഥ്' : 'Inauguration: Prof. C. Raveendranath'}</span>
                </span>
              </div>
            </div>

            <a
              href="/events"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-berry text-white hover:bg-berry-dark hover:shadow-festive transition-all text-xs font-bold uppercase tracking-wider shrink-0 active:scale-[0.98]"
            >
              <span>{ml ? 'സമ്മേളന വിവരങ്ങൾ' : 'View Conference'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Stats Ribbon */}
        <StatsRibbon />
      </div>
    </section>
  );
};
