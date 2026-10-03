import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown, Download, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { downloadICS, generateGoogleCalendarUrl } from '../../lib/calendar';

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
        className="gap-2"
      >
        <Calendar className="w-4 h-4" />
        Add to Calendar
        <ChevronDown className="w-4 h-4" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-warm-orange/20 rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="py-1">
            <a
              href={generateGoogleCalendarUrl(event)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 text-sm text-dark-brown hover:bg-soft-cream transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <ExternalLink className="w-4 h-4 text-sun-primary" />
              Google Calendar
            </a>
            <button
              onClick={() => {
                downloadICS(event);
                setIsOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-3 w-full text-left text-sm text-dark-brown hover:bg-soft-cream transition-colors"
            >
              <Download className="w-4 h-4 text-sun-primary" />
              Download .ics
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
