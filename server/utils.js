const { v4: uuidv4 } = require('uuid');

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function generateId() {
  return uuidv4();
}

function generateICS(event) {
  // basic ICS format
  const dtStart = new Date(event.start_date).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const dtEnd = new Date(event.end_date).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  
  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Balasangham//Event Calendar//EN
BEGIN:VEVENT
UID:${event.id}@balasangham.org
DTSTAMP:${dtStart}
DTSTART:${dtStart}
DTEND:${dtEnd}
SUMMARY:${event.title}
DESCRIPTION:${event.short_description || ''}
LOCATION:${event.venue || ''}
END:VEVENT
END:VCALENDAR`;
}

function generateGoogleCalendarUrl(event) {
  const dtStart = new Date(event.start_date).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const dtEnd = new Date(event.end_date).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const title = encodeURIComponent(event.title);
  const details = encodeURIComponent(event.short_description || '');
  const location = encodeURIComponent(event.venue || '');

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dtStart}/${dtEnd}&details=${details}&location=${location}`;
}

module.exports = {
  generateSlug,
  generateId,
  generateICS,
  generateGoogleCalendarUrl,
};
