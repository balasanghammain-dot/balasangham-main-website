import { useLanguage } from '../context/LanguageContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { GovernanceDiagram } from '../components/sections/GovernanceDiagram';
import { BackdropSunburst } from '../components/motifs/BackdropSunburst';
import { RedStarIcon } from '../components/motifs/RedStarIcon';
import { PeaceDove } from '../components/motifs/PeaceDove';
import { Shield, Users, Award, Sparkles } from 'lucide-react';

const structuralTiers = [
  {
    tier: 'Unit (യൂണിറ്റ്)',
    title: 'Neighborhood & School Units',
    desc: 'The foundational bedrock located in every residential ward, village, and school. Neighborhood children hold fortnightly meetings, elect their own unit president and secretary through secret ballot, and plan community activities.',
    descMl: 'ഓരോ പ്രദേശത്തെയും കുട്ടികൾ ഒത്തുചേരുന്ന അടിസ്ഥാന ഘടകം. കുട്ടികൾ സ്വയം ജനാധിപത്യപരമായി പ്രസിഡന്റിനെയും സെക്രട്ടറിയെയും തിരഞ്ഞെടുക്കുന്നു.',
    scope: '20,000+ across Kerala; hundreds active across Kannur',
  },
  {
    tier: 'Village / Area (വില്ലേജ് / ഏരിയ)',
    title: 'Area Committees',
    desc: 'Federates local neighborhood units within an area (such as Pinarayi, Taliparamba, Payyannur, Thalassery, Kannur City, etc.). Coordinates Venal Kalari camps, area conferences, and local campaigns.',
    descMl: 'ഒരു പ്രദേശത്തെ യൂണിറ്റുകളെ ഏകോപിപ്പിക്കുന്ന ഏരിയ കമ്മിറ്റികൾ. ഏരിയ സമ്മേളനങ്ങളിലൂടെ കുട്ടികളുടെ പ്രതിനിധികൾ നേതൃത്വത്തെ തിരഞ്ഞെടുക്കുന്നു.',
    scope: 'Sub-district geographic clusters',
  },
  {
    tier: 'District (ജില്ല)',
    title: 'Kannur District Committee',
    desc: 'Kannur District Conference brings together elected delegates from all area committees to elect the District President, Secretary, and committee, guiding districtwide programs and state representation.',
    descMl: 'ജില്ലയിലെ മുഴുവൻ ഏരിയകളിൽ നിന്നുമുള്ള പ്രതിനിധികൾ പങ്കെടുക്കുന്ന ജില്ലാ സമ്മേളനം നേതൃത്വത്തെ തിരഞ്ഞെടുക്കുന്നു.',
    scope: 'Kannur District jurisdiction (Birthplace district)',
  },
  {
    tier: 'State (സംസ്ഥാനം)',
    title: 'State Committee & Council',
    desc: 'Apex deliberative body representing over one million children across Kerala\'s 14 revenue districts. Meets triennially at the State Conference.',
    descMl: 'കേരളത്തിലെ 14 ജില്ലകളിലെയും ലക്ഷക്കണക്കിന് കുട്ടികളെ പ്രതിനിധീകരിക്കുന്ന പരമോന്നത സമിതി.',
    scope: 'Statewide apex governance',
  },
];

export const StructurePage = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';

  return (
    <div className="bg-soft-cream min-h-screen">
      <Breadcrumb
        items={[
          { label: 'About Us', labelMl: 'ഞങ്ങളെക്കുറിച്ച്', path: '/about' },
          { label: 'Organization Structure', labelMl: 'സംഘടനാ ഘടന' },
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
            <span className={ml ? 'font-malayalam' : ''}>{ml ? 'സംഘടനാ ഘടന' : 'Democratic Architecture'}</span>
            <Sparkles className="w-3.5 h-3.5 text-sun-yellow" />
          </div>
          <h1 className={`text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-md ${ml ? 'font-malayalam' : ''}`}>
            {ml ? 'ജനാധിപത്യ സംഘടനാ ഘടന' : 'Democratic Organization Structure'}
          </h1>
          <p className={`text-base sm:text-xl text-amber-100 leading-relaxed max-w-3xl mx-auto drop-shadow-xs ${ml ? 'font-malayalam-body leading-[1.8]' : ''}`}>
            {ml
              ? 'യൂണിറ്റ് മുതൽ സംസ്ഥാന തലം വരെ കുട്ടികൾ വോട്ടവകാശത്തിലൂടെ നേതാക്കളെ തിരഞ്ഞെടുക്കുന്ന മാതൃകാപരമായ ജനാധിപത്യ ഘടന.'
              : 'Balasangham practices internal democracy where child members elect their own leaders, deliberate resolutions, and set policy at every level.'}
          </p>
        </div>
      </section>

      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Visual Governance Diagram */}
        <div className="mb-16">
          <GovernanceDiagram />
        </div>

        {/* Four Tiers Breakdown */}
        <div className="space-y-6 mb-16">
          <h2 className={`text-2xl font-bold text-charcoal mb-4 ${ml ? 'font-malayalam' : ''}`}>
            {ml ? 'ഘടനാ തട്ടുകൾ' : 'Organizational Hierarchy'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {structuralTiers.map((tier, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-deep-red">
                      {tier.tier}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">Level 0{idx + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold text-charcoal mb-2">
                    {tier.title}
                  </h3>
                  <p className={`text-sm text-slate-600 leading-relaxed mb-4 ${ml ? 'font-malayalam-body' : ''}`}>
                    {ml ? tier.descMl : tier.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 text-xs font-medium text-slate-500">
                  <span className="font-semibold text-slate-700">Scope:</span> {tier.scope}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Child Agency & Adult Support Principles */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-deep-red" />
            <h2 className={`text-xl font-bold text-charcoal ${ml ? 'font-malayalam' : ''}`}>
              {ml ? 'കുട്ടികളുടെ സ്വയംഭരണവും മുതിർന്നവരുടെ പങ്കും' : 'Child Self-Governance & Adult Mentorship'}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700">
            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-100">
              <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-amber-700" />
                <span>{ml ? 'കുട്ടികളുടെ നേതൃത്വം' : 'Child Leadership (Presidents & Secretaries)'}</span>
              </h3>
              <p className="text-slate-600">
                {ml
                  ? 'പ്രസിഡന്റ്, സെക്രട്ടറി തുടങ്ങിയ എല്ലാ പ്രധാന ഭാരവാഹിത്വങ്ങളും കുട്ടികൾ തന്നെ വഹിക്കുന്നു. പ്രമേയങ്ങൾ തയ്യാറാക്കുന്നതും യോഗങ്ങൾ നയിക്കുന്നതും കുട്ടികളാണ്.'
                  : 'All executive officer positions (President, Secretary, Vice Presidents, Joint Secretaries) are strictly held by child members under 16 years of age.'}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100">
              <h3 className="font-bold text-sky-900 mb-2 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-sky-700" />
                <span>{ml ? 'രക്ഷാധികാരികളും കൺവീനർമാരും' : 'Adult Conveners & Advisory Role'}</span>
              </h3>
              <p className="text-slate-600">
                {ml
                  ? 'മുതിർന്ന അധ്യാപകരും സാമൂഹിക പ്രവർത്തകരും കൺവീനർമാരായി കുട്ടികൾക്ക് വഴികാട്ടികളാകുന്നു, എന്നാൽ കുട്ടികളുടെ തീരുമാനങ്ങളിൽ ഇടപെടുന്നില്ല.'
                  : 'Adult educators, mentors, and conveners provide logistical facilitation, safety, and guidance without infringing on child decision-making.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
