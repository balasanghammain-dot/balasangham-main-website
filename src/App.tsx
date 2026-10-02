import { useState, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
const MediaPage = lazy(() => import('./pages/MediaPage').then(m => ({ default: m.MediaPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const JoinPage = lazy(() => import('./pages/JoinPage').then(m => ({ default: m.JoinPage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

export default function App() {
  const [anthemOpen, setAnthemOpen] = useState(false);

  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-soft-cream text-dark-brown flex flex-col">
          <Navbar onOpenAnthem={() => setAnthemOpen(true)} />
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

                {/* Media */}
                <Route path="/media" element={<MediaPage />} />

                {/* Engagement & Info */}
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/join" element={<JoinPage />} />

                {/* Legal & Utility */}
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <AnthemModal isOpen={anthemOpen} onClose={() => setAnthemOpen(false)} />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}
