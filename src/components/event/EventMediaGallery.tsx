import React, { useState } from 'react';
import { MediaItem } from '../../types/event';
import { LightboxModal } from '../conference/LightboxModal';
import { ArchiveImage } from '../../types/content';
import { useLanguage } from '../../context/LanguageContext';
import { Image } from 'lucide-react';

interface EventMediaGalleryProps {
  media: MediaItem[];
  className?: string;
}

export const EventMediaGallery: React.FC<EventMediaGalleryProps> = ({ media, className }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const { language } = useLanguage();

  if (!media || media.length === 0) return null;

  // Convert MediaItem to ArchiveImage for the LightboxModal
  const archiveImages: ArchiveImage[] = media.map((item) => ({
    id: item.id,
    src: item.url,
    thumbnail: item.thumbnail_url || item.url,
    alt: {
      en: item.caption || 'Event Image',
      ml: item.caption_ml || item.caption || 'Event Image'
    },
    caption: {
      en: item.caption || 'Event Image',
      ml: item.caption_ml || item.caption || 'Event Image'
    },
    category: (item.media_type as any) || 'historical',
    dimensions: { width: item.width || 800, height: item.height || 600 }
  }));

  const openLightbox = (index: number) => {
    setCurrentIdx(index);
    setLightboxOpen(true);
  };

  return (
    <div className={className}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {media.map((item, index) => (
          <button
            key={item.id}
            onClick={() => openLightbox(index)}
            className="group relative aspect-square overflow-hidden rounded-xl bg-warm-cream border border-warm-orange/10 transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-deep-red focus:ring-offset-2"
          >
            {item.thumbnail_url || item.url ? (
              <img
                src={item.thumbnail_url || item.url}
                alt={language === 'ml' ? item.caption_ml || '' : item.caption || ''}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-dark-brown/30">
                <Image className="w-8 h-8" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        ))}
      </div>

      <LightboxModal
        images={archiveImages}
        currentIndex={currentIdx}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setCurrentIdx}
      />
    </div>
  );
};
