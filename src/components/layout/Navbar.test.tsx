import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '../../context/LanguageContext';
import { Navbar } from './Navbar';

describe('Navbar Component', () => {
  it('renders brand identity and primary nav links', () => {
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

  it('renders mobile menu trigger button', () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <Navbar onOpenAnthem={vi.fn()} />
        </LanguageProvider>
      </MemoryRouter>
    );

    const menuBtn = screen.getByRole('button', { name: /open navigation menu/i });
    expect(menuBtn).toBeInTheDocument();
  });

  it('renders flag song button in desktop nav', () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <Navbar onOpenAnthem={vi.fn()} />
        </LanguageProvider>
      </MemoryRouter>
    );

    const anthemBtns = screen.getAllByRole('button', { name: /Flag Song|പതാകഗാനം/i });
    expect(anthemBtns.length).toBeGreaterThan(0);
  });
});
