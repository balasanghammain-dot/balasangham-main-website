import { useLanguage } from '../context/LanguageContext';
import { Breadcrumb } from '../components/common/Breadcrumb';

export const PrivacyPage = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';

  return (
    <div className="bg-soft-cream min-h-screen">
      <Breadcrumb items={[{ label: 'Privacy Policy', labelMl: 'സ്വകാര്യതാ നയം' }]} />

      <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-deep-red mb-2 block">
            {ml ? 'നിയമപരമായ വിവരങ്ങൾ' : 'Legal & Compliance'}
          </span>
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight mb-4 ${ml ? 'font-malayalam' : ''}`}>
            {ml ? 'സ്വകാര്യതാ നയം' : 'Privacy Policy'}
          </h1>
          <p className={`text-xs sm:text-sm text-slate-500 ${ml ? 'font-malayalam' : ''}`}>
            {ml
              ? 'അവസാനം പുതുക്കിയത്: സെപ്റ്റംബർ 2026 • ബാലസംഘം കണ്ണൂർ ജില്ലാ കമ്മിറ്റി'
              : 'Last Updated: September 2026 • Balasangham Kannur District Committee'}
          </p>
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200 shadow-sm space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <div>
            <h2 className={`text-xl font-bold text-charcoal mb-3 ${ml ? 'font-malayalam' : ''}`}>
              {ml ? '1. കുട്ടികളുടെ സുരക്ഷയും ഓൺലൈൻ സംരക്ഷണവും' : '1. Child Safety & Online Protection'}
            </h2>
            <p className={ml ? 'font-malayalam-body leading-[1.8]' : ''}>
              {ml
                ? 'കുട്ടികളുടെ സുരക്ഷയ്ക്കും ആത്മാഭിമാനത്തിനും ക്ഷേമത്തിനുമാണ് ബാലസംഘം മുൻഗണന നൽകുന്നത്. ഈ വെബ്‌സൈറ്റിലൂടെ കുട്ടികളുടെ സ്വകാര്യ വിവരങ്ങൾ ശേഖരിക്കുകയോ വാണിജ്യ ആവശ്യങ്ങൾക്ക് ഉപയോഗിക്കുകയോ ചെയ്യുന്നില്ല.'
                : 'Balasangham is dedicated to the safety, dignity, and wellbeing of children. We do not solicit, harvest, or monetize personal identifiable information (PII) of children through this website.'}
            </p>
          </div>

          <div>
            <h2 className={`text-xl font-bold text-charcoal mb-3 ${ml ? 'font-malayalam' : ''}`}>
              {ml ? '2. വിവരശേഖരണവും നിരീക്ഷണവും' : '2. Data Collection & Analytics'}
            </h2>
            <p className={ml ? 'font-malayalam-body leading-[1.8]' : ''}>
              {ml
                ? 'ഈ വെബ്‌സൈറ്റ് വിവരങ്ങൾ ലഭ്യമാക്കുന്നതിനായി മാത്രമുള്ളതാണ്. ഇവിടെ ട്രാക്കിംഗ് കുക്കികളോ വാണിജ്യ പരസ്യങ്ങളോ മൂന്നാം കക്ഷി മാർക്കറ്റിംഗ് കോഡുകളോ ഉപയോഗിക്കുന്നില്ല. ഉപയോക്താക്കളുടെ വിവരങ്ങൾ ഏതെങ്കിലും വാണിജ്യ സ്ഥാപനങ്ങൾക്ക് കൈമാറുകയോ വിൽക്കുകയോ ചെയ്യില്ല.'
                : 'This informational website does not use tracking cookies, commercial advertising beacons, or third-party marketing pixels. We do not sell or trade user data to any external commercial entity.'}
            </p>
          </div>

          <div>
            <h2 className={`text-xl font-bold text-charcoal mb-3 ${ml ? 'font-malayalam' : ''}`}>
              {ml ? '3. ബാഹ്യ ലിങ്കുകൾ' : '3. External Links'}
            </h2>
            <p className={ml ? 'font-malayalam-body leading-[1.8]' : ''}>
              {ml
                ? 'ഔദ്യോഗിക അറിയിപ്പുകൾക്കായി വെബ്‌സൈറ്റിൽ ഔദ്യോഗിക സോഷ്യൽ മീഡിയ പേജുകളിലേക്ക് (ഫേസ്ബുക്ക്, ഇൻസ്റ്റാഗ്രാം, യൂട്യൂബ്) ഉള്ള ലിങ്കുകൾ നൽകിയിട്ടുണ്ട്. ഈ പ്ലാറ്റ്‌ഫോമുകൾ സന്ദർശിക്കുമ്പോൾ അവയുടെ സ്വകാര്യതാ നയങ്ങൾ പരിശോധിക്കാൻ നിർദ്ദേശിക്കുന്നു.'
                : 'Our pages contain links to external verified social platforms (Facebook, Instagram, YouTube) for official announcements. Visitors should review the independent privacy policies of those third-party services when leaving this site.'}
            </p>
          </div>

          <div>
            <h2 className={`text-xl font-bold text-charcoal mb-3 ${ml ? 'font-malayalam' : ''}`}>
              {ml ? '4. ബൗദ്ധിക സ്വത്തും ആർക്കൈവൽ ചിത്രങ്ങളും' : '4. Intellectual Property & Archival Photography'}
            </h2>
            <p className={ml ? 'font-malayalam-body leading-[1.8]' : ''}>
              {ml
                ? 'സംഘടനയുടെ ചിഹ്നങ്ങൾ, പതാക, ഔദ്യോഗിക ഗാനങ്ങൾ, ചരിത്ര ചിത്രങ്ങൾ, സമ്മേളന പോസ്റ്ററുകൾ എന്നിവ ബാലസംഘത്തിന്റെ പൈതൃക സ്വത്താണ്. ഇവ അനുമതിയില്ലാതെ വാണിജ്യ ആവശ്യങ്ങൾക്ക് ഉപയോഗിക്കുന്നത് കർശനമായി നിരോധിച്ചിരിക്കുന്നു.'
                : 'All organizational emblems, flag motifs, official songs, and conference poster artworks are the heritage property of Balasangham. Reproduction for unauthorized commercial purposes is prohibited.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
