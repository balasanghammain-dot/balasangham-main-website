import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '@/lib/api';
import { 
  ArrowLeft, 
  Loader2,
  Upload,
  X,
  Image as ImageIcon,
  FileText,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { 
  createFirestoreEvent, 
  updateFirestoreEvent, 
  normalizeFirestoreEvent, 
  isValidGoogleMapsUrl 
} from '@/lib/eventsService';
import { getMiniMapEmbedUrl } from '@/lib/mapUtils';
import { EventData } from '@/types/event';

export default function AdminEventEditorPage() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const [uploadingPoster, setUploadingPoster] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [showMapPreview, setShowMapPreview] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    title_ml: '',
    short_description: '',
    short_description_ml: '',
    full_description: '',
    full_description_ml: '',
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: '',
    venue: '',
    venue_ml: '',
    location: '',
    location_ml: '',
    mapUrl: '',
    poster_url: '',
    poster_public_id: '',
    gallery_urls: [] as string[],
    published: false,
    snapshare_enabled: false,
    category: 'culture', // default
    registration_url: '',
    additional_info: '',
    additional_info_ml: '',
    schedule_info: '',
    schedule_info_ml: '',
  });

  useEffect(() => {
    if (isEdit) {
      fetchEvent();
    }
  }, [id]);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      if (!id) return;

      let eventData: any = null;

      // 1. Try reading document from Firestore
      try {
        const docRef = doc(db, 'events', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          eventData = normalizeFirestoreEvent(docSnap.id, docSnap.data());
        }
      } catch (fsErr) {
        console.warn('Firestore fetch failed, checking server API fallback:', fsErr);
      }

      // 2. Fallback to API if not loaded from Firestore
      if (!eventData) {
        const data = await api.get<any>(`/api/admin/events/${id}`);
        eventData = data;
      }

      if (eventData) {
        let startDate = '';
        let startTime = '';
        if (eventData.start_date) {
          const parts = eventData.start_date.split('T');
          startDate = parts[0] || '';
          if (parts[1]) startTime = parts[1].substring(0, 5);
        }

        let endDate = '';
        let endTime = '';
        if (eventData.end_date) {
          const parts = eventData.end_date.split('T');
          endDate = parts[0] || '';
          if (parts[1]) endTime = parts[1].substring(0, 5);
        }

        setFormData(prev => ({
          ...prev,
          ...eventData,
          start_date: startDate,
          start_time: startTime,
          end_date: endDate,
          end_time: endTime,
          mapUrl: eventData.mapUrl || eventData.map_url || '',
          poster_url: eventData.poster_url || eventData.poster?.secureUrl || '',
          poster_public_id: eventData.poster_public_id || eventData.poster?.publicId || '',
          published: Boolean(eventData.published === 1 || eventData.published === true),
          snapshare_enabled: Boolean(
            eventData.snapshare_enabled === 1 ||
            eventData.snapshare_enabled === true ||
            eventData.snapShareEnabled === true
          ),
          gallery_urls: eventData.gallery_urls || [],
        }));
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch event');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handlePosterUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);
    if (id) data.append('eventId', id);

    try {
      setUploadingPoster(true);
      const res = await api.post<{ url: string; public_id?: string; publicId?: string }>('/api/admin/upload', data);
      if (res && res.url) {
        setFormData(prev => ({ 
          ...prev, 
          poster_url: res.url,
          poster_public_id: res.public_id || res.publicId || ''
        }));
      }
    } catch (err) {
      alert('Poster upload failed');
    } finally {
      setUploadingPoster(false);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingGallery(true);
    const newUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const data = new FormData();
      data.append('file', files[i]);
      if (id) data.append('eventId', id);

      try {
        const res = await api.post<{ url: string }>('/api/admin/upload', data);
        if (res && res.url) newUrls.push(res.url);
      } catch (err) {
        console.error('Gallery upload failed for a file');
      }
    }

    setFormData(prev => ({ 
      ...prev, 
      gallery_urls: [...prev.gallery_urls, ...newUrls] 
    }));
    setUploadingGallery(false);
    e.target.value = '';
  };

  const removeGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      gallery_urls: prev.gallery_urls.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async (isPublishing: boolean) => {
    setSaving(true);
    setError('');
    setSuccessMsg('');

    // Requirement 11: Validate Google Maps URL (HTTPS only)
    if (formData.mapUrl && formData.mapUrl.trim()) {
      if (!isValidGoogleMapsUrl(formData.mapUrl)) {
        setError('Google Maps URL must start with https:// and be a valid Google Maps link (e.g., https://maps.google.com/... or https://maps.app.goo.gl/...)');
        setSaving(false);
        return;
      }
    }

    if (!formData.title || !formData.title.trim()) {
      setError('Event title is required');
      setSaving(false);
      return;
    }

    // Requirement 3: Validate Google Maps URL before saving
    if (formData.mapUrl && formData.mapUrl.trim()) {
      if (!isValidGoogleMapsUrl(formData.mapUrl.trim())) {
        setError('Please enter a valid Google Maps URL starting with https:// (e.g. https://maps.google.com/..., https://goo.gl/maps/..., or https://maps.app.goo.gl/...)');
        setSaving(false);
        return;
      }
    }

    // Build combined ISO timestamps
    let combinedStart = formData.start_date || '';
    if (combinedStart && formData.start_time) {
      combinedStart = `${combinedStart}T${formData.start_time}:00`;
    }
    let combinedEnd = formData.end_date || '';
    if (combinedEnd && formData.end_time) {
      combinedEnd = `${combinedEnd}T${formData.end_time}:00`;
    }

    const payload: Partial<EventData> = {
      title: formData.title.trim(),
      title_ml: formData.title_ml?.trim() || null,
      malayalamTitle: formData.title_ml?.trim() || null,
      short_description: formData.short_description?.trim() || null,
      short_description_ml: formData.short_description_ml?.trim() || null,
      full_description: formData.full_description?.trim() || null,
      full_description_ml: formData.full_description_ml?.trim() || null,
      start_date: combinedStart || null,
      end_date: combinedEnd || null,
      venue: formData.venue?.trim() || null,
      venue_ml: formData.venue_ml?.trim() || null,
      location: formData.location?.trim() || null,
      location_ml: formData.location_ml?.trim() || null,
      address: formData.location?.trim() || null,
      mapUrl: formData.mapUrl?.trim() || null,
      map_url: formData.mapUrl?.trim() || null,
      category: formData.category || 'conference',
      poster: {
        publicId: formData.poster_public_id || null,
        secureUrl: formData.poster_url || null,
      },
      poster_url: formData.poster_url || null,
      poster_public_id: formData.poster_public_id || null,
      published: isPublishing,
      snapShareEnabled: formData.snapshare_enabled,
      snapshare_enabled: formData.snapshare_enabled ? 1 : 0,
      registration_url: formData.registration_url?.trim() || null,
      additional_info: formData.additional_info?.trim() || null,
      additional_info_ml: formData.additional_info_ml?.trim() || null,
      schedule_info: formData.schedule_info?.trim() || null,
      schedule_info_ml: formData.schedule_info_ml?.trim() || null,
    };

    try {
      if (isEdit && id) {
        // Update existing event in Firestore
        await updateFirestoreEvent(id, payload);
        // Sync server SQLite if present
        try {
          await api.put(`/api/admin/events/${id}`, {
            ...formData,
            published: isPublishing,
            map_url: payload.mapUrl
          });
        } catch {
          // Server sync is best-effort
        }
        setFormData(prev => ({ ...prev, published: isPublishing }));
        setSuccessMsg(isPublishing ? 'Event successfully published!' : 'Draft saved successfully!');
      } else {
        // Create new document in Firestore
        await createFirestoreEvent(payload);
        // Sync server SQLite if present
        try {
          await api.post('/api/admin/events', {
            ...formData,
            published: isPublishing,
            map_url: payload.mapUrl
          });
        } catch {
          // Server sync is best-effort
        }
        setSuccessMsg(isPublishing ? 'Event created and published!' : 'Event draft saved successfully!');
        setTimeout(() => navigate('/admin/events'), 1200);
      }
    } catch (err: any) {
      console.error('Save error:', err);
      setError(err.message || 'Failed to save event to Firestore');
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSave(formData.published);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-deep-red animate-spin" />
      </div>
    );
  }

  const InputSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 mb-8">
      <h2 className="text-xl font-black text-dark-brown mb-6 pb-4 border-b border-gray-100">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {children}
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin/events')} className="rounded-full bg-white border border-gray-200">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-black text-dark-brown leading-tight">
              {isEdit ? 'Edit Event' : 'Create New Event'}
            </h1>
            <p className="text-sm text-dark-brown/60">Persistent Firestore Database</p>
          </div>
        </div>
        
        {/* Requirement 4: Save Draft / Publish buttons */}
        <div className="flex items-center gap-3">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => handleSave(false)} 
            disabled={saving}
            className="border-gray-300 text-dark-brown hover:bg-gray-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <FileText className="w-4 h-4 mr-2" />}
            Save Draft
          </Button>
          
          <Button 
            type="button" 
            onClick={() => handleSave(true)} 
            disabled={saving}
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
            {isEdit && formData.published ? 'Update & Keep Published' : 'Publish to Website'}
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-8 font-bold border border-red-200">
          {error}
        </div>
      )}

      {successMsg && (
        <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-8 font-bold border border-green-200">
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        
        <InputSection title="Basic Information">
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-bold text-dark-brown mb-2">Title (English) *</label>
            <input name="title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-deep-red outline-none" />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-bold text-dark-brown mb-2">Title (Malayalam)</label>
            <input name="title_ml" value={formData.title_ml} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-deep-red outline-none font-malayalam" />
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-bold text-dark-brown mb-2">Short Description (English)</label>
            <textarea name="short_description" value={formData.short_description} onChange={handleChange} rows={2} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-deep-red outline-none" />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-bold text-dark-brown mb-2">Short Description (Malayalam)</label>
            <textarea name="short_description_ml" value={formData.short_description_ml} onChange={handleChange} rows={2} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-deep-red outline-none font-malayalam" />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-bold text-dark-brown mb-2">Full Description (English)</label>
            <textarea name="full_description" value={formData.full_description} onChange={handleChange} rows={5} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-deep-red outline-none" />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-bold text-dark-brown mb-2">Full Description (Malayalam)</label>
            <textarea name="full_description_ml" value={formData.full_description_ml} onChange={handleChange} rows={5} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-deep-red outline-none font-malayalam" />
          </div>
        </InputSection>

        <InputSection title="Date & Time">
          <div>
            <label className="block text-sm font-bold text-dark-brown mb-2">Start Date *</label>
            <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-deep-red outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-dark-brown mb-2">Start Time</label>
            <input type="time" name="start_time" value={formData.start_time} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-deep-red outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-dark-brown mb-2">End Date (Optional)</label>
            <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-deep-red outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-dark-brown mb-2">End Time (Optional)</label>
            <input type="time" name="end_time" value={formData.end_time} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-deep-red outline-none" />
          </div>
        </InputSection>

        <InputSection title="Location & Map">
          <div>
            <label className="block text-sm font-bold text-dark-brown mb-2">Venue (English)</label>
            <input name="venue" value={formData.venue} onChange={handleChange} placeholder="e.g. PCR Bank Auditorium" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-deep-red outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-dark-brown mb-2">Venue (Malayalam)</label>
            <input name="venue_ml" value={formData.venue_ml} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-deep-red outline-none font-malayalam" />
          </div>
          <div>
            <label className="block text-sm font-bold text-dark-brown mb-2">City/Address (English)</label>
            <input name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Kalliasseri, Kannur" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-deep-red outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-dark-brown mb-2">City/Address (Malayalam)</label>
            <input name="location_ml" value={formData.location_ml} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-deep-red outline-none font-malayalam" />
          </div>
          
          {/* Requirement 1 & 9: Google Maps URL with Live Admin Verification & Preview */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-bold text-dark-brown mb-2">
              Google Maps URL (Optional)
            </label>
            <input 
              name="mapUrl" 
              type="url" 
              value={formData.mapUrl} 
              onChange={handleChange} 
              placeholder="https://maps.google.com/... or https://maps.app.goo.gl/..." 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-deep-red outline-none" 
            />
            <p className="text-xs text-dark-brown/60 mt-1.5">
              Paste a Google Maps location link (e.g. https://maps.google.com/..., https://www.google.com/maps/..., https://goo.gl/maps/..., or https://maps.app.goo.gl/...).
            </p>

            {/* Requirement 9: Admin Verification & Preview */}
            {formData.mapUrl && formData.mapUrl.trim() && (
              <div className="mt-3 p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <span className={`w-2.5 h-2.5 rounded-full ${isValidGoogleMapsUrl(formData.mapUrl.trim()) ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                    <span>
                      {isValidGoogleMapsUrl(formData.mapUrl.trim())
                        ? 'Google Maps link verified'
                        : 'Invalid Google Maps URL format (must be HTTPS)'}
                    </span>
                  </div>
                  {isValidGoogleMapsUrl(formData.mapUrl.trim()) && (
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setShowMapPreview(p => !p)}
                        className="text-xs h-8"
                      >
                        {showMapPreview ? 'Hide Preview' : 'Preview Map'}
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        asChild
                        className="text-xs h-8"
                      >
                        <a href={formData.mapUrl.trim()} target="_blank" rel="noopener noreferrer">
                          Open Google Maps ↗
                        </a>
                      </Button>
                    </div>
                  )}
                </div>

                {showMapPreview && isValidGoogleMapsUrl(formData.mapUrl.trim()) && (
                  <div className="rounded-xl overflow-hidden border border-slate-200 h-[220px] bg-slate-100 relative">
                    <iframe
                      title="Admin Map Preview"
                      src={getMiniMapEmbedUrl({
                        map_url: formData.mapUrl,
                        venue: formData.venue,
                        location: formData.location
                      }) || ''}
                      className="w-full h-full border-0"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </InputSection>

        <InputSection title="Media (Cloudinary References Only)">
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-bold text-dark-brown mb-2">Event Poster</label>
            <div className="flex items-start gap-6">
              {formData.poster_url ? (
                <div className="relative w-48 h-48 rounded-xl overflow-hidden border border-gray-200">
                  <img src={formData.poster_url} alt="Poster preview" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => setFormData(p => ({...p, poster_url: '', poster_public_id: ''}))} className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="w-48 h-48 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400">
                  <ImageIcon className="w-8 h-8 mb-2" />
                  <span className="text-xs">No Poster</span>
                </div>
              )}
              
              <div className="relative mt-2">
                <input type="file" accept="image/*" onChange={handlePosterUpload} disabled={uploadingPoster} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" />
                <Button type="button" variant="secondary" disabled={uploadingPoster}>
                  {uploadingPoster ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                  Upload Poster to Cloudinary
                </Button>
                <p className="text-xs text-dark-brown/60 mt-2">
                  Actual media uploads directly to Cloudinary. Firestore stores reference metadata only.
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 pt-6 border-t border-gray-100 mt-2">
            <label className="block text-sm font-bold text-dark-brown mb-4">Gallery Images (Cloudinary)</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-4">
              {formData.gallery_urls.map((url, idx) => (
                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200">
                  <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                  <button type="button" onClick={() => removeGalleryImage(idx)} className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              
              <div className="relative aspect-square bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center hover:bg-gray-100 transition-colors">
                <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} disabled={uploadingGallery} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" />
                {uploadingGallery ? (
                  <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                ) : (
                  <>
                    <Upload className="w-6 h-6 text-gray-400 mb-2" />
                    <span className="text-xs font-bold text-gray-500">Add Images</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </InputSection>

        <InputSection title="Settings & Publishing">
          <div className="col-span-1 md:col-span-2 flex flex-col gap-4 bg-gray-50 p-6 rounded-2xl">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" name="published" checked={formData.published} onChange={handleChange} className="w-5 h-5 rounded border-gray-300 text-deep-red focus:ring-deep-red" />
              <span className="font-bold text-dark-brown">Publish Event (Visible to public website)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" name="snapshare_enabled" checked={formData.snapshare_enabled} onChange={handleChange} className="w-5 h-5 rounded border-gray-300 text-deep-red focus:ring-deep-red" />
              <span className="font-bold text-dark-brown">Enable SnapShare (Live photo gallery for this event)</span>
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-dark-brown mb-2">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-deep-red outline-none bg-white">
              <option value="conference">Conference / സമ്മേളനം</option>
              <option value="culture">Culture & Arts / കലാമേള</option>
              <option value="festival">Festival / ഉത്സവം</option>
              <option value="memorial">Memorial & Observance / ദിനാചരണം</option>
              <option value="community">Community Gathering / കൂട്ടായ്മ</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-dark-brown mb-2">Registration URL (Optional)</label>
            <input type="url" name="registration_url" value={formData.registration_url} onChange={handleChange} placeholder="https://..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-deep-red outline-none" />
          </div>
        </InputSection>

        <InputSection title="Additional Information">
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-bold text-dark-brown mb-2">Additional Info / Travel Guide (English)</label>
            <textarea name="additional_info" value={formData.additional_info} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-deep-red outline-none" />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-bold text-dark-brown mb-2">Additional Info / Travel Guide (Malayalam)</label>
            <textarea name="additional_info_ml" value={formData.additional_info_ml} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-deep-red outline-none font-malayalam" />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-bold text-dark-brown mb-2">Schedule Info (English)</label>
            <textarea name="schedule_info" value={formData.schedule_info} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-deep-red outline-none" />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-bold text-dark-brown mb-2">Schedule Info (Malayalam)</label>
            <textarea name="schedule_info_ml" value={formData.schedule_info_ml} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-deep-red outline-none font-malayalam" />
          </div>
        </InputSection>
      </form>
    </div>
  );
}
