import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from '../context/LanguageContext';
import { EventsPage } from './EventsPage';

import { beforeEach, afterEach, vi } from 'vitest';

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok: true,
    json: async () => []
  }));
});

afterEach(() => {
  vi.unstubAllGlobals();
});

const renderEventsPage = async (initialLanguage: 'en' | 'ml' = 'en') => {
  localStorage.setItem('balasangham_lang', initialLanguage);
  let utils: any;
  await act(async () => {
    utils = render(
      <BrowserRouter>
        <LanguageProvider>
          <EventsPage />
        </LanguageProvider>
      </BrowserRouter>
    );
  });
  return utils;
};

describe('EventsPage Component', () => {
  it('renders events page heading and filter tabs without archives', async () => {
    await renderEventsPage('en');
    expect(screen.getByRole('heading', { level: 1, name: /Events/i })).toBeInTheDocument();

    // Verify tabs
    expect(screen.getByRole('button', { name: /All Events/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Upcoming/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Past Events/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Observances/i })).toBeInTheDocument();

    // Archives tab must NOT exist
    expect(screen.queryByRole('button', { name: /Archives/i })).not.toBeInTheDocument();
  });

  it('permanently removed Conference Archive section', async () => {
    await renderEventsPage('en');
    expect(screen.queryByText(/Conference Archive/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/മുൻ സമ്മേളനങ്ങൾ/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/6th State Conference/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Pilathara, Kannur/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Elected current District Committee/i)).not.toBeInTheDocument();
  });

  it('renders annual observances section correctly', async () => {
    await renderEventsPage('en');
    expect(screen.getByText(/Annual Observances & Peace Days/i)).toBeInTheDocument();
    expect(screen.getByText(/Balasangham Foundation Day/i)).toBeInTheDocument();
    expect(screen.getByText(/Hiroshima Peace Day/i)).toBeInTheDocument();
  });
});
