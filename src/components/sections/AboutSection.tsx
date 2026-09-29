import { ComponentType } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { GovernanceDiagram } from './GovernanceDiagram';
import { Vote, HeartHandshake, Compass, ShieldCheck } from 'lucide-react';

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Vote,
  HeartHandshake,
  Compass,
  ShieldCheck,
};

export const AboutSection = () => {
  const { t, language } = useLanguage();

  return (
    <section id="about" className="py-20 sm:py-28 bg-surface-cream scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-red mb-2 block">
            {t.about.sectionTag}
          </span>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight mb-4 ${
              language === 'ml' ? 'font-malayalam' : ''
            }`}
          >
            {t.about.heading}
          </h2>
          <p
            className={`text-base sm:text-lg text-slate-600 leading-relaxed ${
              language === 'ml' ? 'font-malayalam-body' : ''
            }`}
          >
            {t.about.intro}
          </p>
        </div>

        {/* 4 Core Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {t.about.values.map((val) => {
            const Icon = iconMap[val.iconName] || Vote;
            return (
              <div
                key={val.id}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3
                  className={`text-lg sm:text-xl font-bold text-charcoal mb-3 ${
                    language === 'ml' ? 'font-malayalam' : ''
                  }`}
                >
                  {val.title}
                </h3>
                <p
                  className={`text-sm text-slate-600 leading-relaxed ${
                    language === 'ml' ? 'font-malayalam-body' : ''
                  }`}
                >
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Democratic Child Governance Model */}
        <GovernanceDiagram />
      </div>
    </section>
  );
};
