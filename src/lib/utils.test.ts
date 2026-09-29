import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility', () => {
  it('merges class names and handles conditional falsy values', () => {
    expect(cn('px-2', 'py-1')).toBe('px-2 py-1');
    expect(cn('px-2', false && 'py-1', undefined, null, 'bg-red-500')).toBe('px-2 bg-red-500');
  });

  it('resolves tailwind class conflicts correctly', () => {
    expect(cn('p-4', 'p-2')).toBe('p-2');
  });
});
