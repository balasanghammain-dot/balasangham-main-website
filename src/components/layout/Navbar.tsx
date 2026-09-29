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
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand Name */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-hidden focus:ring-2 focus:ring-brand-red rounded-lg p-1 shrink-0"
          >
            <BalasanghamFlag className="w-10 h-6 sm:w-12 sm:h-7 transition-transform group-hover:scale-105" />
            <div className="flex flex-col">
              <span
                className={`text-lg sm:text-xl font-bold tracking-tight text-charcoal group-hover:text-brand-red transition-colors ${
                  ml ? 'font-malayalam' : ''
                }`}
              >
                {ml ? 'ബാലസംഘം' : 'Balasangham'}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-widest -mt-1">
                {ml ? 'കണ്ണൂർ ജില്ലാ കമ്മിറ്റി' : 'Kannur District Committee'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-5 text-sm font-semibold text-slate-700">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `py-1.5 transition-colors border-b-2 ${
                  isActive
                    ? 'text-brand-red border-brand-red font-bold'
                    : 'border-transparent hover:text-brand-red hover:border-brand-red'
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
                className={`flex items-center gap-1 py-1.5 transition-colors border-b-2 ${
                  isAboutActive
                    ? 'text-brand-red border-brand-red font-bold'
                    : 'border-transparent hover:text-brand-red hover:border-brand-red'
                }`}
              >
                <span>{ml ? 'ഞങ്ങളെക്കുറിച്ച്' : 'About'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {aboutDropdownOpen && (
                <div className="absolute top-full left-0 w-64 mt-2 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-1">
                  {aboutSublinks.map((sub, idx) => (
                    <Link
                      key={idx}
                      to={sub.to}
                      onClick={() => setAboutDropdownOpen(false)}
                      className={`block px-4 py-2 text-xs sm:text-sm text-slate-700 hover:bg-surface-cream hover:text-brand-red font-medium transition-colors ${
                        location.pathname === sub.to ? 'text-brand-red font-bold bg-red-50/50' : ''
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
                  `py-1.5 transition-colors border-b-2 ${
                    isActive
                      ? 'text-brand-red border-brand-red font-bold'
                      : 'border-transparent hover:text-brand-red hover:border-brand-red'
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
              className="px-3.5 py-1.5 text-xs font-bold rounded-full bg-brand-red text-white hover:bg-red-700 transition-colors shadow-xs"
            >
              {ml ? 'അംഗത്വം' : 'Join Us'}
            </Link>

            <button
              type="button"
              onClick={onOpenAnthem}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-red-50 text-brand-red hover:bg-brand-red hover:text-white transition-all duration-200 border border-red-100"
            >
              <Music className="w-3.5 h-3.5" />
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
              className="p-2 rounded-lg text-slate-700 hover:text-brand-red hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-hidden focus:ring-2 focus:ring-brand-red"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150 max-h-[85vh] overflow-y-auto">
          <nav className="flex flex-col space-y-1">
            <NavLink
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-bold ${
                  isActive ? 'bg-red-50 text-brand-red' : 'text-slate-800 hover:bg-slate-100'
                }`
              }
            >
              {ml ? 'ഹോം' : 'Home'}
            </NavLink>

            {/* About in Mobile */}
            <div className="px-3 py-1.5 font-bold text-xs uppercase text-slate-400">
              {ml ? 'ഞങ്ങളെക്കുറിച്ച്' : 'About'}
            </div>
            <div className="pl-3 space-y-1 border-l-2 border-slate-200 ml-2">
              {aboutSublinks.map((sub, idx) => (
                <NavLink
                  key={idx}
                  to={sub.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-1.5 rounded-lg text-sm font-semibold ${
                      isActive ? 'bg-red-50 text-brand-red' : 'text-slate-700 hover:bg-slate-50'
                    }`
                  }
                >
                  {ml ? sub.labelMl : sub.label}
                </NavLink>
              ))}
            </div>

            <div className="pt-2 space-y-1">
              {mainLinks.slice(1).map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg text-sm font-bold ${
                      isActive ? 'bg-red-50 text-brand-red' : 'text-slate-800 hover:bg-slate-100'
                    }`
                  }
                >
                  {ml ? link.labelMl : link.label}
                </NavLink>
              ))}

              <NavLink
                to="/join"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-bold text-brand-red bg-red-50/60"
              >
                {ml ? 'അംഗത്വ വിവരങ്ങൾ (Join)' : 'How to Join Balasangham'}
              </NavLink>
            </div>
          </nav>

          <div className="pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAnthem();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-red text-white font-bold text-sm shadow-xs"
            >
              <Music className="w-4 h-4" />
              <span>{ml ? 'കൊടിപ്പാട്ട് കേൾക്കൂ' : 'Listen to Flag Song'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
