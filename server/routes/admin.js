const express = require('express');
const router = express.Router();
const db = require('../db');
const { requireAuth, loginLimiter, loginHandler, logoutHandler, checkSessionHandler } = require('../auth');
const { generateSlug, generateId } = require('../utils');
const cloudinary = require('../cloudinary');

// Auth routes (public within /api/admin)
router.post('/login', loginLimiter, loginHandler);
router.post('/logout', logoutHandler);
router.get('/session', checkSessionHandler);

// Apply auth middleware to all routes below
router.use(requireAuth);

// GET /api/admin/stats — Dashboard stats
router.get('/stats', (req, res) => {
  try {
    const totalEvents = db.prepare('SELECT count(*) as count FROM events').get().count;
    const publishedEvents = db.prepare('SELECT count(*) as count FROM events WHERE published = 1').get().count;
    const draftEvents = totalEvents - publishedEvents;
    const totalMedia = db.prepare('SELECT count(*) as count FROM media').get().count;
    
    res.json({
      totalEvents: totalEvents,
      publishedEvents: publishedEvents,
      draftEvents: draftEvents,
      totalMedia: totalMedia,
      total_events: totalEvents,
      published_events: publishedEvents,
      draft_events: draftEvents,
      total_media: totalMedia
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/admin/events — List all events
router.get('/events', (req, res) => {
  try {
    const events = db.prepare('SELECT * FROM events ORDER BY created_at DESC').all();
    res.json(events);
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/admin/events/:id — Get single event with media
router.get('/events/:id', (req, res) => {
  try {
    const event = db.prepare('SELECT * FROM events WHERE id = ?').get(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    const media = db.prepare('SELECT * FROM media WHERE event_id = ? ORDER BY sort_order ASC, created_at DESC').all(event.id);
    const gallery_urls = media.map(m => m.url);
    res.json({
      ...event,
      media,
      gallery_urls
    });
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Google Maps URL validator
function validateGoogleMapsUrl(url) {
  if (!url) return { valid: true, sanitized: null };
  const trimmed = String(url).trim();
  if (!trimmed) return { valid: true, sanitized: null };

  if (!trimmed.startsWith('https://')) {
    return { valid: false, error: 'Google Maps URL must start with https://' };
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'https:') {
      return { valid: false, error: 'Only secure https:// URLs are allowed' };
    }

    const hostname = parsed.hostname.toLowerCase();
    const validHosts = [
      'maps.google.com',
      'www.google.com',
      'google.com',
      'goo.gl',
      'maps.app.goo.gl'
    ];

    const isMatch = validHosts.includes(hostname) ||
      hostname.endsWith('.google.com') ||
      hostname.endsWith('.google.co.in');

    if (!isMatch) {
      return { valid: false, error: 'Please enter a valid Google Maps URL (e.g., https://maps.google.com/..., https://goo.gl/maps/..., or https://maps.app.goo.gl/...)' };
    }

    if (hostname.includes('google.com') || hostname.includes('google.co.in')) {
      if (!hostname.startsWith('maps.') && !parsed.pathname.startsWith('/maps')) {
        return { valid: false, error: 'Google URL must point to a Google Maps path (/maps)' };
      }
    }

    return { valid: true, sanitized: trimmed };
  } catch (e) {
    return { valid: false, error: 'Invalid URL format' };
  }
}

// POST /api/admin/events — Create event
router.post('/events', (req, res) => {
  try {
    const data = req.body;
    if (!data.title || !data.title.trim()) {
      return res.status(400).json({ error: 'Event title is required' });
    }

    let mapUrl = null;
    if (data.map_url) {
      const mapValidation = validateGoogleMapsUrl(data.map_url);
      if (!mapValidation.valid) {
        return res.status(400).json({ error: mapValidation.error });
      }
      mapUrl = mapValidation.sanitized;
    }

    const id = generateId();
    let baseSlug = generateSlug(data.title);
    let slug = baseSlug;
    
    // Ensure slug uniqueness
    let counter = 1;
    while (db.prepare('SELECT id FROM events WHERE slug = ?').get(slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Combine date + time if provided
    let startDate = data.start_date || null;
    if (startDate && data.start_time) {
      startDate = `${startDate}T${data.start_time}:00`;
    }
    let endDate = data.end_date || null;
    if (endDate && data.end_time) {
      endDate = `${endDate}T${data.end_time}:00`;
    }
    
    const stmt = db.prepare(`
      INSERT INTO events (
        id, slug, title, title_ml, short_description, short_description_ml,
        full_description, full_description_ml, start_date, end_date,
        venue, venue_ml, location, location_ml, map_url, category,
        poster_url, poster_public_id, published, snapshare_enabled,
        registration_url, additional_info, additional_info_ml,
        schedule_info, schedule_info_ml
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      )
    `);
    
    stmt.run(
      id,
      slug,
      data.title,
      data.title_ml || null,
      data.short_description || null,
      data.short_description_ml || null,
      data.full_description || null,
      data.full_description_ml || null,
      startDate,
      endDate,
      data.venue || null,
      data.venue_ml || null,
      data.location || null,
      data.location_ml || null,
      mapUrl,
      data.category || 'conference',
      data.poster_url || null,
      data.poster_public_id || null,
      data.published ? 1 : 0,
      data.snapshare_enabled ? 1 : 0,
      data.registration_url || null,
      data.additional_info || null,
      data.additional_info_ml || null,
      data.schedule_info || null,
      data.schedule_info_ml || null
    );

    // If gallery_urls provided, associate or create media entries
    if (Array.isArray(data.gallery_urls) && data.gallery_urls.length > 0) {
      const insertMedia = db.prepare(`
        INSERT INTO media (id, event_id, cloudinary_public_id, url, thumbnail_url, media_type, sort_order)
        VALUES (?, ?, ?, ?, ?, 'photo', ?)
      `);
      data.gallery_urls.forEach((url, index) => {
        const existingMedia = db.prepare('SELECT id FROM media WHERE url = ?').get(url);
        if (existingMedia) {
          db.prepare('UPDATE media SET event_id = ?, sort_order = ? WHERE id = ?').run(id, index, existingMedia.id);
        } else {
          insertMedia.run(generateId(), id, `manual_${Date.now()}_${index}`, url, url, index);
        }
      });
    }
    
    const newEvent = db.prepare('SELECT * FROM events WHERE id = ?').get(id);
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

// PUT /api/admin/events/:id — Update event
router.put('/events/:id', (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    
    const existing = db.prepare('SELECT * FROM events WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ error: 'Event not found' });
    }

    let slug = existing.slug;
    if (data.title && data.title !== existing.title) {
      let baseSlug = generateSlug(data.title);
      slug = baseSlug;
      let counter = 1;
      while (true) {
        const found = db.prepare('SELECT id FROM events WHERE slug = ? AND id != ?').get(slug, id);
        if (!found) break;
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    let startDate = data.start_date || existing.start_date;
    if (data.start_date && data.start_time && !data.start_date.includes('T')) {
      startDate = `${data.start_date}T${data.start_time}:00`;
    }
    let endDate = data.end_date !== undefined ? data.end_date : existing.end_date;
    if (data.end_date && data.end_time && !data.end_date.includes('T')) {
      endDate = `${data.end_date}T${data.end_time}:00`;
    }

    let mapUrl = existing.map_url;
    if (data.map_url !== undefined) {
      if (data.map_url && data.map_url.trim()) {
        const mapValidation = validateGoogleMapsUrl(data.map_url);
        if (!mapValidation.valid) {
          return res.status(400).json({ error: mapValidation.error });
        }
        mapUrl = mapValidation.sanitized;
      } else {
        mapUrl = null;
      }
    }
    
    const stmt = db.prepare(`
      UPDATE events SET
        slug = ?, title = ?, title_ml = ?, short_description = ?, short_description_ml = ?,
        full_description = ?, full_description_ml = ?, start_date = ?, end_date = ?,
        venue = ?, venue_ml = ?, location = ?, location_ml = ?, map_url = ?, category = ?,
        poster_url = ?, poster_public_id = ?, published = ?, snapshare_enabled = ?,
        registration_url = ?, additional_info = ?, additional_info_ml = ?,
        schedule_info = ?, schedule_info_ml = ?, updated_at = datetime('now')
      WHERE id = ?
    `);
    
    stmt.run(
      slug,
      data.title || existing.title,
      data.title_ml !== undefined ? data.title_ml : existing.title_ml,
      data.short_description !== undefined ? data.short_description : existing.short_description,
      data.short_description_ml !== undefined ? data.short_description_ml : existing.short_description_ml,
      data.full_description !== undefined ? data.full_description : existing.full_description,
      data.full_description_ml !== undefined ? data.full_description_ml : existing.full_description_ml,
      startDate,
      endDate,
      data.venue !== undefined ? data.venue : existing.venue,
      data.venue_ml !== undefined ? data.venue_ml : existing.venue_ml,
      data.location !== undefined ? data.location : existing.location,
      data.location_ml !== undefined ? data.location_ml : existing.location_ml,
      mapUrl,
      data.category || existing.category,
      data.poster_url !== undefined ? data.poster_url : existing.poster_url,
      data.poster_public_id !== undefined ? data.poster_public_id : existing.poster_public_id,
      data.published !== undefined ? (data.published ? 1 : 0) : existing.published,
      data.snapshare_enabled !== undefined ? (data.snapshare_enabled ? 1 : 0) : existing.snapshare_enabled,
      data.registration_url !== undefined ? data.registration_url : existing.registration_url,
      data.additional_info !== undefined ? data.additional_info : existing.additional_info,
      data.additional_info_ml !== undefined ? data.additional_info_ml : existing.additional_info_ml,
      data.schedule_info !== undefined ? data.schedule_info : existing.schedule_info,
      data.schedule_info_ml !== undefined ? data.schedule_info_ml : existing.schedule_info_ml,
      id
    );

    // Sync gallery images
    if (Array.isArray(data.gallery_urls)) {
      const insertMedia = db.prepare(`
        INSERT INTO media (id, event_id, cloudinary_public_id, url, thumbnail_url, media_type, sort_order)
        VALUES (?, ?, ?, ?, ?, 'photo', ?)
      `);
      data.gallery_urls.forEach((url, index) => {
        const existingMedia = db.prepare('SELECT id FROM media WHERE url = ?').get(url);
        if (existingMedia) {
          db.prepare('UPDATE media SET event_id = ?, sort_order = ? WHERE id = ?').run(id, index, existingMedia.id);
        } else {
          insertMedia.run(generateId(), id, `manual_${Date.now()}_${index}`, url, url, index);
        }
      });
    }
    
    const updatedEvent = db.prepare('SELECT * FROM events WHERE id = ?').get(id);
    res.json(updatedEvent);
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/admin/events/:id — Delete event
router.delete('/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const event = db.prepare('SELECT poster_public_id FROM events WHERE id = ?').get(id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    
    if (event.poster_public_id) {
      try {
        await cloudinary.deleteImage(event.poster_public_id);
      } catch (e) {
        console.error('Failed to delete poster from cloudinary', e);
      }
    }
    
    // Delete associated media items
    const mediaList = db.prepare('SELECT cloudinary_public_id FROM media WHERE event_id = ?').all(id);
    for (const m of mediaList) {
      try {
        await cloudinary.deleteImage(m.cloudinary_public_id);
      } catch (e) {
        console.error('Failed to delete media image', e);
      }
    }
    db.prepare('DELETE FROM media WHERE event_id = ?').run(id);

    db.prepare('DELETE FROM events WHERE id = ?').run(id);
    res.json({ success: true });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/admin/events/:id/publish — Publish
router.post('/events/:id/publish', (req, res) => {
  try {
    const result = db.prepare("UPDATE events SET published = 1, updated_at = datetime('now') WHERE id = ?").run(req.params.id);
    if (result.changes === 0) return res.status(404).json({ error: 'Event not found' });
    res.json({ success: true });
  } catch (error) {
    console.error('Publish error:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

// POST /api/admin/events/:id/unpublish — Unpublish
router.post('/events/:id/unpublish', (req, res) => {
  try {
    const result = db.prepare("UPDATE events SET published = 0, updated_at = datetime('now') WHERE id = ?").run(req.params.id);
    if (result.changes === 0) return res.status(404).json({ error: 'Event not found' });
    res.json({ success: true });
  } catch (error) {
    console.error('Unpublish error:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

// Helper to format media database record into consistent API data model
function formatMediaItem(m) {
  const isVideo = m.resource_type === 'video' || m.media_type === 'video';
  return {
    id: m.id,
    type: isVideo ? 'video' : 'image',
    media_type: isVideo ? 'video' : (m.media_type || 'photo'),
    resource_type: m.resource_type || (isVideo ? 'video' : 'image'),
    title: m.title || m.caption || '',
    caption: m.caption || m.title || '',
    description: m.description || m.caption_ml || '',
    caption_ml: m.caption_ml || m.description || '',
    secureUrl: m.url,
    url: m.url,
    publicId: m.cloudinary_public_id,
    cloudinary_public_id: m.cloudinary_public_id,
    thumbnailUrl: m.thumbnail_url || m.url,
    thumbnail_url: m.thumbnail_url || m.url,
    width: m.width || null,
    height: m.height || null,
    duration: m.duration || null,
    eventId: m.event_id || null,
    event_id: m.event_id || null,
    event_title: m.event_title || null,
    event_slug: m.event_slug || null,
    published: m.published !== undefined ? Boolean(m.published) : true,
    published_num: m.published !== undefined ? m.published : 1,
    sort_order: m.sort_order || 0,
    createdAt: m.created_at,
    created_at: m.created_at,
    updatedAt: m.updated_at || m.created_at,
    updated_at: m.updated_at || m.created_at
  };
}

// GET /api/admin/media — List media with type, event, and status filters
router.get('/media', (req, res) => {
  try {
    const { eventId, type, status, search } = req.query;
    let query = `
      SELECT m.*, e.title as event_title, e.slug as event_slug
      FROM media m 
      LEFT JOIN events e ON m.event_id = e.id
      WHERE m.cloudinary_public_id NOT LIKE 'balasangham/leadership/%'
    `;
    let params = [];

    // Filter by Event
    if (eventId === 'none' || eventId === 'unassociated') {
      query += ' AND m.event_id IS NULL';
    } else if (eventId && eventId !== 'all') {
      query += ' AND m.event_id = ?';
      params.push(eventId);
    }

    // Filter by Type (image vs video)
    if (type === 'image' || type === 'photo') {
      query += " AND (m.resource_type = 'image' OR m.media_type != 'video')";
    } else if (type === 'video') {
      query += " AND (m.resource_type = 'video' OR m.media_type = 'video')";
    }

    // Filter by Published status
    if (status === 'published') {
      query += ' AND (m.published = 1 OR m.published IS NULL)';
    } else if (status === 'draft') {
      query += ' AND m.published = 0';
    }

    // Search query
    if (search && search.trim()) {
      query += ' AND (m.title LIKE ? OR m.caption LIKE ? OR m.description LIKE ?)';
      const s = `%${search.trim()}%`;
      params.push(s, s, s);
    }

    query += ' ORDER BY m.created_at DESC, m.sort_order ASC';
    const mediaRows = db.prepare(query).all(...params);
    res.json(mediaRows.map(formatMediaItem));
  } catch (error) {
    console.error('Fetch media error:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

// GET /api/admin/media/:id — Get single media item
router.get('/media/:id', (req, res) => {
  try {
    const m = db.prepare(`
      SELECT m.*, e.title as event_title, e.slug as event_slug
      FROM media m 
      LEFT JOIN events e ON m.event_id = e.id
      WHERE m.id = ? AND m.cloudinary_public_id NOT LIKE 'balasangham/leadership/%'
    `).get(req.params.id);

    if (!m) return res.status(404).json({ error: 'Media not found' });
    res.json(formatMediaItem(m));
  } catch (error) {
    console.error('Fetch media item error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/admin/media/upload — Dedicated upload endpoint for images and videos
router.post('/media/upload', async (req, res) => {
  const uploadedFiles = req.files && req.files.length > 0
    ? req.files
    : (req.file ? [req.file] : []);

  if (uploadedFiles.length === 0) {
    return res.status(400).json({ error: 'No media file provided' });
  }

  try {
    const { title, description, eventId, published } = req.body;
    const finalEventId = (eventId && eventId !== 'none' && eventId !== 'null' && eventId !== '') ? eventId : null;
    const isPublished = published !== undefined ? (published === 'true' || published === true || published === 1 || published === '1' ? 1 : 0) : 1;

    const createdItems = [];

    for (const file of uploadedFiles) {
      const ext = path.extname(file.originalname).toLowerCase();
      const isVideo = ['.mp4', '.webm', '.mov', '.mkv'].includes(ext) || file.mimetype.startsWith('video/');
      const resourceType = isVideo ? 'video' : 'image';
      const targetFolder = isVideo ? 'balasangham/media/videos' : 'balasangham/media/images';

      const uploadResult = await cloudinary.uploadMedia(file.path, {
        folder: targetFolder,
        resourceType: resourceType
      });

      const mediaId = generateId();
      const fileTitle = title && uploadedFiles.length === 1 
        ? title 
        : path.basename(file.originalname, ext).replace(/[-_]/g, ' ');

      const insertStmt = db.prepare(`
        INSERT INTO media (
          id, event_id, cloudinary_public_id, url, thumbnail_url,
          width, height, format, resource_type,
          title, description, caption, caption_ml,
          media_type, duration, published, sort_order, created_at, updated_at
        ) VALUES (
          ?, ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, 0, datetime('now'), datetime('now')
        )
      `);

      insertStmt.run(
        mediaId,
        finalEventId,
        uploadResult.public_id,
        uploadResult.secure_url,
        uploadResult.thumbnail_url || uploadResult.secure_url,
        uploadResult.width || null,
        uploadResult.height || null,
        uploadResult.format || (isVideo ? 'mp4' : 'jpg'),
        resourceType,
        fileTitle,
        description || null,
        fileTitle,
        description || null,
        resourceType === 'video' ? 'video' : 'photo',
        uploadResult.duration || null,
        isPublished
      );

      const insertedRow = db.prepare(`
        SELECT m.*, e.title as event_title, e.slug as event_slug
        FROM media m
        LEFT JOIN events e ON m.event_id = e.id
        WHERE m.id = ?
      `).get(mediaId);

      createdItems.push(formatMediaItem(insertedRow));
    }

    if (createdItems.length === 1) {
      res.status(201).json(createdItems[0]);
    } else {
      res.status(201).json(createdItems);
    }
  } catch (error) {
    console.error('Media upload error:', error);
    res.status(500).json({ error: 'Media upload failed: ' + error.message });
  }
});

// POST /api/admin/upload — Backward compatible endpoint for Event Editor poster & gallery uploads
router.post('/upload', async (req, res) => {
  const uploadedFile = req.file || (req.files && (req.files[0] || req.files.file?.[0] || req.files.image?.[0]));
  
  if (!uploadedFile) {
    return res.status(400).json({ error: 'No file provided' });
  }
  
  try {
    const ext = path.extname(uploadedFile.originalname).toLowerCase();
    const isVideo = ['.mp4', '.webm', '.mov', '.mkv'].includes(ext) || uploadedFile.mimetype.startsWith('video/');
    const folder = isVideo ? 'balasangham/media/videos' : 'balasangham/events';
    const result = await cloudinary.uploadMedia(uploadedFile.path, {
      folder,
      resourceType: isVideo ? 'video' : 'image'
    });

    const eventId = req.body.eventId || null;
    let mediaRecord = null;

    if (eventId) {
      const mediaId = generateId();
      const insertStmt = db.prepare(`
        INSERT INTO media (
          id, event_id, cloudinary_public_id, url, thumbnail_url,
          width, height, format, resource_type,
          title, description, caption, caption_ml,
          media_type, published, sort_order
        ) VALUES (
          ?, ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, 1, 0
        )
      `);
      insertStmt.run(
        mediaId,
        eventId,
        result.public_id,
        result.secure_url,
        result.thumbnail_url || result.secure_url,
        result.width || 1200,
        result.height || 800,
        result.format || 'jpg',
        result.resource_type || 'image',
        req.body.title || null,
        req.body.description || null,
        req.body.title || null,
        req.body.description || null,
        result.resource_type === 'video' ? 'video' : 'photo'
      );
      
      const event = db.prepare('SELECT title, slug FROM events WHERE id = ?').get(eventId);
      mediaRecord = {
        id: mediaId,
        event_id: eventId,
        eventId: eventId,
        event_title: event?.title || '',
        url: result.secure_url,
        secureUrl: result.secure_url,
        thumbnail_url: result.thumbnail_url || result.secure_url,
        thumbnailUrl: result.thumbnail_url || result.secure_url,
        public_id: result.public_id,
        publicId: result.public_id
      };
    }

    res.json(mediaRecord || {
      url: result.secure_url,
      secureUrl: result.secure_url,
      public_id: result.public_id,
      publicId: result.public_id,
      thumbnailUrl: result.thumbnail_url || result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed: ' + error.message });
  }
});

// PUT /api/admin/media/:id — Update media metadata (Title, Description, Event, Published)
router.put('/media/:id', (req, res) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT * FROM media WHERE id = ?').get(id);

    if (!existing) {
      return res.status(404).json({ error: 'Media item not found' });
    }

    if (existing.cloudinary_public_id && existing.cloudinary_public_id.startsWith('balasangham/leadership/')) {
      return res.status(403).json({ error: 'Leadership profile photos cannot be modified via media management.' });
    }

    const { title, description, published, eventId, event_id } = req.body;
    const finalEventId = (eventId !== undefined ? eventId : event_id) !== undefined
      ? ((eventId || event_id) === 'none' || !(eventId || event_id) ? null : (eventId || event_id))
      : existing.event_id;

    const finalPublished = published !== undefined
      ? (published === true || published === 1 || published === '1' ? 1 : 0)
      : (existing.published !== undefined ? existing.published : 1);

    const finalTitle = title !== undefined ? title : (existing.title || existing.caption);
    const finalDesc = description !== undefined ? description : (existing.description || existing.caption_ml);

    const updateStmt = db.prepare(`
      UPDATE media SET
        title = ?,
        caption = ?,
        description = ?,
        caption_ml = ?,
        event_id = ?,
        published = ?,
        updated_at = datetime('now')
      WHERE id = ?
    `);

    updateStmt.run(
      finalTitle,
      finalTitle,
      finalDesc,
      finalDesc,
      finalEventId,
      finalPublished,
      id
    );

    const updatedRow = db.prepare(`
      SELECT m.*, e.title as event_title, e.slug as event_slug
      FROM media m
      LEFT JOIN events e ON m.event_id = e.id
      WHERE m.id = ?
    `).get(id);

    res.json(formatMediaItem(updatedRow));
  } catch (error) {
    console.error('Update media error:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

// POST /api/admin/media/:id/publish — Publish media
router.post('/media/:id/publish', (req, res) => {
  try {
    const result = db.prepare('UPDATE media SET published = 1, updated_at = datetime("now") WHERE id = ?').run(req.params.id);
    if (result.changes === 0) return res.status(404).json({ error: 'Media not found' });
    res.json({ success: true, published: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/admin/media/:id/unpublish — Unpublish media
router.post('/media/:id/unpublish', (req, res) => {
  try {
    const result = db.prepare('UPDATE media SET published = 0, updated_at = datetime("now") WHERE id = ?').run(req.params.id);
    if (result.changes === 0) return res.status(404).json({ error: 'Media not found' });
    res.json({ success: true, published: false });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/admin/media/:id — Delete media from DB and Cloudinary
router.delete('/media/:id', async (req, res) => {
  try {
    const media = db.prepare('SELECT * FROM media WHERE id = ?').get(req.params.id);
    if (!media) return res.status(404).json({ error: 'Media not found' });

    // Safeguard leadership photos
    if (media.cloudinary_public_id && media.cloudinary_public_id.startsWith('balasangham/leadership/')) {
      return res.status(403).json({ error: 'Leadership profile photos cannot be deleted from media management.' });
    }

    try {
      await cloudinary.deleteMedia(media.cloudinary_public_id, media.resource_type || media.media_type);
    } catch (e) {
      console.warn('Could not delete Cloudinary asset (proceeding with DB deletion):', e.message);
    }

    db.prepare('DELETE FROM media WHERE id = ?').run(req.params.id);
    res.json({ success: true, id: req.params.id });
  } catch (error) {
    console.error('Delete media error:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

// POST /api/admin/media/import-local — Import photos and videos from local media folder
router.post('/media/import-local', async (req, res) => {
  const localMediaDir = path.join(__dirname, '..', '..', 'media');
  if (!fs.existsSync(localMediaDir)) {
    return res.status(404).json({ error: 'Local media directory not found at: ' + localMediaDir });
  }

  try {
    const imported = [];
    const filesToImport = [];

    function scanDir(dir) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          scanDir(fullPath);
        } else {
          const ext = path.extname(entry.name).toLowerCase();
          if (['.jpg', '.jpeg', '.png', '.webp', '.mp4', '.webm'].includes(ext)) {
            filesToImport.push({
              filePath: fullPath,
              filename: entry.name,
              ext: ext,
              size: fs.statSync(fullPath).size
            });
          }
        }
      }
    }

    scanDir(localMediaDir);

    // Filter duplicates by base filename or content
    const uniqueFiles = [];
    const seenNames = new Set();
    for (const f of filesToImport) {
      const cleanName = f.filename.replace(/\s\(\d+\)/, '');
      if (!seenNames.has(cleanName)) {
        seenNames.add(cleanName);
        uniqueFiles.push(f);
      }
    }

    // Import each file if not already in DB
    for (const item of uniqueFiles) {
      const isVideo = ['.mp4', '.webm'].includes(item.ext);
      const title = path.basename(item.filename, item.ext).replace(/[-_]/g, ' ');

      // Check if already imported by checking title or format
      const existing = db.prepare('SELECT id FROM media WHERE title = ?').get(title);
      if (existing) continue;

      const uploadResult = await cloudinary.uploadMedia(item.filePath, {
        folder: isVideo ? 'balasangham/media/videos' : 'balasangham/media/images',
        resourceType: isVideo ? 'video' : 'image'
      });

      const mediaId = generateId();
      db.prepare(`
        INSERT INTO media (
          id, event_id, cloudinary_public_id, url, thumbnail_url,
          width, height, format, resource_type,
          title, description, caption, caption_ml,
          media_type, duration, published, sort_order, created_at, updated_at
        ) VALUES (
          ?, NULL, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, 1, 0, datetime('now'), datetime('now')
        )
      `).run(
        mediaId,
        uploadResult.public_id,
        uploadResult.secure_url,
        uploadResult.thumbnail_url || uploadResult.secure_url,
        uploadResult.width || null,
        uploadResult.height || null,
        uploadResult.format || (isVideo ? 'mp4' : 'jpg'),
        isVideo ? 'video' : 'image',
        title,
        title,
        title,
        title,
        isVideo ? 'video' : 'photo',
        uploadResult.duration || null
      );

      imported.push({ id: mediaId, title, url: uploadResult.secure_url });
    }

    res.json({
      success: true,
      message: `Successfully processed local media. Imported ${imported.length} new items.`,
      importedCount: imported.length,
      imported
    });
  } catch (error) {
    console.error('Local media import error:', error);
    res.status(500).json({ error: 'Import failed: ' + error.message });
  }
});

module.exports = router;

