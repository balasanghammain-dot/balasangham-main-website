interface CalendarEvent {
  title: string;
  start_date: string; // ISO string
  end_date: string; // ISO string
  venue: string;
  location: string;
  description: string;
  map_url?: string | null;
}

function formatICSDate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

export function generateICSContent(event: CalendarEvent): string {
  const start = formatICSDate(event.start_date);
  const end = formatICSDate(event.end_date) || start;
  const now = formatICSDate(new Date().toISOString());

  const fullDescription = event.map_url
    ? `${event.description}\\n\\nMap: ${event.map_url}`
    : event.description;

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Balasangham//Website//EN
BEGIN:VEVENT
UID:${Date.now()}@balasangham.org
DTSTAMP:${now}
DTSTART:${start}
DTEND:${end}
SUMMARY:${event.title}
DESCRIPTION:${fullDescription}
LOCATION:${event.venue ? event.venue + ', ' + event.location : event.location}
END:VEVENT
END:VCALENDAR`.trim();
}

export function downloadICS(event: CalendarEvent): void {
  const icsContent = generateICSContent(event);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${event.title.replace(/\s+/g, '_')}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function generateGoogleCalendarUrl(event: CalendarEvent): string {
  const start = formatICSDate(event.start_date);
  const end = formatICSDate(event.end_date) || start;

  const fullDescription = event.map_url
    ? `${event.description}\n\nMap Location: ${event.map_url}`
    : event.description;
  
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    details: fullDescription,
    location: event.venue ? `${event.venue}, ${event.location}` : event.location,
    dates: `${start}/${end}`
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
