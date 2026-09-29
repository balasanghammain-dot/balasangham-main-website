import { useLanguage } from '../../context/LanguageContext';
import { RedStarIcon } from '../motifs/RedStarIcon';
import { StatsRibbon } from './StatsRibbon';
import { Music, ArrowDown, ArrowRight, Calendar, MapPin, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onOpenAnthem: () => void;
}

export const HeroSection = ({ onOpenAnthem }: HeroSectionProps) => {
  const { t, language } = useLanguage();
  const ml = language === 'ml';

  return (
    <section className="relative overflow-hidden bg-[#F4EBDD] text-[#171514] pt-8 sm:pt-14 pb-16 sm:pb-24 border-b border-[#241914]/15 bg-paper-grain">
      {/* Decorative vertical editorial margin markers */}
      <div className="hidden lg:flex flex-col items-center justify-between absolute left-4 top-16 bottom-16 text-[10px] font-mono tracking-widest text-[#241914]/40 uppercase select-none pointer-events-none [writing-mode:vertical-lr] rotate-180">
        <span>BALASANGHAM KANNUR // DOCUMENTARY ARCHIVE</span>
        <span className="w-8 h-px bg-[#241914]/20 my-2" />
        <span>ESTD. 1938 KALLIASSERI</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Editorial Eyebrow Tag */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#E9DDC9] border border-[#241914]/15 text-[#241914] text-xs font-bold uppercase tracking-wider shadow-2xs">
            <RedStarIcon size={14} className="text-[#C90000]" />
            <span className={ml ? 'font-malayalam normal-case text-sm' : ''}>
              {ml ? 'ബാലസംഘം കണ്ണൂർ ജില്ലാ കമ്മിറ്റി' : 'Balasangham Kannur District Committee'}
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#241914]/60 uppercase tracking-widest hidden sm:inline">
            // {ml ? 'സ്ഥാപിതം 1938 • കല്ല്യാശ്ശേരി' : 'Estd. 1938 • Kalliasseri, Kannur'}
          </span>
        </div>

        {/* Main Editorial Hero Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Big Editorial Typography & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <h1
              className={`text-4xl sm:text-6xl xl:text-7xl font-black text-[#171514] tracking-tight leading-[1.05] uppercase ${
                ml ? 'font-malayalam normal-case text-4xl sm:text-5xl xl:text-6xl leading-[1.2]' : ''
              }`}
            >
              {ml ? (
                <>
                  കുട്ടികളും <br />
                  <span className="text-[#C90000]">സംസ്കാരവും</span> <br />
                  ചേർത്തുപിടിച്ച മുന്നേറ്റം.
                </>
              ) : (
                <>
                  A Movement <br />
                  Built Around <br />
                  <span className="text-[#C90000]">Children,</span> <br />
                  Culture & Change.
                </>
              )}
            </h1>

            {/* Philosophical Motto & Subtitle */}
            <div className="border-l-3 border-[#C90000] pl-4 space-y-2">
              <p className="text-sm sm:text-base font-bold text-[#C90000] uppercase tracking-wider">
                {t.hero.headline} • {ml ? 'പഠനം, മനനം, ചലനം' : 'Study, Contemplate, Act'}
              </p>
              <p
                className={`text-base sm:text-lg text-[#241914]/85 leading-relaxed font-medium max-w-2xl ${
                  ml ? 'font-malayalam-body text-base sm:text-lg leading-[1.75]' : ''
                }`}
              >
                {ml
                  ? '1938-ൽ കല്ല്യാശ്ശേരിയിൽ തുടക്കമിട്ട കുട്ടികളുടെ സാംസ്കാരിക മുന്നേറ്റം. അറിവും ജനാധിപത്യ ബോധവും മതനിരപേക്ഷ സ്നേഹവും പകർന്ന് കേരളത്തിലെ ലക്ഷക്കണക്കിന് കുട്ടികൾ ഒന്നിക്കുന്ന വേദി.'
                  : 'The world’s largest democratic children’s cultural movement, nurturing critical thinking, secular fraternity, and fearless creative expression across Kerala since 1938.'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#about"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-[#C90000] text-white font-bold text-sm hover:bg-[#A30000] transition-all shadow-xs active:scale-[0.98] min-h-[44px]"
              >
                <span className={ml ? 'font-malayalam' : ''}>{ml ? 'ബാലസംഘത്തെ അറിയുക' : 'Explore Balasangham'}</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="/programs"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-[#E9DDC9] text-[#241914] font-bold text-sm border border-[#241914]/20 hover:bg-[#E9DDC9]/70 hover:border-[#241914]/40 transition-all active:scale-[0.98] min-h-[44px]"
              >
                <span className={ml ? 'font-malayalam' : ''}>{ml ? 'പ്രവർത്തനങ്ങൾ' : 'Explore Programs'}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={onOpenAnthem}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-[#FFF9EF] text-[#241914] font-bold text-sm border border-[#241914]/15 hover:border-[#C90000] hover:text-[#C90000] transition-all active:scale-[0.98] min-h-[44px]"
                aria-label={t.hero.listenAnthemBtn}
              >
                <Music className="w-4 h-4 text-[#C90000]" />
                <span className={ml ? 'font-malayalam' : ''}>{t.hero.listenAnthemBtn}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Documentary Photography Visual Frame */}
          <div className="lg:col-span-5">
            <div className="relative bg-[#E9DDC9] p-3 sm:p-4 rounded-xl border border-[#241914]/20 shadow-warm">
              {/* Archival corner stamp */}
              <div className="absolute -top-3 -right-3 z-20 bg-[#C90000] text-white px-3 py-1 text-[11px] font-mono uppercase tracking-wider font-bold shadow-md rounded-xs">
                KANNUR // 2026
              </div>

              {/* Main Authentic Photograph (From Conference Creative Poster) */}
              <div className="relative overflow-hidden rounded-lg aspect-3/4 sm:aspect-4/5 bg-[#241914]">
                <img
                  src="/images/conference-poster-2026.jpg"
                  alt="Four children seated on a wooden bench looking up at the Balasangham flag with hope and curiosity"
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />
                {/* Subtle warm vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#241914]/80 via-transparent to-transparent pointer-events-none" />

                {/* Photo Caption / Provenance Tag */}
                <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                  <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#E9DDC9] mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C90000]" />
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
              <div className="pt-3 flex items-center justify-between text-[11px] font-mono text-[#241914]/70 uppercase tracking-wider">
                <span>ARCHIVAL REF: KNR-1938-2026</span>
                <span>VOL. 88 // ISSUE 01</span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Conference 2026 Spotlight Banner */}
        <div className="mt-12 bg-[#FFF9EF] rounded-xl border border-[#241914]/15 p-5 sm:p-7 shadow-warm relative overflow-hidden">
          <div className="absolute top-0 left-0 bottom-0 w-2 bg-[#C90000]" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pl-2 sm:pl-3">
            <div className="space-y-2 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#C90000] uppercase tracking-wider">
                <span className="px-2 py-0.5 rounded-xs bg-[#C90000]/10 text-[#C90000]">
                  {ml ? 'പ്രധാന പരിപാടി' : 'Featured Event'}
                </span>
                <span className="text-[#241914]/60">•</span>
                <span className="text-[#241914]/80">
                  {ml ? 'കണ്ണൂർ ജില്ലാ സമ്മേളനം 2026' : 'Kannur District Conference 2026'}
                </span>
              </div>

              <h2 className={`text-xl sm:text-2xl font-black text-[#171514] tracking-tight ${ml ? 'font-malayalam' : ''}`}>
                {ml
                  ? 'ബാലസംഘം കണ്ണൂർ ജില്ലാ സമ്മേളനം — 2026 ഒക്ടോബർ 10, 11'
                  : 'Balasangham Kannur District Conference — 10–11 October 2026'}
              </h2>

              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#241914]/75">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#C90000]" />
                  <span>{ml ? '2026 ഒക്ടോബർ 10, 11' : '10–11 October 2026'}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C90000]" />
                  <span>{ml ? 'കല്ല്യാശ്ശേരി, കണ്ണൂർ' : 'Kalliasseri, Kannur'}</span>
                </span>
                <span className="flex items-center gap-1.5 text-[#C90000] font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{ml ? 'ഉദ്ഘാടനം: പ്രൊഫ. സി രവീന്ദ്രനാഥ്' : 'Inauguration: Prof. C. Raveendranath'}</span>
                </span>
              </div>
            </div>

            <a
              href="/events"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#241914] text-[#F4EBDD] hover:bg-[#C90000] transition-colors text-xs font-bold uppercase tracking-wider shrink-0 active:scale-[0.98]"
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
