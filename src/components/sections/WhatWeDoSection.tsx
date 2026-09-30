import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { verifiedPrograms } from '../../data/organizationData';
import { Badge } from '../ui/badge';
import { ArrowRight } from 'lucide-react';

// ponytail: Show top 4 programs in editorial sequence. Upgrade to CMS-driven when backend exists.
const ACCENT_COLORS = ['bg-deep-red/10 text-deep-red', 'bg-kerala-blue/10 text-kerala-blue', 'bg-kerala-purple/10 text-kerala-purple', 'bg-kerala-green/10 text-kerala-green'];

export const ProgramsSection = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';
  const sectionRef = useScrollReveal<HTMLElement>();
  const programs = verifiedPrograms.slice(0, 4);

  return (
    <section ref={sectionRef} className="bg-warm-cream section-padding">
      <div className="editorial-container">
        {/* Header */}
        <div className="max-w-2xl mb-12 reveal">
          <Badge variant="festival">
            {ml ? 'പരിപാടികൾ' : 'PROGRAMS'}
          </Badge>
          <h2 className={`text-heading font-black text-dark-brown mt-3 ${ml ? 'font-malayalam' : ''}`}>
            {ml ? 'ഞങ്ങൾ എന്താണ് ചെയ്യുന്നത്' : 'What We Do'}
          </h2>
        </div>

        {/* Editorial program sequence — alternating layouts */}
        <div className="space-y-12 sm:space-y-16 reveal-stagger">
          {programs.map((program, idx) => {
            const isEven = idx % 2 === 0;
            const num = String(idx + 1).padStart(2, '0');

            return (
              <article
                key={program.id}
                className={`reveal grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center ${
                  !isEven ? 'lg:direction-rtl' : ''
                }`}
              >
                {/* Number + text */}
                <div className={`lg:col-span-6 space-y-4 ${!isEven ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl sm:text-5xl font-black text-dark-brown/10 leading-none font-mono">
                      {num}
                    </span>
                    <div>
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${ACCENT_COLORS[idx % ACCENT_COLORS.length]}`}>
                        {program.category}
                      </span>
                    </div>
                  </div>

                  <h3 className={`text-subheading font-black text-dark-brown ${ml ? 'font-malayalam' : ''}`}>
                    {ml ? program.titleMl : program.title}
                  </h3>

                  <p className={`text-sm text-dark-brown/65 leading-relaxed line-clamp-3 ${ml ? 'font-malayalam-body leading-[1.8]' : ''}`}>
                    {ml ? program.descriptionMl : program.description}
                  </p>

                  <Link
                    to={`/programs/${program.slug}`}
                    className="inline-flex items-center gap-2 text-deep-red font-bold text-sm hover:gap-3 transition-all group min-h-[44px]"
                  >
                    <span className={ml ? 'font-malayalam normal-case' : ''}>
                      {ml ? 'കൂടുതൽ അറിയൂ' : 'Explore'}
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Image placeholder — typographic block when no specific program image */}
                <div className={`lg:col-span-6 ${!isEven ? 'lg:order-1' : ''}`}>
                  <div className={`rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center ${
                    idx === 0 ? 'bg-deep-red/5' : idx === 1 ? 'bg-kerala-blue/5' : idx === 2 ? 'bg-kerala-purple/5' : 'bg-kerala-green/5'
                  }`}>
                    {idx === 0 ? (
                      <img
                        src="/images/venalthumbikal-children.jpeg"
                        alt={program.title}
                        className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700"
                        loading="lazy"
                      />
                    ) : (
                      /* Typographic placeholder for programs without dedicated images */
                      <div className="text-center p-8">
                        <span className="text-6xl sm:text-8xl font-black text-dark-brown/5 font-malayalam block">
                          {program.titleMl.charAt(0)}
                        </span>
                        <span className={`text-sm font-bold text-dark-brown/30 ${ml ? 'font-malayalam' : ''}`}>
                          {ml ? program.titleMl : program.title}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* View all */}
        <div className="text-center pt-12 reveal">
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-deep-red font-bold text-sm hover:gap-3 transition-all group"
          >
            <span className={ml ? 'font-malayalam normal-case' : ''}>
              {ml ? 'എല്ലാ പരിപാടികളും കാണുക' : 'View All Programs'}
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
