import React, { createContext, useContext, useState, useEffect } from 'react';

export type AppView = 'home' | 'conference';

interface NavigationContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  navigateToConference: () => void;
  navigateToHome: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('conference') || hash.includes('event')) {
        return 'conference';
      }
    }
    return 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('conference') || hash.includes('event')) {
        setCurrentView('conference');
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToConference = () => {
    setCurrentView('conference');
    if (typeof window !== 'undefined') {
      window.location.hash = 'conference-2026';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateToHome = () => {
    setCurrentView('home');
    if (typeof window !== 'undefined') {
      window.location.hash = 'home';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <NavigationContext.Provider
      value={{
        currentView,
        setCurrentView,
        navigateToConference,
        navigateToHome
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
