import { User, IdTokenResult, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase';

export const ALLOWED_ADMIN_EMAILS = [
  'balasangham.main@gmail.com',
  'admin@balasanghamkannur.org'
];

export interface AdminPrivilegeResult {
  isAdmin: boolean;
  reason?: 'unauthenticated' | 'unverified_email' | 'not_admin';
  message?: string;
}

/**
 * Checks if a Firebase user has administrative privileges.
 * Admin definition (shared across client, server, and Firestore rules):
 * 1. Primary: Custom claim 'admin' === true or 'role' === 'admin'
 * 2. Fallback: Lowercased allowlisted email with email_verified === true
 *
 * TODO: Remove email fallback once custom claims are confirmed assigned in production
 */
export async function checkAdminPrivileges(
  user: User | null,
  forceRefresh = false
): Promise<AdminPrivilegeResult> {
  if (!user) {
    return {
      isAdmin: false,
      reason: 'unauthenticated',
      message: 'Not authenticated. Please sign in.'
    };
  }

  try {
    const tokenResult: IdTokenResult = await user.getIdTokenResult(forceRefresh);
    const claims = tokenResult.claims;

    // 1. Primary: Custom claim check
    if (claims.admin === true || claims.role === 'admin') {
      return { isAdmin: true };
    }

    // 2. Fallback: Lowercased allowlisted email with verified email
    const email = user.email ? user.email.trim().toLowerCase() : '';
    const isEmailVerified = Boolean(user.emailVerified || claims.email_verified === true);

    if (email && ALLOWED_ADMIN_EMAILS.includes(email)) {
      if (!isEmailVerified) {
        return {
          isAdmin: false,
          reason: 'unverified_email',
          message: 'Access denied: Admin email is not verified. Please verify your email before accessing the portal.'
        };
      }
      return { isAdmin: true };
    }

    return {
      isAdmin: false,
      reason: 'not_admin',
      message: 'Access denied: This account does not have administrator privileges.'
    };
  } catch (err) {
    console.error('Failed to verify admin status:', err);
    return {
      isAdmin: false,
      reason: 'not_admin',
      message: 'Failed to verify admin privileges.'
    };
  }
}

/**
 * Convenience helper returning boolean admin status.
 */
export async function isUserAdmin(user: User | null, forceRefresh = false): Promise<boolean> {
  const result = await checkAdminPrivileges(user, forceRefresh);
  return result.isAdmin;
}

/**
 * Signs in an admin user, forces fresh token check, and verifies admin claims.
 * Immediately signs out and throws if user lacks admin privileges or has unverified email.
 */
export async function signInAdmin(email: string, password: string): Promise<User> {
  const cleanEmail = email.trim().toLowerCase();
  const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, password);
  const privilege = await checkAdminPrivileges(userCredential.user, true);

  if (!privilege.isAdmin) {
    await signOut(auth);
    throw new Error(privilege.message || 'Access denied: You do not have administrator permissions.');
  }

  return userCredential.user;
}

/**
 * Signs out admin user from Firebase Auth.
 */
export async function signOutAdmin(): Promise<void> {
  await signOut(auth);
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
