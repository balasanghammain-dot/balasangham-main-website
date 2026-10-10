import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from '../../context/LanguageContext';
import { GameSection } from './GameSection';

describe('GameSection Component', () => {
  it('renders dedicated game section with heading, subtitle and action button', () => {
    render(
      <BrowserRouter>
        <LanguageProvider>
          <GameSection />
        </LanguageProvider>
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { level: 2, name: /കളികൾ/i })).toBeInTheDocument();
    expect(screen.getByText(/ചിത്രം ചേർത്ത് വയ്ക്കാം/i)).toBeInTheDocument();
    
    const playButton = screen.getByRole('link', { name: /PLAY GAME/i });
    expect(playButton).toBeInTheDocument();
    expect(playButton).toHaveAttribute('href', '/game');
  });
});
