import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { conferenceVerifiedData } from '../../data/verifiedContent';
import { RedStarIcon } from '../motifs/RedStarIcon';
import { Calendar, MapPin, Building, ShieldCheck } from 'lucide-react';

export const ConferenceHero: React.FC = () => {
  const { language } = useLanguage();
  const d = conferenceVerifiedData;

  return (
    <section className="relative overflow-hidden bg-brand-charcoal text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-brand-charcoal/40">
      {/* Decorative background radial accents */}
      <div
        className="absolute top-0 right-0 w-96 h-96 bg-brand-red/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 bg-sun-yellow/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Verification provenance pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-red/20 border border-brand-red/40 text-sun-yellow text-xs font-semibold tracking-wide uppercase mb-6">
          <ShieldCheck className="w-4 h-4 text-sun-yellow" aria-hidden="true" />
          <span>
            {language === 'ml' ? 'ഔദ്യോഗിക ജില്ലാ സമ്മേളന പതിപ്പ്' : 'Official District Conference Publication'}
          </span>
        </div>

        {/* Poster Theme Display */}
        <div className="mb-4">
          <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-brand-red tracking-tight inline-block bg-white/10 px-4 py-2 rounded-md">
            {d.theme[language]}
          </span>
        </div>

        {/* Main Title */}
        <h1
          className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight font-ml-heading"
          style={{ lineHeight: language === 'ml' ? 1.4 : 1.15 }}
        >
          {d.title[language]}
        </h1>

        {/* Signature Tag from Poster */}
        <div className="text-amber-gold font-bold text-lg sm:text-xl tracking-wide mb-10 flex items-center gap-2">
          <RedStarIcon size={20} />
          <span>{d.signature[language]}</span>
        </div>

        {/* Core Verified Fact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm">
            <div className="flex items-center gap-3 text-sun-yellow mb-2">
              <Calendar className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                {language === 'ml' ? 'തീയതി' : 'Dates'}
              </span>
            </div>
            <p className="text-lg font-bold text-white font-ml-heading">
              {d.dates[language]}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm">
            <div className="flex items-center gap-3 text-sun-yellow mb-2">
              <MapPin className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                {language === 'ml' ? 'വേദി' : 'Location'}
              </span>
            </div>
            <p className="text-lg font-bold text-white font-ml-heading">
              {d.location[language]}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm">
            <div className="flex items-center gap-3 text-sun-yellow mb-2">
              <Building className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                {language === 'ml' ? 'ഓഡിറ്റോറിയം' : 'Auditorium'}
              </span>
            </div>
            <p className="text-base font-bold text-white font-ml-heading">
              {d.venueAuditorium[language]}
            </p>
          </div>
        </div>

        {/* Fast Action Anchors */}
        <div className="flex flex-wrap gap-3">
          <a
            href="#visual-archive"
            className="px-5 py-2.5 rounded-lg bg-brand-red hover:bg-brand-red-dark text-white font-semibold text-sm transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-white"
          >
            {language === 'ml' ? 'പോസ്റ്റർ ആർക്കൈവ് കാണുക' : 'View Visual Archive'}
          </a>
          <a
            href="#heritage"
            className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          >
            {language === 'ml' ? 'കല്ല്യാശ്ശേരി ചരിത്രം' : 'Kalliasseri Heritage'}
          </a>
          <a
            href="#flag-song"
            className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          >
            {language === 'ml' ? 'പതാകഗാനം' : 'Official Flag Song'}
          </a>
          <a
            href="#event-details"
            className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          >
            {language === 'ml' ? 'യാത്രാ വിവരങ്ങൾ' : 'Venue & Travel'}
          </a>
        </div>
      </div>
    </section>
  );
};
