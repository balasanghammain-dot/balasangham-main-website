import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { BalasanghamLogo } from '../motifs/BalasanghamLogo';
import { LanguageToggle } from '../common/LanguageToggle';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';
import { Button } from '../ui/button';
import { Menu, Music, ChevronDown, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenAnthem: () => void;
}

export const Navbar = ({ onOpenAnthem }: NavbarProps) => {
  const { language } = useLanguage();
  const ml = language === 'ml';
  const location = useLocation();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close sheet on navigation
  useEffect(() => {
    setSheetOpen(false);
    setAboutOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: 'Home', labelMl: 'ഹോം' },
    { to: '/about', label: 'About', labelMl: 'ഞങ്ങളെക്കുറിച്ച്' },
    { to: '/events', label: 'Events', labelMl: 'സമ്മേളനങ്ങൾ' },
    { to: '/media', label: 'Media', labelMl: 'മീഡിയ' },
    { to: '/contact', label: 'Contact', labelMl: 'സമ്പർക്കം' },
  ];

  const aboutSublinks = [
    { to: '/about', label: 'Who We Are', labelMl: 'ആമുഖം' },
    { to: '/about/history', label: 'History & Heritage', labelMl: 'ചരിത്രവും പൈതൃകവും' },
    { to: '/about/objectives', label: 'Mission & Objectives', labelMl: 'ലക്ഷ്യങ്ങൾ' },
    { to: '/about/structure', label: 'Organization Structure', labelMl: 'സംഘടനാ ഘടന' },
    { to: '/about/leadership', label: 'Leadership', labelMl: 'നേതൃത്വം' },
    { to: '/about/alumni', label: 'Notable Alumni', labelMl: 'പൂർവകാല പ്രവർത്തകർ' },
  ];

  const isAboutActive = location.pathname.startsWith('/about');

  return (
    <header
      className={`sticky top-0 z-40 pt-safe transition-all duration-200 ${
        isScrolled
          ? 'bg-soft-cream/95 backdrop-blur-md shadow-warm'
          : 'bg-soft-cream'
      }`}
    >
      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-deep-red focus:text-white focus:font-bold focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
      >
        {ml ? 'പ്രധാന ഉള്ളടക്കത്തിലേക്ക് പോകുക' : 'Skip to main content'}
      </a>

      {/* Top accent line */}
      <div className="h-0.5 bg-deep-red" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-200 ${
          isScrolled ? 'h-14' : 'h-16 sm:h-20'
        }`}>
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-red rounded-full p-1 shrink-0 active:scale-[0.98] transition-transform"
          >
            <div className="p-1 rounded-xl bg-white shadow-xs border border-sun-primary/30 group-hover:rotate-3 transition-transform flex items-center justify-center shrink-0">
              <BalasanghamLogo className="w-8 h-8 sm:w-9 sm:h-9" alt="Balasangham Logo" />
            </div>
            <div className="flex flex-col shrink-0">
              <span className={`text-base sm:text-xl font-black tracking-tight text-dark-brown group-hover:text-deep-red transition-colors ${ml ? 'font-malayalam' : ''}`}>
                {ml ? 'ബാലസംഘം' : 'Balasangham'}
              </span>
              <span className="text-[10px] font-bold text-dark-brown/60 uppercase tracking-widest -mt-0.5 hidden sm:block">
                {ml ? 'കണ്ണൂർ ജില്ലാ കമ്മിറ്റി' : 'Kannur District'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-3 2xl:gap-4">
            {navLinks.map((link) => {
              if (link.to === '/about') {
                return (
                  <div key="about" className="relative group">
                    <NavLink
                      to="/about"
                      className={({ isActive }) =>
                        `inline-flex items-center gap-1 px-3 py-2 text-sm font-bold tracking-normal transition-colors rounded-lg ${
                          isActive || isAboutActive
                            ? 'text-deep-red font-black'
                            : 'text-dark-brown/75 hover:text-deep-red hover:bg-deep-red/5'
                        }`
                      }
                    >
                      <span className={ml ? 'font-malayalam text-sm' : ''}>{ml ? link.labelMl : link.label}</span>
                      <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform text-dark-brown/50 group-hover:text-deep-red" />
                    </NavLink>
                    {/* Dropdown */}
                    <div className="absolute top-full left-0 w-60 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none group-hover:pointer-events-auto">
                      <div className="bg-white rounded-xl shadow-warm-lg border border-dark-brown/10 py-1.5 overflow-hidden">
                        {aboutSublinks.map((sub) => (
                          <Link
                            key={sub.to}
                            to={sub.to}
                            className={`block px-4 py-2.5 text-sm font-medium text-dark-brown/80 hover:bg-sun-primary/10 hover:text-deep-red transition-colors ${
                              location.pathname === sub.to ? 'text-deep-red bg-sun-primary/10 font-bold' : ''
                            } ${ml ? 'font-malayalam-body' : ''}`}
                          >
                            {ml ? sub.labelMl : sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-3 py-2 text-sm font-bold tracking-normal transition-colors rounded-lg ${
                      isActive
                        ? 'text-deep-red font-black'
                        : 'text-dark-brown/75 hover:text-deep-red hover:bg-deep-red/5'
                    } ${ml ? 'font-malayalam text-sm' : ''}`
                  }
                >
                  {ml ? link.labelMl : link.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Desktop Actions: Flag Song | EN/മലയാളം | Join */}
          <div className="hidden lg:flex items-center gap-2.5 xl:gap-3.5 shrink-0">
            <button
              type="button"
              onClick={onOpenAnthem}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-dark-brown/75 hover:text-deep-red hover:bg-deep-red/5 transition-colors border border-dark-brown/15 min-h-[36px]"
              aria-label="Flag Song"
              title={ml ? 'കൊടിപ്പാട്ട്' : 'Flag Song'}
            >
              <Music className="w-3.5 h-3.5 text-deep-red" />
              <span className={ml ? 'font-malayalam normal-case' : ''}>{ml ? 'കൊടിപ്പാട്ട്' : 'Flag Song'}</span>
            </button>
            <LanguageToggle />
            <Button variant="default" size="sm" className="px-4 shadow-sm" asChild>
              <Link to="/join">
                <span className={ml ? 'font-malayalam normal-case text-sm' : ''}>{ml ? 'അംഗത്വം' : 'Join'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>

          {/* Mobile: Language + Menu */}
          <div className="flex lg:hidden items-center gap-1 sm:gap-2 shrink-0">
            <LanguageToggle />
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              className="flex items-center justify-center min-h-[44px] min-w-[44px] h-11 w-11 rounded-full text-dark-brown hover:bg-dark-brown/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-red"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sheet Menu */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="w-[85%] max-w-sm p-0 flex flex-col">
          <SheetHeader className="px-6 pt-16 pb-4 border-b border-dark-brown/10">
            <SheetTitle className={`text-2xl ${ml ? 'font-malayalam' : ''}`}>
              {ml ? 'ബാലസംഘം' : 'Balasangham'}
            </SheetTitle>
            <SheetDescription className="text-xs text-dark-brown/50 uppercase tracking-widest font-bold">
              {ml ? 'കണ്ണൂർ ജില്ലാ കമ്മിറ്റി' : 'Kannur District Committee'}
            </SheetDescription>
          </SheetHeader>

          {/* Mobile Nav Links */}
          <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => {
              if (link.to === '/about') {
                return (
                  <div key="about">
                    <button
                      type="button"
                      onClick={() => setAboutOpen(!aboutOpen)}
                      className={`w-full flex items-center justify-between min-h-[48px] px-3 py-2 rounded-lg text-left text-base font-bold transition-colors ${
                        isAboutActive ? 'text-deep-red bg-deep-red/5' : 'text-dark-brown hover:bg-dark-brown/5'
                      } ${ml ? 'font-malayalam' : ''}`}
                    >
                      <span>{ml ? link.labelMl : link.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${aboutOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {aboutOpen && (
                      <div className="pl-4 space-y-0.5 mt-1">
                        {aboutSublinks.map((sub) => (
                          <Link
                            key={sub.to}
                            to={sub.to}
                            onClick={() => setSheetOpen(false)}
                            className={`block min-h-[44px] px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${
                              location.pathname === sub.to
                                ? 'text-deep-red bg-deep-red/5 font-bold'
                                : 'text-dark-brown/70 hover:text-deep-red hover:bg-dark-brown/5'
                            } ${ml ? 'font-malayalam-body' : ''}`}
                          >
                            {ml ? sub.labelMl : sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setSheetOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center min-h-[48px] px-3 py-2 rounded-lg text-base font-bold transition-colors ${
                      isActive
                        ? 'text-deep-red bg-deep-red/5'
                        : 'text-dark-brown hover:bg-dark-brown/5'
                    } ${ml ? 'font-malayalam' : ''}`
                  }
                >
                  {ml ? link.labelMl : link.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Bottom actions in sheet */}
          <div className="px-4 py-4 border-t border-dark-brown/10 space-y-3 pb-safe">
            <Button className="w-full" asChild>
              <Link to="/join" onClick={() => setSheetOpen(false)}>
                <span className={ml ? 'font-malayalam normal-case text-sm' : ''}>{ml ? 'അംഗത്വം എടുക്കൂ' : 'Join Balasangham'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => {
                setSheetOpen(false);
                onOpenAnthem();
              }}
            >
              <Music className="w-4 h-4 text-deep-red" />
              <span className={ml ? 'font-malayalam normal-case text-sm' : ''}>{ml ? 'കൊടിപ്പാട്ട്' : 'Flag Song'}</span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};
