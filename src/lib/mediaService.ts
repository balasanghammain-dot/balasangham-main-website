import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
  serverTimestamp,
  DocumentData
} from 'firebase/firestore';
import { db } from './firebase';
import { MediaItem } from '../types/event';

const COLLECTION_NAME = 'media';

/**
 * Normalizes a Firestore document snapshot into the application's MediaItem model.
 */
export function normalizeFirestoreMedia(
  docId: string,
  data: DocumentData
): MediaItem {
  const isImage = (
    data.resource_type === 'image' ||
    data.type === 'image' ||
    data.media_type === 'photo'
  );
  const resourceType = isImage ? 'image' : 'video';
  const url = data.url || data.secureUrl || data.secure_url || '';
  const publicId = data.publicId || data.public_id || data.cloudinary_public_id || '';

  // Extract created_at string
  let createdAtStr = '';
  if (data.createdAt instanceof Timestamp) {
    createdAtStr = data.createdAt.toDate().toISOString();
  } else if (data.created_at instanceof Timestamp) {
    createdAtStr = data.created_at.toDate().toISOString();
  } else if (typeof data.createdAt === 'string') {
    createdAtStr = data.createdAt;
  } else if (typeof data.created_at === 'string') {
    createdAtStr = data.created_at;
  } else {
    createdAtStr = new Date().toISOString();
  }

  return {
    id: docId,
    title: data.title || data.caption || '',
    description: data.description || '',
    caption: data.caption || data.title || '',
    caption_ml: data.caption_ml || '',
    url: url,
    secureUrl: data.secureUrl || url,
    publicId: publicId,
    cloudinary_public_id: data.cloudinary_public_id || publicId,
    type: resourceType,
    resource_type: resourceType,
    format: data.format || (isImage ? 'jpg' : 'mp4'),
    width: typeof data.width === 'number' ? data.width : null,
    height: typeof data.height === 'number' ? data.height : null,
    duration: typeof data.duration === 'number' ? data.duration : null,
    thumbnail_url: data.thumbnail_url || data.thumbnailUrl || url,
    thumbnailUrl: data.thumbnailUrl || data.thumbnail_url || url,
    eventId: data.eventId || data.event_id || null,
    event_id: data.event_id || data.eventId || null,
    published: Boolean(data.published === true || data.published === 1),
    sort_order: typeof data.sort_order === 'number' ? data.sort_order : 0,
    createdAt: createdAtStr,
    created_at: createdAtStr
  };
}

/**
 * Prepares payload for Firestore, strictly adhering to `allowedMediaFields()` in `firestore.rules`.
 */
export function toFirestoreMedia(
  item: Partial<MediaItem>,
  isCreate = false
): Record<string, any> {
  const isImage = (
    item.resource_type === 'image' ||
    item.type === 'image' ||
    item.media_type === 'photo'
  );
  const resourceType = isImage ? 'image' : 'video';
  const url = (item.url || item.secureUrl || '').trim();
  const publicId = (item.publicId || item.cloudinary_public_id || '').trim();

  const payload: Record<string, any> = {
    url: url,
    secureUrl: url,
    publicId: publicId,
    cloudinary_public_id: publicId,
    type: resourceType,
    resource_type: resourceType,
    published: Boolean(item.published === true || item.published === 1),
    updatedAt: serverTimestamp()
  };

  if (item.title !== undefined) {
    payload.title = item.title ? item.title.substring(0, 300) : null;
  }
  if (item.description !== undefined) {
    payload.description = item.description ? item.description.substring(0, 2000) : null;
  }
  if (item.caption !== undefined) {
    payload.caption = item.caption ? item.caption.substring(0, 500) : null;
  }
  if (item.caption_ml !== undefined) {
    payload.caption_ml = item.caption_ml ? item.caption_ml.substring(0, 500) : null;
  }
  if (item.format !== undefined) {
    payload.format = item.format ? item.format.substring(0, 20) : (isImage ? 'jpg' : 'mp4');
  }
  if (item.width !== undefined && typeof item.width === 'number') {
    payload.width = Math.max(0, item.width);
  }
  if (item.height !== undefined && typeof item.height === 'number') {
    payload.height = Math.max(0, item.height);
  }
  if (item.duration !== undefined && typeof item.duration === 'number') {
    payload.duration = Math.max(0, item.duration);
  }
  if (item.thumbnail_url !== undefined || item.thumbnailUrl !== undefined) {
    const thumb = item.thumbnail_url || item.thumbnailUrl;
    payload.thumbnail_url = thumb ? thumb.substring(0, 1000) : null;
    payload.thumbnailUrl = thumb ? thumb.substring(0, 1000) : null;
  }
  if (item.eventId !== undefined || item.event_id !== undefined) {
    const evId = item.eventId || item.event_id;
    payload.eventId = evId && evId !== 'none' ? evId.substring(0, 150) : null;
    payload.event_id = evId && evId !== 'none' ? evId.substring(0, 150) : null;
  }
  if (item.sort_order !== undefined && typeof item.sort_order === 'number') {
    payload.sort_order = item.sort_order;
  }

  if (isCreate) {
    payload.createdAt = serverTimestamp();
  }

  return payload;
}

