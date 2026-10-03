import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Badge } from '../ui/badge';
import { ArrowRight } from 'lucide-react';

export const AboutSection = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="bg-soft-cream section-padding">
      <div className="editorial-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Text */}
          <div className="lg:col-span-5 space-y-5 reveal">
            <Badge variant="outline">
              {ml ? 'ഞങ്ങളെക്കുറിച്ച്' : 'ABOUT'}
            </Badge>

            <h2 className={`text-heading font-black text-dark-brown ${ml ? 'font-malayalam' : ''}`}>
              {ml
                ? 'കുട്ടികളുടെ ജനാധിപത്യ പ്രസ്ഥാനം'
                : 'A Democratic Movement for Children'}
            </h2>

            <p className={`text-base text-dark-brown/70 leading-relaxed ${ml ? 'font-malayalam-body leading-[1.8]' : ''}`}>
              {ml
                ? 'ബാലസംഘം 1938 മുതൽ കേരളത്തിലെ കുട്ടികൾക്ക് ജനാധിപത്യബോധവും മതനിരപേക്ഷ മൂല്യങ്ങളും സാംസ്കാരിക സർഗശേഷിയും വളർത്തുന്നു. കല്ല്യാശ്ശേരിയിൽ ജനിച്ച ഈ പ്രസ്ഥാനത്തിൽ 10 ലക്ഷത്തിലധികം കുട്ടികൾ ഇന്ന് അംഗങ്ങളാണ്.'
                : 'Born in Kalliasseri in 1938, Balasangham nurtures democratic values, secular fraternity, and creative expression in over one million children across Kerala.'}
            </p>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-deep-red font-bold text-sm hover:gap-3 transition-all group"
            >
              <span className={ml ? 'font-malayalam normal-case' : ''}>
                {ml ? 'ഞങ്ങളുടെ കഥ വായിക്കൂ' : 'Read Our Story'}
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Image */}
          <div className="lg:col-span-7 reveal" style={{ transitionDelay: '150ms' }}>
            <div className="relative rounded-2xl overflow-hidden shadow-warm aspect-[16/10] group">
              <img
                src="/images/about-balasangham-children.jpg"
                alt="Children performing and participating together in Balasangham cultural troupe"
                className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
