import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { verifiedNews } from '../data/organizationData';
import { Calendar, ArrowRight } from 'lucide-react';

export const NewsPage = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All News', labelMl: 'എല്ലാം' },
    { id: 'Campaign', label: 'Campaigns', labelMl: 'പ്രചാരണങ്ങൾ' },
    { id: 'Conference', label: 'Conferences', labelMl: 'സമ്മേളനങ്ങൾ' },
    { id: 'Culture', label: 'Culture & Arts', labelMl: 'കല & സംസ്കാരം' },
  ];

  const filteredNews = selectedCategory === 'all'
    ? verifiedNews
    : verifiedNews.filter((n) => n.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <div className="bg-soft-cream min-h-screen">
      <Breadcrumb items={[{ label: 'News & Updates', labelMl: 'വാർത്തകൾ' }]} />

      <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-deep-red mb-2 block">
            {ml ? 'വാർത്തകളും അറിയിപ്പുകളും' : 'News & Bulletins'}
          </span>
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight mb-4 ${ml ? 'font-malayalam' : ''}`}>
            {ml ? 'സംഘടനാ വാർത്തകൾ' : 'Official News & Updates'}
          </h1>
          <p className={`text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto ${ml ? 'font-malayalam-body' : ''}`}>
            {ml
              ? 'കണ്ണൂർ ജില്ലയിലെയും കേരളത്തിലെയും ബാലസംഘം പ്രവർത്തനങ്ങളുടെ ഔദ്യോഗിക വാർത്തകൾ.'
              : 'Verified reports and announcements of activities, conferences, and campaigns across Kannur district.'}
          </p>
        </div>
      </section>

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-deep-red text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {ml ? cat.labelMl : cat.label}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredNews.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3 font-medium">
                  <span className="px-3 py-1 rounded-full bg-red-50 text-deep-red font-bold">
                    {ml ? item.categoryMl : item.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <time dateTime={item.date}>{item.date}</time>
                  </div>
                </div>

                <h2 className={`font-bold text-xl sm:text-2xl text-charcoal mb-3 ${ml ? 'font-malayalam' : ''}`}>
                  {ml ? item.titleMl : item.title}
                </h2>

                <p className={`text-sm sm:text-base text-slate-600 leading-relaxed mb-6 ${ml ? 'font-malayalam-body' : ''}`}>
                  {ml ? item.summaryMl : item.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">
                  Source: <strong>{item.source}</strong>
                </span>
                <Link
                  to={`/news/${item.slug}`}
                  className="font-bold text-deep-red hover:text-red-700 flex items-center gap-1"
                >
                  <span>{ml ? 'പൂർണ്ണ രൂപം' : 'Read full report'}</span>
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
