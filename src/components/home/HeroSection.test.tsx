import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from '../../context/LanguageContext';
import { HeroSection } from './HeroSection';

describe('HeroSection Component', () => {
  it('renders hero headline and primary actions', () => {
    render(
      <BrowserRouter>
        <LanguageProvider>
          <HeroSection onOpenAnthem={vi.fn()} />
        </LanguageProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/Balasangham/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /JOIN|ചേരുക/i })).toBeInTheDocument();
  });

  it('displays motto text in hero image overlay', () => {
    render(
      <BrowserRouter>
        <LanguageProvider>
          <HeroSection onOpenAnthem={vi.fn()} />
        </LanguageProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/പഠനം, മനനം, ചലനം/)).toBeInTheDocument();
    expect(screen.getByText(/Study · Contemplate · Act/)).toBeInTheDocument();
  });
});
