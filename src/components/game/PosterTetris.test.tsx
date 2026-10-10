import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '../../context/LanguageContext';
import { PosterTetris, COLS, ROWS, TOTAL_CELLS } from './PosterTetris';

describe('PosterTetris Component', () => {
  it('renders game title and easy mode badges', () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <PosterTetris />
        </LanguageProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/EASY MODE • POSTER REVEAL|ഈസി മോഡ്/i)).toBeInTheDocument();
    expect(screen.getByText(/8×10/)).toBeInTheDocument();
    expect(screen.getByText(/Tetris Poster Reveal Challenge|ടെട്രിസ് കളിച്ച് ജില്ലാ സമ്മേളന പോസ്റ്റർ തുറക്കൂ/i)).toBeInTheDocument();
  });

  it('renders all 80 cells in the 8x10 grid', () => {
    const { container } = render(
      <MemoryRouter>
        <LanguageProvider>
          <PosterTetris />
        </LanguageProvider>
      </MemoryRouter>
    );

    expect(TOTAL_CELLS).toBe(COLS * ROWS);
    expect(TOTAL_CELLS).toBe(80);

    // Look for cells in the board grid overlay
    const gridOverlay = container.querySelector('.select-none .grid');
    expect(gridOverlay).toBeInTheDocument();
    expect(gridOverlay?.children.length).toBe(80);
  });

  it('renders mobile touch control buttons', () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <PosterTetris />
        </LanguageProvider>
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Move Left/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Move Right/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Rotate Piece/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Soft Drop/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Hard Drop/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Star Helper/i)).toBeInTheDocument();
  });

  it('allows equipping the 1x1 magic star helper', () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <PosterTetris />
        </LanguageProvider>
      </MemoryRouter>
    );

    const starBtn = screen.getByLabelText(/Star Helper/i);
    fireEvent.click(starBtn);
    // Should trigger smoothly without crashing
    expect(screen.getByText(/Revealed:|തുറന്ന ഭാഗം:/i)).toBeInTheDocument();
  });

  it('allows settling gaps and undoing drops', () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <PosterTetris />
        </LanguageProvider>
      </MemoryRouter>
    );

    const settleBtn = screen.getByText(/Settle & Fill Gaps|ഗ്യാപ്പുകൾ നികത്തുക/i);
    expect(settleBtn).toBeInTheDocument();
    fireEvent.click(settleBtn);

    const restartBtn = screen.getByTitle(/Restart Game/i);
    expect(restartBtn).toBeInTheDocument();
    fireEvent.click(restartBtn);
  });

  it('initially has 0 revealed poster slices on an empty board', () => {
    const { container } = render(
      <MemoryRouter>
        <LanguageProvider>
          <PosterTetris />
        </LanguageProvider>
      </MemoryRouter>
    );

    const gridOverlay = container.querySelector('.select-none .grid');
    const posterImgs = gridOverlay?.querySelectorAll('img[src="/images/tetris-poster.jpg"]');
    expect(posterImgs?.length).toBe(0);

    // Empty cells must not have background images
    const boardContainer = container.querySelector('.select-none');
    expect(boardContainer).not.toHaveStyle('background-image: url("/images/tetris-poster.jpg")');
  });

  it('reveals poster slice ONLY after a piece is locked, and hides it on undo', () => {
    const { container } = render(
      <MemoryRouter>
        <LanguageProvider>
          <PosterTetris />
        </LanguageProvider>
      </MemoryRouter>
    );

    const gridOverlay = container.querySelector('.select-none .grid')!;
    
    // 0 poster images before drop
    expect(gridOverlay.querySelectorAll('img[src="/images/tetris-poster.jpg"]').length).toBe(0);

    // Moving left/right does not reveal any poster
    const moveLeftBtn = screen.getByLabelText(/Move Left/i);
    fireEvent.click(moveLeftBtn);
    expect(gridOverlay.querySelectorAll('img[src="/images/tetris-poster.jpg"]').length).toBe(0);

    // Hard drop the piece
    const hardDropBtn = screen.getByLabelText(/Hard Drop/i);
    fireEvent.click(hardDropBtn);

    // Now some cells are locked and MUST have revealed poster images
    const revealedAfterDrop = gridOverlay.querySelectorAll('img[src="/images/tetris-poster.jpg"]');
    expect(revealedAfterDrop.length).toBeGreaterThan(0);
    expect(revealedAfterDrop.length).toBeLessThanOrEqual(4);

    // Every revealed image must be inside a locked cell
    revealedAfterDrop.forEach((img) => {
      const cell = img.closest('[data-locked]');
      expect(cell).toHaveAttribute('data-locked', 'true');
    });

    // Undo the move
    const undoBtn = screen.getByText(/Undo Drop|തിരികെ എടുക്കുക/i);
    fireEvent.click(undoBtn);

    // Reveal count goes back to 0
    expect(gridOverlay.querySelectorAll('img[src="/images/tetris-poster.jpg"]').length).toBe(0);
  });
});
