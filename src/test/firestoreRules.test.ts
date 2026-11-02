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
      (token.email_verified === true &&
        typeof token.email === 'string' &&
        ['balasangham.main@gmail.com', 'admin@balasanghamkannur.org'].includes(token.email.toLowerCase()))
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

    // 7. Date validation (optional for unpublished drafts)
    const hasValidStartDate =
      (data.published === false && (
        (!('startDate' in data) && !('start_date' in data)) ||
        ('startDate' in data && data.startDate === null) ||
        ('start_date' in data && data.start_date === null)
      )) ||
      ('startDate' in data && data.startDate !== null && (typeof data.startDate?.toDate === 'function' || (typeof data.startDate === 'string' && data.startDate.length <= 100))) ||
      ('start_date' in data && data.start_date !== null && (typeof data.start_date?.toDate === 'function' || (typeof data.start_date === 'string' && data.start_date.length <= 100)));
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

  describe('Administrator Authorization & Privilege Escalation Prevention (isAdmin)', () => {
    it('grants admin privileges to custom claim admin: true', () => {
      expect(isAdmin({ token: { admin: true } })).toBe(true);
      expect(isAdmin({ token: { admin: true, email: 'convener.thalassery@gmail.com' } })).toBe(true);
    });

    it('grants admin privileges to custom claim role: admin', () => {
      expect(isAdmin({ token: { role: 'admin' } })).toBe(true);
    });

    it('grants admin privileges to authorized admin emails with email_verified: true (case-insensitive)', () => {
      expect(isAdmin({ token: { email: 'balasangham.main@gmail.com', email_verified: true } })).toBe(true);
      expect(isAdmin({ token: { email: 'Balasangham.Main@Gmail.com', email_verified: true } })).toBe(true);
      expect(isAdmin({ token: { email: 'admin@balasanghamkannur.org', email_verified: true } })).toBe(true);
      expect(isAdmin({ token: { email: 'Admin@BalasanghamKannur.org', email_verified: true } })).toBe(true);
    });

    it('strictly denies unverified allowlisted emails (F1/F3 vulnerability remediation)', () => {
      expect(isAdmin({ token: { email: 'balasangham.main@gmail.com', email_verified: false } })).toBe(false);
      expect(isAdmin({ token: { email: 'admin@balasanghamkannur.org', email_verified: false } })).toBe(false);
      expect(isAdmin({ token: { email: 'balasangham.main@gmail.com' } })).toBe(false);
      expect(isAdmin({ token: { email: 'admin@balasanghamkannur.org' } })).toBe(false);
    });

    it('strictly denies arbitrary authenticated emails and prevents privilege escalation', () => {
      expect(isAdmin({ token: { email: 'random@example.com', email_verified: true } })).toBe(false);
      expect(isAdmin({ token: { email: 'attacker@evil.com', email_verified: true } })).toBe(false);
      expect(isAdmin({ token: { email: 'admin@balasangham.org', email_verified: true } })).toBe(false);
      expect(isAdmin({ token: { email: 'user@gmail.com', email_verified: true } })).toBe(false);
      expect(isAdmin({ token: { email: 'member@balasanghamkannur.org', admin: false, email_verified: true } })).toBe(false);
    });

    it('denies unauthenticated requests or tokens without admin claims/emails', () => {
      expect(isAdmin(null)).toBe(false);
      expect(isAdmin(undefined)).toBe(false);
      expect(isAdmin({})).toBe(false);
      expect(isAdmin({ token: {} })).toBe(false);
      expect(isAdmin({ token: { uid: 'user123' } })).toBe(false);
      expect(isAdmin({ token: { admin: false } })).toBe(false);
      expect(isAdmin({ token: { role: 'member' } })).toBe(false);
    });
  });

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

      const adminEmailAuth1 = { token: { email: 'balasangham.main@gmail.com', email_verified: true } };
      expect(canRead(adminEmailAuth1, { published: false })).toBe(true);

      const adminEmailAuth2 = { token: { email: 'admin@balasanghamkannur.org', email_verified: true } };
      expect(canRead(adminEmailAuth2, { published: false })).toBe(true);

      const unverifiedAdminEmail = { token: { email: 'balasangham.main@gmail.com', email_verified: false } };
      expect(canRead(unverifiedAdminEmail, { published: false })).toBe(false);
    });

    it('strictly denies authenticated non-admin users (e.g. random@example.com) from accessing draft events', () => {
      const randomUserAuth = { token: { uid: 'user-random', email: 'random@example.com' } };
      expect(canRead(randomUserAuth, { published: false })).toBe(false);
    });
  });

  describe('Write Access Control & Immutable Field Protection', () => {
    const adminAuth = { token: { admin: true } };
    const userAuth = { token: { uid: 'user-123' } }; // non-admin authenticated
    const randomEmailUserAuth = { token: { uid: 'user-random', email: 'random@example.com' } };

    it('denies creation by unauthenticated, non-admin, or arbitrary email users', () => {
      expect(canCreate(null, validEventPayload)).toBe(false);
      expect(canCreate(userAuth, validEventPayload)).toBe(false);
      expect(canCreate(randomEmailUserAuth, validEventPayload)).toBe(false);
    });

    it('allows creation by authenticated admin with valid payload', () => {
      // Claim-based admin (dynamic email)
      expect(canCreate(adminAuth, validEventPayload)).toBe(true);
      expect(canCreate({ token: { admin: true, email: 'new.admin@balasanghamkannur.org' } }, validEventPayload)).toBe(true);

      // Legacy verified email admin (transition path)
      expect(canCreate({ token: { email: 'balasangham.main@gmail.com', email_verified: true } }, validEventPayload)).toBe(true);
      expect(canCreate({ token: { email: 'admin@balasanghamkannur.org', email_verified: true } }, validEventPayload)).toBe(true);

      // Unverified allowlisted email denied
      expect(canCreate({ token: { email: 'balasangham.main@gmail.com', email_verified: false } }, validEventPayload)).toBe(false);
      expect(canCreate({ token: { email: 'balasangham.main@gmail.com' } }, validEventPayload)).toBe(false);

      // Non-admin explicitly denied
      expect(canCreate({ token: { email: 'regular.member@gmail.com', email_verified: true } }, validEventPayload)).toBe(false);
    });

    it('strictly denies updates from non-admin authenticated users with arbitrary email', () => {
      const existingDoc = { ...validEventPayload };
      const updatedDoc = {
        ...validEventPayload,
        title: 'Updated Conference Title 2026',
        updatedAt: '2026-10-01T12:00:00Z'
      };
      expect(canUpdate(randomEmailUserAuth, existingDoc, updatedDoc)).toBe(false);
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

    it('restricts delete operations exclusively to administrators and denies arbitrary users', () => {
      expect(canDelete(null)).toBe(false);
      expect(canDelete(userAuth)).toBe(false);
      expect(canDelete(randomEmailUserAuth)).toBe(false);
      expect(canDelete(adminAuth)).toBe(true);
    });

    describe('Exact AdminEventEditorPage payloads (Save Draft & Publish)', () => {
      // Exact payload generated by AdminEventEditorPage -> toFirestoreEvent for "Save Draft"
      const editorSaveDraftPayload: Record<string, any> = {
        title: 'Kalliasseri Art Festival 2026',
        title_ml: 'കല്യാശ്ശേരി കലാമേള 2026',
        malayalamTitle: 'കല്യാശ്ശേരി കലാമേള 2026',
        slug: 'kalliasseri-art-festival-2026-1730000000',
        shortDescription: 'Annual arts and cultural festival',
        short_description: 'Annual arts and cultural festival',
        short_description_ml: 'കുട്ടികളുടെ വാർഷിക കലാമേള',
        description: 'Comprehensive children talent meet and cultural performances',
        full_description: 'Comprehensive children talent meet and cultural performances',
        full_description_ml: 'കുട്ടികളുടെ സമഗ്ര കലാ സാഹിത്യ സമ്മേളനം',
        startDate: '2026-12-10T09:30:00.000Z',
        start_date: '2026-12-10T09:30:00.000Z',
        endDate: null,
        end_date: null,
        venue: 'Kalliasseri Community Hall',
        venue_ml: 'കല്യാശ്ശേരി കമ്മ്യൂണിറ്റി ഹാൾ',
        address: 'Kalliasseri, Kannur',
        location: 'Kalliasseri, Kannur',
        location_ml: 'കല്യാശ്ശേരി, കണ്ണൂർ',
        mapUrl: null,
        map_url: null,
        category: 'culture',
        poster: {
          publicId: null,
          secureUrl: null
        },
        poster_url: null,
        poster_public_id: null,
        published: false, // Save Draft
        snapShareEnabled: false,
        snapshare_enabled: 0,
        registration_url: null,
        additional_info: null,
        additional_info_ml: null,
        schedule_info: null,
        schedule_info_ml: null,
        createdAt: '2026-11-01T12:00:00.000Z',
        updatedAt: '2026-11-01T12:00:00.000Z'
      };

      // Exact payload generated by AdminEventEditorPage -> toFirestoreEvent for "Publish"
      const editorPublishPayload: Record<string, any> = {
        ...editorSaveDraftPayload,
        published: true, // Publish
        mapUrl: 'https://maps.google.com/?q=Kalliasseri',
        map_url: 'https://maps.google.com/?q=Kalliasseri',
        poster: {
          publicId: 'balasangham/events/poster_123',
          secureUrl: 'https://res.cloudinary.com/demo/image/upload/v1/poster_123.jpg'
        },
        poster_url: 'https://res.cloudinary.com/demo/image/upload/v1/poster_123.jpg',
        poster_public_id: 'balasangham/events/poster_123'
      };

      it('accepts exact Save Draft payload when created by an admin', () => {
        expect(canCreate(adminAuth, editorSaveDraftPayload)).toBe(true);
      });

      it('strictly rejects exact Save Draft payload when created by a non-admin or unverified user', () => {
        expect(canCreate(null, editorSaveDraftPayload)).toBe(false);
        expect(canCreate(userAuth, editorSaveDraftPayload)).toBe(false);
        expect(canCreate(randomEmailUserAuth, editorSaveDraftPayload)).toBe(false);
        expect(canCreate({ token: { email: 'balasangham.main@gmail.com', email_verified: false } }, editorSaveDraftPayload)).toBe(false);
      });

      it('accepts exact Publish payload when created by an admin', () => {
        expect(canCreate(adminAuth, editorPublishPayload)).toBe(true);
      });

      it('strictly rejects exact Publish payload when created by a non-admin or unverified user', () => {
        expect(canCreate(null, editorPublishPayload)).toBe(false);
        expect(canCreate(userAuth, editorPublishPayload)).toBe(false);
        expect(canCreate(randomEmailUserAuth, editorPublishPayload)).toBe(false);
        expect(canCreate({ token: { email: 'balasangham.main@gmail.com', email_verified: false } }, editorPublishPayload)).toBe(false);
      });

      it('allows date-less draft for admin only, and denies it for non-admin and unauthenticated', () => {
        const datelessDraft = {
          ...editorSaveDraftPayload,
          startDate: null,
          start_date: null,
          endDate: null,
          end_date: null,
          published: false,
        };

        // Allowed for admin
        expect(canCreate(adminAuth, datelessDraft)).toBe(true);

        // Strictly denied for non-admin, unverified email, or unauthenticated users
        expect(canCreate(null, datelessDraft)).toBe(false);
        expect(canCreate(userAuth, datelessDraft)).toBe(false);
        expect(canCreate(randomEmailUserAuth, datelessDraft)).toBe(false);
        expect(canCreate({ token: { email: 'balasangham.main@gmail.com', email_verified: false } }, datelessDraft)).toBe(false);

        // Date-less published event is always denied, even for admin
        const datelessPublished = {
          ...datelessDraft,
          published: true,
        };
        expect(canCreate(adminAuth, datelessPublished)).toBe(false);
      });
    });
  });

  describe('Media Collection Security Rules & Validator Function Pattern', () => {
    const allowedMediaFields = [
      'title',
      'description',
      'caption',
      'caption_ml',
      'url', 'secureUrl', 'secure_url',
      'publicId', 'public_id', 'cloudinary_public_id',
      'type', 'resource_type',
      'format',
      'width',
      'height',
      'duration',
      'thumbnail_url', 'thumbnailUrl',
      'eventId', 'event_id',
      'published',
      'sort_order',
      'createdAt', 'created_at',
      'updatedAt', 'updated_at'
    ];

    function isValidOptionalThumbnailUrl(data: any, field: string): boolean {
      if (!(field in data)) return true;
      const val = data[field];
      if (val === null) return true;
      return typeof val === 'string' && val.length >= 8 && val.length <= 1000 && (val.startsWith('https://') || val.startsWith('/'));
    }

    function isValidOptionalNumber(data: any, field: string): boolean {
      if (!(field in data)) return true;
      const val = data[field];
      if (val === null) return true;
      return typeof val === 'number' && !isNaN(val) && val >= 0;
    }

    function isValidOptionalSortOrder(data: any, field: string): boolean {
      if (!(field in data)) return true;
      const val = data[field];
      if (val === null) return true;
      return typeof val === 'number' && !isNaN(val);
    }

    function isValidMedia(data: Record<string, any>): boolean {
      // 1. Strict schema
      const keys = Object.keys(data);
      if (!keys.every(k => allowedMediaFields.includes(k))) return false;

      // 2. Required URL Validation
      const hasUrlField = ('url' in data) || ('secureUrl' in data) || ('secure_url' in data);
      if (!hasUrlField) return false;
      if ('url' in data && (typeof data.url !== 'string' || data.url.length < 8 || data.url.length > 1000 || !data.url.startsWith('https://'))) return false;
      if ('secureUrl' in data && (typeof data.secureUrl !== 'string' || data.secureUrl.length < 8 || data.secureUrl.length > 1000 || !data.secureUrl.startsWith('https://'))) return false;
      if ('secure_url' in data && (typeof data.secure_url !== 'string' || data.secure_url.length < 8 || data.secure_url.length > 1000 || !data.secure_url.startsWith('https://'))) return false;

      // 3. Required Public ID Validation
      const hasPublicIdField = ('publicId' in data) || ('public_id' in data) || ('cloudinary_public_id' in data);
      if (!hasPublicIdField) return false;
      if ('publicId' in data && (typeof data.publicId !== 'string' || data.publicId.length < 1 || data.publicId.length > 500)) return false;
      if ('public_id' in data && (typeof data.public_id !== 'string' || data.public_id.length < 1 || data.public_id.length > 500)) return false;
      if ('cloudinary_public_id' in data && (typeof data.cloudinary_public_id !== 'string' || data.cloudinary_public_id.length < 1 || data.cloudinary_public_id.length > 500)) return false;

      // 4. Required Type Validation
      const hasTypeField = ('type' in data) || ('resource_type' in data);
      if (!hasTypeField) return false;
      if ('type' in data && (typeof data.type !== 'string' || (data.type !== 'image' && data.type !== 'video'))) return false;
      if ('resource_type' in data && (typeof data.resource_type !== 'string' || (data.resource_type !== 'image' && data.resource_type !== 'video'))) return false;

      // 5. Visibility / Publication Status
      if (!('published' in data)) return false;
      const isValidPublished = typeof data.published === 'boolean' || data.published === 0 || data.published === 1;
      if (!isValidPublished) return false;

      // 6. Optional Format String
      if (!isValidOptionalString(data, 'format', 1, 20)) return false;

      // 7. Optional Dimensions & Duration
      if (!isValidOptionalNumber(data, 'width')) return false;
      if (!isValidOptionalNumber(data, 'height')) return false;
      if (!isValidOptionalNumber(data, 'duration')) return false;

      // 8. Optional Sort Order
      if (!isValidOptionalSortOrder(data, 'sort_order')) return false;

      // 9. Optional Thumbnail URL
      if (!isValidOptionalThumbnailUrl(data, 'thumbnail_url')) return false;
      if (!isValidOptionalThumbnailUrl(data, 'thumbnailUrl')) return false;

      // 10. Optional Event Association
      if (!isValidOptionalString(data, 'eventId', 0, 150)) return false;
      if (!isValidOptionalString(data, 'event_id', 0, 150)) return false;

      // 11. Timestamps
      if (!isValidOptionalDate(data, 'createdAt')) return false;
      if (!isValidOptionalDate(data, 'created_at')) return false;
      if (!isValidOptionalDate(data, 'updatedAt')) return false;
      if (!isValidOptionalDate(data, 'updated_at')) return false;

      // 12. Optional Text Bounds
      if (!isValidOptionalString(data, 'title', 0, 300)) return false;
      if (!isValidOptionalString(data, 'description', 0, 2000)) return false;
      if (!isValidOptionalString(data, 'caption', 0, 500)) return false;
      if (!isValidOptionalString(data, 'caption_ml', 0, 500)) return false;

      return true;
    }

    function canReadMedia(auth: any, resourceData: Record<string, any>): boolean {
      return (resourceData.published === true || resourceData.published === 1) || isAdmin(auth);
    }

    function canCreateMedia(auth: any, newData: Record<string, any>): boolean {
      return isAdmin(auth) && isValidMedia(newData);
    }

    function canUpdateMedia(auth: any, oldData: Record<string, any>, newData: Record<string, any>): boolean {
      if (!isAdmin(auth)) return false;
      if (!isValidMedia(newData)) return false;

      if ('createdAt' in oldData && newData.createdAt !== oldData.createdAt) return false;
      if ('created_at' in oldData && newData.created_at !== oldData.created_at) return false;

      return true;
    }

    function canDeleteMedia(auth: any): boolean {
      return isAdmin(auth);
    }

    const validMediaPayload: Record<string, any> = {
      title: 'Venalthumbikal 2025 Cultural Troupe Presentation',
      description: 'Children stage performance and cultural troupe assembly in Kannur district.',
      caption: 'Venalthumbikal 2025 Cultural Troupe Presentation (1)',
      caption_ml: 'വേനൽത്തുമ്പികൾ 2025 ജില്ലാ സംഗമം (1)',
      url: 'https://res.cloudinary.com/dj4apdzk/image/upload/v1/balasangham/photo1.jpg',
      publicId: 'balasangham/media/photo1',
      type: 'image',
      format: 'jpg',
      width: 1280,
      height: 853,
      duration: 0,
      thumbnail_url: 'https://res.cloudinary.com/dj4apdzk/image/upload/w_600/photo1.jpg',
      eventId: 'venalthumbikal-district-sangamam-2025',
      published: true,
      sort_order: 1,
      createdAt: '2026-05-24T10:00:00Z',
      updatedAt: '2026-05-24T10:00:00Z'
    };

    describe('Media Domain Validator & Schema Rules', () => {
      it('accepts a fully compliant media item', () => {
        expect(isValidMedia(validMediaPayload)).toBe(true);
      });

      it('accepts general media without an associated eventId or event_id', () => {
        const generalMedia = { ...validMediaPayload };
        delete generalMedia.eventId;
        delete generalMedia.event_id;
        expect(isValidMedia(generalMedia)).toBe(true);

        const nullEventMedia = { ...validMediaPayload, eventId: null, event_id: null };
        expect(isValidMedia(nullEventMedia)).toBe(true);
      });

      it('accepts snake_case / legacy media attributes (resource_type, cloudinary_public_id, secure_url, published 0/1)', () => {
        const legacyMedia = {
          title: 'Legacy Video',
          secure_url: 'https://res.cloudinary.com/dj4apdzk/video/upload/v1/video.mp4',
          cloudinary_public_id: 'balasangham/media/video1',
          resource_type: 'video',
          published: 1,
          format: 'mp4',
          duration: 120.5,
          thumbnail_url: '/images/video-thumb.jpg'
        };
        expect(isValidMedia(legacyMedia)).toBe(true);
      });

      it('rejects payloads missing mandatory fields (url, publicId, type, published)', () => {
        const missingUrl = { ...validMediaPayload };
        delete missingUrl.url;
        expect(isValidMedia(missingUrl)).toBe(false);

        const missingPublicId = { ...validMediaPayload };
        delete missingPublicId.publicId;
        expect(isValidMedia(missingPublicId)).toBe(false);

        const missingType = { ...validMediaPayload };
        delete missingType.type;
        expect(isValidMedia(missingType)).toBe(false);

        const missingPublished = { ...validMediaPayload };
        delete missingPublished.published;
        expect(isValidMedia(missingPublished)).toBe(false);
      });

      it('rejects schema pollution attacks (unexpected keys)', () => {
        const polluted = {
          ...validMediaPayload,
          injectedScript: '<script>alert("hack")</script>',
          isSuperAdmin: true
        };
        expect(isValidMedia(polluted)).toBe(false);
      });

      it('rejects insecure non-HTTPS url', () => {
        const insecure = {
          ...validMediaPayload,
          url: 'http://insecure-cdn.com/image.jpg'
        };
        expect(isValidMedia(insecure)).toBe(false);
      });

      it('rejects invalid type values (must be image or video)', () => {
        const invalidType = {
          ...validMediaPayload,
          type: 'executable'
        };
        expect(isValidMedia(invalidType)).toBe(false);
      });

      it('rejects Resource Exhaustion / DoS attacks (oversized text fields)', () => {
        const oversizedTitle = { ...validMediaPayload, title: 'A'.repeat(301) };
        expect(isValidMedia(oversizedTitle)).toBe(false);

        const oversizedDesc = { ...validMediaPayload, description: 'B'.repeat(2001) };
        expect(isValidMedia(oversizedDesc)).toBe(false);

        const oversizedCaption = { ...validMediaPayload, caption: 'C'.repeat(501) };
        expect(isValidMedia(oversizedCaption)).toBe(false);
      });

      it('rejects invalid thumbnail URLs (must start with https:// or /)', () => {
        const insecureThumb = { ...validMediaPayload, thumbnail_url: 'http://cdn.com/thumb.jpg' };
        expect(isValidMedia(insecureThumb)).toBe(false);

        const relativeThumb = { ...validMediaPayload, thumbnail_url: '/images/thumb.jpg' };
        expect(isValidMedia(relativeThumb)).toBe(true);
      });

      it('rejects negative numbers for width, height, or duration', () => {
        const negativeWidth = { ...validMediaPayload, width: -100 };
        expect(isValidMedia(negativeWidth)).toBe(false);

        const negativeHeight = { ...validMediaPayload, height: -50 };
        expect(isValidMedia(negativeHeight)).toBe(false);

        const negativeDuration = { ...validMediaPayload, duration: -10 };
        expect(isValidMedia(negativeDuration)).toBe(false);
      });
    });

    describe('Media Read Access Control & Visibility Protection', () => {
      it('allows unauthenticated public access to published media (bool true or int 1)', () => {
        expect(canReadMedia(null, { published: true })).toBe(true);
        expect(canReadMedia(null, { published: 1 })).toBe(true);
      });

      it('strictly denies unauthenticated public access to draft media (bool false or int 0)', () => {
        expect(canReadMedia(null, { published: false })).toBe(false);
        expect(canReadMedia(null, { published: 0 })).toBe(false);
      });

      it('allows authenticated administrator to access draft media', () => {
        const adminAuth = { token: { admin: true } };
        expect(canReadMedia(adminAuth, { published: false })).toBe(true);
        expect(canReadMedia(adminAuth, { published: 0 })).toBe(true);

        const adminEmailAuth1 = { token: { email: 'balasangham.main@gmail.com', email_verified: true } };
        expect(canReadMedia(adminEmailAuth1, { published: false })).toBe(true);

        const adminEmailAuth2 = { token: { email: 'admin@balasanghamkannur.org', email_verified: true } };
        expect(canReadMedia(adminEmailAuth2, { published: false })).toBe(true);

        const unverifiedAuth = { token: { email: 'balasangham.main@gmail.com', email_verified: false } };
        expect(canReadMedia(unverifiedAuth, { published: false })).toBe(false);
      });

      it('strictly denies authenticated non-admin users (e.g. random@example.com) from accessing draft media', () => {
        const randomUserAuth = { token: { uid: 'user-random', email: 'random@example.com' } };
        expect(canReadMedia(randomUserAuth, { published: false })).toBe(false);
        expect(canReadMedia(randomUserAuth, { published: 0 })).toBe(false);
      });
    });

    describe('Media Write Access Control & Immutable Field Protection', () => {
      const adminAuth = { token: { admin: true } };
      const userAuth = { token: { uid: 'regular-user' } };
      const randomEmailUserAuth = { token: { uid: 'regular-user', email: 'random@example.com' } };

      it('denies media creation by unauthenticated, regular, or arbitrary email users', () => {
        expect(canCreateMedia(null, validMediaPayload)).toBe(false);
        expect(canCreateMedia(userAuth, validMediaPayload)).toBe(false);
        expect(canCreateMedia(randomEmailUserAuth, validMediaPayload)).toBe(false);
      });

      it('allows media creation by authenticated admin with valid payload', () => {
        expect(canCreateMedia(adminAuth, validMediaPayload)).toBe(true);
      });

      it('strictly denies media updates from non-admin authenticated users with arbitrary email', () => {
        const existingDoc = { ...validMediaPayload };
        const updatedDoc = {
          ...validMediaPayload,
          title: 'Updated Presentation Title',
          updatedAt: '2026-10-10T12:00:00Z'
        };
        expect(canUpdateMedia(randomEmailUserAuth, existingDoc, updatedDoc)).toBe(false);
      });

      it('strictly denies media updates that attempt to modify immutable fields (createdAt)', () => {
        const existingDoc = { ...validMediaPayload };
        const alteredCreatedAt = { ...validMediaPayload, createdAt: '1980-01-01T00:00:00Z' };
        expect(canUpdateMedia(adminAuth, existingDoc, alteredCreatedAt)).toBe(false);
      });

      it('allows legitimate administrative updates that preserve immutable fields', () => {
        const existingDoc = { ...validMediaPayload };
        const updatedDoc = {
          ...validMediaPayload,
          title: 'Updated Presentation Title',
          updatedAt: '2026-10-10T12:00:00Z'
        };
        expect(canUpdateMedia(adminAuth, existingDoc, updatedDoc)).toBe(true);
      });

      it('restricts media delete operations exclusively to administrators and denies arbitrary users', () => {
        expect(canDeleteMedia(null)).toBe(false);
        expect(canDeleteMedia(userAuth)).toBe(false);
        expect(canDeleteMedia(randomEmailUserAuth)).toBe(false);
        expect(canDeleteMedia(adminAuth)).toBe(true);
      });
    });
  });
});

