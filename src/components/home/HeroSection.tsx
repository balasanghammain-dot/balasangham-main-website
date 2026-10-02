import { Link } from 'react-router-dom';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Button } from '../ui/button';
import { BalasanghamLogo } from '../motifs/BalasanghamLogo';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onOpenAnthem?: () => void;
}

export const HeroSection = ({ onOpenAnthem: _onOpenAnthem }: HeroSectionProps) => {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      aria-label="Balasangham Kannur Welcome Hero"
      className="relative overflow-hidden bg-gradient-to-b from-sun-bright via-sun-primary to-warm-orange text-dark-brown min-h-[90vh] sm:min-h-[92vh] flex flex-col justify-between pt-6 sm:pt-12 pb-16 sm:pb-28 w-full max-w-full"
    >
      {/* ── Background Poster-Inspired Decorative System ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Radiating Sunburst Rays (inspired by the cultural festival poster) */}
        <svg
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full opacity-25 transition-opacity"
        >
          <g stroke="#FFFFFF" strokeWidth="2" opacity="0.4">
            <line x1="720" y1="200" x2="-200" y2="-200" strokeWidth="28" strokeOpacity="0.2" />
            <line x1="720" y1="200" x2="0" y2="-100" strokeWidth="24" strokeOpacity="0.18" />
            <line x1="720" y1="200" x2="200" y2="-150" strokeWidth="26" strokeOpacity="0.18" />
            <line x1="720" y1="200" x2="450" y2="-200" strokeWidth="30" strokeOpacity="0.2" />
            <line x1="720" y1="200" x2="720" y2="-200" strokeWidth="32" strokeOpacity="0.22" />
            <line x1="720" y1="200" x2="990" y2="-200" strokeWidth="30" strokeOpacity="0.2" />
            <line x1="720" y1="200" x2="1240" y2="-150" strokeWidth="26" strokeOpacity="0.18" />
            <line x1="720" y1="200" x2="1440" y2="-100" strokeWidth="24" strokeOpacity="0.18" />
            <line x1="720" y1="200" x2="1640" y2="-200" strokeWidth="28" strokeOpacity="0.2" />
            <line x1="720" y1="200" x2="-200" y2="200" strokeWidth="24" strokeOpacity="0.15" />
            <line x1="720" y1="200" x2="-150" y2="500" strokeWidth="26" strokeOpacity="0.15" />
            <line x1="720" y1="200" x2="1600" y2="200" strokeWidth="24" strokeOpacity="0.15" />
            <line x1="720" y1="200" x2="1550" y2="500" strokeWidth="26" strokeOpacity="0.15" />
          </g>
          {/* Subtle concentric solar rings */}
          <circle cx="720" cy="200" r="180" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="6 8" opacity="0.3" />
          <circle cx="720" cy="200" r="340" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="4 12" opacity="0.2" />
          <circle cx="720" cy="200" r="520" stroke="#FFFFFF" strokeWidth="1" opacity="0.15" />
        </svg>

        {/* Ambient warm radial glow behind central composition */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[400px] sm:h-[500px] bg-white/20 rounded-full blur-3xl" />

        {/* Organic floating leaves and subtle star accents */}
        <div className="absolute top-16 left-8 sm:left-20 w-3 h-3 rounded-full bg-white/50 animate-twinkle" />
        <div className="absolute top-28 right-10 sm:right-24 w-2.5 h-2.5 rounded-full bg-white/45 animate-twinkle" style={{ animationDelay: '1.2s' }} />
        <div className="absolute top-1/3 left-12 w-4 h-4 rounded-full bg-white/30 animate-float-y" style={{ animationDelay: '0.6s' }} />
        <div className="absolute top-1/2 right-12 w-3.5 h-3.5 rounded-full bg-white/35 animate-float-y-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* ── Editorial Hero Content ── */}
      <div className="editorial-container relative z-10 w-full flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6">
        {/* Provenance Tag / Cultural Crest */}
        <div className="reveal inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/70 border border-dark-brown/10 backdrop-blur-md text-dark-brown text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 sm:mb-6 shadow-xs max-w-full">
          <BalasanghamLogo className="w-4 h-4 sm:w-5 sm:h-5 object-contain shrink-0" alt="" />
          <span className="font-malayalam font-bold text-dark-brown text-[11px] sm:text-xs md:text-sm">
            1938 മുതൽ · ജനാധിപത്യ ബാല്യക്കൂട്ടായ്മ
          </span>
          <Sparkles className="w-3.5 h-3.5 text-deep-red shrink-0" />
        </div>

        {/* Primary Malayalam Headline & English Brand Line */}
        <div className="reveal space-y-2 sm:space-y-3 max-w-4xl mx-auto w-full">
          {/* PRIMARY HEADLINE (Exact words: "ബാലസംഘം കണ്ണൂർ സ്വാഗതം") */}
          <h1 className="font-malayalam font-extrabold tracking-tight drop-shadow-xs">
            <span className="block text-dark-brown text-3xl min-[390px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1]">
              <span className="inline-block whitespace-nowrap">ബാലസംഘം</span>{' '}
              <span className="inline-block whitespace-nowrap">കണ്ണൂർ</span>
            </span>
            <span className="block text-deep-red text-2xl min-[390px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-1 sm:mt-2 font-black tracking-normal">
              സ്വാഗതം
            </span>
          </h1>

          {/* SECONDARY BRAND LINE (Exact words: "Balasangham Kannur") */}
          <p className="font-mono text-xs sm:text-sm md:text-base font-bold uppercase tracking-[0.25em] text-dark-brown/80 pt-1">
            Balasangham Kannur
          </p>
        </div>

        {/* Authentic Photograph Centerpiece: Real Children with Balasangham Flag */}
        <div className="reveal mt-6 sm:mt-8 md:mt-10 w-full max-w-lg sm:max-w-xl md:max-w-2xl relative" style={{ transitionDelay: '150ms' }}>
          {/* Warm organic circular aura behind children */}
          <div className="absolute inset-x-6 bottom-0 top-10 bg-gradient-to-t from-white/40 via-warm-cream/30 to-transparent rounded-full blur-xl pointer-events-none" />

          {/* Authentic Real Photograph */}
          <div className="relative group">
            <img
              src="/images/children-troupe-singing.png"
              alt="Authentic photograph of Balasangham children sitting together on a bench holding the Balasangham red star flag"
              className="w-full h-auto max-h-[340px] sm:max-h-[420px] md:max-h-[460px] object-contain mx-auto filter drop-shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
              loading="eager"
            />

            {/* Verified Motto Overlay Banner at the Base */}
            <div className="relative mt-2 sm:mt-3 px-4 py-2 sm:py-2.5 rounded-2xl bg-dark-brown/85 border border-white/20 backdrop-blur-md inline-block max-w-md mx-auto shadow-md">
              <p className="text-xs sm:text-sm text-sun-bright font-bold font-malayalam">
                പഠനം, മനനം, ചലനം
              </p>
              <p className="text-[11px] sm:text-xs text-warm-cream/90 font-mono uppercase tracking-wider mt-0.5">
                Study · Contemplate · Act
              </p>
            </div>
          </div>
        </div>

        {/* Minimal Single Primary Action */}
        <div className="reveal mt-6 sm:mt-8 pt-2" style={{ transitionDelay: '250ms' }}>
          <Button
            size="lg"
            className="bg-deep-red hover:bg-bright-red text-white shadow-warm-lg font-bold min-h-[48px] px-8 py-4 rounded-full transition-all duration-200 active:scale-95 hover:shadow-xl group"
            asChild
          >
            <Link to="/join">
              <span className="font-malayalam font-bold text-base sm:text-lg">അംഗത്വം എടുക്കൂ</span>
              <span className="font-mono text-xs uppercase tracking-wider text-white/80 ml-2">· Join</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>

      {/* ── Organic Wave Transition into Next Section (#FFF9E8 / Soft Cream) ── */}
      <div className="absolute bottom-0 inset-x-0 w-full overflow-hidden leading-none pointer-events-none" aria-hidden="true">
        <svg
          className="relative block w-full h-14 sm:h-20 md:h-24 lg:h-28 text-soft-cream"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,30 C280,85 520,10 820,55 C1100,95 1300,40 1440,60 L1440,100 L0,100 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
};
