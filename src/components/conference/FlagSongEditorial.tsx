import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { flagSongStanzas } from '../../data/flagSong';
import { RedStarIcon } from '../motifs/RedStarIcon';
import { BookOpen, ShieldCheck } from 'lucide-react';

export const FlagSongEditorial: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'both' | 'ml' | 'en'>('both');

  return (
    <section id="flag-song" className="py-16 sm:py-24 bg-soft-cream border-b border-border-subtle">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-deep-red text-xs font-bold tracking-wider uppercase mb-2">
            <BookOpen className="w-4 h-4 text-deep-red" aria-hidden="true" />
            <span>{language === 'ml' ? 'ഔദ്യോഗിക പതാകഗാനം' : 'Official Flag Song (Anthem)'}</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl font-extrabold text-charcoal font-ml-heading"
            style={{ lineHeight: language === 'ml' ? 1.45 : 1.25 }}
          >
            {language === 'ml' ? 'ഉണരുക ഉയരുക ശുഭ്രപതാകേ' : 'Awaken, Arise, O Radiant White Banner'}
          </h2>

          <p className="mt-3 text-slate-muted text-sm sm:text-base max-w-2xl mx-auto font-ml-body">
            {language === 'ml'
              ? 'ബാലസംഘത്തിന്റെ ഓരോ സമ്മേളനങ്ങളിലും പതാക ഉയർത്തലുകളിലും ഒരേ മനസ്സോടെ പാടുന്ന ഔദ്യോഗിക ഗാനം.'
              : 'The official anthem sung in unison during all Balasangham assemblies and flag hoistings across Kerala.'}
          </p>

          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-border-subtle text-xs text-slate-600">
            <ShieldCheck className="w-3.5 h-3.5 text-deep-red" />
            <span>
              {language === 'ml' ? 'യഥാർത്ഥ വരികൾ • രേഖപ്പെടുത്തപ്പെട്ടത്' : 'Verbatim Lyrics • Verified Historical Record'}
            </span>
          </div>
        </div>

        {/* View Layout Controls */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-white border border-border-subtle rounded-xl shadow-2xs">
            <button
              type="button"
              onClick={() => setActiveTab('both')}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red ${
                activeTab === 'both' ? 'bg-deep-red text-white' : 'text-slate-600 hover:text-charcoal'
              }`}
            >
              {language === 'ml' ? 'ദ്വിഭാഷാ രൂപം (മലയാളം & English)' : 'Bilingual View'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('ml')}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red ${
                activeTab === 'ml' ? 'bg-deep-red text-white' : 'text-slate-600 hover:text-charcoal'
              }`}
            >
              {language === 'ml' ? 'മലയാളം മാത്രം' : 'Malayalam Original'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('en')}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red ${
                activeTab === 'en' ? 'bg-deep-red text-white' : 'text-slate-600 hover:text-charcoal'
              }`}
            >
              {language === 'ml' ? 'English തർജ്ജമ' : 'English Translation'}
            </button>
          </div>
        </div>

        {/* Editorial Stanza Cards */}
        <div className="space-y-8">
          {flagSongStanzas.map((stanza) => (
            <article
              key={stanza.stanzaNumber}
              className="bg-white rounded-2xl p-6 sm:p-10 border border-border-subtle shadow-sm relative overflow-hidden"
            >
              {/* Subtle Stanza Number Watermark */}
              <div
                className="absolute top-4 right-6 text-slate-100 font-black text-6xl select-none pointer-events-none"
                aria-hidden="true"
              >
                0{stanza.stanzaNumber}
              </div>

              <div className="flex items-center gap-2 mb-6 text-deep-red font-bold text-xs uppercase tracking-wider">
                <RedStarIcon size={14} />
                <span>
                  {language === 'ml' ? `ഭാഗം ${stanza.stanzaNumber}` : `Stanza ${stanza.stanzaNumber}`}
                </span>
              </div>

              <div className={`grid gap-6 ${activeTab === 'both' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                {/* Malayalam Original */}
                {(activeTab === 'both' || activeTab === 'ml') && (
                  <div className="space-y-2 border-l-2 border-deep-red/30 pl-4 py-1">
                    <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                      മലയാളം
                    </span>
                    {stanza.malayalamLines.map((line, lIdx) => (
                      <p
                        key={lIdx}
                        className="text-base sm:text-lg font-bold text-charcoal font-ml-body"
                        style={{ lineHeight: 1.85 }}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                )}

                {/* English Poetic Translation */}
                {(activeTab === 'both' || activeTab === 'en') && (
                  <div className="space-y-2 border-l-2 border-sun-yellow/50 pl-4 py-1">
                    <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                      Poetic Translation (English)
                    </span>
                    {stanza.poeticTranslationLines.map((line, lIdx) => (
                      <p
                        key={lIdx}
                        className="text-sm sm:text-base font-medium text-slate-700 italic"
                        style={{ lineHeight: 1.7 }}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Closing Note */}
        <div className="mt-10 text-center text-xs text-slate-muted">
          <p>
            {language === 'ml'
              ? 'ലക്ഷക്കണക്കിന് കുട്ടികളുടെ വിമോചന ഗാനം.'
              : 'The anthem of children’s freedom and democratic fraternity.'}
          </p>
        </div>
      </div>
    </section>
  );
};
