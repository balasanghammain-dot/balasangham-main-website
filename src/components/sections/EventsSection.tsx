import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { conferenceVerifiedData } from '../../data/verifiedContent';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

export const EventSection = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="bg-gradient-to-br from-sun-bright/40 via-warm-cream to-warm-orange/20 section-padding relative overflow-hidden">
      {/* Decorative dot */}
      <div className="absolute top-10 right-10 w-6 h-6 rounded-full bg-deep-red/10 animate-float-y" aria-hidden="true" />

      <div className="editorial-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Event info */}
          <div className="lg:col-span-6 space-y-5 reveal">
            <Badge variant="default">
              {ml ? 'മുഖ്യ സമ്മേളനം' : 'FEATURED EVENT'}
            </Badge>

            <div className="space-y-1">
              <span className="text-5xl sm:text-7xl font-black text-dark-brown/10 font-mono block leading-none">
                2026
              </span>
              <h2 className={`text-heading font-black text-dark-brown ${ml ? 'font-malayalam' : ''}`}>
                {ml ? conferenceVerifiedData.title.ml : conferenceVerifiedData.title.en}
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 text-sm text-dark-brown/70 font-medium">
              <span className="inline-flex items-center gap-2">
                <Calendar className="w-4 h-4 text-deep-red" />
                {ml ? conferenceVerifiedData.dates.ml : conferenceVerifiedData.dates.en}
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="w-4 h-4 text-deep-red" />
                {ml ? conferenceVerifiedData.location.ml : conferenceVerifiedData.location.en}
              </span>
            </div>

            <p className={`text-sm text-dark-brown/60 italic ${ml ? 'font-malayalam-body leading-[1.8] not-italic' : ''}`}>
              {ml ? conferenceVerifiedData.theme.ml : conferenceVerifiedData.theme.en}
            </p>

            <Button asChild>
              <Link to="/events/kannur-district-conference-2026">
                <span className={ml ? 'font-malayalam normal-case text-sm' : ''}>
                  {ml ? 'സമ്മേളന വിവരങ്ങൾ' : 'VIEW EVENT'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Conference poster */}
          <div className="lg:col-span-6 reveal" style={{ transitionDelay: '150ms' }}>
            <div className="relative rounded-2xl overflow-hidden shadow-warm-lg aspect-[3/4] sm:aspect-[4/5] group border-2 border-white/50">
              <img
                src="/images/conference-poster-2026.jpg"
                alt="Balasangham Kannur District Conference 2026 poster"
                className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
