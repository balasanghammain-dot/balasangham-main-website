import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { BackdropSunburst } from '../components/motifs/BackdropSunburst';
import { RedStarIcon } from '../components/motifs/RedStarIcon';
import { PeaceDove } from '../components/motifs/PeaceDove';
import { ArrowRight, Sparkles, MapPin, Users, HeartHandshake } from 'lucide-react';

export const JoinPage = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';

  return (
    <div className="bg-soft-cream min-h-screen">
      <Breadcrumb items={[{ label: 'How to Join', labelMl: 'എങ്ങനെ ചേരാം' }]} />

      {/* Festive Hero Banner with Jumping Children */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FBC02D] via-[#F57F17] to-[#D32F2F] text-white py-16 sm:py-20">
        <BackdropSunburst className="opacity-40" />

        {/* Flanking Peace Doves */}
        <div className="absolute top-8 left-8 text-white/70 pointer-events-none hidden md:block">
          <PeaceDove filled className="w-16 h-12" />
        </div>
        <div className="absolute top-10 right-8 text-white/70 pointer-events-none hidden md:block scale-x-[-1]">
          <PeaceDove filled className="w-16 h-12" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 shadow-sm">
            <RedStarIcon className="w-4 h-4 text-white" />
            <span className={ml ? 'font-malayalam' : ''}>{ml ? 'അംഗത്വ വിവരങ്ങൾ' : 'Membership & Participation'}</span>
            <Sparkles className="w-3.5 h-3.5 text-sun-yellow" />
          </div>

          <h1 className={`text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-md ${ml ? 'font-malayalam' : ''}`}>
            {ml ? 'ബാലസംഘത്തിൽ എങ്ങനെ പങ്കാളിയാകാം?' : 'How to Join Balasangham'}
          </h1>

          <p className={`text-base sm:text-xl text-amber-100 leading-relaxed max-w-3xl mx-auto mb-8 drop-shadow-xs ${ml ? 'font-malayalam-body leading-[1.8]' : ''}`}>
            {ml
              ? '6 മുതൽ 18 വയസ്സുവരെയുള്ള എല്ലാ കുട്ടികൾക്കും സൗജന്യമായി ബാലസംഘം പ്രാദേശിക യൂണിറ്റുകളിൽ അംഗമാകാം. സ്നേഹത്തിന്റെയും സർഗ്ഗാത്മകതയുടെയും ലോകത്തേക്ക് സ്വാഗതം!'
              : 'Balasangham warmly welcomes every child between ages 6 and 18 across Kerala. Open, free, and democratic participation in neighborhood units.'}
          </p>

          {/* Joyful Children graphic */}
          <div className="flex justify-center -mb-8 sm:-mb-12">
            <img
              src="/images/happy-children-jumping.png"
              alt="Happy children jumping together"
              className="w-full max-w-lg h-auto object-contain drop-shadow-2xl pointer-events-none"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Main Participation Guide Section */}
      <section className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200/90 shadow-xl mb-10">
          <div className="text-center sm:text-left mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-deep-red mb-1 block">
              {ml ? 'ഘട്ടങ്ങൾ' : '3 Simple Steps'}
            </span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold text-charcoal ${ml ? 'font-malayalam' : ''}`}>
              {ml ? 'പങ്കാളിത്ത മാർഗ്ഗങ്ങൾ' : 'How the Membership Process Works'}
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                step: '01',
                icon: MapPin,
                title: 'Locate Your Neighborhood Unit',
                titleMl: 'പ്രാദേശിക യൂണിറ്റ് കണ്ടെത്തുക',
                desc: 'Balasangham operates tens of thousands of neighborhood units (കുട്ടിക്കൂട്ടങ്ങൾ) across Kannur. Units meet weekly or fortnightly in village wards, community centres, and school clusters.',
                descMl: 'കണ്ണൂരിലെ ഓരോ വാർഡിലും വില്ലേജിലും പ്രവർത്തിക്കുന്ന അടുത്തുള്ള കുട്ടിക്കൂട്ടവുമായോ യൂണിറ്റുമായോ ബന്ധപ്പെടുക. നിങ്ങളുടെ പ്രദേശത്തെ കമ്മിറ്റിയുമായി ചേരുക.',
              },
              {
                step: '02',
                icon: Users,
                title: 'Age Eligibility (6 to 18 Years)',
                titleMl: 'പ്രായപരിധി (6 മുതൽ 18 വയസ്സ് വരെ)',
                desc: 'Open to all children regardless of caste, creed, religion, or gender. No admission or commercial subscription fee is required for participation in basic unit activities.',
                descMl: 'ജാതി-മത-സാമ്പത്തിക അതിർവരമ്പുകളില്ലാതെ 6 മുതൽ 18 വയസ്സുവരെയുള്ള ഏത് കുട്ടിക്കും ഇതിൽ പങ്കാളിയാകാം. യാതൊരുവിധ വാണിജ്യ ഫീസുകളുമില്ല.',
              },
              {
                step: '03',
                icon: HeartHandshake,
                title: 'Democratic Participation & Leadership',
                titleMl: 'ജനാധിപത്യ പങ്കാളിത്തവും സർഗ്ഗവേദിയും',
                desc: 'Every registered child member has the right to attend unit assemblies, propose creative activities, vote in child elections, and stand for child leadership offices.',
                descMl: 'വാർഷിക യൂണിറ്റ് യോഗങ്ങളിൽ പങ്കെടുക്കാനും വോട്ട് ചെയ്യാനും കലാ-സാഹിത്യ-ശാസ്ത്ര കളരികളിൽ പങ്കെടുക്കാനും കുട്ടികൾക്ക് തുല്യ അവകാശമുണ്ട്.',
              },
            ].map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row items-start gap-4 p-6 rounded-2xl bg-soft-cream/80 border border-slate-200 hover:border-deep-red/40 hover:bg-white hover:shadow-md transition-all duration-200"
                >
                  <div className="w-12 h-12 rounded-2xl bg-deep-red/10 text-deep-red flex items-center justify-center font-black text-base shrink-0 shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-deep-red uppercase tracking-wider">
                        {ml ? `ഘട്ടം ${s.step}` : `Step ${s.step}`}
                      </span>
                    </div>
                    <h3 className={`text-lg sm:text-xl font-bold text-charcoal mb-2 ${ml ? 'font-malayalam' : ''}`}>
                      {ml ? s.titleMl : s.title}
                    </h3>
                    <p className={`text-sm text-slate-600 leading-relaxed ${ml ? 'font-malayalam-body leading-[1.75]' : ''}`}>
                      {ml ? s.descMl : s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-deep-red text-white font-extrabold text-sm sm:text-base shadow-xl hover:bg-red-700 transition-all duration-200"
          >
            <span className={ml ? 'font-malayalam' : ''}>{ml ? 'ജില്ലാ സമ്പർക്ക വിവരങ്ങൾ കാണുക' : 'View District Contact Channels'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};
