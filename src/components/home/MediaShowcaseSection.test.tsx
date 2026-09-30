import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from '../../context/LanguageContext';
import { MediaSection } from './MediaShowcaseSection';

describe('MediaSection Component', () => {
  it('renders archive heading and media link', () => {
    render(
      <BrowserRouter>
        <LanguageProvider>
          <MediaSection />
        </LanguageProvider>
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { level: 2, name: /From the Archive|ചിത്രങ്ങളിലൂടെ/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /View Media|മീഡിയ കാണുക/i })).toHaveAttribute('href', '/media');
  });

  it('does not use conference poster image', () => {
    render(
      <BrowserRouter>
        <LanguageProvider>
          <MediaSection />
        </LanguageProvider>
      </BrowserRouter>
    );

    const images = screen.getAllByRole('img');
    images.forEach((img) => {
      expect(img.getAttribute('src')).not.toContain('conference-poster-2026.jpg');
    });
  });
});
