import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { PosterTetris } from '../components/game/PosterTetris';

export const PosterGamePage: React.FC = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';

  return (
    <div className="min-h-screen bg-soft-cream pt-14 sm:pt-20 pb-6">
      <div className="editorial-container mb-1 sm:mb-2">
        <Breadcrumb
          items={[
            { label: 'Events', labelMl: 'സമ്മേളനങ്ങൾ', path: '/events' },
            { label: ml ? 'പോസ്റ്റർ ടെട്രിസ് പസിൽ' : 'Poster Tetris Game' }
          ]}
          className="px-0 py-0.5 sm:py-1 text-xs"
        />
      </div>

      <PosterTetris />
    </div>
  );
};
