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

      {/* Editorial News Publication Section */}
      <section className="py-16 sm:py-24 bg-[#F4EBDD] border-b border-[#241914]/15 bg-paper-grain">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 mb-10 border-b border-[#241914]/15 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs bg-[#C90000] text-white text-[10px] font-mono uppercase font-bold tracking-wider">
                  <Newspaper className="w-3 h-3 text-white" />
                  PUBLIC DISPATCH
                </span>
                <span className="text-[11px] font-mono text-[#241914]/60 uppercase tracking-widest hidden sm:inline">
                  // VERIFIED DISTRICT BULLETINS
                </span>
              </div>
              <h2 className={`text-3xl sm:text-4xl font-black text-[#171514] tracking-tight uppercase ${ml ? 'font-malayalam normal-case' : ''}`}>
                {ml ? 'ഏറ്റവും പുതിയ വാർത്തകൾ' : 'News & Editorial Dispatches'}
              </h2>
            </div>
            <Link
              to="/news"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#C90000] hover:text-[#A30000] transition-colors"
            >
              <span>{ml ? 'എല്ലാ വാർത്തകളും കാണുക' : 'ALL BULLETINS'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Asymmetric Newspaper / Magazine Spread */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Lead Story: Large Format */}
            {featuredStory && (
              <article className="lg:col-span-7 bg-[#FFF9EF] rounded-xl p-6 sm:p-8 border border-[#241914]/15 shadow-warm flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden aspect-16/10 bg-[#241914] border border-[#241914]/20 shadow-sm">
                    <img
                      src="/images/children-troupe-singing.png"
                      alt={featuredStory.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-xs bg-[#C90000] text-white font-mono text-[10px] font-bold uppercase">
                      LEAD STORY // {featuredStory.category}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono text-[#241914]/60 pt-1">
                    <time dateTime={featuredStory.date}>{featuredStory.date}</time>
                    <span>•</span>
                    <span>SOURCE: {featuredStory.source}</span>
                  </div>

                  <h3 className={`text-2xl sm:text-3xl font-black text-[#171514] tracking-tight leading-tight group-hover:text-[#C90000] transition-colors ${ml ? 'font-malayalam' : ''}`}>
                    <Link to={`/news/${featuredStory.slug}`}>
                      {ml ? featuredStory.titleMl : featuredStory.title}
                    </Link>
                  </h3>

                  <p className={`text-sm sm:text-base text-[#241914]/80 leading-relaxed font-medium ${ml ? 'font-malayalam-body leading-[1.8]' : ''}`}>
                    {ml ? featuredStory.summaryMl : featuredStory.summary}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#241914]/10 flex items-center justify-between">
                  <Link
                    to={`/news/${featuredStory.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#C90000] hover:text-[#A30000]"
                  >
                    <span>{ml ? 'വിശദമായി വായിക്കുക' : 'READ FULL STORY'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-[11px] font-mono text-[#241914]/50">
                    DISPATCH #01
                  </span>
                </div>
              </article>
            )}

            {/* Smaller Stories Stack */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#241914]/60 font-bold block pb-1 border-b border-[#241914]/10">
                DISTRICT ROUNDUP // കൂടുതൽ വിവരങ്ങൾ
              </span>

              {secondaryStories.map((item) => (
                <article
                  key={item.id}
                  className="bg-[#FFF9EF] rounded-xl p-5 sm:p-6 border border-[#241914]/15 shadow-warm hover:border-[#C90000]/40 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-[#241914]/60">
                      <span className="text-[#C90000] font-bold">
                        {item.category.toUpperCase()}
                      </span>
                      <time dateTime={item.date}>{item.date}</time>
                    </div>

                    <h4 className={`text-lg font-black text-[#171514] leading-snug group-hover:text-[#C90000] transition-colors ${ml ? 'font-malayalam' : ''}`}>
                      <Link to={`/news/${item.slug}`}>
                        {ml ? item.titleMl : item.title}
                      </Link>
                    </h4>

                    <p className={`text-xs sm:text-sm text-[#241914]/75 line-clamp-2 leading-relaxed font-medium ${ml ? 'font-malayalam-body leading-[1.7]' : ''}`}>
                      {ml ? item.summaryMl : item.summary}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#241914]/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-[#241914]/50 text-[10px]">SRC: {item.source}</span>
                    <Link
                      to={`/news/${item.slug}`}
                      className="font-bold text-[#C90000] hover:underline flex items-center gap-1"
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
      <section className="py-16 sm:py-24 bg-[#E9DDC9]/70 border-b border-[#241914]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <FindMyPhotos />
        </div>
      </section>

      {/* Editorial Membership & Join Banner */}
      <section className="py-16 sm:py-24 bg-[#241914] text-[#F4EBDD] relative overflow-hidden border-b border-[#241914]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs bg-[#C90000] text-white text-xs font-mono uppercase font-bold tracking-wider">
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

              <p className={`text-base sm:text-lg text-[#F4EBDD]/85 leading-relaxed font-medium ${ml ? 'font-malayalam-body leading-[1.8]' : ''}`}>
                {ml
                  ? 'നിങ്ങളുടെ തൊട്ടടുത്ത വാർഡ്, വില്ലേജ്, സ്കൂൾ യൂണിറ്റുകളുമായി ബന്ധപ്പെട്ട് കുട്ടികളുടെ ഏറ്റവും വലിയ പുരോഗമന പ്രസ്ഥാനത്തിൽ ഭാഗമാകാം. ജനാധിപത്യ ബോധവും സാംസ്കാരിക കൂട്ടായ്മയും ഒന്നിച്ചു പടുത്തുയർത്താം.'
                  : 'Connect with your neighborhood unit, village ward, or school cluster across Kannur to join the world’s largest democratic children’s cultural movement.'}
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  to="/join"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-[#C90000] hover:bg-[#A30000] text-white font-mono text-xs uppercase font-bold tracking-wider transition-colors shadow-warm active:scale-[0.98]"
                >
                  <span className={ml ? 'font-malayalam normal-case' : ''}>
                    {ml ? 'എങ്ങനെ ചേരാം (HOW TO JOIN)' : 'HOW TO JOIN'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-[#171514] text-[#F4EBDD] hover:bg-[#171514]/80 border border-[#F4EBDD]/20 font-mono text-xs uppercase font-bold tracking-wider transition-colors"
                >
                  <span className={ml ? 'font-malayalam normal-case' : ''}>
                    {ml ? 'സമ്പർക്ക വിവരങ്ങൾ' : 'CONNECT WITH US'}
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Authentic Visual Frame */}
            <div className="lg:col-span-5">
              <div className="relative rounded-xl overflow-hidden border border-[#F4EBDD]/20 shadow-warm-lg bg-[#171514] aspect-4/3 sm:aspect-16/10">
                <img
                  src="/images/children-dancing.jpeg"
                  alt="Joyful children of Balasangham joining hands in creative dance"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171514]/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#B99658] block mb-0.5">
                    GRASSROOTS SOLIDARITY // കണ്ണൂർ
                  </span>
                  <p className={`text-xs font-bold ${ml ? 'font-malayalam' : ''}`}>
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
