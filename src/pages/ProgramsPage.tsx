import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { verifiedPrograms } from '../data/organizationData';
import { Calendar, Globe, ArrowRight } from 'lucide-react';

export const ProgramsPage = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Programs', labelMl: 'എല്ലാ പരിപാടികളും' },
    { id: 'cultural', label: 'Cultural & Arts', labelMl: 'കല & സംസ്കാരം' },
    { id: 'educational', label: 'Educational & Science', labelMl: 'വിദ്യാഭ്യാസം & ശാസ്ത്രം' },
    { id: 'literary', label: 'Literary & Reading', labelMl: 'സാഹിത്യം & വായന' },
    { id: 'social', label: 'Social & Protection', labelMl: 'സാമൂഹികം & ജാഗ്രത' },
  ];

  const filteredPrograms = selectedCategory === 'all'
    ? verifiedPrograms
    : verifiedPrograms.filter((p) => p.category === selectedCategory);

  return (
    <div className="bg-surface-cream min-h-screen">
      <Breadcrumb items={[{ label: 'Programs', labelMl: 'പരിപാടികൾ' }]} />

      <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-red mb-2 block">
            {ml ? 'പ്രവർത്തനങ്ങൾ' : 'Activities & Initiatives'}
          </span>
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight mb-4 ${ml ? 'font-malayalam' : ''}`}>
            {ml ? 'പ്രധാന പരിപാടികൾ' : 'Our Flagship Programs'}
          </h1>
          <p className={`text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto ${ml ? 'font-malayalam-body' : ''}`}>
            {ml
              ? 'കുട്ടികളുടെ കലാ, സാഹിത്യ, ശാസ്ത്ര, സാമൂഹിക ഉന്നമനത്തിനായി വർഷം മുഴുവൻ നടക്കുന്ന പ്രവർത്തനങ്ങൾ.'
              : 'Year-round programs fostering children\'s artistic expression, scientific curiosity, social awareness, and democratic community life.'}
          </p>
        </div>
      </section>

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-brand-red text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {ml ? cat.labelMl : cat.label}
            </button>
          ))}
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((prog) => (
            <article
              key={prog.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-red/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-brand-red text-xs font-bold uppercase tracking-wider">
                    {prog.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    <span>{ml ? prog.scopeMl : prog.scope}</span>
                  </span>
                </div>

                <h2 className={`text-xl font-bold text-charcoal mb-1 ${ml ? 'font-malayalam' : ''}`}>
                  {ml ? prog.titleMl : prog.title}
                </h2>
                <p className="text-xs text-slate-400 mb-3 font-medium">
                  {ml ? prog.title : prog.titleMl}
                </p>

                <p className={`text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3 ${ml ? 'font-malayalam-body' : ''}`}>
                  {ml ? prog.descriptionMl : prog.description}
                </p>

                <div className="p-3 bg-surface-cream rounded-xl mb-4 text-xs text-slate-600 space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold text-charcoal">
                    <Calendar className="w-3.5 h-3.5 text-brand-red shrink-0" />
                    <span>{ml ? prog.scheduleMl : prog.schedule}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <Link
                  to={`/programs/${prog.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-bold text-brand-red hover:text-red-700 transition-colors"
                >
                  <span>{ml ? 'വിശദ വിവരങ്ങൾ' : 'Explore program details'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
