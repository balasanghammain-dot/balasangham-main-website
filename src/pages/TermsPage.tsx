import { useLanguage } from '../context/LanguageContext';
import { Breadcrumb } from '../components/common/Breadcrumb';

export const TermsPage = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';

  return (
    <div className="bg-surface-cream min-h-screen">
      <Breadcrumb items={[{ label: 'Terms of Use', labelMl: 'ഉപയോഗ നിബന്ധനകൾ' }]} />

      <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-red mb-2 block">
            {ml ? 'നിബന്ധനകൾ' : 'Terms & Conditions'}
          </span>
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight mb-4 ${ml ? 'font-malayalam' : ''}`}>
            {ml ? 'ഉപയോഗ നിബന്ധനകൾ' : 'Terms of Use'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Balasangham Kannur District Committee
          </p>
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200 shadow-sm space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
          <h2 className="text-lg font-bold text-charcoal">Informational Purpose</h2>
          <p>
            This website is maintained to provide verified information regarding the history, structure, cultural programs, and district assemblies of Balasangham in Kannur district, Kerala.
          </p>
          <h2 className="text-lg font-bold text-charcoal">Content Authenticity</h2>
          <p>
            Historical records, leadership rosters, and conference schedules are grounded in authentic archival documents and verified press announcements.
          </p>
          <h2 className="text-lg font-bold text-charcoal">Non-Commercial Principle</h2>
          <p>
            Balasangham is a progressive, democratic mass children\'s organization. This platform is non-commercial and strictly prohibits misuse of organizational emblems for unauthorized commercial promotions.
          </p>
        </div>
      </section>
    </div>
  );
};
