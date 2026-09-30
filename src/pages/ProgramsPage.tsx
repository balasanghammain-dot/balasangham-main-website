import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { BackdropSunburst } from '../components/motifs/BackdropSunburst';
import { RedStarIcon } from '../components/motifs/RedStarIcon';
import { PeaceDove } from '../components/motifs/PeaceDove';
import { verifiedPrograms } from '../data/organizationData';
import { Calendar, Globe, ArrowRight, Sparkles } from 'lucide-react';

export const ProgramsPage = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Programs', labelMl: 'എല്ലാ പരിപാടികളും' },
    { id: 'cultural', label: 'Cultural & Arts', labelMl: 'കല & സംസ്കാരം' },
    { id: 'educational', label: 'Educational & Science', labelMl: 'വിദ്യാഭ്യാസം & ശാസ്ത്രം' },
    { id: 'literary', label: 'Literary & Reading', labelMl: 'സാഹിത്യം & വായന' },
    { id: 'social', label: 'Social & Protection', labelMl: 'സാമൂഹികം & ജാഗ്രത' },
  ];

  const filteredPrograms = selectedCategory === 'all'
    ? verifiedPrograms
    : verifiedPrograms.filter((p) => p.category === selectedCategory);

  return (
    <div className="bg-soft-cream min-h-screen">
      <Breadcrumb items={[{ label: 'Programs', labelMl: 'പരിപാടികൾ' }]} />

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
            <span className={ml ? 'font-malayalam' : ''}>{ml ? 'പ്രവർത്തനങ്ങൾ' : 'Activities & Initiatives'}</span>
            <Sparkles className="w-3.5 h-3.5 text-sun-yellow" />
          </div>
          <h1 className={`text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-md ${ml ? 'font-malayalam' : ''}`}>
            {ml ? 'പ്രധാന പരിപാടികൾ' : 'Our Flagship Programs'}
          </h1>
          <p className={`text-base sm:text-xl text-amber-100 leading-relaxed max-w-2xl mx-auto mb-6 drop-shadow-xs ${ml ? 'font-malayalam-body leading-[1.8]' : ''}`}>
            {ml
              ? 'കുട്ടികളുടെ കലാ, സാഹിത്യ, ശാസ്ത്ര, സാമൂഹിക ഉന്നമനത്തിനായി വർഷം മുഴുവൻ നടക്കുന്ന സർഗ്ഗാത്മക പ്രവർത്തനങ്ങൾ.'
              : 'Year-round programs fostering children\'s artistic expression, scientific curiosity, social awareness, and democratic community life.'}
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
        {/* Featured Cultural Troupe Card */}
        <div className="mb-14 rounded-3xl bg-gradient-to-r from-[#D32F2F] via-[#F57F17] to-[#FBC02D] p-6 sm:p-8 lg:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-white/20 via-transparent to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-amber-100 border border-white/25">
                <Sparkles className="w-3.5 h-3.5 text-sun-yellow" />
                <span>{ml ? 'പ്രധാന കലാ പ്രസ്ഥാനം' : 'Flagship Cultural Movement'}</span>
              </span>
              <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-black leading-tight drop-shadow-sm ${ml ? 'font-malayalam' : ''}`}>
                {ml
                  ? 'വേനൽത്തുമ്പികൾ: നാടും വീടും കീഴടക്കുന്ന കുട്ടികളുടെ തെരുവുനാടകം'
                  : 'Venalthumbikal: Children’s Traveling Street Theater & Cultural Caravan'}
              </h2>
              <p className={`text-sm sm:text-base text-amber-100 leading-relaxed ${ml ? 'font-malayalam-body leading-[1.8]' : ''}`}>
                {ml
                  ? 'വേനലവധിക്കാലത്ത് ആയിരക്കണക്കിന് കേന്ദ്രങ്ങളിൽ കുട്ടികൾ തന്നെ കഥാപാത്രങ്ങളായി പാട്ടും നാടകവുമായി സഞ്ചരിക്കുന്നു. സർഗ്ഗാത്മകതയും സാമൂഹിക ജാഗ്രതയും ഒരുമിച്ച് വളർത്തുന്ന കുട്ടിക്കൂട്ടായ്മ.'
                  : 'Operating every summer since 1990, Venalthumbikal is Kerala’s legendary traveling children’s cultural theater, staging songs, skits, and dances that champion peace, secular unity, and child rights.'}
              </p>
              <div className="pt-2 flex flex-wrap justify-center lg:justify-start gap-3">
                <Link
                  to="/programs/venalthumbikal"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-deep-red font-bold text-xs sm:text-sm shadow-md hover:bg-amber-50 transition-all"
                >
                  <span>{ml ? 'വിശദ വിവരങ്ങൾ' : 'Explore Venalthumbikal'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/events"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/25 hover:bg-black/35 text-white font-bold text-xs sm:text-sm border border-white/30 transition-colors"
                >
                  <span>{ml ? 'പര്യടന തീയതികൾ' : 'Tour Schedules'}</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-3.5 sm:gap-4">
              <div className="relative rounded-2xl overflow-hidden border-2 border-white/40 shadow-xl bg-black/20 group">
                <img
                  src="/images/venalthumbikal-children.jpeg"
                  alt="Young artists of Venalthumbikal troupe singing on stage in costumes"
                  className="w-full h-48 sm:h-56 object-cover object-top transform group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-2 text-center">
                  <span className="text-[11px] font-bold text-white block drop-shadow">
                    {ml ? 'വേദിയിലെ കുട്ടികൾ' : 'Child Artists on Stage'}
                  </span>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden border-2 border-white/40 shadow-xl bg-amber-400 group">
                <img
                  src="/images/children-dancing.jpeg"
                  alt="Joyful children dancing and celebrating together"
                  className="w-full h-48 sm:h-56 object-cover object-top transform group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-2 text-center">
                  <span className="text-[11px] font-bold text-white block drop-shadow">
                    {ml ? 'നൃത്തച്ചുവടുകൾ' : 'Joyful Dance'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all min-h-[42px] ${
                selectedCategory === cat.id
                  ? 'bg-deep-red text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              } ${ml ? 'font-malayalam' : ''}`}
            >
              {ml ? cat.labelMl : cat.label}
            </button>
          ))}
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((prog) => (
            <article
              key={prog.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-xl hover:border-deep-red/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <span className="px-3 py-1 rounded-full bg-red-50 text-deep-red text-xs font-bold uppercase tracking-wider">
                    {prog.category}
                  </span>
                  <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-sky-600" />
                    <span>{ml ? prog.scopeMl : prog.scope}</span>
                  </span>
                </div>

                <h2 className={`text-xl font-bold text-charcoal mb-1 group-hover:text-deep-red transition-colors ${ml ? 'font-malayalam' : ''}`}>
                  {ml ? prog.titleMl : prog.title}
                </h2>
                <p className="text-xs text-slate-400 mb-3 font-medium">
                  {ml ? prog.title : prog.titleMl}
                </p>

                <p className={`text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3 ${ml ? 'font-malayalam-body leading-[1.75]' : ''}`}>
                  {ml ? prog.descriptionMl : prog.description}
                </p>

                <div className="p-3.5 bg-soft-cream rounded-2xl mb-4 text-xs text-slate-600 space-y-1 border border-slate-100">
                  <div className="flex items-center gap-2 font-semibold text-charcoal">
                    <Calendar className="w-3.5 h-3.5 text-deep-red shrink-0" />
                    <span className={ml ? 'font-malayalam-body' : ''}>{ml ? prog.scheduleMl : prog.schedule}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to={`/programs/${prog.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-bold text-deep-red hover:text-red-700 transition-colors"
                >
                  <span className={ml ? 'font-malayalam' : ''}>{ml ? 'വിശദ വിവരങ്ങൾ' : 'Explore program details'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <RedStarIcon className="w-3.5 h-3.5 text-slate-300 group-hover:text-deep-red transition-colors" />
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
