import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('Balasangham Main Website Integration', () => {
  it('renders all four foundational pillars on the page', () => {
    render(<App />);

    // Pillar 1: What is Balasangham
    expect(screen.getByRole('heading', { level: 2, name: /What is Balasangham\?/i })).toBeInTheDocument();

    // Pillar 2: What We Do
    expect(screen.getByRole('heading', { level: 2, name: /What We Do/i })).toBeInTheDocument();

    // Pillar 3: Events Conducted
    expect(screen.getByRole('heading', { level: 2, name: /Events Conducted/i })).toBeInTheDocument();

    // Pillar 4: History & Heritage
    expect(screen.getByRole('heading', { level: 2, name: /History & Heritage/i })).toBeInTheDocument();
  });

  it('switches between English and Malayalam seamlessly without breaking content', () => {
    render(<App />);

    const mlButtons = screen.getAllByRole('button', { name: 'മലയാളം' });
    fireEvent.click(mlButtons[0]);

    expect(screen.getAllByText('ആരാണ് ബാലസംഘം?').length).toBeGreaterThan(0);
    expect(screen.getAllByText('പ്രവർത്തനങ്ങൾ').length).toBeGreaterThan(0);
    expect(screen.getAllByText('മേളകളും പരിപാടികളും').length).toBeGreaterThan(0);
    expect(screen.getAllByText('ചരിത്രവും നാൾവഴികളും').length).toBeGreaterThan(0);
  });

  it('opens and closes the Flag Song modal with authentic Malayalam song', () => {
    render(<App />);

    const anthemButtons = screen.getAllByRole('button', { name: /Flag Song|പതാകഗാനം/i });
    fireEvent.click(anthemButtons[0]);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/ഉണരുക ഉയരുക ശുഭ്രപതാകേ/)).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: /close anthem modal/i });
    fireEvent.click(closeBtn);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
