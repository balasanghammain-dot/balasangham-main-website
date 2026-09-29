// ponytail: MediaShowcaseSection renders the blue peace banner and documentary gallery; upgrade to dynamic album fetching when headless CMS is integrated.
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { PeaceDove } from '../motifs/PeaceDove';
import { ChildrenSilhouettes } from '../motifs/ChildrenSilhouettes';
import { ArrowRight, Image as ImageIcon, Sparkles } from 'lucide-react';

const showcasePhotos = [
  {
    id: 'photo-1',
    src: '/images/venalthumbikal-children.jpeg',
    altEn: 'Venalthumbikal children cultural troupe performing on stage in traditional attire',
    altMl: 'വേനൽത്തുമ്പികൾ കലാജാഥയിലെ കുട്ടികളുടെ രംഗാവതരണം',
    tagEn: 'CULTURAL THEATER',
    tagMl: 'നാടകം / കലാരംഗം',
    titleEn: 'Venalthumbikal State Art Troupe',
    titleMl: 'വേനൽത്തുമ്പികൾ കലാജാഥ',
  },
  {
    id: 'photo-2',
    src: '/images/children-troupe-singing.png',
    altEn: 'Balasangham children choir singing secular fraternity and friendship songs',
    altMl: 'കുട്ടികളുടെ ഗായകസംഘം സാംസ്കാരിക ഗാനങ്ങൾ ആലപിക്കുന്നു',
    tagEn: 'CHOIR & MUSIC',
    tagMl: 'സംഗീതം / ഗായകസംഘം',
    titleEn: 'Voices of Solidarity and Hope',
    titleMl: 'സ്നേഹത്തിന്റെയും സൗഹൃദത്തിന്റെയും പാട്ടുകൾ',
  },
  {
    id: 'photo-3',
    src: '/images/children-dancing.jpeg',
    altEn: 'Joyous children holding hands in collective creative dance workshop',
    altMl: 'കളിമുറ്റങ്ങളിൽ കൈകോർത്ത് ആനന്ദനൃത്തം ചെയ്യുന്ന കുട്ടികൾ',
    tagEn: 'CREATIVE WORKSHOP',
    tagMl: 'കളിമുറ്റം / ക്രിയേറ്റീവ്',
    titleEn: 'Inclusive Democratic Playgrounds',
    titleMl: 'ഭേദചിന്തകളില്ലാത്ത കളിക്കളങ്ങൾ',
  },
  {
    id: 'photo-4',
    src: '/images/balasangham-festival-theme.jpeg',
    altEn: 'Balasangham children festival theme and literary celebration',
    altMl: 'കിളിക്കൂട് സാഹിത്യ സാംസ്കാരിക പ്രവർത്തനങ്ങൾ',
    tagEn: 'LITERARY FESTIVAL',
    tagMl: 'സാഹിത്യം / കിളിക്കൂട്',
    titleEn: 'Kilikkoodu Creative Expressions',
    titleMl: 'കിളിക്കൂട് സർഗ്ഗാത്മക വേദികൾ',
  },
];

