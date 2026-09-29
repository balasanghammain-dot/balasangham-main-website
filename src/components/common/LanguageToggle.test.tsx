import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { LanguageProvider } from '../../context/LanguageContext';
import { LanguageToggle } from './LanguageToggle';

describe('LanguageToggle Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders both EN and Malayalam buttons and triggers language switch', () => {
    render(
      <LanguageProvider>
        <LanguageToggle />
      </LanguageProvider>
    );

    const enBtn = screen.getByRole('button', { name: 'EN' });
    const mlBtn = screen.getByRole('button', { name: 'മലയാളം' });

    expect(enBtn).toHaveAttribute('aria-pressed', 'true');
    expect(mlBtn).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(mlBtn);

    expect(enBtn).toHaveAttribute('aria-pressed', 'false');
    expect(mlBtn).toHaveAttribute('aria-pressed', 'true');
  });
});
