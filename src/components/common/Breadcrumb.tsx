import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export interface BreadcrumbItem {
  label: string;
  labelMl?: string;
  path?: string;
  href?: string;
}

export const Breadcrumb = ({ items, className = '' }: { items: BreadcrumbItem[]; className?: string }) => {
  const { language } = useLanguage();
  const ml = language === 'ml';

  return (
    <nav aria-label="Breadcrumb" className={`py-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ${className}`}>
      <ol className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500 overflow-x-auto whitespace-nowrap">
        <li>
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-deep-red transition-colors text-slate-600 font-medium"
          >
            <Home className="w-3.5 h-3.5" />
            <span>{ml ? 'ഹോം' : 'Home'}</span>
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          const text = (ml && item.labelMl) ? item.labelMl : item.label;
          const targetPath = item.path || item.href;

          return (
            <li key={idx} className="flex items-center space-x-2">
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {isLast || !targetPath ? (
                <span className="font-semibold text-charcoal truncate max-w-xs sm:max-w-md" aria-current="page">
                  {text}
                </span>
              ) : (
                <Link
                  to={targetPath}
                  className="hover:text-deep-red transition-colors text-slate-600 truncate max-w-xs"
                >
                  {text}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
