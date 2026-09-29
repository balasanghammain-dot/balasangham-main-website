import { useLanguage } from '../../context/LanguageContext';
import { Users, Landmark, MapPin, Sparkles } from 'lucide-react';

export const StatsRibbon = () => {
  const { t, language } = useLanguage();

  const stats = [
    {
      value: t.stats.membersCount,
      label: t.stats.membersLabel,
      icon: Users,
      accent: 'text-berry bg-berry/10 border-berry/20',
    },
    {
      value: t.stats.unitsCount,
      label: t.stats.unitsLabel,
      icon: Landmark,
      accent: 'text-festival-deep bg-festival/20 border-festival/30',
    },
    {
      value: t.stats.districtsCount,
      label: t.stats.districtsLabel,
      icon: MapPin,
      accent: 'text-sky bg-sky/15 border-sky/30',
    },
    {
      value: t.stats.legacyCount,
      label: t.stats.legacyLabel,
      icon: Sparkles,
      accent: 'text-mango bg-mango/15 border-mango/30',
    },
  ];

  return (
    <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 mt-8 sm:mt-12 animate-rise-in">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-warm-lg border-2 border-festival/40 p-6 sm:p-8 relative overflow-hidden">
        {/* Subtle festive gradient line inspired by festival colors */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#D32020] via-[#F5A623] to-[#257A3E]" />

        <div className="stats-grid-2x2 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#2A1610]/10">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`group flex flex-col items-center text-center p-2 sm:p-3 transition-transform hover:-translate-y-1 duration-300 ${
                  idx > 0 ? 'pt-4 md:pt-2' : ''
                }`}
              >
                <div
                  className={`p-3 rounded-2xl mb-2.5 border shadow-xs transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${stat.accent}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-ink font-sans">
                  {stat.value}
                </div>
                <div
                  className={`text-xs font-bold text-ink/75 mt-1 uppercase tracking-wider ${
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
