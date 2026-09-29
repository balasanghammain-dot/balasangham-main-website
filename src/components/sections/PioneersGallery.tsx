import { useLanguage } from '../../context/LanguageContext';
import { Star } from 'lucide-react';

export const PioneersGallery = () => {
  const { t, language } = useLanguage();

  return (
    <div className="mb-20">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h3
          className={`text-2xl sm:text-3xl font-black text-ink mb-2 ${
            language === 'ml' ? 'font-malayalam' : ''
          }`}
        >
          {t.history.pioneersTitle}
        </h3>
        <p
          className={`text-sm sm:text-base text-ink/75 leading-relaxed font-medium ${
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
            className="bg-white/95 rounded-3xl p-6 border-2 border-festival/30 shadow-warm hover:shadow-warm-lg hover:border-berry/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="w-11 h-11 rounded-2xl bg-festival/20 text-festival-deep border border-festival/30 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                <Star className="w-5 h-5 fill-festival text-festival-deep" />
              </div>
              <h4
                className={`text-base font-black text-ink mb-1 group-hover:text-berry transition-colors ${
                  language === 'ml' ? 'font-malayalam' : ''
                }`}
              >
                {pioneer.name}
              </h4>
              <p className="text-xs font-bold text-berry mb-2">
                {pioneer.role}
              </p>
            </div>
            <p
              className={`text-xs text-ink/75 leading-relaxed pt-3 border-t border-ink/10 font-medium ${
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
