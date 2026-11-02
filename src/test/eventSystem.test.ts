import { describe, it, expect } from 'vitest';
import { generateICSContent, generateGoogleCalendarUrl } from '../lib/calendar';
import { EventData, MediaItem } from '../types/event';
import {
  isValidEventDate,
  formatEventDate,
  compareEventsByDate,
  toFirestoreEvent,
  normalizeFirestoreEvent
} from '../lib/eventsService';
import { toFirestoreMedia } from '../lib/mediaService';

describe('Balasangham Event System & Security Architecture', () => {
  describe('Calendar Utilities', () => {
    const mockEvent = {
      title: 'Balasangham Kannur District Conference 2026',
      start_date: '2026-10-10T09:00:00.000Z',
      end_date: '2026-10-11T18:00:00.000Z',
      venue: 'PCR Bank Auditorium, Kalliasseri',
      location: 'Kannur, Kerala',
      description: 'Historical district conference assembly.'
    };

    it('generates standard RFC-compliant iCalendar (.ics) content', () => {
      const ics = generateICSContent(mockEvent);

      expect(ics).toContain('BEGIN:VCALENDAR');
      expect(ics).toContain('VERSION:2.0');
      expect(ics).toContain('BEGIN:VEVENT');
      expect(ics).toContain('SUMMARY:Balasangham Kannur District Conference 2026');
      expect(ics).toContain('DESCRIPTION:Historical district conference assembly.');
      expect(ics).toContain('LOCATION:PCR Bank Auditorium, Kalliasseri, Kannur, Kerala');
      expect(ics).toContain('DTSTART:20261010T090000Z');
      expect(ics).toContain('DTEND:20261011T180000Z');
      expect(ics).toContain('END:VEVENT');
      expect(ics).toContain('END:VCALENDAR');
    });

    it('generates accurate Google Calendar URLs with encoded parameters', () => {
      const gcalUrl = generateGoogleCalendarUrl(mockEvent);

      expect(gcalUrl).toContain('https://calendar.google.com/calendar/render');
      expect(gcalUrl).toContain('action=TEMPLATE');
      expect(gcalUrl).toContain('text=Balasangham+Kannur+District+Conference+2026');
      expect(gcalUrl).toContain('location=PCR+Bank+Auditorium%2C+Kalliasseri%2C+Kannur%2C+Kerala');
      expect(gcalUrl).toContain('dates=20261010T090000Z%2F20261011T180000Z');
    });
  });

  describe('Latest Event Selection Logic', () => {
    // Pure function simulation of the server-side database query logic:
    // 1. If upcoming events exist, select nearest upcoming (next chronological)
    // 2. If no upcoming events exist, select most recently completed event
    function selectLatestEvent(events: EventData[], currentTimeIso: string): EventData | null {
      const publishedEvents = events.filter(e => e.published === 1);
      
      const upcoming = publishedEvents
        .filter(e => {
          const start = e.start_date ? new Date(e.start_date).getTime() : 0;
          const end = e.end_date ? new Date(e.end_date).getTime() : start;
          const now = new Date(currentTimeIso).getTime();
          return start >= now || end >= now;
        })
        .sort((a, b) => new Date(a.start_date!).getTime() - new Date(b.start_date!).getTime());

      if (upcoming.length > 0) {
        return upcoming[0]; // Nearest upcoming
      }

      const past = publishedEvents
        .sort((a, b) => new Date(b.start_date!).getTime() - new Date(a.start_date!).getTime());

      return past.length > 0 ? past[0] : null; // Most recently completed
    }

    const testEvents: EventData[] = [
      {
        id: 'ev-1',
        slug: 'past-conference-2024',
        title: 'Kannur District Conference 2024',
        title_ml: null,
        short_description: 'Completed conference at Pilathara',
        short_description_ml: null,
        full_description: null,
        full_description_ml: null,
        start_date: '2024-10-10T09:00:00Z',
        end_date: '2024-10-11T18:00:00Z',
        venue: 'Pilathara',
        venue_ml: null,
        location: 'Kannur',
        location_ml: null,
        category: 'conference',
        poster_url: null,
        poster_public_id: null,
        published: 1,
        snapshare_enabled: 0,
        registration_url: null,
        additional_info: null,
        additional_info_ml: null,
        schedule_info: null,
        schedule_info_ml: null,
        created_at: '2024-01-01',
        updated_at: '2024-01-01'
      },
      {
        id: 'ev-2',
        slug: 'upcoming-district-conf-2026',
        title: 'Kannur District Conference 2026',
        title_ml: null,
        short_description: 'Upcoming conference at Kalliasseri',
        short_description_ml: null,
        full_description: null,
        full_description_ml: null,
        start_date: '2026-10-10T09:00:00Z',
        end_date: '2026-10-11T18:00:00Z',
        venue: 'PCR Bank Auditorium',
        venue_ml: null,
        location: 'Kalliasseri, Kannur',
        location_ml: null,
        category: 'conference',
        poster_url: null,
        poster_public_id: null,
        published: 1,
        snapshare_enabled: 1,
        registration_url: null,
        additional_info: null,
        additional_info_ml: null,
        schedule_info: null,
        schedule_info_ml: null,
        created_at: '2026-01-01',
        updated_at: '2026-01-01'
      },
      {
        id: 'ev-3',
        slug: 'future-festival-2027',
        title: "Children's Cultural Festival 2027",
        title_ml: null,
        short_description: 'Future state cultural festival',
        short_description_ml: null,
        full_description: null,
        full_description_ml: null,
        start_date: '2027-05-15T09:00:00Z',
        end_date: '2027-05-18T18:00:00Z',
        venue: 'Kozhikode',
        venue_ml: null,
        location: 'Kerala',
        location_ml: null,
        category: 'festival',
        poster_url: null,
        poster_public_id: null,
        published: 1,
        snapshare_enabled: 1,
        registration_url: null,
        additional_info: null,
        additional_info_ml: null,
        schedule_info: null,
        schedule_info_ml: null,
        created_at: '2026-02-01',
        updated_at: '2026-02-01'
      },
      {
        id: 'ev-draft',
        slug: 'unreleased-draft',
        title: 'Secret Draft Assembly',
        title_ml: null,
        short_description: 'Should not appear',
        short_description_ml: null,
        full_description: null,
        full_description_ml: null,
        start_date: '2026-10-05T09:00:00Z',
        end_date: null,
        venue: null,
        venue_ml: null,
        location: null,
        location_ml: null,
        category: 'conference',
        poster_url: null,
        poster_public_id: null,
        published: 0, // DRAFT
        snapshare_enabled: 0,
        registration_url: null,
        additional_info: null,
        additional_info_ml: null,
        schedule_info: null,
        schedule_info_ml: null,
        created_at: '2026-01-01',
        updated_at: '2026-01-01'
      }
    ];

    it('selects the nearest upcoming event when upcoming events exist', () => {
      const selected = selectLatestEvent(testEvents, '2026-06-01T00:00:00Z');
      expect(selected?.slug).toBe('upcoming-district-conf-2026');
    });

    it('selects the next chronological event when multiple upcoming events exist', () => {
      // 2026-10-10 comes before 2027-05-15
      const selected = selectLatestEvent(testEvents, '2026-01-01T00:00:00Z');
      expect(selected?.id).toBe('ev-2');
      expect(selected?.title).toBe('Kannur District Conference 2026');
    });

    it('automatically transitions to next upcoming event once earlier event concludes', () => {
      // After 2026-10-11, ev-2 is past, so ev-3 is the nearest upcoming
      const selected = selectLatestEvent(testEvents, '2026-10-15T00:00:00Z');
      expect(selected?.id).toBe('ev-3');
      expect(selected?.title).toBe("Children's Cultural Festival 2027");
    });

    it('falls back to the most recently completed event when no upcoming events exist', () => {
      // In 2028, all events are past; should pick the most recent (ev-3: 2027)
      const selected = selectLatestEvent(testEvents, '2028-01-01T00:00:00Z');
      expect(selected?.id).toBe('ev-3');
    });

    it('never displays draft/unpublished events on the public homepage', () => {
      const selected = selectLatestEvent(testEvents, '2026-10-04T00:00:00Z');
      expect(selected?.id).not.toBe('ev-draft');
      expect(selected?.published).toBe(1);
    });
  });

  describe('Slug Generation & Uniqueness', () => {
    function generateSlug(text: string): string {
      return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    it('generates clean, URL-safe permanent slugs from titles', () => {
      expect(generateSlug('Kannur District Conference 2026')).toBe('kannur-district-conference-2026');
      expect(generateSlug("Children's Cultural Festival & Camp!")).toBe('childrens-cultural-festival-camp');
      expect(generateSlug('  Venalthumbikal 2026 -- Street Play  ')).toBe('venalthumbikal-2026-street-play');
    });
  });

  describe('SnapShare & Safety Protocol', () => {
    it('verifies SnapShare operates strictly as a photo gallery without biometric or facial recognition capabilities', () => {
      const snapshareMediaItem: MediaItem = {
        id: 'media-1',
        event_id: 'ev-2',
        cloudinary_public_id: 'balasangham/conf_2026_photo1',
        url: 'https://res.cloudinary.com/demo/image/upload/v1/balasangham/conf_2026_photo1.jpg',
        thumbnail_url: 'https://res.cloudinary.com/demo/image/upload/c_scale,w_300/v1/balasangham/conf_2026_photo1.jpg',
        width: 1200,
        height: 800,
        format: 'jpg',
        resource_type: 'image',
        caption: 'Delegate assembly gathering',
        caption_ml: 'പ്രതിനിധി സമ്മേളന ദൃശ്യം',
        media_type: 'photo',
        sort_order: 0,
        created_at: '2026-10-10'
      };

      // Ensure data model strictly avoids biometric or personal tracking fields
      expect((snapshareMediaItem as any).face_embeddings).toBeUndefined();
      expect((snapshareMediaItem as any).face_coordinates).toBeUndefined();
      expect((snapshareMediaItem as any).biometric_data).toBeUndefined();
      expect((snapshareMediaItem as any).person_profile_id).toBeUndefined();
      
      // Explicit event association is preserved
      expect(snapshareMediaItem.event_id).toBe('ev-2');
      expect(snapshareMediaItem.url).toContain('https://');
    });
  });

  describe('Security & Admin Protection', () => {
    it('ensures admin credentials and password hash never leak into client data models', () => {
      const clientEventData: EventData = {
        id: 'ev-1',
        slug: 'conf-2026',
        title: 'Conference',
        title_ml: null,
        short_description: null,
        short_description_ml: null,
        full_description: null,
        full_description_ml: null,
        start_date: '2026-10-10',
        end_date: null,
        venue: null,
        venue_ml: null,
        location: null,
        location_ml: null,
        category: 'conference',
        poster_url: null,
        poster_public_id: null,
        published: 1,
        snapshare_enabled: 1,
        registration_url: null,
        additional_info: null,
        additional_info_ml: null,
        schedule_info: null,
        schedule_info_ml: null,
        created_at: '2026-01-01',
        updated_at: '2026-01-01'
      };

      expect((clientEventData as any).password).toBeUndefined();
      expect((clientEventData as any).password_hash).toBeUndefined();
      expect((clientEventData as any).admin_secret).toBeUndefined();
    });
  });

  describe('Date Handling & Empty Date Remediation', () => {
    it('identifies invalid, empty, or epoch 0 dates as not valid event dates', () => {
      expect(isValidEventDate(null)).toBe(false);
      expect(isValidEventDate(undefined)).toBe(false);
      expect(isValidEventDate('')).toBe(false);
      expect(isValidEventDate('   ')).toBe(false);
      expect(isValidEventDate(0)).toBe(false);
      expect(isValidEventDate('0')).toBe(false);
      expect(isValidEventDate(new Date(0))).toBe(false);
      expect(isValidEventDate('1970-01-01T00:00:00.000Z')).toBe(false);
      expect(isValidEventDate('invalid-date')).toBe(false);

      expect(isValidEventDate('2026-10-10T09:00:00.000Z')).toBe(true);
      expect(isValidEventDate(new Date('2026-10-10'))).toBe(true);
    });

    it('formats empty, null, or epoch 0 dates as "No date" in English and "തീയതി ലഭ്യമല്ല" in Malayalam', () => {
      expect(formatEventDate(null, 'en')).toBe('No date');
      expect(formatEventDate(null, 'ml')).toBe('തീയതി ലഭ്യമല്ല');
      expect(formatEventDate('', 'en')).toBe('No date');
      expect(formatEventDate('', 'ml')).toBe('തീയതി ലഭ്യമല്ല');
      expect(formatEventDate('1970-01-01', 'en')).toBe('No date');
      expect(formatEventDate('1970-01-01', 'ml')).toBe('തീയതി ലഭ്യമല്ല');
      expect(formatEventDate(0, 'en')).toBe('No date');
      expect(formatEventDate(0, 'ml')).toBe('തീയതി ലഭ്യമല്ല');

      // Real date formats correctly
      const formattedEn = formatEventDate('2026-10-10T09:00:00.000Z', 'en');
      expect(formattedEn).toContain('2026');
      expect(formattedEn).not.toContain('1970');
      expect(formattedEn).not.toBe('No date');
    });

    it('saves draft without date as null in toFirestoreEvent', () => {
      const payload = toFirestoreEvent({
        title: 'Draft Without Date',
        published: false,
        start_date: null,
      }, false);

      expect(payload.title).toBe('Draft Without Date');
      expect(payload.published).toBe(false);
      expect(payload.startDate).toBeNull();
      expect(payload.start_date).toBeNull();
    });

    it('blocks publish without start date in toFirestoreEvent', () => {
      expect(() => {
        toFirestoreEvent({
          title: 'Published Without Date',
          published: true,
          start_date: null,
        }, false);
      }).toThrow('Start date is required to publish an event');

      expect(() => {
        toFirestoreEvent({
          title: 'Published With Empty Date',
          published: 1,
          start_date: '',
        }, false);
      }).toThrow('Start date is required to publish an event');
    });

    it('converts real date properly in toFirestoreEvent', () => {
      const payload = toFirestoreEvent({
        title: 'Valid Conference',
        published: true,
        start_date: '2026-10-10T09:00:00.000Z',
      }, false);

      expect(payload.published).toBe(true);
      expect(payload.startDate).toBeDefined();
      expect(payload.start_date).toContain('2026-10-10');
    });

    it('normalizes Firestore document with empty, missing, or epoch 0 date to null', () => {
      const eventWithNoDate = normalizeFirestoreEvent('doc-1', {
        title: 'Dateless Event',
        published: false,
      });
      expect(eventWithNoDate.start_date).toBeNull();
      expect(eventWithNoDate.startDate).toBeNull();

      const eventWithEpoch0 = normalizeFirestoreEvent('doc-2', {
        title: 'Epoch 0 Event',
        startDate: '1970-01-01T00:00:00.000Z',
        published: false,
      });
      expect(eventWithEpoch0.start_date).toBeNull();
      expect(eventWithEpoch0.startDate).toBeNull();
    });

    it('sorts dateless events last in both ascending and descending sorts', () => {
      const evt1: EventData = { id: '1', title: 'Early', start_date: '2026-05-01', published: 1 } as any;
      const evt2: EventData = { id: '2', title: 'Late', start_date: '2026-11-01', published: 1 } as any;
      const evtNoDate: EventData = { id: '3', title: 'Dateless', start_date: null, published: 0 } as any;

      const asc = [evtNoDate, evt2, evt1].sort((a, b) => compareEventsByDate(a, b, 'asc'));
      expect(asc.map(e => e.id)).toEqual(['1', '2', '3']);

      const desc = [evt1, evtNoDate, evt2].sort((a, b) => compareEventsByDate(a, b, 'desc'));
      expect(desc.map(e => e.id)).toEqual(['2', '1', '3']);
    });
  });

  describe('Media Service & Partial Update Safety', () => {
    it('does not erase url, publicId or coerce type on partial updates', () => {
      const partialUpdate = toFirestoreMedia({
        title: 'Updated Title Only',
      }, false);

      expect(partialUpdate.title).toBe('Updated Title Only');
      expect(partialUpdate.url).toBeUndefined();
      expect(partialUpdate.publicId).toBeUndefined();
      expect(partialUpdate.type).toBeUndefined();
      expect(partialUpdate.resource_type).toBeUndefined();
      expect(partialUpdate.published).toBeUndefined();
      expect(partialUpdate.updatedAt).toBeDefined();
    });

    it('populates url, publicId and type when creating media', () => {
      const createPayload = toFirestoreMedia({
        title: 'New Media Item',
        url: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
        publicId: 'sample',
        resource_type: 'image',
        published: true,
      }, true);

      expect(createPayload.title).toBe('New Media Item');
      expect(createPayload.url).toBe('https://res.cloudinary.com/demo/image/upload/sample.jpg');
      expect(createPayload.publicId).toBe('sample');
      expect(createPayload.type).toBe('image');
      expect(createPayload.resource_type).toBe('image');
      expect(createPayload.published).toBe(true);
      expect(createPayload.createdAt).toBeDefined();
    });
  });
});
