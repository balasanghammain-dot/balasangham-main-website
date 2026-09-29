import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { AboutSection } from '../components/sections/AboutSection';
import { organizationInfo } from '../data/organizationData';
import { RedStarIcon } from '../components/motifs/RedStarIcon';
import { PeaceDove } from '../components/motifs/PeaceDove';
import { History, Award, Network, Users, GraduationCap, ArrowRight } from 'lucide-react';

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
      desc: 'Verified Kannur District Committee and state leadership reference.',
      descMl: 'കണ്ണൂർ ജില്ലാ കമ്മിറ്റി ഭാരവാഹികളും സംസ്ഥാന നേതൃത്വവും.',
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
    <div className="bg-surface-cream min-h-screen">
      <Breadcrumb items={[{ label: 'About Us', labelMl: 'ഞങ്ങളെക്കുറിച്ച്' }]} />

      {/* Hero Banner */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-red mb-2 block">
            {ml ? 'ഞങ്ങളെക്കുറിച്ച്' : 'Who We Are'}
          </span>
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight mb-4 ${ml ? 'font-malayalam' : ''}`}>
            {ml ? 'ബാലസംഘം കണ്ണൂർ' : 'About Balasangham Kannur'}
          </h1>
          <p className={`text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed ${ml ? 'font-malayalam-body' : ''}`}>
            {ml
              ? 'കുട്ടികളിൽ ജനാധിപത്യ ബോധവും ശാസ്ത്രചിന്തയും മാനവികതയും വളർത്തുന്ന കേരളത്തിലെ ഏറ്റവും വലിയ കുട്ടികളുടെ സാംസ്കാരിക കൂട്ടായ്മ.'
              : 'Kerala\'s largest children\'s cultural movement, fostering democratic awareness, scientific inquiry, secular fraternity, and creative expression among children aged 5 to 16.'}
          </p>
        </div>
      </section>

      {/* Overview & Symbols */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Symbolism */}
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm">
            <h2 className={`text-xl font-bold text-charcoal mb-4 flex items-center gap-2 ${ml ? 'font-malayalam' : ''}`}>
              <RedStarIcon className="w-5 h-5 text-brand-red" />
              <span>{ml ? 'ഔദ്യോഗിക ചിഹ്നങ്ങൾ' : 'Official Symbols'}</span>
            </h2>
            <div className="space-y-4 text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                  <RedStarIcon className="w-4 h-4 text-brand-red" />
                </div>
                <div>
                  <strong className="block text-charcoal">{ml ? 'വെള്ളക്കൊടിയും ചുവന്ന നക്ഷത്രവും' : 'White Flag & Red Star'}</strong>
                  <p className="text-slate-600">{ml ? organizationInfo.symbols.flagMl : organizationInfo.symbols.flag}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 text-sky-600">
                  <PeaceDove className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-charcoal">{ml ? 'വെള്ളപ്രാവ്' : 'Peace Dove'}</strong>
                  <p className="text-slate-600">{ml ? organizationInfo.symbols.doveMl : organizationInfo.symbols.dove}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mottos & Slogans */}
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm">
            <h2 className={`text-xl font-bold text-charcoal mb-4 ${ml ? 'font-malayalam' : ''}`}>
              {ml ? 'മുദ്രാവാക്യങ്ങളും ആദർശവും' : 'Mottos & Slogans'}
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-red-50/60 border border-red-100">
                <span className="text-xs uppercase font-extrabold text-brand-red tracking-wider block mb-1">
                  {ml ? 'പ്രധാന മുദ്രാവാക്യം' : 'Core Motto'}
                </span>
                <p className="text-lg font-bold text-brand-red font-malayalam">
                  പഠനം, മനനം, ചലനം
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  Study, Contemplate, Act
                </p>
              </div>

              <div className="p-4 rounded-lg bg-amber-50/60 border border-amber-100">
                <span className="text-xs uppercase font-extrabold text-amber-800 tracking-wider block mb-1">
                  {ml ? 'സംഘടനാ സന്ദേശം' : 'Action Slogan'}
                </span>
                <p className="text-lg font-bold text-amber-900 font-malayalam">
                  പഠിക്കുക, പോരാടുക, വളരുക
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  Study, Struggle, Grow
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-sections grid */}
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
                  className="bg-white p-6 rounded-xl border border-slate-200 hover:border-brand-red hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-red-50 text-brand-red flex items-center justify-center mb-4 group-hover:bg-brand-red group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className={`font-bold text-lg text-charcoal mb-2 group-hover:text-brand-red transition-colors ${ml ? 'font-malayalam' : ''}`}>
                      {ml ? page.titleMl : page.title}
                    </h3>
                    <p className={`text-sm text-slate-600 ${ml ? 'font-malayalam-body' : ''}`}>
                      {ml ? page.descMl : page.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1 text-xs font-bold text-brand-red">
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
