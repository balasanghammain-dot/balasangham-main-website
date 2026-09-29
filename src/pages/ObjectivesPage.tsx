import { useLanguage } from '../context/LanguageContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { BackdropSunburst } from '../components/motifs/BackdropSunburst';
import { RedStarIcon } from '../components/motifs/RedStarIcon';
import { PeaceDove } from '../components/motifs/PeaceDove';
import { Vote, HeartHandshake, Compass, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

const pillars = [
  {
    icon: Vote,
    color: 'from-amber-500 to-amber-600',
    title: 'Democratic Agency & Self-Governance',
    titleMl: 'ജനാധിപത്യ പങ്കാളിത്തവും സ്വയംഭരണവും',
    desc: 'Children elect their own leadership, formulate demands, conduct deliberative assemblies, and lead discussions. Adults serve strictly in advisory, supportive capacities without superseding child agency.',
    descMl: 'കുട്ടികൾ സ്വയം ജനാധിപത്യ രീതിയിൽ നേതാക്കളെ തിരഞ്ഞെടുക്കുന്നു, ആവശ്യങ്ങൾ രൂപീകരിക്കുന്നു, തീരുമാനങ്ങളെടുക്കുന്നു. മുതിർന്നവർ രക്ഷാധികാരികളായും സഹായികളായും മാത്രം നിലകൊള്ളുന്നു.',
    points: [
      'Child-led secret ballot elections at unit level',
      'Preparation of Child Manifestos for local governments',
      'Practical training in parliamentary and civic leadership',
    ],
    pointsMl: [
      'യൂണിറ്റ് തലത്തിൽ കുട്ടികൾ നടത്തുന്ന ബാലറ്റ് തിരഞ്ഞെടുപ്പ്',
      'തദ്ദേശ സ്വയംഭരണ സ്ഥാപനങ്ങൾക്കായി കുട്ടികളുടെ അവകാശ പത്രിക',
      'ജനാധിപത്യ പ്രക്രിയയിലും സംവാദങ്ങളിലും നേരിട്ടുള്ള പരിശീലനം',
    ],
  },
  {
    icon: HeartHandshake,
    color: 'from-red-500 to-red-600',
    title: 'Secularism & Universal Human Fraternity',
    titleMl: 'മതേതരത്വവും മാനവ സാഹോദര്യവും',
    desc: 'Bringing children together irrespective of religion, caste, gender, economic status, or geographic background to foster deep, non-sectarian childhood friendship and solidarity.',
    descMl: 'ജാതി, മത, ലിംഗ, വർഗ്ഗ ഭേദമന്യേ എല്ലാ കുട്ടികളെയും ഒരുമിച്ച് ചേർക്കുന്നു. ശ്രീനാരായണ ഗുരുവിന്റെ സാഹോദര്യ ദർശനം ഉയർത്തിപ്പിടിക്കുന്നു.',
    points: [
      'Joint celebration of cultural festivals with equal joy',
      'Community dining ("Sodarathwena") breaking social barriers',
      'Zero discrimination in leadership and participation',
    ],
    pointsMl: [
      'എല്ലാ സാംസ്കാരിക ഉത്സവങ്ങളുടെയും കൂട്ടായ ആഘോഷം',
      'സാമൂഹിക അതിർവരമ്പുകൾ മായ്ച്ചുകളയുന്ന സ്നേഹവിരുന്നുകൾ',
      'നേതൃത്വത്തിലും പങ്കാളിത്തത്തിലും തുല്യനീതി',
    ],
  },
  {
    icon: Compass,
    color: 'from-blue-500 to-blue-600',
    title: 'Scientific Temper & Rational Inquiry',
    titleMl: 'ശാസ്ത്രബോധവും യുക്തിചിന്തയും',
    desc: 'Cultivating curiosity, empirical observation, environmental stewardship, and dismantling superstition through joyful discovery, astronomy camps, and hands-on experiments.',
    descMl: 'കുട്ടികളിൽ പ്രകൃതിസ്നേഹവും ശാസ്ത്രീയ അന്വേഷണത്വരയും വളർത്തുന്നു. അന്ധവിശ്വാസങ്ങൾക്കും അനാചാരങ്ങൾക്കുമെതിരെ ബോധവൽക്കരണം നൽകുന്നു.',
    points: [
      'Night sky-watching and astronomy exploration camps',
      'Local biodiversity documentation and green initiatives',
      'Popular science demonstrations countering blind belief',
    ],
    pointsMl: [
      'വാനനിരീക്ഷണ ക്യാമ്പുകളും ജ്യോതിശാസ്ത്ര പഠനവും',
      'പ്രാദേശിക ജൈവവൈവിധ്യ സംരക്ഷണവും പരിസ്ഥിതി പ്രവർത്തനങ്ങളും',
      'ശാസ്ത്ര പരീക്ഷണങ്ങളിലൂടെ യുക്തിചിന്ത വളർത്തൽ',
    ],
  },
  {
    icon: ShieldCheck,
    color: 'from-emerald-500 to-emerald-600',
    title: 'Child Rights & Social Protection',
    titleMl: 'ബാലാവകാശ സംരക്ഷണവും ജാഗ്രതയും',
    desc: 'Uncompromising vigilance against child labor, sexual exploitation, school dropouts, and substance abuse threats. Peer vigilance committees and child protection advocacy.',
    descMl: 'കുട്ടികൾക്കെതിരായ പീഡനങ്ങൾ, ബാലവേല, ലഹരി ഭീഷണികൾ എന്നിവയ്ക്കെതിരെ ശക്തമായ പ്രതിരോധം തീർക്കുന്നു. ബാലാവകാശങ്ങൾ സംരക്ഷിക്കാൻ നിലകൊള്ളുന്നു.',
    points: [
      'Campus-level anti-drug vigilance networks',
      'Right to Education defense and dropout intervention',
      'Safe childhood forums and child helpline awareness',
    ],
    pointsMl: [
      'സ്കൂളുകൾ കേന്ദ്രീകരിച്ചുള്ള ലഹരിവിരുദ്ധ ജാഗ്രതാ സമിതികൾ',
      'വിദ്യാഭ്യാസ അവകാശ സംരക്ഷണവും കൊഴിഞ്ഞുപോക്ക് തടയലും',
      'സുരക്ഷിത ബാല്യത്തിനായുള്ള നിയമ ബോധവൽക്കരണം',
    ],
  },
  {
    icon: Sparkles,
    color: 'from-purple-500 to-purple-600',
    title: 'Creative Arts, Literature & Culture',
    titleMl: 'സർഗ്ഗാത്മക കലയും സംസ്കാരവും',
    desc: 'Fostering drama, literature, folk arts, street theater, and joyful self-expression where inclusion and collective expression always take precedence over commercial competition.',
    descMl: 'കുട്ടികളുടെ സർഗാത്മകതയും പ്രതിഭയും പരിപോഷിപ്പിക്കാൻ നാടകം, സാഹിത്യം, നാടൻ കലകൾ എന്നിവയിൽ വേദി ഒരുക്കുന്നു.',
    points: [
      'Venalthumbikal traveling summer theater movement',
      'Publication of original writing in Kilikkoodu magazine',
      'Art festivals prioritizing participation over commercial trophies',
    ],
    pointsMl: [
      'വേനൽത്തുമ്പികൾ കുട്ടികളുടെ തെരുവ് നാടക പ്രസ്ഥാനം',
      'കിളിക്കൂട് മാസികയിലൂടെ കുട്ടികളുടെ രചനകൾക്ക് പ്രസിദ്ധീകരണം',
      'മത്സരത്തിന് പകരം പങ്കാളിത്തത്തിന് ഊന്നൽ നൽകുന്ന കലോത്സവങ്ങൾ',
    ],
  },
];

export const ObjectivesPage = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';

  return (
    <div className="bg-surface-cream min-h-screen">
      <Breadcrumb
        items={[
          { label: 'About Us', labelMl: 'ഞങ്ങളെക്കുറിച്ച്', path: '/about' },
          { label: 'Mission & Objectives', labelMl: 'ലക്ഷ്യങ്ങളും ദർശനവും' },
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
            <span className={ml ? 'font-malayalam' : ''}>{ml ? 'ദർശനവും ലക്ഷ്യങ്ങളും' : 'Mission & Core Vision'}</span>
            <Sparkles className="w-3.5 h-3.5 text-sun-yellow" />
          </div>
          <h1 className={`text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-md ${ml ? 'font-malayalam' : ''}`}>
            {ml ? 'ലക്ഷ്യങ്ങളും ദർശനവും' : 'Mission & Core Objectives'}
          </h1>
          <p className={`text-base sm:text-xl text-amber-100 leading-relaxed max-w-3xl mx-auto drop-shadow-xs ${ml ? 'font-malayalam-body leading-[1.8]' : ''}`}>
            {ml
              ? 'ബാലസംഘത്തിന്റെ പ്രവർത്തനങ്ങളെ നയിക്കുന്ന അഞ്ച് അടിസ്ഥാന സ്തംഭങ്ങൾ: ജനാധിപത്യം, മതേതരത്വം, ശാസ്ത്രബോധം, അവകാശ സംരക്ഷണം, സർഗ്ഗാത്മകത.'
              : 'The five foundational pillars that guide Balasangham\'s child-centered initiatives across every village, town, and district of Kerala.'}
          </p>
        </div>
      </section>

      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row items-start gap-5">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.color} text-white flex items-center justify-center shrink-0 shadow-sm`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-brand-red tracking-wider uppercase">
                        {ml ? `സ്തംഭം 0${i + 1}` : `Pillar 0${i + 1}`}
                      </span>
                    </div>
                    <h2 className={`text-xl sm:text-2xl font-bold text-charcoal mb-3 ${ml ? 'font-malayalam' : ''}`}>
                      {ml ? pillar.titleMl : pillar.title}
                    </h2>
                    <p className={`text-sm sm:text-base text-slate-600 leading-relaxed mb-5 ${ml ? 'font-malayalam-body' : ''}`}>
                      {ml ? pillar.descMl : pillar.desc}
                    </p>

                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        {ml ? 'പ്രധാന പ്രവർത്തനങ്ങൾ' : 'Key Concrete Realizations'}
                      </h3>
                      <ul className="space-y-2">
                        {(ml ? pillar.pointsMl : pillar.points).map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
