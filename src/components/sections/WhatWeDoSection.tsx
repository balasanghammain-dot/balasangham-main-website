import { ComponentType } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Drama, Tent, BookOpen, Microscope, Users, ShieldAlert, CheckCircle2 } from 'lucide-react';

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Drama,
  Tent,
  BookOpen,
  Microscope,
  Users,
  ShieldAlert,
};

export const WhatWeDoSection = () => {
  const { t, language } = useLanguage();

  return (
    <section id="what-we-do" className="py-20 sm:py-28 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-red mb-2 block">
            {t.whatWeDo.sectionTag}
          </span>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight mb-4 ${
              language === 'ml' ? 'font-malayalam' : ''
            }`}
          >
            {t.whatWeDo.heading}
          </h2>
          <p
            className={`text-base sm:text-lg text-slate-600 leading-relaxed ${
              language === 'ml' ? 'font-malayalam-body' : ''
            }`}
          >
            {t.whatWeDo.intro}
          </p>
        </div>

        {/* 6 Signature Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.whatWeDo.initiatives.map((item) => {
            const Icon = iconMap[item.icon] || Drama;
            return (
              <div
                key={item.id}
                className="bg-surface-cream rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-amber-400/50 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-gold flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-red group-hover:text-white transition-all duration-300">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                      {item.badge}
                    </span>
                  </div>

                  <h3
                    className={`text-xl font-bold text-charcoal mb-3 ${
                      language === 'ml' ? 'font-malayalam' : ''
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`text-sm text-slate-600 leading-relaxed mb-6 ${
                      language === 'ml' ? 'font-malayalam-body' : ''
                    }`}
                  >
                    {item.summary}
                  </p>
                </div>

                {/* Key Program Highlights */}
                <div className="pt-4 border-t border-slate-200/60 space-y-2">
                  {item.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs font-medium text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-meadow-green shrink-0 mt-0.5" />
                      <span className={language === 'ml' ? 'font-malayalam-body' : ''}>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
