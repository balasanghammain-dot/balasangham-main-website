import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { RedStarIcon } from '../motifs/RedStarIcon';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, BookOpen, Music, Atom, Users } from 'lucide-react';

const programAccents = [
  {
    color: '#D71920',
    bg: 'bg-[#D71920]/10',
    border: 'border-[#D71920]/30',
    text: 'text-[#D71920]',
    badge: 'bg-[#D71920] text-white',
    icon: Music,
  },
  {
    color: '#7B2CBF',
    bg: 'bg-[#7B2CBF]/10',
    border: 'border-[#7B2CBF]/30',
    text: 'text-[#7B2CBF]',
    badge: 'bg-[#7B2CBF] text-white',
    icon: Sparkles,
  },
  {
    color: '#168BD4',
    bg: 'bg-[#168BD4]/10',
    border: 'border-[#168BD4]/30',
    text: 'text-[#168BD4]',
    badge: 'bg-[#168BD4] text-white',
    icon: BookOpen,
  },
  {
    color: '#2E9E5B',
    bg: 'bg-[#2E9E5B]/10',
    border: 'border-[#2E9E5B]/30',
    text: 'text-[#2E9E5B]',
    badge: 'bg-[#2E9E5B] text-white',
    icon: Atom,
  },
  {
    color: '#FF9F00',
    bg: 'bg-[#FF9F00]/15',
    border: 'border-[#FF9F00]/40',
    text: 'text-[#F57C00]',
    badge: 'bg-[#F57C00] text-white',
    icon: Users,
  },
  {
    color: '#D71920',
    bg: 'bg-[#D71920]/10',
    border: 'border-[#D71920]/30',
    text: 'text-[#D71920]',
    badge: 'bg-[#D71920] text-white',
    icon: ShieldCheck,
  },
];

