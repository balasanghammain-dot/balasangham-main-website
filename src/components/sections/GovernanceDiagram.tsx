import { useLanguage } from '../../context/LanguageContext';
import { ChevronRight, ArrowDown } from 'lucide-react';

export const GovernanceDiagram = () => {
  const { t, language } = useLanguage();
  const ml = language === 'ml';

  return (
    <div className="mt-14 bg-[#E9DDC9]/80 rounded-xl p-6 sm:p-8 border border-[#241914]/20 shadow-warm">
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#FFF9EF] text-[#C90000] text-xs font-bold uppercase tracking-wider mb-2 border border-[#241914]/10">
          <span>{ml ? 'ജനാധിപത്യ ഘടന' : 'Democratic Hierarchy'}</span>
        </div>
        <h3 className={`text-xl sm:text-2xl font-black text-[#171514] tracking-tight ${ml ? 'font-malayalam' : ''}`}>
          {t.about.governanceTitle}
        </h3>
        <p className={`text-xs sm:text-sm text-[#241914]/80 mt-1.5 leading-relaxed font-medium ${ml ? 'font-malayalam-body leading-[1.7]' : ''}`}>
          {t.about.governanceSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5 relative">
        {t.about.governanceLevels.map((lvl, index) => (
          <div
            key={index}
            className="flex flex-col p-4 sm:p-5 rounded-lg bg-[#FFF9EF] border border-[#241914]/15 hover:border-[#C90000]/60 transition-all duration-200 relative group shadow-2xs"
          >
            <div className="text-[11px] font-mono font-bold text-[#C90000] uppercase tracking-wider mb-1">
              STAGE 0{index + 1}
            </div>
            <div className={`text-sm sm:text-base font-black text-[#171514] mb-1 ${ml ? 'font-malayalam' : ''}`}>
              {lvl.level}
            </div>
            <div className={`text-xs font-bold text-[#241914]/70 mb-2 ${ml ? 'font-malayalam' : ''}`}>
              {lvl.role}
            </div>
            <p className={`text-xs text-[#241914]/75 leading-relaxed font-medium ${ml ? 'font-malayalam-body leading-[1.65]' : ''}`}>
              {lvl.desc}
            </p>
            {index < t.about.governanceLevels.length - 1 && (
              <>
                {/* Desktop horizontal arrow */}
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-[#FFF9EF] border border-[#241914]/20 items-center justify-center text-[#241914]/60 group-hover:text-[#C90000] group-hover:border-[#C90000] shadow-xs">
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
                {/* Mobile vertical indicator */}
                <div className="flex md:hidden justify-center pt-2 text-[#241914]/40">
                  <ArrowDown className="w-4 h-4" />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
