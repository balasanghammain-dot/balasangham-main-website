import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LanguageProvider } from '../../context/LanguageContext';
import { HeroSection } from './HeroSection';

describe('HeroSection Component', () => {
  it('renders hero headline, subtitle, and primary actions', () => {
    const handleOpenAnthem = vi.fn();
    render(
      <LanguageProvider>
        <HeroSection onOpenAnthem={handleOpenAnthem} />
      </LanguageProvider>
    );

    expect(screen.getByText(/Study, Contemplate, Act/i)).toBeInTheDocument();
    expect(screen.getByText('1,000,000+')).toBeInTheDocument();
    expect(screen.getByText('20,000+')).toBeInTheDocument();
    expect(screen.getByText('14')).toBeInTheDocument();

    const anthemCta = screen.getByRole('button', { name: /Listen to Flag Song|പതാകഗാനം കേൾക്കുക/i });
    fireEvent.click(anthemCta);
    expect(handleOpenAnthem).toHaveBeenCalledTimes(1);
  });

  it('provides 48px touch targets for mobile hero actions and 2x2 stats grid', () => {
    const { container } = render(
      <LanguageProvider>
        <HeroSection onOpenAnthem={vi.fn()} />
      </LanguageProvider>
    );

    const exploreBtn = screen.getByRole('link', { name: /Explore Balasangham|ബാലസംഘത്തെ അറിയുക/i });
    expect(exploreBtn).toHaveClass('min-h-[48px]');

    const statsGrid = container.querySelector('.stats-grid-2x2');
    expect(statsGrid).toBeInTheDocument();
  });
});
