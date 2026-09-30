import { useLanguage } from '../context/LanguageContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { kannurLeadership, stateLeadership } from '../data/organizationData';
import { BackdropSunburst } from '../components/motifs/BackdropSunburst';
import { RedStarIcon } from '../components/motifs/RedStarIcon';
import { PeaceDove } from '../components/motifs/PeaceDove';
import { ShieldCheck, UserCheck, Award, Sparkles } from 'lucide-react';

export const LeadershipPage = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';

  return (
    <div className="bg-soft-cream min-h-screen">
      <Breadcrumb
        items={[
          { label: 'About Us', labelMl: 'ഞങ്ങളെക്കുറിച്ച്', path: '/about' },
          { label: 'Leadership', labelMl: 'നേതൃത്വം' },
        ]}
      />

      {/* Festive Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FBC02D] via-[#F57F17] to-[#D32F2F] text-white py-14 sm:py-18">
        <BackdropSunburst className="opacity-45" />

        <div className="absolute top-8 left-8 text-white/70 pointer-events-none hidden md:block">
          <PeaceDove filled className="w-14 h-10" />
        </div>
        <div className="absolute top-8 right-8 text-white/70 pointer-events-none hidden md:block scale-x-[-1]">
          <PeaceDove filled className="w-14 h-10" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 shadow-sm">
            <RedStarIcon className="w-3.5 h-3.5 text-white" />
            <span className={ml ? 'font-malayalam' : ''}>{ml ? 'ജില്ലാ നേതൃത്വം' : 'Kannur District Leadership'}</span>
            <Sparkles className="w-3.5 h-3.5 text-sun-yellow" />
          </div>
          <h1 className={`text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-md ${ml ? 'font-malayalam' : ''}`}>
            {ml ? 'ഭാരവാഹികൾ (2024–2026)' : 'District Committee Office Bearers'}
          </h1>
          <p className={`text-base sm:text-xl text-amber-100 max-w-2xl mx-auto leading-relaxed drop-shadow-xs ${ml ? 'font-malayalam-body leading-[1.8]' : ''}`}>
            {ml
              ? '2024 ഒക്ടോബറിൽ പിലാത്തറയിൽ ചേർന്ന ജില്ലാ സമ്മേളനം തിരഞ്ഞെടുത്ത ഭാരവാഹികൾ.'
              : 'Elected democratically at the Kannur District Conference held at Pilathara in October 2024 for the 2024–2026 tenure.'}
          </p>
        </div>
      </section>

      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Child Office Bearers */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-6">
            <UserCheck className="w-5 h-5 text-deep-red" />
            <h2 className={`text-2xl font-bold text-charcoal ${ml ? 'font-malayalam' : ''}`}>
              {ml ? 'കണ്ണൂർ ജില്ലാ കമ്മിറ്റി ഭാരവാഹികൾ' : 'Kannur District Committee (2024–2026)'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {kannurLeadership.map((leader, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:border-deep-red/60 transition-colors"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-red-50 text-deep-red flex items-center justify-center font-bold text-base shrink-0 border border-red-100">
                    {(ml ? leader.nameMl : leader.name).charAt(0)}
                  </div>
                  <div>
                    <h3 className={`font-bold text-base text-charcoal ${ml ? 'font-malayalam' : ''}`}>
                      {ml ? leader.nameMl : leader.name}
                    </h3>
                    <p className={`text-sm font-semibold text-deep-red ${ml ? 'font-malayalam-body' : ''}`}>
                      {ml ? leader.roleMl : leader.role}
                    </p>
                    <span className="text-[11px] text-slate-400 mt-1 block">Kannur District</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-slate-100/70 rounded-lg text-xs text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Verified source:</strong> Deshabhimani Daily (October 7, 2024, Pilathara Conference coverage).
            </span>
          </div>
        </div>

        {/* State Leadership Reference */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-5 h-5 text-deep-red" />
            <div>
              <h2 className={`text-xl font-bold text-charcoal ${ml ? 'font-malayalam' : ''}`}>
                {ml ? 'സംസ്ഥാന നേതൃത്വം (റഫറൻസ്)' : 'State Leadership Reference'}
              </h2>
              <p className="text-xs text-slate-500">Balasangham Kerala State Committee</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {stateLeadership.map((leader, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-soft-cream border border-slate-200"
              >
                <div className="w-10 h-10 rounded-full bg-red-100 text-deep-red flex items-center justify-center font-bold text-sm mb-3">
                  {(ml ? leader.nameMl : leader.name).charAt(0)}
                </div>
                <h3 className={`font-bold text-base text-charcoal ${ml ? 'font-malayalam' : ''}`}>
                  {ml ? leader.nameMl : leader.name}
                </h3>
                <p className={`text-sm font-semibold text-deep-red ${ml ? 'font-malayalam-body' : ''}`}>
                  {ml ? leader.roleMl : leader.role}
                </p>
                <span className="text-[11px] text-slate-500 mt-1 block">Kerala State Committee</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
