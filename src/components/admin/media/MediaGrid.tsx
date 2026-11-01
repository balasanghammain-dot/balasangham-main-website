import React from 'react';
import { Film, Play, Eye, EyeOff, Edit3, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MediaItem } from '@/types/event';

interface MediaGridProps {
  media: MediaItem[];
  onOpenUpload: () => void;
  onTogglePublish: (item: MediaItem) => void;
  onOpenEdit: (item: MediaItem) => void;
  onOpenDelete: (item: MediaItem) => void;
}

export const MediaGrid: React.FC<MediaGridProps> = ({
  media,
  onOpenUpload,
  onTogglePublish,
  onOpenEdit,
  onOpenDelete,
}) => {
  if (media.length === 0) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl border border-gray-200 border-dashed">
        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-dark-brown/30">
          <Film className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-dark-brown mb-1">No media found</h3>
        <p className="text-dark-brown/60 text-sm max-w-sm mx-auto mb-6">
          Upload general website photos or videos, or import existing content from the local media directory.
        </p>
        <Button onClick={onOpenUpload} className="bg-deep-red text-white hover:bg-[#B31219]">
          Upload Your First Media Item
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {media.map((item) => {
        const isVideo = item.type === 'video' || item.resource_type === 'video' || item.media_type === 'video';
        const isPublished = item.published === true || item.published === 1;

        return (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            {/* Media Preview Box */}
            <div className="relative aspect-16/10 bg-gray-900 overflow-hidden">
              <img
                src={item.thumbnailUrl || item.thumbnail_url || item.secureUrl || item.url}
                alt={item.title || 'Media thumbnail'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />

              {/* Video Indicator */}
              {isVideo && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-deep-red/90 text-white flex items-center justify-center shadow-lg">
                    <Play className="w-5 h-5 ml-0.5 fill-current" />
                  </div>
                  {item.duration && (
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/80 text-white text-[10px] font-mono">
                      {typeof item.duration === 'number' ? `${Math.round(item.duration)}s` : item.duration}
                    </span>
                  )}
                </div>
              )}

              {/* Badges on top */}
              <div className="absolute top-2 left-2 flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-mono uppercase font-bold tracking-wider">
                  {isVideo ? 'VIDEO' : 'IMAGE'}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-md text-[10px] font-mono uppercase font-bold tracking-wider ${
                    isPublished ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'
                  }`}
                >
                  {isPublished ? 'PUBLISHED' : 'DRAFT'}
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-dark-brown text-sm leading-snug line-clamp-1" title={item.title || ''}>
                  {item.title || 'Untitled Media'}
                </h3>
                {item.description && (
                  <p className="text-xs text-dark-brown/60 line-clamp-2 mt-1">{item.description}</p>
                )}
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-dark-brown/50">
                <span className="truncate max-w-[150px]">
                  {item.event_title ? `Event: ${item.event_title}` : 'General Media'}
                </span>
                <span className="font-mono text-[10px] text-gray-400">
                  {item.format ? item.format.toUpperCase() : ''}
                </span>
              </div>
            </div>

            {/* Card Action Buttons */}
            <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => onTogglePublish(item)}
                className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-lg transition-colors ${
                  isPublished
                    ? 'text-amber-700 hover:bg-amber-100'
                    : 'text-emerald-700 hover:bg-emerald-100'
                }`}
                title={isPublished ? 'Unpublish from website' : 'Publish to website'}
              >
                {isPublished ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Unpublish</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Publish</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onOpenEdit(item)}
                  className="p-1.5 text-gray-600 hover:text-dark-brown hover:bg-gray-200 rounded-lg transition-colors"
                  title="Edit details"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenDelete(item)}
                  className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete media"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
