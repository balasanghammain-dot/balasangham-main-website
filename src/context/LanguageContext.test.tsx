import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { LanguageProvider, useLanguage } from './LanguageContext';

function TestConsumer() {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div>
      <span data-testid="current-lang">{language}</span>
      <span data-testid="nav-about">{t.nav.about}</span>
      <button onClick={() => setLanguage('ml')}>Switch ML</button>
      <button onClick={() => setLanguage('en')}>Switch EN</button>
    </div>
  );
}

describe('LanguageContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('defaults to English when localStorage is empty', () => {
    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    );
    expect(screen.getByTestId('current-lang').textContent).toBe('en');
    expect(screen.getByTestId('nav-about').textContent).toBe('What is Balasangham?');
  });

  it('switches to Malayalam and updates translations', () => {
    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    );
    act(() => {
      screen.getByText('Switch ML').click();
    });
    expect(screen.getByTestId('current-lang').textContent).toBe('ml');
    expect(screen.getByTestId('nav-about').textContent).toBe('ആരാണ് ബാലസംഘം?');
    expect(localStorage.getItem('balasangham_lang')).toBe('ml');
  });
});
