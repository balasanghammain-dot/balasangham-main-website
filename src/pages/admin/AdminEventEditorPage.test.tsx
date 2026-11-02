import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AdminEventEditorPage from './AdminEventEditorPage';
import { createFirestoreEvent } from '@/lib/eventsService';

vi.mock('@/lib/firebase', () => ({
  db: {},
  auth: {
    currentUser: null,
  },
  app: {},
}));

vi.mock('@/lib/eventsService', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/eventsService')>();
  return {
    ...actual,
    createFirestoreEvent: vi.fn(),
    updateFirestoreEvent: vi.fn(),
    normalizeFirestoreEvent: vi.fn(),
    isValidGoogleMapsUrl: vi.fn().mockReturnValue(true),
  };
});

describe('AdminEventEditorPage - Date validation and submission workflows', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('types full string into Title (English) and Short Description (English) while maintaining focus', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <MemoryRouter initialEntries={['/admin/events/new']}>
        <Routes>
          <Route path="/admin/events/new" element={<AdminEventEditorPage />} />
        </Routes>
      </MemoryRouter>
    );

    const titleInput = container.querySelector('input[name="title"]') as HTMLInputElement;
    expect(titleInput).toBeInTheDocument();

    await user.click(titleInput);
    expect(document.activeElement).toBe(titleInput);

    await user.type(titleInput, 'District Conference');
    expect(titleInput).toHaveValue('District Conference');
    expect(document.activeElement).toBe(titleInput);

    const descInput = container.querySelector('textarea[name="short_description"]') as HTMLTextAreaElement;
    expect(descInput).toBeInTheDocument();

    await user.click(descInput);
    expect(document.activeElement).toBe(descInput);

    await user.type(descInput, 'Annual gathering of children');
    expect(descInput).toHaveValue('Annual gathering of children');
    expect(document.activeElement).toBe(descInput);
  });

  it('types full string into Malayalam title and description fields without dropping focus', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <MemoryRouter initialEntries={['/admin/events/new']}>
        <Routes>
          <Route path="/admin/events/new" element={<AdminEventEditorPage />} />
        </Routes>
      </MemoryRouter>
    );

    const titleMlInput = container.querySelector('input[name="title_ml"]') as HTMLInputElement;
    expect(titleMlInput).toBeInTheDocument();

    await user.click(titleMlInput);
    expect(document.activeElement).toBe(titleMlInput);

    await user.type(titleMlInput, 'ജില്ലാ സമ്മേളനം');
    expect(titleMlInput).toHaveValue('ജില്ലാ സമ്മേളനം');
    expect(document.activeElement).toBe(titleMlInput);
  });

  it('allows saving draft without a start date and sets date to null', async () => {
    const user = userEvent.setup();
    vi.mocked(createFirestoreEvent).mockResolvedValue({
      id: 'mock-draft-1',
      slug: 'draft-event',
      title: 'Draft Event Without Date',
      start_date: null,
      startDate: null,
      published: 0,
    } as any);

    render(
      <MemoryRouter initialEntries={['/admin/events/new']}>
        <Routes>
          <Route path="/admin/events/new" element={<AdminEventEditorPage />} />
        </Routes>
      </MemoryRouter>
    );

    const titleInput = screen.getByLabelText(/Title \(English\) \*/i);
    await user.type(titleInput, 'Draft Event Without Date');

    // Start date input is left empty
    const saveDraftBtn = screen.getByRole('button', { name: /Save Draft/i });
    await user.click(saveDraftBtn);

    expect(createFirestoreEvent).toHaveBeenCalledTimes(1);
    const payload = vi.mocked(createFirestoreEvent).mock.calls[0][0];
    expect(payload.title).toBe('Draft Event Without Date');
    expect(payload.published).toBe(false);
    expect(payload.start_date).toBeNull();
    expect(payload.startDate).toBeNull();
  });

  it('blocks publish to website when start date is empty and displays clear error', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/admin/events/new']}>
        <Routes>
          <Route path="/admin/events/new" element={<AdminEventEditorPage />} />
        </Routes>
      </MemoryRouter>
    );

    const titleInput = screen.getByLabelText(/Title \(English\) \*/i);
    await user.type(titleInput, 'Conference Requiring Date');

    const publishBtn = screen.getByRole('button', { name: /Publish to Website/i });
    await user.click(publishBtn);

    // createFirestoreEvent must NOT be called
    expect(createFirestoreEvent).not.toHaveBeenCalled();

    // Clear inline error must appear
    expect(screen.getByText('Start date is required to publish the event to the website.')).toBeInTheDocument();
  });

  it('allows publishing when a real start date is provided', async () => {
    const user = userEvent.setup();
    vi.mocked(createFirestoreEvent).mockResolvedValue({
      id: 'mock-pub-1',
      slug: 'published-event',
      title: 'Published Event',
      start_date: '2026-11-20',
      startDate: '2026-11-20',
      published: 1,
    } as any);

    const { container } = render(
      <MemoryRouter initialEntries={['/admin/events/new']}>
        <Routes>
          <Route path="/admin/events/new" element={<AdminEventEditorPage />} />
        </Routes>
      </MemoryRouter>
    );

    const titleInput = screen.getByLabelText(/Title \(English\) \*/i);
    await user.type(titleInput, 'Published Event');

    const dateInput = container.querySelector('input[name="start_date"]') as HTMLInputElement;
    await user.type(dateInput, '2026-11-20');

    const publishBtn = screen.getByRole('button', { name: /Publish to Website/i });
    await user.click(publishBtn);

    expect(createFirestoreEvent).toHaveBeenCalledTimes(1);
    const payload = vi.mocked(createFirestoreEvent).mock.calls[0][0];
    expect(payload.title).toBe('Published Event');
    expect(payload.published).toBe(true);
    expect(payload.start_date).toBe('2026-11-20');
  });
});
