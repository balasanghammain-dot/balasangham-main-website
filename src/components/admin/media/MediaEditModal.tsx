import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
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
import { updateFirestoreMedia } from '@/lib/mediaService';
import { api } from '@/lib/api';

interface MediaEditModalProps {
  item: MediaItem | null;
  events: Array<{ id: string; title: string }>;
  onClose: () => void;
  onSaved: (updatedItem: MediaItem) => void;
}

export const MediaEditModal: React.FC<MediaEditModalProps> = ({
  item,
  events,
  onClose,
  onSaved,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [published, setPublished] = useState(true);
  const [eventId, setEventId] = useState('none');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (item) {
      setTitle(item.title || item.caption || '');
      setDescription(item.description || item.caption_ml || '');
      setPublished(item.published === true || item.published === 1);
      setEventId(item.eventId || item.event_id || 'none');
      setError('');
    }
  }, [item]);

  if (!item) return null;

  const handleSave = async () => {
    setError('');
    try {
      setIsSaving(true);
      const targetEventId = eventId === 'none' ? null : eventId;

      await updateFirestoreMedia(item.id, {
        title,
        description,
        published,
        eventId: targetEventId,
      });

      try {
        await api.put(`/api/admin/media/${item.id}`, {
          title,
          description,
          published,
          eventId: targetEventId,
        });
      } catch {
        // Server sync optional
      }

      onSaved({
        ...item,
        title,
        description,
        published,
        eventId: targetEventId,
        event_id: targetEventId,
      });
      onClose();
    } catch (err: any) {
      const code = err?.code || '';
      const msg = err?.message || '';
      if (
        code === 'permission-denied' ||
        msg.includes('permission-denied') ||
        msg.toLowerCase().includes('insufficient permissions') ||
        msg.toLowerCase().includes('missing or insufficient permissions')
      ) {
        setError('Permission denied. Sign out and back in, or ask an admin to assign your admin claim.');
      } else {
        setError(msg || 'Failed to update media item');
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={!!item} onOpenChange={(open) => !open && !isSaving && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-black text-dark-brown">Edit Media Details</DialogTitle>
          <DialogDescription>
            Update titles, descriptions, status, and event association.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-xl text-xs font-bold border border-red-200">
            {error}
          </div>
        )}

        <div className="space-y-4 py-3">
          <div>
            <label className="block text-xs font-bold text-dark-brown mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:border-deep-red outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-dark-brown mb-1">Description / Caption</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:border-deep-red outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-dark-brown mb-1">Related Event</label>
            <select
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:border-deep-red outline-none bg-white"
            >
              <option value="none">No Event (General Media)</option>
              {events.map((ev) => (
                <option key={ev.id} value={ev.id}>
                  {ev.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-dark-brown">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="rounded border-gray-300 text-deep-red focus:ring-deep-red"
              />
              <span>Published on Website</span>
            </label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="bg-deep-red text-white hover:bg-[#B31219]">
            {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
