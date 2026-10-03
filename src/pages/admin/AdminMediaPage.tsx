import React, { useEffect, useState, useRef } from 'react';
import { api } from '@/lib/api';
import { 
  Upload, 
  Trash2, 
  Edit3, 
  Loader2, 
  AlertTriangle, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  EyeOff, 
  Search, 
  RefreshCw, 
  FolderDown, 
  Film,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MediaItem } from '@/types/event';

interface FileUploadQueueItem {
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

  // Upload modal & queue state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadQueue, setUploadQueue] = useState<FileUploadQueueItem[]>([]);
  const [uploadEventId, setUploadEventId] = useState<string>('none');
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploadPublished, setUploadPublished] = useState(true);
  const [isProcessingQueue, setIsProcessingQueue] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Edit modal state
  const [editItem, setEditItem] = useState<MediaItem | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPublished, setEditPublished] = useState(true);
  const [editEventId, setEditEventId] = useState<string>('none');
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // Delete modal state
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
      const data = await api.get<{ id: string; title: string }[]>('/api/admin/events');
      setEvents(data || []);
    } catch (err: any) {
      console.error('Failed to load events:', err);
    }
  };

  const fetchMedia = async () => {
    try {
      setLoading(true);
      setError('');
      const params = new URLSearchParams();
      if (typeFilter !== 'all') params.append('type', typeFilter);
      if (eventFilter !== 'all') params.append('eventId', eventFilter);
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (searchQuery.trim()) params.append('search', searchQuery.trim());

      const data = await api.get<MediaItem[]>(`/api/admin/media?${params.toString()}`);
      setMedia(data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load media');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMedia();
  };

  // ------------------- FILE SELECTION & QUEUE -------------------
  const handleFilesSelected = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newItems: FileUploadQueueItem[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const isVideo = file.type.startsWith('video/') || /\.(mp4|webm|mov|mkv)$/i.test(file.name);
      const isImage = file.type.startsWith('image/') || /\.(jpg|jpeg|png|webp|gif)$/i.test(file.name);

      if (!isVideo && !isImage) {
        alert(`File "${file.name}" is not a supported format. Please upload JPG, PNG, WebP, MP4, or WebM.`);
        continue;
      }

      newItems.push({
        id: `queue-${Date.now()}-${i}-${Math.random()}`,
        file,
        name: file.name,
        size: file.size,
        type: isVideo ? 'video' : 'image',
        previewUrl: URL.createObjectURL(file),
        progress: 0,
        status: 'pending'
      });
    }

    setUploadQueue(prev => [...prev, ...newItems]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeFromQueue = (id: string) => {
    setUploadQueue(prev => {
      const item = prev.find(i => i.id === id);
      if (item && item.previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(item.previewUrl);
      }
      return prev.filter(i => i.id !== id);
    });
  };

  // ------------------- UPLOAD DISPATCH -------------------
  const startUploadQueue = async () => {
    const pendingItems = uploadQueue.filter(i => i.status === 'pending' || i.status === 'error');
    if (pendingItems.length === 0) return;

    setIsProcessingQueue(true);

    for (const item of pendingItems) {
      // Set to uploading
      setUploadQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: 'uploading', progress: 30 } : q));

      const formData = new FormData();
      formData.append('file', item.file);
      formData.append('title', uploadTitle || item.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
      formData.append('description', uploadDescription);
      formData.append('published', uploadPublished ? '1' : '0');
      if (uploadEventId && uploadEventId !== 'none') {
        formData.append('eventId', uploadEventId);
      }

      try {
        setUploadQueue(prev => prev.map(q => q.id === item.id ? { ...q, progress: 75 } : q));
        const res = await api.post<MediaItem>('/api/admin/media/upload', formData);

        setUploadQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: 'success', progress: 100 } : q));
        
        // Add to main media grid
        if (res && res.id) {
          setMedia(prev => [res, ...prev]);
        }
      } catch (err: any) {
        setUploadQueue(prev => prev.map(q => q.id === item.id ? { 
          ...q, 
          status: 'error', 
          progress: 0, 
          error: err.message || 'Upload failed' 
        } : q));
      }
    }

    setIsProcessingQueue(false);
  };

  const retryUpload = async (id: string) => {
    const item = uploadQueue.find(i => i.id === id);
    if (!item) return;

    setUploadQueue(prev => prev.map(q => q.id === id ? { ...q, status: 'uploading', progress: 30, error: undefined } : q));

    const formData = new FormData();
    formData.append('file', item.file);
    formData.append('title', uploadTitle || item.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
    formData.append('description', uploadDescription);
    formData.append('published', uploadPublished ? '1' : '0');
    if (uploadEventId && uploadEventId !== 'none') {
      formData.append('eventId', uploadEventId);
    }

    try {
      setUploadQueue(prev => prev.map(q => q.id === id ? { ...q, progress: 75 } : q));
      const res = await api.post<MediaItem>('/api/admin/media/upload', formData);

      setUploadQueue(prev => prev.map(q => q.id === id ? { ...q, status: 'success', progress: 100 } : q));
      if (res && res.id) {
        setMedia(prev => [res, ...prev]);
      }
    } catch (err: any) {
      setUploadQueue(prev => prev.map(q => q.id === id ? { 
        ...q, 
        status: 'error', 
        progress: 0, 
        error: err.message || 'Retry failed' 
      } : q));
    }
  };

  // ------------------- EDIT METADATA -------------------
  const handleOpenEdit = (item: MediaItem) => {
    setEditItem(item);
    setEditTitle(item.title || item.caption || '');
    setEditDescription(item.description || item.caption_ml || '');
    setEditPublished(item.published === true || item.published === 1);
    setEditEventId(item.eventId || item.event_id || 'none');
  };

  const handleSaveEdit = async () => {
    if (!editItem) return;
    try {
      setIsSavingEdit(true);
      const updated = await api.put<MediaItem>(`/api/admin/media/${editItem.id}`, {
        title: editTitle,
        description: editDescription,
        published: editPublished,
        eventId: editEventId === 'none' ? null : editEventId
      });

      setMedia(prev => prev.map(m => m.id === editItem.id ? { ...m, ...updated } : m));
      setEditItem(null);
    } catch (err: any) {
      alert(err.message || 'Failed to update media item');
    } finally {
      setIsSavingEdit(false);
    }
  };

  // ------------------- TOGGLE PUBLISH -------------------
  const handleTogglePublish = async (item: MediaItem) => {
    const isCurrentlyPublished = item.published === true || item.published === 1;
    const endpoint = isCurrentlyPublished ? 'unpublish' : 'publish';
    try {
      await api.post(`/api/admin/media/${item.id}/${endpoint}`);
      setMedia(prev => prev.map(m => m.id === item.id ? { ...m, published: !isCurrentlyPublished } : m));
    } catch (err: any) {
      alert(err.message || 'Failed to change publish status');
    }
  };

  // ------------------- DELETE MEDIA -------------------
  const handleDelete = async () => {
    if (!deleteItem) return;
    try {
      setIsDeleting(true);
      await api.delete(`/api/admin/media/${deleteItem.id}`);
      setMedia(prev => prev.filter(m => m.id !== deleteItem.id));
      setDeleteItem(null);
    } catch (err: any) {
      alert(err.message || 'Failed to delete media item');
    } finally {
      setIsDeleting(false);
    }
  };

  // ------------------- IMPORT LOCAL MEDIA -------------------
  const handleImportLocalMedia = async () => {
    if (!confirm('Import photos and videos from local media folder to Cloudinary and the database?')) return;
    try {
      setIsImportingLocal(true);
      setImportNotification('Importing media files into Cloudinary...');
      const res = await api.post<{ success: boolean; message: string; importedCount: number }>('/api/admin/media/import-local');
      setImportNotification(res.message || 'Import complete!');
      fetchMedia();
      setTimeout(() => setImportNotification(null), 5000);
    } catch (err: any) {
      alert('Local media import failed: ' + (err.message || ''));
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
            onClick={() => {
              setUploadQueue([]);
              setUploadTitle('');
              setUploadDescription('');
              setUploadEventId('none');
              setUploadPublished(true);
              setIsUploadModalOpen(true);
            }} 
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
              {events.map(ev => (
                <option key={ev.id} value={ev.id}>{ev.title}</option>
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
          <p className="text-xs text-dark-brown/60 font-mono uppercase tracking-wider">Loading media catalog...</p>
        </div>
      ) : media.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-gray-200 border-dashed">
          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-dark-brown/30">
            <Film className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-dark-brown mb-1">No media found</h3>
          <p className="text-dark-brown/60 text-sm max-w-sm mx-auto mb-6">
            Upload general website photos or videos, or import existing content from the local media directory.
          </p>
          <Button 
            onClick={() => setIsUploadModalOpen(true)} 
            className="bg-deep-red text-white hover:bg-[#B31219]"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Your First Media Item
          </Button>
        </div>
      ) : (
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
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono uppercase font-bold tracking-wider ${
                      isPublished 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-amber-500 text-white'
                    }`}>
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
                      <p className="text-xs text-dark-brown/60 line-clamp-2 mt-1">
                        {item.description}
                      </p>
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
                    onClick={() => handleTogglePublish(item)}
                    className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-lg transition-colors ${
                      isPublished
                        ? 'text-amber-700 hover:bg-amber-100'
                        : 'text-emerald-700 hover:bg-emerald-100'
                    }`}
                    title={isPublished ? 'Unpublish from website' : 'Publish to website'}
                  >
                    {isPublished ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{isPublished ? 'Unpublish' : 'Publish'}</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleOpenEdit(item)}
                      className="h-8 px-2 text-dark-brown/70 hover:text-dark-brown hover:bg-gray-200"
                      title="Edit metadata"
                    >
                      <Edit3 className="w-3.5 h-3.5 mr-1" />
                      <span>Edit</span>
                    </Button>

                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setDeleteItem(item)}
                      className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                      title="Delete permanently"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ------------------- UPLOAD MEDIA MODAL ------------------- */}
      <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-dark-brown">Upload Media</DialogTitle>
            <DialogDescription>
              Upload images (JPG, PNG, WebP) or web-compatible videos (MP4, WebM) directly to Cloudinary.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* File Drop Area */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 hover:border-deep-red rounded-3xl p-8 text-center bg-gray-50 hover:bg-deep-red/5 transition-all cursor-pointer group"
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
              <p className="text-sm font-bold text-dark-brown">
                Click to browse files or drag & drop here
              </p>
              <p className="text-xs text-dark-brown/60 mt-1">
                Images (JPG, PNG, WebP) & Videos (MP4, WebM) up to 100MB
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
                        
                        {/* Progress Bar */}
                        {item.status === 'uploading' && (
                          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1 overflow-hidden">
                            <div className="bg-deep-red h-full transition-all duration-300" style={{ width: `${item.progress}%` }} />
                          </div>
                        )}

                        {item.status === 'error' && (
                          <p className="text-[10px] text-red-600 font-bold mt-0.5">{item.error || 'Failed'}</p>
                        )}
                      </div>

                      <div className="shrink-0 flex items-center gap-2">
                        {item.status === 'success' && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        )}
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
                <label className="block text-xs font-bold text-dark-brown mb-1">
                  Title (Default: file name)
                </label>
                <input
                  type="text"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="Enter a descriptive title"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 bg-white focus:border-deep-red outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-dark-brown mb-1">
                  Description / Caption
                </label>
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
                  <label className="block text-xs font-bold text-dark-brown mb-1">
                    Related Event (Optional)
                  </label>
                  <select
                    value={uploadEventId}
                    onChange={(e) => setUploadEventId(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 bg-white focus:border-deep-red outline-none"
                  >
                    <option value="none">No Event (General Media)</option>
                    {events.map(ev => (
                      <option key={ev.id} value={ev.id}>{ev.title}</option>
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
            <Button 
              variant="ghost" 
              onClick={() => setIsUploadModalOpen(false)}
              disabled={isProcessingQueue}
            >
              Cancel
            </Button>
            <Button 
              onClick={startUploadQueue} 
              disabled={isProcessingQueue || uploadQueue.filter(i => i.status === 'pending' || i.status === 'error').length === 0}
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
                  Upload Selected ({uploadQueue.filter(i => i.status === 'pending' || i.status === 'error').length})
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ------------------- EDIT METADATA MODAL ------------------- */}
      <Dialog open={!!editItem} onOpenChange={(open) => !open && setEditItem(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black text-dark-brown">Edit Media Details</DialogTitle>
            <DialogDescription>
              Update titles, descriptions, status, and event association.
            </DialogDescription>
          </DialogHeader>

          {editItem && (
            <div className="space-y-4 py-3">
              {/* Preview preview header */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-200">
                <img 
                  src={editItem.thumbnailUrl || editItem.thumbnail_url || editItem.secureUrl || editItem.url} 
                  alt="" 
                  className="w-16 h-12 object-cover rounded-lg bg-black shrink-0" 
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-mono text-gray-500 uppercase">Cloudinary Public ID</p>
                  <p className="text-xs font-mono font-bold text-dark-brown truncate">
                    {editItem.publicId || editItem.cloudinary_public_id}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-dark-brown mb-1">Title</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 focus:border-deep-red outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-dark-brown mb-1">Description</label>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 focus:border-deep-red outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-dark-brown mb-1">Related Event</label>
                <select
                  value={editEventId}
                  onChange={(e) => setEditEventId(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 focus:border-deep-red outline-none bg-white"
                >
                  <option value="none">No Event (General Media)</option>
                  {events.map(ev => (
                    <option key={ev.id} value={ev.id}>{ev.title}</option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-dark-brown">
                  <input
                    type="checkbox"
                    checked={editPublished}
                    onChange={(e) => setEditPublished(e.target.checked)}
                    className="rounded border-gray-300 text-deep-red focus:ring-deep-red"
                  />
                  <span>Published (Visible on public /media page)</span>
                </label>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditItem(null)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSaveEdit} 
              disabled={isSavingEdit}
              className="bg-deep-red text-white hover:bg-[#B31219]"
            >
              {isSavingEdit ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ------------------- DELETE CONFIRMATION MODAL ------------------- */}
      <Dialog open={!!deleteItem} onOpenChange={(open) => !open && setDeleteItem(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-2">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <DialogTitle className="text-xl font-black text-dark-brown">Delete Media Permanently?</DialogTitle>
            <DialogDescription>
              This action will remove the record from the database and delete the asset from Cloudinary. This cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {deleteItem && (
            <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 flex items-center gap-3 my-2">
              <img 
                src={deleteItem.thumbnailUrl || deleteItem.thumbnail_url || deleteItem.secureUrl || deleteItem.url} 
                alt="" 
                className="w-12 h-12 object-cover rounded-xl bg-black shrink-0" 
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-dark-brown truncate">
                  {deleteItem.title || deleteItem.caption || 'Untitled'}
                </p>
                <p className="text-[10px] font-mono text-gray-500 truncate">
                  {deleteItem.publicId || deleteItem.cloudinary_public_id}
                </p>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="ghost" onClick={() => setDeleteItem(null)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button 
              variant="default" 
              onClick={handleDelete} 
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isDeleting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Trash2 className="w-4 h-4 mr-2" />}
              Delete Permanently
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
