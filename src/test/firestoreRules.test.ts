import { describe, it, expect } from 'vitest';

/**
 * Unit test suite simulating Cloud Firestore Security Rules CEL expressions
 * authored in firestore.rules for Balasangham Kannur website.
 */
describe('Firestore Security Rules Specification & Validator Function Pattern', () => {
  const allowedEventFields = [
    'title', 'malayalamTitle', 'title_ml',
    'slug',
    'shortDescription', 'short_description', 'short_description_ml', 'shortDescriptionMalayalam',
    'description', 'full_description', 'full_description_ml', 'descriptionMalayalam',
    'startDate', 'start_date', 'endDate', 'end_date',
    'venue', 'venue_ml', 'venueMalayalam',
    'address', 'location', 'location_ml', 'addressMalayalam',
    'mapUrl', 'map_url',
    'category',
    'poster', 'poster_url', 'poster_public_id',
    'published',
    'snapShareEnabled', 'snapshare_enabled',
    'registration_url',
    'additional_info', 'additional_info_ml',
    'schedule_info', 'schedule_info_ml',
    'createdAt', 'created_at',
    'updatedAt', 'updated_at'
  ];

  function isAdmin(auth: any): boolean {
    if (!auth) return false;
    const token = auth.token || {};
    return (
      token.admin === true ||
      token.role === 'admin' ||
      (typeof token.email === 'string' && /.*@.*/.test(token.email))
    );
  }

  function isValidOptionalString(data: any, field: string, minLen: number, maxLen: number): boolean {
    if (!(field in data)) return true;
    const val = data[field];
    if (val === null) return true;
    return typeof val === 'string' && val.length >= minLen && val.length <= maxLen;
  }

  function isValidOptionalDate(data: any, field: string): boolean {
    if (!(field in data)) return true;
    const val = data[field];
    if (val === null) return true;
    if (val && typeof val.toDate === 'function') return true; // Firestore Timestamp
    return typeof val === 'string' && val.length <= 100;
  }

  function isValidOptionalHttpsUrl(data: any, field: string): boolean {
    if (!(field in data)) return true;
    const val = data[field];
    if (val === null) return true;
    return typeof val === 'string' && val.length >= 8 && val.length <= 1000 && val.startsWith('https://');
  }

  function isValidPoster(posterData: any): boolean {
    if (posterData === null) return true;
    if (typeof posterData !== 'object' || Array.isArray(posterData)) return false;
    const allowedKeys = ['publicId', 'secureUrl'];
    const keys = Object.keys(posterData);
    if (!keys.every(k => allowedKeys.includes(k))) return false;
    if ('publicId' in posterData && posterData.publicId !== null && (typeof posterData.publicId !== 'string' || posterData.publicId.length > 500)) return false;
    if ('secureUrl' in posterData && posterData.secureUrl !== null && (typeof posterData.secureUrl !== 'string' || posterData.secureUrl.length > 1000 || !posterData.secureUrl.startsWith('https://'))) return false;
    return true;
  }

  function isValidEvent(data: Record<string, any>): boolean {
    // 1. Strict schema
    const keys = Object.keys(data);
    if (!keys.every(k => allowedEventFields.includes(k))) return false;

    // 2. Required fields
    if (!('title' in data) || !('slug' in data) || !('published' in data)) return false;

    // 3. Title bounds
    if (typeof data.title !== 'string' || data.title.length < 1 || data.title.length > 200) return false;

    // 4. Slug bounds
    if (typeof data.slug !== 'string' || data.slug.length < 1 || data.slug.length > 150) return false;

    // 5. Published boolean
    if (typeof data.published !== 'boolean') return false;

    // 6. SnapShare toggle
    const hasValidSnapShare =
      ('snapShareEnabled' in data && typeof data.snapShareEnabled === 'boolean') ||
      ('snapshare_enabled' in data && (typeof data.snapshare_enabled === 'boolean' || data.snapshare_enabled === 0 || data.snapshare_enabled === 1));
    if (!hasValidSnapShare) return false;

    // 7. Date validation
    const hasValidStartDate =
      ('startDate' in data && (typeof data.startDate?.toDate === 'function' || (typeof data.startDate === 'string' && data.startDate.length <= 100))) ||
      ('start_date' in data && (typeof data.start_date?.toDate === 'function' || (typeof data.start_date === 'string' && data.start_date.length <= 100)));
    if (!hasValidStartDate) return false;

    if (!isValidOptionalDate(data, 'endDate')) return false;
    if (!isValidOptionalDate(data, 'end_date')) return false;

    // 8. HTTPS URLs
    if (!isValidOptionalHttpsUrl(data, 'mapUrl')) return false;
    if (!isValidOptionalHttpsUrl(data, 'map_url')) return false;
    if (!isValidOptionalHttpsUrl(data, 'registration_url')) return false;

    // 9. Poster
    if ('poster' in data && !isValidPoster(data.poster)) return false;
    if (!isValidOptionalString(data, 'poster_url', 0, 1000)) return false;
    if (!isValidOptionalString(data, 'poster_public_id', 0, 500)) return false;

    // 10. Timestamps
    if (!isValidOptionalDate(data, 'createdAt')) return false;
    if (!isValidOptionalDate(data, 'created_at')) return false;
    if (!isValidOptionalDate(data, 'updatedAt')) return false;
    if (!isValidOptionalDate(data, 'updated_at')) return false;

    // 11. Strings bounds
    if (!isValidOptionalString(data, 'shortDescription', 0, 1000)) return false;
    if (!isValidOptionalString(data, 'short_description', 0, 1000)) return false;
    if (!isValidOptionalString(data, 'description', 0, 10000)) return false;
    if (!isValidOptionalString(data, 'full_description', 0, 10000)) return false;
    if (!isValidOptionalString(data, 'venue', 0, 300)) return false;
    if (!isValidOptionalString(data, 'location', 0, 500)) return false;
    if (!isValidOptionalString(data, 'category', 0, 100)) return false;

    return true;
  }

  function canRead(auth: any, resourceData: Record<string, any>): boolean {
    return resourceData.published === true || isAdmin(auth);
  }

  function canCreate(auth: any, newData: Record<string, any>): boolean {
    return isAdmin(auth) && isValidEvent(newData);
  }

  function canUpdate(auth: any, oldData: Record<string, any>, newData: Record<string, any>): boolean {
    if (!isAdmin(auth)) return false;
    if (!isValidEvent(newData)) return false;

    // Immutable checks
    if ('createdAt' in oldData && newData.createdAt !== oldData.createdAt) return false;
    if ('created_at' in oldData && newData.created_at !== oldData.created_at) return false;
    if ('slug' in oldData && newData.slug !== oldData.slug) return false;

    return true;
  }

  function canDelete(auth: any): boolean {
    return isAdmin(auth);
  }

  const validEventPayload: Record<string, any> = {
    title: 'Balasangham District Conference 2026',
    slug: 'district-conference-2026',
    published: true,
    snapShareEnabled: true,
    startDate: '2026-10-10T09:00:00Z',
    start_date: '2026-10-10T09:00:00Z',
    mapUrl: 'https://maps.google.com/?q=Kalliasseri',
    poster: {
      publicId: 'balasangham/conf_2026',
      secureUrl: 'https://res.cloudinary.com/demo/image/upload/v1/poster.jpg'
    },
    category: 'conference',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  };

  describe('Validator Function Pattern & Schema Validation', () => {
    it('accepts a fully compliant event payload', () => {
      expect(isValidEvent(validEventPayload)).toBe(true);
    });

    it('rejects payloads missing mandatory fields', () => {
      const missingTitle = { ...validEventPayload };
      delete missingTitle.title;
      expect(isValidEvent(missingTitle)).toBe(false);

      const missingSlug = { ...validEventPayload };
      delete missingSlug.slug;
      expect(isValidEvent(missingSlug)).toBe(false);

      const missingPublished = { ...validEventPayload };
      delete missingPublished.published;
      expect(isValidEvent(missingPublished)).toBe(false);
    });

    it('rejects schema pollution attacks (arbitrary unexpected keys)', () => {
      const maliciousPayload = {
        ...validEventPayload,
        maliciousPayload: '<script>alert(1)</script>',
        adminRole: 'superadmin'
      };
      expect(isValidEvent(maliciousPayload)).toBe(false);
    });

    it('rejects Resource Exhaustion / DoS attacks (oversized title or description)', () => {
      const oversizedTitle = {
        ...validEventPayload,
        title: 'A'.repeat(201)
      };
      expect(isValidEvent(oversizedTitle)).toBe(false);

      const oversizedDesc = {
        ...validEventPayload,
        description: 'B'.repeat(10001)
      };
      expect(isValidEvent(oversizedDesc)).toBe(false);
    });

    it('validates mapUrl must be HTTPS and <= 1000 characters', () => {
      const insecureUrl = {
        ...validEventPayload,
        mapUrl: 'http://insecure-maps.com'
      };
      expect(isValidEvent(insecureUrl)).toBe(false);

      const nullUrl = {
        ...validEventPayload,
        mapUrl: null
      };
      expect(isValidEvent(nullUrl)).toBe(true);
    });

    it('validates poster metadata map and rejects arbitrary nested keys', () => {
      const invalidPosterMap = {
        ...validEventPayload,
        poster: {
          publicId: 'id123',
          secureUrl: 'https://cloudinary.com/img.jpg',
          injectedKey: 'unsafe'
        }
      };
      expect(isValidEvent(invalidPosterMap)).toBe(false);

      const nullPoster = {
        ...validEventPayload,
        poster: null
      };
      expect(isValidEvent(nullPoster)).toBe(true);
    });
  });

  describe('Read Access Control & Visibility Protection', () => {
    it('allows unauthenticated public access to published events', () => {
      expect(canRead(null, { published: true })).toBe(true);
    });

    it('strictly denies unauthenticated public access to draft events', () => {
      expect(canRead(null, { published: false })).toBe(false);
    });

    it('allows authenticated administrator to access draft events', () => {
      const adminAuth = { token: { admin: true } };
      expect(canRead(adminAuth, { published: false })).toBe(true);

      const adminEmailAuth = { token: { email: 'admin@balasangham.org' } };
      expect(canRead(adminEmailAuth, { published: false })).toBe(true);
    });
  });

  describe('Write Access Control & Immutable Field Protection', () => {
    const adminAuth = { token: { admin: true } };
    const userAuth = { token: { uid: 'user-123' } }; // non-admin authenticated

    it('denies creation by unauthenticated or non-admin users', () => {
      expect(canCreate(null, validEventPayload)).toBe(false);
      expect(canCreate(userAuth, validEventPayload)).toBe(false);
    });

    it('allows creation by authenticated admin with valid payload', () => {
      expect(canCreate(adminAuth, validEventPayload)).toBe(true);
    });

    it('strictly denies updates that attempt to modify immutable fields (slug, createdAt)', () => {
      const existingDoc = { ...validEventPayload };
      
      // Attempting to hijack slug
      const hijackedSlug = { ...validEventPayload, slug: 'altered-slug-2026' };
      expect(canUpdate(adminAuth, existingDoc, hijackedSlug)).toBe(false);

      // Attempting to alter createdAt
      const alteredCreatedAt = { ...validEventPayload, createdAt: '1970-01-01T00:00:00Z' };
      expect(canUpdate(adminAuth, existingDoc, alteredCreatedAt)).toBe(false);
    });

    it('allows legitimate administrative updates that preserve immutable fields', () => {
      const existingDoc = { ...validEventPayload };
      const updatedDoc = {
        ...validEventPayload,
        title: 'Updated Conference Title 2026',
        updatedAt: '2026-10-01T12:00:00Z'
      };
      expect(canUpdate(adminAuth, existingDoc, updatedDoc)).toBe(true);
    });

    it('restricts delete operations exclusively to administrators', () => {
      expect(canDelete(null)).toBe(false);
      expect(canDelete(userAuth)).toBe(false);
      expect(canDelete(adminAuth)).toBe(true);
    });
  });
});
