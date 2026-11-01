// @vitest-environment node
import { describe, it, expect, vi, beforeAll, afterAll, beforeEach } from 'vitest';
import http from 'http';
import { Writable } from 'stream';

// Mock server/firebaseAdmin.js
const mockVerifyIdToken = vi.fn();
vi.mock('../../server/firebaseAdmin.js', () => {
  return {
    default: {
      getFirebaseAdmin: vi.fn(),
      getAdminAuth: () => ({
        verifyIdToken: mockVerifyIdToken,
      }),
      isUserAdmin: (token: any) => {
        if (!token) return false;
        if (token.admin === true || token.role === 'admin') return true;
        const email = (token.email || '').toLowerCase();
        return email === 'balasangham.main@gmail.com' || email === 'admin@balasanghamkannur.org';
      },
      ALLOWED_ADMIN_EMAILS: ['balasangham.main@gmail.com', 'admin@balasanghamkannur.org'],
    },
  };
});

// Mock cloudinary
const mockUploadStream = vi.fn();
vi.mock('cloudinary', () => ({
  v2: {
    config: vi.fn(),
    uploader: {
      upload_stream: (options: any, callback: any) => {
        mockUploadStream(options);
        const writable = new Writable({
          write(_chunk, _encoding, next) {
            next();
          },
          final(done) {
            if (callback) {
              callback(null, {
                secure_url: 'https://res.cloudinary.com/test-cloud/image/upload/v1/balasangham/sample.jpg',
                public_id: 'balasangham/sample',
                width: 1200,
                height: 800,
                format: 'jpg',
                resource_type: 'image',
                duration: null,
                thumbnail_url: 'https://res.cloudinary.com/test-cloud/image/upload/w_400/sample.jpg',
              });
            }
            done();
          },
        });
        return writable;
      },
    },
    url: vi.fn((id: string) => `https://res.cloudinary.com/test-cloud/image/upload/${id}`),
  },
}));

import handler from '../../api/upload.js';

describe('api/upload.js endpoint security and validation', () => {
  let server: http.Server;
  let serverUrl: string;

  beforeAll(async () => {
    server = http.createServer((req, res) => {
      // Simulate Vercel Node.js serverless response helpers
      (res as any).status = function (code: number) {
        this.statusCode = code;
        return this;
      };
      (res as any).json = function (data: any) {
        this.setHeader('Content-Type', 'application/json');
        this.end(JSON.stringify(data));
        return this;
      };

      handler(req as any, res as any);
    });

    await new Promise<void>((resolve) => {
      server.listen(0, '127.0.0.1', () => {
        const addr = server.address() as any;
        serverUrl = `http://127.0.0.1:${addr.port}/api/upload`;
        resolve();
      });
    });
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => {
      server.close(() => resolve());
    });
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('rejects non-POST methods with 405 Method Not Allowed', async () => {
    const res = await fetch(serverUrl, { method: 'GET' });
    expect(res.status).toBe(405);
    const data = await res.json();
    expect(data.error).toMatch(/method not allowed/i);
  });

  it('rejects unauthenticated requests without Authorization header with 401', async () => {
    const formData = new FormData();
    formData.append('file', new Blob(['test content'], { type: 'image/jpeg' }), 'photo.jpg');

    const res = await fetch(serverUrl, {
      method: 'POST',
      body: formData,
    });

    expect(res.status).toBe(401);
    const data = await res.json();
    expect(data.error).toMatch(/unauthorized/i);
  });

  it('rejects invalid or malformed bearer token with 401', async () => {
    mockVerifyIdToken.mockRejectedValueOnce(new Error('Firebase ID token has expired'));

    const formData = new FormData();
    formData.append('file', new Blob(['test content'], { type: 'image/jpeg' }), 'photo.jpg');

    const res = await fetch(serverUrl, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer invalid-token',
      },
      body: formData,
    });

    expect(res.status).toBe(401);
    const data = await res.json();
    expect(data.error).toMatch(/unauthorized|invalid token/i);
  });

  it('rejects authenticated non-admin user with 403 Forbidden', async () => {
    mockVerifyIdToken.mockResolvedValueOnce({
      uid: 'regular-user',
      email: 'regular.member@gmail.com',
    });

    const formData = new FormData();
    formData.append('file', new Blob(['test content'], { type: 'image/jpeg' }), 'photo.jpg');

    const res = await fetch(serverUrl, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer valid-user-token',
      },
      body: formData,
    });

    expect(res.status).toBe(403);
    const data = await res.json();
    expect(data.error).toMatch(/forbidden|admin access required/i);
  });

  it('rejects unsupported media MIME type with 415', async () => {
    mockVerifyIdToken.mockResolvedValueOnce({
      uid: 'admin-user',
      email: 'balasangham.main@gmail.com',
      admin: true,
    });

    const formData = new FormData();
    formData.append('file', new Blob(['fake binary'], { type: 'application/pdf' }), 'document.pdf');

    const res = await fetch(serverUrl, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer valid-admin-token',
      },
      body: formData,
    });

    expect(res.status).toBe(415);
    const data = await res.json();
    expect(data.error).toMatch(/unsupported media type/i);
  });

  it('rejects oversize files exceeding 50MB with 413 Payload Too Large', async () => {
    mockVerifyIdToken.mockResolvedValueOnce({
      uid: 'admin-user',
      email: 'balasangham.main@gmail.com',
      admin: true,
    });

    const formData = new FormData();
    // 51MB dummy buffer
    const largeBuffer = new Uint8Array(51 * 1024 * 1024);
    formData.append('file', new Blob([largeBuffer], { type: 'image/jpeg' }), 'huge-poster.jpg');

    const res = await fetch(serverUrl, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer valid-admin-token',
      },
      body: formData,
    });

    expect(res.status).toBe(413);
    const data = await res.json();
    expect(data.error).toMatch(/exceeds maximum limit/i);
  });

  it('accepts valid admin upload and uploads to Cloudinary', async () => {
    mockVerifyIdToken.mockResolvedValueOnce({
      uid: 'admin-user',
      email: 'balasangham.main@gmail.com',
      admin: true,
    });

    const formData = new FormData();
    formData.append('file', new Blob(['fake-jpg-content'], { type: 'image/jpeg' }), 'event-poster.jpg');

    const res = await fetch(serverUrl, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer valid-admin-token',
        Origin: 'https://balasanghamkannur.org',
      },
      body: formData,
    });

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.secure_url).toContain('https://res.cloudinary.com/');
    expect(data.public_id).toBe('balasangham/sample');
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('https://balasanghamkannur.org');
  });

  it('restricts CORS origin to allowed domains only', async () => {
    const res = await fetch(serverUrl, {
      method: 'OPTIONS',
      headers: {
        Origin: 'https://evil-attacker.com',
      },
    });

    expect(res.headers.get('Access-Control-Allow-Origin')).toBeNull();
  });
});
