import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import fs from 'node:fs';

const email = process.argv[2]?.trim().toLowerCase();
const revoke = process.argv.includes('--revoke');
if (!email || email.startsWith('--')) {
  console.error('Usage: node scripts/set-admin-claim.js <email> [--revoke]');
  process.exit(1);
}

const rawJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
let serviceAccount;
try {
  if (rawJson) {
    const text = rawJson.trim().startsWith('{')
      ? rawJson
      : Buffer.from(rawJson, 'base64').toString('utf8');
    serviceAccount = JSON.parse(text);
  } else if (keyPath && fs.existsSync(keyPath)) {
    serviceAccount = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
  }
} catch {
  console.error('Credentials could not be parsed. Check the key file or JSON variable.');
  process.exit(1);
}
if (!serviceAccount) {
  console.error('No credentials. Set GOOGLE_APPLICATION_CREDENTIALS to your key file path.');
  process.exit(1);
}

initializeApp({ credential: cert(serviceAccount) });

try {
  const user = await getAuth().getUserByEmail(email);
  const claims = { ...(user.customClaims || {}) };
  if (revoke) delete claims.admin;
  else claims.admin = true;
  await getAuth().setCustomUserClaims(user.uid, claims);
  const updated = await getAuth().getUser(user.uid);
  console.log(`${revoke ? 'Revoked' : 'Granted'} admin for ${email}`);
  console.log('UID:', user.uid);
  console.log('emailVerified:', updated.emailVerified);
  console.log('claims:', JSON.stringify(updated.customClaims || {}));
  console.log('The user must sign out and back in to get the new claim.');
  process.exit(0);
} catch (err) {
  console.error('Failed:', err.code || err.message);
  if (err.code === 'auth/user-not-found') {
    console.error('That email has no Firebase Auth account yet. Create it in the Firebase Console under Authentication, or sign in once with it.');
  }
  process.exit(1);
}
