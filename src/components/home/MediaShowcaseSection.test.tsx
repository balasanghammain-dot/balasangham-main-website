import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from '../../context/LanguageContext';
import { MediaShowcaseSection } from './MediaShowcaseSection';

describe('MediaShowcaseSection Component', () => {
  it('renders the peace banner and documentary gallery with 48px touch targets', () => {
    render(
      <BrowserRouter>
        <LanguageProvider>
          <MediaShowcaseSection />
        </LanguageProvider>
      </BrowserRouter>
    );

    // Banner and gallery headers
    expect(screen.getByText(/Celebrations of Secular Childhood|കുട്ടിക്കാലത്തിന്റെ ഉത്സവനിമിഷങ്ങൾ/i)).toBeInTheDocument();
    expect(screen.getByText(/Authentic Documentary Moments|വേദിയിലെയും കളിക്കളങ്ങളിലെയും ചിത്രങ്ങൾ/i)).toBeInTheDocument();

    // Verification of documentary stories
    expect(screen.getByText(/Venalthumbikal State Art Troupe|വേനൽത്തുമ്പികൾ കലാജാഥ/i)).toBeInTheDocument();

    // Primary touch targets (48px)
    const galleryCta = screen.getByRole('link', { name: /EXPLORE GALLERY|എല്ലാ ചിത്രങ്ങളും കാണുക/i });
    expect(galleryCta).toHaveClass('min-h-[48px]');

    // No conference poster used
    const images = screen.getAllByRole('img');
    images.forEach((img) => {
      expect(img.getAttribute('src')).not.toContain('conference-poster-2026.jpg');
    });
  });
});
