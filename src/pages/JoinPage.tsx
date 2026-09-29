import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export const JoinPage = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';

  return (
    <div className="bg-surface-cream min-h-screen">
      <Breadcrumb items={[{ label: 'How to Join', labelMl: 'എങ്ങനെ ചേരാം' }]} />

      <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-red mb-2 block">
            {ml ? 'അംഗത്വ വിവരങ്ങൾ' : 'Membership & Participation'}
          </span>
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight mb-4 ${ml ? 'font-malayalam' : ''}`}>
            {ml ? 'ബാലസംഘത്തിൽ എങ്ങനെ പങ്കാളിയാകാം?' : 'How to Join Balasangham'}
          </h1>
          <p className={`text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto ${ml ? 'font-malayalam-body' : ''}`}>
            {ml
              ? '5 മുതൽ 16 വയസ്സുവരെയുള്ള എല്ലാ കുട്ടികൾക്കും ബാലസംഘം പ്രാദേശിക യൂണിറ്റുകളിൽ അംഗമാകാം.'
              : 'Balasangham welcomes every child between the ages of 5 and 16 through local neighborhood units.'}
          </p>
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200 shadow-sm mb-12">
          <h2 className={`text-2xl font-bold text-charcoal mb-6 ${ml ? 'font-malayalam' : ''}`}>
            {ml ? 'പങ്കാളിത്ത മാർഗ്ഗങ്ങൾ' : 'How the Membership Process Works'}
          </h2>

          <div className="space-y-6 mb-10">
            {[
              {
                step: '01',
                title: 'Locate Your Neighborhood Unit',
                titleMl: 'പ്രാദേശിക യൂണിറ്റ് കണ്ടെത്തുക',
                desc: 'Balasangham operates tens of thousands of neighborhood units (കുട്ടിക്കൂട്ടങ്ങൾ) across Kannur. Units meet weekly or fortnightly in village wards, community centres, and school clusters.',
                descMl: 'കണ്ണൂരിലെ ഓരോ വാർഡിലും വില്ലേജിലും പ്രവർത്തിക്കുന്ന അടുത്തുള്ള കുട്ടിക്കൂട്ടവുമായോ യൂണിറ്റുമായോ ബന്ധപ്പെടുക.',
              },
              {
                step: '02',
                title: 'Age Eligibility (5 to 16 Years)',
                titleMl: 'പ്രായപരിധി (5 മുതൽ 16 വയസ്സ് വരെ)',
                desc: 'Open to all children regardless of background, gender, or religion. No commercial fee is required to participate in basic local unit activities.',
                descMl: 'ജാതി-മത-സാമ്പത്തിക വ്യത്യാസങ്ങളില്ലാതെ 5 മുതൽ 16 വയസ്സുവരെയുള്ള ഏത് കുട്ടിക്കും ഇതിൽ പങ്കാളിയാകാം.',
              },
              {
                step: '03',
                title: 'Democratic Participation',
                titleMl: 'ജനാധിപത്യ പങ്കാളിത്തം',
                desc: 'Every registered child member has the right to attend unit assemblies, propose activities, vote in elections, and stand for child leadership offices.',
                descMl: 'യൂണിറ്റ് യോഗങ്ങളിൽ പങ്കെടുക്കാനും വോട്ട് ചെയ്യാനും കലാ-ശാസ്ത്ര പ്രവർത്തനങ്ങളിൽ പങ്കാളിയാകാനും കുട്ടികൾക്ക് പൂർണ്ണ അവകാശമുണ്ട്.',
              },
            ].map((s, idx) => (
              <div key={idx} className="flex items-start gap-4 p-5 rounded-2xl bg-surface-cream border border-slate-100">
                <span className="w-10 h-10 rounded-xl bg-red-100 text-brand-red flex items-center justify-center font-extrabold text-sm shrink-0">
                  {s.step}
                </span>
                <div>
                  <h3 className={`text-lg font-bold text-charcoal mb-1 ${ml ? 'font-malayalam' : ''}`}>
                    {ml ? s.titleMl : s.title}
                  </h3>
                  <p className={`text-sm text-slate-600 leading-relaxed ${ml ? 'font-malayalam-body' : ''}`}>
                    {ml ? s.descMl : s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200">
            <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-700" />
              <span>{ml ? 'പ്രധാന അറിയിപ്പ്' : 'No Online Fee or Third-Party Forms'}</span>
            </h3>
            <p className="text-xs sm:text-sm text-amber-900/80 leading-relaxed">
              {ml
                ? 'ബാലസംഘത്തിൽ ചേരുന്നതിന് ഓൺലൈൻ പണമിടപാടുകളോ രജിസ്ട്രേഷൻ ഫീസോ ആവശ്യമില്ല. യൂണിറ്റ് കൺവീനർമാരുമായും രക്ഷാധികാരി സമിതികളുമായും നേരിട്ട് ബന്ധപ്പെടുക.'
                : 'Balasangham does not collect online registration fees through external portals. All activities and memberships are organized through authorized district, area, and local unit committees.'}
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-red text-white font-bold text-sm shadow hover:bg-red-700 transition-colors"
          >
            <span>{ml ? 'ജില്ലാ സമ്പർക്ക വിവരങ്ങൾ കാണുക' : 'View District Contact Channels'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};
