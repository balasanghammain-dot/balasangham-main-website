import { useLanguage } from '../../context/LanguageContext';

export const LanguageToggle = ({ className = '' }: { className?: string }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language selection"
      className={`inline-flex items-center rounded-md bg-[#E9DDC9]/70 p-0.5 border border-[#241914]/15 shadow-xs ${className}`}
    >
      <button
        type="button"
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        className={`px-3 py-1 text-xs sm:text-xs font-bold rounded-sm transition-all duration-150 min-h-[32px] min-w-[40px] active:scale-95 ${
          language === 'en'
            ? 'bg-[#C90000] text-white shadow-xs'
            : 'text-[#241914]/80 hover:text-[#C90000]'
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage('ml')}
        aria-pressed={language === 'ml'}
        className={`px-3 py-1 text-xs sm:text-xs font-bold rounded-sm transition-all duration-150 font-malayalam min-h-[32px] min-w-[52px] active:scale-95 ${
          language === 'ml'
            ? 'bg-[#C90000] text-white shadow-xs'
            : 'text-[#241914]/80 hover:text-[#C90000]'
        }`}
      >
        മലയാളം
      </button>
    </div>
  );
};
