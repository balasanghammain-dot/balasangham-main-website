import { useLanguage } from '../../context/LanguageContext';
import { RedStarIcon } from '../motifs/RedStarIcon';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const programImages = [
  {
    image: '/images/venalthumbikal-children.jpeg',
    alt: 'Venalthumbikal cultural troupe performing on stage in traditional attire',
    caption: 'DOCUMENTARY ARCHIVE // CULTURAL THEATER',
  },
  {
    image: '/images/children-troupe-singing.png',
    alt: 'Children singing and performing together in group workshop',
    caption: 'WORKSHOP ARCHIVE // CREATIVE SESSIONS',
  },
  {
    image: '/images/conference-2026/poster-creative.jpg',
    alt: 'Kilikkoodu literary and artistic publication',
    caption: 'CHILDREN\'S JOURNAL // LITERARY ARCHIVE',
  },
  {
    image: '/images/children-dancing.jpeg',
    alt: 'Children engaged in interactive scientific observation',
    caption: 'SCIENCE FOR CHILDREN // SCIENTIFIC INQUIRY',
  },
  {
    image: '/images/conference-poster-2026.jpg',
    alt: 'Kutti Koottams local unit children gathered together',
    caption: 'COMMUNITY GATHERING // DEMOCRATIC ASSEMBLY',
  },
  {
    image: '/images/conference-2026/poster-secondary.jpg',
    alt: 'Anti-drug vigilance and child rights campaign by children',
    caption: 'SOCIAL VIGILANCE // CHILD PROTECTION',
  },
];

const programSlugs = [
  'venalthumbikal',
  'venal-kalari',
  'kilikkoodu',
  'shasthra-deepthi',
  'kutti-koottams',
  'anti-drug-campaigns',
];

