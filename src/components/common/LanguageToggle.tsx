import { useLanguage } from '../../context/LanguageContext';

export const LanguageToggle = ({ className = '' }: { className?: string }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language selection"
      className={`inline-flex items-center rounded-full bg-dark-brown/5 p-0.5 border border-dark-brown/10 ${className}`}
    >
      <button
        type="button"
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all duration-150 min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95 ${
          language === 'en'
            ? 'bg-deep-red text-white shadow-sm'
            : 'text-dark-brown/70 hover:text-deep-red'
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage('ml')}
        aria-pressed={language === 'ml'}
        className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all duration-150 font-malayalam min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95 ${
          language === 'ml'
            ? 'bg-deep-red text-white shadow-sm'
            : 'text-dark-brown/70 hover:text-deep-red'
        }`}
      >
        മലയാളം
      </button>
    </div>
  );
};
