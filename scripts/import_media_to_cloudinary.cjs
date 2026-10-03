const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const db = require('../server/db');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const mediaBaseDir = '/home/dhyandevp/Documents/WayveEnterprises/clientproject/balasangham/media';

// 1. Seed Venalthumbikal 2025 event if not exists
const venalthumbikalEventId = 'venalthumbikal-district-sangamam-2025';
const existingEvent = db.prepare('SELECT id FROM events WHERE id = ? OR slug = ?').get(
  venalthumbikalEventId,
  'venalthumbikal-kannur-district-sangamam-2025'
);

if (!existingEvent) {
  db.prepare(`
    INSERT INTO events (
      id, slug, title, title_ml,
      short_description, short_description_ml,
      full_description, full_description_ml,
      start_date, end_date,
      venue, venue_ml, location, location_ml,
      category, poster_url, published, snapshare_enabled
    ) VALUES (
      ?, ?, ?, ?,
      ?, ?,
      ?, ?,
      ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?, ?
    )
  `).run(
    venalthumbikalEventId,
    'venalthumbikal-kannur-district-sangamam-2025',
    'Venalthumbikal 2025 Kannur District Sangamam',
    'വേനൽത്തുമ്പികൾ 2025 കണ്ണൂർ ജില്ലാ സംഗമം',
    "Kannur District Gathering & Memento Presentation of Venalthumbikal Children's Cultural Troupes.",
    'വേനൽത്തുമ്പികൾ ബാലകലാകാരന്മാരുടെ കണ്ണൂർ ജില്ലാ സംഗമവും ഉപഹാര വിതരണവും.',
    "The Kannur District Gathering of Venalthumbikal, Balasangham's renowned children's cultural troupe movement. Children's theater and choral ensembles from across Kannur district assembled to celebrate secular arts, creative expression, and social camaraderie.",
    'കുട്ടികളുടെ സർഗാത്മകതയും മതേതര മൂല്യങ്ങളും ഉയർത്തിപ്പിടിച്ച് കണ്ണൂരിലെ വിവിധ ഏരിയകളിൽ പര്യടനം നടത്തിയ വേനൽത്തുമ്പികൾ ബാലകലാസംഘങ്ങളുടെ ജില്ലാതല സംഗമവും പുരസ്കാര വിതരണവും.',
    '2025-05-24T10:00:00',
    '2025-05-24T18:00:00',
    'Kannur',
    'കണ്ണൂർ',
    'Kannur, Kerala',
    'കണ്ണൂർ',
    'cultural',
    '/images/venalthumbikal-children.jpeg',
    1,
    1
  );
  console.log('Inserted Venalthumbikal 2025 event into database.');
} else {
  console.log('Venalthumbikal 2025 event already exists in database.');
}

// 2. Prepare files list
const photosDir = path.join(mediaBaseDir, 'WhatsApp Unknown 2026-10-03 at 2.25.15 AM');
const photoFiles = fs.readdirSync(photosDir).filter(f => f.toLowerCase().endsWith('.jpeg') || f.toLowerCase().endsWith('.jpg')).sort();

