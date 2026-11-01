import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { api } from '@/lib/api';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Loader2 } from 'lucide-react';

/**
 * Transition allowlist of administrator emails.
 * TODO: Remove email fallback once custom claims are confirmed assigned in production.
 */
const ALLOWED_ADMIN_EMAILS = [
  'balasangham.main@gmail.com',
  'admin@balasanghamkannur.org'
];

/**
 * AdminRoute provides client-side route protection (UX gating only).
 * Note: Firestore security rules and server APIs are the real enforcement boundaries.
 */
export default function AdminRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        let isAllowedAdmin = false;
        try {
          const tokenResult = await user.getIdTokenResult();
          const hasAdminClaim = Boolean(tokenResult.claims.admin === true || tokenResult.claims.role === 'admin');
          const email = user.email?.toLowerCase();
          const isEmailVerified = Boolean(user.emailVerified || tokenResult.claims.email_verified === true);
          // Fallback requires email to be in allowlist AND email_verified == true
          const isAllowedEmail = Boolean(isEmailVerified && email && ALLOWED_ADMIN_EMAILS.includes(email));

          isAllowedAdmin = hasAdminClaim || isAllowedEmail;
        } catch {
          const email = user.email?.toLowerCase();
          isAllowedAdmin = Boolean(user.emailVerified && email && ALLOWED_ADMIN_EMAILS.includes(email));
        }

        if (isAllowedAdmin) {
          setIsAuthenticated(true);
          // Ensure backend session is synced
          api.get<{ authenticated?: boolean }>('/api/admin/session').catch(() => {});
        } else {
          // Authenticated non-admin or unverified user: strictly denied
          setIsAuthenticated(false);
        }
      } else {
        try {
          const data = await api.get<{ authenticated?: boolean }>('/api/admin/session');
          setIsAuthenticated(data?.authenticated === true);
        } catch {
          setIsAuthenticated(false);
        }
      }
    });

    return () => unsubscribe();
  }, [location.pathname]); // Re-check if navigation happens, or just on mount

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 text-deep-red animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
