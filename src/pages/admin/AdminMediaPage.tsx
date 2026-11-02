import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import {
  Upload,
  Loader2,
  AlertTriangle,
  Image as ImageIcon,
  Video as VideoIcon,
  CheckCircle2,
  Search,
  FolderDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MediaItem } from '@/types/event';
import { getAllEventsAdmin } from '@/lib/eventsService';
import {
  getAllMediaAdmin,
  deleteFirestoreMedia,
  setFirestoreMediaPublish,
} from '@/lib/mediaService';
import { MediaGrid } from '@/components/admin/media/MediaGrid';
import { MediaUploadModal } from '@/components/admin/media/MediaUploadModal';
import { MediaEditModal } from '@/components/admin/media/MediaEditModal';
import { MediaDeleteModal } from '@/components/admin/media/MediaDeleteModal';

export default function AdminMediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [events, setEvents] = useState<{ id: string; title: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters
  const [typeFilter, setTypeFilter] = useState<'all' | 'image' | 'video'>('all');
  const [eventFilter, setEventFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<MediaItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<MediaItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Local folder import state
  const [isImportingLocal, setIsImportingLocal] = useState(false);
  const [importNotification, setImportNotification] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    fetchMedia();
  }, [typeFilter, eventFilter, statusFilter]);

  const fetchEvents = async () => {
    try {
      const allEvents = await getAllEventsAdmin();
      setEvents(allEvents.map((e) => ({ id: e.id, title: e.title })));
    } catch {
      try {
        const data = await api.get<{ id: string; title: string }[]>('/api/admin/events');
        if (data) setEvents(data.map((e) => ({ id: e.id, title: e.title })));
      } catch {
        // Events optional for filter dropdown
      }
    }
  };

  const fetchMedia = async (overrideSearch?: string) => {
    setLoading(true);
    setError('');

    const searchToUse = overrideSearch !== undefined ? overrideSearch : searchQuery;

    try {
      const data = await getAllMediaAdmin({
        type: typeFilter,
        eventId: eventFilter,
        status: statusFilter,
        search: searchToUse,
      });

      setMedia(data);
    } catch (err: any) {
      try {
        const queryParams = new URLSearchParams();
        if (typeFilter !== 'all') queryParams.set('type', typeFilter);
        if (eventFilter !== 'all') queryParams.set('eventId', eventFilter);
        if (statusFilter !== 'all') queryParams.set('status', statusFilter);
        if (searchToUse.trim()) queryParams.set('search', searchToUse.trim());

        const apiData = await api.get<MediaItem[]>(`/api/admin/media?${queryParams.toString()}`);
        setMedia(apiData || []);
      } catch (fallbackErr: any) {
        setError(fallbackErr.message || err.message || 'Failed to load media collection');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMedia(searchQuery);
  };

  const handleTogglePublish = async (item: MediaItem) => {
    const isCurrentlyPublished = item.published === true || item.published === 1;
    const newStatus = !isCurrentlyPublished;
    try {
      await setFirestoreMediaPublish(item.id, newStatus);
      try {
        const endpoint = isCurrentlyPublished ? 'unpublish' : 'publish';
        await api.post(`/api/admin/media/${item.id}/${endpoint}`);
      } catch {
        // Server sync optional
      }
      setMedia((prev) => prev.map((m) => (m.id === item.id ? { ...m, published: newStatus } : m)));
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
        setError(msg || 'Failed to change publish status');
      }
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteItem) return;
    try {
      setIsDeleting(true);
      await deleteFirestoreMedia(deleteItem.id);
      try {
        await api.delete(`/api/admin/media/${deleteItem.id}`);
      } catch {
        // Server sync optional
      }
      setMedia((prev) => prev.filter((m) => m.id !== deleteItem.id));
      setDeleteItem(null);
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
        setError(msg || 'Failed to delete media item');
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const handleImportLocalMedia = async () => {
    if (!confirm('Import photos and videos from local media folder to Cloudinary and the database?')) return;
    try {
      setIsImportingLocal(true);
      setImportNotification('Importing media files into Cloudinary...');
      const res = await api.post<{ success: boolean; message: string; importedCount: number }>(
        '/api/admin/media/import-local'
      );
      setImportNotification(res?.message || 'Import complete!');
      fetchMedia();
      setTimeout(() => setImportNotification(null), 5000);
    } catch (err: any) {
      setError('Local media import failed: ' + (err?.message || ''));
      setImportNotification(null);
    } finally {
      setIsImportingLocal(false);
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase font-bold text-deep-red tracking-wider">
              ADMIN REPOSITORY
            </span>
          </div>
          <h1 className="text-3xl font-black text-dark-brown">Media Management</h1>
          <p className="text-dark-brown/70 text-sm mt-1">
            Manage general photos, posters, and video recordings for the public website.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            onClick={handleImportLocalMedia}
            disabled={isImportingLocal}
            className="border-gray-200 hover:border-deep-red hover:bg-deep-red/5"
            title="Import existing files from the repository's media directory"
          >
            {isImportingLocal ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin text-deep-red" />
            ) : (
              <FolderDown className="w-4 h-4 mr-2 text-deep-red" />
            )}
            Import Local Folder
          </Button>

          <Button
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-deep-red hover:bg-[#B31219] text-white shadow-xs"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Media
          </Button>
        </div>
      </div>

      {importNotification && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-2xl flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <p className="text-sm font-medium">{importNotification}</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-2xl flex items-center gap-3 border border-red-200">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Control Bar: Filters & Search */}
      <div className="bg-white p-6 rounded-3xl shadow-xs border border-gray-200 flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
        {/* Type Filter Buttons */}
        <div className="space-y-1.5 w-full sm:w-auto">
          <label className="block text-xs font-bold uppercase tracking-wider text-dark-brown/60">
            Media Type
          </label>
          <div className="inline-flex rounded-xl bg-gray-100 p-1 border border-gray-200">
            <button
              type="button"
              onClick={() => setTypeFilter('all')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                typeFilter === 'all'
                  ? 'bg-deep-red text-white shadow-xs'
                  : 'text-dark-brown/70 hover:text-dark-brown hover:bg-white/50'
              }`}
            >
              All ({media.length})
            </button>
            <button
              type="button"
              onClick={() => setTypeFilter('image')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                typeFilter === 'image'
                  ? 'bg-deep-red text-white shadow-xs'
                  : 'text-dark-brown/70 hover:text-dark-brown hover:bg-white/50'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Images</span>
            </button>
            <button
              type="button"
              onClick={() => setTypeFilter('video')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                typeFilter === 'video'
                  ? 'bg-deep-red text-white shadow-xs'
                  : 'text-dark-brown/70 hover:text-dark-brown hover:bg-white/50'
              }`}
            >
              <VideoIcon className="w-3.5 h-3.5" />
              <span>Videos</span>
            </button>
          </div>
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
          {/* Related Event Filter */}
          <div className="space-y-1.5 flex-1 sm:flex-none">
            <label className="block text-xs font-bold uppercase tracking-wider text-dark-brown/60">
              Related Event
            </label>
            <select
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value)}
              className="w-full sm:w-48 px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-xs font-medium focus:border-deep-red outline-none"
            >
              <option value="all">All Events</option>
              <option value="none">General Media (No Event)</option>
              {events.map((ev) => (
                <option key={ev.id} value={ev.id}>
                  {ev.title}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="space-y-1.5 flex-1 sm:flex-none">
            <label className="block text-xs font-bold uppercase tracking-wider text-dark-brown/60">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full sm:w-36 px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-xs font-medium focus:border-deep-red outline-none"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Drafts Only</option>
            </select>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearchSubmit} className="space-y-1.5 flex-1 sm:flex-none">
            <label className="block text-xs font-bold uppercase tracking-wider text-dark-brown/60">
              Search
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search title..."
                className="w-full sm:w-44 pl-8 pr-3 py-2 rounded-xl border border-gray-200 text-xs bg-gray-50 focus:border-deep-red outline-none"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </form>
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-3xl border border-gray-200">
          <Loader2 className="w-8 h-8 text-deep-red animate-spin mb-3" />
          <p className="text-xs text-dark-brown/60 font-mono uppercase tracking-wider">
            Loading media catalog...
          </p>
        </div>
      ) : (
        <MediaGrid
          media={media}
          onOpenUpload={() => setIsUploadModalOpen(true)}
          onTogglePublish={handleTogglePublish}
          onOpenEdit={(item) => setEditItem(item)}
          onOpenDelete={(item) => setDeleteItem(item)}
        />
      )}

      {/* Modals */}
      <MediaUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        events={events}
        onMediaCreated={(newMedia) => setMedia((prev) => [newMedia, ...prev])}
      />

      <MediaEditModal
        item={editItem}
        events={events}
        onClose={() => setEditItem(null)}
        onSaved={(updated) =>
          setMedia((prev) => prev.map((m) => (m.id === updated.id ? updated : m)))
        }
      />

      <MediaDeleteModal
        item={deleteItem}
        isDeleting={isDeleting}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
