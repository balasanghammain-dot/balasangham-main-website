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
});
