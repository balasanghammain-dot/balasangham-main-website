import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '../../context/LanguageContext';
import { ProgramsSection } from './WhatWeDoSection';

describe('ProgramsSection Component', () => {
  it('renders section heading and program items', () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <ProgramsSection />
        </LanguageProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 2, name: /What We Do|ഞങ്ങൾ എന്താണ്/i })).toBeInTheDocument();
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /View All Programs|എല്ലാ പരിപാടികളും/i })).toHaveAttribute('href', '/programs');
  });
});
