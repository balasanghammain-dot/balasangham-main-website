import { User, IdTokenResult } from 'firebase/auth';

export const ALLOWED_ADMIN_EMAILS = [
  'balasangham.main@gmail.com',
  'admin@balasanghamkannur.org'
];

/**
 * Checks if a Firebase user has administrative privileges.
 * Admin definition (shared across client, server, and Firestore rules):
 * 1. Primary: Custom claim 'admin' === true or 'role' === 'admin'
 * 2. Fallback: Allowlisted email with email_verified === true
 *
 * TODO: Remove email fallback once custom claims are confirmed assigned in production
 */
export async function isUserAdmin(user: User | null, forceRefresh = false): Promise<boolean> {
  if (!user) return false;
  try {
    const tokenResult: IdTokenResult = await user.getIdTokenResult(forceRefresh);
    const claims = tokenResult.claims;

    // 1. Primary: Custom claim check
    if (claims.admin === true || claims.role === 'admin') {
      return true;
    }

    // 2. Fallback: Allowlisted email with verified email
    const email = user.email?.toLowerCase();
    const isEmailVerified = Boolean(user.emailVerified || claims.email_verified === true);
    if (email && ALLOWED_ADMIN_EMAILS.includes(email) && isEmailVerified) {
      return true;
    }

    return false;
  } catch (err) {
    console.error('Failed to verify admin status:', err);
    return false;
  }
}

export interface AdminDiagnosticInfo {
  email: string | null;
  emailVerified: boolean;
  adminClaim: boolean;
  role: string | null;
}

/**
 * Dev-only helper to fetch diagnostic details from a fresh token.
 */
export async function getAdminDiagnosticInfo(user: User | null): Promise<AdminDiagnosticInfo | null> {
  if (!user) return null;
  try {
    const tokenResult = await user.getIdTokenResult(true);
    return {
      email: user.email,
      emailVerified: Boolean(user.emailVerified || tokenResult.claims.email_verified),
      adminClaim: Boolean(tokenResult.claims.admin === true || tokenResult.claims.role === 'admin'),
      role: (tokenResult.claims.role as string) || null
    };
  } catch {
    return {
      email: user.email,
      emailVerified: Boolean(user.emailVerified),
      adminClaim: false,
      role: null
    };
  }
}

export function firebaseErrorMessage(error: unknown, fallback: string): string {
  const code = typeof error === 'object' && error && 'code' in error ? String(error.code) : '';
  if (['auth/invalid-credential', 'auth/wrong-password', 'auth/user-not-found'].includes(code)) {
    return 'Invalid email or password. Please check your credentials.';
  }
  if (code === 'auth/too-many-requests') return 'Too many unsuccessful login attempts. Please try again later.';
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}