const programImages = [
  {
    image: '/images/venalthumbikal-children.jpeg',
    alt: 'Venalthumbikal cultural troupe performing on stage in traditional attire',
    caption: 'DOCUMENTARY ARCHIVE // CULTURAL THEATER',
  },
  {
    image: '/images/children-troupe-singing.png',
    alt: 'Children singing and performing together in creative arts workshop',
    caption: 'WORKSHOP ARCHIVE // CREATIVE SESSIONS',
  },
  {
    image: '/images/balasangham-festival-theme.jpeg',
    alt: 'Kilikkoodu literary and artistic publication celebration',
    caption: 'CHILDREN\'S JOURNAL // LITERARY ARCHIVE',
  },
  {
    image: '/images/children-dancing.jpeg',
    alt: 'Children engaged in interactive scientific observation and discovery',
    caption: 'SCIENCE FOR CHILDREN // SCIENTIFIC INQUIRY',
  },
  {
    image: '/images/happy-children-yellow-bg.png',
    alt: 'Kutti Koottams local unit children gathered together in democratic unity',
    caption: 'COMMUNITY GATHERING // DEMOCRATIC ASSEMBLY',
  },
  {
    image: '/images/children-dancing.jpeg',
    alt: 'Children rights and social vigilance campaign against substance abuse',
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
    <section id="what-we-do" className="py-16 sm:py-24 bg-white scroll-mt-16 relative overflow-hidden border-b border-[#F57C00]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 mb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFC928]/30 border border-[#FF9F00]/40 text-[#321A12] text-xs font-bold uppercase tracking-wider shadow-2xs">
              <RedStarIcon size={14} className="text-[#D71920]" />
              <span className={ml ? 'font-malayalam' : ''}>{t.whatWeDo.sectionTag}</span>
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#321A12]/60">
              // SIGNATURE INITIATIVES
            </span>
          </div>

          <h2
            className={`text-3xl sm:text-5xl font-black text-[#321A12] tracking-tight uppercase leading-[1.05] mb-4 ${
              ml ? 'font-malayalam normal-case text-3xl sm:text-4xl' : ''
            }`}
          >
            {t.whatWeDo.heading}
          </h2>

          <p
            className={`text-base sm:text-lg text-[#321A12]/80 leading-relaxed font-medium ${
              ml ? 'font-malayalam-body leading-[1.8]' : ''
            }`}
          >
            {t.whatWeDo.intro}
          </p>
        </div>

        {/* Alternating Editorial Program Blocks */}
        <div className="space-y-10 sm:space-y-14">
          {t.whatWeDo.initiatives.map((item, idx) => {
            const isEven = idx % 2 === 1;
            const programMeta = programImages[idx % programImages.length];
            const accent = programAccents[idx % programAccents.length];
            const slug = programSlugs[idx] || 'venalthumbikal';
            const numStr = String(idx + 1).padStart(2, '0');

            return (
              <article
                key={item.id}
                className="bg-[#FFF9E8]/80 rounded-3xl border-2 border-[#FFC928]/40 shadow-warm-lg p-6 sm:p-8 lg:p-10 transition-all hover:border-[#D71920]/40 hover:-translate-y-1 duration-300 group"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                    isEven ? 'lg:grid-flow-dense' : ''
                  }`}
                >
                  {/* Visual Column */}
                  <div className={`lg:col-span-5 ${isEven ? 'lg:col-start-8' : ''}`}>
                    <div className="relative bg-[#321A12] rounded-2xl overflow-hidden border border-[#FFC928]/30 shadow-md aspect-4/3 sm:aspect-16/10">
                      <img
                        src={programMeta.image}
                        alt={programMeta.alt}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#321A12]/85 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-0 inset-x-0 p-3 text-white">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFD84D] block">
                          {programMeta.caption}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Text Column */}
                  <div className={`lg:col-span-7 space-y-4 ${isEven ? 'lg:col-start-1' : ''}`}>
                    <div className="flex items-center justify-between border-b border-[#321A12]/10 pb-3">
                      <div className="flex items-center gap-3">
                        <span
                          className="text-3xl sm:text-4xl font-black font-mono"
                          style={{ color: accent.color }}
                        >
                          {numStr}
                        </span>
                        <div>
                          <span
                            className={`inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-widest font-bold px-2.5 py-0.5 rounded-full ${accent.badge}`}
                          >
                            <Sparkles className="w-3 h-3" />
                            {item.badge}
                          </span>
                          <span className="text-xs font-mono text-[#321A12]/50 uppercase tracking-wider block mt-0.5">
                            ANNUAL INITIATIVE
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-[#321A12]/60 uppercase tracking-wider hidden sm:inline">
                        VOL. 2026 // {numStr}
                      </span>
                    </div>

                    <h3
                      className={`text-2xl sm:text-3xl font-black text-[#321A12] tracking-tight transition-colors ${
                        ml ? 'font-malayalam' : ''
                      }`}
                    >
                      {item.title}
                    </h3>

                    <p
                      className={`text-sm sm:text-base text-[#321A12]/80 leading-relaxed font-medium ${
                        ml ? 'font-malayalam-body leading-[1.8]' : ''
                      }`}
                    >
                      {item.summary}
                    </p>

                    {/* Highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                      {item.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs font-medium text-[#321A12]/85">
                          <CheckCircle2
                            className="w-4 h-4 shrink-0 mt-0.5"
                            style={{ color: accent.color }}
                          />
                          <span className={ml ? 'font-malayalam-body leading-[1.7]' : ''}>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action link */}
                    <div className="pt-4 flex items-center justify-between border-t border-[#321A12]/10">
                      <Link
                        to={`/programs/${slug}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-xs font-mono uppercase font-bold tracking-wider hover:bg-[#FFF4D6] transition-all border border-[#321A12]/10 min-h-[48px] active:scale-95 shadow-2xs"
                        style={{ color: accent.color }}
                      >
                        <span>{ml ? 'വിശദ വിവരങ്ങൾ കാണുക' : 'EXPLORE'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <span className="text-[11px] font-mono text-[#321A12]/50">
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
