import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { verifiedNews } from '../data/organizationData';
import { ArrowLeft, Calendar, ShieldCheck } from 'lucide-react';

export const NewsDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const ml = language === 'ml';

  const item = verifiedNews.find((n) => n.slug === slug || n.id === slug);

  if (!item) {
    return (
      <div className="bg-soft-cream min-h-screen py-24 text-center px-4">
        <h1 className="text-2xl font-bold text-charcoal mb-4">
          {ml ? 'വാർത്ത കണ്ടെത്താനായില്ല' : 'News Article Not Found'}
        </h1>
        <p className="text-slate-600 mb-6">
          {ml ? 'ഈ വാർത്ത നിലവിൽ ലഭ്യമല്ല.' : 'The requested news article could not be found.'}
        </p>
        <Link
          to="/news"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-deep-red text-white font-bold text-sm shadow hover:bg-red-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{ml ? 'എല്ലാ വാർത്തകളിലേക്കും' : 'Back to News'}</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-soft-cream min-h-screen">
      <Breadcrumb
        items={[
          { label: 'News', labelMl: 'വാർത്തകൾ', path: '/news' },
          { label: item.title, labelMl: item.titleMl },
        ]}
      />

      <article className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/news"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-deep-red hover:text-red-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{ml ? 'വാർത്തകളിലേക്ക് മടങ്ങുക' : 'Back to News'}</span>
        </Link>

        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200 shadow-sm">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-6">
            <span className="px-3 py-1 rounded-full bg-red-50 text-deep-red font-bold uppercase tracking-wider">
              {ml ? item.categoryMl : item.category}
            </span>
            <div className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-4 h-4 text-slate-400" />
              <time dateTime={item.date}>{item.date}</time>
            </div>
            <span className="text-slate-300">•</span>
            <span>Source: <strong>{item.source}</strong></span>
          </div>

          <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold text-charcoal tracking-tight mb-6 leading-tight ${ml ? 'font-malayalam' : ''}`}>
            {ml ? item.titleMl : item.title}
          </h1>

          <div className="p-4 rounded-xl bg-soft-cream border border-slate-100 mb-8 text-sm text-slate-700 font-medium">
            <p className={ml ? 'font-malayalam-body' : ''}>
              {ml ? item.summaryMl : item.summary}
            </p>
          </div>

          <div className="prose max-w-none text-slate-700 space-y-4 text-base leading-relaxed">
            <p className={ml ? 'font-malayalam-body' : ''}>
              {ml
                ? 'കണ്ണൂർ ജില്ലയിലെ വിവിധ ഏരിയകളിൽ കുട്ടികളുടെ വലിയ പങ്കാളിത്തത്തോടെയാണ് പരിപാടികൾ സംഘടിപ്പിച്ചത്. കുട്ടികളിൽ സാമൂഹിക പ്രതിബദ്ധതയും സഹകരണവും വളർത്തുന്നതിൽ ഇത്തരം കൂട്ടായ്മകൾ നിർണായക പങ്കുവഹിക്കുന്നു.'
                : 'The event saw vibrant participation of child delegates and local organizers across Kannur district, demonstrating deep civic engagement and dedication to democratic values.'}
            </p>
            <p className={ml ? 'font-malayalam-body' : ''}>
              {ml
                ? 'വരും മാസങ്ങളിൽ കൂടുതൽ യൂണിറ്റുകളിലേക്ക് പ്രവർത്തനങ്ങൾ വ്യാപിപ്പിക്കാനും ബാലവേദി ശക്തിപ്പെടുത്താനും തീരുമാനിച്ചു.'
                : 'The committee resolved to expand grassroots neighborhood initiatives across all local units in the coming months.'}
            </p>
          </div>

          <div className="mt-12 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verified Report • {item.source}</span>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};
