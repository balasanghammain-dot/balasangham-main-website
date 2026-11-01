import { api } from './api';
import { auth } from './firebase';

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
 * Uploads a file (image or video) via authenticated backend/serverless endpoint.
 * Requires Firebase Admin authentication and passes the current user's ID token.
 */
export async function uploadFile(
  file: File,
  options?: {
    eventId?: string;
    title?: string;
    token?: string;
    onProgress?: (percent: number) => void;
  }
): Promise<UploadResult> {
  const isVideo = file.type.startsWith('video/') || /\.(mp4|webm|mov|mkv)$/i.test(file.name);
  const resourceType = isVideo ? 'video' : 'image';

  // 1. Obtain Firebase Auth ID token
  let idToken = options?.token;
  if (!idToken && auth.currentUser) {
    try {
      idToken = await auth.currentUser.getIdToken();
    } catch (err: any) {
      console.warn('Could not retrieve current user Firebase ID token:', err.message);
    }
  }

  const headers: Record<string, string> = {};
  if (idToken) {
    headers['Authorization'] = `Bearer ${idToken}`;
  }

  const formData = new FormData();
  formData.append('file', file);
  if (options?.eventId && options.eventId !== 'none') {
    formData.append('eventId', options.eventId);
  }
  if (options?.title) {
    formData.append('title', options.title);
  }

  // 2. Upload via authenticated API endpoint
  let res: any = null;
  let lastError: Error | null = null;

  try {
    res = await api.post<any>('/api/admin/upload', formData, { headers });
  } catch (adminErr: any) {
    lastError = adminErr;
    try {
      res = await api.post<any>('/api/upload', formData, { headers });
      lastError = null;
    } catch (uploadErr: any) {
      lastError = uploadErr;
    }
  }

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

  throw new Error(
    lastError?.message || 'Media upload failed. Please verify your administrative credentials and network connection.'
  );
}
