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
    expect(screen.getAllByRole('link', { name: /JOIN|ചേരുക/i }).length).toBeGreaterThan(0);
  });

  it('does not display removed core motto', () => {
    render(
      <BrowserRouter>
        <LanguageProvider>
          <HeroSection onOpenAnthem={vi.fn()} />
        </LanguageProvider>
      </BrowserRouter>
    );

    expect(screen.queryByText(/പഠനം, മനനം, ചലനം/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Study · Contemplate · Act/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Core Motto/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Teacher’s Story Beneath the Tree/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/മരച്ചുവട്ടിലെ മാഷിന്റെ കഥ/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Kalliasseri · 1938/i)).not.toBeInTheDocument();
  });
});
