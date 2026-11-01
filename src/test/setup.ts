import '@testing-library/jest-dom';
import { vi, beforeEach } from 'vitest';

if (typeof window !== 'undefined') {
  window.scrollTo = vi.fn();
}

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
}

if (typeof window !== 'undefined') {
  window.IntersectionObserver = MockIntersectionObserver;
}
global.IntersectionObserver = MockIntersectionObserver;

beforeEach(() => {
  if (typeof localStorage !== 'undefined') {
    localStorage.clear();
  }
});

