import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('Balasangham Main Website Integration', () => {
  it('renders homepage editorial sections', () => {
    render(<App />);

    // About section
    expect(screen.getByRole('heading', { level: 2, name: /Democratic Movement|ജനാധിപത്യ പ്രസ്ഥാനം/i })).toBeInTheDocument();

    // Programs section
    expect(screen.getByRole('heading', { level: 2, name: /What We Do|ഞങ്ങൾ എന്താണ്/i })).toBeInTheDocument();

    // News section
    expect(screen.getByRole('heading', { level: 2, name: /Latest Stories|പുതിയ വാർത്തകൾ/i })).toBeInTheDocument();
  });

  it('switches between English and Malayalam', () => {
    render(<App />);

    const mlButtons = screen.getAllByRole('button', { name: 'മലയാളം' });
    fireEvent.click(mlButtons[0]);

    expect(screen.getAllByText(/ജനാധിപത്യ പ്രസ്ഥാനം/).length).toBeGreaterThan(0);
  });

  it('opens and closes the Flag Song modal', () => {
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
