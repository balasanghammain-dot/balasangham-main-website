import { useLanguage } from '../../context/LanguageContext';
import { ChevronRight } from 'lucide-react';

export const GovernanceDiagram = () => {
  const { t, language } = useLanguage();

  return (
    <div className="mt-16 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm">
      <div className="max-w-3xl mb-8">
        <h3 className={`text-xl sm:text-2xl font-bold text-charcoal ${language === 'ml' ? 'font-malayalam' : ''}`}>
          {t.about.governanceTitle}
        </h3>
        <p className={`text-sm sm:text-base text-slate-600 mt-2 ${language === 'ml' ? 'font-malayalam-body' : ''}`}>
          {t.about.governanceSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
        {t.about.governanceLevels.map((lvl, index) => (
          <div
            key={index}
            className="flex flex-col p-4 rounded-xl bg-slate-50 border border-slate-200/60 hover:border-brand-red/40 hover:bg-red-50/20 transition-all duration-200 relative group"
          >
            <div className="text-xs font-bold text-brand-red uppercase tracking-wider mb-1">
              Step 0{index + 1}
            </div>
            <div className={`text-base font-bold text-charcoal mb-1 ${language === 'ml' ? 'font-malayalam' : ''}`}>
              {lvl.level}
            </div>
            <div className="text-xs font-semibold text-slate-500 mb-2">
              {lvl.role}
            </div>
            <p className={`text-xs text-slate-600 leading-relaxed ${language === 'ml' ? 'font-malayalam-body' : ''}`}>
              {lvl.desc}
            </p>
            {index < t.about.governanceLevels.length - 1 && (
              <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white border border-slate-200 items-center justify-center text-slate-400 group-hover:text-brand-red">
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
