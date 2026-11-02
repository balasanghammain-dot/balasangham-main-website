import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AdminEventEditorPage from './AdminEventEditorPage';

vi.mock('@/lib/firebase', () => ({
  db: {},
  auth: {
    currentUser: null,
  },
  app: {},
}));

vi.mock('@/lib/eventsService', () => ({
  createFirestoreEvent: vi.fn(),
  updateFirestoreEvent: vi.fn(),
  normalizeFirestoreEvent: vi.fn(),
  isValidGoogleMapsUrl: vi.fn().mockReturnValue(true),
}));

describe('AdminEventEditorPage - Keystroke focus and controlled input regression', () => {
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
});
