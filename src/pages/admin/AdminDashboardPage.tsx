import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '@/lib/api';
import { 
  Calendar, 
  FileText, 
  Image as ImageIcon, 
  CheckCircle2,
  ArrowRight,
  Loader2
} from 'lucide-react';

interface DashboardStats {
  totalEvents: number;
  publishedEvents: number;
  draftEvents: number;
  totalMedia: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await api.get<DashboardStats>('/api/admin/stats');
        setStats(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-deep-red animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-6 rounded-2xl">
        <h3 className="font-bold text-lg mb-2">Error Loading Dashboard</h3>
        <p>{error}</p>
      </div>
    );
  }

  const statCards = [
    {
      label: 'Total Events',
      value: stats?.totalEvents || 0,
      icon: Calendar,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Published',
      value: stats?.publishedEvents || 0,
      icon: CheckCircle2,
      color: 'bg-green-50 text-green-600',
    },
    {
      label: 'Drafts',
      value: stats?.draftEvents || 0,
      icon: FileText,
      color: 'bg-orange-50 text-orange-600',
    },
    {
      label: 'Total Media',
      value: stats?.totalMedia || 0,
      icon: ImageIcon,
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-dark-brown mb-2">Dashboard</h1>
        <p className="text-dark-brown/60">Overview of your website content.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`p-4 rounded-2xl ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-dark-brown/60 uppercase tracking-wider">{stat.label}</p>
              <p className="text-3xl font-black text-dark-brown">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-black text-dark-brown mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <Link 
              to="/admin/events/new"
              className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-deep-red/5 hover:text-deep-red transition-colors group"
            >
              <div className="flex items-center gap-3 font-bold">
                <Calendar className="w-5 h-5 text-deep-red" />
                Create New Event
              </div>
              <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link 
              to="/admin/media"
              className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-deep-red/5 hover:text-deep-red transition-colors group"
            >
              <div className="flex items-center gap-3 font-bold">
                <ImageIcon className="w-5 h-5 text-deep-red" />
                Manage Media Gallery
              </div>
              <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
