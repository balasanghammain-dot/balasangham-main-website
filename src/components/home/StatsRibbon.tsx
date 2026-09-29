import { useLanguage } from '../../context/LanguageContext';
import { Users, Landmark, MapPin, Sparkles } from 'lucide-react';

export const StatsRibbon = () => {
  const { t, language } = useLanguage();

  const stats = [
    {
      value: t.stats.membersCount,
      label: t.stats.membersLabel,
      icon: Users,
    },
    {
      value: t.stats.unitsCount,
      label: t.stats.unitsLabel,
      icon: Landmark,
    },
    {
      value: t.stats.districtsCount,
      label: t.stats.districtsLabel,
      icon: MapPin,
    },
    {
      value: t.stats.legacyCount,
      label: t.stats.legacyLabel,
      icon: Sparkles,
    },
  ];

  return (
    <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 mt-8 sm:mt-12">
      <div className="bg-[#E9DDC9]/90 rounded-xl shadow-warm border border-[#241914]/15 p-6 sm:p-8 relative overflow-hidden">
        {/* Subtle red accent line inspired by poster */}
        <div className="absolute top-0 inset-x-0 h-1 bg-[#C90000]" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-[#241914]/10">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`flex flex-col items-center text-center p-2 sm:p-3 ${idx > 0 ? 'pt-4 md:pt-2' : ''}`}
              >
                <div className="p-2.5 rounded-lg bg-[#F4EBDD] text-[#C90000] mb-2 border border-[#241914]/10 shadow-2xs">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#171514]">
                  {stat.value}
                </div>
                <div
                  className={`text-xs sm:text-xs font-bold text-[#241914]/70 mt-1 uppercase tracking-wider ${
                    language === 'ml' ? 'font-malayalam normal-case text-sm leading-[1.6]' : ''
                  }`}
                >
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
