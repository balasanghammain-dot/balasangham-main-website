import { api } from './api';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dj4apdzk';

export interface UploadResult {
  url: string;
  secure_url: string;
  public_id: string;
  width?: number;
  height?: number;
  format?: string;
  resource_type: string;
  duration?: number;
  thumbnail_url?: string;
}

/**
 * Uploads a file (image or video) to Cloudinary.
 * First attempts server/serverless endpoint (/api/admin/upload or /api/upload).
 * If that fails or is unavailable, falls back to direct Cloudinary client upload.
 */
export async function uploadFile(
  file: File,
  options?: {
    eventId?: string;
    title?: string;
    onProgress?: (percent: number) => void;
  }
): Promise<UploadResult> {
  const isVideo = file.type.startsWith('video/') || /\.(mp4|webm|mov|mkv)$/i.test(file.name);
  const resourceType = isVideo ? 'video' : 'image';

  // 1. Try uploading via server API endpoint (/api/admin/upload)
  try {
    const formData = new FormData();
    formData.append('file', file);
    if (options?.eventId && options.eventId !== 'none') {
      formData.append('eventId', options.eventId);
    }
    if (options?.title) {
      formData.append('title', options.title);
    }

    const res = await api.post<any>('/api/admin/upload', formData);
    if (res && (res.url || res.secure_url)) {
      const secureUrl = res.secure_url || res.url;
      const pubId = res.public_id || res.publicId || '';
      return {
        url: secureUrl,
        secure_url: secureUrl,
        public_id: pubId,
        width: res.width,
        height: res.height,
        format: res.format || (isVideo ? 'mp4' : 'jpg'),
        resource_type: resourceType,
        duration: res.duration,
        thumbnail_url: res.thumbnail_url || res.thumbnailUrl || secureUrl
      };
    }
  } catch (serverErr: any) {
    console.warn('Backend upload endpoint unavailable, attempting direct Cloudinary upload:', serverErr.message);
  }

  // 2. Direct Cloudinary upload fallback
  // Uses unsigned preset or direct upload endpoint
  const directUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`;
  const directFormData = new FormData();
  directFormData.append('file', file);
  directFormData.append('upload_preset', 'balasangham_uploads');

  try {
    const res = await fetch(directUrl, {
      method: 'POST',
      body: directFormData
    });

    if (res.ok) {
      const data = await res.json();
      return {
        url: data.secure_url || data.url,
        secure_url: data.secure_url || data.url,
        public_id: data.public_id,
        width: data.width,
        height: data.height,
        format: data.format,
        resource_type: data.resource_type || resourceType,
        duration: data.duration,
        thumbnail_url: data.thumbnail_url || data.secure_url
      };
    } else {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData?.error?.message || 'Direct upload failed');
    }
  } catch (directErr: any) {
    throw new Error('Upload failed: ' + (directErr.message || 'Could not upload file to Cloudinary.'));
  }
}
