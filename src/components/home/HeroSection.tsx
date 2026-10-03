import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Button } from '../ui/button';
import { BalasanghamLogo } from '../motifs/BalasanghamLogo';
import { ArrowRight, Music } from 'lucide-react';

interface HeroSectionProps {
  onOpenAnthem?: () => void;
}

export const HeroSection = ({ onOpenAnthem }: HeroSectionProps) => {
  const { language } = useLanguage();
  const ml = language === 'ml';
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      aria-label="Balasangham Kannur District Committee Hero"
      className="relative overflow-hidden bg-gradient-to-b from-warm-cream/90 via-soft-cream to-soft-cream text-dark-brown pt-6 sm:pt-10 lg:pt-14 pb-14 sm:pb-20 lg:pb-24 w-full max-w-full"
    >
      {/* ── Background Ambience: Kerala Sunburst & Warm Ambient Light (Warm Palette) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Soft, warm radiating solar rays */}
        <svg
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full opacity-15"
        >
          <g stroke="#F7B718" strokeWidth="2" opacity="0.35">
            <line x1="720" y1="100" x2="-200" y2="-200" strokeWidth="26" strokeOpacity="0.2" />
            <line x1="720" y1="100" x2="150" y2="-200" strokeWidth="24" strokeOpacity="0.18" />
            <line x1="720" y1="100" x2="450" y2="-200" strokeWidth="28" strokeOpacity="0.22" />
            <line x1="720" y1="100" x2="720" y2="-200" strokeWidth="30" strokeOpacity="0.22" />
            <line x1="720" y1="100" x2="1000" y2="-200" strokeWidth="28" strokeOpacity="0.22" />
            <line x1="720" y1="100" x2="1350" y2="-150" strokeWidth="24" strokeOpacity="0.18" />
            <line x1="720" y1="100" x2="1650" y2="-100" strokeWidth="26" strokeOpacity="0.18" />
            <line x1="720" y1="100" x2="-150" y2="350" strokeWidth="22" strokeOpacity="0.15" />
            <line x1="720" y1="100" x2="1600" y2="350" strokeWidth="22" strokeOpacity="0.15" />
          </g>
          {/* Subtle concentric solar rings */}
          <circle cx="720" cy="100" r="220" stroke="#F7B718" strokeWidth="1" strokeDasharray="6 8" opacity="0.25" />
          <circle cx="720" cy="100" r="420" stroke="#F7B718" strokeWidth="1" strokeDasharray="4 12" opacity="0.15" />
        </svg>

        {/* Ambient warm radial glow in the center */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[450px] bg-sun-bright/15 rounded-full blur-3xl" />
      </div>

      <div className="editorial-container relative z-10 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center">
          
          {/* ── LEFT COLUMN: Textual Authority & Identity (contents on mobile for custom ordering, flex on lg+) ── */}
          <div className="contents lg:flex lg:flex-col lg:col-span-6 xl:col-span-5 lg:items-start lg:text-left lg:space-y-5 reveal">
            
            {/* 1. Header Group (Provenance Tag + Heading) */}
            <div className="order-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-3 sm:space-y-4 w-full">
              {/* Heritage Provenance Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 border border-dark-brown/10 text-dark-brown text-xs sm:text-sm font-bold shadow-xs backdrop-blur-xs">
                <BalasanghamLogo className="w-4 h-4 sm:w-5 sm:h-5 object-contain shrink-0" alt="" />
                <span className={ml ? 'font-malayalam font-bold text-[12px] sm:text-xs' : 'font-sans text-[11px] sm:text-xs uppercase tracking-wider'}>
                  {ml ? '1938 മുതൽ · ജനാധിപത്യ ബാല്യക്കൂട്ടായ്മ' : 'Since 1938 · Democratic Children’s Movement'}
                </span>
                {/* Supporting green accent dot */}
                <span className="w-1.5 h-1.5 rounded-full bg-poster-green shrink-0" aria-hidden="true" />
              </div>

              {/* Organization Name as Primary Textual Identity */}
              <div className="space-y-1 sm:space-y-2 w-full">
                {ml ? (
                  <h1 className="font-malayalam font-extrabold tracking-tight text-dark-brown">
                    <span className="block text-3xl min-[390px]:text-4xl sm:text-5xl lg:text-5xl xl:text-6xl text-dark-brown leading-[1.14]">
                      <span className="inline-block whitespace-nowrap">ബാലസംഘം</span>{' '}
                      <span className="inline-block whitespace-nowrap">കണ്ണൂർ</span>
                    </span>
                    <span className="block text-2xl min-[390px]:text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-black text-deep-red leading-[1.2] mt-1 sm:mt-2">
                      ജില്ലാ കമ്മിറ്റി
                    </span>
                  </h1>
                ) : (
                  <h1 className="font-sans font-extrabold tracking-tight text-dark-brown">
                    <span className="block text-2xl min-[390px]:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl uppercase tracking-tight text-dark-brown leading-[1.08]">
                      Balasangham Kannur
                    </span>
                    <span className="block text-xl min-[390px]:text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black uppercase text-deep-red tracking-wide mt-1 sm:mt-2">
                      District Committee
                    </span>
                  </h1>
                )}

                {/* Cultural decorative accent bar: Red + Gold + Poster Green */}
                <div className="flex items-center justify-center lg:justify-start gap-1.5 pt-2" aria-hidden="true">
                  <div className="w-10 sm:w-12 h-1 rounded-full bg-deep-red" />
                  <div className="w-4 h-1 rounded-full bg-gold" />
                  <div className="w-6 sm:w-8 h-1 rounded-full bg-poster-green" />
                </div>
              </div>
            </div>

            {/* 2. Supporting Element (Description) */}
            <div className="order-2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-3 sm:space-y-4 w-full">
              {/* Editorial Description */}
              <p className={`text-sm sm:text-base lg:text-lg text-dark-brown/80 max-w-xl ${ml ? 'font-malayalam-body leading-[1.8]' : 'leading-relaxed'}`}>
                {ml
                  ? 'കുട്ടികളിൽ ജനാധിപത്യബോധവും മതനിരപേക്ഷ മൂല്യങ്ങളും സർഗ്ഗാത്മകതയും വളർത്തുന്ന കണ്ണൂർ ജില്ലയിലെ മഹത്തായ ബാലപ്രസ്ഥാനം. കല്ല്യാശ്ശേരിയുടെ ചരിത്രഭൂമിയിൽ നിന്നും പടർന്നുപന്തലിച്ച തലമുറകളുടെ സ്നേഹക്കൂട്ടായ്മ.'
                  : 'The vanguard of childhood democracy, secular fraternity, and creative discovery across Kannur. Rooted in the historic legacy of Kalliasseri since 1938.'}
              </p>
            </div>

            {/* 3. Action Buttons (Single instance in DOM, order-4 on mobile, order-3 on desktop) */}
            <div className="order-4 lg:order-3 flex flex-col min-[420px]:flex-row items-center gap-3 pt-2 sm:pt-3 w-full max-w-sm lg:max-w-none justify-center lg:justify-start">
              <Button
                size="lg"
                className="w-full min-[420px]:w-auto bg-deep-red hover:bg-bright-red text-white shadow-warm-lg font-bold min-h-[48px] px-7 py-3 rounded-full transition-all duration-200 active:scale-95 group justify-center"
                asChild
              >
                <Link to="/join">
                  <span className={ml ? 'font-malayalam font-bold text-base' : 'font-sans font-bold text-sm tracking-wide uppercase'}>
                    {ml ? 'അംഗത്വം എടുക്കൂ' : 'Join Now'}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wider text-white/80 ml-1.5">
                    {ml ? '· ചേരുക' : '· JOIN'}
                  </span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              {onOpenAnthem && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={onOpenAnthem}
                  className="w-full min-[420px]:w-auto border-dark-brown/20 hover:border-dark-brown/40 bg-white/70 hover:bg-white text-dark-brown font-semibold min-h-[48px] px-5 py-3 rounded-full shadow-xs transition-all active:scale-95 justify-center"
                >
                  <Music className="w-4 h-4 text-deep-red mr-2" />
                  <span className={ml ? 'font-malayalam text-sm' : 'font-sans text-sm'}>
                    {ml ? 'പതാകഗാനം' : 'Flag Song'}
                  </span>
                </Button>
              )}
            </div>

          </div>

          {/* ── RIGHT COLUMN: Poster Visual (order-3 on mobile, col-span-7 on desktop) ── */}
          <div className="order-3 lg:order-none lg:col-span-6 xl:col-span-7 flex flex-col items-center w-full reveal" style={{ transitionDelay: '150ms' }}>
            
            {/* Contained Editorial Frame Container */}
            <div className="relative w-full max-w-[290px] min-[390px]:max-w-[320px] min-[430px]:max-w-[350px] sm:max-w-[390px] md:max-w-[420px] lg:max-w-[440px] xl:max-w-[470px] mx-auto lg:mr-0 lg:ml-auto">
              
              {/* Organic visual blending: soft organic backdrop with subtle poster-green accent */}
              <div
                className="absolute -inset-2.5 sm:-inset-3.5 -rotate-1 rounded-[30px] sm:rounded-[38px] bg-gradient-to-br from-poster-green/18 via-gold/15 to-warm-cream/50 pointer-events-none opacity-85"
                aria-hidden="true"
              />
              
              {/* Soft low-intensity green ambient edge glow */}
              <div
                className="absolute -inset-2 rounded-[28px] sm:rounded-[36px] bg-deep-green/10 blur-xl pointer-events-none"
                aria-hidden="true"
              />

              {/* Contained Editorial Frame: Warm cream mat, rounded corners, soft shadow */}
              <div className="relative z-10 p-2 sm:p-2.5 rounded-[22px] sm:rounded-[30px] bg-gradient-to-b from-[#FFFDF8] via-warm-cream/95 to-[#F6E8C8] shadow-warm-lg ring-1 ring-dark-brown/12">
                <div
                  className="relative overflow-hidden rounded-[16px] sm:rounded-[22px] bg-dark-brown/5 aspect-[675/1024] w-full"
                  style={{ aspectRatio: '675 / 1024' }}
                >
                  <img
                    src="/images/teachers-story-poster.jpg"
                    alt={
                      ml
                        ? 'മരച്ചുവട്ടിലെ മാഷിന്റെ കഥ - ബാലസംഘം ചരിത്ര ചിത്രീകരണം'
                        : "Teacher's Story Beneath the Tree - Balasangham historical poster illustration"
                    }
                    className="w-full h-full object-cover object-top select-none transition-transform duration-700 hover:scale-[1.015]"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ── Soft Wave Transition into Next Section (#FFF9E8 / Soft Cream) ── */}
      <div className="absolute bottom-0 inset-x-0 w-full overflow-hidden leading-none pointer-events-none" aria-hidden="true">
        <svg
          className="relative block w-full h-8 sm:h-12 md:h-16 text-soft-cream"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
        >
          <path
            d="M0,15 C320,45 640,0 960,30 C1200,50 1360,20 1440,35 L1440,60 L0,60 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
};
