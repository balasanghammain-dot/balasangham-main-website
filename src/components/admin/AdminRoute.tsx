import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { api } from '@/lib/api';
import { Loader2 } from 'lucide-react';

export default function AdminRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await api.get<{ authenticated?: boolean }>('/api/admin/session');
        setIsAuthenticated(data?.authenticated === true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
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
