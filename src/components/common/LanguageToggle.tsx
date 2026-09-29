import { useLanguage } from '../../context/LanguageContext';

export const LanguageToggle = ({ className = '' }: { className?: string }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language selection"
      className={`inline-flex items-center rounded-full bg-slate-100 p-1 border border-slate-200 shadow-sm ${className}`}
    >
      <button
        type="button"
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        className={`px-3 py-1 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 min-h-[36px] min-w-[44px] ${
          language === 'en'
            ? 'bg-brand-red text-white shadow-sm'
            : 'text-slate-700 hover:text-brand-red'
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage('ml')}
        aria-pressed={language === 'ml'}
        className={`px-3 py-1 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 font-malayalam min-h-[36px] min-w-[54px] ${
          language === 'ml'
            ? 'bg-brand-red text-white shadow-sm'
            : 'text-slate-700 hover:text-brand-red'
        }`}
      >
        മലയാളം
      </button>
    </div>
  );
};