const videoConfigs = [
  {
    filePath: path.join(mediaBaseDir, 'WhatsApp Unknown 2026-10-03 at 2.25.36 AM', 'WhatsApp Video 2026-10-02 at 8.31.01 AM (1).mp4'),
    publicId: 'village-carnival-announcement',
    title: 'Balasangham Village Carnival Announcement',
    titleMl: 'ബാലസംഘം വില്ലേജ് കാർണിവൽ വിളംബരം',
    caption: 'Official village carnival proclamation and event poster display for children.',
    captionMl: 'കുട്ടികൾക്കായുള്ള വില്ലേജ് കാർണിവൽ വിളംബരവും പോസ്റ്ററും.',
    category: 'Carnival'
  },
  {
    filePath: path.join(mediaBaseDir, 'WhatsApp Unknown 2026-10-03 at 2.25.36 AM', 'WhatsApp Video 2026-10-02 at 8.31.01 AM (2).mp4'),
    publicId: 'kathirur-village-carnival-activities',
    title: 'Kathirur Village Committee Carnival Activities',
    titleMl: 'കതിരൂർ വില്ലേജ് കമ്മിറ്റി കാർണിവൽ പരിപാടികൾ',
    caption: 'Children and families actively participating in Kathirur Village Committee carnival games.',
    captionMl: 'കതിരൂർ വില്ലേജ് കമ്മിറ്റി സംഘടിപ്പിച്ച കാർണിവലിൽ കുട്ടികളുടെ പങ്കാളിത്തം.',
    category: 'Carnival'
  },
  {
    filePath: path.join(mediaBaseDir, 'WhatsApp Unknown 2026-10-03 at 2.25.36 AM', 'WhatsApp Video 2026-10-02 at 8.31.01 AM.mp4'),
    publicId: 'cultural-troupe-night-festival',
    title: 'Children Cultural Gathering & Night Illumination Festival',
    titleMl: 'കുട്ടികളുടെ സാംസ്കാരിക സംഗമവും സായാഹ്ന ഉത്സവവും',
    caption: 'Illuminated village canopy stage hosting children musical skits and folk performances.',
    captionMl: 'ദീപാലങ്കാരങ്ങളോടെ സജ്ജീകരിച്ച വേദിയിൽ കുട്ടികളുടെ നാടൻപാട്ടും സാംസ്കാരിക പരിപാടികളും.',
    category: 'Cultural'
  },
  {
    filePath: path.join(mediaBaseDir, 'WhatsApp Unknown 2026-10-03 at 2.25.36 AM', 'WhatsApp Video 2026-10-02 at 8.31.02 AM (1).mp4'),
    publicId: 'carnival-stage-and-flag-celebration',
    title: 'Carnival Stage & Flag Celebrations',
    titleMl: 'കാർണിവൽ വേദിയിലെ പതാക ഉയർത്തലും ആഘോഷങ്ങളും',
    caption: 'Balasangham flags fluttering across the auditorium grounds with community stage programs.',
    captionMl: 'ബാലസംഘം പതാകകൾ പാറുന്ന കാർണിവൽ നഗരിയും വേദിയും.',
    category: 'Carnival'
  },
  {
    filePath: path.join(mediaBaseDir, 'WhatsApp Unknown 2026-10-03 at 2.25.36 AM', 'WhatsApp Video 2026-10-02 at 8.31.02 AM.mp4'),
    publicId: 'thiruvangad-east-flag-illumination',
    title: 'Thiruvangad East Street Flag Illumination',
    titleMl: 'തിരുവങ്ങാട് ഈസ്റ്റ് പതാക അലങ്കാരവും തെരുവ് ദീപാലങ്കാരവും',
    caption: 'Decorated village streets in Thiruvangad East honoring Balasangham anniversary week.',
    captionMl: 'തിരുവങ്ങാട് ഈസ്റ്റിൽ ബാലസംഘം വാർഷികത്തോടനുബന്ധിച്ച് ഒരുക്കിയ ദീപാലങ്കാരം.',
    category: 'Activity'
  },
  {
    filePath: path.join(mediaBaseDir, 'WhatsApp Unknown 2026-10-03 at 2.25.51 AM', 'WhatsApp Video 2026-10-02 at 8.31.02 AM.mp4'),
    publicId: 'taliparamba-area-festival-grounds',
    title: 'Taliparamba Area Committee Festival Grounds',
    titleMl: 'തളിപ്പറമ്പ് ഏരിയ കമ്മിറ്റി ഉത്സവ നഗരി',
    caption: 'Pennants and festive decorations installed by Balasangham Taliparamba Area Committee.',
    captionMl: 'തളിപ്പറമ്പ് ഏരിയ കമ്മിറ്റിയുടെ നേതൃത്വത്തിൽ അലങ്കരിച്ച ഉത്സവ നഗരി.',
    category: 'Activity'
  },
  {
    filePath: path.join(mediaBaseDir, 'WhatsApp Unknown 2026-10-03 at 2.25.51 AM', 'WhatsApp Video 2026-10-02 at 8.31.03 AM.mp4'),
    publicId: 'peringome-study-camp-happiness-festival',
    title: 'Peringome Area Study Camp & Happiness Festival at Ezhukudukka',
    titleMl: 'പെരിങ്ങോം ഏരിയ പഠന ക്യാമ്പ് & ഹാപ്പിനെസ്സ് ഫെസ്റ്റിവൽ, ഏഴുകുടുക്ക',
    caption: 'Inaugural assembly of Balasangham Peringome Area Committee Study Camp at Ezhukudukka AUP School.',
    captionMl: 'ഏഴുകുടുക്ക എ.യു.പി സ്കൂളിൽ നടന്ന പെരിങ്ങോം ഏരിയ പഠന ക്യാമ്പ് & ഹാപ്പിനെസ്സ് ഫെസ്റ്റിവൽ.',
    category: 'Camp'
  },
  {
    filePath: path.join(mediaBaseDir, 'WhatsApp Video 2026-10-02 at 8.30.58 AM.mp4'),
    publicId: 'kannur-district-childrens-rally',
    title: "Balasangham Kannur District Children's Flag Procession",
    titleMl: 'കണ്ണൂർ ജില്ലാ കമ്മിറ്റി കുട്ടികളുടെ പതാക ജാഥ',
    caption: 'Children holding hands with pride, carrying the red-star white flag across Kannur.',
    captionMl: 'ചെങ്കൊടിയേന്തി കൈകോർത്തുപിടിച്ച് മുന്നേറുന്ന ബാലസംഘം കുട്ടിക്കൂട്ടം.',
    category: 'Rally'
  },
  {
    filePath: path.join(mediaBaseDir, 'WhatsApp Video 2026-10-02 at 8.30.59 AM.mp4'),
    publicId: 'childrens-educational-camp-session',
    title: "Children's Cultural & Educational Camp Session",
    titleMl: 'കുട്ടികളുടെ സാംസ്കാരിക വിദ്യാഭ്യാസ ക്യാമ്പ് സെഷൻ',
    caption: 'Interactive mentoring, story-telling, and song training conducted during the children camp.',
    captionMl: 'ക്യാമ്പിലെ സാംസ്കാരിക വിദ്യാഭ്യാസ സെഷനും ഗാന പരിശീലനവും.',
    category: 'Camp'
  },
  {
    filePath: path.join(mediaBaseDir, 'WhatsApp Video 2026-10-02 at 8.31.00 AM.mp4'),
    publicId: "balasangham-keralam-flag-march",
    title: 'Balasangham Children Countryside Flag March',
    titleMl: 'ബാലസംഘം കുട്ടികളുടെ ഗ്രാമീണ പതാക പരേഡ്',
    caption: 'Young girls and boys marching proudly with Balasangham flags along rural Malabar roads.',
    captionMl: 'ഗ്രാമീണ പാതകളിൽ അഭിമാനത്തോടെ പതാകയേന്തി നീങ്ങുന്ന കുട്ടികളുടെ പരേഡ്.',
    category: 'Rally'
  },
  {
    filePath: path.join(mediaBaseDir, 'WhatsApp Video 2026-10-02 at 8.31.01 AM.mp4'),
    publicId: 'kannur-district-procession',
    title: 'Balasangham Kannur Thalassery-Panoor Area Procession',
    titleMl: 'ബാലസംഘം കണ്ണൂർ തലശ്ശേരി-പാനൂർ ഏരിയ ജാഥ',
    caption: 'Mass procession passing through Thalassery, Panoor, and Nadapuram route corridors.',
    captionMl: 'തലശ്ശേരി-പാനൂർ റൂട്ടിലൂടെ കടന്നുപോയ ബാലസംഘം സാംസ്കാരിക ജാഥ.',
    category: 'Rally'
  }
];

