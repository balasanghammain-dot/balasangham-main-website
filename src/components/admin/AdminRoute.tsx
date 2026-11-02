import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { isUserAdmin } from '@/lib/firebaseAuth';
import { Loader2 } from 'lucide-react';

/**
 * AdminRoute provides client-side route protection (UX gating only).
 * Note: Firestore security rules and server APIs are the real enforcement boundaries.
 *
 * Strict policy:
 * - Requires Firebase Auth user with admin custom claim (primary) or verified allowlisted email (fallback).
 * - Forces token refresh on mount so newly assigned claims are detected.
 * - Does NOT accept Express session cookie alone when Firebase Auth is null,
 *   preventing unauthenticated users from seeing admin UI where Firestore writes will fail.
 */
export default function AdminRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Force token refresh so newly assigned custom claims are picked up
        const isAdmin = await isUserAdmin(user, true);
        if (isAdmin) {
          setIsAuthenticated(true);
        } else {
          // Authenticated non-admin or unverified user: strictly denied
          setIsAuthenticated(false);
        }
      } else {
        // Unauthenticated in Firebase Auth cannot perform Firestore admin writes.
        // Express cookie alone is NOT accepted.
        setIsAuthenticated(false);
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