/**
 * Fetch all published media for public views
 */
export async function getPublishedMedia(options?: {
  type?: string;
  eventId?: string;
}): Promise<MediaItem[]> {
  try {
    const colRef = collection(db, COLLECTION_NAME);
    let q = query(colRef, where('published', '==', true));

    if (options?.eventId && options.eventId !== 'all') {
      q = query(colRef, where('published', '==', true), where('eventId', '==', options.eventId));
    }

    const snap = await getDocs(q);
    let items = snap.docs.map(doc => normalizeFirestoreMedia(doc.id, doc.data()));

    if (options?.type && options.type !== 'all') {
      const isImg = options.type === 'image' || options.type === 'photo';
      items = items.filter(m => isImg ? m.type === 'image' : m.type === 'video');
    }

    // Sort descending by created_at
    items.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
    return items;
  } catch (err) {
    console.warn('[mediaService] getPublishedMedia error:', err);
    return [];
  }
}

/**
 * Fetch all media for admin management
 */
export async function getAllMediaAdmin(options?: {
  type?: string;
  eventId?: string;
  status?: string;
  search?: string;
}): Promise<MediaItem[]> {
  try {
    const colRef = collection(db, COLLECTION_NAME);
    let q = query(colRef);

    if (options?.status === 'published') {
      q = query(colRef, where('published', '==', true));
    } else if (options?.status === 'draft') {
      q = query(colRef, where('published', '==', false));
    }

    const snap = await getDocs(q);
    let items = snap.docs.map(doc => normalizeFirestoreMedia(doc.id, doc.data()));

    if (options?.eventId && options.eventId !== 'all') {
      items = items.filter(m => m.eventId === options.eventId || m.event_id === options.eventId);
    }

    if (options?.type && options.type !== 'all') {
      const isImg = options.type === 'image' || options.type === 'photo';
      items = items.filter(m => isImg ? m.type === 'image' : m.type === 'video');
    }

    if (options?.search && options.search.trim()) {
      const term = options.search.toLowerCase().trim();
      items = items.filter(m => 
        (m.title && m.title.toLowerCase().includes(term)) ||
        (m.description && m.description.toLowerCase().includes(term)) ||
        (m.caption && m.caption.toLowerCase().includes(term))
      );
    }

    items.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
    return items;
  } catch (err) {
    console.error('[mediaService] getAllMediaAdmin error:', err);
    throw err;
  }
}

/**
 * Creates a media document in Firestore
 */
export async function createFirestoreMedia(item: Partial<MediaItem>): Promise<MediaItem> {
  const docId = item.id || `media_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const payload = toFirestoreMedia(item, true);
  const docRef = doc(db, COLLECTION_NAME, docId);
  await setDoc(docRef, payload);
  return normalizeFirestoreMedia(docId, payload);
}

/**
 * Updates an existing media document in Firestore
 */
export async function updateFirestoreMedia(id: string, updates: Partial<MediaItem>): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  const payload = toFirestoreMedia(updates, false);
  await updateDoc(docRef, payload);
}

/**
 * Deletes a media document from Firestore
 */
export async function deleteFirestoreMedia(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}

/**
 * Toggles or sets publication status of a media document
 */
export async function setFirestoreMediaPublish(id: string, published: boolean): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, {
    published: Boolean(published),
    updatedAt: serverTimestamp()
  });
}

/**
 * Calculates dashboard statistics directly from Firestore
 */
export async function getDashboardStats(): Promise<{
  totalEvents: number;
  publishedEvents: number;
  draftEvents: number;
  totalMedia: number;
}> {
  try {
    const eventsSnap = await getDocs(collection(db, 'events'));
    const mediaSnap = await getDocs(collection(db, 'media'));

    let totalEvents = 0;
    let publishedEvents = 0;
    let draftEvents = 0;

    eventsSnap.forEach(d => {
      totalEvents++;
      const data = d.data();
      const isPub = Boolean(data.published === true || data.published === 1);
      if (isPub) {
        publishedEvents++;
      } else {
        draftEvents++;
      }
    });

    const totalMedia = mediaSnap.size;

    return {
      totalEvents,
      publishedEvents,
      draftEvents,
      totalMedia
    };
  } catch (err) {
    console.error('[mediaService] getDashboardStats error:', err);
    throw err;
  }
}
