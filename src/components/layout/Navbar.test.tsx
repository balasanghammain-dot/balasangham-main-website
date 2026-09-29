import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '../../context/LanguageContext';
import { Navbar } from './Navbar';

describe('Navbar Component', () => {
  it('renders brand identity and primary nav links by default', () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <Navbar onOpenAnthem={vi.fn()} />
        </LanguageProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Balasangham')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /programs/i })).toHaveAttribute('href', '/programs');
    expect(screen.getByRole('link', { name: /events/i })).toHaveAttribute('href', '/events');
    expect(screen.getByRole('link', { name: /news/i })).toHaveAttribute('href', '/news');
  });

  it('triggers onOpenAnthem when Anthem button is clicked', () => {
    const handleOpenAnthem = vi.fn();
    render(
      <MemoryRouter>
        <LanguageProvider>
          <Navbar onOpenAnthem={handleOpenAnthem} />
        </LanguageProvider>
      </MemoryRouter>
    );

    const anthemBtns = screen.getAllByRole('button', { name: /Flag Song|പതാകഗാനം/i });
    fireEvent.click(anthemBtns[0]);
    expect(handleOpenAnthem).toHaveBeenCalledTimes(1);
  });

  it('toggles mobile menu on mobile hamburger click with accessible aria-expanded', () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <Navbar onOpenAnthem={vi.fn()} />
        </LanguageProvider>
      </MemoryRouter>
    );

    const menuBtn = screen.getByRole('button', { name: /toggle navigation menu/i });
    expect(menuBtn).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(menuBtn);
    expect(menuBtn).toHaveAttribute('aria-expanded', 'true');
  });

  it('provides safe-area top styling and minimum 48px touch targets for mobile menu trigger', () => {
    const { container } = render(
      <MemoryRouter>
        <LanguageProvider>
          <Navbar onOpenAnthem={vi.fn()} />
        </LanguageProvider>
      </MemoryRouter>
    );

    const header = container.querySelector('header');
    expect(header).toHaveClass('pt-safe');

    const menuBtn = screen.getByRole('button', { name: /toggle navigation menu/i });
    expect(menuBtn).toHaveClass('min-h-[48px]');
    expect(menuBtn).toHaveClass('min-w-[48px]');
  });
});
