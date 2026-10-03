import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { X, Film } from 'lucide-react';

export interface VideoModalItem {
  id: string;
  title: string;
  titleMl?: string;
  description?: string;
  descriptionMl?: string;
  url: string;
  poster?: string;
  duration?: string | number | null;
  category?: string;
}

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: VideoModalItem | null;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  isOpen,
  onClose,
  video,
}) => {
  const { language } = useLanguage();
  const ml = language === 'ml';
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Keyboard navigation & lock scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  // Pause video on close
  useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isOpen]);

  if (!isOpen || !video) return null;

  const displayTitle = ml && video.titleMl ? video.titleMl : video.title;
  const displayDesc = ml && video.descriptionMl ? video.descriptionMl : video.description;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={displayTitle}
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 sm:p-6 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Top Toolbar */}
      <div className="absolute top-[max(1rem,env(safe-area-inset-top))] right-[max(1rem,env(safe-area-inset-right))] z-50 flex items-center gap-3">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label={ml ? 'വീഡിയോ അടയ്ക്കുക' : 'Close video player'}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
        >
          <X className="w-6 h-6" aria-hidden="true" />
        </button>
      </div>

      {/* Video & Info Container */}
      <div className="w-full max-w-4xl max-h-[92vh] flex flex-col items-center justify-center p-2">
        <div className="relative w-full max-h-[72vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black shadow-2xl border border-white/10">
          <video
            ref={videoRef}
            src={video.url}
            poster={video.poster}
            controls
            playsInline
            preload="metadata"
            className="w-full max-h-[72vh] object-contain rounded-2xl"
          >
            <source src={video.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Caption & Metadata */}
        <div className="mt-4 text-center max-w-2xl px-4 text-white">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D32020] text-white text-[10px] font-mono uppercase font-bold tracking-wider mb-2">
            <Film className="w-3 h-3" />
            <span>{video.category ? video.category.toUpperCase() : 'VIDEO ARCHIVE'}</span>
          </div>
          <h2 className={`text-base sm:text-lg font-bold leading-snug ${ml ? 'font-malayalam' : ''}`}>
            {displayTitle}
          </h2>
          {displayDesc && (
            <p className={`text-xs sm:text-sm text-white/70 mt-1.5 leading-relaxed ${ml ? 'font-malayalam-body leading-[1.6]' : ''}`}>
              {displayDesc}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
