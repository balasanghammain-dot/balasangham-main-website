import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Badge } from '../ui/badge';
import { ArrowRight, Camera } from 'lucide-react';

export const MediaSection = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="bg-soft-cream section-padding">
      <div className="editorial-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Large photo */}
          <div className="lg:col-span-7 reveal">
            <div className="relative rounded-2xl overflow-hidden shadow-warm aspect-[4/3] group">
              <img
                src="/images/children-dancing.jpeg"
                alt="Children of Balasangham dancing at a cultural event"
                className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <Badge variant="festival" className="backdrop-blur-sm">
                  <Camera className="w-3 h-3" />
                  {ml ? 'ഫോട്ടോ ആർക്കൈവ്' : 'PHOTO ARCHIVE'}
                </Badge>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="lg:col-span-5 space-y-5 reveal" style={{ transitionDelay: '150ms' }}>
            <Badge variant="outline">
              {ml ? 'മീഡിയ' : 'MEDIA'}
            </Badge>

            <h2 className={`text-heading font-black text-dark-brown ${ml ? 'font-malayalam' : ''}`}>
              {ml ? 'ചിത്രങ്ങളിലൂടെ' : 'From the Archive'}
            </h2>

            <p className={`text-base text-dark-brown/65 leading-relaxed ${ml ? 'font-malayalam-body leading-[1.8]' : ''}`}>
              {ml
                ? 'ബാലസംഘത്തിന്റെ ചരിത്ര നിമിഷങ്ങളും സാംസ്കാരിക പരിപാടികളും ഫോട്ടോഗ്രാഫുകളിലൂടെ.'
                : 'Cultural programs, historic moments, and the everyday joy of Balasangham through photography.'}
            </p>

            <Link
              to="/media"
              className="inline-flex items-center gap-2 text-deep-red font-bold text-sm hover:gap-3 transition-all group"
            >
              <span className={ml ? 'font-malayalam normal-case' : ''}>
                {ml ? 'മീഡിയ കാണുക' : 'View Media'}
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
