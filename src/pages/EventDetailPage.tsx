import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { ConferenceHero } from '../components/conference/ConferenceHero';
import { EventDetails } from '../components/conference/EventDetails';
import { KalliasseriHeritage } from '../components/conference/KalliasseriHeritage';
import { FlagSongEditorial } from '../components/conference/FlagSongEditorial';
import { VisualArchive } from '../components/conference/VisualArchive';
import { ArrowLeft } from 'lucide-react';

export const EventDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const ml = language === 'ml';

  // Currently Conference 2026 is the primary verified upcoming event
  const isConference2026 = !slug || slug === 'conference-2026' || slug === 'kannur-district-conference-2026';

  if (!isConference2026) {
    return (
      <div className="bg-soft-cream min-h-screen py-24 text-center px-4">
        <h1 className="text-2xl font-bold text-charcoal mb-4">
          {ml ? 'പരിപാടി കണ്ടെത്താനായില്ല' : 'Event Not Found'}
        </h1>
        <p className="text-slate-600 mb-6">
          {ml ? 'ഈ പരിപാടിയെക്കുറിച്ചുള്ള വിവരങ്ങൾ ലഭ്യമല്ല.' : 'Details for this event are not yet published.'}
        </p>
        <Link
          to="/events"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-deep-red text-white font-bold text-sm shadow hover:bg-red-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{ml ? 'എല്ലാ പരിപാടികളിലേക്കും' : 'Back to Events'}</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-soft-cream min-h-screen">
      <Breadcrumb
        items={[
          { label: 'Events', labelMl: 'പരിപാടികൾ', path: '/events' },
          { label: 'District Conference 2026', labelMl: 'ജില്ലാ സമ്മേളനം 2026' },
        ]}
      />

      <ConferenceHero />
      <EventDetails />
      <KalliasseriHeritage />
      <FlagSongEditorial />
      <VisualArchive />
    </div>
  );
};
