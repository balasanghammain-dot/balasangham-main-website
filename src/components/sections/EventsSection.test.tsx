import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LanguageProvider } from '../../context/LanguageContext';
import { EventsSection } from './EventsSection';

describe('EventsSection Component (Pillar 3)', () => {
  it('renders section title and filters items based on selected tab', () => {
    render(
      <LanguageProvider>
        <EventsSection />
      </LanguageProvider>
    );

    expect(screen.getByRole('heading', { level: 2, name: /Events Conducted|മേളകളും പരിപാടികളും/i })).toBeInTheDocument();
    expect(screen.getByText(/Bala Kalolsavam|ബാല കലോത്സവം/i)).toBeInTheDocument();

    const memorialFilter = screen.getByRole('button', { name: /Observance Days|Memorial|സ്മരണാ/i });
    fireEvent.click(memorialFilter);

    expect(screen.getByText(/Hiroshima & Nagasaki|ഹിരോഷിമ - നാഗസാക്കി/i)).toBeInTheDocument();
  });
});