export const WhatWeDoSection = () => {
  const { t, language } = useLanguage();
  const ml = language === 'ml';

  return (
    <section id="what-we-do" className="py-16 sm:py-24 bg-[#F4EBDD] scroll-mt-16 relative overflow-hidden border-b border-[#241914]/15 bg-paper-grain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#E9DDC9] border border-[#241914]/15 text-[#241914] text-xs font-bold uppercase tracking-wider shadow-2xs">
              <RedStarIcon size={14} className="text-[#C90000]" />
              <span className={ml ? 'font-malayalam' : ''}>{t.whatWeDo.sectionTag}</span>
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#241914]/60">
              // CULTURAL MAGAZINE INDEX
            </span>
          </div>

          <h2
            className={`text-3xl sm:text-5xl font-black text-[#171514] tracking-tight uppercase leading-[1.05] mb-4 ${
              ml ? 'font-malayalam normal-case text-3xl sm:text-4xl' : ''
            }`}
          >
            {t.whatWeDo.heading}
          </h2>

          <p
            className={`text-base sm:text-lg text-[#241914]/80 leading-relaxed font-medium ${
              ml ? 'font-malayalam-body leading-[1.8]' : ''
            }`}
          >
            {t.whatWeDo.intro}
          </p>
        </div>

        {/* Alternating Cultural Magazine Feature Blocks */}
        <div className="space-y-12 sm:space-y-16">
          {t.whatWeDo.initiatives.map((item, idx) => {
            const isEven = idx % 2 === 1;
            const programMeta = programImages[idx % programImages.length];
            const slug = programSlugs[idx] || 'venalthumbikal';
            const numStr = String(idx + 1).padStart(2, '0');

            return (
              <article
                key={item.id}
                className="bg-[#FFF9EF] rounded-xl border border-[#241914]/15 shadow-warm p-6 sm:p-8 lg:p-10 transition-all hover:border-[#C90000]/40 group"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                    isEven ? 'lg:grid-flow-dense' : ''
                  }`}
                >
                  {/* Visual Column */}
                  <div className={`lg:col-span-5 ${isEven ? 'lg:col-start-8' : ''}`}>
                    <div className="relative bg-[#241914] rounded-lg overflow-hidden border border-[#241914]/20 shadow-md aspect-4/3 sm:aspect-16/10">
                      <img
                        src={programMeta.image}
                        alt={programMeta.alt}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#171514]/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-0 inset-x-0 p-3 text-white">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#E9DDC9] block">
                          {programMeta.caption}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Editorial Text Column */}
                  <div className={`lg:col-span-7 space-y-4 ${isEven ? 'lg:col-start-1' : ''}`}>
                    <div className="flex items-center justify-between border-b border-[#241914]/10 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl sm:text-4xl font-black font-mono text-[#C90000]">
                          {numStr}
                        </span>
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#C90000] font-bold block">
                            PROGRAM // {item.badge}
                          </span>
                          <span className="text-xs font-mono text-[#241914]/50 uppercase tracking-wider">
                            ANNUAL INITIATIVE
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-[#241914]/60 uppercase tracking-wider hidden sm:inline">
                        VOL. 2026 // {numStr}
                      </span>
                    </div>

                    <h3
                      className={`text-2xl sm:text-3xl font-black text-[#171514] tracking-tight group-hover:text-[#C90000] transition-colors ${
                        ml ? 'font-malayalam' : ''
                      }`}
                    >
                      {item.title}
                    </h3>

                    <p
                      className={`text-sm sm:text-base text-[#241914]/80 leading-relaxed font-medium ${
                        ml ? 'font-malayalam-body leading-[1.8]' : ''
                      }`}
                    >
                      {item.summary}
                    </p>

                    {/* Highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                      {item.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs font-medium text-[#241914]/85">
                          <CheckCircle2 className="w-4 h-4 text-[#C90000] shrink-0 mt-0.5" />
                          <span className={ml ? 'font-malayalam-body leading-[1.6]' : ''}>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action link */}
                    <div className="pt-4 flex items-center justify-between border-t border-[#241914]/10">
                      <a
                        href={`/programs/${slug}`}
                        className="inline-flex items-center gap-2 text-xs font-mono uppercase font-bold tracking-wider text-[#C90000] hover:text-[#A30000] transition-colors"
                      >
                        <span>{ml ? 'വിശദ വിവരങ്ങൾ കാണുക' : 'EXPLORE PROGRAM'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                      <span className="text-[11px] font-mono text-[#241914]/50">
                        REF: PRG-{numStr}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Editorial Index Footer Note */}
        <div className="mt-14 p-6 sm:p-8 rounded-xl bg-[#E9DDC9] border border-[#241914]/20 shadow-warm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#C90000] font-bold block">
              STATEWIDE GRASSROOTS SCOPE // 20,000+ UNITS
            </span>
            <h4 className={`text-lg font-black text-[#171514] ${ml ? 'font-malayalam' : ''}`}>
              {ml ? 'കുട്ടികൾ പഠിക്കുന്നു, ചിന്തിക്കുന്നു, പോരാടുന്നു' : 'Every Child A Citizen, Creator, and Leader'}
            </h4>
            <p className={`text-xs text-[#241914]/75 max-w-xl ${ml ? 'font-malayalam-body' : ''}`}>
              {ml
                ? 'സംസ്ഥാനത്തുടനീളം ഇരുപതിനായിരത്തിലേറെ യൂണിറ്റുകളിലൂടെ കുട്ടികളുടെ സർഗ്ഗപ്രവർത്തനങ്ങൾ നിത്യേന നടക്കുന്നു.'
                : 'Active weekly gatherings across 20,000 neighborhood units fostering progressive childhood camaraderie.'}
            </p>
          </div>

          <a
            href="/programs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#C90000] text-white text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#A30000] transition-colors shadow-xs shrink-0"
          >
            <span>{ml ? 'എല്ലാ പരിപാടികളും കാണുക' : 'VIEW ALL PROGRAMS'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
