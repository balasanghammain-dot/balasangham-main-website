import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { 
  LayoutDashboard, 
  Calendar, 
  Image as ImageIcon, 
  LogOut, 
  Menu, 
  X,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post('/api/admin/logout');
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout failed', error);
      // Force navigate anyway
      navigate('/admin/login');
    }
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', end: true, icon: LayoutDashboard },
    { name: 'Events', path: '/admin/events', end: false, icon: Calendar },
    { name: 'Media', path: '/admin/media', end: false, icon: ImageIcon },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans text-dark-brown">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-2 text-deep-red font-black">
          <Star className="w-6 h-6 fill-current" />
          <span>Balasangham Admin</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 -mr-2 text-dark-brown"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside 
        className={`
          fixed md:sticky top-0 left-0 z-40 w-64 h-screen bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out flex flex-col
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="hidden md:flex items-center gap-2 p-6 text-deep-red font-black text-xl border-b border-gray-100">
          <Star className="w-6 h-6 fill-current" />
          <span>Admin</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.end}
              onClick={closeMobileMenu}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-colors
                ${isActive 
                  ? 'bg-deep-red/10 text-deep-red' 
                  : 'text-dark-brown/70 hover:bg-gray-100 hover:text-dark-brown'
                }
              `}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-dark-brown/70 hover:text-deep-red hover:bg-deep-red/10"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-dark-brown/20 z-30 md:hidden backdrop-blur-sm"
          onClick={closeMobileMenu}
        />
      )}
    </div>
  );
}
