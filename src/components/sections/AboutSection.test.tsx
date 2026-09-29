import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '../../context/LanguageContext';
import { AboutSection } from './AboutSection';

describe('AboutSection Component (Pillar 1)', () => {
  it('renders section heading and the 4 foundational core values cards', () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <AboutSection />
        </LanguageProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 2, name: /What is Balasangham\?|ആരാണ് ബാലസംഘം\?/i })).toBeInTheDocument();
    expect(screen.getByText(/Childhood Democracy|കുട്ടികളുടെ നേതൃത്വം/i)).toBeInTheDocument();
    expect(screen.getByText(/Secular & Universal Fraternity|മതേതര സൗഹൃദം/i)).toBeInTheDocument();
    expect(screen.getByText(/Scientific Inquiry & Rationality|ശാസ്ത്രബോധം/i)).toBeInTheDocument();
    expect(screen.getByText(/Defense of Child Rights|അവകാശ പോരാട്ടം/i)).toBeInTheDocument();
  });

  it('renders child-led democratic governance hierarchy levels', () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <AboutSection />
        </LanguageProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Unit Committee|യൂണിറ്റ് സമിതി/i)).toBeInTheDocument();
    expect(screen.getByText(/District Committee|ജില്ലാ സമിതി/i)).toBeInTheDocument();
    expect(screen.getByText(/State Committee|സംസ്ഥാന സമിതി/i)).toBeInTheDocument();
  });
});
