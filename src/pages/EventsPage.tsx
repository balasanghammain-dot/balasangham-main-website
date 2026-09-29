import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { BackdropSunburst } from '../components/motifs/BackdropSunburst';
import { RedStarIcon } from '../components/motifs/RedStarIcon';
import { PeaceDove } from '../components/motifs/PeaceDove';
import { conferenceVerifiedData } from '../data/verifiedContent';
import { Calendar, MapPin, Sparkles, ArrowRight } from 'lucide-react';

export const EventsPage = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'observances' | 'past'>('all');

  const annualObservances = [
    {
      date: 'December 28',
      dateMl: 'ഡിസംബർ 28',
      name: 'Balasangham Foundation Day',
      nameMl: 'ബാലസംഘം സ്ഥാപക ദിനം',
      desc: 'Commemorates the 1938 founding at Kalliasseri. Flag hoisting and pledge renewals across 20,000+ units.',
      descMl: '1938-ൽ കല്ല്യാശ്ശേരിയിൽ സംഘടന രൂപംകൊണ്ടതിന്റെ വാർഷികം. മുഴുവൻ യൂണിറ്റുകളിലും പതാക ഉയർത്തലും പ്രതിജ്ഞയും.',
    },
    {
      date: 'November 14–20',
      dateMl: 'നവംബർ 14–20',
      name: 'Child Rights & Children’s Week',
      nameMl: 'ശിശുദിന - ബാലാവകാശ വാരം',
      desc: 'Advocacy for child protection, secular values, education rights, and recreational spaces.',
      descMl: 'കുട്ടികളുടെ അവകാശ സംരക്ഷണത്തിനും വിനോദത്തിനും ഊന്നൽ നൽകുന്ന പരിപാടികൾ.',
    },
    {
      date: 'June 5',
      dateMl: 'ജൂൺ 5',
      name: 'World Environment Day',
      nameMl: 'ലോക പരിസ്ഥിതി ദിനം',
      desc: 'Tree planting drives, neighborhood sanitation, biodiversity documentation, and eco-pledges.',
      descMl: 'വൃക്ഷത്തൈ നടീലും പരിസ്ഥിതി ശുചീകരണവും പ്രകൃതി സംരക്ഷണ പ്രവർത്തനങ്ങളും.',
    },
    {
      date: 'June 19–25',
      dateMl: 'ജൂൺ 19–25',
      name: 'Reading Week & Literary Festivals',
      nameMl: 'വായനാ വാരം',
      desc: 'Book exhibitions, storytelling, poetry recitations, and neighborhood library visits.',
      descMl: 'പുസ്തക പ്രദർശനങ്ങൾ, കഥാകഥനം, വായനശാലാ സന്ദർശനം.',
    },
    {
      date: 'August 6',
      dateMl: 'ഓഗസ്റ്റ് 6',
      name: 'Hiroshima Peace Day',
      nameMl: 'ഹിരോഷിമ - സമാധാന ദിനം',
      desc: 'Peace rallies, Sadako crane origami crafting, anti-war exhibitions, and peace pledge ceremonies.',
      descMl: 'സമാധാന റാലികൾ, യുദ്ധവിരുദ്ധ പ്രദർശനങ്ങൾ, സമാധാന പ്രതിജ്ഞ.',
    },
  ];

  const pastConferences = [
    {
      year: '2024',
      level: 'District',
      title: 'Kannur District Conference',
      titleMl: 'കണ്ണൂർ ജില്ലാ സമ്മേളനം',
      venue: 'Pilathara, Kannur',
      venueMl: 'പിലാത്തറ, കണ്ണൂർ',
      details: 'Elected current District Committee (President K. Surya, Secretary M.P. Gokul).',
      detailsMl: 'നിലവിലെ ജില്ലാ കമ്മിറ്റിയെ തിരഞ്ഞെടുത്തു.',
    },
    {
      year: '2022',
      level: 'State',
      title: '6th State Conference',
      titleMl: '6-ാം സംസ്ഥാന സമ്മേളനം',
      venue: 'Thrissur',
      venueMl: 'തൃശ്ശൂർ',
      details: 'Focus on digital inclusion, progressive child rights, and cultural literacy.',
      detailsMl: 'കുട്ടികളുടെ ഡിജിറ്റൽ അവകാശങ്ങളും സാംസ്കാരിക മുന്നേറ്റവും ചർച്ച ചെയ്തു.',
    },
    {
      year: '2016',
      level: 'State',
      title: '4th State Conference',
      titleMl: '4-ാം സംസ്ഥാന സമ്മേളനം',
      venue: 'Perinthalmanna, Malappuram',
      venueMl: 'പെരിന്തൽമണ്ണ, മലപ്പുറം',
      details: 'Massive delegate assembly strengthening rural child clubs.',
      detailsMl: 'കുട്ടിക്കൂട്ടങ്ങളുടെ ശാക്തീകരണത്തിനായുള്ള തീരുമാനങ്ങൾ.',
    },
    {
      year: '2014',
      level: 'State',
      title: '3rd State Conference',
      titleMl: '3-ാം സംസ്ഥാന സമ്മേളനം',
      venue: 'Palakkad',
      venueMl: 'പാലക്കാട്',
      details: 'Statewide resolutions against superstition and child labor.',
      detailsMl: 'അന്ധവിശ്വാസങ്ങൾക്കെതിരെയും ബാലവേലയ്ക്കെതിരെയും പ്രമേയങ്ങൾ.',
    },
  ];

  return (
    <div className="bg-surface-cream min-h-screen">
      <Breadcrumb items={[{ label: 'Events', labelMl: 'പരിപാടികൾ' }]} />

      {/* Festive Hero Banner with Sunburst & Children */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FBC02D] via-[#F57F17] to-[#D32F2F] text-white py-14 sm:py-18">
        <BackdropSunburst className="opacity-45" />

        <div className="absolute top-8 left-8 text-white/70 pointer-events-none hidden md:block">
          <PeaceDove filled className="w-14 h-10" />
        </div>
        <div className="absolute top-8 right-8 text-white/70 pointer-events-none hidden md:block scale-x-[-1]">
          <PeaceDove filled className="w-14 h-10" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 shadow-sm">
            <RedStarIcon className="w-3.5 h-3.5 text-white" />
            <span className={ml ? 'font-malayalam' : ''}>{ml ? 'സമ്മേളനങ്ങളും ദിനാചരണങ്ങളും' : 'Events & Assemblies'}</span>
            <Sparkles className="w-3.5 h-3.5 text-sun-yellow" />
          </div>
          <h1 className={`text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-md ${ml ? 'font-malayalam' : ''}`}>
            {ml ? 'പരിപാടികളും സമ്മേളനങ്ങളും' : 'Events & Conferences'}
          </h1>
          <p className={`text-base sm:text-xl text-amber-100 leading-relaxed max-w-2xl mx-auto mb-6 drop-shadow-xs ${ml ? 'font-malayalam-body leading-[1.8]' : ''}`}>
            {ml
              ? 'കണ്ണൂർ ജില്ലാ സമ്മേളനം, വാർഷിക ദിനാചരണങ്ങൾ, ചരിത്രപരമായ മുൻ സമ്മേളനങ്ങൾ.'
              : 'Discover upcoming district conferences, annual observances, and historic conference assemblies.'}
          </p>

          <div className="flex justify-center -mb-8 sm:-mb-10">
            <img
              src="/images/happy-children-jumping.png"
              alt="Joyful children of Balasangham"
              className="w-full max-w-md h-auto object-contain drop-shadow-2xl pointer-events-none"
              loading="eager"
            />
          </div>
        </div>
      </section>

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {[
            { id: 'all', label: 'All Events', labelMl: 'എല്ലാം' },
            { id: 'upcoming', label: 'Upcoming / Featured', labelMl: 'വരാനിരിക്കുന്നവ' },
            { id: 'observances', label: 'Annual Observances', labelMl: 'വാർഷിക ദിനാചരണങ്ങൾ' },
            { id: 'past', label: 'Conference Archive', labelMl: 'മുൻ സമ്മേളനങ്ങൾ' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all min-h-[42px] ${
                activeTab === tab.id
                  ? 'bg-brand-red text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              } ${ml ? 'font-malayalam' : ''}`}
            >
              {ml ? tab.labelMl : tab.label}
            </button>
          ))}
        </div>

        {/* Featured Upcoming Conference */}
        {(activeTab === 'all' || activeTab === 'upcoming') && (
          <div className="mb-14">
            <h2 className={`text-2xl font-bold text-charcoal mb-6 flex items-center gap-2 ${ml ? 'font-malayalam' : ''}`}>
              <Sparkles className="w-5 h-5 text-brand-red" />
              <span>{ml ? 'പ്രധാന വരാനിരിക്കുന്ന പരിപാടി' : 'Featured Upcoming Event'}</span>
            </h2>

            <div className="bg-gradient-to-r from-[#FBC02D] via-[#F57F17] to-[#D32F2F] rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden border border-amber-300/40">
              {/* Subtle sunburst radiant layer */}
              <div className="absolute inset-0 bg-radial from-white/20 via-transparent to-transparent pointer-events-none" />

              <div className="relative z-10 max-w-4xl">
                <span className="inline-block px-3.5 py-1 rounded-full bg-white/25 backdrop-blur-md text-white text-xs font-black uppercase tracking-wider mb-4 border border-white/30 shadow-xs">
                  {ml ? 'ജില്ലാ സമ്മേളനം 2026' : 'District Conference 2026'}
                </span>

                <h3 className={`text-2xl sm:text-4xl font-black tracking-tight mb-2 text-white drop-shadow-sm ${ml ? 'font-malayalam' : ''}`}>
                  {ml ? conferenceVerifiedData.title.ml : conferenceVerifiedData.title.en}
                </h3>

                <p className="text-amber-100 font-black text-xl sm:text-2xl mb-6">
                  {ml ? conferenceVerifiedData.theme.ml : conferenceVerifiedData.theme.en}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-sm">
                  <div className="flex items-center gap-2.5 bg-black/20 backdrop-blur-xs px-4 py-2.5 rounded-xl border border-white/20">
                    <Calendar className="w-5 h-5 text-sun-yellow shrink-0" />
                    <span className={`font-bold ${ml ? 'font-malayalam' : ''}`}>{ml ? conferenceVerifiedData.dates.ml : conferenceVerifiedData.dates.en}</span>
                  </div>
                  <div className="flex items-center gap-2.5 bg-black/20 backdrop-blur-xs px-4 py-2.5 rounded-xl border border-white/20">
                    <MapPin className="w-5 h-5 text-sun-yellow shrink-0" />
                    <span className={`font-bold ${ml ? 'font-malayalam' : ''}`}>{ml ? conferenceVerifiedData.location.ml : conferenceVerifiedData.location.en}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/events/conference-2026"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-brand-red font-black text-sm shadow-xl hover:bg-amber-50 hover:shadow-2xl transition-all"
                  >
                    <span>{ml ? 'സമ്മേളന വിവരങ്ങൾ കാണുക' : 'Full Conference Details'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Annual Observances Section */}
        {(activeTab === 'all' || activeTab === 'observances') && (
          <div className="mb-14">
            <h2 className={`text-2xl font-bold text-charcoal mb-6 ${ml ? 'font-malayalam' : ''}`}>
              {ml ? 'വാർഷിക ദിനാചരണങ്ങൾ' : 'Annual Observances & Peace Days'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {annualObservances.map((obs, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-red-50 text-brand-red font-bold text-xs mb-3">
                      {ml ? obs.dateMl : obs.date}
                    </span>
                    <h3 className={`text-lg font-bold text-charcoal mb-2 ${ml ? 'font-malayalam' : ''}`}>
                      {ml ? obs.nameMl : obs.name}
                    </h3>
                    <p className={`text-sm text-slate-600 leading-relaxed ${ml ? 'font-malayalam-body leading-[1.75]' : ''}`}>
                      {ml ? obs.descMl : obs.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Past Conferences Archive */}
        {(activeTab === 'all' || activeTab === 'past') && (
          <div>
            <h2 className={`text-2xl font-bold text-charcoal mb-6 ${ml ? 'font-malayalam' : ''}`}>
              {ml ? 'മുൻ സമ്മേളനങ്ങൾ' : 'Conference Archive'}
            </h2>
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="divide-y divide-slate-100">
                {pastConferences.map((conf, idx) => (
                  <div key={idx} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {conf.year}
                        </span>
                        <span className="text-xs font-semibold text-brand-red uppercase">
                          {conf.level}
                        </span>
                      </div>
                      <h3 className={`text-lg font-bold text-charcoal ${ml ? 'font-malayalam' : ''}`}>
                        {ml ? conf.titleMl : conf.title}
                      </h3>
                      <p className={`text-sm text-slate-500 flex items-center gap-1 mt-1`}>
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{ml ? conf.venueMl : conf.venue}</span>
                      </p>
                    </div>
                    <div className={`text-xs text-slate-600 sm:text-right max-w-sm ${ml ? 'font-malayalam-body leading-[1.6]' : ''}`}>
                      {ml ? conf.detailsMl : conf.details}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
