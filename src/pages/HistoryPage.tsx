import { useLanguage } from '../context/LanguageContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { HistorySection } from '../components/sections/HistorySection';
import { KalliasseriHeritage } from '../components/conference/KalliasseriHeritage';
import { BackdropSunburst } from '../components/motifs/BackdropSunburst';
import { RedStarIcon } from '../components/motifs/RedStarIcon';
import { PeaceDove } from '../components/motifs/PeaceDove';
import { Calendar, Sparkles } from 'lucide-react';

const fullMilestones = [
  {
    year: '1938',
    title: 'Founding at Kalliasseri',
    titleMl: 'കല്ല്യാശ്ശേരിയിലെ തുടക്കം',
    desc: 'Founded on December 28, 1938, as Desheeya Balasangham in Kalliasseri, Kannur, with young student leader E.K. Nayanar elected as its first president.',
    descMl: '1938 ഡിസംബർ 28-ന് കണ്ണൂർ ജില്ലയിലെ കല്ല്യാശ്ശേരിയിൽ ദേശീയ ബാലസംഘം രൂപീകൃതമായി. വിദ്യാർത്ഥിയായിരുന്ന ഇ.കെ. നായനാർ ആദ്യ പ്രസിഡന്റായി തെരഞ്ഞെടുക്കപ്പെട്ടു.',
  },
  {
    year: '1940–43',
    title: 'Anti-Colonial Mobilization',
    titleMl: 'സാമ്രാജ്യത്വ വിരുദ്ധ പോരാട്ടങ്ങൾ',
    desc: 'Children joined the national independence movement, supporting agrarian workers and maintaining connections with historic freedom fighters including the Kayyur martyrs.',
    descMl: 'സ്വാതന്ത്ര്യ സമരത്തിലും കർഷക പോരാട്ടങ്ങളിലും കുട്ടികൾ പങ്കാളികളായി. കയ്യൂർ രക്തസാക്ഷിത്വത്തിന്റെ ചരിത്രപശ്ചാത്തലത്തിൽ സംഘടന ശക്തിപ്പെട്ടു.',
  },
  {
    year: '1972',
    title: 'Deshabhimani Balasangham Re-establishment',
    titleMl: 'ദേശാഭിമാനി ബാലസംഘം പുനഃസംഘടന',
    desc: 'Re-activated in post-independence Kerala as Deshabhimani Balasangham, giving structured impetus to child welfare and democratic consciousness.',
    descMl: 'സ്വാതന്ത്ര്യാനന്തര കേരളത്തിൽ കുട്ടികളുടെ സർഗാത്മക പ്രവർത്തനങ്ങൾക്ക് ഊർജ്ജം നൽകി ദേശാഭിമാനി ബാലസംഘം എന്ന പേരിൽ പ്രവർത്തനം വിപുലീകരിച്ചു.',
  },
  {
    year: '1980',
    title: 'Statewide Reconstitution',
    titleMl: 'സംസ്ഥാന വ്യാപക വിപുലീകരണം',
    desc: 'Adopted the modern constitution, official white flag with red star, and the timeless motto "Study, Contemplate, Act" (പഠനം, മനനം, ചലനം).',
    descMl: 'ആധുനിക സംഘടനാ ഭരണഘടനയും ചുവന്ന നക്ഷത്രാങ്കിതമായ വെള്ളക്കൊടിയും "പഠനം, മനനം, ചലനം" എന്ന മുദ്രാവാക്യവും ഔദ്യോഗികമായി അംഗീകരിച്ചു.',
  },
  {
    year: '1990',
    title: 'Launch of Venalthumbikal',
    titleMl: 'വേനൽത്തുമ്പികളുടെ ജനനം',
    desc: 'Inauguration of the unique traveling children\'s theater troupe movement that tours villages across Kerala every summer.',
    descMl: 'ഗ്രാമീണ വേദികളിൽ കുട്ടികൾ തന്നെ നാടകങ്ങൾ രചിച്ച് അവതരിപ്പിക്കുന്ന വിഖ്യാതമായ വേനൽത്തുമ്പികൾ സാംസ്കാരിക പര്യടനത്തിന് തുടക്കം കുറിച്ചു.',
  },
  {
    year: '2014',
    title: '3rd State Conference, Palakkad',
    titleMl: '3-ാം സംസ്ഥാന സമ്മേളനം (പാലക്കാട്)',
    desc: 'Deliberated on expanding science camps, environmental clubs, and child rights advocacy across all 14 districts.',
    descMl: 'കുട്ടികളുടെ അവകാശ സംരക്ഷണത്തിനും പരിസ്ഥിതി പ്രവർത്തനങ്ങൾക്കും മുൻഗണന നൽകിക്കൊണ്ട് നടന്ന ചരിത്ര സമ്മേളനം.',
  },
  {
    year: '2016',
    title: '4th State Conference, Perinthalmanna',
    titleMl: '4-ാം സംസ്ഥാന സമ്മേളനം (പെരിന്തൽമണ്ണ)',
    desc: 'Strengthened neighborhood-level Kutti Koottams and anti-child-labor campaigns.',
    descMl: 'കുട്ടിക്കൂട്ടങ്ങളുടെ ശാക്തീകരണത്തിനും ബാലവേല വിരുദ്ധ പ്രചാരണങ്ങൾക്കും രൂപം നൽകി.',
  },
  {
    year: '2022',
    title: '6th State Conference, Thrissur',
    titleMl: '6-ാം സംസ്ഥാന സമ്മേളനം (തൃശ്ശൂർ)',
    desc: 'Focused on digital age creative literacy, child mental health, and inclusive community support.',
    descMl: 'ഡിജിറ്റൽ കാലത്തെ കുട്ടികളുടെ സർഗാത്മക വളർച്ചയും മാനസികാരോഗ്യവും പ്രധാന ചർച്ചാവിഷയമായി.',
  },
  {
    year: '2024',
    title: 'Kannur District Conference, Pilathara',
    titleMl: 'കണ്ണൂർ ജില്ലാ സമ്മേളനം (പിലാത്തറ)',
    desc: 'Elected the current Kannur District Committee leadership (President K. Surya, Secretary M.P. Gokul).',
    descMl: 'കെ. സൂര്യ പ്രസിഡന്റായും എം.പി. ഗോകുൽ സെക്രട്ടറിയായും പുതിയ ജില്ലാ നേതൃത്വത്തെ തിരഞ്ഞെടുത്തു.',
  },
  {
    year: '2026',
    title: 'District Conference at Kalliasseri',
    titleMl: 'ജില്ലാ സമ്മേളനം കല്ല്യാശ്ശേരിയിൽ',
    desc: 'The biennial district conference returns to the historic birthplace at Kalliasseri under the theme "Childhood of Struggle".',
    descMl: 'സംഘടനയുടെ ജന്മമണ്ണായ കല്ല്യാശ്ശേരിയിലേക്ക് "പോരാട്ടത്തിന്റെ ബാല്യം" എന്ന പ്രമേയമുയർത്തി ജില്ലാ സമ്മേളനം തിരിച്ചെത്തുന്നു.',
  },
];

