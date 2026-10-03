import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDocs, query, where, Timestamp } from 'firebase/firestore';
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "AIzaSyD6qeUB8dw7mK8nkDILX4otshzwzjT_2tg",
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || "balasangam-8e562.firebaseapp.com",
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || "balasangam-8e562",
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || "balasangam-8e562.firebasestorage.app",
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "631062193147",
  appId: process.env.VITE_FIREBASE_APP_ID || "1:631062193147:web:66fa6d049e797e77fc215e",
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID || "G-YPEMK25PD4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Helper to convert date strings to Firestore Timestamp
function parseToTimestamp(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? null : Timestamp.fromDate(d);
}

async function migrate() {
  console.log('--- Starting Migration of Verified Event Data to Firestore ---');

  const eventsCol = collection(db, 'events');
  
  // 1. Fetch any already existing events in Firestore to prevent duplication
  const existingDocsMap = new Map();
  try {
    const existingSnap = await getDocs(eventsCol);
    existingSnap.forEach(d => {
      const data = d.data();
      if (data.slug) existingDocsMap.set(data.slug, d.id);
      existingDocsMap.set(d.id, d.id);
    });
    console.log(`Found ${existingDocsMap.size} existing doc references in Firestore.`);
  } catch (err) {
    console.warn('Could not read existing docs (rules or offline). Proceeding with safe upsert.', err.message);
  }

  // 2. Read events from SQLite database
  const sqliteDbPath = path.join(__dirname, '..', 'server', 'data', 'balasangham.db');
  let sqliteEvents = [];
  if (fs.existsSync(sqliteDbPath)) {
    try {
      const sqliteDb = new Database(sqliteDbPath, { readonly: true });
      sqliteEvents = sqliteDb.prepare('SELECT * FROM events').all();
      console.log(`Loaded ${sqliteEvents.length} events from SQLite database.`);
    } catch (e) {
      console.warn('SQLite read failed:', e.message);
    }
  }

  // 3. Read events from events.json as fallback / reference
  const eventsJsonPath = path.join(__dirname, '..', 'src', 'data', 'events.json');
  let jsonEvents = [];
  if (fs.existsSync(eventsJsonPath)) {
    try {
      jsonEvents = JSON.parse(fs.readFileSync(eventsJsonPath, 'utf8'));
      console.log(`Loaded ${jsonEvents.length} events from src/data/events.json.`);
    } catch (e) {
      console.warn('events.json read failed:', e.message);
    }
  }

  let migratedCount = 0;

  // Process SQLite events first (they are richer in description and fields)
  for (const ev of sqliteEvents) {
    const targetDocId = existingDocsMap.get(ev.slug) || ev.id;
    const startTs = parseToTimestamp(ev.start_date) || Timestamp.now();
    const endTs = parseToTimestamp(ev.end_date);
    const createdTs = parseToTimestamp(ev.created_at) || Timestamp.now();
    const updatedTs = parseToTimestamp(ev.updated_at) || Timestamp.now();

    const posterMeta = {
      publicId: ev.poster_public_id || null,
      secureUrl: ev.poster_url || null
    };

    const docPayload = {
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
      startDate: startTs,
      start_date: startTs.toDate().toISOString(),
      endDate: endTs,
      end_date: endTs ? endTs.toDate().toISOString() : null,
      venue: ev.venue || null,
      venue_ml: ev.venue_ml || null,
      address: ev.location || null,
      location: ev.location || null,
      location_ml: ev.location_ml || null,
      mapUrl: ev.mapUrl || ev.map_url || null,
      category: ev.category || 'conference',
      poster: posterMeta,
      poster_url: posterMeta.secureUrl,
      poster_public_id: posterMeta.publicId,
      published: Boolean(ev.published === 1 || ev.published === true),
      snapShareEnabled: Boolean(ev.snapshare_enabled === 1 || ev.snapshare_enabled === true),
      snapshare_enabled: ev.snapshare_enabled ? 1 : 0,
      registration_url: ev.registration_url || null,
      additional_info: ev.additional_info || null,
      additional_info_ml: ev.additional_info_ml || null,
      schedule_info: ev.schedule_info || null,
      schedule_info_ml: ev.schedule_info_ml || null,
      createdAt: createdTs,
      updatedAt: updatedTs
    };

    const docRef = doc(eventsCol, targetDocId);
    await setDoc(docRef, docPayload, { merge: true });
    existingDocsMap.set(ev.slug, targetDocId);
    migratedCount++;
    console.log(`Migrated event: ${ev.slug} (${ev.title})`);
  }

  console.log(`Migration complete. Successfully migrated/upserted ${migratedCount} events to Firestore.`);
}

migrate()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Migration failed:', err);
    process.exit(1);
  });
