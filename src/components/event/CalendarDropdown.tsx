import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown, Download, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { downloadICS, generateGoogleCalendarUrl } from '../../lib/calendar';
import { useLanguage } from '../../context/LanguageContext';

interface CalendarDropdownProps {
  event: {
    title: string;
    start_date: string;
    end_date: string;
    venue: string;
    location: string;
    description: string;
  };
  className?: string;
}

export const CalendarDropdown: React.FC<CalendarDropdownProps> = ({ event, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const ml = language === 'ml';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative inline-block ${className || ''}`} ref={dropdownRef}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className={`gap-2 ${ml ? 'font-malayalam' : ''}`}
      >
        <Calendar className="w-4 h-4 shrink-0" />
        <span>{ml ? 'കലണ്ടറിൽ ചേർക്കൂ' : 'Add to Calendar'}</span>
        <ChevronDown className="w-4 h-4 shrink-0" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-warm-orange/20 rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="py-1">
            <a
              href={generateGoogleCalendarUrl(event)}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 px-4 py-3 text-sm text-dark-brown hover:bg-soft-cream transition-colors ${
                ml ? 'font-malayalam' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              <ExternalLink className="w-4 h-4 text-sun-primary shrink-0" />
              <span>{ml ? 'ഗൂഗിൾ കലണ്ടർ' : 'Google Calendar'}</span>
            </a>
            <button
              onClick={() => {
                downloadICS(event);
                setIsOpen(false);
              }}
              className={`flex items-center gap-3 px-4 py-3 w-full text-left text-sm text-dark-brown hover:bg-soft-cream transition-colors ${
                ml ? 'font-malayalam' : ''
              }`}
            >
              <Download className="w-4 h-4 text-sun-primary shrink-0" />
              <span>{ml ? '.ics ഫയൽ ഡൗൺലോഡ്' : 'Download .ics'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
