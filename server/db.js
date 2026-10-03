const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Also ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'balasangham.db');
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Create tables
db.exec(`
CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  title_ml TEXT,
  short_description TEXT,
  short_description_ml TEXT,
  full_description TEXT,
  full_description_ml TEXT,
  start_date TEXT,
  end_date TEXT,
  venue TEXT,
  venue_ml TEXT,
  location TEXT,
  location_ml TEXT,
  map_url TEXT,
  category TEXT DEFAULT 'conference',
  poster_url TEXT,
  poster_public_id TEXT,
  published INTEGER DEFAULT 0,
  snapshare_enabled INTEGER DEFAULT 0,
  registration_url TEXT,
  additional_info TEXT,
  additional_info_ml TEXT,
  schedule_info TEXT,
  schedule_info_ml TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);
`);

// Migrate existing events table to include map_url if needed
try {
  db.prepare("ALTER TABLE events ADD COLUMN map_url TEXT").run();
} catch (e) {
  // column already exists
}

db.exec(`
CREATE TABLE IF NOT EXISTS media (
  id TEXT PRIMARY KEY,
  event_id TEXT REFERENCES events(id) ON DELETE SET NULL,
  cloudinary_public_id TEXT NOT NULL,
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  width INTEGER,
  height INTEGER,
  format TEXT,
  resource_type TEXT DEFAULT 'image',
  title TEXT,
  description TEXT,
  caption TEXT,
  caption_ml TEXT,
  media_type TEXT DEFAULT 'photo',
  duration REAL,
  published INTEGER DEFAULT 1,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);
`);

// Migrate existing columns if missing
const mediaCols = db.pragma('table_info(media)').map(c => c.name);
if (!mediaCols.includes('title')) {
  try { db.exec('ALTER TABLE media ADD COLUMN title TEXT;'); } catch (e) {}
}
if (!mediaCols.includes('description')) {
  try { db.exec('ALTER TABLE media ADD COLUMN description TEXT;'); } catch (e) {}
}
if (!mediaCols.includes('duration')) {
  try { db.exec('ALTER TABLE media ADD COLUMN duration REAL;'); } catch (e) {}
}
if (!mediaCols.includes('published')) {
  try { db.exec('ALTER TABLE media ADD COLUMN published INTEGER DEFAULT 1;'); } catch (e) {}
}
if (!mediaCols.includes('updated_at')) {
  try { db.exec("ALTER TABLE media ADD COLUMN updated_at TEXT DEFAULT (datetime('now'));"); } catch (e) {}
}

// Create indexes after columns exist
db.exec(`
CREATE INDEX IF NOT EXISTS idx_media_event_id ON media(event_id);
CREATE INDEX IF NOT EXISTS idx_media_published ON media(published);
CREATE INDEX IF NOT EXISTS idx_media_resource_type ON media(resource_type);
`);

// Seed the verified 2026 Kannur District Conference
const existingEvent = db.prepare("SELECT id FROM events WHERE slug = 'kannur-district-conference-2026'").get();

