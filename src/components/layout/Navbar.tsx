import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { BalasanghamFlag } from '../motifs/BalasanghamFlag';
import { LanguageToggle } from '../common/LanguageToggle';
import { Music, Menu, X, ChevronDown } from 'lucide-react';

interface NavbarProps {
  onOpenAnthem: () => void;
}

export const Navbar = ({ onOpenAnthem }: NavbarProps) => {
  const { language } = useLanguage();
  const ml = language === 'ml';
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setAboutDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAboutDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const aboutSublinks = [
    { to: '/about', label: 'Who We Are', labelMl: 'ഞങ്ങളെക്കുറിച്ച്' },
    { to: '/about/history', label: 'History & Heritage', labelMl: 'ചരിത്രവും പൈതൃകവും' },
    { to: '/about/objectives', label: 'Mission & Objectives', labelMl: 'ലക്ഷ്യങ്ങളും ദർശനവും' },
    { to: '/about/structure', label: 'Organization Structure', labelMl: 'സംഘടനാ ഘടന' },
    { to: '/about/leadership', label: 'Leadership (Kannur & State)', labelMl: 'നേതൃത്വം' },
    { to: '/about/alumni', label: 'Notable Alumni', labelMl: 'പ്രമുഖ പൂർവകാല പ്രവർത്തകർ' },
  ];

  const mainLinks = [
    { to: '/', label: 'Home', labelMl: 'ഹോം' },
    { to: '/programs', label: 'Programs', labelMl: 'പരിപാടികൾ' },
    { to: '/events', label: 'Events', labelMl: 'സമ്മേളനങ്ങൾ' },
    { to: '/news', label: 'News', labelMl: 'വാർത്തകൾ' },
    { to: '/media', label: 'Media', labelMl: 'മീഡിയ' },
    { to: '/publications', label: 'Publications', labelMl: 'പ്രസിദ്ധീകരണങ്ങൾ' },
    { to: '/contact', label: 'Contact', labelMl: 'സമ്പർക്കം' },
  ];

  const isAboutActive = location.pathname.startsWith('/about');

  return (
    <header className="sticky top-0 z-40 bg-[#FFF9EF]/95 backdrop-blur-md border-t-2 border-[#C90000] border-b border-[#241914]/10 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-200 ${isScrolled ? 'h-14 sm:h-16' : 'h-16 sm:h-20'}`}>
          {/* Logo & Brand Name */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-hidden focus:ring-2 focus:ring-[#C90000] rounded-md p-1 shrink-0 active:scale-[0.98] transition-transform"
          >
            <BalasanghamFlag className="w-10 h-6 sm:w-11 sm:h-6.5 transition-transform group-hover:scale-105" />
            <div className="flex flex-col">
              <span
                className={`text-lg sm:text-xl font-black tracking-tight text-[#171514] group-hover:text-[#C90000] transition-colors ${
                  ml ? 'font-malayalam' : ''
                }`}
              >
                {ml ? 'ബാലസംഘം' : 'Balasangham'}
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-[#241914]/70 uppercase tracking-widest -mt-0.5">
                {ml ? 'കണ്ണൂർ ജില്ലാ കമ്മിറ്റി' : 'Kannur District Committee'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-6 text-[13px] font-bold tracking-wide uppercase text-[#241914]/85">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `py-1.5 transition-colors border-b-2 active:scale-[0.98] ${
                  isActive
                    ? 'text-[#C90000] border-[#C90000] font-black'
                    : 'border-transparent hover:text-[#C90000] hover:border-[#C90000]'
                }`
              }
            >
              {ml ? 'ഹോം' : 'Home'}
            </NavLink>

            {/* About Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                className={`flex items-center gap-1 py-1.5 transition-colors border-b-2 active:scale-[0.98] ${
                  isAboutActive
                    ? 'text-[#C90000] border-[#C90000] font-black'
                    : 'border-transparent hover:text-[#C90000] hover:border-[#C90000]'
                }`}
              >
                <span>{ml ? 'ഞങ്ങളെക്കുറിച്ച്' : 'About'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {aboutDropdownOpen && (
                <div className="absolute top-full left-0 w-64 mt-2 bg-[#FFF9EF] rounded-xl shadow-lg border border-[#241914]/15 py-2 z-50 animate-in fade-in slide-in-from-top-1">
                  {aboutSublinks.map((sub, idx) => (
                    <Link
                      key={idx}
                      to={sub.to}
                      onClick={() => setAboutDropdownOpen(false)}
                      className={`block px-4 py-2 text-xs sm:text-sm text-[#241914] hover:bg-[#E9DDC9]/50 hover:text-[#C90000] font-medium transition-colors ${
                        location.pathname === sub.to ? 'text-[#C90000] font-bold bg-[#E9DDC9]/60' : ''
                      }`}
                    >
                      {ml ? sub.labelMl : sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {mainLinks.slice(1).map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `py-1.5 transition-colors border-b-2 active:scale-[0.98] ${
                    isActive
                      ? 'text-[#C90000] border-[#C90000] font-black'
                      : 'border-transparent hover:text-[#C90000] hover:border-[#C90000]'
                  }`
                }
              >
                {ml ? link.labelMl : link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <Link
              to="/join"
              className="px-3.5 py-1.5 text-xs font-bold rounded-md bg-[#C90000] text-white hover:bg-[#A30000] transition-all shadow-xs active:scale-[0.97]"
            >
              {ml ? 'അംഗത്വം' : 'Join Us'}
            </Link>

            <button
              type="button"
              onClick={onOpenAnthem}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md bg-[#E9DDC9] text-[#241914] hover:bg-[#C90000] hover:text-white transition-all duration-200 border border-[#241914]/15 active:scale-[0.97]"
            >
              <Music className="w-3.5 h-3.5 text-[#C90000]" />
              <span className={ml ? 'font-malayalam' : ''}>{ml ? 'കൊടിപ്പാട്ട്' : 'Flag Song'}</span>
            </button>

            <LanguageToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center gap-2">
            <LanguageToggle className="scale-90" />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-md text-[#241914] hover:text-[#C90000] hover:bg-[#E9DDC9]/50 min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-hidden focus:ring-2 focus:ring-[#C90000] active:scale-[0.97]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-[#241914]/15 bg-[#FFF9EF] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150 max-h-[85vh] overflow-y-auto shadow-xl">
          <nav className="flex flex-col space-y-1">
            <NavLink
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-bold active:scale-[0.98] ${
                  isActive ? 'bg-[#E9DDC9] text-[#C90000]' : 'text-[#241914] hover:bg-[#E9DDC9]/40'
                }`
              }
            >
              {ml ? 'ഹോം' : 'Home'}
            </NavLink>

            {/* About in Mobile */}
            <div className="px-3 py-1.5 font-bold text-xs uppercase tracking-wider text-[#241914]/50">
              {ml ? 'ഞങ്ങളെക്കുറിച്ച്' : 'About'}
            </div>
            <div className="pl-3 space-y-1 border-l-2 border-[#C90000]/30 ml-2">
              {aboutSublinks.map((sub, idx) => (
                <NavLink
                  key={idx}
                  to={sub.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-1.5 rounded-md text-sm font-semibold active:scale-[0.98] ${
                      isActive ? 'bg-[#E9DDC9] text-[#C90000] font-bold' : 'text-[#241914]/85 hover:bg-[#E9DDC9]/40'
                    }`
                  }
                >
                  {ml ? sub.labelMl : sub.label}
                </NavLink>
              ))}
            </div>

            <div className="pt-2 space-y-1 border-t border-[#241914]/10">
              {mainLinks.slice(1).map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-sm font-bold active:scale-[0.98] ${
                      isActive ? 'bg-[#E9DDC9] text-[#C90000]' : 'text-[#241914] hover:bg-[#E9DDC9]/40'
                    }`
                  }
                >
                  {ml ? link.labelMl : link.label}
                </NavLink>
              ))}

              <div className="pt-3 flex flex-col gap-2">
                <NavLink
                  to="/join"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-md text-center text-sm font-bold text-white bg-[#C90000] hover:bg-[#A30000] shadow-xs active:scale-[0.97]"
                >
                  {ml ? 'അംഗത്വത്തിൽ പങ്കാളിയാകൂ' : 'Join Balasangham'}
                </NavLink>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAnthem();
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-md text-xs font-bold text-[#241914] bg-[#E9DDC9] border border-[#241914]/15 active:scale-[0.97]"
                >
                  <Music className="w-3.5 h-3.5 text-[#C90000]" />
                  <span>{ml ? 'പതാകഗാനം ശ്രവിക്കുക' : 'Listen to Flag Song'}</span>
                </button>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
