import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../i18n/translations';
import { BalasanghamLogo } from '../motifs/BalasanghamLogo';
import { Play, Pause, Volume2, X } from 'lucide-react';

interface AnthemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AnthemModal = ({ isOpen, onClose }: AnthemModalProps) => {
  const { t, language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState('0:00');
  const [durationStr, setDurationStr] = useState('0:45');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Pause audio when modal is closed
  useEffect(() => {
    if (!isOpen && audioRef.current) {
      audioRef.current.pause?.();
      setIsPlaying(false);
    }
  }, [isOpen]);

  const togglePlay = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    if (audioRef.current) {
      if (nextState) {
        try {
          const playPromise = audioRef.current.play?.();
          if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch(() => {});
          }
        } catch {
          // ignore playback errors in environments without media codecs
        }
      } else {
        audioRef.current.pause?.();
      }
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const cur = audioRef.current.currentTime || 0;
    const dur = audioRef.current.duration || 45;
    setProgress(Math.min(100, (cur / dur) * 100));

    const curMins = Math.floor(cur / 60);
    const curSecs = Math.floor(cur % 60);
    setCurrentTimeStr(`${curMins}:${curSecs < 10 ? '0' : ''}${curSecs}`);

    if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
      const durMins = Math.floor(dur / 60);
      const durSecs = Math.floor(dur % 60);
      setDurationStr(`${durMins}:${durSecs < 10 ? '0' : ''}${durSecs}`);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTimeStr('0:00');
  };

  if (!isOpen) return null;

  const malayalamLyrics = translations.ml.anthem.lyrics;
  const englishLyrics = translations.en.anthem.lyrics;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Balasangham Flag Song Anthem"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-deep-red bg-gradient-to-r from-deep-red to-[#B71C1C] text-white p-6 sm:p-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1 rounded-2xl bg-white shadow-xs flex items-center justify-center shrink-0">
              <BalasanghamLogo className="w-10 h-10 sm:w-12 sm:h-12" alt="Balasangham Logo" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-malayalam text-white">
                {language === 'ml' ? t.anthem.title : 'ബാലസംഘം പതാകഗാനം (Flag Song)'}
              </h2>
              <p className="text-xs sm:text-sm text-amber-200 font-medium">
                {t.anthem.subtitle}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close anthem modal"
            className="p-2 rounded-full hover:bg-white/20 text-white min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Audio Player Controls & HTML5 Audio Element */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row items-center gap-4">
          <audio
            ref={audioRef}
            src="/audio/flagsong.mp3"
            preload="metadata"
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
          />
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause anthem' : 'Play anthem'}
            className="w-12 h-12 rounded-full bg-deep-red text-white flex items-center justify-center shadow-md hover:bg-[#B71C1C] transition-colors shrink-0"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>

          <div className="flex-1 w-full">
            <div
              className="w-full bg-slate-200 rounded-full h-2 cursor-pointer overflow-hidden"
              onClick={(e) => {
                if (!audioRef.current || !audioRef.current.duration) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                audioRef.current.currentTime = pos * audioRef.current.duration;
              }}
            >
              <div
                className="bg-deep-red h-full transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-1 font-medium font-mono">
              <span>{currentTimeStr}</span>
              <span>{durationStr}</span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-slate-400">
            <Volume2 className="w-4 h-4" />
            <span className="text-xs font-mono">Official Audio</span>
          </div>
        </div>

        {/* Dual-Column Lyrics Display */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {/* Malayalam Original */}
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-deep-red block">
                മലയാളം വരികൾ (Original Malayalam Anthem)
              </span>
              <div className="font-malayalam text-base sm:text-lg text-charcoal leading-loose whitespace-pre-line font-medium">
                {malayalamLyrics.join('\n\n')}
              </div>
            </div>

            {/* English Poetic Translation */}
            <div className="space-y-4 pt-4 md:pt-0 md:pl-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                English Poetic Translation
              </span>
              <div className="text-sm sm:text-base text-slate-600 leading-relaxed whitespace-pre-line italic">
                {englishLyrics.join('\n\n')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
