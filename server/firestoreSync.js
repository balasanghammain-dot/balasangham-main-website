const firebaseAdmin = require('./firebaseAdmin');

/**
 * Normalizes event object into Firestore document structure
 */
function toFirestoreEventPayload(event) {
  const startIso = event.start_date ? new Date(event.start_date).toISOString() : new Date().toISOString();
  const endIso = event.end_date ? new Date(event.end_date).toISOString() : null;

  const isPublished = Boolean(event.published === 1 || event.published === true);
  const isSnapShare = Boolean(event.snapshare_enabled === 1 || event.snapshare_enabled === true);

  return {
    title: event.title,
    malayalamTitle: event.title_ml || null,
    title_ml: event.title_ml || null,
    slug: event.slug,
    shortDescription: event.short_description || null,
    short_description: event.short_description || null,
    short_description_ml: event.short_description_ml || null,
    description: event.full_description || null,
    full_description: event.full_description || null,
    full_description_ml: event.full_description_ml || null,
    startDate: new Date(startIso),
    start_date: startIso,
    endDate: endIso ? new Date(endIso) : null,
    end_date: endIso,
    venue: event.venue || null,
    venue_ml: event.venue_ml || null,
    location: event.location || null,
    location_ml: event.location_ml || null,
    address: event.location || null,
    mapUrl: event.map_url || null,
    category: event.category || 'conference',
    poster: event.poster_url && event.poster_url.startsWith('https://') ? {
      publicId: event.poster_public_id || null,
      secureUrl: event.poster_url
    } : null,
    poster_url: event.poster_url || null,
    poster_public_id: event.poster_public_id || null,
    published: isPublished,
    snapShareEnabled: isSnapShare,
    snapshare_enabled: isSnapShare ? 1 : 0,
    registration_url: event.registration_url || null,
    additional_info: event.additional_info || null,
    additional_info_ml: event.additional_info_ml || null,
    schedule_info: event.schedule_info || null,
    schedule_info_ml: event.schedule_info_ml || null,
    updatedAt: new Date()
  };
}

/**
 * Normalizes media object into Firestore document structure
 */
function toFirestoreMediaPayload(media) {
  const isImage = (media.resource_type === 'image' || media.type === 'image' || media.media_type === 'photo');
  const mediaType = isImage ? 'image' : 'video';

  return {
    title: media.title || media.caption || `Asset ${media.id}`,
    caption: media.caption || null,
    caption_ml: media.caption_ml || null,
    url: media.url,
    secureUrl: media.url,
    publicId: media.cloudinary_public_id,
    cloudinary_public_id: media.cloudinary_public_id,
    type: mediaType,
    resource_type: mediaType,
    format: media.format || (isImage ? 'jpg' : 'mp4'),
    width: media.width || (isImage ? 1280 : 1920),
    height: media.height || (isImage ? 853 : 1080),
    duration: media.duration || null,
    thumbnail_url: media.thumbnail_url || null,
    thumbnailUrl: media.thumbnail_url || null,
    eventId: media.event_id || null,
    event_id: media.event_id || null,
    published: Boolean(media.published === 1 || media.published === true),
    sort_order: typeof media.sort_order === 'number' ? media.sort_order : 0,
    updatedAt: new Date()
  };
}

/**
 * Upserts an event document into Firestore using Firebase Admin SDK.
 * Never fails silently.
 */
async function syncEventToFirestore(event) {
  let db;
  try {
    db = firebaseAdmin.getAdminFirestore();
    if (!db) throw new Error('Firestore instance not available');
  } catch (credErr) {
    console.error(
      '[firestoreSync] CRITICAL: Firebase Admin credentials missing or invalid. Ensure FIREBASE_SERVICE_ACCOUNT_JSON or GOOGLE_APPLICATION_CREDENTIALS is set in environment.',
      credErr.message
    );
    return false;
  }

  const docId = event.slug || event.id;
  const payload = toFirestoreEventPayload(event);

  try {
    await db.collection('events').doc(docId).set(payload, { merge: true });
    console.log(`[firestoreSync] Synced event ${docId} to Firestore.`);
    return true;
  } catch (err) {
    console.error(`[firestoreSync] ERROR: Failed to sync event ${docId} to Firestore:`, err.message);
    return false;
  }
}

/**
 * Deletes an event document from Firestore.
 * Never fails silently.
 */
async function deleteEventFromFirestore(eventId, slug) {
  let db;
  try {
    db = firebaseAdmin.getAdminFirestore();
    if (!db) throw new Error('Firestore instance not available');
  } catch (credErr) {
    console.error(
      '[firestoreSync] CRITICAL: Firebase Admin credentials missing for event deletion.',
      credErr.message
    );
    return false;
  }

  const docIds = [eventId, slug].filter(Boolean);
  let allSuccess = true;

  for (const docId of docIds) {
    try {
      await db.collection('events').doc(docId).delete();
      console.log(`[firestoreSync] Deleted event ${docId} from Firestore.`);
    } catch (err) {
      console.error(`[firestoreSync] ERROR: Failed to delete event ${docId} from Firestore:`, err.message);
      allSuccess = false;
    }
  }

  return allSuccess;
}

/**
 * Upserts a media asset into Firestore using Firebase Admin SDK.
 * Never fails silently.
 */
async function syncMediaToFirestore(media) {
  let db;
  try {
    db = firebaseAdmin.getAdminFirestore();
    if (!db) throw new Error('Firestore instance not available');
  } catch (credErr) {
    console.error(
      '[firestoreSync] CRITICAL: Firebase Admin credentials missing for media sync.',
      credErr.message
    );
    return false;
  }

  const docId = media.id;
  const payload = toFirestoreMediaPayload(media);

  try {
    await db.collection('media').doc(docId).set(payload, { merge: true });
    console.log(`[firestoreSync] Synced media ${docId} to Firestore.`);
    return true;
  } catch (err) {
    console.error(`[firestoreSync] ERROR: Failed to sync media ${docId} to Firestore:`, err.message);
    return false;
  }
}

/**
 * Deletes a media asset from Firestore.
 * Never fails silently.
 */
async function deleteMediaFromFirestore(mediaId) {
  let db;
  try {
    db = firebaseAdmin.getAdminFirestore();
    if (!db) throw new Error('Firestore instance not available');
  } catch (credErr) {
    console.error(
      '[firestoreSync] CRITICAL: Firebase Admin credentials missing for media deletion.',
      credErr.message
    );
    return false;
  }

  try {
    await db.collection('media').doc(mediaId).delete();
    console.log(`[firestoreSync] Deleted media ${mediaId} from Firestore.`);
    return true;
  } catch (err) {
    console.error(`[firestoreSync] ERROR: Failed to delete media ${mediaId} from Firestore:`, err.message);
    return false;
  }
}

module.exports = {
  syncEventToFirestore,
  deleteEventFromFirestore,
  syncMediaToFirestore,
  deleteMediaFromFirestore
};
