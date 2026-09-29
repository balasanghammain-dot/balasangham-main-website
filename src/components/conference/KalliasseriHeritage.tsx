import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { conferenceVerifiedData } from '../../data/verifiedContent';
import { Landmark, Users } from 'lucide-react';
import { RedStarIcon } from '../motifs/RedStarIcon';

export const KalliasseriHeritage: React.FC = () => {
  const { language } = useLanguage();
  const d = conferenceVerifiedData;

  const pioneers = [
    {
      name: language === 'ml' ? 'പി. കൃഷ്ണപിള്ള' : 'P. Krishna Pillai',
      role: language === 'ml' ? 'സംഘാടകൻ & നായകൻ' : 'Legendary Organizer & Pioneer'
    },
    {
      name: language === 'ml' ? 'എ.കെ. ഗോപാലൻ (എ.കെ.ജി)' : 'A.K. Gopalan (AKG)',
      role: language === 'ml' ? 'ജനനായകൻ' : 'Crusader of the Downtrodden'
    },
    {
      name: language === 'ml' ? 'ഇ.എം.എസ്. നമ്പൂതിരിപ്പാട്' : 'E.M.S. Namboodiripad',
      role: language === 'ml' ? 'സൈദ്ധാന്തികൻ' : 'Visionary Statesman & Thinker'
    },
    {
      name: language === 'ml' ? 'കെ.പി.ആർ. ഗോപാലൻ' : 'K.P.R. Gopalan',
      role: language === 'ml' ? 'കർഷക പോരാളി' : 'Heroic Peasant Leader of Morazha'
    },
    {
      name: language === 'ml' ? 'ഇ.കെ. നായനാർ' : 'E.K. Nayanar',
      role: language === 'ml' ? 'ബാലസംഘത്തിലൂടെ വളർന്ന നേതാവ്' : 'Youth Leader & Former Chief Minister'
    }
  ];

  return (
    <section id="heritage" className="py-16 sm:py-20 bg-surface-cream border-b border-border-subtle">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-brand-red text-xs font-bold tracking-wider uppercase mb-3">
          <Landmark className="w-4 h-4 text-brand-red" aria-hidden="true" />
          <span>{language === 'ml' ? 'ചരിത്ര സ്മരണിക' : 'Historical Heritage'}</span>
        </div>

        <h2
          className="text-2xl sm:text-4xl font-extrabold text-charcoal mb-6 font-ml-heading"
          style={{ lineHeight: language === 'ml' ? 1.45 : 1.25 }}
        >
          {d.kalliasseriHeritageNarrative.heading[language]}
        </h2>

        {/* Narrative Box */}
        <div className="bg-white border-l-4 border-brand-red rounded-r-xl p-6 sm:p-8 shadow-sm mb-10">
          <p
            className="text-base sm:text-lg text-charcoal/90 leading-relaxed font-ml-body"
            style={{ lineHeight: language === 'ml' ? 1.8 : 1.7 }}
          >
            {d.kalliasseriHeritageNarrative.summary[language]}
          </p>

          <div className="mt-6 pt-6 border-t border-border-subtle flex flex-wrap items-center justify-between gap-4 text-xs text-slate-muted">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold">{language === 'ml' ? 'സ്ഥാപക തീയതി:' : 'Foundation Date:'}</span>
              <span>{language === 'ml' ? '1938 ഡിസംബർ 28' : '28 December 1938'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold">{language === 'ml' ? 'സ്ഥലം:' : 'Place of Origin:'}</span>
              <span>{language === 'ml' ? 'കല്ല്യാശ്ശേരി, കണ്ണൂർ' : 'Kalliasseri, Kannur'}</span>
            </div>
          </div>
        </div>

        {/* Historic Pioneers Grid */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-brand-red" aria-hidden="true" />
            <h3 className="text-lg sm:text-xl font-bold text-charcoal font-ml-heading">
              {language === 'ml' ? 'പ്രസ്ഥാനത്തിന്റെ വഴികാട്ടികൾ' : 'Guiding Pioneers of 1938'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pioneers.map((p, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-lg border border-border-subtle hover:border-brand-red/30 transition-colors shadow-2xs flex items-start gap-3"
              >
                <div className="mt-1 flex-shrink-0">
                  <RedStarIcon size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-charcoal text-sm sm:text-base font-ml-heading">
                    {p.name}
                  </h4>
                  <p className="text-xs text-slate-muted mt-0.5 font-ml-body">
                    {p.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
