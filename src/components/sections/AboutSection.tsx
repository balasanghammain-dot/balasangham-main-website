import { ComponentType } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { GovernanceDiagram } from './GovernanceDiagram';
import { RedStarIcon } from '../motifs/RedStarIcon';
import { Vote, HeartHandshake, Compass, ShieldCheck, CheckCircle2 } from 'lucide-react';

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Vote,
  HeartHandshake,
  Compass,
  ShieldCheck,
};

export const AboutSection = () => {
  const { t, language } = useLanguage();
  const ml = language === 'ml';

  return (
    <section id="about" className="py-16 sm:py-24 bg-[#F4EBDD] scroll-mt-16 relative overflow-hidden border-b border-[#241914]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Eyebrow Tag */}
        <div className="flex items-center gap-2 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#E9DDC9] border border-[#241914]/15 text-[#241914] text-xs font-bold uppercase tracking-wider shadow-2xs">
            <RedStarIcon size={14} className="text-[#C90000]" />
            <span className={ml ? 'font-malayalam' : ''}>{t.about.sectionTag}</span>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#241914]/60">
            // EDITORIAL ARCHIVE
          </span>
        </div>

        {/* Section Heading & Large Editorial Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-black text-[#171514] tracking-tight mb-4 uppercase ${
                ml ? 'font-malayalam normal-case text-3xl sm:text-4xl' : ''
              }`}
            >
              {t.about.heading}
            </h2>
            <p className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#C90000] leading-snug tracking-tight ${ml ? 'font-malayalam' : ''}`}>
              {ml
                ? '“അറിവിലൂടെയും സംസ്കാരത്തിലൂടെയും കൂട്ടായ പ്രവർത്തനത്തിലൂടെയും തലമുറകളെ വാർത്തെടുക്കുന്നു.”'
                : '“Building generations through knowledge, culture and collective action.”'}
            </p>
          </div>
          <div className="lg:col-span-5">
            <p className={`text-sm sm:text-base text-[#241914]/80 leading-relaxed font-medium ${ml ? 'font-malayalam-body leading-[1.8]' : ''}`}>
              {t.about.intro}
            </p>
          </div>
        </div>

        {/* Large Documentary Photograph with Alongside Editorial Content */}
        <div className="bg-[#E9DDC9]/90 rounded-xl p-6 sm:p-8 border border-[#241914]/20 shadow-warm mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Documentary Photograph */}
            <div className="lg:col-span-6 relative">
              <div className="relative overflow-hidden rounded-lg border border-[#241914]/25 shadow-md bg-[#241914]">
                <img
                  src="/images/venalthumbikal-children.jpeg"
                  alt="Balasangham children cultural troupe performing on stage in traditional attire"
                  className="w-full h-72 sm:h-96 object-cover object-top"
                  loading="lazy"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#171514]/90 via-[#171514]/40 to-transparent p-4 text-white">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#E9DDC9] block mb-0.5">
                    DOCUMENTARY ARCHIVE // വേനൽത്തുമ്പികൾ
                  </span>
                  <p className={`text-xs sm:text-sm font-bold ${ml ? 'font-malayalam' : ''}`}>
                    {ml ? 'കുട്ടികൾ പഠിക്കുന്നു, കളിക്കുന്നു, വളരുന്നു — വേദിയിലെ കുട്ടിക്കൂട്ടായ്മ' : 'Children learning, playing, and creating together in solidarity'}
                  </p>
                </div>
              </div>
            </div>

            {/* Alongside Organization Highlights & Big Numbers */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#C90000] font-bold">
                  HISTORIC SCALE & REACH // 1938–2026
                </span>
                <h3 className={`text-2xl sm:text-3xl font-black text-[#171514] tracking-tight ${ml ? 'font-malayalam' : ''}`}>
                  {ml ? '88 വർഷത്തെ പാരമ്പര്യം' : '88 Years of Continuous History'}
                </h3>
                <p className={`text-sm text-[#241914]/80 leading-relaxed font-medium ${ml ? 'font-malayalam-body leading-[1.75]' : ''}`}>
                  {ml
                    ? '1938-ൽ കല്ല്യാശ്ശേരിയിലെ വിപ്ലവ മണ്ണിൽ കൃഷ്ണപിള്ളയും എ.കെ.ജിയും ഇ.എം.എസും കൊളുത്തിയ തിരിനാളമാണ് ഇന്ന് കേരളത്തിലെ ലക്ഷക്കണക്കിന് കുട്ടികളുടെ ആത്മാഭിമാനമായി പടർന്നുപന്തലിച്ചത്.'
                    : 'Founded in 1938 in Kalliasseri, Kannur under anti-colonial pioneers P. Krishna Pillai, A.K. Gopalan, and E.M.S. Namboodiripad to emancipate rural children from agrarian bondage and illiteracy.'}
                </p>
              </div>

              {/* Verified Big Stats Row */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#241914]/15">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#C90000]">88+</div>
                  <div className={`text-[11px] font-bold text-[#241914]/70 uppercase tracking-wider mt-0.5 ${ml ? 'font-malayalam normal-case' : ''}`}>
                    {ml ? 'വർഷത്തെ ചരിത്രം' : 'Years History'}
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#171514]">1,000,000+</div>
                  <div className={`text-[11px] font-bold text-[#241914]/70 uppercase tracking-wider mt-0.5 ${ml ? 'font-malayalam normal-case' : ''}`}>
                    {ml ? 'കുട്ടികൾ' : 'Child Members'}
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#171514]">20,000+</div>
                  <div className={`text-[11px] font-bold text-[#241914]/70 uppercase tracking-wider mt-0.5 ${ml ? 'font-malayalam normal-case' : ''}`}>
                    {ml ? 'യൂണിറ്റുകൾ' : 'Active Units'}
                  </div>
                </div>
              </div>

              {/* Foundational Pillars Checkpoints */}
              <div className="space-y-2 pt-2 text-xs font-bold text-[#241914]/85">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C90000] shrink-0" />
                  <span className={ml ? 'font-malayalam' : ''}>{ml ? 'കുട്ടികളാൽ നേരിട്ട് തിരഞ്ഞെടുക്കപ്പെടുന്ന ജനാധിപത്യ സമിതികൾ' : 'Democratic committees elected directly by children'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C90000] shrink-0" />
                  <span className={ml ? 'font-malayalam' : ''}>{ml ? 'മതനിരപേക്ഷതയും മാനവ സാഹോദര്യവും ജീവിതമൂല്യമാക്കുന്നു' : 'Secular human fraternity as the foundational ethos'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C90000] shrink-0" />
                  <span className={ml ? 'font-malayalam' : ''}>{ml ? 'ശാസ്ത്രബോധവും യുക്തിചിന്തയും വളർത്തുന്ന പഠനക്കളരികൾ' : 'Scientific inquiry, rational thinking, and arts camps'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The 4 Foundational Pillars (Values Cards) in Editorial Layout */}
        <div className="mb-14">
          <div className="text-center sm:text-left mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C90000] font-bold">
              FOUNDATIONAL PILLARS // അടിസ്ഥാന ദർശനങ്ങൾ
            </span>
            <h3 className={`text-2xl font-black text-[#171514] tracking-tight mt-1 ${ml ? 'font-malayalam' : ''}`}>
              {ml ? 'ബാലസംഘത്തിന്റെ നാല് അടിസ്ഥാന സ്തംഭങ്ങൾ' : 'Four Core Foundational Pillars'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.about.values.map((val, idx) => {
              const Icon = iconMap[val.iconName] || Vote;
              return (
                <div
                  key={val.id}
                  className="bg-[#FFF9EF] rounded-xl p-5 sm:p-6 border border-[#241914]/15 shadow-warm hover:border-[#C90000]/60 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-md bg-[#E9DDC9] text-[#C90000] flex items-center justify-center font-bold border border-[#241914]/10 group-hover:bg-[#C90000] group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono text-[#241914]/50">0{idx + 1}</span>
                    </div>

                    <h4
                      className={`text-lg font-black text-[#171514] mb-2 group-hover:text-[#C90000] transition-colors ${
                        ml ? 'font-malayalam' : ''
                      }`}
                    >
                      {val.title}
                    </h4>

                    <p
                      className={`text-xs sm:text-sm text-[#241914]/75 leading-relaxed font-medium ${
                        ml ? 'font-malayalam-body leading-[1.7]' : ''
                      }`}
                    >
                      {val.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#241914]/10 flex items-center justify-between text-[11px] font-bold text-[#C90000]">
                    <span className="uppercase tracking-wider">PILLAR // 0{idx + 1}</span>
                    <RedStarIcon size={12} className="text-[#C90000]" />
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
