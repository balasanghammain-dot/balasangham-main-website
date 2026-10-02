import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const routeTitles: Record<string, { en: string; ml: string }> = {
  '/': { en: 'Balasangham Kannur - Official Website', ml: 'ബാലസംഘം കണ്ണൂർ - ഔദ്യോഗിക വെബ്സൈറ്റ്' },
  '/about': { en: 'About Us | Balasangham Kannur', ml: 'ഞങ്ങളെക്കുറിച്ച് | ബാലസംഘം കണ്ണൂർ' },
  '/about/history': { en: 'History & Heritage | Balasangham Kannur', ml: 'ചരിത്രവും പൈതൃകവും | ബാലസംഘം കണ്ണൂർ' },
  '/about/objectives': { en: 'Mission & Objectives | Balasangham Kannur', ml: 'ലക്ഷ്യങ്ങൾ | ബാലസംഘം കണ്ണൂർ' },
  '/about/structure': { en: 'Organization Structure | Balasangham Kannur', ml: 'സംഘടനാ ഘടന | ബാലസംഘം കണ്ണൂർ' },
  '/about/leadership': { en: 'Leadership | Balasangham Kannur', ml: 'നേതൃത്വം | ബാലസംഘം കണ്ണൂർ' },
  '/about/alumni': { en: 'Notable Alumni | Balasangham Kannur', ml: 'പൂർവകാല പ്രവർത്തകർ | ബാലസംഘം കണ്ണൂർ' },
  '/events': { en: 'Events & Conferences | Balasangham Kannur', ml: 'സമ്മേളനങ്ങൾ | ബാലസംഘം കണ്ണൂർ' },
  '/media': { en: 'Media Gallery | Balasangham Kannur', ml: 'മീഡിയ ഗാലറി | ബാലസംഘം കണ്ണൂർ' },
  '/contact': { en: 'Contact Us | Balasangham Kannur', ml: 'ബന്ധപ്പെടുക | ബാലസംഘം കണ്ണൂർ' },
  '/join': { en: 'Join Balasangham | Balasangham Kannur', ml: 'അംഗത്വം എടുക്കൂ | ബാലസംഘം കണ്ണൂർ' },
  '/privacy': { en: 'Privacy Policy | Balasangham Kannur', ml: 'സ്വകാര്യതാ നയം | ബാലസംഘം കണ്ണൂർ' },
  '/terms': { en: 'Terms of Use | Balasangham Kannur', ml: 'നിബന്ധനകൾ | ബാലസംഘം കണ്ണൂർ' },
};

export const ScrollToTop = () => {
  const { pathname } = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);

    const match = routeTitles[pathname];
    if (match) {
      document.title = language === 'ml' ? match.ml : match.en;
    } else {
      document.title = language === 'ml'
        ? 'ബാലസംഘം കണ്ണൂർ'
        : 'Balasangham Kannur';
    }
  }, [pathname, language]);

  return null;
};
