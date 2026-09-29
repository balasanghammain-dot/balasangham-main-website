import { useLanguage } from '../context/LanguageContext';
import { Breadcrumb } from '../components/common/Breadcrumb';

export const PrivacyPage = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';

  return (
    <div className="bg-surface-cream min-h-screen">
      <Breadcrumb items={[{ label: 'Privacy Policy', labelMl: 'സ്വകാര്യതാ നയം' }]} />

      <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-red mb-2 block">
            {ml ? 'നിയമപരമായ വിവരങ്ങൾ' : 'Legal & Compliance'}
          </span>
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight mb-4 ${ml ? 'font-malayalam' : ''}`}>
            {ml ? 'സ്വകാര്യതാ നയം' : 'Privacy Policy'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Last Updated: September 2026 • Balasangham Kannur District Committee
          </p>
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200 shadow-sm space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <div>
            <h2 className="text-xl font-bold text-charcoal mb-3">1. Child Safety & Online Protection</h2>
            <p>
              Balasangham is dedicated to the safety, dignity, and wellbeing of children. We do not solicit, harvest, or monetize personal identifiable information (PII) of children through this website.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-charcoal mb-3">2. Data Collection & Analytics</h2>
            <p>
              This informational website does not use tracking cookies, commercial advertising beacons, or third-party marketing pixels. We do not sell or trade user data to any external commercial entity.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-charcoal mb-3">3. External Links</h2>
            <p>
              Our pages contain links to external verified social platforms (Facebook, Instagram, YouTube) for official announcements. Visitors should review the independent privacy policies of those third-party services when leaving this site.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-charcoal mb-3">4. Intellectual Property & Archival Photography</h2>
            <p>
              All organizational emblems, flag motifs, official songs, and conference poster artworks are the heritage property of Balasangham. Reproduction for unauthorized commercial purposes is prohibited.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
