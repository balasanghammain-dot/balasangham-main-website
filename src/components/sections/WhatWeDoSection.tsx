import { useLanguage } from '../../context/LanguageContext';
import { RedStarIcon } from '../motifs/RedStarIcon';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

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
    <section id="what-we-do" className="py-16 sm:py-24 bg-cream scroll-mt-16 relative overflow-hidden border-b border-festival/20 bg-paper-grain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-festival/20 border border-festival/40 text-ink text-xs font-bold uppercase tracking-wider shadow-2xs">
              <RedStarIcon size={14} className="text-berry" />
              <span className={ml ? 'font-malayalam' : ''}>{t.whatWeDo.sectionTag}</span>
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-ink/60">
              // CULTURAL ARCHIVE INDEX
            </span>
          </div>

          <h2
            className={`text-3xl sm:text-5xl font-black text-ink tracking-tight uppercase leading-[1.05] mb-4 ${
              ml ? 'font-malayalam normal-case text-3xl sm:text-4xl' : ''
            }`}
          >
            {t.whatWeDo.heading}
          </h2>

          <p
            className={`text-base sm:text-lg text-ink/80 leading-relaxed font-medium ${
              ml ? 'font-malayalam-body leading-[1.8]' : ''
            }`}
          >
            {t.whatWeDo.intro}
          </p>
        </div>

        {/* Cultural Feature Blocks with Warm Festive Cards */}
        <div className="space-y-12 sm:space-y-16">
          {t.whatWeDo.initiatives.map((item, idx) => {
            const isEven = idx % 2 === 1;
            const programMeta = programImages[idx % programImages.length];
            const slug = programSlugs[idx] || 'venalthumbikal';
            const numStr = String(idx + 1).padStart(2, '0');

            return (
              <article
                key={item.id}
                className="bg-white/95 rounded-3xl border-2 border-festival/30 shadow-warm-lg p-6 sm:p-8 lg:p-10 transition-all hover:border-berry/40 hover:-translate-y-1 duration-300 group"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                    isEven ? 'lg:grid-flow-dense' : ''
                  }`}
                >
                  {/* Visual Column */}
                  <div className={`lg:col-span-5 ${isEven ? 'lg:col-start-8' : ''}`}>
                    <div className="relative bg-ink rounded-2xl overflow-hidden border border-festival/20 shadow-md aspect-4/3 sm:aspect-16/10">
                      <img
                        src={programMeta.image}
                        alt={programMeta.alt}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-0 inset-x-0 p-3 text-white">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-festival block">
                          {programMeta.caption}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Text Column */}
                  <div className={`lg:col-span-7 space-y-4 ${isEven ? 'lg:col-start-1' : ''}`}>
                    <div className="flex items-center justify-between border-b border-ink/10 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl sm:text-4xl font-black font-mono text-berry">
                          {numStr}
                        </span>
                        <div>
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-widest text-berry font-bold px-2.5 py-0.5 rounded-full bg-berry/10">
                            <Sparkles className="w-3 h-3 text-festival-deep" />
                            {item.badge}
                          </span>
                          <span className="text-xs font-mono text-ink/50 uppercase tracking-wider block mt-0.5">
                            ANNUAL INITIATIVE
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-ink/60 uppercase tracking-wider hidden sm:inline">
                        VOL. 2026 // {numStr}
                      </span>
                    </div>

                    <h3
                      className={`text-2xl sm:text-3xl font-black text-ink tracking-tight group-hover:text-berry transition-colors ${
                        ml ? 'font-malayalam' : ''
                      }`}
                    >
                      {item.title}
                    </h3>

                    <p
                      className={`text-sm sm:text-base text-ink/80 leading-relaxed font-medium ${
                        ml ? 'font-malayalam-body leading-[1.8]' : ''
                      }`}
                    >
                      {item.summary}
                    </p>

                    {/* Highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                      {item.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs font-medium text-ink/85">
                          <CheckCircle2 className="w-4 h-4 text-berry shrink-0 mt-0.5" />
                          <span className={ml ? 'font-malayalam-body leading-[1.6]' : ''}>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action link */}
                    <div className="pt-4 flex items-center justify-between border-t border-ink/10">
                      <a
                        href={`/programs/${slug}`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream-deep hover:bg-festival/20 text-xs font-mono uppercase font-bold tracking-wider text-berry hover:text-berry-dark transition-all border border-ink/5"
                      >
                        <span>{ml ? 'വിശദ വിവരങ്ങൾ കാണുക' : 'EXPLORE PROGRAM'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                      <span className="text-[11px] font-mono text-ink/50">
                        REF: PRG-{numStr}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
