import { useLanguage } from '../context/LanguageContext';
import { HeroSection } from '../components/home/HeroSection';
import { AboutSection } from '../components/sections/AboutSection';
import { WhatWeDoSection } from '../components/sections/WhatWeDoSection';
import { EventsSection } from '../components/sections/EventsSection';
import { HistorySection } from '../components/sections/HistorySection';
import { FindMyPhotos } from '../components/common/FindMyPhotos';
import { verifiedNews } from '../data/organizationData';
import { ArrowRight, UserPlus, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HomePageProps {
  onOpenAnthem: () => void;
}

export const HomePage = ({ onOpenAnthem }: HomePageProps) => {
  const { language } = useLanguage();
  const ml = language === 'ml';

  const featuredStory = verifiedNews[0];
  const secondaryStories = verifiedNews.slice(1, 4);

  return (
    <>
      <HeroSection onOpenAnthem={onOpenAnthem} />
      <AboutSection />
      <WhatWeDoSection />
      <EventsSection />
      <HistorySection />

      {/* Editorial News Publication Section with Festive Styling */}
      <section className="py-16 sm:py-24 bg-cream border-b border-festival/20 bg-paper-grain">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 mb-10 border-b border-ink/10 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-berry text-white text-xs font-mono uppercase font-bold tracking-wider shadow-xs">
                  <Newspaper className="w-3.5 h-3.5 text-white" />
                  PUBLIC DISPATCH
                </span>
                <span className="text-[11px] font-mono text-ink/60 uppercase tracking-widest hidden sm:inline">
                  // VERIFIED DISTRICT BULLETINS
                </span>
              </div>
              <h2 className={`text-3xl sm:text-4xl font-black text-ink tracking-tight uppercase ${ml ? 'font-malayalam normal-case' : ''}`}>
                {ml ? 'ഏറ്റവും പുതിയ വാർത്തകൾ' : 'News & Editorial Dispatches'}
              </h2>
            </div>
            <Link
              to="/news"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 border border-festival/40 text-xs font-mono font-bold uppercase tracking-wider text-berry hover:text-berry-dark hover:border-berry transition-all hover:scale-105 active:scale-95 shadow-xs"
            >
              <span>{ml ? 'എല്ലാ വാർത്തകളും കാണുക' : 'ALL BULLETINS'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Asymmetric Newspaper / Magazine Spread */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Lead Story: Large Format */}
            {featuredStory && (
              <article className="lg:col-span-7 bg-white/95 rounded-3xl p-6 sm:p-8 border-2 border-festival/30 shadow-warm-lg flex flex-col justify-between group hover:border-berry/40 hover:-translate-y-1 transition-all duration-300">
                <div className="space-y-4">
                  <div className="relative rounded-2xl overflow-hidden aspect-16/10 bg-ink border border-festival/20 shadow-sm">
                    <img
                      src="/images/children-troupe-singing.png"
                      alt={featuredStory.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-berry text-white font-mono text-xs font-bold uppercase shadow-sm">
                      LEAD STORY // {featuredStory.category}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono text-ink/60 pt-1">
                    <time dateTime={featuredStory.date}>{featuredStory.date}</time>
                    <span>•</span>
                    <span>SOURCE: {featuredStory.source}</span>
                  </div>

                  <h3 className={`text-2xl sm:text-3xl font-black text-ink tracking-tight leading-tight group-hover:text-berry transition-colors ${ml ? 'font-malayalam' : ''}`}>
                    <Link to={`/news/${featuredStory.slug}`}>
                      {ml ? featuredStory.titleMl : featuredStory.title}
                    </Link>
                  </h3>

                  <p className={`text-sm sm:text-base text-ink/80 leading-relaxed font-medium ${ml ? 'font-malayalam-body leading-[1.8]' : ''}`}>
                    {ml ? featuredStory.summaryMl : featuredStory.summary}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-ink/10 flex items-center justify-between">
                  <Link
                    to={`/news/${featuredStory.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cream-deep text-xs font-mono font-bold uppercase tracking-wider text-berry hover:text-berry-dark hover:bg-festival/20 transition-all border border-ink/5"
                  >
                    <span>{ml ? 'വിശദമായി വായിക്കുക' : 'READ FULL STORY'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-[11px] font-mono text-ink/50">
                    DISPATCH #01
                  </span>
                </div>
              </article>
            )}

            {/* Smaller Stories Stack */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-ink/60 font-bold block pb-1 border-b border-ink/10">
                DISTRICT ROUNDUP // കൂടുതൽ വിവരങ്ങൾ
              </span>

              {secondaryStories.map((item) => (
                <article
                  key={item.id}
                  className="bg-white/95 rounded-3xl p-5 sm:p-6 border-2 border-festival/30 shadow-warm hover:shadow-warm-lg hover:border-berry/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-ink/60">
                      <span className="text-xs font-mono uppercase tracking-wider text-berry font-bold px-2.5 py-0.5 rounded-full bg-berry/10">
                        {item.category.toUpperCase()}
                      </span>
                      <time dateTime={item.date}>{item.date}</time>
                    </div>

                    <h4 className={`text-lg font-black text-ink leading-snug group-hover:text-berry transition-colors ${ml ? 'font-malayalam' : ''}`}>
                      <Link to={`/news/${item.slug}`}>
                        {ml ? item.titleMl : item.title}
                      </Link>
                    </h4>

                    <p className={`text-xs sm:text-sm text-ink/75 line-clamp-2 leading-relaxed font-medium ${ml ? 'font-malayalam-body leading-[1.7]' : ''}`}>
                      {ml ? item.summaryMl : item.summary}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-ink/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-ink/50 text-[10px]">SRC: {item.source}</span>
                    <Link
                      to={`/news/${item.slug}`}
                      className="font-bold text-berry hover:text-berry-dark flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      <span>{ml ? 'വായിക്കുക' : 'Read'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Find My Photos Feature Showcase */}
      <section className="py-16 sm:py-24 bg-cream-deep/70 border-b border-festival/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <FindMyPhotos />
        </div>
      </section>

      {/* Membership & Join Banner with Warm Festival Gradient */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-ink via-[#382622] to-berry/50 text-cream relative overflow-hidden border-b border-ink">
        {/* Decorative corner glows */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-festival/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-berry/20 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-berry text-white text-xs font-mono uppercase font-bold tracking-wider shadow-festive">
                <UserPlus className="w-3.5 h-3.5" />
                <span className={ml ? 'font-malayalam normal-case' : ''}>
                  {ml ? 'അംഗത്വത്തിൽ പങ്കാളികളാകൂ' : 'BECOME PART OF THE MOVEMENT'}
                </span>
              </div>

              <h2
                className={`text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-[1.08] ${
                  ml ? 'font-malayalam normal-case text-3xl sm:text-4xl' : ''
                }`}
              >
                {ml
                  ? '5 മുതൽ 16 വയസ്സുവരെയുള്ള എല്ലാ കുട്ടികൾക്കും ബാലസംഘത്തിൽ സ്വാഗതം'
                  : 'All Children Aged 5–16 Are Welcome in Balasangham'}
              </h2>

              <p className={`text-base sm:text-lg text-cream/85 leading-relaxed font-medium ${ml ? 'font-malayalam-body leading-[1.8]' : ''}`}>
                {ml
                  ? 'നിങ്ങളുടെ തൊട്ടടുത്ത വാർഡ്, വില്ലേജ്, സ്കൂൾ യൂണിറ്റുകളുമായി ബന്ധപ്പെട്ട് കുട്ടികളുടെ ഏറ്റവും വലിയ പുരോഗമന പ്രസ്ഥാനത്തിൽ ഭാഗമാകാം. ജനാധിപത്യ ബോധവും സാംസ്കാരിക കൂട്ടായ്മയും ഒന്നിച്ചു പടുത്തുയർത്താം.'
                  : 'Connect with your neighborhood unit, village ward, or school cluster across Kannur to join the world’s largest democratic children’s cultural movement.'}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/join"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#D32020] hover:bg-[#B71C1C] text-white font-mono text-xs uppercase font-bold tracking-wider transition-all shadow-festive active:scale-95 min-h-[48px]"
                >
                  <span className={ml ? 'font-malayalam normal-case' : ''}>
                    {ml ? 'എങ്ങനെ ചേരാം (HOW TO JOIN)' : 'HOW TO JOIN'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#F5A623] hover:bg-[#F5A623]/90 text-[#2A1610] font-mono text-xs uppercase font-bold tracking-wider transition-all shadow-sm active:scale-95 min-h-[48px]"
                >
                  <span className={ml ? 'font-malayalam normal-case' : ''}>
                    {ml ? 'സമ്പർക്ക വിവരങ്ങൾ' : 'CONNECT WITH US'}
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Authentic Visual Frame */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border-2 border-festival/40 shadow-warm-lg bg-ink aspect-4/3 sm:aspect-16/10 group">
                <img
                  src="/images/children-dancing.jpeg"
                  alt="Joyful children of Balasangham joining hands in creative dance"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-festival block mb-1">
                    GRASSROOTS SOLIDARITY // കണ്ണൂർ
                  </span>
                  <p className={`text-xs sm:text-sm font-bold ${ml ? 'font-malayalam' : ''}`}>
                    {ml ? 'മതനിരപേക്ഷ സ്നേഹവും സമത്വവും — കുട്ടിക്കൂട്ടായ്മയിൽ' : 'Equal opportunity, friendship, and cultural harmony for every child'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
