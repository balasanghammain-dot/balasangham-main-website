import { ComponentType } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { GovernanceDiagram } from './GovernanceDiagram';
import { RedStarIcon } from '../motifs/RedStarIcon';
import { Vote, HeartHandshake, Compass, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Vote,
  HeartHandshake,
  Compass,
  ShieldCheck,
};

const pillarAccents = [
  { border: 'border-berry/30', bg: 'bg-berry/10', text: 'text-berry' },
  { border: 'border-festival/40', bg: 'bg-festival/20', text: 'text-festival-deep' },
  { border: 'border-sky/30', bg: 'bg-sky/15', text: 'text-sky' },
  { border: 'border-mango/30', bg: 'bg-mango/15', text: 'text-mango' },
];

export const AboutSection = () => {
  const { t, language } = useLanguage();
  const ml = language === 'ml';

  return (
    <section id="about" className="py-16 sm:py-24 bg-[#FFF9E8] scroll-mt-16 relative overflow-hidden border-b border-[#F57C00]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Eyebrow Tag */}
        <div className="flex items-center gap-2 mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFC928]/30 border border-[#FF9F00]/40 text-[#321A12] text-xs font-bold uppercase tracking-wider shadow-2xs">
            <RedStarIcon size={14} className="text-[#D71920]" />
            <span className={ml ? 'font-malayalam' : ''}>{t.about.sectionTag}</span>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#321A12]/60">
            // DOCUMENTARY ARCHIVE
          </span>
        </div>

        {/* Section Heading & Large Editorial Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10">
          <div className="lg:col-span-8 space-y-4">
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-black text-[#321A12] tracking-tight uppercase ${
                ml ? 'font-malayalam normal-case text-3xl sm:text-4xl' : ''
              }`}
            >
              {t.about.heading}
            </h2>
            <p className={`text-2xl sm:text-3xl font-extrabold text-[#D71920] leading-snug tracking-tight ${ml ? 'font-malayalam leading-[1.4]' : ''}`}>
              {ml
                ? '“അറിവിലൂടെയും സംസ്കാരത്തിലൂടെയും കൂട്ടായ പ്രവർത്തനത്തിലൂടെയും തലമുറകളെ വാർത്തെടുക്കുന്നു.”'
                : '“Building generations through knowledge, culture, and collective action.”'}
            </p>
            <p className={`text-base sm:text-lg text-[#321A12]/80 leading-relaxed font-medium max-w-3xl ${ml ? 'font-malayalam-body leading-[1.8]' : ''}`}>
              {t.about.intro}
            </p>
            <div className="pt-2">
              <Link
                to="/about/history"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D71920] text-white text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#B31219] transition-all shadow-xs min-h-[48px]"
              >
                <span>{ml ? 'ഞങ്ങളുടെ ചരിത്രം അറിയുക' : 'READ OUR STORY'}</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Large Documentary Photograph with Alongside Content */}
        <div className="bg-white/95 rounded-3xl p-6 sm:p-8 border-2 border-[#FFC928]/40 shadow-warm-lg mb-14 overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Documentary Photograph */}
            <div className="lg:col-span-6 relative">
              <div className="relative overflow-hidden rounded-2xl border border-[#FFC928]/30 shadow-md bg-[#321A12] group">
                <img
                  src="/images/venalthumbikal-children.jpeg"
                  alt="Balasangham children cultural troupe performing on stage in traditional attire"
                  className="w-full h-72 sm:h-96 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#321A12]/90 via-[#321A12]/40 to-transparent p-5 text-white">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#FFD84D] block mb-1">
                    DOCUMENTARY ARCHIVE // വേനൽത്തുമ്പികൾ
                  </span>
                  <p className={`text-xs sm:text-sm font-bold ${ml ? 'font-malayalam' : ''}`}>
                    {ml ? 'കുട്ടികൾ പഠിക്കുന്നു, കളിക്കുന്നു, വളരുന്നു: വേദിയിലെ കുട്ടിക്കൂട്ടായ്മ' : 'Children learning, playing, and creating together in solidarity'}
                  </p>
                </div>
              </div>
            </div>

            {/* Alongside Organization Highlights & Big Numbers */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D71920]/10 text-[#D71920] text-xs font-mono uppercase tracking-wider font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-[#F57C00]" />
                  HISTORIC SCALE & REACH // 1938–2026
                </div>
                <h3 className={`text-2xl sm:text-3xl font-black text-[#321A12] tracking-tight ${ml ? 'font-malayalam' : ''}`}>
                  {ml ? '88 വർഷത്തെ പാരമ്പര്യം' : '88 Years of Continuous History'}
                </h3>
                <p className={`text-sm text-[#321A12]/80 leading-relaxed font-medium ${ml ? 'font-malayalam-body leading-[1.75]' : ''}`}>
                  {ml
                    ? '1938-ൽ കല്ല്യാശ്ശേരിയിലെ വിപ്ലവ മണ്ണിൽ കൃഷ്ണപിള്ളയും എ.കെ.ജിയും ഇ.എം.എസും കൊളുത്തിയ തിരിനാളമാണ് ഇന്ന് കേരളത്തിലെ ലക്ഷക്കണക്കിന് കുട്ടികളുടെ ആത്മാഭിമാനമായി പടർന്നുപന്തലിച്ചത്.'
                    : 'Founded in 1938 in Kalliasseri, Kannur under anti-colonial pioneers P. Krishna Pillai, A.K. Gopalan, and E.M.S. Namboodiripad to emancipate rural children from agrarian bondage and illiteracy.'}
                </p>
              </div>

              {/* Big Stats Row */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#321A12]/10">
                <div className="bg-[#FFF4D6]/60 p-3 rounded-2xl border border-[#321A12]/5">
                  <div className="text-2xl sm:text-3xl font-black text-[#D71920]">88+</div>
                  <div className={`text-[11px] font-bold text-[#321A12]/70 uppercase tracking-wider mt-0.5 ${ml ? 'font-malayalam normal-case' : ''}`}>
                    {ml ? 'വർഷത്തെ ചരിത്രം' : 'Years History'}
                  </div>
                </div>
                <div className="bg-[#FFF4D6]/60 p-3 rounded-2xl border border-[#321A12]/5">
                  <div className="text-2xl sm:text-3xl font-black text-[#321A12]">1M+</div>
                  <div className={`text-[11px] font-bold text-[#321A12]/70 uppercase tracking-wider mt-0.5 ${ml ? 'font-malayalam normal-case' : ''}`}>
                    {ml ? 'കുട്ടികൾ' : 'Child Members'}
                  </div>
                </div>
                <div className="bg-[#FFF4D6]/60 p-3 rounded-2xl border border-[#321A12]/5">
                  <div className="text-2xl sm:text-3xl font-black text-[#F57C00]">20,000+</div>
                  <div className={`text-[11px] font-bold text-[#321A12]/70 uppercase tracking-wider mt-0.5 ${ml ? 'font-malayalam normal-case' : ''}`}>
                    {ml ? 'യൂണിറ്റുകൾ' : 'Active Units'}
                  </div>
                </div>
              </div>

              {/* Foundational Pillars Checkpoints */}
              <div className="space-y-2 pt-2 text-xs font-bold text-[#321A12]/85">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D71920] shrink-0" />
                  <span className={ml ? 'font-malayalam text-sm' : ''}>{ml ? 'കുട്ടികളാൽ നേരിട്ട് തിരഞ്ഞെടുക്കപ്പെടുന്ന ജനാധിപത്യ സമിതികൾ' : 'Democratic committees elected directly by children'}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F57C00] shrink-0" />
                  <span className={ml ? 'font-malayalam text-sm' : ''}>{ml ? 'മതനിരപേക്ഷതയും മാനവ സാഹോദര്യവും ജീവിതമൂല്യമാക്കുന്നു' : 'Secular human fraternity as the foundational ethos'}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FF9F00] shrink-0" />
                  <span className={ml ? 'font-malayalam text-sm' : ''}>{ml ? 'ശാസ്ത്രബോധവും യുക്തിചിന്തയും വളർത്തുന്ന പഠനക്കളരികൾ' : 'Scientific inquiry, rational thinking, and arts camps'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The 4 Foundational Pillars (Values Cards) in Festive Layout */}
        <div className="mb-14">
          <div className="text-center sm:text-left mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-berry font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-festival-deep" />
              FOUNDATIONAL PILLARS // അടിസ്ഥാന ദർശനങ്ങൾ
            </span>
            <h3 className={`text-2xl font-black text-ink tracking-tight mt-1 ${ml ? 'font-malayalam' : ''}`}>
              {ml ? 'ബാലസംഘത്തിന്റെ നാല് അടിസ്ഥാന സ്തംഭങ്ങൾ' : 'Four Core Foundational Pillars'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.about.values.map((val, idx) => {
              const Icon = iconMap[val.iconName] || Vote;
              const accent = pillarAccents[idx % pillarAccents.length];

              return (
                <div
                  key={val.id}
                  className={`bg-white/95 rounded-2xl p-5 sm:p-6 border-2 shadow-warm hover:shadow-warm-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group ${accent.border}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-11 h-11 rounded-xl ${accent.bg} ${accent.text} flex items-center justify-center font-bold border ${accent.border} group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono text-ink/40 font-bold">0{idx + 1}</span>
                    </div>

                    <h4
                      className={`text-lg font-black text-ink mb-2 group-hover:text-berry transition-colors ${
                        ml ? 'font-malayalam' : ''
                      }`}
                    >
                      {val.title}
                    </h4>

                    <p
                      className={`text-xs sm:text-sm text-ink/75 leading-relaxed font-medium ${
                        ml ? 'font-malayalam-body leading-[1.7]' : ''
                      }`}
                    >
                      {val.description}
                    </p>
                  </div>

                  <div className={`pt-4 mt-4 border-t border-ink/10 flex items-center justify-between text-[11px] font-bold ${accent.text}`}>
                    <span className="uppercase tracking-wider">PILLAR // 0{idx + 1}</span>
                    <RedStarIcon size={12} className={accent.text} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Democratic Governance Diagram */}
        <GovernanceDiagram />
      </div>
    </section>
  );
};
