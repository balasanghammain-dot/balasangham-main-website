import React, { useEffect, useRef, useCallback } from 'react';
import { ArchiveImage } from '../../types/content';
import { useLanguage } from '../../context/LanguageContext';
import { X, ChevronLeft, ChevronRight, Download, Share2 } from 'lucide-react';

interface LightboxModalProps {
  images: ArchiveImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate
}) => {
  const { language } = useLanguage();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const currentImage = images[currentIndex];

  const handlePrev = useCallback(() => {
    if (images.length <= 1) return;
    const nextIdx = (currentIndex - 1 + images.length) % images.length;
    onNavigate(nextIdx);
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (images.length <= 1) return;
    const nextIdx = (currentIndex + 1) % images.length;
    onNavigate(nextIdx);
  }, [currentIndex, images.length, onNavigate]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
    touchStartY.current = e.changedTouches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Only swipe if horizontal movement is dominant and > 50px
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Save previous active element & lock scroll
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      // Focus close button initially
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
      previousActiveElement.current?.focus();
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard navigation & focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'Tab') {
        // Focus trap
        if (!modalRef.current) return;
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentImage) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={currentImage.caption[language]}
      ref={modalRef}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 sm:p-6 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Top Toolbar with safe-area insets */}
      <div className="absolute top-[max(1rem,env(safe-area-inset-top))] right-[max(1rem,env(safe-area-inset-right))] z-50 flex items-center gap-3">
        <span className="text-white/70 text-xs sm:text-sm font-medium font-mono">
          {currentIndex + 1} / {images.length}
        </span>
        <a
          href={currentImage.src}
          download={`balasangham-${currentImage.id}.jpg`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={language === 'ml' ? 'ഡൗൺലോഡ് ചെയ്യുക' : 'Download image'}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
        >
          <Download className="w-5 h-5" aria-hidden="true" />
        </a>
        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.share({
                  title: currentImage.alt[language],
                  text: currentImage.caption[language],
                  url: window.location.origin + currentImage.src,
                });
              } catch {
                // Ignore cancel
              }
            }}
            aria-label={language === 'ml' ? 'പങ്കുവെക്കുക' : 'Share image'}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
          >
            <Share2 className="w-5 h-5" aria-hidden="true" />
          </button>
        )}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label={language === 'ml' ? 'ചിത്രം അടയ്ക്കുക' : 'Close image preview'}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
        >
          <X className="w-6 h-6" aria-hidden="true" />
        </button>
      </div>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label={language === 'ml' ? 'മുമ്പത്തെ ചിത്രം' : 'Previous image'}
            className="absolute left-3 sm:left-6 z-40 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label={language === 'ml' ? 'അടുത്ത ചിത്രം' : 'Next image'}
            className="absolute right-3 sm:right-6 z-40 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
          >
            <ChevronRight className="w-6 h-6" aria-hidden="true" />
          </button>
        </>
      )}

      {/* Image & Caption Container */}
      <div className="max-w-4xl max-h-[90vh] flex flex-col items-center justify-center p-2">
        <div className="relative max-h-[75vh] flex items-center justify-center overflow-hidden rounded-lg bg-black/40">
          <img
            src={currentImage.src}
            alt={currentImage.alt[language]}
            className="max-h-[75vh] w-auto object-contain rounded-lg"
          />
        </div>

        {/* Caption */}
        <div className="mt-4 text-center max-w-2xl px-4">
          <p
            className="text-white text-sm sm:text-base font-medium font-ml-body"
            style={{ lineHeight: language === 'ml' ? 1.7 : 1.5 }}
          >
            {currentImage.caption[language]}
          </p>
          <p className="text-white/50 text-xs mt-1">
            {language === 'ml' ? 'ഔദ്യോഗിക കലാവിരുന്ന് • ബാലസംഘം കണ്ണൂർ' : 'Official Archive Artwork • Balasangham Kannur'}
          </p>
        </div>
      </div>
    </div>
  );
};
