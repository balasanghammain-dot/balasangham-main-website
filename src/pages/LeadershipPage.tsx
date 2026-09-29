import { useLanguage } from '../context/LanguageContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { kannurLeadership, stateLeadership } from '../data/organizationData';
import { ShieldCheck, UserCheck, Award } from 'lucide-react';

export const LeadershipPage = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';

  return (
    <div className="bg-surface-cream min-h-screen">
      <Breadcrumb
        items={[
          { label: 'About Us', labelMl: 'ഞങ്ങളെക്കുറിച്ച്', path: '/about' },
          { label: 'Leadership', labelMl: 'നേതൃത്വം' },
        ]}
      />

      <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-red mb-2 block">
            {ml ? 'ജില്ലാ നേതൃത്വം' : 'Kannur District Leadership'}
          </span>
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight mb-4 ${ml ? 'font-malayalam' : ''}`}>
            {ml ? 'ഭാരവാഹികൾ (2024–2026)' : 'District Committee Office Bearers'}
          </h1>
          <p className={`text-sm sm:text-base text-slate-600 max-w-2xl mx-auto ${ml ? 'font-malayalam-body' : ''}`}>
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
            <UserCheck className="w-5 h-5 text-brand-red" />
            <h2 className={`text-2xl font-bold text-charcoal ${ml ? 'font-malayalam' : ''}`}>
              {ml ? 'കണ്ണൂർ ജില്ലാ കമ്മിറ്റി ഭാരവാഹികൾ' : 'Kannur District Committee (2024–2026)'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {kannurLeadership.map((leader, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:border-brand-red/60 transition-colors"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-red-50 text-brand-red flex items-center justify-center font-bold text-base shrink-0 border border-red-100">
                    {(ml ? leader.nameMl : leader.name).charAt(0)}
                  </div>
                  <div>
                    <h3 className={`font-bold text-base text-charcoal ${ml ? 'font-malayalam' : ''}`}>
                      {ml ? leader.nameMl : leader.name}
                    </h3>
                    <p className={`text-sm font-semibold text-brand-red ${ml ? 'font-malayalam-body' : ''}`}>
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
            <Award className="w-5 h-5 text-brand-red" />
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
                className="p-5 rounded-xl bg-surface-cream border border-slate-200"
              >
                <div className="w-10 h-10 rounded-full bg-red-100 text-brand-red flex items-center justify-center font-bold text-sm mb-3">
                  {(ml ? leader.nameMl : leader.name).charAt(0)}
                </div>
                <h3 className={`font-bold text-base text-charcoal ${ml ? 'font-malayalam' : ''}`}>
                  {ml ? leader.nameMl : leader.name}
                </h3>
                <p className={`text-sm font-semibold text-brand-red ${ml ? 'font-malayalam-body' : ''}`}>
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
