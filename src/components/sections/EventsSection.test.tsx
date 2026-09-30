import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '../../context/LanguageContext';
import { EventSection } from './EventsSection';

describe('EventSection Component', () => {
  it('renders featured conference event with date and location', () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <EventSection />
        </LanguageProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('2026')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /VIEW EVENT|സമ്മേളന വിവരങ്ങൾ/i })).toBeInTheDocument();
  });

  it('shows conference poster image', () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <EventSection />
        </LanguageProvider>
      </MemoryRouter>
    );

    expect(screen.getByAltText(/conference 2026 poster/i)).toBeInTheDocument();
  });
});
