import React from 'react';
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

interface MediaDeleteModalProps {
  item: MediaItem | null;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const MediaDeleteModal: React.FC<MediaDeleteModalProps> = ({
  item,
  isDeleting,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={!!item} onOpenChange={(open) => !open && !isDeleting && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-black text-dark-brown">Delete Media Asset</DialogTitle>
          <DialogDescription>
            Are you sure you want to permanently delete this media asset? This action will remove the
            record from the database and Cloudinary CDN storage.
          </DialogDescription>
        </DialogHeader>

        {item && (
          <div className="py-2 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
              <img
                src={item.thumbnailUrl || item.thumbnail_url || item.secureUrl || item.url}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs font-bold text-dark-brown truncate flex-1">
              {item.title || item.caption || 'Untitled Asset'}
            </p>
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="ghost" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={onConfirm}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isDeleting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            Confirm Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
