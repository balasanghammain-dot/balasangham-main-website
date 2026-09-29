import { useLanguage } from '../../context/LanguageContext';
import { Star } from 'lucide-react';

export const PioneersGallery = () => {
  const { t, language } = useLanguage();

  return (
    <div className="mb-20">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h3
          className={`text-2xl sm:text-3xl font-bold text-charcoal mb-2 ${
            language === 'ml' ? 'font-malayalam' : ''
          }`}
        >
          {t.history.pioneersTitle}
        </h3>
        <p
          className={`text-sm sm:text-base text-slate-600 ${
            language === 'ml' ? 'font-malayalam-body' : ''
          }`}
        >
          {t.history.pioneersSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {t.history.pioneers.map((pioneer, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-brand-red/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-red-50 text-brand-red flex items-center justify-center mb-3">
                <Star className="w-5 h-5 fill-brand-red" />
              </div>
              <h4
                className={`text-base font-bold text-charcoal mb-1 ${
                  language === 'ml' ? 'font-malayalam' : ''
                }`}
              >
                {pioneer.name}
              </h4>
              <p className="text-xs font-semibold text-brand-red mb-2">
                {pioneer.role}
              </p>
            </div>
            <p
              className={`text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100 ${
                language === 'ml' ? 'font-malayalam-body' : ''
              }`}
            >
              {pioneer.contribution}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
