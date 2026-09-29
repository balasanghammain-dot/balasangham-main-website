import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LanguageProvider } from '../../context/LanguageContext';
import { WhatWeDoSection } from './WhatWeDoSection';

describe('WhatWeDoSection Component (Pillar 2)', () => {
  it('renders all 6 signature initiatives', () => {
    render(
      <LanguageProvider>
        <WhatWeDoSection />
      </LanguageProvider>
    );

    expect(screen.getByRole('heading', { level: 2, name: /What We Do|പ്രവർത്തനങ്ങൾ/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Venalthumbikal|വേനൽത്തുമ്പികൾ/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Venal Kalari|വേനൽ കളരി/i)).toBeInTheDocument();
    expect(screen.getByText(/Kilikkoodu|കിളിക്കൂട്/i)).toBeInTheDocument();
    expect(screen.getByText(/Shasthra Deepthi|ശാസ്ത്ര ദീപ്തി/i)).toBeInTheDocument();
    expect(screen.getByText(/Kutti Koottams|കുട്ടിക്കൂട്ടങ്ങൾ/i)).toBeInTheDocument();
    expect(screen.getByText(/Anti-Drug|ലഹരിവിരുദ്ധ/i)).toBeInTheDocument();
  });
});
