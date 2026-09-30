import { useLanguage } from '../context/LanguageContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { notableAlumni } from '../data/organizationData';
import { GraduationCap, ShieldCheck } from 'lucide-react';

export const AlumniPage = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';

  return (
    <div className="bg-soft-cream min-h-screen">
      <Breadcrumb
        items={[
          { label: 'About Us', labelMl: 'ഞങ്ങളെക്കുറിച്ച്', path: '/about' },
          { label: 'Notable Alumni', labelMl: 'പ്രമുഖ പൂർവകാല പ്രവർത്തകർ' },
        ]}
      />

      <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-deep-red mb-2 block">
            {ml ? 'പൂർവകാല പ്രവർത്തകർ' : 'Legacy of Public Service'}
          </span>
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight mb-4 ${ml ? 'font-malayalam' : ''}`}>
            {ml ? 'പ്രമുഖ പൂർവകാല പ്രവർത്തകർ' : 'Notable Alumni'}
          </h1>
          <p className={`text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto ${ml ? 'font-malayalam-body' : ''}`}>
            {ml
              ? 'ബാലസംഘത്തിലൂടെ കുട്ടിക്കാലത്ത് പൊതുപ്രവർത്തനം ആരംഭിച്ച് പിന്നീട് നാടിന്റെ വികസനത്തിന് നേതൃത്വം നൽകിയ പ്രമുഖർ.'
              : 'Leaders whose dedication to public service, democratic governance, and social progress was nurtured through early participation in Balasangham.'}
          </p>
        </div>
      </section>

      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notableAlumni.map((alum, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-deep-red flex items-center justify-center font-bold text-lg border border-red-100">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className={`text-xl font-bold text-charcoal ${ml ? 'font-malayalam' : ''}`}>
                      {ml ? alum.nameMl : alum.name}
                    </h2>
                    <span className="text-xs text-deep-red font-semibold block">
                      {ml ? alum.roleMl : alum.role}
                    </span>
                  </div>
                </div>

                <p className={`text-sm text-slate-600 leading-relaxed mb-4 ${ml ? 'font-malayalam-body' : ''}`}>
                  {ml ? alum.descriptionMl : alum.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Historical Association</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
