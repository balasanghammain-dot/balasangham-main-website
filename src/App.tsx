import { useState, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AnthemModal } from './components/anthem/AnthemModal';
import { ScrollToTop } from './components/common/ScrollToTop';

// Immediate load for primary Landing Page
import { HomePage } from './pages/HomePage';

// Lazy-loaded route subpages for code-splitting
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const HistoryPage = lazy(() => import('./pages/HistoryPage').then(m => ({ default: m.HistoryPage })));
const ObjectivesPage = lazy(() => import('./pages/ObjectivesPage').then(m => ({ default: m.ObjectivesPage })));
const StructurePage = lazy(() => import('./pages/StructurePage').then(m => ({ default: m.StructurePage })));
const LeadershipPage = lazy(() => import('./pages/LeadershipPage').then(m => ({ default: m.LeadershipPage })));
const AlumniPage = lazy(() => import('./pages/AlumniPage').then(m => ({ default: m.AlumniPage })));
const EventsPage = lazy(() => import('./pages/EventsPage').then(m => ({ default: m.EventsPage })));
const EventDetailPage = lazy(() => import('./pages/EventDetailPage').then(m => ({ default: m.EventDetailPage })));
const SnapSharePage = lazy(() => import('./pages/SnapSharePage').then(m => ({ default: m.SnapSharePage })));
const MediaPage = lazy(() => import('./pages/MediaPage').then(m => ({ default: m.MediaPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const JoinPage = lazy(() => import('./pages/JoinPage').then(m => ({ default: m.JoinPage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// Admin subpages
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'));
const AdminRoute = lazy(() => import('./components/admin/AdminRoute'));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'));
const AdminEventsPage = lazy(() => import('./pages/admin/AdminEventsPage'));
const AdminEventEditorPage = lazy(() => import('./pages/admin/AdminEventEditorPage'));
const AdminMediaPage = lazy(() => import('./pages/admin/AdminMediaPage'));

function AppContent() {
  const [anthemOpen, setAnthemOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className={`min-h-screen ${isAdmin ? 'bg-gray-50' : 'bg-soft-cream text-dark-brown'} flex flex-col`}>
      {!isAdmin && <Navbar onOpenAnthem={() => setAnthemOpen(true)} />}
      <main id="main-content" className="flex-1">
        <Suspense
          fallback={
            <div className="min-h-[50vh] flex items-center justify-center" aria-label="Loading page content">
              <div className="w-8 h-8 rounded-full border-3 border-sun-primary border-t-deep-red animate-spin" />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage onOpenAnthem={() => setAnthemOpen(true)} />} />

            {/* About subtree */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about/history" element={<HistoryPage />} />
            <Route path="/about/objectives" element={<ObjectivesPage />} />
            <Route path="/about/structure" element={<StructurePage />} />
            <Route path="/about/leadership" element={<LeadershipPage />} />
            <Route path="/about/alumni" element={<AlumniPage />} />

            {/* Events */}
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:slug" element={<EventDetailPage />} />
            <Route path="/events/:slug/snapshare" element={<SnapSharePage />} />

            {/* Media */}
            <Route path="/media" element={<MediaPage />} />

            {/* Engagement & Info */}
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/join" element={<JoinPage />} />

            {/* Legal & Utility */}
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />

            {/* Admin Portal */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminRoute />}>
              <Route element={<AdminLayout />}>
                <Route index element={<AdminDashboardPage />} />
                <Route path="events" element={<AdminEventsPage />} />
                <Route path="events/new" element={<AdminEventEditorPage />} />
                <Route path="events/:id" element={<AdminEventEditorPage />} />
                <Route path="events/:id/edit" element={<AdminEventEditorPage />} />
                <Route path="media" element={<AdminMediaPage />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <AnthemModal isOpen={anthemOpen} onClose={() => setAnthemOpen(false)} />}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppContent />
      </BrowserRouter>
    </LanguageProvider>
  );
}
