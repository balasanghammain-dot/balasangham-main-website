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
    expect(screen.getByRole('link', { name: /events/i })).toHaveAttribute('href', '/events');
    expect(screen.getByRole('link', { name: /media/i })).toHaveAttribute('href', '/media');
    expect(screen.getByRole('link', { name: /contact/i })).toHaveAttribute('href', '/contact');

    // Confirm removed sections are not in navigation
    expect(screen.queryByRole('link', { name: /^programs$/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /^news$/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /^publications$/i })).not.toBeInTheDocument();
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
