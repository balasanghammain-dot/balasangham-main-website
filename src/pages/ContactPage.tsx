import { useLanguage } from '../context/LanguageContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { organizationInfo } from '../data/organizationData';
import { BackdropSunburst } from '../components/motifs/BackdropSunburst';
import { RedStarIcon } from '../components/motifs/RedStarIcon';
import { PeaceDove } from '../components/motifs/PeaceDove';
import { Share2, MapPin, Sparkles, Phone } from 'lucide-react';
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '../components/common/SocialIcons';

export const ContactPage = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';

  return (
    <div className="bg-soft-cream min-h-screen">
      <Breadcrumb items={[{ label: 'Contact', labelMl: 'ബന്ധപ്പെടുക' }]} />

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
            <span className={ml ? 'font-malayalam' : ''}>{ml ? 'സമ്പർക്ക വിവരങ്ങൾ' : 'Get in Touch'}</span>
            <Sparkles className="w-3.5 h-3.5 text-sun-yellow" />
          </div>
          <h1 className={`text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-md ${ml ? 'font-malayalam' : ''}`}>
            {ml ? 'സമ്പർക്ക വിവരങ്ങൾ' : 'Official Contact & Social Channels'}
          </h1>
          <p className={`text-base sm:text-xl text-amber-100 max-w-2xl mx-auto leading-relaxed drop-shadow-xs ${ml ? 'font-malayalam-body leading-[1.8]' : ''}`}>
            {ml
              ? 'ബാലസംഘം കണ്ണൂർ ജില്ലാ കമ്മിറ്റിയുടെ ഔദ്യോഗിക സാമൂഹിക മാധ്യമങ്ങളും ആശയവിനിമയ മാർഗ്ഗങ്ങളും.'
              : 'Connect with Balasangham Kannur through verified digital channels and local committee networks.'}
          </p>
        </div>
      </section>

      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Verified Social Media Channels */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h2 className={`text-xl font-bold text-charcoal mb-6 flex items-center gap-2 ${ml ? 'font-malayalam' : ''}`}>
              <Share2 className="w-5 h-5 text-deep-red" />
              <span>{ml ? 'ഔദ്യോഗിക സോഷ്യൽ മീഡിയ' : 'Verified Social Media Channels'}</span>
            </h2>

            <div className="space-y-4">
              {organizationInfo.socialLinks.map((link, idx) => {
                let Icon = FacebookIcon;
                if (link.platform.includes('Instagram')) Icon = InstagramIcon;
                if (link.platform.includes('YouTube')) Icon = YoutubeIcon;

                return (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-soft-cream hover:border-deep-red hover:bg-red-50/20 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-red-100 text-deep-red flex items-center justify-center group-hover:bg-deep-red group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <strong className="block text-sm text-charcoal font-bold">{link.platform}</strong>
                        <span className="text-xs text-slate-500">{link.handle}</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-deep-red group-hover:translate-x-1 transition-transform">
                      Visit &rarr;
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* District Committee Office */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className={`text-xl font-bold text-charcoal mb-6 flex items-center gap-2 ${ml ? 'font-malayalam' : ''}`}>
                <MapPin className="w-5 h-5 text-deep-red" />
                <span>{ml ? 'ജില്ലാ കമ്മിറ്റി ഓഫീസ്' : 'District Committee Office'}</span>
              </h2>

              <div className="space-y-4 text-sm">
                <div className="p-5 rounded-xl bg-soft-cream border border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-deep-red block mb-2">
                    {ml ? 'ഔദ്യോഗിക വിലാസം' : 'Official Office Address'}
                  </span>

                  <div className="space-y-1 font-malayalam leading-relaxed">
                    <p className="font-bold text-charcoal text-base">
                      {organizationInfo.contact.addressLines[0]}
                    </p>
                    <p className="text-slate-700">
                      {organizationInfo.contact.addressLines[1]}
                    </p>
                    <p className="text-slate-700">
                      {organizationInfo.contact.addressLines[2]}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/80">
                    <a
                      href={organizationInfo.contact.phoneTel}
                      className="inline-flex items-center gap-2.5 text-base font-bold text-charcoal hover:text-deep-red transition-colors py-2 min-h-[44px] group"
                      aria-label={`Call Balasangham Kannur District Committee at ${organizationInfo.contact.phone}`}
                    >
                      <span className="w-9 h-9 rounded-lg bg-red-100 text-deep-red flex items-center justify-center group-hover:bg-deep-red group-hover:text-white transition-colors shrink-0">
                        <Phone className="w-4 h-4" />
                      </span>
                      <span>
                        Phone: <span className="text-deep-red underline decoration-deep-red/40 group-hover:decoration-deep-red">{organizationInfo.contact.phone}</span>
                      </span>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
