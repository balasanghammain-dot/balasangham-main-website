import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { BalasanghamFlag } from '../motifs/BalasanghamFlag';
import { RedStarIcon } from '../motifs/RedStarIcon';
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '../common/SocialIcons';

export const Footer = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';

  return (
    <footer className="bg-charcoal text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Slogan */}
          <div className="space-y-4 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3">
              <BalasanghamFlag className="w-10 h-6" />
              <div className="flex flex-col">
                <span className={`text-xl font-bold tracking-tight text-white ${ml ? 'font-malayalam' : ''}`}>
                  {ml ? 'ബാലസംഘം' : 'Balasangham'}
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                  {ml ? 'കണ്ണൂർ ജില്ലാ കമ്മിറ്റി' : 'Kannur District Committee'}
                </span>
              </div>
            </Link>

            <div className="space-y-1">
              <p className="text-amber-400 font-bold font-malayalam text-lg">
                പഠനം, മനനം, ചലനം
              </p>
              <p className="text-slate-400 text-xs italic">
                Study, Contemplate, Act
              </p>
            </div>

            <p className={`text-xs text-slate-400 leading-relaxed ${ml ? 'font-malayalam-body' : ''}`}>
              {ml
                ? 'കുട്ടികളിൽ ജനാധിപത്യബോധവും മതനിരപേക്ഷതയും വളർത്തുന്ന കേരളത്തിലെ ഏറ്റവും വലിയ കുട്ടികളുടെ സാംസ്കാരിക പ്രസ്ഥാനം.'
                : 'Fostering democratic agency, scientific curiosity, and secular human fraternity across Kerala since 1938.'}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.facebook.com/balasangham.kannur/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-brand-red flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="Facebook Kannur"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/balasanghamkeralam/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-brand-red flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="Instagram Kerala"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@balasanghamkerala2817"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-brand-red flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="YouTube Channel"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: About & Governance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              {ml ? 'ഞങ്ങളെക്കുറിച്ച്' : 'About Organization'}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-medium">
              <li>
                <Link to="/about" className="text-slate-300 hover:text-brand-red transition-colors">
                  {ml ? 'ആമുഖം' : 'Who We Are'}
                </Link>
              </li>
              <li>
                <Link to="/about/history" className="text-slate-300 hover:text-brand-red transition-colors">
                  {ml ? 'ചരിത്ര വഴികൾ' : 'History & Heritage'}
                </Link>
              </li>
              <li>
                <Link to="/about/objectives" className="text-slate-300 hover:text-brand-red transition-colors">
                  {ml ? 'ലക്ഷ്യങ്ങൾ' : 'Mission & Objectives'}
                </Link>
              </li>
              <li>
                <Link to="/about/structure" className="text-slate-300 hover:text-brand-red transition-colors">
                  {ml ? 'സംഘടനാ ഘടന' : 'Democratic Structure'}
                </Link>
              </li>
              <li>
                <Link to="/about/leadership" className="text-slate-300 hover:text-brand-red transition-colors">
                  {ml ? 'ജില്ലാ നേതൃത്വം' : 'Kannur Leadership'}
                </Link>
              </li>
              <li>
                <Link to="/about/alumni" className="text-slate-300 hover:text-brand-red transition-colors">
                  {ml ? 'പൂർവകാല പ്രവർത്തകർ' : 'Notable Alumni'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Programs & Activities */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              {ml ? 'പ്രവർത്തനങ്ങൾ' : 'Activities & Media'}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-medium">
              <li>
                <Link to="/programs" className="text-slate-300 hover:text-brand-red transition-colors">
                  {ml ? 'എല്ലാ പരിപാടികളും' : 'All Programs'}
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-slate-300 hover:text-brand-red transition-colors">
                  {ml ? 'സമ്മേളനങ്ങൾ & ദിനാചരണങ്ങൾ' : 'Conferences & Events'}
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-slate-300 hover:text-brand-red transition-colors">
                  {ml ? 'ഔദ്യോഗിക വാർത്തകൾ' : 'Official News'}
                </Link>
              </li>
              <li>
                <Link to="/media" className="text-slate-300 hover:text-brand-red transition-colors">
                  {ml ? 'മീഡിയ & പോസ്റ്ററുകൾ' : 'Posters & Media Gallery'}
                </Link>
              </li>
              <li>
                <Link to="/publications" className="text-slate-300 hover:text-brand-red transition-colors">
                  {ml ? 'പ്രസിദ്ധീകരണങ്ങൾ (കിളിക്കൂട്)' : 'Publications (Kilikkoodu)'}
                </Link>
              </li>
              <li>
                <Link to="/join" className="text-amber-400 hover:text-amber-300 transition-colors font-bold">
                  {ml ? 'അംഗത്വം എങ്ങനെ നേടാം' : 'How to Join (Ages 5–16)'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Heritage & Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              {ml ? 'പൈതൃക കേന്ദ്രം' : 'Historic Origin'}
            </h4>
            <div className="text-xs text-slate-400 space-y-2 leading-relaxed">
              <p>
                <strong className="text-slate-200">Birthplace:</strong> Kalliasseri, Kannur District, Malabar
              </p>
              <p>
                <strong className="text-slate-200">First President:</strong> Comrade E.K. Nayanar (1938)
              </p>
              <p>
                <strong className="text-slate-200">Current Headquarters:</strong> Kannur District Committee, Kerala
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800 text-xs">
              <Link to="/contact" className="text-brand-red hover:underline font-bold">
                {ml ? 'സമ്പർക്ക വിവരങ്ങൾ കാണുക' : 'View Contact Information'} &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-2">
            <RedStarIcon className="w-3.5 h-3.5 text-brand-red" />
            <p>© {new Date().getFullYear()} Balasangham Kannur District Committee. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-slate-300 transition-colors">
              {ml ? 'സ്വകാര്യതാ നയം' : 'Privacy Policy'}
            </Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-slate-300 transition-colors">
              {ml ? 'നിബന്ധനകൾ' : 'Terms of Use'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
