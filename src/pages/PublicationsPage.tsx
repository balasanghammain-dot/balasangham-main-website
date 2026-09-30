import { useLanguage } from '../context/LanguageContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { verifiedPublications } from '../data/organizationData';
import { BookOpen, Bookmark } from 'lucide-react';

export const PublicationsPage = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';

  return (
    <div className="bg-soft-cream min-h-screen">
      <Breadcrumb items={[{ label: 'Publications', labelMl: 'പ്രസിദ്ധീകരണങ്ങൾ' }]} />

      <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-deep-red mb-2 block">
            {ml ? 'സാഹിത്യവും വായനയും' : 'Literature & Magazines'}
          </span>
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight mb-4 ${ml ? 'font-malayalam' : ''}`}>
            {ml ? 'പ്രസിദ്ധീകരണങ്ങൾ' : 'Publications & Literature'}
          </h1>
          <p className={`text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto ${ml ? 'font-malayalam-body' : ''}`}>
            {ml
              ? 'കുട്ടികളുടെ രചനകൾക്കും വായനാ സംസ്കാരത്തിനും വഴിയൊരുക്കുന്ന ഔദ്യോഗിക മാസികകളും സ്മരണികകളും.'
              : 'Official magazines, digital bulletins, and commemorative volumes nurturing children\'s literary expression across Kerala.'}
          </p>
        </div>
      </section>

      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {verifiedPublications.map((pub) => (
            <div
              key={pub.id}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-start gap-6"
            >
              <div className="w-14 h-14 rounded-2xl bg-red-50 text-deep-red flex items-center justify-center shrink-0 border border-red-100">
                <BookOpen className="w-7 h-7" />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-deep-red font-bold text-xs">
                    {ml ? pub.typeMl : pub.type}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {ml ? pub.frequencyMl : pub.frequency}
                  </span>
                </div>

                <h2 className={`text-2xl font-bold text-charcoal mb-1 ${ml ? 'font-malayalam' : ''}`}>
                  {ml ? pub.titleMl : pub.title}
                </h2>
                <span className="text-xs text-slate-400 font-semibold mb-3 block">
                  {ml ? pub.title : pub.titleMl}
                </span>

                <p className={`text-sm sm:text-base text-slate-600 leading-relaxed mb-4 ${ml ? 'font-malayalam-body' : ''}`}>
                  {ml ? pub.descriptionMl : pub.description}
                </p>

                <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-2">
                  <Bookmark className="w-3.5 h-3.5 text-deep-red" />
                  <span>
                    Publisher: <strong>{ml ? pub.publisherMl : pub.publisher}</strong>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note on Subscriptions */}
        <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200">
          <h3 className={`text-lg font-bold text-charcoal mb-2 ${ml ? 'font-malayalam' : ''}`}>
            {ml ? 'മാസികാ വരിചേരലും വിതരണവും' : 'Subscriptions & School Circulation'}
          </h3>
          <p className={`text-sm text-slate-600 leading-relaxed ${ml ? 'font-malayalam-body' : ''}`}>
            {ml
              ? 'കിളിക്കൂട് മാസിക സ്കൂളുകൾ, പ്രദേശത്തെ വായനശാലകൾ, ബാലസംഘം യൂണിറ്റുകൾ എന്നിവ വഴി വിതരണം ചെയ്യപ്പെടുന്നു. വിശദ വിവരങ്ങൾക്ക് അതത് ഏരിയ കമ്മിറ്റിയുമായി ബന്ധപ്പെടുക.'
              : 'Kilikkoodu is distributed directly through local schools, community libraries, and neighborhood Balasangham units. For bulk copies or institutional distribution, contact your local area committee.'}
          </p>
        </div>
      </section>
    </div>
  );
};
