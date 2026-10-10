import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '@/lib/api';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Star, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('balasangham.main@gmail.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Authenticate with backend Express session
      await api.post('/api/admin/login', { username, password });
      
      // 2. Authenticate with Firebase Auth client SDK for direct Firestore operations
      try {
        const emailToUse = username.includes('@') ? username : 'balasangham.main@gmail.com';
        await signInWithEmailAndPassword(auth, emailToUse, password);
      } catch (fbErr: any) {
        console.info('Client-side Firebase Auth sign-in status:', fbErr.code || fbErr.message);
      }

      const from = location.state?.from?.pathname || '/admin';
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="p-8 text-center bg-deep-red text-white">
          <Star className="w-12 h-12 mx-auto mb-4 fill-current" />
          <h1 className="text-2xl font-black mb-1">Admin Portal</h1>
          <p className="text-white/80 text-sm">Balasangham Website Management</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="flex items-center gap-2 p-4 text-sm text-red-700 bg-red-50 rounded-xl">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-dark-brown mb-2" htmlFor="username">
                Email / Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-deep-red focus:ring-2 focus:ring-deep-red/20 outline-none transition-all"
                placeholder="admin or email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-dark-brown mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-deep-red focus:ring-2 focus:ring-deep-red/20 outline-none transition-all"
                placeholder="Enter admin password"
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-sm"
            disabled={loading}
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
          </Button>
        </form>
      </div>
    </div>
  );
}
