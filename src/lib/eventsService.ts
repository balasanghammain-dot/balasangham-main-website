import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  Timestamp,
  serverTimestamp,
  DocumentData
} from 'firebase/firestore';
import { db } from './firebase';
import { EventData } from '../types/event';

const COLLECTION_NAME = 'events';

/**
 * Validates Google Maps URLs according to Requirement 11:
 * Must be HTTPS and match Google Maps patterns
 * https://maps.google.com/...
 * https://www.google.com/maps/...
 * https://goo.gl/maps/...
 * https://maps.app.goo.gl/...
 */
export function isValidGoogleMapsUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (!trimmed.startsWith('https://')) return false;

  try {
    const parsed = new URL(trimmed);
    const host = parsed.hostname.toLowerCase();
    const isGoogleMaps = (
      host === 'maps.google.com' ||
      host === 'www.google.com' ||
      host === 'google.com' ||
      host === 'goo.gl' ||
      host === 'maps.app.goo.gl' ||
      host.endsWith('.google.com') ||
      host.endsWith('.google.co.in')
    );
    if (!isGoogleMaps) return false;
    if (host.includes('google.com') || host.includes('google.co.in')) {
      if (!host.startsWith('maps.') && !parsed.pathname.startsWith('/maps')) {
        return false;
      }
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Helper to convert various date representations to a Firestore Timestamp
 */
export function toTimestamp(dateInput: any): Timestamp | null {
  if (!dateInput) return null;
  if (dateInput instanceof Timestamp) return dateInput;
  if (typeof dateInput.toDate === 'function') return dateInput;
  if (dateInput instanceof Date) return Timestamp.fromDate(dateInput);
  if (typeof dateInput === 'string' || typeof dateInput === 'number') {
    const d = new Date(dateInput);
    if (!isNaN(d.getTime())) return Timestamp.fromDate(d);
  }
  return null;
}

/**
 * Helper to convert Timestamp or string to ISO string for client components
 */
function toIsoString(dateInput: any): string | null {
  if (!dateInput) return null;
  if (dateInput instanceof Timestamp || (dateInput && typeof dateInput.toDate === 'function')) {
    return dateInput.toDate().toISOString();
  }
  if (dateInput instanceof Date) {
    return dateInput.toISOString();
  }
  if (typeof dateInput === 'string') {
    // If it's already an ISO string or date
    const d = new Date(dateInput);
    return isNaN(d.getTime()) ? dateInput : d.toISOString();
  }
  return null;
}

/**
 * Normalizes a Firestore document snapshot into the application's EventData model.
 * Bridges both recommended Firestore schema (camelCase) and legacy properties.
 */
export function normalizeFirestoreEvent(
  docId: string,
  data: DocumentData
): EventData {
  const startDateIso = toIsoString(data.startDate || data.start_date);
  const endDateIso = toIsoString(data.endDate || data.end_date);

  const rawPoster = data.poster || null;
  const posterUrl = rawPoster?.secureUrl || data.poster_url || (typeof data.poster === 'string' ? data.poster : null);
  const posterPublicId = rawPoster?.publicId || data.poster_public_id || null;

  const isPublished = Boolean(data.published === true || data.published === 1);
  const isSnapShare = Boolean(
    data.snapShareEnabled === true ||
    data.snapshare_enabled === true ||
    data.snapshare_enabled === 1
  );

  const title = data.title || '';
  const titleMl = data.malayalamTitle || data.title_ml || null;
  const shortDesc = data.shortDescription || data.short_description || null;
  const shortDescMl = data.shortDescriptionMalayalam || data.short_description_ml || null;
  const fullDesc = data.description || data.full_description || null;
  const fullDescMl = data.descriptionMalayalam || data.full_description_ml || null;
  const venue = data.venue || null;
  const venueMl = data.venueMalayalam || data.venue_ml || null;
  const location = data.address || data.location || null;
  const locationMl = data.addressMalayalam || data.location_ml || null;
  const mapUrl = data.mapUrl || data.map_url || null;

  const createdAtIso = toIsoString(data.createdAt || data.created_at) || new Date().toISOString();
  const updatedAtIso = toIsoString(data.updatedAt || data.updated_at) || new Date().toISOString();

  return {
    id: docId,
    slug: data.slug || docId,
    title,
    title_ml: titleMl,
    malayalamTitle: titleMl,
    short_description: shortDesc,
    short_description_ml: shortDescMl,
    shortDescription: shortDesc,
    full_description: fullDesc,
    full_description_ml: fullDescMl,
    description: fullDesc,
    start_date: startDateIso,
    startDate: data.startDate || null,
    end_date: endDateIso,
    endDate: data.endDate || null,
    venue,
    venue_ml: venueMl,
    location,
    location_ml: locationMl,
    address: location,
    mapUrl,
    map_url: mapUrl,
    category: data.category || 'conference',
    poster: {
      publicId: posterPublicId,
      secureUrl: posterUrl,
    },
    poster_url: posterUrl,
    poster_public_id: posterPublicId,
    published: isPublished ? 1 : 0,
    snapshare_enabled: isSnapShare ? 1 : 0,
    snapShareEnabled: isSnapShare,
    registration_url: data.registration_url || null,
    additional_info: data.additional_info || null,
    additional_info_ml: data.additional_info_ml || null,
    schedule_info: data.schedule_info || null,
    schedule_info_ml: data.schedule_info_ml || null,
    created_at: createdAtIso,
    updated_at: updatedAtIso,
  };
}

/**
 * Prepares data for writing to Firestore document
 */
export function toFirestoreEvent(
  data: Partial<EventData>,
  isUpdate = false
): Record<string, any> {
  const result: Record<string, any> = {};

  if (data.title !== undefined) result.title = data.title;
  if (data.title_ml !== undefined || data.malayalamTitle !== undefined) {
    const val = data.malayalamTitle !== undefined ? data.malayalamTitle : data.title_ml;
    result.malayalamTitle = val || null;
    result.title_ml = val || null;
  }
  if (data.slug !== undefined) result.slug = data.slug;

  if (data.short_description !== undefined || data.shortDescription !== undefined) {
    const val = data.shortDescription !== undefined ? data.shortDescription : data.short_description;
    result.shortDescription = val || null;
    result.short_description = val || null;
  }
  if (data.short_description_ml !== undefined) {
    result.short_description_ml = data.short_description_ml || null;
  }

  if (data.full_description !== undefined || data.description !== undefined) {
    const val = data.description !== undefined ? data.description : data.full_description;
    result.description = val || null;
    result.full_description = val || null;
  }
  if (data.full_description_ml !== undefined) {
    result.full_description_ml = data.full_description_ml || null;
  }

  // Dates as Firestore Timestamps
  const startDateTs = toTimestamp(data.startDate || data.start_date);
  if (startDateTs) {
    result.startDate = startDateTs;
    result.start_date = startDateTs.toDate().toISOString();
  }

  const endDateTs = toTimestamp(data.endDate || data.end_date);
  if (endDateTs !== undefined) {
    result.endDate = endDateTs;
    result.end_date = endDateTs ? endDateTs.toDate().toISOString() : null;
  }

  if (data.venue !== undefined) result.venue = data.venue || null;
  if (data.venue_ml !== undefined) result.venue_ml = data.venue_ml || null;

  if (data.address !== undefined || data.location !== undefined) {
    const val = data.address !== undefined ? data.address : data.location;
    result.address = val || null;
    result.location = val || null;
  }
  if (data.location_ml !== undefined) result.location_ml = data.location_ml || null;

  if (data.mapUrl !== undefined || data.map_url !== undefined) {
    const val = data.mapUrl !== undefined ? data.mapUrl : data.map_url;
    if (val && isValidGoogleMapsUrl(val)) {
      result.mapUrl = val.trim();
      result.map_url = val.trim();
    } else {
      result.mapUrl = null;
      result.map_url = null;
    }
  }

  if (data.category !== undefined) result.category = data.category || 'conference';

  // Poster reference (Cloudinary metadata only — NO binary!)
  if (data.poster !== undefined || data.poster_url !== undefined || data.poster_public_id !== undefined) {
    const pubId = data.poster?.publicId ?? data.poster_public_id ?? null;
    const secUrl = data.poster?.secureUrl ?? data.poster_url ?? null;
    result.poster = {
      publicId: pubId,
      secureUrl: secUrl,
    };
    result.poster_url = secUrl;
    result.poster_public_id = pubId;
  }

  if (data.published !== undefined) {
    result.published = Boolean(data.published === true || data.published === 1);
  }

  if (data.snapShareEnabled !== undefined || data.snapshare_enabled !== undefined) {
    const val = Boolean(
      data.snapShareEnabled === true ||
      data.snapshare_enabled === true ||
      data.snapshare_enabled === 1
    );
    result.snapShareEnabled = val;
    result.snapshare_enabled = val ? 1 : 0;
  }

  if (data.registration_url !== undefined) result.registration_url = data.registration_url || null;
  if (data.additional_info !== undefined) result.additional_info = data.additional_info || null;
  if (data.additional_info_ml !== undefined) result.additional_info_ml = data.additional_info_ml || null;
  if (data.schedule_info !== undefined) result.schedule_info = data.schedule_info || null;
  if (data.schedule_info_ml !== undefined) result.schedule_info_ml = data.schedule_info_ml || null;

  result.updatedAt = serverTimestamp();
  if (!isUpdate) {
    result.createdAt = serverTimestamp();
  }

  return result;
}

/**
 * Fetch all published events from Firestore, sorted by start date
 */
export async function getPublishedEvents(): Promise<EventData[]> {
  try {
    const eventsCol = collection(db, COLLECTION_NAME);
    // Query published events
    const q = query(eventsCol, where('published', '==', true));
    const snapshot = await getDocs(q);

    const events: EventData[] = [];
    snapshot.forEach(docSnap => {
      events.push(normalizeFirestoreEvent(docSnap.id, docSnap.data()));
    });

    // Client-side sort by start_date descending for deterministic order
    return events.sort((a, b) => {
      const timeA = a.start_date ? new Date(a.start_date).getTime() : 0;
      const timeB = b.start_date ? new Date(b.start_date).getTime() : 0;
      return timeB - timeA;
    });
  } catch (err: any) {
    console.error('Error in getPublishedEvents:', err);
    throw err;
  }
}

/**
 * Requirement 8: Selection logic for Homepage Latest Event
 * 1. Find published upcoming events.
 * 2. Show the nearest upcoming event (next chronological).
 * 3. If no upcoming event exists, show the most recently completed published event.
 */
export async function getLatestEvent(): Promise<EventData | null> {
  try {
    const eventsCol = collection(db, COLLECTION_NAME);
    const now = new Date();
    const nowTs = Timestamp.fromDate(now);

    // 1. Try finding nearest upcoming published event (startDate >= now)
    try {
      const upcomingQ = query(
        eventsCol,
        where('published', '==', true),
        where('startDate', '>=', nowTs),
        orderBy('startDate', 'asc'),
        limit(1)
      );
      const upcomingSnap = await getDocs(upcomingQ);
      if (!upcomingSnap.empty) {
        const first = upcomingSnap.docs[0];
        return normalizeFirestoreEvent(first.id, first.data());
      }
    } catch (queryErr) {
      // In case composite index is still propagating, fall through to client-side filter
    }

    // 2. Fetch published events with limit to avoid downloading entire database
    const fallbackQ = query(
      eventsCol,
      where('published', '==', true),
      limit(25)
    );
    const snap = await getDocs(fallbackQ);
    if (snap.empty) return null;

    const events = snap.docs.map(d => normalizeFirestoreEvent(d.id, d.data()));
    const nowTime = now.getTime();

    // Nearest upcoming
    const upcoming = events
      .filter(e => {
        const start = e.start_date ? new Date(e.start_date).getTime() : 0;
        const end = e.end_date ? new Date(e.end_date).getTime() : start;
        return start >= nowTime || end >= nowTime;
      })
      .sort((a, b) => new Date(a.start_date!).getTime() - new Date(b.start_date!).getTime());

    if (upcoming.length > 0) {
      return upcoming[0];
    }

    // Most recently completed
    const past = events
      .sort((a, b) => new Date(b.start_date!).getTime() - new Date(a.start_date!).getTime());

    return past.length > 0 ? past[0] : null;
  } catch (err) {
    console.error('Error fetching latest event from Firestore:', err);
    return null;
  }
}

/**
 * Requirement 16: Real-time listener for the Homepage latest event
 * Attaches a Firestore listener for published events so that when an admin
 * publishes/edits an event, the homepage updates without code deployment.
 */
export function subscribeToLatestEvent(
  onUpdate: (event: EventData | null) => void,
  onError?: (err: Error) => void
): () => void {
  const eventsCol = collection(db, COLLECTION_NAME);
  const q = query(eventsCol, where('published', '==', true), limit(25));

  return onSnapshot(
    q,
    (snapshot) => {
      if (snapshot.empty) {
        onUpdate(null);
        return;
      }

      const events = snapshot.docs.map(d => normalizeFirestoreEvent(d.id, d.data()));
      const nowTime = Date.now();

      const upcoming = events
        .filter(e => {
          const start = e.start_date ? new Date(e.start_date).getTime() : 0;
          const end = e.end_date ? new Date(e.end_date).getTime() : start;
          return start >= nowTime || end >= nowTime;
        })
        .sort((a, b) => new Date(a.start_date!).getTime() - new Date(b.start_date!).getTime());

      if (upcoming.length > 0) {
        onUpdate(upcoming[0]);
        return;
      }

      const past = events.sort(
        (a, b) => new Date(b.start_date!).getTime() - new Date(a.start_date!).getTime()
      );

      onUpdate(past.length > 0 ? past[0] : null);
    },
    (err) => {
      console.warn('Real-time listener notice:', err.message);
      if (onError) onError(err);
    }
  );
}

/**
 * Requirement 10: Retrieve single event by slug
 */
export async function getEventBySlug(slug: string): Promise<EventData | null> {
  if (!slug) return null;
  try {
    const eventsCol = collection(db, COLLECTION_NAME);
    // Align with Firestore security rules: public query requires published == true constraint
    const q = query(
      eventsCol,
      where('slug', '==', slug),
      where('published', '==', true),
      limit(1)
    );
    const snap = await getDocs(q);

    if (!snap.empty) {
      const docSnap = snap.docs[0];
      return normalizeFirestoreEvent(docSnap.id, docSnap.data());
    }

    // Also check direct document ID fallback
    const directDoc = await getDoc(doc(db, COLLECTION_NAME, slug));
    if (directDoc.exists()) {
      return normalizeFirestoreEvent(directDoc.id, directDoc.data());
    }

    return null;
  } catch (err: any) {
    console.error('Error fetching event by slug:', err);
    throw err;
  }
}

/**
 * Requirement 4 & 5: Admin list of all events (published + drafts)
 */
export async function getAllEventsAdmin(): Promise<EventData[]> {
  const eventsCol = collection(db, COLLECTION_NAME);
  const snap = await getDocs(eventsCol);

  const events: EventData[] = [];
  snap.forEach(docSnap => {
    events.push(normalizeFirestoreEvent(docSnap.id, docSnap.data()));
  });

  return events.sort((a, b) => {
    const timeA = new Date(a.created_at).getTime();
    const timeB = new Date(b.created_at).getTime();
    return timeB - timeA;
  });
}

/**
 * Admin real-time listener for events list
 */
export function subscribeToEventsAdmin(
  onUpdate: (events: EventData[]) => void,
  onError?: (err: Error) => void
): () => void {
  const eventsCol = collection(db, COLLECTION_NAME);

  return onSnapshot(
    eventsCol,
    (snapshot) => {
      const events: EventData[] = [];
      snapshot.forEach(docSnap => {
        events.push(normalizeFirestoreEvent(docSnap.id, docSnap.data()));
      });

      events.sort((a, b) => {
        const timeA = new Date(a.created_at).getTime();
        const timeB = new Date(b.created_at).getTime();
        return timeB - timeA;
      });

      onUpdate(events);
    },
    (err) => {
      console.warn('Admin listener notice:', err.message);
      if (onError) onError(err);
    }
  );
}

/**
 * Generate a URL-safe slug from title
 */
export function generateSlug(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Requirement 4: Admin Create Event in Firestore
 */
export async function createFirestoreEvent(
  data: Partial<EventData>
): Promise<EventData> {
  if (!data.title || !data.title.trim()) {
    throw new Error('Event title is required');
  }

  // Generate unique slug
  let baseSlug = data.slug || generateSlug(data.title);
  let slug = baseSlug;

  // Check slug uniqueness
  const eventsCol = collection(db, COLLECTION_NAME);
  const existingSnap = await getDocs(query(eventsCol, where('slug', '==', slug), limit(1)));
  if (!existingSnap.empty) {
    slug = `${baseSlug}-${Date.now()}`;
  }

  const newDocRef = doc(eventsCol);
  const payload = toFirestoreEvent({ ...data, slug }, false);

  await setDoc(newDocRef, payload);
  const createdSnap = await getDoc(newDocRef);

  return normalizeFirestoreEvent(newDocRef.id, createdSnap.data() || payload);
}

/**
 * Requirement 5: Admin Edit Event in Firestore
 */
export async function updateFirestoreEvent(
  id: string,
  data: Partial<EventData>
): Promise<EventData> {
  const docRef = doc(db, COLLECTION_NAME, id);
  const existing = await getDoc(docRef);
  if (!existing.exists()) {
    throw new Error('Event not found');
  }

  const payload = toFirestoreEvent(data, true);
  await updateDoc(docRef, payload);

  const updatedSnap = await getDoc(docRef);
  return normalizeFirestoreEvent(id, updatedSnap.data() || payload);
}

/**
 * Requirement 6: Admin Delete Event in Firestore
 * Permanently deletes the Firestore event document.
 * Does not delete Cloudinary media automatically.
 */
export async function deleteFirestoreEvent(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}

/**
 * Requirement 7: Publish/Unpublish toggle
 */
export async function setFirestoreEventPublish(
  id: string,
  published: boolean
): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, {
    published,
    updatedAt: serverTimestamp(),
  });
}
