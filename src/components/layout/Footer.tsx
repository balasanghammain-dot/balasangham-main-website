import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { BalasanghamLogo } from '../motifs/BalasanghamLogo';
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '../common/SocialIcons';
import { Separator } from '../ui/separator';
import { Phone } from 'lucide-react';
import { organizationInfo } from '../../data/organizationData';

export const Footer = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';

  const quickLinks = [
    { to: '/about', label: 'About', labelMl: 'ഞങ്ങളെക്കുറിച്ച്' },
    { to: '/events', label: 'Events', labelMl: 'സമ്മേളനങ്ങൾ' },
    { to: '/media', label: 'Media', labelMl: 'മീഡിയ' },
    { to: '/contact', label: 'Contact', labelMl: 'സമ്പർക്കം' },
    { to: '/join', label: 'Join', labelMl: 'അംഗത്വം' },
  ];

  return (
    <footer className="bg-charcoal text-white/80 border-t-2 border-deep-red">
      <div className="editorial-container py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="p-1 rounded-xl bg-white shadow-xs border border-white/10 flex items-center justify-center">
                <BalasanghamLogo className="w-8 h-8" alt="Balasangham Logo" />
              </div>
              <div>
                <span className={`text-xl font-black text-white ${ml ? 'font-malayalam' : ''}`}>
                  {ml ? 'ബാലസംഘം' : 'Balasangham'}
                </span>
                <span className="block text-[10px] text-sun-primary uppercase tracking-widest font-bold">
                  {ml ? 'കണ്ണൂർ ജില്ലാ കമ്മിറ്റി' : 'Kannur District Committee'}
                </span>
              </div>
            </Link>
            <p className={`text-sm text-white/60 leading-relaxed max-w-sm ${ml ? 'font-malayalam-body leading-[1.8]' : ''}`}>
              {ml
                ? 'കുട്ടികളിൽ ജനാധിപത്യബോധവും മതനിരപേക്ഷതയും വളർത്തുന്ന കേരളത്തിലെ ഏറ്റവും വലിയ കുട്ടികളുടെ സാംസ്കാരിക പ്രസ്ഥാനം.'
                : 'Kerala\'s largest children\'s cultural movement. Fostering democratic values and secular fraternity since 1938.'}
            </p>
            <div className="flex items-center gap-2 pt-1">
              <a href="https://www.facebook.com/balasangham.kannur/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-deep-red flex items-center justify-center text-white/60 hover:text-white transition-all" aria-label="Facebook">
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/balasanghamkannur_dc/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-deep-red flex items-center justify-center text-white/60 hover:text-white transition-all" aria-label="Instagram">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="https://www.youtube.com/@balasanghamkerala2817" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-deep-red flex items-center justify-center text-white/60 hover:text-white transition-all" aria-label="YouTube">
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-sun-primary mb-4">
              {ml ? 'വിഭാഗങ്ങൾ' : 'Navigation'}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`text-sm text-white/60 hover:text-sun-primary transition-colors font-medium ${ml ? 'font-malayalam-body' : ''}`}
                  >
                    {ml ? link.labelMl : link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Jurisdiction */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-sun-primary mb-4">
              {ml ? 'ജില്ലാ കമ്മിറ്റി ഓഫീസ്' : 'District Committee Office'}
            </h4>
            <div className="space-y-3 text-sm text-white/70">
              <address className="not-italic space-y-1 font-malayalam leading-relaxed">
                <p className="font-bold text-white">
                  {organizationInfo.contact.addressLines[0]}
                </p>
                <p className="text-white/80">
                  {organizationInfo.contact.addressLines[1]}
                </p>
                <p className="text-white/80">
                  {organizationInfo.contact.addressLines[2]}
                </p>
              </address>

              <div className="pt-1">
                <a
                  href={organizationInfo.contact.phoneTel}
                  className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-sun-primary transition-colors min-h-[44px] py-1 group"
                  aria-label={`Call Balasangham Kannur District Committee at ${organizationInfo.contact.phone}`}
                >
                  <Phone className="w-4 h-4 text-sun-primary shrink-0" />
                  <span>
                    Phone: <strong className="text-white group-hover:text-sun-primary underline decoration-white/30 group-hover:decoration-sun-primary">{organizationInfo.contact.phone}</strong>
                  </span>
                </a>
              </div>

              <div className="pt-1">
                <Link
                  to="/contact"
                  className="inline-flex items-center text-xs font-bold text-sun-primary hover:text-white transition-colors"
                >
                  <span>{ml ? 'സമ്പർക്ക വിവരങ്ങൾ കാണുക →' : 'View Contact Information →'}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Balasangham Kannur District Committee</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-white/70 transition-colors">{ml ? 'സ്വകാര്യത' : 'Privacy'}</Link>
            <Link to="/terms" className="hover:text-white/70 transition-colors">{ml ? 'നിബന്ധനകൾ' : 'Terms'}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
