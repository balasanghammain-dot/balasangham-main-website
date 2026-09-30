import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { conferenceVerifiedData } from '../../data/verifiedContent';
import { BackdropSunburst } from '../motifs/BackdropSunburst';
import { RedStarIcon } from '../motifs/RedStarIcon';
import { PeaceDove } from '../motifs/PeaceDove';
import { Calendar, MapPin, Building, ShieldCheck, Sparkles } from 'lucide-react';

export const ConferenceHero: React.FC = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';
  const d = conferenceVerifiedData;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FBC02D] via-[#F57F17] to-[#D32F2F] text-white pt-14 pb-20 px-4 sm:px-6 lg:px-8 shadow-xl">
      {/* Radiant Sunburst Stage Backdrop */}
      <BackdropSunburst className="opacity-50" />

      {/* Peace Doves Flanking the Hero */}
      <div className="absolute top-10 left-6 sm:left-12 text-white/80 pointer-events-none hidden md:block">
        <PeaceDove filled className="w-16 h-12 lg:w-20 lg:h-14 drop-shadow-md" />
      </div>
      <div className="absolute top-12 right-6 sm:right-12 text-white/80 pointer-events-none hidden md:block scale-x-[-1]">
        <PeaceDove filled className="w-16 h-12 lg:w-20 lg:h-14 drop-shadow-md" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 text-center sm:text-left">
        {/* Verification provenance pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/35 text-white text-xs font-bold tracking-wide uppercase mb-6 shadow-sm backdrop-blur-md">
          <ShieldCheck className="w-4 h-4 text-sun-yellow" aria-hidden="true" />
          <span className={ml ? 'font-malayalam' : ''}>
            {ml ? 'ഔദ്യോഗിക ജില്ലാ സമ്മേളന പതിപ്പ്' : 'Official District Conference Publication'}
          </span>
          <Sparkles className="w-3.5 h-3.5 text-sun-yellow" />
        </div>

        {/* Poster Theme Display */}
        <div className="mb-4">
          <span className="text-xl sm:text-3xl md:text-4xl font-black text-white tracking-tight inline-block bg-white/20 backdrop-blur-md border border-white/30 px-5 py-2.5 rounded-2xl shadow-md">
            {d.theme[language]}
          </span>
        </div>

        {/* Main Title */}
        <h1
          className={`text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-4 leading-tight drop-shadow-lg ${
            ml ? 'font-malayalam leading-[1.3]' : ''
          }`}
        >
          {d.title[language]}
        </h1>

        {/* Signature Tag from Poster */}
        <div className="text-amber-100 font-bold text-lg sm:text-xl tracking-wide mb-8 flex items-center justify-center sm:justify-start gap-2 drop-shadow-sm">
          <RedStarIcon size={20} className="text-white" />
          <span className={ml ? 'font-malayalam' : ''}>{d.signature[language]}</span>
        </div>

        {/* Core Verified Fact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/15 border border-white/25 rounded-2xl p-5 backdrop-blur-md shadow-sm">
            <div className="flex items-center gap-2.5 text-sun-yellow mb-2">
              <Calendar className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-100">
                {ml ? 'തീയതി' : 'Dates'}
              </span>
            </div>
            <p className={`text-lg font-extrabold text-white ${ml ? 'font-malayalam' : ''}`}>
              {d.dates[language]}
            </p>
          </div>

          <div className="bg-white/15 border border-white/25 rounded-2xl p-5 backdrop-blur-md shadow-sm">
            <div className="flex items-center gap-2.5 text-sun-yellow mb-2">
              <MapPin className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-100">
                {ml ? 'വേദി' : 'Location'}
              </span>
            </div>
            <p className={`text-lg font-extrabold text-white ${ml ? 'font-malayalam' : ''}`}>
              {d.location[language]}
            </p>
          </div>

          <div className="bg-white/15 border border-white/25 rounded-2xl p-5 backdrop-blur-md shadow-sm">
            <div className="flex items-center gap-2.5 text-sun-yellow mb-2">
              <Building className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-100">
                {ml ? 'ഓഡിറ്റോറിയം' : 'Auditorium'}
              </span>
            </div>
            <p className={`text-base font-extrabold text-white ${ml ? 'font-malayalam' : ''}`}>
              {d.venueAuditorium[language]}
            </p>
          </div>
        </div>

        {/* Joyful Children Feature in Conference Banner */}
        <div className="flex justify-center sm:justify-start mb-8">
          <img
            src="/images/happy-children-jumping.png"
            alt="Joyful children of Balasangham"
            className="w-full max-w-md h-auto object-contain drop-shadow-2xl pointer-events-none"
            loading="eager"
          />
        </div>

        {/* Fast Action Anchors */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-3">
          <a
            href="#visual-archive"
            className="px-6 py-3 rounded-full bg-white text-deep-red font-bold text-sm transition-all shadow-md hover:bg-amber-50 hover:shadow-lg focus:outline-hidden focus:ring-2 focus:ring-white"
          >
            {ml ? 'പോസ്റ്റർ ആർക്കൈവ് കാണുക' : 'View Visual Archive'}
          </a>
          <a
            href="#heritage"
            className="px-6 py-3 rounded-full bg-black/25 hover:bg-black/35 text-white font-bold text-sm transition-colors border border-white/30 focus:outline-hidden focus:ring-2 focus:ring-white"
          >
            {ml ? 'കല്ല്യാശ്ശേരി ചരിത്രം' : 'Kalliasseri Heritage'}
          </a>
          <a
            href="#flag-song"
            className="px-6 py-3 rounded-full bg-black/25 hover:bg-black/35 text-white font-bold text-sm transition-colors border border-white/30 focus:outline-hidden focus:ring-2 focus:ring-white"
          >
            {ml ? 'പതാകഗാനം' : 'Official Flag Song'}
          </a>
          <a
            href="#event-details"
            className="px-6 py-3 rounded-full bg-black/25 hover:bg-black/35 text-white font-bold text-sm transition-colors border border-white/30 focus:outline-hidden focus:ring-2 focus:ring-white"
          >
            {ml ? 'യാത്രാ വിവരങ്ങൾ' : 'Venue & Travel'}
          </a>
        </div>
      </div>
    </section>
  );
};
