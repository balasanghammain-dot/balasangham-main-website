import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import firebaseAdminPkg from '../server/firebaseAdmin.js';
const { getAdminAuth, isUserAdmin } = firebaseAdminPkg;

// Configure Cloudinary strictly from server environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'video/mp4',
  'video/webm',
  'video/quicktime'
];

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 1
  },
  fileFilter: (_req, file, cb) => {
    const mime = (file.mimetype || '').toLowerCase();
    if (!ALLOWED_MIME_TYPES.includes(mime)) {
      const err = new Error('Unsupported Media Type');
      err.code = 'UNSUPPORTED_MEDIA_TYPE';
      return cb(err);
    }
    cb(null, true);
  }
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

function getCorsAllowedOrigin(origin) {
  if (!origin) return null;
  const customOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map((s) => s.trim().replace(/\/$/, '')).filter(Boolean)
    : [];

  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:4173',
    'http://localhost:3001',
    'https://balasanghamkannur.org',
    'https://www.balasanghamkannur.org',
    'https://balasangam-8e562.web.app',
    'https://balasangam-8e562.firebaseapp.com',
    process.env.PRODUCTION_URL ? process.env.PRODUCTION_URL.replace(/\/$/, '') : null,
    ...customOrigins
  ].filter(Boolean);

  const cleanOrigin = origin.replace(/\/$/, '');
  if (
    allowedOrigins.includes(cleanOrigin) ||
    (process.env.NODE_ENV !== 'production' && cleanOrigin.endsWith('.vercel.app'))
  ) {
    return origin;
  }
  return null;
}

export default async function handler(req, res) {
  // 1. CORS headers
  const origin = req.headers.origin;
  const matchedOrigin = getCorsAllowedOrigin(origin);
  if (matchedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', matchedOrigin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Vary', 'Origin');
  }

  res.setHeader(
    'Access-Control-Allow-Headers',
    'Authorization, Content-Type, X-Requested-With, Accept'
  );
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 2. Authentication verification BEFORE parsing body or touching Cloudinary
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid Authorization header' });
  }

  const idToken = authHeader.substring(7).trim();
  if (!idToken) {
    return res.status(401).json({ error: 'Unauthorized: Empty token' });
  }

  let decodedToken;
  try {
    const auth = getAdminAuth();
    decodedToken = await auth.verifyIdToken(idToken, true);
  } catch (tokenErr) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }

  // 3. Authorization check
  if (!isUserAdmin(decodedToken)) {
    return res.status(403).json({ error: 'Forbidden: Admin access required' });
  }

  // 4. Parse multipart stream with strict limits and MIME filters
  try {
    await runMiddleware(req, res, upload.any());
  } catch (multerErr) {
    if (multerErr.code === 'UNSUPPORTED_MEDIA_TYPE') {
      return res.status(415).json({ error: 'Unsupported media type' });
    }
    if (multerErr.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ error: 'File size exceeds maximum limit of 50MB' });
    }
    return res.status(400).json({ error: 'Invalid upload request payload' });
  }

  const file = req.files && req.files[0];
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // 5. Stream upload to Cloudinary
  try {
    const isVideo = file.mimetype.startsWith('video/') || /\.(mp4|webm|mov|mkv)$/i.test(file.originalname);
    const resourceType = isVideo ? 'video' : 'image';
    const folder = isVideo ? 'balasangham/media/videos' : 'balasangham';

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: resourceType,
          transformation: isVideo ? undefined : [{ quality: 'auto', fetch_format: 'auto' }]
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      uploadStream.end(file.buffer);
    });

    return res.status(200).json({
      url: uploadResult.secure_url,
      secure_url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      publicId: uploadResult.public_id,
      width: uploadResult.width,
      height: uploadResult.height,
      format: uploadResult.format,
      resource_type: uploadResult.resource_type,
      duration: uploadResult.duration,
      thumbnail_url: uploadResult.thumbnail_url || uploadResult.secure_url
    });
  } catch (uploadErr) {
    // Never expose Cloudinary credentials or internal stack traces
    return res.status(500).json({ error: 'Media upload failed. Please try again.' });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