export const HistoryPage = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';

  return (
    <div className="bg-soft-cream min-h-screen">
      <Breadcrumb
        items={[
          { label: 'About Us', labelMl: 'ഞങ്ങളെക്കുറിച്ച്', path: '/about' },
          { label: 'History & Heritage', labelMl: 'ചരിത്രവും പൈതൃകവും' },
        ]}
      />

      {/* Festive Hero Banner */}
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
            <span className={ml ? 'font-malayalam' : ''}>{ml ? '88 വർഷത്തെ അഭിമാന ചരിത്രം' : '88+ Years of Legacy (Since 1938)'}</span>
            <Sparkles className="w-3.5 h-3.5 text-sun-yellow" />
          </div>
          <h1 className={`text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-md ${ml ? 'font-malayalam' : ''}`}>
            {ml ? 'ബാലസംഘത്തിന്റെ ചരിത്ര വഴികൾ' : 'History & Heritage of Balasangham'}
          </h1>
          <p className={`text-base sm:text-xl text-amber-100 leading-relaxed max-w-2xl mx-auto drop-shadow-xs ${ml ? 'font-malayalam-body leading-[1.8]' : ''}`}>
            {ml
              ? '1938-ൽ കല്ല്യാശ്ശേരിയിൽ തുടക്കം കുറിച്ച്, കേരളത്തിലെ തലമുറകളെ ജനാധിപത്യബോധമുള്ളവരായി വളർത്തിയ ഐതിഹാസിക യാത്ര.'
              : 'From a small village gathering at Kalliasseri in 1938 to a million-strong progressive children’s movement across Kerala.'}
          </p>
        </div>
      </section>

      {/* Detailed Chronological Timeline */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-10 pb-4 border-b border-slate-200">
          <Calendar className="w-5 h-5 text-deep-red" />
          <h2 className={`text-2xl font-bold text-charcoal ${ml ? 'font-malayalam' : ''}`}>
            {ml ? 'പ്രധാന നാഴികക്കല്ലുകൾ' : 'Chronological Milestones'}
          </h2>
        </div>

        <div className="relative pl-6 sm:pl-8 border-l-2 border-deep-red/30 space-y-10">
          {fullMilestones.map((m, idx) => (
            <div key={idx} className="relative group">
              {/* Node dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-deep-red shadow-sm group-hover:scale-125 transition-transform" />

              <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-red-50 text-deep-red font-extrabold text-sm tracking-wide">
                    {m.year}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Verified Historical Record</span>
                </div>
                <h3 className={`text-lg font-bold text-charcoal mb-2 ${ml ? 'font-malayalam' : ''}`}>
                  {ml ? m.titleMl : m.title}
                </h3>
                <p className={`text-sm text-slate-600 leading-relaxed ${ml ? 'font-malayalam-body' : ''}`}>
                  {ml ? m.descMl : m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Existing History Section with Pioneers and Core Heritage */}
      <HistorySection />

      {/* Kalliasseri Heritage Focus */}
      <KalliasseriHeritage />
    </div>
  );
};
