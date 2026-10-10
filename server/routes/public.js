const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/public/events — List published events
router.get('/events', (req, res) => {
  try {
    const events = db.prepare('SELECT * FROM events WHERE published = 1 ORDER BY start_date DESC').all();
    res.json(events);
  } catch (error) {
    console.error('Error fetching public events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/public/events/latest — Get the nearest upcoming event, or most recent past event
router.get('/events/latest', (req, res) => {
  try {
    const nowIso = new Date().toISOString();
    // 1. If there is an upcoming event, show the nearest upcoming event (next chronological)
    let event = db.prepare(`
      SELECT * FROM events 
      WHERE published = 1 AND (start_date >= ? OR (end_date IS NOT NULL AND end_date >= ?))
      ORDER BY start_date ASC 
      LIMIT 1
    `).get(nowIso, nowIso);

    // 2. If no upcoming events, show the most recently completed event
    if (!event) {
      event = db.prepare(`
        SELECT * FROM events 
        WHERE published = 1 
        ORDER BY start_date DESC 
        LIMIT 1
      `).get();
    }

    if (!event) {
      return res.status(404).json({ error: 'No published events found' });
    }

    const media = db.prepare('SELECT * FROM media WHERE event_id = ? ORDER BY sort_order ASC, created_at DESC').all(event.id);
    
    // Return both top-level and event property for maximum client compatibility
    res.json({
      ...event,
      event: { ...event, media },
      media
    });
  } catch (error) {
    console.error('Error fetching latest event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/public/events/:slug — Get single event by slug with its media
router.get('/events/:slug', (req, res) => {
  try {
    const event = db.prepare('SELECT * FROM events WHERE slug = ? AND published = 1').get(req.params.slug);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    const media = db.prepare('SELECT * FROM media WHERE event_id = ? ORDER BY sort_order ASC, created_at DESC').all(event.id);
    res.json({
      ...event,
      event: { ...event, media },
      media
    });
  } catch (error) {
    console.error('Error fetching event by slug:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/public/events/:slug/snapshare — Get SnapShare media for event
router.get('/events/:slug/snapshare', (req, res) => {
  try {
    const event = db.prepare('SELECT id, slug, title, title_ml, start_date, poster_url, snapshare_enabled FROM events WHERE slug = ? AND published = 1').get(req.params.slug);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    if (!event.snapshare_enabled) {
      return res.status(403).json({ error: 'SnapShare is disabled for this event' });
    }
    
    // Return all media associated with the event for the SnapShare gallery
    const media = db.prepare('SELECT * FROM media WHERE event_id = ? ORDER BY sort_order ASC, created_at DESC').all(event.id);
    
    res.json({
      event,
      media
    });
  } catch (error) {
    console.error('Error fetching snapshare media:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Helper to format public media items
function formatPublicMedia(m) {
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
    event_title_ml: m.event_title_ml || null,
    event_slug: m.event_slug || null,
    published: true,
    createdAt: m.created_at,
    created_at: m.created_at
  };
}

// GET /api/public/media — Get all published media items (images and videos)
router.get('/media', (req, res) => {
  try {
    const { type, eventId, grouped } = req.query;
    let query = `
      SELECT m.*, e.title as event_title, e.title_ml as event_title_ml, e.slug as event_slug, e.start_date as event_date
      FROM media m 
      LEFT JOIN events e ON m.event_id = e.id 
      WHERE (m.published = 1 OR m.published IS NULL)
        AND (m.event_id IS NULL OR e.published = 1 OR e.published IS NULL)
        AND m.cloudinary_public_id NOT LIKE 'balasangham/leadership/%'
    `;
    let params = [];

    if (type === 'image' || type === 'photo') {
      query += " AND (m.resource_type = 'image' OR m.media_type != 'video')";
    } else if (type === 'video') {
      query += " AND (m.resource_type = 'video' OR m.media_type = 'video')";
    }

    if (eventId && eventId !== 'all') {
      query += " AND m.event_id = ?";
      params.push(eventId);
    }

    query += ' ORDER BY m.created_at DESC, m.sort_order ASC';
    const media = db.prepare(query).all(...params);

    if (grouped === 'true' || grouped === '1') {
      // Group by event for backward compatibility
      const eventGroups = media.filter(m => m.event_id).reduce((acc, item) => {
        const eventKey = item.event_id;
        if (!acc[eventKey]) {
          acc[eventKey] = {
            event_id: item.event_id,
            event_title: item.event_title,
            event_title_ml: item.event_title_ml,
            event_slug: item.event_slug,
            event_date: item.event_date,
            items: []
          };
        }
        acc[eventKey].items.push(formatPublicMedia(item));
        return acc;
      }, {});
      return res.json(Object.values(eventGroups));
    }
    
    res.json(media.map(formatPublicMedia));
  } catch (error) {
    console.error('Error fetching public media:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
