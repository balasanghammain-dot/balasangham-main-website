import { useLanguage } from '../../context/LanguageContext';
import { RedStarIcon } from '../motifs/RedStarIcon';

export const MilestoneTimeline = () => {
  const { t, language } = useLanguage();
  const ml = language === 'ml';

  return (
    <div className="bg-white/95 rounded-3xl p-6 sm:p-12 border-2 border-festival/30 shadow-warm-lg relative">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-ink/10 gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-berry font-bold">
            CHRONOLOGICAL ARCHIVE // നാൾവഴികൾ
          </span>
          <h3
            className={`text-2xl sm:text-3xl font-black text-ink tracking-tight mt-1 ${
              language === 'ml' ? 'font-malayalam' : ''
            }`}
          >
            {t.history.timelineTitle}
          </h3>
        </div>
        <span className="text-xs font-mono text-ink/60 uppercase tracking-widest">
          DOCUMENTARY TIMELINE // 1938 – 2026
        </span>
      </div>

      {/* Documentary Spread Layout with Warm Subcards */}
      <div className="space-y-10 sm:space-y-12">
        {t.history.milestones.map((m, idx) => (
          <article
            key={idx}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pt-6 border-t border-ink/10 first:border-t-0 first:pt-0"
          >
            {/* Year Column */}
            <div className="md:col-span-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-berry font-bold block mb-1">
                YEAR // വർഷം
              </span>
              <div className="text-4xl sm:text-5xl font-black text-berry tracking-tight font-mono">
                {m.year}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <RedStarIcon size={12} className="text-festival-deep" />
                <span className="text-[10px] font-mono uppercase text-ink/60 tracking-wider">
                  EPOCH {idx + 1}
                </span>
              </div>
            </div>

            {/* Content Column */}
            <div className="md:col-span-9 bg-cream/70 p-5 sm:p-6 rounded-2xl border border-festival/20 shadow-xs space-y-3">
              <h4
                className={`text-lg sm:text-xl font-black text-ink tracking-tight ${
                  language === 'ml' ? 'font-malayalam' : ''
                }`}
              >
                {m.title}
              </h4>

              <p
                className={`text-sm text-ink/80 leading-relaxed font-medium ${
                  language === 'ml' ? 'font-malayalam-body leading-[1.75]' : ''
                }`}
              >
                {m.description}
              </p>

              <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-ink/50 border-t border-ink/10">
                <span>HISTORICAL RECORD // {m.year}</span>
                <span className="text-berry font-bold">{ml ? 'ഔദ്യോഗിക രേഖ' : 'VERIFIED MILESTONE'}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
