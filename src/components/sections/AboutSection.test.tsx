import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '../../context/LanguageContext';
import { AboutSection } from './AboutSection';

describe('AboutSection Component', () => {
  it('renders section heading and description with story link', () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <AboutSection />
        </LanguageProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 2, name: /Democratic Movement|ജനാധിപത്യ പ്രസ്ഥാനം/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Read Our Story|ഞങ്ങളുടെ കഥ/i })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: /Find Out Leaders|നേതൃത്വത്തെ അറിയൂ/i })).toHaveAttribute('href', '/about/leadership');
  });

  it('renders about image with alt text', () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <AboutSection />
        </LanguageProvider>
      </MemoryRouter>
    );

    expect(screen.getByAltText(/children performing/i)).toBeInTheDocument();
  });
});
