import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Gamepad2 } from 'lucide-react';

export const GameSection = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      aria-label="Balasangham Games and Poster Challenge"
      className="relative overflow-hidden bg-gradient-to-b from-[#FBBF24]/40 via-[#FFF9EB] to-[#F59E0B]/35 py-14 sm:py-20 lg:py-24"
    >
      {/* Top Decorative Wave Divider */}
      <div className="absolute top-0 inset-x-0 w-full overflow-hidden leading-none pointer-events-none" aria-hidden="true">
        <svg
          viewBox="0 0 1440 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8 sm:h-12 text-[#FFFDF7] preserve-3d"
          preserveAspectRatio="none"
        >
          <path
            d="M0 0C240 32 480 48 720 48C960 48 1200 32 1440 0V0H0Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Ambient Radial Warmth Glow */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <div className="w-[500px] sm:w-[700px] h-[300px] sm:h-[400px] rounded-full bg-gradient-to-b from-[#FEF08A]/50 via-[#FDE68A]/30 to-transparent blur-3xl opacity-70" />
      </div>

      <div className="editorial-container relative z-10">
        <div className="max-w-2xl mx-auto flex flex-col items-center text-center reveal">
          {/* 1. Five Colorful Indicator Dots */}
          <div className="flex items-center justify-center gap-2 mb-3.5 sm:mb-4" aria-hidden="true">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#DC2626] shadow-xs" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#831843] shadow-xs" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#0284C7] shadow-xs" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#EA580C] shadow-xs" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#16A34A] shadow-xs" />
          </div>

          {/* 2. Bold Heading (കളികൾ / GAMES) */}
          <h2
            className={`text-4xl min-[420px]:text-5xl sm:text-6xl md:text-7xl font-black text-[#B91C1C] tracking-tight leading-tight drop-shadow-xs transition-transform ${
              ml ? 'font-malayalam' : 'font-sans'
            }`}
          >
            {ml ? 'കളികൾ' : 'കളികൾ · GAMES'}
          </h2>

          {/* 3. Subtitle (ചിത്രം ചേർത്ത് വയ്ക്കാം / Assemble the poster puzzle) */}
          <p
            className={`mt-2.5 sm:mt-3 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg text-dark-brown/80 font-medium tracking-wide ${
              ml ? 'font-malayalam-body' : 'font-sans'
            }`}
          >
            {ml
              ? 'ചിത്രം ചേർത്ത് വയ്ക്കാം'
              : 'ചിത്രം ചേർത്ത് വയ്ക്കാം · Assemble the poster puzzle & reveal the artwork'}
          </p>

          {/* 4. Action Button (PLAY GAME) */}
          <Link
            to="/game"
            className="group inline-flex items-center justify-center gap-2.5 px-8 sm:px-11 py-3.5 sm:py-4 rounded-full bg-[#B91C1C] hover:bg-[#DC2626] active:scale-95 text-white font-bold text-sm sm:text-base uppercase tracking-wider shadow-[0_10px_25px_-5px_rgba(185,28,28,0.45)] hover:shadow-[0_14px_30px_-5px_rgba(185,28,28,0.6)] transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#B91C1C]/40"
          >
            <Gamepad2 className="w-5 h-5 text-white transition-transform group-hover:rotate-12 duration-300 shrink-0" />
            <span className="font-sans font-extrabold tracking-wider">PLAY GAME</span>
          </Link>
        </div>
      </div>

      {/* Bottom Decorative Wave Divider */}
      <div className="absolute bottom-0 inset-x-0 w-full overflow-hidden leading-none pointer-events-none" aria-hidden="true">
        <svg
          viewBox="0 0 1440 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8 sm:h-12 text-[#FFFDF7] preserve-3d"
          preserveAspectRatio="none"
        >
          <path
            d="M0 48C240 16 480 0 720 0C960 0 1200 16 1440 48V48H0Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
};
