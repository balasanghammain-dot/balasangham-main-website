import { useLanguage } from '../context/LanguageContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { organizationInfo } from '../data/organizationData';
import { Share2, MapPin, ShieldAlert } from 'lucide-react';
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '../components/common/SocialIcons';

export const ContactPage = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';

  return (
    <div className="bg-surface-cream min-h-screen">
      <Breadcrumb items={[{ label: 'Contact', labelMl: 'ബന്ധപ്പെടുക' }]} />

      <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-red mb-2 block">
            {ml ? 'ബന്ധപ്പെടുക' : 'Get in Touch'}
          </span>
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight mb-4 ${ml ? 'font-malayalam' : ''}`}>
            {ml ? 'സമ്പർക്ക വിവരങ്ങൾ' : 'Official Contact & Social Channels'}
          </h1>
          <p className={`text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto ${ml ? 'font-malayalam-body' : ''}`}>
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
              <Share2 className="w-5 h-5 text-brand-red" />
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
                    className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-surface-cream hover:border-brand-red hover:bg-red-50/20 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-red-100 text-brand-red flex items-center justify-center group-hover:bg-brand-red group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <strong className="block text-sm text-charcoal font-bold">{link.platform}</strong>
                        <span className="text-xs text-slate-500">{link.handle}</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-brand-red group-hover:translate-x-1 transition-transform">
                      Visit &rarr;
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Regional Committee Location */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className={`text-xl font-bold text-charcoal mb-6 flex items-center gap-2 ${ml ? 'font-malayalam' : ''}`}>
                <MapPin className="w-5 h-5 text-brand-red" />
                <span>{ml ? 'പ്രവർത്തന പരിധി & കേന്ദ്രം' : 'Jurisdiction & Office Location'}</span>
              </h2>

              <div className="space-y-4 text-sm text-slate-600">
                <div className="p-4 rounded-xl bg-surface-cream border border-slate-100">
                  <span className="text-xs font-bold uppercase text-brand-red block mb-1">
                    {ml ? 'ജില്ലാ കമ്മിറ്റി' : 'District Committee'}
                  </span>
                  <p className="font-bold text-charcoal text-base">
                    {ml ? 'ബാലസംഘം കണ്ണൂർ ജില്ലാ കമ്മിറ്റി' : 'Balasangham Kannur District Committee'}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">Kannur District, Kerala, India</p>
                </div>

                <div className="p-4 rounded-xl bg-surface-cream border border-slate-100">
                  <span className="text-xs font-bold uppercase text-brand-red block mb-1">
                    {ml ? 'ജന്മസ്ഥലം & 2026 സമ്മേളന വേദി' : 'Historic Origin & Conference Venue'}
                  </span>
                  <p className="font-bold text-charcoal text-base">
                    {ml ? 'പി.സി.ആർ ബാങ്ക് ഓഡിറ്റോറിയം, കല്ല്യാശ്ശേരി' : 'PCR Bank Auditorium, Kalliasseri'}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">Kalliasseri, Kannur District, Kerala</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                {ml
                  ? 'ബാലസംഘം പ്രവർത്തനങ്ങളിൽ പങ്കെടുക്കാനാഗ്രഹിക്കുന്നവർ പ്രാദേശിക ഏരിയ/യൂണിറ്റ് കൺവീനർമാരുമായി നേരിട്ട് ബന്ധപ്പെടുക.'
                  : 'For participation in local unit programs, connect with your designated neighborhood or school area convener.'}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
