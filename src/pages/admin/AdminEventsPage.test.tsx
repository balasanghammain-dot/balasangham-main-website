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
      id: 'event-dated-draft',
      title: 'Dated Draft Event',
      start_date: '2026-11-20T10:00:00.000Z',
      published: false,
      snapshare_enabled: false,
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
    expect(screen.getByText(/Oct 10, 2026/)).toBeInTheDocument();
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

    // Find the publish toggle (Eye icon) button specifically for the dateless event row
    const datelessRow = screen.getByText('Draft Event Without Date').closest('tr');
    expect(datelessRow).toBeInTheDocument();

    const publishBtn = datelessRow?.querySelector('button[title="Publish"]') as HTMLButtonElement;
    expect(publishBtn).toBeInTheDocument();

    // Click publish on the dateless event
    await user.click(publishBtn);

    // setFirestoreEventPublish must NOT be called for dateless event
    expect(setFirestoreEventPublish).not.toHaveBeenCalled();

    // Clear inline error must be visible
    expect(
      screen.getByText(/Cannot publish event without a start date/i)
    ).toBeInTheDocument();
  });

  it('publishes a dated draft event directly via setFirestoreEventPublish without calling Express', async () => {
    localStorage.setItem('balasangham_lang', 'en');
    const user = userEvent.setup();
    vi.mocked(subscribeToEventsAdmin).mockImplementation((onUpdate) => {
      onUpdate(mockEvents as any);
      return () => {};
    });
    vi.mocked(setFirestoreEventPublish).mockResolvedValueOnce(undefined);

    render(
      <MemoryRouter>
        <LanguageProvider>
          <AdminEventsPage />
        </LanguageProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Dated Draft Event')).toBeInTheDocument();
    });

    // Row containing Dated Draft Event
    const datedDraftRow = screen.getByText('Dated Draft Event').closest('tr');
    expect(datedDraftRow).toBeInTheDocument();

    const publishBtn = datedDraftRow?.querySelector('button[title="Publish"]') as HTMLButtonElement;
    expect(publishBtn).toBeInTheDocument();

    await user.click(publishBtn);

    // setFirestoreEventPublish must be called with id and true
    expect(setFirestoreEventPublish).toHaveBeenCalledWith('event-dated-draft', true);
  });

  it('unpublishes an event directly via setFirestoreEventPublish without calling Express', async () => {
    localStorage.setItem('balasangham_lang', 'en');
    const user = userEvent.setup();
    vi.mocked(subscribeToEventsAdmin).mockImplementation((onUpdate) => {
      onUpdate(mockEvents as any);
      return () => {};
    });
    vi.mocked(setFirestoreEventPublish).mockResolvedValueOnce(undefined);

    render(
      <MemoryRouter>
        <LanguageProvider>
          <AdminEventsPage />
        </LanguageProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Valid Conference Event')).toBeInTheDocument();
    });

    const publishedRow = screen.getByText('Valid Conference Event').closest('tr');
    expect(publishedRow).toBeInTheDocument();

    const unpublishBtn = publishedRow?.querySelector('button[title="Unpublish"]') as HTMLButtonElement;
    expect(unpublishBtn).toBeInTheDocument();

    await user.click(unpublishBtn);

    // setFirestoreEventPublish must be called with id and false
    expect(setFirestoreEventPublish).toHaveBeenCalledWith('event-dated', false);
  });

  it('displays user-friendly permission-denied error inline when Firestore update fails without window.alert', async () => {
    localStorage.setItem('balasangham_lang', 'en');
    const user = userEvent.setup();
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    vi.mocked(subscribeToEventsAdmin).mockImplementation((onUpdate) => {
      onUpdate(mockEvents as any);
      return () => {};
    });
    vi.mocked(setFirestoreEventPublish).mockRejectedValueOnce({
      code: 'permission-denied',
      message: 'Missing or insufficient permissions.'
    });

    render(
      <MemoryRouter>
        <LanguageProvider>
          <AdminEventsPage />
        </LanguageProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Dated Draft Event')).toBeInTheDocument();
    });

    const datedDraftRow = screen.getByText('Dated Draft Event').closest('tr');
    const publishBtn = datedDraftRow?.querySelector('button[title="Publish"]') as HTMLButtonElement;

    await user.click(publishBtn);

    // Alert must NOT be called
    expect(alertSpy).not.toHaveBeenCalled();

    // Friendly inline error must be rendered
    expect(
      await screen.findByText(/Permission denied\. Sign out and back in, or ask an admin to assign your admin claim\./i)
    ).toBeInTheDocument();
  });
});
