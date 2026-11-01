const { initializeApp, getApps, cert, applicationDefault } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore } = require('firebase-admin/firestore');

const ALLOWED_ADMIN_EMAILS = [
  'balasangham.main@gmail.com',
  'admin@balasanghamkannur.org'
];

/**
 * Initializes and returns the Firebase Admin App instance.
 * Checks FIREBASE_SERVICE_ACCOUNT_JSON (JSON string or base64) first,
 * then falls back to application default credentials (GOOGLE_APPLICATION_CREDENTIALS).
 */
function getFirebaseAdmin() {
  const apps = getApps();
  if (apps && apps.length > 0) {
    return apps[0];
  }

  const serviceAccountVar = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (serviceAccountVar) {
    try {
      let rawJson = serviceAccountVar.trim();
      if (!rawJson.startsWith('{')) {
        rawJson = Buffer.from(rawJson, 'base64').toString('utf8');
      }
      const serviceAccount = JSON.parse(rawJson);
      return initializeApp({
        credential: cert(serviceAccount),
        projectId: serviceAccount.project_id || process.env.VITE_FIREBASE_PROJECT_ID || 'balasangam-8e562'
      });
    } catch (err) {
      console.error('[firebaseAdmin] Failed to parse FIREBASE_SERVICE_ACCOUNT_JSON:', err.message);
    }
  }

  try {
    return initializeApp({
      credential: applicationDefault(),
      projectId: process.env.VITE_FIREBASE_PROJECT_ID || 'balasangam-8e562'
    });
  } catch (err) {
    if (process.env.NODE_ENV === 'test') {
      try {
        return initializeApp({}, 'test-app-' + Math.random().toString(36).substring(7));
      } catch {
        return null;
      }
    }
    console.error('[firebaseAdmin] Firebase Admin credentials missing. Please set FIREBASE_SERVICE_ACCOUNT_JSON or GOOGLE_APPLICATION_CREDENTIALS.');
    throw err;
  }
}

/**
 * Returns Firebase Admin Auth service instance.
 */
function getAdminAuth() {
  const app = getFirebaseAdmin();
  return app ? getAuth(app) : getAuth();
}

/**
 * Returns Firebase Admin Firestore service instance.
 */
function getAdminFirestore() {
  const app = getFirebaseAdmin();
  return app ? getFirestore(app) : getFirestore();
}

/**
 * Validates if decoded Firebase ID token has admin privileges.
 * Matches firestore.rules:
 * Primary: custom claim `admin: true` (or `role: 'admin'`)
 * Fallback: email in ALLOWED_ADMIN_EMAILS AND email_verified === true
 *
 * TODO: Remove email fallback once custom claims are confirmed assigned in production
 */
function isUserAdmin(decodedToken) {
  if (!decodedToken) return false;
  if (decodedToken.admin === true || decodedToken.role === 'admin') {
    return true;
  }
  if (decodedToken.email_verified === true && typeof decodedToken.email === 'string') {
    const email = decodedToken.email.toLowerCase();
    return ALLOWED_ADMIN_EMAILS.includes(email);
  }
  return false;
}

module.exports = {
  getFirebaseAdmin,
  getAdminAuth,
  getAdminFirestore,
  isUserAdmin,
  ALLOWED_ADMIN_EMAILS
};
