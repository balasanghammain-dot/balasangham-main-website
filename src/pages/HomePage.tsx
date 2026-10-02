import { useLanguage } from '../context/LanguageContext';
import { HeroSection } from '../components/home/HeroSection';
import { AboutSection } from '../components/sections/AboutSection';
import { EventSection } from '../components/sections/EventsSection';
import { MediaSection } from '../components/home/MediaShowcaseSection';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { ArrowRight, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HomePageProps {
  onOpenAnthem: () => void;
}

export const HomePage = ({ onOpenAnthem }: HomePageProps) => {
  const { language } = useLanguage();
  const ml = language === 'ml';

  return (
    <>
      {/* 1. HERO */}
      <HeroSection onOpenAnthem={onOpenAnthem} />

      {/* 2. ABOUT */}
      <AboutSection />

      {/* 3. FEATURED EVENT */}
      <EventSection />

      {/* 4. MEDIA */}
      <MediaSection />

      {/* 5. FINAL CTA */}
      <CTASection ml={ml} />
    </>
  );
};

// ── CTA Section ──
function CTASection({ ml }: { ml: boolean }) {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="bg-gradient-to-br from-sun-primary via-sun-bright to-warm-orange section-padding relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" aria-hidden="true" />

      <div className="editorial-container relative z-10 text-center max-w-2xl mx-auto space-y-6 reveal">
        <Badge variant="default">
          <UserPlus className="w-3 h-3" />
          <span className={ml ? 'font-malayalam normal-case text-[11px]' : ''}>
            {ml ? 'ചേരുക' : 'JOIN US'}
          </span>
        </Badge>

        <h2 className={`text-heading font-black text-dark-brown ${ml ? 'font-malayalam' : ''}`}>
          {ml
            ? '6 മുതൽ 18 വയസ്സുവരെയുള്ള എല്ലാ കുട്ടികൾക്കും ബാലസംഘത്തിൽ സ്വാഗതം'
            : 'All Children Aged 6–18 Are Welcome'}
        </h2>

        <p className={`text-base text-dark-brown/70 leading-relaxed ${ml ? 'font-malayalam-body leading-[1.8]' : ''}`}>
          {ml
            ? 'നിങ്ങളുടെ തൊട്ടടുത്ത യൂണിറ്റുമായി ബന്ധപ്പെട്ട് കുട്ടികളുടെ ഏറ്റവും വലിയ പുരോഗമന പ്രസ്ഥാനത്തിൽ ഭാഗമാകാം.'
            : 'Connect with your neighborhood unit to join Kerala\'s largest progressive children\'s movement.'}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button size="lg" asChild>
            <Link to="/join">
              <span className={ml ? 'font-malayalam normal-case text-sm' : ''}>
                {ml ? 'അംഗത്വം എടുക്കൂ' : 'JOIN BALASANGHAM'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button variant="secondary" size="lg" asChild>
            <Link to="/contact">
              <span className={ml ? 'font-malayalam normal-case text-sm' : ''}>
                {ml ? 'സമ്പർക്ക വിവരങ്ങൾ' : 'CONTACT US'}
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
