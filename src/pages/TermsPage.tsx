import { useLanguage } from '../context/LanguageContext';
import { Breadcrumb } from '../components/common/Breadcrumb';

export const TermsPage = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';

  return (
    <div className="bg-soft-cream min-h-screen">
      <Breadcrumb items={[{ label: 'Terms of Use', labelMl: 'ഉപയോഗ നിബന്ധനകൾ' }]} />

      <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-deep-red mb-2 block">
            {ml ? 'നിബന്ധനകൾ' : 'Terms & Conditions'}
          </span>
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight mb-4 ${ml ? 'font-malayalam' : ''}`}>
            {ml ? 'ഉപയോഗ നിബന്ധനകൾ' : 'Terms of Use'}
          </h1>
          <p className={`text-xs sm:text-sm text-slate-500 ${ml ? 'font-malayalam' : ''}`}>
            {ml ? 'ബാലസംഘം കണ്ണൂർ ജില്ലാ കമ്മിറ്റി' : 'Balasangham Kannur District Committee'}
          </p>
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200 shadow-sm space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
          <div>
            <h2 className={`text-lg font-bold text-charcoal mb-2 ${ml ? 'font-malayalam' : ''}`}>
              {ml ? 'വിവരലഭ്യത' : 'Informational Purpose'}
            </h2>
            <p className={ml ? 'font-malayalam-body leading-[1.8]' : ''}>
              {ml
                ? 'കേരളത്തിലെ കണ്ണൂർ ജില്ലയിലെ ബാലസംഘത്തിന്റെ ചരിത്രം, സംഘടനാ ഘടന, സാംസ്കാരിക പ്രവർത്തനങ്ങൾ, ജില്ലാ സമ്മേളനങ്ങൾ എന്നിവയെക്കുറിച്ചുള്ള ഔദ്യോഗിക വിവരങ്ങൾ പങ്കുവെക്കുന്നതിനാണ് ഈ വെബ്‌സൈറ്റ് പ്രവർത്തിക്കുന്നത്.'
                : 'This website is maintained to provide verified information regarding the history, structure, cultural programs, and district assemblies of Balasangham in Kannur district, Kerala.'}
            </p>
          </div>

          <div>
            <h2 className={`text-lg font-bold text-charcoal mb-2 ${ml ? 'font-malayalam' : ''}`}>
              {ml ? 'വിവരങ്ങളുടെ ആധികാരികത' : 'Content Authenticity'}
            </h2>
            <p className={ml ? 'font-malayalam-body leading-[1.8]' : ''}>
              {ml
                ? 'ചരിത്രപരമായ രേഖകൾ, നേതൃത്വ വിവരങ്ങൾ, സമ്മേളന തീയതികൾ എന്നിവ സംഘടനാ രേഖകളെയും ഔദ്യോഗിക വാർത്താക്കുറിപ്പുകളെയും അടിസ്ഥാനമാക്കിയുള്ളതാണ്.'
                : 'Historical records, leadership rosters, and conference schedules are grounded in authentic archival documents and verified press announcements.'}
            </p>
          </div>

          <div>
            <h2 className={`text-lg font-bold text-charcoal mb-2 ${ml ? 'font-malayalam' : ''}`}>
              {ml ? 'വാണിജ്യേതര സ്വഭാവം' : 'Non-Commercial Principle'}
            </h2>
            <p className={ml ? 'font-malayalam-body leading-[1.8]' : ''}>
              {ml
                ? 'ബാലസംഘം കുട്ടികളുടെ പുരോഗമന ജനാധിപത്യ ബഹുജന സംഘടനയാണ്. ഈ വെബ്‌സൈറ്റ് പൂർണ്ണമായും ലാഭേച്ഛയില്ലാത്തതാണ്. സംഘടനയുടെ ചിഹ്നങ്ങൾ അനധികൃത വാണിജ്യ ആവശ്യങ്ങൾക്ക് ഉപയോഗിക്കുന്നത് കർശനമായി നിരോധിച്ചിരിക്കുന്നു.'
                : 'Balasangham is a progressive, democratic mass children\'s organization. This platform is non-commercial and strictly prohibits misuse of organizational emblems for unauthorized commercial promotions.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
