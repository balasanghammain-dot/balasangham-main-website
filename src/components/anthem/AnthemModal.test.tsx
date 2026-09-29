import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LanguageProvider } from '../../context/LanguageContext';
import { AnthemModal } from './AnthemModal';

describe('AnthemModal Component', () => {
  it('renders modal when isOpen is true with lyrics and audio controls', () => {
    const handleClose = vi.fn();
    render(
      <LanguageProvider>
        <AnthemModal isOpen={true} onClose={handleClose} />
      </LanguageProvider>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/ഉണരുക ഉയരുക ശുഭ്രപതാകേ/)).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: /close anthem modal/i });
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('toggles play/pause state when play button is clicked', () => {
    render(
      <LanguageProvider>
        <AnthemModal isOpen={true} onClose={vi.fn()} />
      </LanguageProvider>
    );

    const playBtn = screen.getByRole('button', { name: /play anthem|pause anthem/i });
    expect(playBtn).toBeInTheDocument();
    fireEvent.click(playBtn);
    expect(screen.getByRole('button', { name: /pause anthem/i })).toBeInTheDocument();
  });
});
