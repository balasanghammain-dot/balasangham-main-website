import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { conferenceVerifiedData } from '../../data/verifiedContent';
import { MapPin, Bus, Train, AlertCircle, Info } from 'lucide-react';

export const EventDetails: React.FC = () => {
  const { language } = useLanguage();
  const d = conferenceVerifiedData;

  return (
    <section id="event-details" className="py-16 sm:py-20 bg-white border-b border-border-subtle">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-brand-red text-xs font-bold tracking-wider uppercase mb-3">
          <MapPin className="w-4 h-4 text-brand-red" aria-hidden="true" />
          <span>{language === 'ml' ? 'വേദിയും യാത്രാമാർഗ്ഗവും' : 'Venue & Logistics'}</span>
        </div>

        <h2
          className="text-2xl sm:text-4xl font-extrabold text-charcoal mb-8 font-ml-heading"
          style={{ lineHeight: language === 'ml' ? 1.45 : 1.25 }}
        >
          {language === 'ml' ? 'സമ്മേളന വിവരങ്ങളും യാത്രാ മാർഗ്ഗവും' : 'Conference Logistics & Travel Guide'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Venue Card */}
          <div className="bg-surface-cream rounded-xl p-6 sm:p-8 border border-border-subtle flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 text-brand-red mb-4">
                <MapPin className="w-6 h-6 flex-shrink-0" aria-hidden="true" />
                <h3 className="text-xl font-bold text-charcoal font-ml-heading">
                  {language === 'ml' ? 'ഔദ്യോഗിക വേദി' : 'Official Venue'}
                </h3>
              </div>

              <div className="space-y-3 text-charcoal/90 font-ml-body text-base">
                <p className="font-bold text-lg text-brand-red font-ml-heading">
                  {d.venueAuditorium[language]}
                </p>
                <p className="text-slate-muted">
                  {d.location[language]}
                </p>
                <p className="text-xs text-slate-500 pt-2 border-t border-border-subtle">
                  {language === 'ml'
                    ? 'കണ്ണൂർ ജില്ലയിലെ കല്ല്യാശ്ശേരി പഞ്ചായത്ത് കേന്ദ്രത്തിൽ സ്ഥിതിചെയ്യുന്ന പ്രധാന സാംസ്കാരിക ഓഡിറ്റോറിയം.'
                    : 'Located at Kalliasseri, a central panchayat hub in Kannur district.'}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border-subtle text-xs text-slate-muted">
              <span>{language === 'ml' ? 'തീയതികൾ: ' : 'Dates: '}</span>
              <strong className="text-charcoal">{d.dates[language]}</strong>
            </div>
          </div>

          {/* Transit Card */}
          <div className="bg-surface-cream rounded-xl p-6 sm:p-8 border border-border-subtle flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 text-brand-red mb-4">
                <Bus className="w-6 h-6 flex-shrink-0" aria-hidden="true" />
                <h3 className="text-xl font-bold text-charcoal font-ml-heading">
                  {language === 'ml' ? 'യാത്രാ സൗകര്യങ്ങൾ' : 'Transit Directions'}
                </h3>
              </div>

              <div className="space-y-4 font-ml-body text-sm sm:text-base text-charcoal/90">
                <div className="flex items-start gap-3">
                  <Bus className="w-5 h-5 text-amber-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <strong className="block text-charcoal font-bold text-sm">
                      {language === 'ml' ? 'റോഡ് മാർഗ്ഗം (ബസ്)' : 'Road Transit (Bus)'}
                    </strong>
                    <p className="text-xs sm:text-sm text-slate-muted mt-0.5">
                      {d.transitAdvisory.bus[language]}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Train className="w-5 h-5 text-sky-blue flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <strong className="block text-charcoal font-bold text-sm">
                      {language === 'ml' ? 'തീവണ്ടി മാർഗ്ഗം (റെയിൽവേ)' : 'Rail Transit (Train)'}
                    </strong>
                    <p className="text-xs sm:text-sm text-slate-muted mt-0.5">
                      {d.transitAdvisory.rail[language]}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border-subtle text-xs text-slate-muted flex items-center gap-1.5">
              <Info className="w-4 h-4 text-brand-red flex-shrink-0" aria-hidden="true" />
              <span>
                {language === 'ml'
                  ? 'ദേശീയപാത 66-ലൂടെ എളുപ്പത്തിൽ എത്തിച്ചേരാവുന്നതാണ്.'
                  : 'Accessible directly via NH 66 corridor.'}
              </span>
            </div>
          </div>
        </div>

        {/* Delegate Advisory and Verified Schedule Status */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-6 sm:p-7">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-amber-700 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h4 className="text-base sm:text-lg font-bold text-amber-900 font-ml-heading mb-1.5">
                {language === 'ml' ? 'പ്രതിനിധി അറിയിപ്പും സെഷൻ സമയക്രമവും' : 'Delegate Advisory & Schedule Notice'}
              </h4>
              <p
                className="text-sm text-amber-900/90 leading-relaxed font-ml-body"
                style={{ lineHeight: language === 'ml' ? 1.75 : 1.6 }}
              >
                {d.scheduleAdvisory[language]}
              </p>
              <div className="mt-3 text-xs text-amber-800 font-medium">
                {language === 'ml'
                  ? 'ശ്രദ്ധിക്കുക: സെഷനുകളുടെ ഔദ്യോഗിക സമയക്രമം അംഗീകരിക്കപ്പെടുന്നതിനനുസരിച്ച് ഇവിടെ അപ്ഡേറ്റ് ചെയ്യുന്നതാണ്.'
                  : 'Note: Specific hour-by-hour session schedules will be displayed here once officially ratified.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
