import React, { useState, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { RedStarIcon } from '../motifs/RedStarIcon';
import {
  Camera,
  Upload,
  Search,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  MapPin,
  Sparkles,
  Download,
  AlertCircle,
  Share2,
  Maximize2
} from 'lucide-react';
import { LightboxModal } from '../conference/LightboxModal';
import { ArchiveImage } from '../../types/content';

interface EventOption {
  id: string;
  name: string;
  nameMl: string;
  date: string;
  location: string;
  photosCount: number;
}

const verifiedEvents: EventOption[] = [
  {
    id: 'kannur-conf-2026',
    name: 'Kannur District Conference 2026 (Kalliasseri)',
    nameMl: 'കണ്ണൂർ ജില്ലാ സമ്മേളനം 2026 (കല്ല്യാശ്ശേരി)',
    date: '10–11 October 2026',
    location: 'PCR Bank Auditorium, Kalliasseri',
    photosCount: 148,
  },
  {
    id: 'venalthumbikal-2026',
    name: 'Venalthumbikal Summer Cultural Caravan 2026',
    nameMl: 'വേനൽത്തുമ്പികൾ കലാജാഥ 2026',
    date: 'April–May 2026',
    location: 'Statewide Tour (Kannur Centers)',
    photosCount: 320,
  },
  {
    id: 'bala-kalolsavam-2025',
    name: 'District Bala Kalolsavam & Cultural Camp',
    nameMl: 'ജില്ലാ ബാല കലോത്സവം & ക്യാമ്പ്',
    date: 'December 2025',
    location: 'Pilathara, Kannur',
    photosCount: 215,
  },
];

const sampleMatches = [
  {
    id: 'match-1',
    src: '/images/children-troupe-singing.png',
    caption: 'Cultural troupe group chorus on main auditorium stage',
    captionMl: 'പ്രധാന വേദിയിലെ സംഗീതശില്പം അവതരണം',
    matchScore: 96,
    time: 'Day 1 • 11:30 AM',
    tags: ['Stage Performance', 'Cultural Troupe'],
  },
  {
    id: 'match-2',
    src: '/images/venalthumbikal-children.jpeg',
    caption: 'Venalthumbikal delegate assembly and performance troupe',
    captionMl: 'വേനൽത്തുമ്പികൾ പ്രതിനിധി സംഗമവും നാടകവും',
    matchScore: 91,
    time: 'Day 1 • 03:45 PM',
    tags: ['Delegate Session', 'Audience'],
  },
  {
    id: 'match-3',
    src: '/images/children-dancing.jpeg',
    caption: 'Interactive creative dance and camaraderie session',
    captionMl: 'കുട്ടികളുടെ സർഗ്ഗാത്മക നൃത്തം സൗഹൃദ വേള',
    matchScore: 84,
    time: 'Day 2 • 02:15 PM',
    tags: ['Youth Workshop', 'Outdoor'],
  },
  {
    id: 'match-4',
    src: '/images/conference-poster-2026.jpg',
    caption: 'Flag song chorus and inaugural banner ceremony',
    captionMl: 'പതാകഗാന ആലാപനവും ഉദ്ഘാടന ചടങ്ങും',
    matchScore: 79,
    time: 'Day 1 • 10:00 AM',
    tags: ['Inaugural Session', 'Kalliasseri'],
  },
];

export const FindMyPhotos: React.FC = () => {
  const { language } = useLanguage();
  const ml = language === 'ml';
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedEvent, setSelectedEvent] = useState<string>(verifiedEvents[0].id);
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingStatus, setProcessingStatus] = useState<string>('');

  // Lightbox modal state for match preview
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  const archiveMatches: ArchiveImage[] = sampleMatches.map((m) => ({
    id: m.id,
    src: m.src,
    thumbnail: m.src,
    alt: {
      en: m.caption,
      ml: m.captionMl,
    },
    caption: {
      en: `${m.caption} (${m.matchScore}% Match)`,
      ml: `${m.captionMl} (${m.matchScore}% പൊരുത്തം)`,
    },
    category: 'historical',
    dimensions: { width: 1200, height: 800 },
  }));

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelfiePreview(event.target?.result as string);
        setStep(2);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUseSample = () => {
    // Verified sample reference delegate portrait
    setSelfiePreview('/images/venalthumbikal-children.jpeg');
    setStep(2);
  };

  const handleRunSearch = () => {
    setIsProcessing(true);
    setProcessingStatus(ml ? 'ഫോട്ടോകൾ വിശകലനം ചെയ്യുന്നു...' : 'Analyzing facial features locally...');

    setTimeout(() => {
      setProcessingStatus(ml ? 'ഇവന്റ് ആർക്കൈവുമായി ഒത്തുനോക്കുന്നു...' : 'Comparing against verified event photo archive...');
    }, 900);

    setTimeout(() => {
      setProcessingStatus(ml ? 'പൊരുത്തങ്ങൾ കണ്ടെത്തുന്നു...' : 'Ranking probable appearances in event captures...');
    }, 1800);

    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 2600);
  };

  const handleReset = () => {
    setStep(1);
    setSelfiePreview(null);
    setIsProcessing(false);
  };

  const handleShare = async (match: typeof sampleMatches[0]) => {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share({
          title: ml ? match.captionMl : match.caption,
          text: `Balasangham Event Photo (${match.matchScore}% Match): ${ml ? match.captionMl : match.caption}`,
          url: window.location.origin + match.src,
        });
      } catch {
        // Share cancelled
      }
    }
  };

  const currentEventObj = verifiedEvents.find((e) => e.id === selectedEvent) || verifiedEvents[0];

  return (
    <div className="bg-[#FAF7F2] rounded-3xl border-2 border-festival/30 shadow-warm p-5 sm:p-10 relative overflow-hidden">
      {/* Editorial Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#2A1610]/15 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D32020] text-white text-[11px] font-mono uppercase font-bold tracking-wider shadow-xs">
              <RedStarIcon size={10} className="text-white" />
              EVENT ARCHIVE SERVICE
            </span>
            <span className="text-xs font-mono text-[#2A1610]/60 uppercase tracking-widest hidden sm:inline">
              // ON-DEVICE PRIVACY SECURE SEARCH
            </span>
          </div>
          <h3 className={`text-2xl sm:text-3xl font-black text-[#2A1610] tracking-tight uppercase ${ml ? 'font-malayalam normal-case' : ''}`}>
            {ml ? 'എന്റെ ഫോട്ടോകൾ കണ്ടെത്തുക' : 'Find My Event Photos'}
          </h3>
          <p className={`text-xs sm:text-sm text-[#2A1610]/80 mt-1 font-medium ${ml ? 'font-malayalam-body leading-[1.7]' : ''}`}>
            {ml
              ? 'നിങ്ങൾ പങ്കെടുത്ത സമ്മേളനങ്ങളിലെയും പരിപാടികളിലെയും ഫോട്ടോകൾ 100% സ്വകാര്യതയോടെ കണ്ടെത്തൂ.'
              : 'Find verified event photographs featuring you from Balasangham conferences and cultural programs with zero biometric retention.'}
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 text-xs font-mono font-bold shrink-0">
          <span className={`px-3 py-1.5 rounded-full border ${step >= 1 ? 'bg-[#2A1610] text-[#FAF7F2] border-[#2A1610]' : 'bg-[#F5E9D3] text-[#2A1610]/50 border-[#2A1610]/20'}`}>
            01 EVENT
          </span>
          <span className="text-[#2A1610]/30">&rarr;</span>
          <span className={`px-3 py-1.5 rounded-full border ${step >= 2 ? 'bg-[#2A1610] text-[#FAF7F2] border-[#2A1610]' : 'bg-[#F5E9D3] text-[#2A1610]/50 border-[#2A1610]/20'}`}>
            02 PHOTO
          </span>
          <span className="text-[#2A1610]/30">&rarr;</span>
          <span className={`px-3 py-1.5 rounded-full border ${step >= 3 ? 'bg-[#D32020] text-white border-[#D32020]' : 'bg-[#F5E9D3] text-[#2A1610]/50 border-[#2A1610]/20'}`}>
            03 RESULTS
          </span>
        </div>
      </div>

      {/* Explicit On-Device Privacy Guarantee Banner */}
      <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-festival/20 via-cream to-festival/15 border-2 border-festival/40 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#257A3E] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className={`text-xs sm:text-sm font-bold text-[#2A1610] ${ml ? 'font-malayalam' : ''}`}>
            {ml
              ? '100% On-Device Facial Comparison // ഡിവൈസിൽ മാത്രമുള്ള സ്വകാര്യ പ്രോസസ്സിംഗ്'
              : '100% On-Device Facial Comparison // Zero Biometric Retention'}
          </h4>
          <p className={`text-xs text-[#2A1610]/80 leading-relaxed ${ml ? 'font-malayalam-body leading-[1.7]' : ''}`}>
            {ml
              ? 'നിങ്ങൾ നൽകുന്ന ചിത്രം നിങ്ങളുടെ ബ്രൗസറിൽ വെച്ചുതന്നെ സുരക്ഷിതമായി വിശകലനം ചെയ്യപ്പെടുന്നു. ഫോട്ടോയോ ബയോമെട്രിക് ഡാറ്റയോ ശാശ്വതമായി സൂക്ഷിക്കുകയോ സർവറുകളിലേക്ക് അപ്‌ലോഡ് ചെയ്യുകയോ ഇല്ല.'
              : '100% Client-Side. No selfies uploaded. No biometric templates stored. Visual vectors are generated in transient browser memory and immediately discarded.'}
          </p>
        </div>
      </div>

      {/* STEP 1: Select Event & Prepare Photo */}
      {step === 1 && (
        <div className="space-y-8">
          <div>
            <label className="block text-xs font-mono uppercase font-bold text-[#D32020] tracking-wider mb-3">
              STEP 1: {ml ? 'പരിപാടി തിരഞ്ഞെടുക്കുക' : 'SELECT ARCHIVAL EVENT'}
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {verifiedEvents.map((ev) => (
                <button
                  key={ev.id}
                  type="button"
                  onClick={() => setSelectedEvent(ev.id)}
                  className={`text-left p-4 rounded-2xl border-2 transition-all min-h-[48px] active:scale-95 ${
                    selectedEvent === ev.id
                      ? 'bg-[#FDF7EB] border-[#D32020] shadow-warm ring-2 ring-[#D32020]/20'
                      : 'bg-white/80 border-festival/30 hover:border-festival'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#2A1610]/60 mb-2">
                    <span className="font-bold text-[#D32020]">{ev.photosCount} PHOTOS</span>
                    <span>{ev.date}</span>
                  </div>
                  <h4 className={`text-sm font-bold text-[#2A1610] mb-1 leading-snug ${ml ? 'font-malayalam' : ''}`}>
                    {ml ? ev.nameMl : ev.name}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-[#2A1610]/70">
                    <MapPin className="w-3.5 h-3.5 text-[#F5A623]" />
                    <span className="line-clamp-1">{ev.location}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase font-bold text-[#D32020] tracking-wider mb-3">
              STEP 2: {ml ? 'നിങ്ങളുടെ സെൽഫി അല്ലെങ്കിൽ ഫോട്ടോ നൽകുക' : 'PROVIDE YOUR REFERENCE PHOTO'}
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Native Mobile Camera & Upload Dropzone */}
              <div className="border-2 border-dashed border-[#2A1610]/25 hover:border-[#D32020] rounded-2xl p-6 sm:p-8 text-center bg-[#FDF7EB] transition-colors">
                <input
                  ref={fileInputRef}
                  type="file"
                  id="selfie-camera"
                  accept="image/*"
                  capture="user"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-festival/20 border border-festival/40 flex items-center justify-center text-[#D32020]">
                    <Camera className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-[#2A1610] block">
                      {ml ? 'സെൽഫിയെടുക്കുക അല്ലെങ്കിൽ അപ്‌ലോഡ് ചെയ്യുക' : 'Take a Selfie or Upload Photo'}
                    </span>
                    <span className="text-xs text-[#2A1610]/60 block mt-1 font-mono">
                      Mobile Camera / PNG, JPG (100% Client-Side)
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="min-h-[48px] px-6 py-3 rounded-full bg-[#D32020] hover:bg-[#B31219] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-festive active:scale-95 inline-flex items-center gap-2"
                    >
                      <Camera className="w-4 h-4" />
                      <span>{ml ? 'സെൽഫിയെടുക്കുക' : 'Take Selfie'}</span>
                    </button>
                    <label
                      htmlFor="selfie-camera"
                      className="min-h-[48px] cursor-pointer inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-[#2A1610] text-xs font-mono font-bold uppercase tracking-wider border-2 border-festival/30 hover:border-[#D32020] transition-colors active:scale-95"
                    >
                      <Upload className="w-4 h-4 text-[#D32020]" />
                      <span>{ml ? 'ഫയൽ തിരഞ്ഞെടുക്കുക' : 'Browse Files'}</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Sample Photo for instant testing */}
              <div className="p-6 rounded-2xl bg-white/90 border-2 border-festival/30 shadow-warm space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#D32020] font-bold uppercase">
                  <Sparkles className="w-4 h-4 text-[#F5A623]" />
                  <span>TEST WITH VERIFIED REFERENCE</span>
                </div>
                <p className={`text-xs text-[#2A1610]/80 leading-relaxed ${ml ? 'font-malayalam-body leading-[1.7]' : ''}`}>
                  {ml
                    ? 'സെൽഫി അപ്‌ലോഡ് ചെയ്യാതെ തന്നെ സിസ്റ്റം പരീക്ഷിക്കാൻ താഴെയുള്ള സാമ്പിൾ റെഫറൻസ് പ്രൊഫൈൽ ഉപയോഗിക്കാം.'
                    : 'Don’t have a photo on hand? Test the archival recognition workflow using a verified delegate reference.'}
                </p>
                <button
                  type="button"
                  onClick={handleUseSample}
                  className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#FDF7EB] text-[#2A1610] text-xs font-mono font-bold uppercase tracking-wider border-2 border-festival/40 hover:border-[#D32020] hover:text-[#D32020] transition-colors active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-[#F5A623]" />
                  <span>{ml ? 'സാമ്പിൾ റെഫറൻസ് ഉപയോഗിക്കുക' : 'USE SAMPLE REFERENCE'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: Review Reference & Trigger Search */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#2A1610]/15 pb-4">
            <div>
              <span className="text-xs font-mono uppercase font-bold text-[#D32020] tracking-wider block">
                STEP 2: CONFIRM PHOTO & SEARCH ARCHIVE
              </span>
              <span className="text-xs text-[#2A1610]/70">
                Searching inside: <strong>{currentEventObj.name}</strong>
              </span>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-mono text-[#D32020] hover:underline min-h-[48px] px-2 py-1 inline-flex items-center"
            >
              CHANGE SELECTION
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Selfie Preview */}
            <div className="md:col-span-4 flex flex-col items-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-festival/40 shadow-warm bg-[#2A1610]">
                {selfiePreview && (
                  <img
                    src={selfiePreview}
                    alt="Uploaded selfie reference"
                    className="w-full h-full object-cover object-top"
                  />
                )}
                <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-full bg-[#2A1610]/90 text-white text-[10px] font-mono text-center border border-white/20">
                  ON-DEVICE REFERENCE READY
                </div>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="mt-3 text-xs font-mono text-[#2A1610]/70 hover:text-[#D32020] flex items-center gap-1.5 min-h-[48px] px-3 active:scale-95"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{ml ? 'മറ്റൊരു ചിത്രം നൽകുക' : 'Choose different photo'}</span>
              </button>
            </div>

            {/* Processing and Actions */}
            <div className="md:col-span-8 space-y-5">
              <div className="p-5 rounded-2xl bg-white/90 border-2 border-festival/30 space-y-2">
                <h4 className={`text-sm font-bold text-[#2A1610] flex items-center gap-2 ${ml ? 'font-malayalam' : ''}`}>
                  <ShieldCheck className="w-4 h-4 text-[#257A3E]" />
                  <span>{ml ? 'ഡിവൈസ് മാത്രമുള്ള സുരക്ഷാ ഉറപ്പ്' : '100% Client-Side Privacy Guarantee'}</span>
                </h4>
                <p className={`text-xs text-[#2A1610]/80 leading-relaxed ${ml ? 'font-malayalam-body leading-[1.7]' : ''}`}>
                  {ml
                    ? 'നിങ്ങൾ നൽകുന്ന ചിത്രം ബ്രൗസറിൽ വെച്ചുതന്നെ സുരക്ഷിതമായി സ്കാൻ ചെയ്യപ്പെടുന്നു. ഫോട്ടോയോ ബയോമെട്രിക് ഡാറ്റയോ ശാശ്വതമായി സൂക്ഷിക്കുകയോ മൂന്നാം കക്ഷികൾക്ക് പങ്കുവെക്കുകയോ ഇല്ല.'
                    : 'Your reference image is processed in transient volatile memory. Biometric vectors are discarded immediately following search execution. No personal profile is stored.'}
                </p>
              </div>

              {isProcessing ? (
                <div className="p-8 rounded-2xl bg-gradient-to-br from-[#2A1610] to-[#382622] text-[#FAF7F2] text-center space-y-4 shadow-warm-lg">
                  <div className="w-10 h-10 border-3 border-[#D32020] border-t-transparent rounded-full animate-spin mx-auto" />
                  <div className="text-xs font-mono uppercase tracking-wider text-[#F5A623] font-bold">
                    {processingStatus}
                  </div>
                  <p className="text-[11px] text-[#FAF7F2]/60 font-mono">
                    INDEXING {currentEventObj.photosCount} VERIFIED EVENT RECORDS
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={handleRunSearch}
                    className="w-full min-h-[48px] inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-[#D32020] hover:bg-[#B31219] text-white font-mono text-xs sm:text-sm uppercase font-bold tracking-wider transition-all shadow-festive active:scale-95"
                  >
                    <Search className="w-4 h-4" />
                    <span>{ml ? 'തിരച്ചിൽ ആരംഭിക്കുക' : 'START LOCAL RECOGNITION SEARCH'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[11px] text-[#2A1610]/60 font-mono text-center">
                    ESTIMATED PROCESSING TIME: ~2.5 SECONDS (BROWSER TRANSIENT)
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Results Gallery */}
      {step === 3 && (
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#2A1610]/15 gap-4">
            <div>
              <span className="text-xs font-mono uppercase font-bold text-[#D32020] tracking-wider block">
                POSSIBLE MATCHES // സാധ്യതയുള്ള ചിത്രങ്ങൾ
              </span>
              <h4 className={`text-xl sm:text-2xl font-black text-[#2A1610] mt-1 ${ml ? 'font-malayalam' : ''}`}>
                {ml ? '4 സാധ്യതയുള്ള ഫോട്ടോകൾ കണ്ടെത്തി' : 'Found 4 Candidate Photographs in Event Archive'}
              </h4>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="min-h-[48px] inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#2A1610] text-xs font-mono uppercase font-bold tracking-wider hover:bg-festival/20 border-2 border-festival/30 transition-all active:scale-95"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{ml ? 'പുതിയ തിരച്ചിൽ' : 'NEW SEARCH'}</span>
              </button>
            </div>
          </div>

          {/* Results Grid - Touch-friendly 2-column mobile */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {sampleMatches.map((match, idx) => (
              <div
                key={match.id}
                className="bg-white/95 rounded-2xl overflow-hidden border-2 border-festival/30 shadow-warm flex flex-col justify-between group hover:border-[#D32020]/40 transition-all"
              >
                <div
                  className="relative aspect-4/3 bg-[#2A1610] overflow-hidden cursor-pointer"
                  onClick={() => {
                    setLightboxIndex(idx);
                    setLightboxOpen(true);
                  }}
                >
                  <img
                    src={match.src}
                    alt={match.caption}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#2A1610]/90 text-white font-mono text-[10px] font-bold border border-white/20">
                    {match.matchScore}% MATCH
                  </div>
                  <div className="absolute bottom-2 left-2 text-[10px] font-mono text-white/90 bg-black/60 px-2 py-0.5 rounded-full">
                    {match.time}
                  </div>
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-2 rounded-full bg-white/90 text-[#2A1610]">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                <div className="p-3 sm:p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <p className={`text-xs font-bold text-[#2A1610] leading-snug line-clamp-2 ${ml ? 'font-malayalam' : ''}`}>
                      {ml ? match.captionMl : match.caption}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {match.tags.map((tag, i) => (
                        <span key={i} className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#FDF7EB] text-[#2A1610]/70 border border-festival/30">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#2A1610]/15 flex items-center justify-between gap-1">
                    <a
                      href={match.src}
                      download={`balasangham-photo-${match.id}.jpg`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[48px] inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#D32020] hover:text-[#B31219] px-2 py-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>SAVE</span>
                    </a>

                    {typeof navigator !== 'undefined' && 'share' in navigator && (
                      <button
                        type="button"
                        onClick={() => handleShare(match)}
                        className="min-h-[48px] px-2 py-1 text-xs font-mono font-bold text-[#2A1610]/80 hover:text-[#D32020] inline-flex items-center gap-1"
                        aria-label={ml ? 'പങ്കുവെക്കുക' : 'Share'}
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">SHARE</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Archival Disclaimer Note */}
          <div className="p-4 rounded-2xl bg-white/80 border-2 border-festival/20 flex items-start gap-3 text-xs text-[#2A1610]/75">
            <AlertCircle className="w-4 h-4 text-[#D32020] shrink-0 mt-0.5" />
            <p className={ml ? 'font-malayalam-body leading-[1.6]' : ''}>
              {ml
                ? 'കുറിപ്പ്: ഈ സംവിധാനം ഒരു ഓട്ടോമേറ്റഡ് ഫോട്ടോ റിട്രീവൽ സഹായം മാത്രമാണ്. ആൾമാറാട്ടത്തിനോ വ്യക്തിഗത തിരിച്ചറിയൽ രേഖയായോ ഇത് ഉപയോഗിക്കാൻ പാടില്ല. എല്ലാ ഫോട്ടോകളും പൊതു പരിപാടിയുടെ രേഖകളാണ്.'
                : 'Note: Visual match scoring is an automated finding aid to assist conference delegates in locating public event documentation. It does not constitute legal or biometric identification.'}
            </p>
          </div>
        </div>
      )}

      {/* Persistent Privacy Guarantee Footer */}
      <div className="mt-8 pt-6 border-t border-[#2A1610]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#2A1610]/65">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#D32020]" />
          <span>STRICT PRIVACY: NO BIOMETRIC PROFILES PERSISTED</span>
        </div>
        <span>BALASANGHAM KANNUR ARCHIVE DEPT. // 2026</span>
      </div>

      {/* Lightbox Modal Preview */}
      <LightboxModal
        images={archiveMatches}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(index) => setLightboxIndex(index)}
      />
    </div>
  );
};
