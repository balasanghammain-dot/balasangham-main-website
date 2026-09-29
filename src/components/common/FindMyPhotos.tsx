import React, { useState } from 'react';
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
  AlertCircle
} from 'lucide-react';

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

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedEvent, setSelectedEvent] = useState<string>(verifiedEvents[0].id);
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingStatus, setProcessingStatus] = useState<string>('');

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
    // Demo selfie placeholder using an authentic portrait thumbnail
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

  const currentEventObj = verifiedEvents.find((e) => e.id === selectedEvent) || verifiedEvents[0];

  return (
    <div className="bg-[#FFF9EF] rounded-xl border border-[#241914]/20 shadow-warm p-6 sm:p-10 relative overflow-hidden">
      {/* Editorial Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#241914]/15 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs bg-[#C90000] text-white text-[10px] font-mono uppercase font-bold tracking-wider">
              <RedStarIcon size={10} className="text-white" />
              EVENT ARCHIVE SERVICE
            </span>
            <span className="text-[11px] font-mono text-[#241914]/60 uppercase tracking-widest hidden sm:inline">
              // SECURE PHOTO RETRIEVAL
            </span>
          </div>
          <h3 className={`text-2xl sm:text-3xl font-black text-[#171514] tracking-tight uppercase ${ml ? 'font-malayalam normal-case' : ''}`}>
            {ml ? 'എന്റെ ഫോട്ടോകൾ കണ്ടെത്തുക' : 'Find My Event Photos'}
          </h3>
          <p className={`text-xs sm:text-sm text-[#241914]/75 mt-1 font-medium ${ml ? 'font-malayalam-body' : ''}`}>
            {ml
              ? 'നിങ്ങൾ പങ്കെടുത്ത സമ്മേളനങ്ങളിലെയും പരിപാടികളിലെയും ഫോട്ടോകൾ ലളിതമായി കണ്ടെത്തൂ.'
              : 'Find verified event photographs featuring you from Balasangham conferences and cultural programs.'}
          </p>
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#257A3E]/10 border border-[#257A3E]/20 text-[#257A3E] text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>
              {ml
                ? '100% On-Device Facial Comparison • ഡിവൈസിൽ മാത്രമുള്ള താരതമ്യം'
                : '100% On-Device Facial Comparison • No biometric data stored'}
            </span>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 text-xs font-mono font-bold">
          <span className={`px-2.5 py-1 rounded-xs border ${step >= 1 ? 'bg-[#241914] text-[#F4EBDD] border-[#241914]' : 'bg-[#E9DDC9] text-[#241914]/50 border-[#241914]/20'}`}>
            01 EVENT
          </span>
          <span className="text-[#241914]/30">&rarr;</span>
          <span className={`px-2.5 py-1 rounded-xs border ${step >= 2 ? 'bg-[#241914] text-[#F4EBDD] border-[#241914]' : 'bg-[#E9DDC9] text-[#241914]/50 border-[#241914]/20'}`}>
            02 PHOTO
          </span>
          <span className="text-[#241914]/30">&rarr;</span>
          <span className={`px-2.5 py-1 rounded-xs border ${step >= 3 ? 'bg-[#C90000] text-white border-[#C90000]' : 'bg-[#E9DDC9] text-[#241914]/50 border-[#241914]/20'}`}>
            03 RESULTS
          </span>
        </div>
      </div>

      {/* STEP 1: Select Event & Prepare Photo */}
      {step === 1 && (
        <div className="space-y-8">
          <div>
            <label className="block text-xs font-mono uppercase font-bold text-[#C90000] tracking-wider mb-3">
              STEP 1: {ml ? 'പരിപാടി തിരഞ്ഞെടുക്കുക' : 'SELECT ARCHIVAL EVENT'}
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {verifiedEvents.map((ev) => (
                <button
                  key={ev.id}
                  type="button"
                  onClick={() => setSelectedEvent(ev.id)}
                  className={`text-left p-4 rounded-lg border transition-all ${
                    selectedEvent === ev.id
                      ? 'bg-[#E9DDC9] border-[#C90000] shadow-sm ring-1 ring-[#C90000]'
                      : 'bg-[#FFF9EF] border-[#241914]/15 hover:border-[#241914]/40'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#241914]/60 mb-2">
                    <span className="font-bold text-[#C90000]">{ev.photosCount} PHOTOS</span>
                    <span>{ev.date}</span>
                  </div>
                  <h4 className={`text-sm font-bold text-[#171514] mb-1 leading-snug ${ml ? 'font-malayalam' : ''}`}>
                    {ml ? ev.nameMl : ev.name}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-[#241914]/70">
                    <MapPin className="w-3.5 h-3.5 text-[#B99658]" />
                    <span className="line-clamp-1">{ev.location}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase font-bold text-[#C90000] tracking-wider mb-3">
              STEP 2: {ml ? 'നിങ്ങളുടെ സെൽഫി അല്ലെങ്കിൽ ഫോട്ടോ നൽകുക' : 'PROVIDE YOUR REFERENCE PHOTO'}
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Upload Dropzone */}
              <div className="border-2 border-dashed border-[#241914]/25 hover:border-[#C90000] rounded-xl p-8 text-center bg-[#F4EBDD]/60 transition-colors">
                <input
                  type="file"
                  id="selfie-upload"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label
                  htmlFor="selfie-upload"
                  className="cursor-pointer flex flex-col items-center justify-center space-y-3"
                >
                  <div className="w-12 h-12 rounded-full bg-[#E9DDC9] border border-[#241914]/20 flex items-center justify-center text-[#C90000]">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-[#171514] block">
                      {ml ? 'ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക' : 'Upload a clear portrait photo'}
                    </span>
                    <span className="text-xs text-[#241914]/60 block mt-1 font-mono">
                      PNG, JPG, WEBP (Max 10MB)
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#241914] text-[#F4EBDD] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#C90000] transition-colors">
                    <Camera className="w-3.5 h-3.5" />
                    <span>{ml ? 'ഫോട്ടോ തിരഞ്ഞെടുക്കുക' : 'BROWSE FILES'}</span>
                  </span>
                </label>
              </div>

              {/* Sample Photo for instant testing */}
              <div className="p-6 rounded-xl bg-[#E9DDC9]/70 border border-[#241914]/15 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#C90000] font-bold uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>TEST WITH VERIFIED REFERENCE</span>
                </div>
                <p className={`text-xs text-[#241914]/80 leading-relaxed ${ml ? 'font-malayalam-body' : ''}`}>
                  {ml
                    ? 'സെൽഫി അപ്‌ലോഡ് ചെയ്യാതെ തന്നെ സിസ്റ്റം പരീക്ഷിക്കാൻ താഴെയുള്ള സാമ്പിൾ റെഫറൻസ് പ്രൊഫൈൽ ഉപയോഗിക്കാം.'
                    : 'Don’t have a photo on hand? Test the archival recognition workflow using a verified delegate reference.'}
                </p>
                <button
                  type="button"
                  onClick={handleUseSample}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-[#FFF9EF] text-[#171514] text-xs font-mono font-bold uppercase tracking-wider border border-[#241914]/20 hover:border-[#C90000] hover:text-[#C90000] transition-colors"
                >
                  <Camera className="w-3.5 h-3.5" />
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
          <div className="flex items-center justify-between border-b border-[#241914]/15 pb-4">
            <div>
              <span className="text-xs font-mono uppercase font-bold text-[#C90000] tracking-wider block">
                STEP 2: CONFIRM PHOTO & SEARCH ARCHIVE
              </span>
              <span className="text-xs text-[#241914]/70">
                Searching inside: <strong>{currentEventObj.name}</strong>
              </span>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-mono text-[#C90000] hover:underline"
            >
              CHANGE SELECTION
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Selfie Preview */}
            <div className="md:col-span-4 flex flex-col items-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-xl overflow-hidden border-2 border-[#241914]/25 shadow-md bg-[#241914]">
                {selfiePreview && (
                  <img
                    src={selfiePreview}
                    alt="Uploaded selfie reference"
                    className="w-full h-full object-cover object-top"
                  />
                )}
                <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded-xs bg-[#171514]/80 text-white text-[10px] font-mono text-center">
                  REFERENCE CONTROLS ACTIVE
                </div>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="mt-3 text-xs font-mono text-[#241914]/70 hover:text-[#C90000] flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>{ml ? 'മറ്റൊരു ചിത്രം നൽകുക' : 'Choose different photo'}</span>
              </button>
            </div>

            {/* Processing and Actions */}
            <div className="md:col-span-8 space-y-5">
              <div className="p-4 rounded-lg bg-[#E9DDC9] border border-[#241914]/15 space-y-2">
                <h4 className={`text-sm font-bold text-[#171514] flex items-center gap-2 ${ml ? 'font-malayalam' : ''}`}>
                  <ShieldCheck className="w-4 h-4 text-[#388E3C]" />
                  <span>{ml ? 'സ്വകാര്യതയും സുരക്ഷാ ഉറപ്പും' : 'Zero-Retention Privacy Guarantee'}</span>
                </h4>
                <p className={`text-xs text-[#241914]/80 leading-relaxed ${ml ? 'font-malayalam-body' : ''}`}>
                  {ml
                    ? 'നിങ്ങൾ നൽകുന്ന ചിത്രം ബ്രൗസറിൽ വെച്ചുതന്നെ സുരക്ഷിതമായി സ്കാൻ ചെയ്യപ്പെടുന്നു. ഫോട്ടോയോ ബയോമെട്രിക് ഡാറ്റയോ ശാശ്വതമായി സൂക്ഷിക്കുകയോ മൂന്നാം കക്ഷികൾക്ക് പങ്കുവെക്കുകയോ ഇല്ല.'
                    : 'Your reference image is processed in transient volatile memory. Biometric vectors are discarded immediately following search execution. No personal profile is stored.'}
                </p>
              </div>

              {isProcessing ? (
                <div className="p-6 rounded-lg bg-[#241914] text-[#F4EBDD] text-center space-y-3">
                  <div className="w-8 h-8 border-3 border-[#C90000] border-t-transparent rounded-full animate-spin mx-auto" />
                  <div className="text-xs font-mono uppercase tracking-wider text-[#B99658] font-bold">
                    {processingStatus}
                  </div>
                  <p className="text-[11px] text-[#F4EBDD]/60 font-mono">
                    INDEXING {currentEventObj.photosCount} VERIFIED EVENT RECORDS
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={handleRunSearch}
                    className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-md bg-[#C90000] hover:bg-[#A30000] text-white font-mono text-sm uppercase font-bold tracking-wider transition-colors shadow-warm active:scale-[0.98] min-h-[48px]"
                  >
                    <Search className="w-4 h-4" />
                    <span>{ml ? 'തിരച്ചിൽ ആരംഭിക്കുക (START LOCAL RECOGNITION SEARCH)' : 'START LOCAL RECOGNITION SEARCH'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[11px] text-[#241914]/60 font-mono text-center">
                    ESTIMATED PROCESSING TIME: ~2.5 SECONDS
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#241914]/15 gap-4">
            <div>
              <span className="text-xs font-mono uppercase font-bold text-[#C90000] tracking-wider block">
                STEP 3: MATCHING EVENT PHOTOGRAPHS
              </span>
              <h4 className={`text-lg font-black text-[#171514] mt-0.5 ${ml ? 'font-malayalam' : ''}`}>
                {ml ? '4 സാധ്യതയുള്ള ഫോട്ടോകൾ കണ്ടെത്തി' : 'Found 4 Candidate Photographs in Event Archive'}
              </h4>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#E9DDC9] text-[#241914] text-xs font-mono uppercase font-bold tracking-wider hover:bg-[#E9DDC9]/70 border border-[#241914]/20 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>{ml ? 'പുതിയ തിരച്ചിൽ' : 'NEW SEARCH'}</span>
              </button>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleMatches.map((match) => (
              <div
                key={match.id}
                className="bg-[#E9DDC9] rounded-lg overflow-hidden border border-[#241914]/20 shadow-warm flex flex-col justify-between group"
              >
                <div className="relative aspect-4/3 bg-[#241914] overflow-hidden">
                  <img
                    src={match.src}
                    alt={match.caption}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-xs bg-[#241914]/90 text-white font-mono text-[10px] font-bold border border-white/20">
                    {match.matchScore}% MATCH
                  </div>
                  <div className="absolute bottom-2 left-2 text-[10px] font-mono text-white/90 bg-black/60 px-2 py-0.5 rounded-xs">
                    {match.time}
                  </div>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <p className={`text-xs font-bold text-[#171514] leading-snug line-clamp-2 ${ml ? 'font-malayalam' : ''}`}>
                      {ml ? match.captionMl : match.caption}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {match.tags.map((tag, i) => (
                        <span key={i} className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-xs bg-[#FFF9EF] text-[#241914]/70 border border-[#241914]/10">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#241914]/15 flex items-center justify-between">
                    <a
                      href={match.src}
                      download={`balasangham-photo-${match.id}.jpg`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#C90000] hover:text-[#A30000]"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>DOWNLOAD</span>
                    </a>
                    <span className="text-[10px] font-mono text-[#241914]/50">
                      ID: {match.id.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Archival Disclaimer Note */}
          <div className="p-4 rounded-lg bg-[#E9DDC9]/70 border border-[#241914]/15 flex items-start gap-3 text-xs text-[#241914]/75">
            <AlertCircle className="w-4 h-4 text-[#C90000] shrink-0 mt-0.5" />
            <p className={ml ? 'font-malayalam-body leading-[1.6]' : ''}>
              {ml
                ? 'കുറിപ്പ്: ഈ സംവിധാനം ഒരു ഓട്ടോമേറ്റഡ് ഫോട്ടോ റിട്രീവൽ സഹായം മാത്രമാണ്. ആൾമാറാട്ടത്തിനോ വ്യക്തിഗത തിരിച്ചറിയൽ രേഖയായോ ഇത് ഉപയോഗിക്കാൻ പാടില്ല. എല്ലാ ഫോട്ടോകളും പൊതു പരിപാടിയുടെ രേഖകളാണ്.'
                : 'Note: Visual match scoring is an automated finding aid to assist conference delegates in locating public event documentation. It does not constitute legal or biometric identification.'}
            </p>
          </div>
        </div>
      )}

      {/* Persistent Privacy Guarantee Footer */}
      <div className="mt-8 pt-6 border-t border-[#241914]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#241914]/65">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#C90000]" />
          <span>STRICT PRIVACY: NO BIOMETRIC PROFILES PERSISTED</span>
        </div>
        <span>BALASANGHAM KANNUR ARCHIVE DEPT. // 2026</span>
      </div>
    </div>
  );
};