export const MediaShowcaseSection = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';

  return (
    <section className="bg-[#FFF9E8] border-b border-[#F57C00]/20 overflow-hidden">
      {/* 1. Blue Peace & Friendship Cultural Banner (#168BD4) */}
      <div className="bg-gradient-to-r from-[#168BD4] via-[#0F75B5] to-[#168BD4] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
        {/* Peace Dove flying in top corner */}
        <div className="absolute top-4 right-6 sm:right-16 text-white/30 pointer-events-none" aria-hidden="true">
          <PeaceDove size={72} filled className="text-white/20 animate-drift-x" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-xs font-mono uppercase font-bold tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#FFD84D]" />
                <span>{ml ? 'സമാധാനവും സൗഹൃദവും' : 'PEACE, FRIENDSHIP & CULTURE'}</span>
              </div>

              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-tight ${ml ? 'font-malayalam normal-case' : ''}`}>
                {ml ? 'കുട്ടിക്കാലത്തിന്റെ ഉത്സവനിമിഷങ്ങൾ' : 'Celebrations of Secular Childhood'}
              </h2>

              <p className={`text-base sm:text-lg text-white/90 leading-relaxed font-medium max-w-2xl ${ml ? 'font-malayalam-body leading-[1.8]' : ''}`}>
                {ml
                  ? 'കണ്ണൂരിലെ ഗ്രാമഗ്രാമാന്തരങ്ങളിൽ കുട്ടികൾ ഒന്നിച്ചു പാടിയും ആടിയും ചിന്തിച്ചും സൃഷ്ടിച്ച ചരിത്രനിമിഷങ്ങളുടെ യഥാർത്ഥ ചിത്രസഞ്ചയം.'
                  : 'Documentary glimpses from cultural troupes, creative summer camps, and village children councils across Kannur district.'}
              </p>
            </div>

            {/* Silhouette Motif */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <ChildrenSilhouettes className="w-full max-w-sm opacity-95 drop-shadow-md" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Documentary Photo Spread on Warm Cream */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 mb-8 border-b border-[#321A12]/10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#168BD4] text-white text-xs font-mono uppercase font-bold tracking-wider shadow-xs">
                <ImageIcon className="w-3.5 h-3.5 text-white" />
                PHOTO JOURNAL
              </span>
              <span className="text-[11px] font-mono text-[#321A12]/60 uppercase tracking-widest hidden sm:inline">
                // DOCUMENTARY SELECTION
              </span>
            </div>
            <h3 className={`text-2xl sm:text-3xl font-black text-[#321A12] tracking-tight uppercase ${ml ? 'font-malayalam normal-case' : ''}`}>
              {ml ? 'വേദിയിലെയും കളിക്കളങ്ങളിലെയും ചിത്രങ്ങൾ' : 'Authentic Documentary Moments'}
            </h3>
          </div>

          <Link
            to="/media"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#168BD4]/30 text-xs font-mono font-bold uppercase tracking-wider text-[#168BD4] hover:bg-[#168BD4] hover:text-white transition-all shadow-xs min-h-[48px]"
          >
            <span>{ml ? 'എല്ലാ ചിത്രങ്ങളും കാണുക' : 'EXPLORE GALLERY'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4-Photo Documentary Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {showcasePhotos.map((photo) => (
            <article
              key={photo.id}
              className="bg-white rounded-2xl overflow-hidden border-2 border-[#FFC928]/30 shadow-warm hover:shadow-warm-lg hover:border-[#168BD4]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-4/3 overflow-hidden bg-[#321A12]">
                  <img
                    src={photo.src}
                    alt={ml ? photo.altMl : photo.altEn}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#321A12]/80 backdrop-blur-xs text-white text-[10px] font-mono uppercase font-bold tracking-wider">
                    {ml ? photo.tagMl : photo.tagEn}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h4 className={`text-base font-black text-[#321A12] leading-snug group-hover:text-[#168BD4] transition-colors ${ml ? 'font-malayalam' : ''}`}>
                    {ml ? photo.titleMl : photo.titleEn}
                  </h4>
                  <p className={`text-xs text-[#321A12]/70 leading-relaxed font-medium line-clamp-2 ${ml ? 'font-malayalam-body leading-[1.6]' : ''}`}>
                    {ml ? photo.altMl : photo.altEn}
                  </p>
                </div>
              </div>

              <div className="px-4 pb-4 pt-2 border-t border-[#321A12]/5 flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#321A12]/50 uppercase tracking-widest">
                  KANNUR ARCHIVE
                </span>
                <Link
                  to="/media"
                  className="text-xs font-mono font-bold text-[#168BD4] hover:text-[#0F75B5] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform min-h-[48px] px-2 -my-2"
                  aria-label={ml ? `${photo.titleMl} കാണുക` : `View ${photo.titleEn}`}
                >
                  <span>{ml ? 'കാണുക' : 'View'}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
