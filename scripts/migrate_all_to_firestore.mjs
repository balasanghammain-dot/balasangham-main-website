import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read token from firebase-tools.json
const tokenFile = path.join(process.env.HOME, '.config', 'configstore', 'firebase-tools.json');
if (!fs.existsSync(tokenFile)) {
  console.error('Firebase tools credentials not found at', tokenFile);
  process.exit(1);
}

const configData = JSON.parse(fs.readFileSync(tokenFile, 'utf8'));
const accessToken = configData?.tokens?.access_token;
if (!accessToken) {
  console.error('No access token found in firebase-tools.json');
  process.exit(1);
}

const PROJECT_ID = 'balasangam-8e562';
const FIRESTORE_BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

async function firestorePatch(collectionName, docId, fields) {
  const url = `${FIRESTORE_BASE}/${collectionName}/${docId}`;
  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ fields })
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`PATCH ${collectionName}/${docId} failed: ${res.status} ${errText}`);
  }
  return await res.json();
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
    // Check if it's an ISO timestamp
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

async function run() {
  console.log('=== Balasangham Complete Firestore & SQLite Migration ===');
  
  // 1. Read events from SQLite
  const sqliteDbPath = path.join(__dirname, '..', 'server', 'data', 'balasangham.db');
  let sqliteEvents = [];
  let sqliteDb = null;
  if (fs.existsSync(sqliteDbPath)) {
    sqliteDb = new Database(sqliteDbPath);
    sqliteEvents = sqliteDb.prepare('SELECT * FROM events').all();
    console.log(`Read ${sqliteEvents.length} events from SQLite.`);
  }

  // 2. Read events from events.json
  const eventsJsonPath = path.join(__dirname, '..', 'src', 'data', 'events.json');
  let jsonEvents = [];
  if (fs.existsSync(eventsJsonPath)) {
    jsonEvents = JSON.parse(fs.readFileSync(eventsJsonPath, 'utf8'));
    console.log(`Read ${jsonEvents.length} events from events.json.`);
  }

  // 3. Define canonical verified events
  const canonicalEvents = [
    {
      id: 'kannur-conference-2026',
      slug: 'kannur-conference-2026',
      title: 'Balasangham Kannur District Conference 2026',
      title_ml: 'ബാലസംഘം കണ്ണൂർ ജില്ലാ സമ്മേളനം 2026',
      short_description: 'The historic District Conference of Balasangham Kannur bringing together delegates from across the district at Kalliasseri, the birthplace of the children\'s movement in 1938.',
      short_description_ml: '1938-ൽ ബാലസംഘം രൂപംകൊണ്ട കല്ല്യാശ്ശേരിയുടെ ചരിത്രഭൂമിയിൽ കണ്ണൂർ ജില്ലയിലെ വിവിധ ഏരിയകളിൽ നിന്നുള്ള ബാലപ്രതിനിധികൾ ഒത്തുചേരുന്ന ജില്ലാ സമ്മേളനം.',
      full_description: 'ബാലസംഘം കണ്ണൂർ ജില്ലാ സമ്മേളനം 2026 ഒക്ടോബർ 10, 11 തീയതികളിൽ കല്ല്യാശ്ശേരി പി.സി.ആർ ബാങ്ക് ഓഡിറ്റോറിയത്തിൽ നടക്കും. മുൻ പൊതുവിദ്യാഭ്യാസ വകുപ്പ് മന്ത്രി പ്രൊഫ. സി രവീന്ദ്രനാഥ് സമ്മേളനം ഉദ്ഘാടനം ചെയ്യും. ജില്ലയിലെ വിവിധ ഏരിയകളിൽ നിന്നുള്ള നൂറുകണക്കിന് ബാലപ്രതിനിധികൾ സമ്മേളനത്തിൽ പങ്കെടുക്കും.',
      full_description_ml: 'ബാലസംഘം കണ്ണൂർ ജില്ലാ സമ്മേളനം 2026 ഒക്ടോബർ 10, 11 തീയതികളിൽ കല്ല്യാശ്ശേരി പി.സി.ആർ ബാങ്ക് ഓഡിറ്റോറിയത്തിൽ നടക്കും. മുൻ പൊതുവിദ്യാഭ്യാസ വകുപ്പ് മന്ത്രി പ്രൊഫ. സി രവീന്ദ്രനാഥ് സമ്മേളനം ഉദ്ഘാടനം ചെയ്യും. ജില്ലയിലെ വിവിധ ഏരിയകളിൽ നിന്നുള്ള നൂറുകണക്കിന് ബാലപ്രതിനിധികൾ സമ്മേളനത്തിൽ പങ്കെടുക്കും.',
      start_date: '2026-10-10T09:00:00.000Z',
      end_date: '2026-10-11T18:00:00.000Z',
      venue: 'PCR Bank Auditorium, Kalliasseri',
      venue_ml: 'PCR ബാങ്ക് ഓഡിറ്റോറിയം, കല്ല്യാശ്ശേരി',
      location: 'Kalliasseri, Kannur, Kerala',
      location_ml: 'കല്ല്യാശ്ശേരി, കണ്ണൂർ',
      map_url: 'https://maps.google.com/?q=Kalliasseri+Kannur',
      category: 'conference',
      poster_url: 'https://res.cloudinary.com/dj4apdzk/image/upload/v1/balasangham/media/events/kannur-conf-2026/poster.jpg',
      poster_public_id: 'balasangham/media/events/kannur-conf-2026/poster',
      published: true,
      snapshare_enabled: true,
      additional_info: 'Inauguration: Prof. C. Raveendranath (Former Minister for General Education). Hosted by Swagathasangham.',
      additional_info_ml: 'ഉദ്ഘാടനം: പ്രൊഫ. സി രവീന്ദ്രനാഥ് (മുൻ പൊതു വിദ്യാഭ്യാസ വകുപ്പ് മന്ത്രി). സ്വാഗതസംഘം.',
      schedule_info: 'October 10: Delegate Registration, Flag Hoisting, Inaugural Session. October 11: Delegate Sessions, Resolution Discussions, Election of New Committee.',
      schedule_info_ml: 'ഒക്ടോബർ 10: പ്രതിനിധി രജിസ്ട്രേഷൻ, പതാക ഉയർത്തൽ, ഉദ്ഘാടന സമ്മേളനം. ഒക്ടോബർ 11: പ്രതിനിധി സമ്മേളനം, പ്രമേയ ചർച്ചകൾ, പുതിയ ഭാരവാഹി തിരഞ്ഞെടുപ്പ്.'
    },
    {
      id: 'sodarathwena-2026',
      slug: 'sodarathwena-2026',
      title: 'Sodarathwena Secular Children\'s Collectives',
      title_ml: 'സോദരത്വേന മതനിരപേക്ഷ കൂട്ടായ്മകൾ',
      short_description: 'Statewide secular gatherings on Sree Narayana Guru Samadhi Day uniting thousands of children through games, creative arts, and fraternity pledges.',
      short_description_ml: 'ശ്രീനാരായണ ഗുരു സമാധി ദിനത്തിൽ കുട്ടികൾക്കിടയിൽ സൗഹാർദ്ദവും സാഹോദര്യവും വളർത്തുന്നതിനായി സംഘടിപ്പിച്ച മതേതര കൂട്ടായ്മകൾ.',
      full_description: 'ശ്രീനാരായണ ഗുരു സമാധി ദിനത്തിൽ കേരളത്തിലുടനീളമുള്ള ഏരിയ കേന്ദ്രങ്ങളിൽ ബാലസംഘത്തിന്റെ നേതൃത്വത്തിൽ \'സോദരത്വേന\' മതേതര കുട്ടായ്മകൾ സംഘടിപ്പിച്ചു. മാനവികതയുടെയും സാഹോദര്യത്തിന്റെയും സന്ദേശം കുട്ടികളിലേക്ക് എത്തിക്കുക എന്നതായിരുന്നു ലക്ഷ്യം.',
      full_description_ml: 'ശ്രീനാരായണ ഗുരു സമാധി ദിനത്തിൽ കേരളത്തിലുടനീളമുള്ള ഏരിയ കേന്ദ്രങ്ങളിൽ ബാലസംഘത്തിന്റെ നേതൃത്വത്തിൽ \'സോദരത്വേന\' മതേതര കുട്ടായ്മകൾ സംഘടിപ്പിച്ചു.',
      start_date: '2026-09-22T09:00:00.000Z',
      end_date: '2026-09-22T17:00:00.000Z',
      venue: 'All Area Committee Centers across Kerala',
      venue_ml: 'കേരളത്തിലെ എല്ലാ ഏരിയ കേന്ദ്രങ്ങളും',
      location: 'Kannur District, Kerala',
      location_ml: 'കണ്ണൂർ ജില്ല, കേരളം',
      map_url: 'https://maps.google.com/?q=Kannur+Kerala',
      category: 'memorials',
      poster_url: 'https://res.cloudinary.com/dj4apdzk/image/upload/v1/balasangham/media/events/sodarathwena-2026/poster.jpg',
      poster_public_id: 'balasangham/media/events/sodarathwena-2026/poster',
      published: true,
      snapshare_enabled: true
    },
    {
      id: 'pinarayi-area-conf-2026',
      slug: 'pinarayi-area-conf-2026',
      title: 'Balasangham Pinarayi Area Conference 2026',
      title_ml: 'ബാലസംഘം പിണറായി ഏരിയ സമ്മേളനം',
      short_description: 'Area delegate conference in Kannur reviewing unit activities and electing delegates to the District Conference.',
      short_description_ml: 'പിണറായി ഏരിയയിലെ പ്രവർത്തനങ്ങൾ വിലയിരുത്തുകയും ജില്ലാ സമ്മേളനത്തിലേക്കുള്ള പ്രതിനിധികളെ തെരഞ്ഞെടുക്കുകയും ചെയ്ത സമ്മേളനം.',
      full_description: 'കണ്ണൂർ ജില്ലയിലെ പിണറായി ഏരിയ സമ്മേളനം കോട്ടയം അങ്ങാടിയിൽ വെച്ച് നടന്നു. പ്രദേശത്തെ വിവിധ യൂണിറ്റുകളിൽ നിന്നുള്ള പ്രതിനിധികൾ പങ്കെടുത്തു.',
      full_description_ml: 'കണ്ണൂർ ജില്ലയിലെ പിണറായി ഏരിയ സമ്മേളനം കോട്ടയം അങ്ങാടിയിൽ വെച്ച് നടന്നു.',
      start_date: '2026-09-06T09:30:00.000Z',
      end_date: '2026-09-06T17:00:00.000Z',
      venue: 'Kottayam Angadi, Pinarayi, Kannur',
      venue_ml: 'കോട്ടയം അങ്ങാടി, പിണറായി, കണ്ണൂർ',
      location: 'Pinarayi, Kannur, Kerala',
      location_ml: 'പിണറായി, കണ്ണൂർ',
      map_url: 'https://maps.google.com/?q=Pinarayi+Kannur',
      category: 'conference',
      poster_url: 'https://res.cloudinary.com/dj4apdzk/image/upload/v1/balasangham/media/events/pinarayi-conf-2026/poster.jpg',
      poster_public_id: 'balasangham/media/events/pinarayi-conf-2026/poster',
      published: true,
      snapshare_enabled: true
    },
    {
      id: 'childrens-cultural-festival-2027',
      slug: 'childrens-cultural-festival-2027',
      title: 'Children\'s Cultural Festival 2027',
      title_ml: 'കുട്ടികളുടെ സാംസ്കാരികോത്സവം 2027',
      short_description: 'Annual cultural festival uniting children across Kannur with secular arts, theater, and music performances.',
      short_description_ml: 'കണ്ണൂർ ജില്ലയിലെ കുട്ടികളുടെ വാർഷിക സാംസ്കാരികോത്സവം - നാടകം, സംഗീതം, സാഹിത്യം.',
      full_description: 'കുട്ടികളുടെ സർഗാത്മകതയും പ്രതിഭയും പ്രോത്സാഹിപ്പിക്കുന്നതിനുള്ള ബാലസംഘം കണ്ണൂർ ജില്ലാ കലോത്സവം. വിപുലമായ കലാപരിപാടികൾ അരങ്ങേറും.',
      full_description_ml: 'കുട്ടികളുടെ സർഗാത്മകതയും പ്രതിഭയും പ്രോത്സാഹിപ്പിക്കുന്നതിനുള്ള ബാലസംഘം കണ്ണൂർ ജില്ലാ കലോത്സവം. വിപുലമായ കലാപരിപാടികൾ അരങ്ങേറും.',
      start_date: '2027-01-15T09:00:00.000Z',
      end_date: '2027-01-17T18:00:00.000Z',
      venue: 'Town Square, Kannur',
      venue_ml: 'ടൗൺ സ്ക്വയർ, കണ്ണൂർ',
      location: 'Kannur, Kerala',
      location_ml: 'കണ്ണൂർ',
      map_url: 'https://maps.google.com/?q=Kannur+Town+Square',
      category: 'arts',
      poster_url: 'https://res.cloudinary.com/dj4apdzk/image/upload/v1/balasangham/media/events/festival-2027/poster.jpg',
      poster_public_id: 'balasangham/media/events/festival-2027/poster',
      published: true,
      snapshare_enabled: true
    },
    {
      id: 'venalthumbikal-district-sangamam-2025',
      slug: 'venalthumbikal-kannur-district-sangamam-2025',
      title: 'Venalthumbikal 2025 Kannur District Sangamam',
      title_ml: 'വേനൽത്തുമ്പികൾ 2025 കണ്ണൂർ ജില്ലാ സംഗമം',
      short_description: 'Kannur District Gathering & Memento Presentation of Venalthumbikal Children\'s Cultural Troupes.',
      short_description_ml: 'വേനൽത്തുമ്പികൾ ബാലകലാകാരന്മാരുടെ കണ്ണൂർ ജില്ലാ സംഗമവും ഉപഹാര വിതരണവും.',
      full_description: 'The Kannur District Gathering of Venalthumbikal, Balasangham\'s renowned children\'s cultural troupe movement. Children\'s theater and choral ensembles assembled to celebrate secular arts, creative expression, and social camaraderie.',
      full_description_ml: 'കുട്ടികളുടെ സർഗാത്മകതയും മതേതര മൂല്യങ്ങളും ഉയർത്തിപ്പിടിച്ച് കണ്ണൂർ ജില്ലയിലെ ബാലകലാകാരന്മാർ ഒത്തുചേർന്ന വേനൽത്തുമ്പികൾ ജില്ലാ സംഗമം.',
      start_date: '2025-05-25T10:00:00.000Z',
      end_date: '2025-05-25T18:00:00.000Z',
      venue: 'Collectorate Auditorium, Kannur',
      venue_ml: 'കളക്ടറേറ്റ് ഓഡിറ്റോറിയം, കണ്ണൂർ',
      location: 'Kannur, Kerala',
      location_ml: 'കണ്ണൂർ',
      map_url: 'https://maps.google.com/?q=Collectorate+Auditorium+Kannur',
      category: 'arts',
      poster_url: 'https://res.cloudinary.com/dj4apdzk/image/upload/v1/balasangham/media/events/venalthumbikal-2025/poster.jpg',
      poster_public_id: 'balasangham/media/events/venalthumbikal-2025/poster',
      published: true,
      snapshare_enabled: true
    },
    {
      id: 'district-workshop-on-children-literature',
      slug: 'district-workshop-on-children-literature',
      title: 'District Workshop on Children\'s Literature',
      title_ml: 'ബാലസാഹിത്യ ശില്പശാല',
      short_description: 'Creative writing and storytelling workshop for child writers and young illustrators in Kannur.',
      short_description_ml: 'കണ്ണൂർ ജില്ലയിലെ ബാലസാഹിത്യകാരന്മാർക്കും ചിത്രകാരന്മാർക്കുമുള്ള സർഗാത്മക ശില്പശാല.',
      full_description: 'കുട്ടികളിൽ വായനാശീലവും എഴുത്തുവാസനയും വളർത്തുന്നതിനായി പ്രമുഖ സാഹിത്യകാരന്മാരുടെ സാന്നിധ്യത്തിൽ സംഘടിപ്പിച്ച ശില്പശാല.',
      full_description_ml: 'കുട്ടികളിൽ വായനാശീലവും എഴുത്തുവാസനയും വളർത്തുന്നതിനായി പ്രമുഖ സാഹിത്യകാരന്മാരുടെ സാന്നിധ്യത്തിൽ സംഘടിപ്പിച്ച ശില്പശാല.',
      start_date: '2026-08-12T09:30:00.000Z',
      end_date: '2026-08-12T16:30:00.000Z',
      venue: 'Jawahar Balabhavan, Kannur',
      venue_ml: 'ജവഹർ ബാലഭവൻ, കണ്ണൂർ',
      location: 'Kannur, Kerala',
      location_ml: 'കണ്ണൂർ',
      map_url: 'https://maps.google.com/?q=Jawahar+Balabhavan+Kannur',
      category: 'workshops',
      poster_url: 'https://res.cloudinary.com/dj4apdzk/image/upload/v1/balasangham/media/events/literature-workshop/poster.jpg',
      poster_public_id: 'balasangham/media/events/literature-workshop/poster',
      published: true,
      snapshare_enabled: true
    }
  ];

  // Map to store combined events by ID / Slug
  const allEventsMap = new Map();
  for (const ev of canonicalEvents) {
    allEventsMap.set(ev.slug, ev);
    allEventsMap.set(ev.id, ev);
  }

  // Merge any extras from SQLite
  for (const row of sqliteEvents) {
    const existing = allEventsMap.get(row.slug) || allEventsMap.get(row.id);
    if (!existing) {
      allEventsMap.set(row.slug, {
        id: row.id,
        slug: row.slug,
        title: row.title,
        title_ml: row.title_ml,
        short_description: row.short_description,
        short_description_ml: row.short_description_ml,
        full_description: row.full_description,
        full_description_ml: row.full_description_ml,
        start_date: row.start_date,
        end_date: row.end_date,
        venue: row.venue,
        venue_ml: row.venue_ml,
        location: row.location,
        location_ml: row.location_ml,
        map_url: row.map_url,
        category: row.category || 'conference',
        poster_url: row.poster_url,
        poster_public_id: row.poster_public_id,
        published: Boolean(row.published === 1 || row.published === true),
        snapshare_enabled: Boolean(row.snapshare_enabled === 1 || row.snapshare_enabled === true)
      });
    }
  }

  // Upload each event to Firestore
  console.log('\n--- Uploading Events to Firestore ---');
  const distinctEvents = Array.from(new Set(allEventsMap.values()));
  for (const ev of distinctEvents) {
    const docId = ev.slug; // Use clean slug as docId for predictable indexing
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
      published: ev.published !== false,
      snapShareEnabled: ev.snapshare_enabled !== false,
      snapshare_enabled: ev.snapshare_enabled ? 1 : 0,
      createdAt: new Date('2026-10-01T00:00:00Z'),
      updatedAt: new Date()
    };

    const restFields = objectToRestFields(payload);
    await firestorePatch('events', docId, restFields);
    console.log(`✓ Firestore Event: ${docId} ("${ev.title}")`);

    // Ensure SQLite database has this event
    if (sqliteDb) {
      const existingInSqlite = sqliteDb.prepare('SELECT id FROM events WHERE slug = ?').get(ev.slug);
      if (!existingInSqlite) {
        sqliteDb.prepare(`
          INSERT INTO events (
            id, slug, title, title_ml, short_description, short_description_ml,
            full_description, full_description_ml, start_date, end_date,
            venue, venue_ml, location, location_ml, map_url, category,
            poster_url, poster_public_id, published, snapshare_enabled
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
          ev.id || docId, ev.slug, ev.title, ev.title_ml || null,
          ev.short_description || null, ev.short_description_ml || null,
          ev.full_description || null, ev.full_description_ml || null,
          startIso, endIso,
          ev.venue || null, ev.venue_ml || null,
          ev.location || null, ev.location_ml || null,
          ev.map_url || null, ev.category || 'conference',
          ev.poster_url || null, ev.poster_public_id || null,
          ev.published ? 1 : 0, ev.snapshare_enabled ? 1 : 0
        );
        console.log(`  + Synced to SQLite: ${ev.slug}`);
      }
    }
  }

  // 4. Upload all 27 Media Items to Firestore
  console.log('\n--- Uploading Media Assets to Firestore ---');
  const mediaDataPath = path.join(__dirname, '..', 'src', 'data', 'mediaCloudinary.json');
  const mediaItems = JSON.parse(fs.readFileSync(mediaDataPath, 'utf8'));
  console.log(`Loaded ${mediaItems.length} media items from mediaCloudinary.json.`);

  for (const m of mediaItems) {
    const docId = m.id;
    const isImage = (m.resource_type === 'image' || m.type === 'image' || m.media_type === 'photo');
    const mediaType = isImage ? 'image' : 'video';

    const payload = {
      title: m.caption || m.title || `Balasangham Asset ${docId}`,
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
      published: true,
      sort_order: typeof m.sort_order === 'number' ? m.sort_order : 0,
      createdAt: new Date('2026-10-01T00:00:00Z'),
      updatedAt: new Date()
    };

    const restFields = objectToRestFields(payload);
    await firestorePatch('media', docId, restFields);
    console.log(`✓ Firestore Media: ${docId} ("${payload.title}")`);

    // Ensure SQLite database has this media item
    if (sqliteDb) {
      const existingInSqlite = sqliteDb.prepare('SELECT id FROM media WHERE id = ?').get(docId);
      if (!existingInSqlite) {
        sqliteDb.prepare(`
          INSERT INTO media (
            id, event_id, cloudinary_public_id, url, thumbnail_url,
            width, height, format, resource_type, title, caption, caption_ml,
            media_type, duration, published, sort_order
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
          docId, m.event_id || null, m.cloudinary_public_id, m.url, m.thumbnail_url || null,
          payload.width, payload.height, payload.format, mediaType,
          payload.title, m.caption || null, m.caption_ml || null,
          m.media_type || 'photo', m.duration || null, 1, payload.sort_order
        );
        console.log(`  + Synced to SQLite: ${docId}`);
      }
    }
  }

  console.log('\n=== Migration Successfully Completed! ===');
}

run().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
