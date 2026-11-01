#!/usr/bin/env node

/**
 * Utility to manage Firebase custom claims for administrator users.
 *
 * Usage:
 *   node scripts/set-admin-claim.js <user-email>
 *   node scripts/set-admin-claim.js <user-email> --revoke
 */

require('dotenv').config();
const { getAdminAuth } = require('../server/firebaseAdmin');

async function main() {
  const args = process.argv.slice(2);
  const email = args[0];
  const isRevoke = args.includes('--revoke') || args.includes('--remove');

  if (!email || !email.includes('@')) {
    console.error('Usage: node scripts/set-admin-claim.js <user-email> [--revoke]');
    console.error('Example: node scripts/set-admin-claim.js convener@balasangham.org');
    process.exit(1);
  }

  console.log(`Connecting to Firebase Admin Auth for ${email}...`);

  let auth;
  try {
    auth = getAdminAuth();
  } catch (err) {
    console.error('ERROR: Could not initialize Firebase Admin SDK. Please set FIREBASE_SERVICE_ACCOUNT_JSON or GOOGLE_APPLICATION_CREDENTIALS in your environment.');
    process.exit(1);
  }

  try {
    const user = await auth.getUserByEmail(email);
    console.log(`User found: ${user.email} (UID: ${user.uid})`);

    const newClaims = isRevoke ? { admin: false } : { admin: true };
    await auth.setCustomUserClaims(user.uid, newClaims);

    console.log(`✓ Successfully ${isRevoke ? 'REVOKED' : 'GRANTED'} admin privileges for ${user.email}`);
    console.log(`Current Custom Claims:`, JSON.stringify(newClaims));
    console.log(`Note: The user must sign out and sign in again (or force token refresh) to reflect the new claims.`);
    process.exit(0);
  } catch (err) {
    console.error(`ERROR: Failed to update claims for ${email}:`, err.message);
    process.exit(1);
  }
}

main();
