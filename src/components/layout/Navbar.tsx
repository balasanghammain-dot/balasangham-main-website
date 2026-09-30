import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { BalasanghamFlag } from '../motifs/BalasanghamFlag';
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
    { to: '/programs', label: 'Programs', labelMl: 'പരിപാടികൾ' },
    { to: '/events', label: 'Events', labelMl: 'സമ്മേളനങ്ങൾ' },
    { to: '/news', label: 'News', labelMl: 'വാർത്തകൾ' },
    { to: '/media', label: 'Media', labelMl: 'മീഡിയ' },
    { to: '/publications', label: 'Publications', labelMl: 'പ്രസിദ്ധീകരണങ്ങൾ' },
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
      {/* Top accent line */}
      <div className="h-0.5 bg-deep-red" />

      <div className="editorial-container">
        <div className={`flex items-center justify-between transition-all duration-200 ${
          isScrolled ? 'h-14' : 'h-16 sm:h-20'
        }`}>
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-red rounded-full p-1 shrink-0 active:scale-[0.98] transition-transform"
          >
            <div className="p-1 rounded-xl bg-white shadow-sm border border-sun-primary/30 group-hover:rotate-3 transition-transform">
              <BalasanghamFlag className="w-9 h-5.5 sm:w-10 sm:h-6" />
            </div>
            <div className="flex flex-col">
              <span className={`text-lg sm:text-xl font-black tracking-tight text-dark-brown group-hover:text-deep-red transition-colors ${ml ? 'font-malayalam' : ''}`}>
                {ml ? 'ബാലസംഘം' : 'Balasangham'}
              </span>
              <span className="text-[10px] font-bold text-dark-brown/60 uppercase tracking-widest -mt-0.5 hidden sm:block">
                {ml ? 'കണ്ണൂർ ജില്ലാ കമ്മിറ്റി' : 'Kannur District'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              if (link.to === '/about') {
                return (
                  <div key="about" className="relative group">
                    <NavLink
                      to="/about"
                      className={({ isActive }) =>
                        `inline-flex items-center gap-1 px-3 py-2 text-[13px] font-bold tracking-wide transition-colors rounded-lg ${
                          isActive || isAboutActive
                            ? 'text-deep-red'
                            : 'text-dark-brown/70 hover:text-deep-red hover:bg-deep-red/5'
                        }`
                      }
                    >
                      <span className={ml ? 'font-malayalam text-sm' : ''}>{ml ? link.labelMl : link.label}</span>
                      <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
                    </NavLink>
                    {/* Dropdown */}
                    <div className="absolute top-full left-0 w-56 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      <div className="bg-white rounded-xl shadow-warm-lg border border-dark-brown/10 py-1 overflow-hidden">
                        {aboutSublinks.map((sub) => (
                          <Link
                            key={sub.to}
                            to={sub.to}
                            className={`block px-4 py-2.5 text-sm font-medium text-dark-brown/80 hover:bg-sun-primary/10 hover:text-deep-red transition-colors ${
                              location.pathname === sub.to ? 'text-deep-red bg-sun-primary/5 font-bold' : ''
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
                    `px-3 py-2 text-[13px] font-bold tracking-wide transition-colors rounded-lg ${
                      isActive
                        ? 'text-deep-red'
                        : 'text-dark-brown/70 hover:text-deep-red hover:bg-deep-red/5'
                    } ${ml ? 'font-malayalam text-sm' : ''}`
                  }
                >
                  {ml ? link.labelMl : link.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden xl:flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onOpenAnthem}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-dark-brown/70 hover:text-deep-red hover:bg-deep-red/5 transition-colors border border-dark-brown/10 min-h-[36px]"
              aria-label="Flag Song"
            >
              <Music className="w-3.5 h-3.5 text-deep-red" />
              <span className={ml ? 'font-malayalam normal-case' : ''}>{ml ? 'കൊടിപ്പാട്ട്' : 'Flag Song'}</span>
            </button>
            <LanguageToggle />
            <Button variant="default" size="sm" asChild>
              <Link to="/join">
                <span className={ml ? 'font-malayalam normal-case text-sm' : ''}>{ml ? 'അംഗത്വം' : 'Join'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>

          {/* Mobile: Language + Menu */}
          <div className="flex xl:hidden items-center gap-2">
            <LanguageToggle />
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              className="flex items-center justify-center min-h-[48px] min-w-[48px] rounded-full text-dark-brown hover:bg-dark-brown/5 transition-colors"
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
