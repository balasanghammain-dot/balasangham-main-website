import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LanguageProvider } from '../../context/LanguageContext';
import { LightboxModal } from './LightboxModal';
import { ArchiveImage } from '../../types/content';

const mockImages: ArchiveImage[] = [
  {
    id: '1',
    src: '/img1.jpg',
    thumbnail: '/img1-thumb.jpg',
    category: 'poster',
    dimensions: { width: 800, height: 600 },
    alt: { en: 'Alt 1', ml: 'ആൾട്ട് 1' },
    caption: { en: 'Caption 1', ml: 'ക്യാപ്ഷൻ 1' },
  },
  {
    id: '2',
    src: '/img2.jpg',
    thumbnail: '/img2-thumb.jpg',
    category: 'poster',
    dimensions: { width: 800, height: 600 },
    alt: { en: 'Alt 2', ml: 'ആൾട്ട് 2' },
    caption: { en: 'Caption 2', ml: 'ക്യാപ്ഷൻ 2' },
  },
];

describe('LightboxModal Component', () => {
  it('provides 48px touch targets for navigation and toolbar buttons', () => {
    render(
      <LanguageProvider>
        <LightboxModal
          images={mockImages}
          currentIndex={0}
          isOpen={true}
          onClose={() => {}}
          onNavigate={() => {}}
        />
      </LanguageProvider>
    );

    const closeBtn = screen.getByRole('button', { name: /Close image preview|ചിത്രം അടയ്ക്കുക/i });
    expect(closeBtn).toHaveClass('min-h-[48px]');
    expect(closeBtn).toHaveClass('min-w-[48px]');

    const nextBtn = screen.getByRole('button', { name: /Next image|അടുത്ത ചിത്രം/i });
    expect(nextBtn).toHaveClass('min-h-[48px]');
    expect(nextBtn).toHaveClass('min-w-[48px]');
  });

  it('supports touch swipe left and right gestures to navigate', () => {
    const onNavigate = vi.fn();
    const { container } = render(
      <LanguageProvider>
        <LightboxModal
          images={mockImages}
          currentIndex={0}
          isOpen={true}
          onClose={() => {}}
          onNavigate={onNavigate}
        />
      </LanguageProvider>
    );

    const dialog = container.querySelector('[role="dialog"]')!;

    // Swipe left (next): touchstart at 200, touchend at 100 -> deltaX = -100
    fireEvent.touchStart(dialog, { changedTouches: [{ clientX: 200, clientY: 100 }] });
    fireEvent.touchEnd(dialog, { changedTouches: [{ clientX: 100, clientY: 100 }] });
    expect(onNavigate).toHaveBeenCalledWith(1);

    onNavigate.mockClear();

    // Swipe right (prev): touchstart at 100, touchend at 200 -> deltaX = +100
    fireEvent.touchStart(dialog, { changedTouches: [{ clientX: 100, clientY: 100 }] });
    fireEvent.touchEnd(dialog, { changedTouches: [{ clientX: 200, clientY: 100 }] });
    expect(onNavigate).toHaveBeenCalledWith(1); // from index 0, prev wraps to 1
  });
});
