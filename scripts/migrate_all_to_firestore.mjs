import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';
import firebaseAdminPkg from '../server/firebaseAdmin.js';
const { getAdminFirestore } = firebaseAdminPkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let db;
try {
  db = getAdminFirestore();
  if (!db) throw new Error('Firestore instance not available');
} catch (err) {
  console.error('Firebase Admin credentials missing. Set FIREBASE_SERVICE_ACCOUNT_JSON or GOOGLE_APPLICATION_CREDENTIALS.', err.message);
  process.exit(1);
}

const sqliteDbPath = path.join(__dirname, '..', 'server', 'data', 'balasangham.db');
const sqlite = new Database(sqliteDbPath);

console.log('Beginning full Firestore migration using Firebase Admin SDK...');

// 1. Migrate Events
const events = sqlite.prepare('SELECT * FROM events').all();
console.log(`Found ${events.length} events in local SQLite.`);

for (const ev of events) {
  const docId = ev.slug || ev.id;
  const startIso = ev.start_date ? new Date(ev.start_date).toISOString() : new Date().toISOString();
  const endIso = ev.end_date ? new Date(ev.end_date).toISOString() : null;

  const payload = {
    title: ev.title,
    malayalamTitle: ev.title_ml || null,
    title_ml: ev.title_ml || null,
    slug: ev.slug,
    shortDescription: ev.short_description || null,
    short_description: ev.short_description || null,
    short_description_ml: ev.short_description_ml || null,
    description: ev.full_description || null,
    full_description: ev.full_description || null,
    full_description_ml: ev.full_description_ml || null,
    startDate: new Date(startIso),
    start_date: startIso,
    endDate: endIso ? new Date(endIso) : null,
    end_date: endIso,
    venue: ev.venue || null,
    venue_ml: ev.venue_ml || null,
    location: ev.location || null,
    location_ml: ev.location_ml || null,
    address: ev.location || null,
    mapUrl: ev.map_url || null,
    category: ev.category || 'conference',
    poster: ev.poster_url && ev.poster_url.startsWith('https://') ? {
      publicId: ev.poster_public_id || null,
      secureUrl: ev.poster_url
    } : null,
    poster_url: ev.poster_url || null,
    poster_public_id: ev.poster_public_id || null,
    published: Boolean(ev.published === 1),
    snapShareEnabled: Boolean(ev.snapshare_enabled === 1),
    snapshare_enabled: ev.snapshare_enabled ? 1 : 0,
    registration_url: ev.registration_url || null,
    additional_info: ev.additional_info || null,
    additional_info_ml: ev.additional_info_ml || null,
    schedule_info: ev.schedule_info || null,
    schedule_info_ml: ev.schedule_info_ml || null,
    updatedAt: new Date()
  };

  try {
    await db.collection('events').doc(docId).set(payload, { merge: true });
    console.log(`  ✓ Event synced: ${docId}`);
  } catch (err) {
    console.error(`  ✗ Event sync failed: ${docId}`, err.message);
  }
}

// 2. Migrate Media
const mediaItems = sqlite.prepare('SELECT * FROM media').all();
console.log(`\nFound ${mediaItems.length} media items in local SQLite.`);

for (const m of mediaItems) {
  const docId = m.id;
  const isImage = (m.resource_type === 'image' || m.type === 'image' || m.media_type === 'photo');
  const mediaType = isImage ? 'image' : 'video';

  const payload = {
    title: m.title || m.caption || `Asset ${docId}`,
    caption: m.caption || null,
    caption_ml: m.caption_ml || null,
    url: m.url,
    secureUrl: m.url,
    publicId: m.cloudinary_public_id,
    cloudinary_public_id: m.cloudinary_public_id,
    type: mediaType,
    resource_type: mediaType,
    format: m.format || (isImage ? 'jpg' : 'mp4'),
    width: m.width || (isImage ? 1280 : 1920),
    height: m.height || (isImage ? 853 : 1080),
    duration: m.duration || null,
    thumbnail_url: m.thumbnail_url || null,
    thumbnailUrl: m.thumbnail_url || null,
    eventId: m.event_id || null,
    event_id: m.event_id || null,
    published: Boolean(m.published === 1),
    sort_order: typeof m.sort_order === 'number' ? m.sort_order : 0,
    updatedAt: new Date()
  };

  try {
    await db.collection('media').doc(docId).set(payload, { merge: true });
    console.log(`  ✓ Media synced: ${docId}`);
  } catch (err) {
    console.error(`  ✗ Media sync failed: ${docId}`, err.message);
  }
}

console.log('\nMigration complete.');
