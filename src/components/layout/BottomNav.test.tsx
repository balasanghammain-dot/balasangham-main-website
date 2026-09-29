import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from '../../context/LanguageContext';
import { BottomNav } from './BottomNav';

describe('BottomNav', () => {
  it('renders all 5 thumb navigation destinations with bilingual support', () => {
    render(
      <LanguageProvider>
        <BrowserRouter>
          <BottomNav />
        </BrowserRouter>
      </LanguageProvider>
    );

    expect(screen.getByRole('link', { name: /home|ഹോം/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /programs|പരിപാടികൾ/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /photos|ഫോട്ടോകൾ/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /news|വാർത്തകൾ/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /join|അംഗത്വം/i })).toBeInTheDocument();
  });
});
