import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Home, Info, Calendar, Camera, UserPlus } from 'lucide-react';

export const BottomNav = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';

  const navItems = [
    { to: '/', label: 'Home', labelMl: 'ഹോം', icon: Home },
    { to: '/about', label: 'About', labelMl: 'വിവരം', icon: Info },
    { to: '/events', label: 'Events', labelMl: 'പരിപാടികൾ', icon: Calendar },
    { to: '/media', label: 'Photos', labelMl: 'ഫോട്ടോകൾ', icon: Camera },
    { to: '/join', label: 'Join', labelMl: 'അംഗത്വം', icon: UserPlus, highlight: true },
  ];

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 inset-x-0 z-40 bg-[#FFFDF7]/95 backdrop-blur-md border-t border-[#2A1610]/15 pb-[env(safe-area-inset-bottom)] md:hidden transition-all shadow-warm-lg"
    >
      <div className="grid grid-cols-5 h-16 max-w-lg mx-auto items-center px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center h-full min-h-[48px] py-1 text-center transition-transform active:scale-95 ${
                  isActive
                    ? 'text-[#D32020] font-black'
                    : 'text-[#2A1610]/70 hover:text-[#D32020]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`relative p-1 rounded-full transition-colors ${
                      item.highlight
                        ? 'bg-[#D32020] text-white p-1.5 -mt-2 shadow-xs'
                        : isActive
                        ? 'bg-[#D32020]/10'
                        : ''
                    }`}
                  >
                    <Icon className={item.highlight ? 'w-5 h-5 text-white' : 'w-5 h-5'} />
                  </div>
                  <span
                    className={`text-[10px] tracking-tight leading-tight mt-0.5 ${
                      ml ? 'font-malayalam' : 'font-sans'
                    } ${item.highlight ? 'font-bold text-[#D32020]' : ''}`}
                  >
                    {ml ? item.labelMl : item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
