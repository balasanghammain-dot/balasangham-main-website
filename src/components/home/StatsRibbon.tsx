import { useLanguage } from '../../context/LanguageContext';
import { Users, Landmark, MapPin, Sparkles } from 'lucide-react';

export const StatsRibbon = () => {
  const { t, language } = useLanguage();

  const stats = [
    {
      value: t.stats.membersCount,
      label: t.stats.membersLabel,
      icon: Users,
      color: 'text-amber-gold',
    },
    {
      value: t.stats.unitsCount,
      label: t.stats.unitsLabel,
      icon: Landmark,
      color: 'text-brand-red',
    },
    {
      value: t.stats.districtsCount,
      label: t.stats.districtsLabel,
      icon: MapPin,
      color: 'text-sky-blue',
    },
    {
      value: t.stats.legacyCount,
      label: t.stats.legacyLabel,
      icon: Sparkles,
      color: 'text-meadow-green',
    },
  ];

  return (
    <div className="relative -mt-10 sm:-mt-14 z-20 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="bg-white rounded-2xl shadow-xl border border-amber-100 p-6 sm:p-8 backdrop-blur-md">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`flex flex-col items-center text-center ${idx !== 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''}`}
              >
                <div className={`p-2.5 rounded-full bg-slate-50 mb-3 ${stat.color}`}>
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-charcoal">
                  {stat.value}
                </div>
                <div className={`text-xs sm:text-sm font-semibold text-slate-600 mt-1 ${language === 'ml' ? 'font-malayalam' : ''}`}>
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
