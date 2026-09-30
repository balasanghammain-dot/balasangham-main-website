import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { archiveImages } from '../../data/verifiedContent';
import { LightboxModal } from './LightboxModal';
import { Image as ImageIcon, ZoomIn } from 'lucide-react';

export const VisualArchive: React.FC = () => {
  const { language } = useLanguage();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  return (
    <section id="visual-archive" className="py-16 sm:py-20 bg-surface-muted border-b border-border-subtle">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-deep-red text-xs font-bold tracking-wider uppercase mb-3">
          <ImageIcon className="w-4 h-4 text-deep-red" aria-hidden="true" />
          <span>{language === 'ml' ? 'ദൃശ്യ രേഖകൾ' : 'Visual Archive'}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2
              className="text-2xl sm:text-4xl font-extrabold text-charcoal font-ml-heading"
              style={{ lineHeight: language === 'ml' ? 1.45 : 1.25 }}
            >
              {language === 'ml' ? 'സമ്മേളന പോസ്റ്ററുകളും കലാവിരുന്നും' : 'Official Posters & Stage Backdrops'}
            </h2>
            <p className="text-slate-muted text-sm sm:text-base mt-2 font-ml-body">
              {language === 'ml'
                ? 'കണ്ണൂർ ജില്ലാ സമ്മേളനത്തിനായി തയ്യാറാക്കിയ ഔദ്യോഗിക പ്രചാരണ പോസ്റ്ററുകളും വേദി രൂപകൽപ്പനകളും.'
                : 'Authentic campaign posters and stage backdrops designed for the Kannur District Conference.'}
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-deep-red/10 text-deep-red self-start sm:self-auto">
            {archiveImages.length} {language === 'ml' ? 'ചിത്രരേഖകൾ' : 'Artifacts'}
          </span>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {archiveImages.map((img, idx) => (
            <div
              key={img.id}
              className="bg-white rounded-xl overflow-hidden border border-border-subtle shadow-2xs hover:shadow-md transition-shadow group flex flex-col justify-between"
            >
              <button
                type="button"
                onClick={() => setSelectedIdx(idx)}
                aria-haspopup="dialog"
                aria-label={`${language === 'ml' ? 'വലുതായി കാണുക: ' : 'Enlarge: '}${img.caption[language]}`}
                className="relative aspect-[3/4] w-full overflow-hidden bg-slate-100 block text-left focus:outline-none focus:ring-2 focus:ring-brand-red"
              >
                <img
                  src={img.thumbnail}
                  alt={img.alt[language]}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100"
                  aria-hidden="true"
                >
                  <span className="px-3 py-1.5 rounded-full bg-white/90 text-charcoal font-bold text-xs flex items-center gap-1.5 shadow-sm">
                    <ZoomIn className="w-3.5 h-3.5 text-deep-red" />
                    <span>{language === 'ml' ? 'വലുതായി കാണുക' : 'Expand'}</span>
                  </span>
                </div>
              </button>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="inline-block text-[11px] font-bold text-deep-red uppercase tracking-wider mb-1">
                    {img.category === 'poster'
                      ? (language === 'ml' ? 'പോസ്റ്റർ' : 'Campaign Poster')
                      : (language === 'ml' ? 'വേദി രൂപകൽപ്പന' : 'Stage Backdrop')}
                  </span>
                  <p
                    className="text-xs sm:text-sm font-semibold text-charcoal font-ml-body line-clamp-2"
                    style={{ lineHeight: language === 'ml' ? 1.6 : 1.4 }}
                  >
                    {img.caption[language]}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-border-subtle/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{img.dimensions.width} × {img.dimensions.height} px</span>
                  <span className="text-deep-red font-medium">
                    {language === 'ml' ? 'ആർക്കൈവ് രേഖ' : 'Archive Asset'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      <LightboxModal
        images={archiveImages}
        currentIndex={selectedIdx ?? 0}
        isOpen={selectedIdx !== null}
        onClose={() => setSelectedIdx(null)}
        onNavigate={(idx) => setSelectedIdx(idx)}
      />
    </section>
  );
};
