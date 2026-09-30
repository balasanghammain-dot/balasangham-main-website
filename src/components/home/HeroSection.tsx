import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ArrowRight, Sparkles } from 'lucide-react';

export const HeroSection = ({ onOpenAnthem: _onOpenAnthem }: { onOpenAnthem: () => void }) => {
  const { language } = useLanguage();
  const ml = language === 'ml';
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-br from-sun-primary via-sun-bright to-warm-orange min-h-[85vh] sm:min-h-[90vh] flex items-center"
    >
      {/* Decorative shapes */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 animate-float-y-slow" />
        <div className="absolute top-1/4 left-8 w-3 h-3 rounded-full bg-deep-red/30 animate-twinkle" />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-deep-red/20 animate-twinkle" style={{ animationDelay: '0.8s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-4 h-4 rounded-full bg-white/20 animate-float-y" style={{ animationDelay: '1.5s' }} />
        {/* Wave transition to next section */}
        <svg className="absolute bottom-0 left-0 w-full h-20 sm:h-24 text-soft-cream" viewBox="0 0 1440 96" preserveAspectRatio="none">
          <path d="M0 96L1440 96L1440 64C1200 0 240 0 0 64Z" fill="currentColor" />
        </svg>
      </div>

      <div className="editorial-container relative z-10 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text — asymmetric left */}
          <div className="lg:col-span-7 space-y-6 reveal">
            <Badge variant="default" className="shadow-sm">
              <Sparkles className="w-3 h-3" />
              <span className={ml ? 'font-malayalam normal-case text-[11px]' : ''}>
                {ml ? 'കേരളത്തിലെ ഏറ്റവും വലിയ കുട്ടികളുടെ പ്രസ്ഥാനം' : "KERALA'S LARGEST CHILDREN'S MOVEMENT"}
              </span>
            </Badge>

            <h1 className={`text-display-xl font-black text-dark-brown leading-[1.05] ${ml ? 'font-malayalam text-display' : ''}`}>
              {ml ? 'ബാലസംഘം' : 'Balasangham'}
            </h1>

            <p className={`text-lg sm:text-xl text-dark-brown/80 leading-relaxed max-w-xl font-medium ${ml ? 'font-malayalam-body text-base sm:text-lg leading-[1.8]' : ''}`}>
              {ml
                ? 'കുട്ടികളുടെ ജനാധിപത്യം, സാഹോദര്യം, സാംസ്കാരിക കൂട്ടായ്മ — 1938 മുതൽ.'
                : 'Democracy, fraternity, and cultural fellowship for every child — since 1938.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button size="lg" asChild>
                <Link to="/join">
                  <span className={ml ? 'font-malayalam normal-case text-sm' : ''}>
                    {ml ? 'അംഗത്വം എടുക്കൂ' : 'JOIN BALASANGHAM'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link to="/about">
                  <span className={ml ? 'font-malayalam normal-case text-sm' : ''}>
                    {ml ? 'ഞങ്ങളെ അറിയൂ' : 'LEARN MORE'}
                  </span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Image — portrait for mobile emphasis */}
          <div className="lg:col-span-5 reveal" style={{ transitionDelay: '200ms' }}>
            <div className="relative rounded-3xl overflow-hidden shadow-warm-lg border-4 border-white/40 aspect-[3/4] sm:aspect-[4/5] group">
              <img
                src="/images/happy-children-yellow-bg.png"
                alt="Joyful children of Balasangham celebrating together"
                className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-5">
                <p className="text-white font-bold text-sm font-malayalam">
                  പഠനം, മനനം, ചലനം
                </p>
                <p className="text-white/70 text-xs mt-0.5">Study · Contemplate · Act</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
