const fs = require('fs');
const path = require('path');

const PROJECT_ID = process.env.VITE_FIREBASE_PROJECT_ID || 'balasangam-8e562';
const FIRESTORE_BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

/**
 * Retrieves valid Google Cloud OAuth access token from firebase-tools config
 */
function getAccessToken() {
  try {
    const tokenFile = path.join(process.env.HOME || '', '.config', 'configstore', 'firebase-tools.json');
    if (fs.existsSync(tokenFile)) {
      const config = JSON.parse(fs.readFileSync(tokenFile, 'utf8'));
      if (config?.tokens?.access_token) {
        return config.tokens.access_token;
      }
    }
  } catch (err) {
    console.warn('[firestoreSync] Could not read firebase-tools token:', err.message);
  }
  return null;
}

function toRestValue(val) {
  if (val === null || val === undefined) {
    return { nullValue: null };
  }
  if (typeof val === 'boolean') {
    return { booleanValue: val };
  }
  if (typeof val === 'number') {
    if (Number.isInteger(val)) {
      return { integerValue: val.toString() };
    }
    return { doubleValue: val };
  }
  if (val instanceof Date) {
    return { timestampValue: val.toISOString() };
  }
  if (typeof val === 'string') {
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(val)) {
      return { timestampValue: new Date(val).toISOString() };
    }
    return { stringValue: val };
  }
  if (Array.isArray(val)) {
    return {
      arrayValue: {
        values: val.map(toRestValue)
      }
    };
  }
  if (typeof val === 'object') {
    const fields = {};
    for (const [k, v] of Object.entries(val)) {
      fields[k] = toRestValue(v);
    }
    return { mapValue: { fields } };
  }
  return { stringValue: String(val) };
}

function objectToRestFields(obj) {
  const fields = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined) continue;
    fields[k] = toRestValue(v);
  }
  return fields;
}

/**
 * Upserts an event document into Firestore
 */
async function syncEventToFirestore(event) {
  const token = getAccessToken();
  if (!token) return;

  const docId = event.slug || event.id;
  const url = `${FIRESTORE_BASE}/events/${docId}`;

  const startIso = event.start_date ? new Date(event.start_date).toISOString() : new Date().toISOString();
  const endIso = event.end_date ? new Date(event.end_date).toISOString() : null;

  const isPublished = Boolean(event.published === 1 || event.published === true);
  const isSnapShare = Boolean(event.snapshare_enabled === 1 || event.snapshare_enabled === true);

  const payload = {
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

  try {
    const fields = objectToRestFields(payload);
    const res = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fields })
    });
    if (!res.ok) {
      console.warn(`[firestoreSync] Failed to sync event ${docId}:`, res.status, await res.text());
    } else {
      console.log(`[firestoreSync] Synced event ${docId} to Firestore.`);
    }
  } catch (err) {
    console.warn(`[firestoreSync] Error syncing event ${docId}:`, err.message);
  }
}

/**
 * Deletes an event document from Firestore
 */
async function deleteEventFromFirestore(eventId, slug) {
  const token = getAccessToken();
  if (!token) return;

  const docIds = [eventId, slug].filter(Boolean);
  for (const docId of docIds) {
    try {
      const url = `${FIRESTORE_BASE}/events/${docId}`;
      await fetch(url, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      console.log(`[firestoreSync] Deleted event ${docId} from Firestore.`);
    } catch (err) {
      console.warn(`[firestoreSync] Error deleting event ${docId}:`, err.message);
    }
  }
}

/**
 * Upserts a media asset into Firestore
 */
async function syncMediaToFirestore(media) {
  const token = getAccessToken();
  if (!token) return;

  const docId = media.id;
  const url = `${FIRESTORE_BASE}/media/${docId}`;

  const isImage = (media.resource_type === 'image' || media.type === 'image' || media.media_type === 'photo');
  const mediaType = isImage ? 'image' : 'video';

  const payload = {
    title: media.title || media.caption || `Asset ${docId}`,
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

  try {
    const fields = objectToRestFields(payload);
    const res = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fields })
    });
    if (!res.ok) {
      console.warn(`[firestoreSync] Failed to sync media ${docId}:`, res.status, await res.text());
    } else {
      console.log(`[firestoreSync] Synced media ${docId} to Firestore.`);
    }
  } catch (err) {
    console.warn(`[firestoreSync] Error syncing media ${docId}:`, err.message);
  }
}

/**
 * Deletes a media asset from Firestore
 */
async function deleteMediaFromFirestore(mediaId) {
  const token = getAccessToken();
  if (!token) return;

  try {
    const url = `${FIRESTORE_BASE}/media/${mediaId}`;
    await fetch(url, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log(`[firestoreSync] Deleted media ${mediaId} from Firestore.`);
  } catch (err) {
    console.warn(`[firestoreSync] Error deleting media ${mediaId}:`, err.message);
  }
}

module.exports = {
  syncEventToFirestore,
  deleteEventFromFirestore,
  syncMediaToFirestore,
  deleteMediaFromFirestore
};
