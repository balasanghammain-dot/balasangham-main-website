// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockDocSet = vi.fn().mockResolvedValue(undefined);
const mockDocDelete = vi.fn().mockResolvedValue(undefined);
const mockDoc = vi.fn(() => ({
  set: mockDocSet,
  delete: mockDocDelete,
}));
const mockCollection = vi.fn(() => ({
  doc: mockDoc,
}));

let shouldThrowCreds = false;

vi.mock('../../server/firebaseAdmin.js', () => ({
  getAdminFirestore: () => {
    if (shouldThrowCreds) {
      throw new Error('Could not load the default credentials');
    }
    return {
      collection: mockCollection,
    };
  },
  getFirebaseAdmin: vi.fn(),
  getAdminAuth: vi.fn(),
  isUserAdmin: vi.fn(),
}));

// Also mock CJS require cache for Node
const firebaseAdmin = require('../../server/firebaseAdmin.js');
firebaseAdmin.getAdminFirestore = () => {
  if (shouldThrowCreds) {
    throw new Error('Could not load the default credentials');
  }
  return {
    collection: mockCollection,
  };
};

import {
  syncEventToFirestore,
  deleteEventFromFirestore,
  syncMediaToFirestore,
  deleteMediaFromFirestore
} from '../../server/firestoreSync.js';

describe('server/firestoreSync with Firebase Admin SDK', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    shouldThrowCreds = false;
  });

  it('syncs event document to Firestore using Admin SDK', async () => {
    const testEvent = {
      id: 'evt-123',
      slug: 'kannur-conference-2026',
      title: 'Balasangham Kannur District Conference',
      title_ml: 'ജില്ലാ സമ്മേളനം',
      start_date: '2026-10-10T09:00:00Z',
      published: 1,
      snapshare_enabled: 1,
      poster_url: 'https://res.cloudinary.com/test/image.jpg',
    };

    const result = await syncEventToFirestore(testEvent);
    expect(result).toBe(true);
    expect(mockCollection).toHaveBeenCalledWith('events');
    expect(mockDoc).toHaveBeenCalledWith('kannur-conference-2026');
    expect(mockDocSet).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Balasangham Kannur District Conference',
        published: true,
        snapShareEnabled: true,
      }),
      { merge: true }
    );
  });

  it('syncs dateless draft event preserving null for start_date and startDate', async () => {
    const testDraft = {
      id: 'evt-draft',
      slug: 'draft-no-date',
      title: 'Dateless Draft',
      start_date: null,
      published: 0,
      snapshare_enabled: 0,
    };

    const result = await syncEventToFirestore(testDraft);
    expect(result).toBe(true);
    expect(mockDocSet).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Dateless Draft',
        published: false,
        startDate: null,
        start_date: null,
      }),
      { merge: true }
    );
  });

  it('deletes event document from Firestore', async () => {
    const result = await deleteEventFromFirestore('evt-123', 'kannur-conference-2026');
    expect(result).toBe(true);
    expect(mockCollection).toHaveBeenCalledWith('events');
    expect(mockDocDelete).toHaveBeenCalledTimes(2);
  });

  it('syncs media document to Firestore using Admin SDK', async () => {
    const testMedia = {
      id: 'media-456',
      cloudinary_public_id: 'balasangham/photos/01',
      url: 'https://res.cloudinary.com/test/photo.jpg',
      resource_type: 'image',
      published: 1,
      title: 'Troupe Photo',
    };

    const result = await syncMediaToFirestore(testMedia);
    expect(result).toBe(true);
    expect(mockCollection).toHaveBeenCalledWith('media');
    expect(mockDoc).toHaveBeenCalledWith('media-456');
    expect(mockDocSet).toHaveBeenCalledWith(
      expect.objectContaining({
        publicId: 'balasangham/photos/01',
        url: 'https://res.cloudinary.com/test/photo.jpg',
        published: true,
      }),
      { merge: true }
    );
  });

  it('deletes media document from Firestore', async () => {
    const result = await deleteMediaFromFirestore('media-456');
    expect(result).toBe(true);
    expect(mockCollection).toHaveBeenCalledWith('media');
    expect(mockDoc).toHaveBeenCalledWith('media-456');
    expect(mockDocDelete).toHaveBeenCalledTimes(1);
  });

  it('logs loud error and returns false when admin credentials are missing', async () => {
    shouldThrowCreds = true;
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await syncEventToFirestore({ id: 'evt-test', title: 'Test' });
    expect(result).toBe(false);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('[firestoreSync] CRITICAL:'),
      expect.any(String)
    );
  });
});
