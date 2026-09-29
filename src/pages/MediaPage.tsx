import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { VisualArchive } from '../components/conference/VisualArchive';
import { Video, Image, ExternalLink } from 'lucide-react';
import { YoutubeIcon } from '../components/common/SocialIcons';

export const MediaPage = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';
  const [activeTab, setActiveTab] = useState<'posters' | 'videos'>('posters');

  return (
    <div className="bg-surface-cream min-h-screen">
      <Breadcrumb items={[{ label: 'Media & Gallery', labelMl: 'മീഡിയ & ഗാലറി' }]} />

      <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-red mb-2 block">
            {ml ? 'ചിത്രങ്ങളും ദൃശ്യങ്ങളും' : 'Visual Tradition'}
          </span>
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight mb-4 ${ml ? 'font-malayalam' : ''}`}>
            {ml ? 'മീഡിയ & ആർക്കൈവ്' : 'Media, Posters & Video Gallery'}
          </h1>
          <p className={`text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto ${ml ? 'font-malayalam-body' : ''}`}>
            {ml
              ? 'പോസ്റ്ററുകൾ, ചരിത്ര രേഖകൾ, ഔദ്യോഗിക യൂട്യൂബ് ചാനൽ ദൃശ്യങ്ങൾ.'
              : 'Authentic poster artworks, historical backdrop designs, and official video documentation of Balasangham activities.'}
          </p>
        </div>
      </section>

      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab switchers */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveTab('posters')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-colors ${
              activeTab === 'posters'
                ? 'bg-brand-red text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Image className="w-4 h-4" />
            <span>{ml ? 'പോസ്റ്ററുകളും രേഖകളും' : 'Verified Posters & Artworks'}</span>
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-colors ${
              activeTab === 'videos'
                ? 'bg-brand-red text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>{ml ? 'വീഡിയോ ചാനൽ' : 'Video Channel & Songs'}</span>
          </button>
        </div>

        {activeTab === 'posters' && (
          <div>
            <div className="mb-4 text-center max-w-xl mx-auto text-xs text-slate-500">
              {ml
                ? 'കണ്ണൂർ ജില്ലാ സമ്മേളനത്തിന്റെ ഔദ്യോഗിക പോസ്റ്റർ രൂപകൽപ്പനകൾ'
                : 'Verified backdrop artworks and official poster releases from the District Reception Committee.'}
            </div>
            <VisualArchive />
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 text-center shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-red-100 text-brand-red flex items-center justify-center mx-auto mb-6">
                <YoutubeIcon className="w-8 h-8" />
              </div>

              <h2 className={`text-2xl sm:text-3xl font-extrabold text-charcoal mb-4 ${ml ? 'font-malayalam' : ''}`}>
                {ml ? 'ബാലസംഘം കേരളം ഔദ്യോഗിക യൂട്യൂബ് ചാനൽ' : 'Official YouTube Channel'}
              </h2>

              <p className={`text-base text-slate-600 max-w-xl mx-auto mb-8 leading-relaxed ${ml ? 'font-malayalam-body' : ''}`}>
                {ml
                  ? 'വേനൽത്തുമ്പികൾ നാടക ഗാനങ്ങൾ, കൊടിപ്പാട്ട്, സമ്മേളന ദൃശ്യങ്ങൾ എന്നിവ ഔദ്യോഗിക യൂട്യൂബ് ചാനലിൽ ലഭ്യമാണ്.'
                  : 'Watch verified recordings of the official flag song, Venalthumbikal musical plays, jatha performances, and state assemblies.'}
              </p>

              <a
                href="https://www.youtube.com/@balasanghamkerala2817"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-red text-white font-bold text-sm shadow hover:bg-red-700 transition-colors"
              >
                <YoutubeIcon className="w-5 h-5" />
                <span>{ml ? 'യൂട്യൂബ് ചാനൽ സന്ദർശിക്കുക' : 'Visit @balasanghamkerala2817 on YouTube'}</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>

              <p className="text-xs text-slate-400 mt-6">
                Verified channel handle: <strong>@balasanghamkerala2817</strong>
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
