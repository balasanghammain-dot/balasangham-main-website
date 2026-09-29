import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AnthemModal } from './components/anthem/AnthemModal';
import { ScrollToTop } from './components/common/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { HistoryPage } from './pages/HistoryPage';
import { ObjectivesPage } from './pages/ObjectivesPage';
import { StructurePage } from './pages/StructurePage';
import { LeadershipPage } from './pages/LeadershipPage';
import { AlumniPage } from './pages/AlumniPage';
import { ProgramsPage } from './pages/ProgramsPage';
import { ProgramDetailPage } from './pages/ProgramDetailPage';
import { EventsPage } from './pages/EventsPage';
import { EventDetailPage } from './pages/EventDetailPage';
import { NewsPage } from './pages/NewsPage';
import { NewsDetailPage } from './pages/NewsDetailPage';
import { MediaPage } from './pages/MediaPage';
import { PublicationsPage } from './pages/PublicationsPage';
import { ContactPage } from './pages/ContactPage';
import { JoinPage } from './pages/JoinPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  const [anthemOpen, setAnthemOpen] = useState(false);

  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-surface-cream text-charcoal flex flex-col selection:bg-brand-red selection:text-white">
          <Navbar onOpenAnthem={() => setAnthemOpen(true)} />
          <main className="flex-1 pb-20 md:pb-0">
            <Routes>
              <Route path="/" element={<HomePage onOpenAnthem={() => setAnthemOpen(true)} />} />

              {/* About subtree */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/about/history" element={<HistoryPage />} />
              <Route path="/about/objectives" element={<ObjectivesPage />} />
              <Route path="/about/structure" element={<StructurePage />} />
              <Route path="/about/leadership" element={<LeadershipPage />} />
              <Route path="/about/alumni" element={<AlumniPage />} />

              {/* Programs */}
              <Route path="/programs" element={<ProgramsPage />} />
              <Route path="/programs/:slug" element={<ProgramDetailPage />} />

              {/* Events */}
              <Route path="/events" element={<EventsPage />} />
              <Route path="/events/:slug" element={<EventDetailPage />} />

              {/* News */}
              <Route path="/news" element={<NewsPage />} />
              <Route path="/news/:slug" element={<NewsDetailPage />} />

              {/* Media & Publications */}
              <Route path="/media" element={<MediaPage />} />
              <Route path="/publications" element={<PublicationsPage />} />

              {/* Engagement & Info */}
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/join" element={<JoinPage />} />

              {/* Legal & Utility */}
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
          <AnthemModal isOpen={anthemOpen} onClose={() => setAnthemOpen(false)} />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}
