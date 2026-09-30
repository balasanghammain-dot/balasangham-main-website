import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { verifiedPrograms } from '../data/organizationData';
import { ArrowLeft, Calendar, Globe, CheckCircle2 } from 'lucide-react';

export const ProgramDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const ml = language === 'ml';

  const program = verifiedPrograms.find((p) => p.slug === slug || p.id === slug);

  if (!program) {
    return (
      <div className="bg-soft-cream min-h-screen py-24 text-center px-4">
        <h1 className="text-2xl font-bold text-charcoal mb-4">
          {ml ? 'പരിപാടി കണ്ടെത്താനായില്ല' : 'Program Not Found'}
        </h1>
        <p className="text-slate-600 mb-6">
          {ml
            ? 'നിങ്ങൾ തിരഞ്ഞ പരിപാടിയുടെ വിവരങ്ങൾ നിലവിൽ ലഭ്യമല്ല.'
            : 'The requested program could not be located in the directory.'}
        </p>
        <Link
          to="/programs"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-deep-red text-white font-bold text-sm shadow hover:bg-red-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{ml ? 'എല്ലാ പരിപാടികളിലേക്കും' : 'Back to All Programs'}</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-soft-cream min-h-screen">
      <Breadcrumb
        items={[
          { label: 'Programs', labelMl: 'പരിപാടികൾ', path: '/programs' },
          { label: program.title, labelMl: program.titleMl },
        ]}
      />

      <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/programs"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-deep-red hover:text-red-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{ml ? 'എല്ലാ പരിപാടികളിലേക്കും മടങ്ങുക' : 'Back to Programs'}</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-red-50 text-deep-red text-xs font-bold uppercase tracking-wider">
              {program.category}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Verified Program
            </span>
          </div>

          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight mb-2 ${ml ? 'font-malayalam' : ''}`}>
            {ml ? program.titleMl : program.title}
          </h1>
          <p className="text-sm font-semibold text-slate-400 mb-6">
            {ml ? program.title : program.titleMl}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-soft-cream border border-slate-200">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-deep-red shrink-0" />
              <div>
                <span className="text-[11px] uppercase font-bold text-slate-400 block">
                  {ml ? 'സമയം / കാലയളവ്' : 'Schedule'}
                </span>
                <span className="text-sm font-bold text-charcoal">
                  {ml ? program.scheduleMl : program.schedule}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-deep-red shrink-0" />
              <div>
                <span className="text-[11px] uppercase font-bold text-slate-400 block">
                  {ml ? 'വ്യാപ്തി' : 'Geographic Scope'}
                </span>
                <span className="text-sm font-bold text-charcoal">
                  {ml ? program.scopeMl : program.scope}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm mb-10">
          <h2 className={`text-xl font-bold text-charcoal mb-4 ${ml ? 'font-malayalam' : ''}`}>
            {ml ? 'വിവരണം' : 'Overview & Mission'}
          </h2>
          <p className={`text-base sm:text-lg text-slate-700 leading-relaxed mb-8 ${ml ? 'font-malayalam-body' : ''}`}>
            {ml ? program.descriptionMl : program.description}
          </p>

          <h3 className={`text-lg font-bold text-charcoal mb-4 ${ml ? 'font-malayalam' : ''}`}>
            {ml ? 'പ്രധാന സവിശേഷതകൾ' : 'Key Highlights & Activities'}
          </h3>
          <div className="space-y-3">
            {(ml ? program.highlightsMl : program.highlights).map((hl: string, idx: number) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-soft-cream border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className={`text-sm text-slate-700 ${ml ? 'font-malayalam-body' : ''}`}>{hl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Join CTA for program */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-red to-red-700 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className={`text-lg font-bold mb-1 ${ml ? 'font-malayalam' : ''}`}>
              {ml ? 'ഈ പരിപാടിയിൽ പങ്കെടുക്കാൻ ആഗ്രഹിക്കുന്നുണ്ടോ?' : 'Want your child to participate?'}
            </h3>
            <p className="text-xs text-white/80">
              {ml
                ? 'നിങ്ങളുടെ പ്രദേശത്തെ പ്രാദേശിക യൂണിറ്റുമായി ബന്ധപ്പെടുക.'
                : 'Activities are coordinated through local neighborhood and school units.'}
            </p>
          </div>
          <Link
            to="/join"
            className="px-5 py-2.5 rounded-lg bg-white text-deep-red text-xs font-bold hover:bg-slate-50 transition-colors shrink-0"
          >
            {ml ? 'കൂടുതൽ വിവരങ്ങൾ' : 'How to Participate'}
          </Link>
        </div>
      </section>
    </div>
  );
};
