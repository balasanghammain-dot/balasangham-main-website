import { useLanguage } from '../context/LanguageContext';
import { HeroSection } from '../components/home/HeroSection';
import { AboutSection } from '../components/sections/AboutSection';
import { ProgramsSection } from '../components/sections/WhatWeDoSection';
import { EventSection } from '../components/sections/EventsSection';
import { MediaSection } from '../components/home/MediaShowcaseSection';
import { verifiedNews } from '../data/organizationData';
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

  const featuredStory = verifiedNews[0];
  const secondaryStories = verifiedNews.slice(1, 4);

  return (
    <>
      {/* 1. HERO */}
      <HeroSection onOpenAnthem={onOpenAnthem} />

      {/* 2. ABOUT */}
      <AboutSection />

      {/* 3. PROGRAMS */}
      <ProgramsSection />

      {/* 4. FEATURED EVENT */}
      <EventSection />

      {/* 5. NEWS */}
      <NewsSection
        ml={ml}
        featuredStory={featuredStory}
        secondaryStories={secondaryStories}
      />

      {/* 6. MEDIA */}
      <MediaSection />

      {/* 7. FINAL CTA */}
      <CTASection ml={ml} />
    </>
  );
};

// ── News Section ──
function NewsSection({
  ml,
  featuredStory,
  secondaryStories,
}: {
  ml: boolean;
  featuredStory: (typeof verifiedNews)[0];
  secondaryStories: (typeof verifiedNews)[number][];
}) {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="bg-warm-cream section-padding">
      <div className="editorial-container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 reveal">
          <div>
            <Badge variant="default">
              {ml ? 'വാർത്തകൾ' : 'NEWS'}
            </Badge>
            <h2 className={`text-heading font-black text-dark-brown mt-3 ${ml ? 'font-malayalam' : ''}`}>
              {ml ? 'ഏറ്റവും പുതിയ വാർത്തകൾ' : 'Latest Stories'}
            </h2>
          </div>
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-deep-red font-bold text-sm hover:gap-3 transition-all group shrink-0"
          >
            <span className={ml ? 'font-malayalam normal-case' : ''}>
              {ml ? 'എല്ലാ വാർത്തകളും' : 'All Stories'}
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Editorial layout: large featured + stacked secondary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Featured */}
          {featuredStory && (
            <article className="lg:col-span-7 reveal">
              <Link to={`/news/${featuredStory.slug}`} className="block group">
                <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-dark-brown/5 mb-4">
                  <img
                    src="/images/children-troupe-singing.png"
                    alt={featuredStory.title}
                    className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs text-dark-brown/50 font-medium">
                    <span className="text-deep-red font-bold uppercase">{featuredStory.category}</span>
                    <span>·</span>
                    <time dateTime={featuredStory.date}>{featuredStory.date}</time>
                  </div>
                  <h3 className={`text-subheading font-black text-dark-brown group-hover:text-deep-red transition-colors ${ml ? 'font-malayalam' : ''}`}>
                    {ml ? featuredStory.titleMl : featuredStory.title}
                  </h3>
                  <p className={`text-sm text-dark-brown/60 leading-relaxed line-clamp-2 ${ml ? 'font-malayalam-body leading-[1.8]' : ''}`}>
                    {ml ? featuredStory.summaryMl : featuredStory.summary}
                  </p>
                </div>
              </Link>
            </article>
          )}

          {/* Secondary stories */}
          <div className="lg:col-span-5 space-y-6 reveal" style={{ transitionDelay: '150ms' }}>
            {secondaryStories.map((item) => (
              <article key={item.id} className="group">
                <Link to={`/news/${item.slug}`} className="block space-y-1.5">
                  <div className="flex items-center gap-3 text-xs text-dark-brown/50 font-medium">
                    <span className="text-deep-red font-bold uppercase">{item.category}</span>
                    <span>·</span>
                    <time dateTime={item.date}>{item.date}</time>
                  </div>
                  <h4 className={`text-base font-bold text-dark-brown group-hover:text-deep-red transition-colors leading-snug ${ml ? 'font-malayalam' : ''}`}>
                    {ml ? item.titleMl : item.title}
                  </h4>
                  <p className={`text-xs text-dark-brown/50 line-clamp-2 ${ml ? 'font-malayalam-body leading-[1.7]' : ''}`}>
                    {ml ? item.summaryMl : item.summary}
                  </p>
                </Link>
                <div className="h-px bg-dark-brown/5 mt-5" />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

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
            ? '5 മുതൽ 16 വയസ്സുവരെയുള്ള എല്ലാ കുട്ടികൾക്കും ബാലസംഘത്തിൽ സ്വാഗതം'
            : 'All Children Aged 5–16 Are Welcome'}
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
