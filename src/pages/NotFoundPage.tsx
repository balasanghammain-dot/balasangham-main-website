import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Home } from 'lucide-react';
import { RedStarIcon } from '../components/motifs/RedStarIcon';

export const NotFoundPage = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';

  return (
    <div className="min-h-[70vh] bg-surface-cream flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-brand-red flex items-center justify-center mx-auto mb-6">
          <RedStarIcon className="w-8 h-8" />
        </div>

        <span className="text-4xl font-extrabold text-brand-red block mb-2 font-mono">404</span>

        <h1 className={`text-2xl font-bold text-charcoal mb-3 ${ml ? 'font-malayalam' : ''}`}>
          {ml ? 'പേജ് കണ്ടെത്താനായില്ല' : 'Page Not Found'}
        </h1>

        <p className={`text-sm text-slate-600 mb-8 leading-relaxed ${ml ? 'font-malayalam-body' : ''}`}>
          {ml
            ? 'നിങ്ങൾ തിരഞ്ഞ പേജ് നിലവിലില്ല അല്ലെങ്കിൽ മറ്റൊരു വിലാസത്തിലേക്ക് മാറ്റിയിട്ടുണ്ടാകാം.'
            : 'The page you are looking for does not exist or may have been relocated.'}
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-brand-red text-white font-bold text-sm shadow hover:bg-red-700 transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>{ml ? 'ഹോം പേജിലേക്ക് മടങ്ങുക' : 'Return to Home'}</span>
        </Link>
      </div>
    </div>
  );
};
