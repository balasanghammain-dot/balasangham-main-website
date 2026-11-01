import { describe, it, expect, vi, beforeEach } from 'vitest';
import { uploadFile } from '../lib/uploadService';
import { api } from '../lib/api';
import { auth } from '../lib/firebase';

vi.mock('../lib/api', () => ({
  api: {
    post: vi.fn(),
  },
}));

vi.mock('../lib/firebase', () => ({
  auth: {
    currentUser: {
      getIdToken: vi.fn(),
    },
  },
  app: {},
  db: {},
}));

describe('uploadService client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('includes Firebase ID token in Authorization header when user is authenticated', async () => {
    (auth.currentUser?.getIdToken as any).mockResolvedValueOnce('mock-firebase-id-token');
    (api.post as any).mockResolvedValueOnce({
      secure_url: 'https://res.cloudinary.com/test/image/upload/v1/test.jpg',
      public_id: 'balasangham/test',
      width: 800,
      height: 600,
      format: 'jpg',
    });

    const file = new File(['image-bits'], 'poster.jpg', { type: 'image/jpeg' });
    const result = await uploadFile(file, { title: 'Festival Poster' });

    expect(auth.currentUser?.getIdToken).toHaveBeenCalledTimes(1);
    expect(api.post).toHaveBeenCalledWith(
      '/api/admin/upload',
      expect.any(FormData),
      expect.objectContaining({
        headers: {
          Authorization: 'Bearer mock-firebase-id-token',
        },
      })
    );
    expect(result.secure_url).toBe('https://res.cloudinary.com/test/image/upload/v1/test.jpg');
    expect(result.public_id).toBe('balasangham/test');
  });

  it('falls back to /api/upload if /api/admin/upload fails, preserving token', async () => {
    (auth.currentUser?.getIdToken as any).mockResolvedValueOnce('mock-token');
    (api.post as any)
      .mockRejectedValueOnce(new Error('Endpoint not found'))
      .mockResolvedValueOnce({
        secure_url: 'https://res.cloudinary.com/test/image/upload/v1/fallback.jpg',
        public_id: 'balasangham/fallback',
      });

    const file = new File(['image-bits'], 'poster.jpg', { type: 'image/jpeg' });
    const result = await uploadFile(file);

    expect(api.post).toHaveBeenCalledTimes(2);
    expect(result.secure_url).toBe('https://res.cloudinary.com/test/image/upload/v1/fallback.jpg');
  });

  it('throws clear error when backend endpoints fail and does NOT contact api.cloudinary.com', async () => {
    (auth.currentUser?.getIdToken as any).mockResolvedValueOnce('mock-token');
    (api.post as any)
      .mockRejectedValueOnce(new Error('Forbidden: Admin access required'))
      .mockRejectedValueOnce(new Error('Forbidden: Admin access required'));

    const globalFetchSpy = vi.spyOn(global, 'fetch');

    const file = new File(['image-bits'], 'poster.jpg', { type: 'image/jpeg' });
    await expect(uploadFile(file)).rejects.toThrow(/Forbidden: Admin access required/i);

    expect(globalFetchSpy).not.toHaveBeenCalledWith(
      expect.stringContaining('api.cloudinary.com'),
      expect.anything()
    );
  });
});
