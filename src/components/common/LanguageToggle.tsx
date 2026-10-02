import { useLanguage } from '../../context/LanguageContext';

export const LanguageToggle = ({ className = '' }: { className?: string }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language selection"
      className={`inline-flex items-center shrink-0 rounded-full bg-paper p-1 border border-dark-brown/15 select-none ${className}`}
    >
      <button
        type="button"
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        aria-label="EN"
        title="Switch to English"
        className={`shrink-0 min-h-[44px] min-w-[44px] px-3 py-1.5 text-xs font-bold rounded-full transition-colors duration-150 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-red focus-visible:ring-offset-2 focus-visible:ring-offset-paper active:scale-95 ${
          language === 'en'
            ? 'bg-deep-red text-white font-extrabold shadow-xs'
            : 'text-dark-brown/70 hover:text-dark-brown hover:bg-dark-brown/5'
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage('ml')}
        aria-pressed={language === 'ml'}
        aria-label="മലയാളം"
        title="മലയാളത്തിലേക്ക് മാറ്റുക"
        className={`shrink-0 min-h-[44px] min-w-[44px] px-3 py-1.5 text-xs font-bold font-malayalam whitespace-nowrap rounded-full transition-colors duration-150 flex items-center justify-center leading-none focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-red focus-visible:ring-offset-2 focus-visible:ring-offset-paper active:scale-95 ${
          language === 'ml'
            ? 'bg-deep-red text-white font-extrabold shadow-xs'
            : 'text-dark-brown/70 hover:text-dark-brown hover:bg-dark-brown/5'
        }`}
      >
        മലയാളം
      </button>
    </div>
  );
};
