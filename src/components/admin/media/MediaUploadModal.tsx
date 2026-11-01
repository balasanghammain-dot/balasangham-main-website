import React, { useState, useRef } from 'react';
import {
  Upload,
  Video as VideoIcon,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { MediaItem } from '@/types/event';
import { createFirestoreMedia } from '@/lib/mediaService';
import { uploadFile } from '@/lib/uploadService';
import { api } from '@/lib/api';

export interface FileUploadQueueItem {
  id: string;
  file: File;
  name: string;
  size: number;
  type: 'image' | 'video';
  previewUrl: string;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

interface MediaUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: Array<{ id: string; title: string }>;
  onMediaCreated: (media: MediaItem) => void;
}

export const MediaUploadModal: React.FC<MediaUploadModalProps> = ({
  isOpen,
  onClose,
  events,
  onMediaCreated,
}) => {
  const [uploadQueue, setUploadQueue] = useState<FileUploadQueueItem[]>([]);
  const [uploadEventId, setUploadEventId] = useState<string>('none');
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploadPublished, setUploadPublished] = useState(true);
  const [isProcessingQueue, setIsProcessingQueue] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilesSelected = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newQueueItems: FileUploadQueueItem[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const isVideo = file.type.startsWith('video/') || /\.(mp4|webm|mov|mkv)$/i.test(file.name);

      newQueueItems.push({
        id: `upload-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 7)}`,
        file,
        name: file.name,
        size: file.size,
        type: isVideo ? 'video' : 'image',
        previewUrl: isVideo ? '' : URL.createObjectURL(file),
        progress: 0,
        status: 'pending',
      });
    }

    setUploadQueue((prev) => [...prev, ...newQueueItems]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeFromQueue = (id: string) => {
    setUploadQueue((prev) => prev.filter((item) => item.id !== id));
  };

  const startUploadQueue = async () => {
    const pendingItems = uploadQueue.filter((i) => i.status === 'pending' || i.status === 'error');
    if (pendingItems.length === 0) return;

    setIsProcessingQueue(true);

    for (const item of pendingItems) {
      setUploadQueue((prev) =>
        prev.map((q) => (q.id === item.id ? { ...q, status: 'uploading', progress: 30, error: undefined } : q))
      );

      const titleToUse = uploadTitle || item.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      const eventIdToUse = uploadEventId && uploadEventId !== 'none' ? uploadEventId : null;

      try {
        setUploadQueue((prev) => prev.map((q) => (q.id === item.id ? { ...q, progress: 70 } : q)));
        const uploadResult = await uploadFile(item.file, {
          eventId: eventIdToUse || undefined,
          title: titleToUse,
        });

        setUploadQueue((prev) => prev.map((q) => (q.id === item.id ? { ...q, progress: 90 } : q)));
        const mediaRecord = await createFirestoreMedia({
          title: titleToUse,
          description: uploadDescription || null,
          url: uploadResult.secure_url,
          secureUrl: uploadResult.secure_url,
          publicId: uploadResult.public_id,
          cloudinary_public_id: uploadResult.public_id,
          type: item.type,
          resource_type: item.type,
          format: uploadResult.format,
          width: uploadResult.width,
          height: uploadResult.height,
          duration: uploadResult.duration,
          thumbnail_url: uploadResult.thumbnail_url || uploadResult.secure_url,
          thumbnailUrl: uploadResult.thumbnail_url || uploadResult.secure_url,
          eventId: eventIdToUse,
          event_id: eventIdToUse,
          published: uploadPublished,
        });

        try {
          const formData = new FormData();
          formData.append('file', item.file);
          formData.append('title', titleToUse);
          if (uploadDescription) formData.append('description', uploadDescription);
          formData.append('published', uploadPublished ? '1' : '0');
          if (eventIdToUse) formData.append('eventId', eventIdToUse);
          await api.post('/api/admin/media/upload', formData);
        } catch {
          // Server sync optional
        }

        setUploadQueue((prev) =>
          prev.map((q) => (q.id === item.id ? { ...q, status: 'success', progress: 100 } : q))
        );
        onMediaCreated(mediaRecord);
      } catch (err: any) {
        setUploadQueue((prev) =>
          prev.map((q) =>
            q.id === item.id
              ? {
                  ...q,
                  status: 'error',
                  progress: 0,
                  error: err.message || 'Upload failed',
                }
              : q
          )
        );
      }
    }

    setIsProcessingQueue(false);
  };

  const retryUpload = async (id: string) => {
    const item = uploadQueue.find((i) => i.id === id);
    if (!item) return;

    setUploadQueue((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: 'uploading', progress: 40, error: undefined } : q))
    );

    const titleToUse = uploadTitle || item.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
    const eventIdToUse = uploadEventId && uploadEventId !== 'none' ? uploadEventId : null;

    try {
      setUploadQueue((prev) => prev.map((q) => (q.id === id ? { ...q, progress: 70 } : q)));
      const uploadResult = await uploadFile(item.file, {
        eventId: eventIdToUse || undefined,
        title: titleToUse,
      });

      setUploadQueue((prev) => prev.map((q) => (q.id === id ? { ...q, progress: 90 } : q)));
      const mediaRecord = await createFirestoreMedia({
        title: titleToUse,
        description: uploadDescription || null,
        url: uploadResult.secure_url,
        secureUrl: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        cloudinary_public_id: uploadResult.public_id,
        type: item.type,
        resource_type: item.type,
        format: uploadResult.format,
        width: uploadResult.width,
        height: uploadResult.height,
        duration: uploadResult.duration,
        thumbnail_url: uploadResult.thumbnail_url || uploadResult.secure_url,
        thumbnailUrl: uploadResult.thumbnail_url || uploadResult.secure_url,
        eventId: eventIdToUse,
        event_id: eventIdToUse,
        published: uploadPublished,
      });

      setUploadQueue((prev) =>
        prev.map((q) => (q.id === id ? { ...q, status: 'success', progress: 100 } : q))
      );
      onMediaCreated(mediaRecord);
    } catch (err: any) {
      setUploadQueue((prev) =>
        prev.map((q) =>
          q.id === id
            ? {
                ...q,
                status: 'error',
                progress: 0,
                error: err.message || 'Retry failed',
              }
            : q
        )
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !isProcessingQueue && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-black text-dark-brown">Upload Photos & Videos</DialogTitle>
          <DialogDescription>
            Files stream directly to Cloudinary and register in the Firestore media catalog.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-2">
          {/* Dropzone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 hover:border-deep-red rounded-3xl p-8 text-center cursor-pointer transition-colors bg-gray-50/50 hover:bg-deep-red/5 group"
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp,video/mp4,video/webm"
              onChange={(e) => handleFilesSelected(e.target.files)}
              className="hidden"
            />
            <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Upload className="w-6 h-6 text-deep-red" />
            </div>
            <p className="text-sm font-bold text-dark-brown">Click to browse files or drag & drop here</p>
            <p className="text-xs text-dark-brown/60 mt-1">
              Images (JPG, PNG, WebP) & Videos (MP4, WebM) up to 50MB
            </p>
          </div>

          {/* Upload Queue List */}
          {uploadQueue.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-dark-brown uppercase tracking-wider">
                <span>Selected Files ({uploadQueue.length})</span>
                <button
                  type="button"
                  onClick={() => setUploadQueue([])}
                  className="text-red-500 hover:underline"
                  disabled={isProcessingQueue}
                >
                  Clear All
                </button>
              </div>

              <div className="max-h-48 overflow-y-auto space-y-2 pr-1 divide-y divide-gray-100">
                {uploadQueue.map((item) => (
                  <div key={item.id} className="pt-2 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                      {item.type === 'video' ? (
                        <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
                          <VideoIcon className="w-5 h-5 text-deep-red" />
                        </div>
                      ) : (
                        <img src={item.previewUrl} alt="" className="w-full h-full object-cover" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-dark-brown truncate">{item.name}</p>
                      <p className="text-[10px] text-dark-brown/50">
                        {(item.size / (1024 * 1024)).toFixed(2)} MB • {item.type.toUpperCase()}
                      </p>

                      {item.status === 'uploading' && (
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1 overflow-hidden">
                          <div
                            className="bg-deep-red h-full transition-all duration-300"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      )}

                      {item.status === 'error' && (
                        <p className="text-[10px] text-red-600 font-bold mt-0.5">{item.error || 'Failed'}</p>
                      )}
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      {item.status === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                      {item.status === 'error' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => retryUpload(item.id)}
                          className="h-7 text-xs text-deep-red hover:bg-deep-red/10"
                        >
                          <RefreshCw className="w-3 h-3 mr-1" />
                          Retry
                        </Button>
                      )}
                      {item.status === 'pending' && (
                        <button
                          type="button"
                          onClick={() => removeFromQueue(item.id)}
                          className="text-gray-400 hover:text-red-500 p-1"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Optional Metadata Settings */}
          <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-dark-brown/70">
              Media Details (Optional)
            </h4>

            <div>
              <label className="block text-xs font-bold text-dark-brown mb-1">Title (Default: file name)</label>
              <input
                type="text"
                value={uploadTitle}
                onChange={(e) => setUploadTitle(e.target.value)}
                placeholder="Enter a descriptive title"
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 bg-white focus:border-deep-red outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-dark-brown mb-1">Description / Caption</label>
              <textarea
                value={uploadDescription}
                onChange={(e) => setUploadDescription(e.target.value)}
                rows={2}
                placeholder="Optional brief description or caption"
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 bg-white focus:border-deep-red outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-dark-brown mb-1">Related Event (Optional)</label>
                <select
                  value={uploadEventId}
                  onChange={(e) => setUploadEventId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 bg-white focus:border-deep-red outline-none"
                >
                  <option value="none">No Event (General Media)</option>
                  {events.map((ev) => (
                    <option key={ev.id} value={ev.id}>
                      {ev.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center pt-5">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-dark-brown">
                  <input
                    type="checkbox"
                    checked={uploadPublished}
                    onChange={(e) => setUploadPublished(e.target.checked)}
                    className="rounded border-gray-300 text-deep-red focus:ring-deep-red"
                  />
                  <span>Publish immediately to /media</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="ghost" onClick={onClose} disabled={isProcessingQueue}>
            Cancel
          </Button>
          <Button
            onClick={startUploadQueue}
            disabled={
              isProcessingQueue ||
              uploadQueue.filter((i) => i.status === 'pending' || i.status === 'error').length === 0
            }
            className="bg-deep-red text-white hover:bg-[#B31219]"
          >
            {isProcessingQueue ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading to Cloudinary...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload Selected ({uploadQueue.filter((i) => i.status === 'pending' || i.status === 'error').length})
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