const mediaRecords = [];

async function uploadAll() {
  console.log('--- STARTING MEDIA IMPORT ---');

  // Check existing media in DB
  const existingMediaRows = db.prepare('SELECT cloudinary_public_id, id FROM media').all();
  const existingPublicIds = new Set(existingMediaRows.map(r => r.cloudinary_public_id));

  // Prepare DB statements
  const insertMedia = db.prepare(`
    INSERT INTO media (
      id, event_id, cloudinary_public_id, url, thumbnail_url,
      width, height, format, resource_type, caption, caption_ml,
      media_type, sort_order, created_at
    ) VALUES (
      @id, @event_id, @cloudinary_public_id, @url, @thumbnail_url,
      @width, @height, @format, @resource_type, @caption, @caption_ml,
      @media_type, @sort_order, datetime('now')
    )
  `);

  const updateMedia = db.prepare(`
    UPDATE media SET
      event_id = @event_id,
      url = @url,
      thumbnail_url = @thumbnail_url,
      width = @width,
      height = @height,
      format = @format,
      resource_type = @resource_type,
      caption = @caption,
      caption_ml = @caption_ml,
      media_type = @media_type,
      sort_order = @sort_order
    WHERE cloudinary_public_id = @cloudinary_public_id
  `);

  // 1. Upload 16 Photos
  console.log(`\nProcessing ${photoFiles.length} photos...`);
  for (let i = 0; i < photoFiles.length; i++) {
    const filename = photoFiles[i];
    const fullPath = path.join(photosDir, filename);
    const pubIdNum = String(i + 1).padStart(2, '0');
    const expectedPublicId = `balasangham/media/events/venalthumbikal-district-sangamam-2025/venalthumbikal-2025-troupe-${pubIdNum}`;

    console.log(`[Photo ${i + 1}/${photoFiles.length}] Uploading ${filename} -> ${expectedPublicId}...`);
    
    let uploadRes;
    try {
      uploadRes = await cloudinary.uploader.upload(fullPath, {
        folder: 'balasangham/media/events/venalthumbikal-district-sangamam-2025',
        public_id: `venalthumbikal-2025-troupe-${pubIdNum}`,
        overwrite: true,
        resource_type: 'image',
        tags: ['balasangham', 'media', 'photos', 'venalthumbikal-2025']
      });
    } catch (err) {
      console.error(`Failed to upload photo ${filename}:`, err);
      continue;
    }

    const thumbUrl = cloudinary.url(uploadRes.public_id, {
      width: 600,
      crop: 'scale',
      quality: 'auto',
      fetch_format: 'auto'
    });

    const displayUrl = cloudinary.url(uploadRes.public_id, {
      width: 1400,
      crop: 'limit',
      quality: 'auto',
      fetch_format: 'auto'
    });

    const record = {
      id: `media-photo-vt-2025-${pubIdNum}`,
      event_id: venalthumbikalEventId,
      cloudinary_public_id: uploadRes.public_id,
      url: displayUrl,
      thumbnail_url: thumbUrl,
      width: uploadRes.width,
      height: uploadRes.height,
      format: uploadRes.format,
      resource_type: 'image',
      caption: `Venalthumbikal 2025 Cultural Troupe Award Presentation (${i + 1})`,
      caption_ml: `വേനൽത്തുമ്പികൾ 2025 ജില്ലാ സംഗമം - ബാലകലാസംഘം ഉപഹാര സമർപ്പണം (${i + 1})`,
      media_type: 'photo',
      sort_order: i
    };

    if (existingPublicIds.has(uploadRes.public_id)) {
      updateMedia.run(record);
      console.log(`Updated DB record for ${uploadRes.public_id}`);
    } else {
      insertMedia.run(record);
      console.log(`Inserted DB record for ${uploadRes.public_id}`);
      existingPublicIds.add(uploadRes.public_id);
    }

    mediaRecords.push(record);
  }

  // 2. Upload 11 Videos
  console.log(`\nProcessing ${videoConfigs.length} videos...`);
  for (let i = 0; i < videoConfigs.length; i++) {
    const cfg = videoConfigs[i];
    const expectedPublicId = `balasangham/media/activities/${cfg.publicId}`;

    console.log(`[Video ${i + 1}/${videoConfigs.length}] Uploading ${path.basename(cfg.filePath)} -> ${expectedPublicId}...`);

    let uploadRes;
    try {
      uploadRes = await cloudinary.uploader.upload(cfg.filePath, {
        folder: 'balasangham/media/activities',
        public_id: cfg.publicId,
        overwrite: true,
        resource_type: 'video',
        tags: ['balasangham', 'media', 'videos', 'activities', cfg.category.toLowerCase()]
      });
    } catch (err) {
      console.error(`Failed to upload video ${cfg.publicId}:`, err);
      continue;
    }

    // Generate responsive video stream url and poster thumbnail image
    const videoStreamUrl = cloudinary.url(uploadRes.public_id, {
      resource_type: 'video',
      quality: 'auto',
      fetch_format: 'auto'
    });

    const posterUrl = cloudinary.url(uploadRes.public_id, {
      resource_type: 'video',
      format: 'jpg',
      width: 720,
      crop: 'scale',
      quality: 'auto'
    });

    const record = {
      id: `media-video-act-${String(i + 1).padStart(2, '0')}`,
      event_id: null,
      cloudinary_public_id: uploadRes.public_id,
      url: videoStreamUrl,
      thumbnail_url: posterUrl,
      width: uploadRes.width,
      height: uploadRes.height,
      format: uploadRes.format,
      resource_type: 'video',
      caption: cfg.title,
      caption_ml: cfg.titleMl,
      media_type: 'video',
      sort_order: i
    };

    if (existingPublicIds.has(uploadRes.public_id)) {
      updateMedia.run(record);
      console.log(`Updated DB record for ${uploadRes.public_id}`);
    } else {
      insertMedia.run(record);
      console.log(`Inserted DB record for ${uploadRes.public_id}`);
      existingPublicIds.add(uploadRes.public_id);
    }

    mediaRecords.push(record);
  }

  // 3. Write static JSON reference artifact
  const exportPath = path.join(__dirname, '..', 'src', 'data', 'mediaCloudinary.json');
  fs.writeFileSync(exportPath, JSON.stringify(mediaRecords, null, 2), 'utf-8');
  console.log(`\nSuccessfully exported ${mediaRecords.length} media records to ${exportPath}`);

  console.log('\n--- MEDIA IMPORT COMPLETED SUCCESSFULLY ---');
}

uploadAll().catch(err => {
  console.error('Fatal error during media import:', err);
  process.exit(1);
});