if (!existingEvent) {
  const { generateId } = require('./utils');
  
  const insertEvent = db.prepare(`
    INSERT INTO events (
      id, slug, title, title_ml, 
      short_description, short_description_ml,
      full_description, full_description_ml,
      start_date, end_date, 
      venue, venue_ml, location, location_ml, 
      category, poster_url, published, snapshare_enabled,
      additional_info, additional_info_ml,
      schedule_info, schedule_info_ml
    ) VALUES (
      @id, @slug, @title, @title_ml,
      @short_description, @short_description_ml,
      @full_description, @full_description_ml,
      @start_date, @end_date,
      @venue, @venue_ml, @location, @location_ml,
      @category, @poster_url, @published, @snapshare_enabled,
      @additional_info, @additional_info_ml,
      @schedule_info, @schedule_info_ml
    )
  `);

  insertEvent.run({
    id: generateId(),
    slug: 'kannur-district-conference-2026',
    title: 'Balasangham Kannur District Conference',
    title_ml: 'ബാലസംഘം കണ്ണൂർ ജില്ലാ സമ്മേളനം',
    short_description: 'Childhood of Struggle ✊🏻 — The Kannur District Conference returns to its historic birthplace at Kalliasseri, where Balasangham was founded on December 28, 1938.',
    short_description_ml: 'പോരാട്ടത്തിന്റെ ബാല്യം ✊🏻 — 1938 ഡിസംബർ 28-ന് ബാലസംഘം ജന്മമെടുത്ത കല്ല്യാശ്ശേരിയിൽ ജില്ലാ സമ്മേളനം വീണ്ടും.',
    full_description: 'On December 28, 1938, amidst the historic peasant awakening of North Malabar, Balasangham was born in Kalliasseri. Guided by pioneering freedom fighters including P. Krishna Pillai, A.K. Gopalan (AKG), E.M.S. Namboodiripad, K.P.R. Gopalan, and the young E.K. Nayanar, this movement gave children dignity and voice. After 88 years of continuous struggle and cultural elevation, the Kannur District Conference returns to its historic birthplace.\n\nElected delegates from all Area Committees of Kannur will gather for two days of deliberation, cultural exchange, and organizational planning.',
    full_description_ml: '1938 ഡിസംബർ 28-ന് വടക്കേ മലബാറിലെ കർഷക പോരാട്ടങ്ങളുടെ കനലുകളിൽ നിന്നാണ് കല്ല്യാശ്ശേരിയിൽ ബാലസംഘം രൂപംകൊണ്ടത്. പി. കൃഷ്ണപിള്ള, എ.കെ.ജി, ഇ.എം.എസ്, കെ.പി.ആർ. ഗോപാലൻ, ഇ.കെ. നായനാർ തുടങ്ങിയ ധീരനേതാക്കളുടെ പ്രചോദനത്തിൽ ആരംഭിച്ച ഈ കുട്ടികളുടെ പ്രസ്ഥാനം, 88 വർഷങ്ങൾക്ക് ശേഷം വീണ്ടും അതിന്റെ ചരിത്രപരമായ ജന്മഭൂമിയിൽ ജില്ലാ സമ്മേളനത്തിനായി സംഗമിക്കുന്നു.\n\nകണ്ണൂരിലെ എല്ലാ ഏരിയാ കമ്മിറ്റികളിൽ നിന്നുമുള്ള തിരഞ്ഞെടുക്കപ്പെട്ട പ്രതിനിധികൾ രണ്ട് ദിവസത്തെ ചർച്ചകൾക്കും സാംസ്കാരിക വിനിമയത്തിനും സംഘടനാ ആസൂത്രണത്തിനുമായി ഒത്തുചേരും.',
    start_date: '2026-10-10T09:00:00',
    end_date: '2026-10-11T18:00:00',
    venue: 'PCR Bank Auditorium, Kalliasseri',
    venue_ml: 'പിസിആർ ബാങ്ക് ഓഡിറ്റോറിയം, കല്ല്യാശ്ശേരി',
    location: 'Kalliasseri, Kannur, Kerala',
    location_ml: 'കല്ല്യാശ്ശേരി, കണ്ണൂർ',
    category: 'conference',
    poster_url: '/images/conference-poster-2026.jpg',
    published: 1,
    snapshare_enabled: 1,
    additional_info: 'Regular buses along the Kannur–Payyanur highway stop at Kalliasseri Junction. Nearest railway stations: Kannur (12 km), Valapattanam (5 km), Kannapuram (4 km).',
    additional_info_ml: 'കണ്ണൂർ - പയ്യന്നൂർ റൂട്ടിൽ സർവീസ് നടത്തുന്ന എല്ലാ ബസുകളും കല്ല്യാശ്ശേരി ജംഗ്ഷനിൽ നിർത്തും. അടുത്തുള്ള റെയിൽവേ സ്റ്റേഷനുകൾ: കണ്ണൂർ (12 കി.മീ), വളപട്ടണം (5 കി.മീ), കണ്ണാപുരം (4 കി.മീ).',
    schedule_info: 'Detailed session-by-session schedules will be updated upon official ratification. Elected delegates from all Area Committees of Kannur should report at the Kalliasseri reception desk on the morning of October 10.',
    schedule_info_ml: 'വിശദമായ സെഷൻ സമയവിവരപ്പട്ടിക ഔദ്യോഗികമായി അംഗീകരിക്കപ്പെടുന്ന മുറയ്ക്ക് പ്രസിദ്ധീകരിക്കും. എല്ലാ ഏരിയകളിൽ നിന്നുമുള്ള തിരഞ്ഞെടുക്കപ്പെട്ട പ്രതിനിധികൾ ഒക്ടോബർ 10 രാവിലെ കല്ല്യാശ്ശേരിയിലെ സ്വീകരണ കൗണ്ടറിൽ റിപ്പോർട്ട് ചെയ്യേണ്ടതാണ്.'
  });
  
  console.log('Seed data: Kannur District Conference 2026 inserted.');
}

module.exports = db;

