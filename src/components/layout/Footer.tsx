import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { BalasanghamFlag } from '../motifs/BalasanghamFlag';
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '../common/SocialIcons';
import { Sparkles } from 'lucide-react';

export const Footer = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';

  return (
    <footer className="bg-ink text-cream pt-16 pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-12 border-t-2 border-berry">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-cream/15">
          {/* Col 1: Brand & Slogan */}
          <div className="space-y-4 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3">
              <div className="p-1 rounded-xl bg-white shadow-xs border border-festival/30">
                <BalasanghamFlag className="w-9 h-5.5 sm:w-10 sm:h-6" />
              </div>
              <div className="flex flex-col">
                <span className={`text-xl font-black tracking-tight text-white ${ml ? 'font-malayalam' : ''}`}>
                  {ml ? 'ബാലസംഘം' : 'Balasangham'}
                </span>
                <span className="text-[10px] text-festival uppercase tracking-widest font-bold">
                  {ml ? 'കണ്ണൂർ ജില്ലാ കമ്മിറ്റി' : 'Kannur District Committee'}
                </span>
              </div>
            </Link>

            <div className="space-y-1">
              <p className="text-festival font-bold font-malayalam text-lg flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-festival animate-twinkle" />
                പഠനം, മനനം, ചലനം
              </p>
              <p className="text-cream/60 text-xs italic">
                Study, Contemplate, Act
              </p>
            </div>

            <p className={`text-xs text-cream/75 leading-relaxed ${ml ? 'font-malayalam-body' : ''}`}>
              {ml
                ? 'കുട്ടികളിൽ ജനാധിപത്യബോധവും മതനിരപേക്ഷതയും വളർത്തുന്ന കേരളത്തിലെ ഏറ്റവും വലിയ കുട്ടികളുടെ സാംസ്കാരിക പ്രസ്ഥാനം.'
                : 'Fostering democratic agency, scientific curiosity, and secular human fraternity across Kerala since 1938.'}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.facebook.com/balasangham.kannur/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-cream/10 hover:bg-berry flex items-center justify-center text-cream hover:text-white transition-all hover:scale-105"
                aria-label="Facebook Kannur"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/balasanghamkeralam/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-cream/10 hover:bg-berry flex items-center justify-center text-cream hover:text-white transition-all hover:scale-105"
                aria-label="Instagram Kerala"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@balasanghamkerala2817"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-cream/10 hover:bg-berry flex items-center justify-center text-cream hover:text-white transition-all hover:scale-105"
                aria-label="YouTube Channel"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: About & Governance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-festival">
              {ml ? 'ഞങ്ങളെക്കുറിച്ച്' : 'About Organization'}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-medium">
              <li>
                <Link to="/about" className="text-cream/80 hover:text-festival transition-colors">
                  {ml ? 'ആമുഖം' : 'Who We Are'}
                </Link>
              </li>
              <li>
                <Link to="/about/history" className="text-cream/80 hover:text-festival transition-colors">
                  {ml ? 'ചരിത്ര വഴികൾ' : 'History & Heritage'}
                </Link>
              </li>
              <li>
                <Link to="/about/objectives" className="text-cream/80 hover:text-festival transition-colors">
                  {ml ? 'ലക്ഷ്യങ്ങൾ' : 'Mission & Objectives'}
                </Link>
              </li>
              <li>
                <Link to="/about/structure" className="text-cream/80 hover:text-festival transition-colors">
                  {ml ? 'സംഘടനാ ഘടന' : 'Democratic Structure'}
                </Link>
              </li>
              <li>
                <Link to="/about/leadership" className="text-cream/80 hover:text-festival transition-colors">
                  {ml ? 'നേതൃത്വം' : 'Leadership'}
                </Link>
              </li>
              <li>
                <Link to="/about/alumni" className="text-cream/80 hover:text-festival transition-colors">
                  {ml ? 'പൂർവകാല പ്രവർത്തകർ' : 'Notable Alumni'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Programs & Culture */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-festival">
              {ml ? 'പ്രവർത്തനങ്ങൾ' : 'Flagship Programs'}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-medium">
              <li>
                <Link to="/programs/venalthumbikal" className="text-cream/80 hover:text-festival transition-colors">
                  {ml ? 'വേനൽത്തുമ്പികൾ കലാജാഥ' : 'Venalthumbikal Troupe'}
                </Link>
              </li>
              <li>
                <Link to="/programs/venal-kalari" className="text-cream/80 hover:text-festival transition-colors">
                  {ml ? 'വേനൽ കളരി ക്യാമ്പുകൾ' : 'Venal Kalari Camps'}
                </Link>
              </li>
              <li>
                <Link to="/programs/kilikkoodu" className="text-cream/80 hover:text-festival transition-colors">
                  {ml ? 'കിളിക്കൂട് മാസിക' : 'Kilikkoodu Journal'}
                </Link>
              </li>
              <li>
                <Link to="/programs/shasthra-deepthi" className="text-cream/80 hover:text-festival transition-colors">
                  {ml ? 'ശാസ്ത്ര ദീപ്തി' : 'Science Deepthi'}
                </Link>
              </li>
              <li>
                <Link to="/programs/kutti-koottams" className="text-cream/80 hover:text-festival transition-colors">
                  {ml ? 'കുട്ടിക്കൂട്ടങ്ങൾ' : 'Kutti Koottams'}
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-cream/80 hover:text-festival transition-colors">
                  {ml ? 'ജില്ലാ സമ്മേളനം 2026' : 'District Conference 2026'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-festival">
              {ml ? 'കണ്ണൂർ ഓഫീസ്' : 'Kannur Headquarters'}
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-cream/80 font-medium">
              <p>
                {ml ? 'ബാലസംഘം ജില്ലാ കമ്മിറ്റി ഓഫീസ്' : 'Balasangham District Committee Office'}
              </p>
              <p>
                {ml ? 'എ.കെ.ജി ഭവൻ, കണ്ണൂർ - 670001' : 'AKG Bhavan, Kannur - 670001, Kerala'}
              </p>
              <p className="pt-2 text-festival font-bold">
                Phone: +91 497 270 0000
              </p>
              <p className="text-cream/70">
                Email: balasanghamkannur@gmail.com
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream/60 gap-4">
          <p>© {new Date().getFullYear()} Balasangham Kannur. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Designed with democratic pride & secular solidarity for children of Kerala.
          </p>
        </div>
      </div>
    </footer>
  );
};
