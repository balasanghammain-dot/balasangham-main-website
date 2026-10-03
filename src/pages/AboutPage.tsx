import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { AboutSection } from '../components/sections/AboutSection';
import { BackdropSunburst } from '../components/motifs/BackdropSunburst';
import { RedStarIcon } from '../components/motifs/RedStarIcon';
import { PeaceDove } from '../components/motifs/PeaceDove';
import { History, Award, Network, Users, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';

export const AboutPage = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';

  const subPages = [
    {
      title: 'History & Milestones',
      titleMl: 'ചരിത്രവും നാഴികക്കല്ലുകളും',
      path: '/about/history',
      desc: 'Founded at Kalliasseri in 1938 with E.K. Nayanar as first president.',
      descMl: '1938-ൽ കല്ല്യാശ്ശേരിയിൽ ഇ.കെ. നായനാർ ആദ്യ പ്രസിഡന്റായി തുടക്കം.',
      icon: History,
    },
    {
      title: 'Mission & Objectives',
      titleMl: 'ലക്ഷ്യങ്ങളും ദർശനവും',
      path: '/about/objectives',
      desc: 'Five core pillars: Democratic agency, secularism, science, rights, and arts.',
      descMl: 'ജനാധിപത്യം, മതനിരപേക്ഷത, ശാസ്ത്രബോധം, അവകാശങ്ങൾ, സർഗാത്മകത.',
      icon: Award,
    },
    {
      title: 'Organization Structure',
      titleMl: 'സംഘടനാ ഘടന',
      path: '/about/structure',
      desc: 'Democratic structure from unit to state level with child-led elections.',
      descMl: 'യൂണിറ്റ് തലം മുതൽ സംസ്ഥാന തലം വരെയുള്ള ജനാധിപത്യ ഘടന.',
      icon: Network,
    },
    {
      title: 'Leadership',
      titleMl: 'നേതൃത്വം',
      path: '/about/leadership',
      desc: 'Kannur District Committee office bearers and committee members.',
      descMl: 'കണ്ണൂർ ജില്ലാ കമ്മിറ്റി ഭാരവാഹികളും പ്രവർത്തകരും.',
      icon: Users,
    },
    {
      title: 'Notable Alumni',
      titleMl: 'പ്രമുഖ പൂർവകാല പ്രവർത്തകർ',
      path: '/about/alumni',
      desc: 'Leaders shaped by Balasangham who made historic public contributions.',
      descMl: 'ബാലസംഘത്തിലൂടെ വളർന്ന് പൊതുരംഗത്ത് ചരിത്രം കുറിച്ച വ്യക്തിത്വങ്ങൾ.',
      icon: GraduationCap,
    },
  ];

  return (
    <div className="bg-soft-cream min-h-screen">
      <Breadcrumb items={[{ label: 'About Us', labelMl: 'ഞങ്ങളെക്കുറിച്ച്' }]} />

      {/* Festive Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FBC02D] via-[#F57F17] to-[#D32F2F] text-white py-14 sm:py-18">
        <BackdropSunburst className="opacity-45" />

        <div className="absolute top-8 left-8 text-white/70 pointer-events-none hidden md:block">
          <PeaceDove filled className="w-14 h-10" />
        </div>
        <div className="absolute top-8 right-8 text-white/70 pointer-events-none hidden md:block scale-x-[-1]">
          <PeaceDove filled className="w-14 h-10" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 shadow-sm">
            <RedStarIcon className="w-3.5 h-3.5 text-white" />
            <span className={ml ? 'font-malayalam' : ''}>{ml ? 'ഞങ്ങളെക്കുറിച്ച്' : 'Who We Are'}</span>
            <Sparkles className="w-3.5 h-3.5 text-sun-yellow" />
          </div>

          <h1 className={`text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-md ${ml ? 'font-malayalam' : ''}`}>
            {ml ? 'ബാലസംഘം കണ്ണൂർ ജില്ലാ കമ്മിറ്റി' : 'About Balasangham Kannur'}
          </h1>

          <p className={`text-base sm:text-xl text-amber-100 max-w-3xl mx-auto leading-relaxed mb-6 drop-shadow-xs ${ml ? 'font-malayalam-body leading-[1.8]' : ''}`}>
            {ml
              ? 'കുട്ടികളിൽ ജനാധിപത്യ ബോധവും ശാസ്ത്രചിന്തയും മാനവികതയും വളർത്തുന്ന കേരളത്തിലെ ഏറ്റവും വലിയ കുട്ടികളുടെ സാംസ്കാരിക കൂട്ടായ്മ.'
              : 'Kerala\'s largest children\'s cultural movement, fostering democratic awareness, scientific inquiry, secular fraternity, and creative expression among children aged 6 to 18.'}
          </p>

          <div className="flex justify-center -mb-8 sm:-mb-10">
            <img
              src="/images/happy-children-jumping.png"
              alt="Happy children celebrating in Balasangham"
              className="w-full max-w-md h-auto object-contain drop-shadow-2xl pointer-events-none"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Sub-sections grid */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14">
          <h2 className={`text-2xl font-bold text-charcoal mb-6 text-center ${ml ? 'font-malayalam' : ''}`}>
            {ml ? 'വിശദ വിവരങ്ങൾ' : 'Explore About Balasangham'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subPages.map((page, idx) => {
              const Icon = page.icon;
              return (
                <Link
                  key={idx}
                  to={page.path}
                  className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-deep-red hover:shadow-lg transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-11 h-11 rounded-2xl bg-red-50 text-deep-red flex items-center justify-center mb-4 group-hover:bg-deep-red group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className={`font-bold text-lg text-charcoal mb-2 group-hover:text-deep-red transition-colors ${ml ? 'font-malayalam' : ''}`}>
                      {ml ? page.titleMl : page.title}
                    </h3>
                    <p className={`text-sm text-slate-600 ${ml ? 'font-malayalam-body leading-[1.7]' : ''}`}>
                      {ml ? page.descMl : page.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1 text-xs font-bold text-deep-red">
                    <span>{ml ? 'കൂടുതൽ കാണുക' : 'Learn more'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Four Core Values Section */}
      <AboutSection />
    </div>
  );
};
