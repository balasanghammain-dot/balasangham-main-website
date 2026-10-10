import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { api } from '@/lib/api';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Loader2 } from 'lucide-react';

const ALLOWED_ADMIN_EMAILS = [
  'balasangham.main@gmail.com',
  'admin@balasanghamkannur.org'
];

export default function AdminRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const email = user?.email?.toLowerCase();
      const isAllowedAdmin = Boolean(email && ALLOWED_ADMIN_EMAILS.includes(email));

      if (user && isAllowedAdmin) {
        setIsAuthenticated(true);
        // Ensure backend session is synced
        api.get<{ authenticated?: boolean }>('/api/admin/session').catch(() => {});
      } else if (user && !isAllowedAdmin) {
        // Authenticated non-admin user: strictly denied
        setIsAuthenticated(false);
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
