import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LanguageProvider } from '../../context/LanguageContext';
import { HistorySection } from './HistorySection';

describe('HistorySection Component (Pillar 4)', () => {
  it('renders historic 1938 Kalliasseri genesis and pioneers gallery', () => {
    render(
      <LanguageProvider>
        <HistorySection />
      </LanguageProvider>
    );

    expect(screen.getByRole('heading', { level: 2, name: /History & Heritage|ചരിത്രവും നാൾവഴികളും/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Kalliasseri|കല്ല്യാശ്ശേരി/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/P. Krishna Pillai|പി. കൃഷ്ണപിള്ള/i)).toBeInTheDocument();
    expect(screen.getByText(/A.K. Gopalan|എ.കെ. ജി/i)).toBeInTheDocument();
    expect(screen.getByText(/E.M.S. Namboodiripad|ഇ.എം.എസ്/i)).toBeInTheDocument();
  });

  it('renders chronological timeline milestones', () => {
    render(
      <LanguageProvider>
        <HistorySection />
      </LanguageProvider>
    );

    expect(screen.getAllByText('1938').length).toBeGreaterThan(0);
    expect(screen.getAllByText('1980').length).toBeGreaterThan(0);
    expect(screen.getAllByText('1990').length).toBeGreaterThan(0);
  });
});
