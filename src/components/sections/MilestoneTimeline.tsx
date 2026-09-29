import { useLanguage } from '../../context/LanguageContext';

export const MilestoneTimeline = () => {
  const { t, language } = useLanguage();

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200/90 shadow-sm">
      <h3
        className={`text-2xl sm:text-3xl font-bold text-charcoal text-center mb-12 ${
          language === 'ml' ? 'font-malayalam' : ''
        }`}
      >
        {t.history.timelineTitle}
      </h3>

      <div className="relative border-l-2 border-brand-red/30 ml-4 sm:ml-32 space-y-10 sm:space-y-12">
        {t.history.milestones.map((m, idx) => (
          <div key={idx} className="relative pl-6 sm:pl-10">
            {/* Year Badge on the left for sm screens */}
            <div className="hidden sm:block absolute -left-32 top-0 w-24 text-right">
              <span className="text-xl font-extrabold text-brand-red tracking-tight">{m.year}</span>
            </div>

            {/* Bullet Point */}
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-brand-red border-4 border-white shadow-xs" />

            {/* Mobile Year Badge */}
            <div className="sm:hidden text-sm font-extrabold text-brand-red mb-1">
              {m.year}
            </div>

            <h4
              className={`text-lg font-bold text-charcoal mb-2 ${
                language === 'ml' ? 'font-malayalam' : ''
              }`}
            >
              {m.title}
            </h4>

            <p
              className={`text-sm text-slate-600 leading-relaxed ${
                language === 'ml' ? 'font-malayalam-body' : ''
              }`}
            >
              {m.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
