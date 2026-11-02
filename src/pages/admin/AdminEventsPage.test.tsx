import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '@/context/LanguageContext';
import AdminEventsPage from './AdminEventsPage';
import { subscribeToEventsAdmin, setFirestoreEventPublish } from '@/lib/eventsService';

vi.mock('@/lib/api', () => ({
  api: {
    get: vi.fn().mockResolvedValue([]),
    post: vi.fn().mockResolvedValue({}),
    delete: vi.fn().mockResolvedValue({}),
  },
}));

vi.mock('@/lib/eventsService', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/eventsService')>();
  return {
    ...actual,
    getAllEventsAdmin: vi.fn().mockResolvedValue([]),
    subscribeToEventsAdmin: vi.fn(),
    setFirestoreEventPublish: vi.fn(),
    deleteFirestoreEvent: vi.fn(),
  };
});

describe('AdminEventsPage - Dateless event handling and publish guard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  const mockEvents = [
    {
      id: 'event-dated',
      title: 'Valid Conference Event',
      start_date: '2026-10-10T09:00:00.000Z',
      published: true,
      snapshare_enabled: true,
    },
    {
      id: 'event-dateless',
      title: 'Draft Event Without Date',
      start_date: null,
      published: false,
      snapshare_enabled: false,
    },
    {
      id: 'event-epoch0',
      title: 'Legacy Event With Epoch 0',
      start_date: '1970-01-01T00:00:00.000Z',
      published: false,
      snapshare_enabled: false,
    },
  ];

  it('renders "No date" in English for dateless/epoch 0 events and never shows 1970', async () => {
    localStorage.setItem('balasangham_lang', 'en');
    vi.mocked(subscribeToEventsAdmin).mockImplementation((onUpdate) => {
      onUpdate(mockEvents as any);
      return () => {};
    });

    render(
      <MemoryRouter>
        <LanguageProvider>
          <AdminEventsPage />
        </LanguageProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Draft Event Without Date')).toBeInTheDocument();
    });

    // "No date" must appear for dateless and epoch 0 events
    const noDateBadges = screen.getAllByText('No date');
    expect(noDateBadges.length).toBe(2);

    // 1970 or 1/1/1970 must NEVER appear in the document
    expect(screen.queryByText(/1970/)).not.toBeInTheDocument();

    // Valid date event must render its real formatted date
    expect(screen.getByText(/2026/)).toBeInTheDocument();
  });

  it('renders "തീയതി ലഭ്യമല്ല" in Malayalam for dateless events', async () => {
    localStorage.setItem('balasangham_lang', 'ml');
    vi.mocked(subscribeToEventsAdmin).mockImplementation((onUpdate) => {
      onUpdate(mockEvents as any);
      return () => {};
    });

    render(
      <MemoryRouter>
        <LanguageProvider>
          <AdminEventsPage />
        </LanguageProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Draft Event Without Date')).toBeInTheDocument();
    });

    // Malayalam translation for "No date"
    const mlNoDate = screen.getAllByText('തീയതി ലഭ്യമല്ല');
    expect(mlNoDate.length).toBe(2);
    expect(screen.queryByText(/1970/)).not.toBeInTheDocument();
  });

  it('blocks publishing a dateless event and shows clear inline error', async () => {
    localStorage.setItem('balasangham_lang', 'en');
    const user = userEvent.setup();
    vi.mocked(subscribeToEventsAdmin).mockImplementation((onUpdate) => {
      onUpdate(mockEvents as any);
      return () => {};
    });

    render(
      <MemoryRouter>
        <LanguageProvider>
          <AdminEventsPage />
        </LanguageProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Draft Event Without Date')).toBeInTheDocument();
    });

    // Find the publish toggle (Eye icon) button for the dateless event
    const publishButtons = screen.getAllByTitle('Publish');
    expect(publishButtons.length).toBeGreaterThan(0);

    // Click publish on the dateless event
    await user.click(publishButtons[0]);

    // setFirestoreEventPublish must NOT be called for dateless event
    expect(setFirestoreEventPublish).not.toHaveBeenCalled();

    // Clear inline error must be visible
    expect(
      screen.getByText(/Cannot publish event without a start date/i)
    ).toBeInTheDocument();
  });
});
