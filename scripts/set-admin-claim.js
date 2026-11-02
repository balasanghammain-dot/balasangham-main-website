#!/usr/bin/env node

/**
 * Script to assign or revoke admin custom claims on a Firebase Auth user.
 *
 * Usage:
 *   node scripts/set-admin-claim.js <email-or-uid> [--revoke]
 *   node scripts/set-admin-claim.js balasangham.main@gmail.com
 */

require('dotenv').config();
const { getAdminAuth } = require('../server/firebaseAdmin');

async function main() {
  const args = process.argv.slice(2);
  const targetUser = args.find((a) => !a.startsWith('--')) || process.env.ADMIN_EMAIL || 'balasangham.main@gmail.com';
  const isRevoke = args.includes('--revoke') || args.includes('--remove');

  if (!targetUser) {
    console.error('\n======================================================');
    console.error('Usage: node scripts/set-admin-claim.js <email-or-uid> [--revoke]');
    console.error('Example: node scripts/set-admin-claim.js balasangham.main@gmail.com');
    console.error('======================================================\n');
    process.exit(1);
  }

  let auth;
  try {
    auth = getAdminAuth();
  } catch (err) {
    console.error('\n======================================================');
    console.error('ERROR: Missing Firebase Admin Service Account Credentials');
    console.error('======================================================');
    console.error('Firebase Admin SDK requires service account credentials to manage custom claims.');
    console.error('Please configure one of the following environment variables:');
    console.error('  1. FIREBASE_SERVICE_ACCOUNT_JSON (JSON string or base64 encoded)');
    console.error('  2. GOOGLE_APPLICATION_CREDENTIALS (path to serviceAccountKey.json)');
    console.error('======================================================\n');
    process.exit(1);
  }

  try {
    let userRecord;
    if (targetUser.includes('@')) {
      userRecord = await auth.getUserByEmail(targetUser);
    } else {
      userRecord = await auth.getUser(targetUser);
    }

    const existingClaims = userRecord.customClaims || {};
    const newClaims = isRevoke
      ? { ...existingClaims, admin: false, role: 'member' }
      : { ...existingClaims, admin: true, role: 'admin' };

    await auth.setCustomUserClaims(userRecord.uid, newClaims);

    // Fetch updated user record to verify claims took effect
    const updatedUser = await auth.getUser(userRecord.uid);

    console.log('\n======================================================');
    console.log(`SUCCESS: Admin custom claims successfully ${isRevoke ? 'REVOKED' : 'ASSIGNED'}!`);
    console.log('======================================================');
    console.log(`User UID:               ${updatedUser.uid}`);
    console.log(`Email:                  ${updatedUser.email}`);
    console.log(`Email Verified:         ${Boolean(updatedUser.emailVerified)}`);
    console.log('Resulting Custom Claims:', JSON.stringify(updatedUser.customClaims, null, 2));
    console.log('======================================================');
    console.log('\nCRITICAL NEXT STEP:');
    console.log('The user MUST SIGN OUT and SIGN BACK IN to the website (or trigger a token refresh).');
    console.log('Existing client session tokens do NOT update automatically until re-authentication.');
    console.log('======================================================\n');
    process.exit(0);
  } catch (err) {
    console.error('\n======================================================');
    console.error('ERROR: Failed to update custom claims');
    console.error('======================================================');
    console.error(err.message);
    console.error('======================================================\n');
    process.exit(1);
  }
}

main();
