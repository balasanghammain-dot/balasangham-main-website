/**
 * Utility functions for Google Maps URL validation, keyless mini-map embeds,
 * and safe external redirection.
 */

export interface MapValidationResult {
  valid: boolean;
  error?: string;
  sanitizedUrl?: string;
}

/**
 * Validates whether a string is a legitimate Google Maps URL.
 * Only permits safe https:// protocols from Google Maps domains.
 */
export function validateGoogleMapsUrl(url: string | null | undefined): MapValidationResult {
  if (!url) return { valid: true };
  const trimmed = url.trim();
  if (!trimmed) return { valid: true };

  // Must strictly use HTTPS
  if (!trimmed.startsWith('https://')) {
    return {
      valid: false,
      error: 'Google Maps URL must start with https://'
    };
  }

  try {
    const parsed = new URL(trimmed);

    if (parsed.protocol !== 'https:') {
      return {
        valid: false,
        error: 'Only secure https:// URLs are allowed'
      };
    }

    const hostname = parsed.hostname.toLowerCase();
    const validHosts = [
      'maps.google.com',
      'www.google.com',
      'google.com',
      'goo.gl',
      'maps.app.goo.gl'
    ];

    const isMatch =
      validHosts.includes(hostname) ||
      hostname.endsWith('.google.com') ||
      hostname.endsWith('.google.co.in');

    if (!isMatch) {
      return {
        valid: false,
        error: 'URL must be a legitimate Google Maps link (e.g., https://maps.google.com/..., https://goo.gl/maps/..., or https://maps.app.goo.gl/...)'
      };
    }

    if (hostname.includes('google.com') || hostname.includes('google.co.in')) {
      if (!hostname.startsWith('maps.') && !parsed.pathname.startsWith('/maps')) {
        return {
          valid: false,
          error: 'Google URL must point to a Google Maps path (/maps)'
        };
      }
    }

    return { valid: true, sanitizedUrl: trimmed };
  } catch {
    return { valid: false, error: 'Invalid URL format' };
  }
}

/**
 * Generates a clean, privacy-respecting, keyless Google Maps embed URL for iframe preview.
 * Centers on the event venue & location, or uses an existing embed URL.
 */
export function getMiniMapEmbedUrl(event: {
  map_url?: string | null;
  venue?: string | null;
  location?: string | null;
}): string | null {
  const mapUrl = event.map_url?.trim();

  // If the admin directly provided an embed URL (e.g. from Google Maps share > Embed a map)
  if (mapUrl && mapUrl.includes('/maps/embed')) {
    return mapUrl;
  }

  // Build query from venue and address/location
  const queryParts = [event.venue?.trim(), event.location?.trim()].filter(Boolean);
  if (queryParts.length === 0 && !mapUrl) {
    return null;
  }

  const query = queryParts.length > 0 ? queryParts.join(', ') : 'Kannur, Kerala';

  // Keyless Google Maps output=embed endpoint
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
}

/**
 * Generates the direct external redirect URL to Google Maps.
 * Opens the admin-provided Google Maps link or searches for the venue/location.
 */
export function getGoogleMapsRedirectUrl(event: {
  map_url?: string | null;
  venue?: string | null;
  location?: string | null;
}): string | null {
  if (event.map_url && event.map_url.trim()) {
    return event.map_url.trim();
  }

  const queryParts = [event.venue?.trim(), event.location?.trim()].filter(Boolean);
  if (queryParts.length > 0) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(queryParts.join(', '))}`;
  }

  return null;
}
