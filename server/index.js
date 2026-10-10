require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const sqlite = require('better-sqlite3');
const SqliteStore = require('better-sqlite3-session-store')(session);
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Database for session store
const sessionDb = new sqlite(path.join(__dirname, 'data', 'sessions.db'));

// Middleware
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (e.g. mobile apps, curl, same-origin)
    if (!origin) return callback(null, true);
    const prodUrl = process.env.PRODUCTION_URL ? process.env.PRODUCTION_URL.replace(/\/$/, '') : null;
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:4173',
      'http://localhost:3001',
      'https://balasanghamkannur.org',
      'https://www.balasanghamkannur.org',
      prodUrl
    ].filter(Boolean);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production' && !process.env.SESSION_SECRET) {
  console.warn('SECURITY WARNING: SESSION_SECRET environment variable is not set. Using default secret in production is unsafe.');
}

app.use(session({
  store: new SqliteStore({
    client: sessionDb,
    expired: {
      clear: true,
      intervalMs: 900000
    }
  }),
  secret: process.env.SESSION_SECRET || 'balasangham-dev-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  }
}));

// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit to support videos
  fileFilter: function (req, file, cb) {
    const allowed = /jpeg|jpg|png|gif|webp|mp4|webm|quicktime|mov|mkv/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase().replace('.', ''));
    const mime = allowed.test(file.mimetype.toLowerCase());
    if (ext || mime) {
      return cb(null, true);
    }
    cb(new Error('Only image (jpeg, jpg, png, webp, gif) and video (mp4, webm, mov) files are allowed'));
  }
});

// Serve uploaded images and videos statically
app.use('/uploads', express.static(uploadsDir));
const publicUploads = path.join(__dirname, '..', 'public', 'uploads');
if (fs.existsSync(publicUploads)) {
  app.use('/uploads', express.static(publicUploads));
}

// Mount Multer on upload endpoints before admin routes
app.use('/api/admin/upload', upload.any());
app.use('/api/admin/media/upload', upload.any());

// Routes
const publicRoutes = require('./routes/public');
const adminRoutes = require('./routes/admin');

app.use('/api/public', publicRoutes);
app.use('/api/admin', adminRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'dist')));
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
  });
}

// Global Error Handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong: ' + (err.message || '') });
});

app.listen(PORT, function() {
  console.log('Server running on port ' + PORT);
});
