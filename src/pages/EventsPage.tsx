import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
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

      <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-red mb-2 block">
            {ml ? 'സമ്മേളനങ്ങളും ദിനാചരണങ്ങളും' : 'Events & Assemblies'}
          </span>
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight mb-4 ${ml ? 'font-malayalam' : ''}`}>
            {ml ? 'പരിപാടികളും സമ്മേളനങ്ങളും' : 'Events & Conferences'}
          </h1>
          <p className={`text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto ${ml ? 'font-malayalam-body' : ''}`}>
            {ml
              ? 'കണ്ണൂർ ജില്ലാ സമ്മേളനം, വാർഷിക ദിനാചരണങ്ങൾ, ചരിത്രപരമായ മുൻ സമ്മേളനങ്ങൾ.'
              : 'Discover upcoming district conferences, annual observances, and historic conference assemblies.'}
          </p>
        </div>
      </section>

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: 'all', label: 'All Events', labelMl: 'എല്ലാം' },
            { id: 'upcoming', label: 'Upcoming / Featured', labelMl: 'വരാനിരിക്കുന്നവ' },
            { id: 'observances', label: 'Annual Observances', labelMl: 'വാർഷിക ദിനാചരണങ്ങൾ' },
            { id: 'past', label: 'Conference Archive', labelMl: 'മുൻ സമ്മേളനങ്ങൾ' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-colors ${
                activeTab === tab.id
                  ? 'bg-brand-red text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
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

            <div className="bg-gradient-to-br from-amber-500 via-orange-600 to-brand-red rounded-3xl p-6 sm:p-10 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10 max-w-3xl">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider mb-4 border border-white/30">
                  {ml ? 'ജില്ലാ സമ്മേളനം 2026' : 'District Conference 2026'}
                </span>

                <h3 className={`text-2xl sm:text-4xl font-extrabold tracking-tight mb-2 ${ml ? 'font-malayalam' : ''}`}>
                  {ml ? conferenceVerifiedData.title.ml : conferenceVerifiedData.title.en}
                </h3>

                <p className="text-amber-200 font-bold text-lg mb-6">
                  {ml ? conferenceVerifiedData.theme.ml : conferenceVerifiedData.theme.en}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-sm">
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-5 h-5 text-amber-200 shrink-0" />
                    <span>{ml ? conferenceVerifiedData.dates.ml : conferenceVerifiedData.dates.en}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-5 h-5 text-amber-200 shrink-0" />
                    <span>{ml ? conferenceVerifiedData.location.ml : conferenceVerifiedData.location.en}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/events/conference-2026"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-brand-red font-bold text-sm shadow hover:bg-slate-50 transition-colors"
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
                  className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-red-50 text-brand-red font-bold text-xs mb-3">
                      {ml ? obs.dateMl : obs.date}
                    </span>
                    <h3 className={`text-lg font-bold text-charcoal mb-2 ${ml ? 'font-malayalam' : ''}`}>
                      {ml ? obs.nameMl : obs.name}
                    </h3>
                    <p className={`text-sm text-slate-600 leading-relaxed ${ml ? 'font-malayalam-body' : ''}`}>
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
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="divide-y divide-slate-100">
                {pastConferences.map((conf, idx) => (
                  <div key={idx} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
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
                    <div className="text-xs text-slate-600 sm:text-right max-w-sm">
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
