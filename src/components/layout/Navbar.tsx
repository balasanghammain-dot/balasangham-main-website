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
    <header className="sticky top-0 z-40 bg-[#FFFDF7]/95 backdrop-blur-md border-t-2 border-[#D32020] border-b border-[#2A1610]/15 pt-safe transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-200 ${isScrolled ? 'h-14 sm:h-16' : 'h-16 sm:h-20'}`}>
          {/* Logo & Brand Name */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-hidden focus:ring-2 focus:ring-berry rounded-full p-1 shrink-0 active:scale-[0.98] transition-transform"
          >
            <div className="p-1 rounded-xl bg-white shadow-xs border border-festival/30 group-hover:rotate-6 transition-transform">
              <BalasanghamFlag className="w-9 h-5.5 sm:w-10 sm:h-6 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span
                className={`text-lg sm:text-xl font-black tracking-tight text-ink group-hover:text-berry transition-colors ${
                  ml ? 'font-malayalam' : ''
                }`}
              >
                {ml ? 'ബാലസംഘം' : 'Balasangham'}
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-ink/70 uppercase tracking-widest -mt-0.5">
                {ml ? 'കണ്ണൂർ ജില്ലാ കമ്മിറ്റി' : 'Kannur District Committee'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-6 text-[13px] font-bold tracking-wide uppercase text-ink/85">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative py-1.5 transition-colors active:scale-[0.98] ${
                  isActive
                    ? 'text-berry font-black'
                    : 'hover:text-berry text-ink/80'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{ml ? 'ഹോം' : 'Home'}</span>
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 bg-berry rounded-full animate-pop-in" />
                  )}
                </>
              )}
            </NavLink>

            {/* About Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                className={`flex items-center gap-1 py-1.5 transition-colors relative active:scale-[0.98] ${
                  isAboutActive
                    ? 'text-berry font-black'
                    : 'hover:text-berry text-ink/80'
                }`}
              >
                <span>{ml ? 'ഞങ്ങളെക്കുറിച്ച്' : 'About'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
                {isAboutActive && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-berry rounded-full" />
                )}
              </button>

              {aboutDropdownOpen && (
                <div className="absolute top-full left-0 w-64 mt-2 bg-white rounded-2xl shadow-warm-lg border-2 border-festival/30 py-2 z-50 animate-pop-in">
                  {aboutSublinks.map((sub, idx) => (
                    <Link
                      key={idx}
                      to={sub.to}
                      onClick={() => setAboutDropdownOpen(false)}
                      className={`block px-4 py-2.5 text-xs sm:text-sm text-ink hover:bg-festival/15 hover:text-berry font-medium transition-colors ${
                        location.pathname === sub.to ? 'text-berry font-bold bg-festival/20' : ''
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
                  `relative py-1.5 transition-colors active:scale-[0.98] ${
                    isActive
                      ? 'text-berry font-black'
                      : 'hover:text-berry text-ink/80'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{ml ? link.labelMl : link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 inset-x-0 h-0.5 bg-berry rounded-full animate-pop-in" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <Link
              to="/join"
              className="px-4 py-2 text-xs font-bold rounded-full bg-berry text-white hover:bg-berry-dark hover:shadow-festive transition-all shadow-xs active:scale-[0.97]"
            >
              {ml ? 'അംഗത്വം' : 'Join Us'}
            </Link>

            <button
              type="button"
              onClick={onOpenAnthem}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-full bg-festival/20 text-ink hover:bg-festival hover:text-ink transition-all duration-200 border border-festival/40 active:scale-[0.97]"
            >
              <Music className="w-3.5 h-3.5 text-berry" />
              <span className={ml ? 'font-malayalam' : ''}>{ml ? 'കൊടിപ്പാട്ട്' : 'Flag Song'}</span>
            </button>

            <LanguageToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center gap-2">
            <LanguageToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center min-h-[48px] min-w-[48px] p-2.5 rounded-full text-ink hover:bg-festival/20 hover:text-[#D32020] transition-colors border border-[#2A1610]/15"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-cream-deep border-b-2 border-festival/30 px-4 pt-3 pb-6 space-y-2 animate-pop-in">
          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center min-h-[48px] px-3 py-2 rounded-xl text-sm font-bold text-ink hover:bg-festival/20 hover:text-berry"
          >
            {ml ? 'ഹോം' : 'Home'}
          </NavLink>

          <div className="pl-3 border-l-2 border-festival/30 space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-berry font-bold block pt-1">
              {ml ? 'ഞങ്ങളെക്കുറിച്ച്' : 'ABOUT'}
            </span>
            {aboutSublinks.map((sub, idx) => (
              <Link
                key={idx}
                to={sub.to}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center min-h-[48px] py-1.5 text-xs text-ink/80 hover:text-berry font-medium"
              >
                {ml ? sub.labelMl : sub.label}
              </Link>
            ))}
          </div>

          {mainLinks.slice(1).map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center min-h-[48px] px-3 py-2 rounded-xl text-sm font-bold text-ink hover:bg-festival/20 hover:text-berry"
            >
              {ml ? link.labelMl : link.label}
            </NavLink>
          ))}

          <div className="pt-4 flex items-center gap-3">
            <Link
              to="/join"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-2.5 text-center text-xs font-bold rounded-full bg-berry text-white shadow-festive"
            >
              {ml ? 'അംഗത്വം എടുക്കൂ' : 'Join Us'}
            </Link>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAnthem();
              }}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-full bg-festival text-ink border border-festival-deep/30"
            >
              <Music className="w-3.5 h-3.5 text-berry" />
              <span>{ml ? 'കൊടിപ്പാട്ട്' : 'Flag Song'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
