import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { PosterTetris } from '../components/game/PosterTetris';

export const PosterGamePage: React.FC = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';

  return (
    <div className="min-h-screen bg-soft-cream pt-20 sm:pt-24 pb-16">
      <div className="editorial-container mb-4">
        <Breadcrumb
          items={[
            { label: 'Events', labelMl: 'സമ്മേളനങ്ങൾ', path: '/events' },
            { label: ml ? 'പോസ്റ്റർ ടെട്രിസ് പസിൽ' : 'Poster Tetris Game' }
          ]}
        />
      </div>

      <PosterTetris />
    </div>
  );
};
