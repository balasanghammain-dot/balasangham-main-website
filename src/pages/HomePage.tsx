import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { HeroSection } from '../components/home/HeroSection';
import { AboutSection } from '../components/sections/AboutSection';
import { WhatWeDoSection } from '../components/sections/WhatWeDoSection';
import { EventsSection } from '../components/sections/EventsSection';
import { HistorySection } from '../components/sections/HistorySection';
import { verifiedNews } from '../data/organizationData';
import { ArrowRight, UserPlus } from 'lucide-react';

interface HomePageProps {
  onOpenAnthem: () => void;
}

export const HomePage = ({ onOpenAnthem }: HomePageProps) => {
  const { language } = useLanguage();
  const ml = language === 'ml';

  return (
    <>
      <HeroSection onOpenAnthem={onOpenAnthem} />
      <AboutSection />
      <WhatWeDoSection />
      <EventsSection />
      <HistorySection />

      {/* Latest News Preview Section */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-red mb-1 block">
                {ml ? 'വാർത്തകൾ' : 'Latest Updates'}
              </span>
              <h2 className={`text-2xl sm:text-3xl font-extrabold text-charcoal ${ml ? 'font-malayalam' : ''}`}>
                {ml ? 'ഏറ്റവും പുതിയ വാർത്തകൾ' : 'News & Announcements'}
              </h2>
            </div>
            <Link
              to="/news"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-red hover:text-red-700 transition-colors"
            >
              <span>{ml ? 'എല്ലാ വാർത്തകളും' : 'View all news'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {verifiedNews.slice(0, 3).map((item) => (
              <article
                key={item.id}
                className="bg-surface-cream rounded-xl p-6 border border-slate-200/80 hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3 font-medium">
                    <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-brand-red font-semibold">
                      {ml ? item.categoryMl : item.category}
                    </span>
                    <time dateTime={item.date}>{item.date}</time>
                  </div>
                  <h3 className={`font-bold text-lg text-charcoal mb-2.5 line-clamp-2 ${ml ? 'font-malayalam' : ''}`}>
                    {ml ? item.titleMl : item.title}
                  </h3>
                  <p className={`text-sm text-slate-600 line-clamp-3 mb-4 ${ml ? 'font-malayalam-body' : ''}`}>
                    {ml ? item.summaryMl : item.summary}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                  <span>Source: {item.source}</span>
                  <Link
                    to={`/news/${item.slug}`}
                    className="font-bold text-brand-red hover:underline flex items-center gap-1"
                  >
                    {ml ? 'കൂടുതൽ വായിക്കുക' : 'Read more'} &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA Ribbon */}
      <section className="py-14 bg-gradient-to-r from-brand-red to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:flex sm:items-center sm:justify-between sm:text-left">
          <div className="mb-6 sm:mb-0 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-xs uppercase font-extrabold tracking-widest text-amber-300 mb-2">
              <UserPlus className="w-4 h-4" />
              <span>{ml ? 'അംഗത്വ വിവരങ്ങൾ' : 'Membership Participation'}</span>
            </span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold leading-tight mb-2 ${ml ? 'font-malayalam' : ''}`}>
              {ml
                ? '5 മുതൽ 16 വയസ്സുവരെയുള്ള കുട്ടികൾക്ക് ബാലസംഘത്തിൽ പങ്കാളികളാകാം'
                : 'Children aged 5–16 can participate through local neighborhood units.'}
            </h2>
            <p className="text-white/80 text-sm sm:text-base">
              {ml
                ? 'അടുത്തുള്ള ഏരിയ, വില്ലേജ്, വാർഡ് കമ്മിറ്റികളുമായി ബന്ധപ്പെടുക.'
                : 'Connect with your local area and neighborhood unit committees across Kannur.'}
            </p>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/join"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-brand-red font-bold text-sm shadow hover:bg-slate-50 transition-colors"
            >
              {ml ? 'എങ്ങനെ ചേരാം' : 'How to Join'}
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-red-900/40 border border-white/30 text-white font-bold text-sm hover:bg-red-900/60 transition-colors"
            >
              {ml ? 'ബന്ധപ്പെടുക' : 'Contact Us'}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
