export interface PosterMeta {
  publicId?: string | null;
  secureUrl?: string | null;
}

export interface EventData {
  id: string;
  slug: string;
  title: string;
  title_ml: string | null;
  malayalamTitle?: string | null;
  short_description: string | null;
  short_description_ml: string | null;
  shortDescription?: string | null;
  full_description: string | null;
  full_description_ml: string | null;
  description?: string | null;
  start_date: string | null;
  startDate?: any;
  end_date: string | null;
  endDate?: any;
  venue: string | null;
  venue_ml: string | null;
  location: string | null;
  location_ml: string | null;
  address?: string | null;
  mapUrl?: string | null;
  map_url?: string | null;
  category: string;
  poster?: PosterMeta | null;
  poster_url: string | null;
  poster_public_id: string | null;
  published: number | boolean;
  snapshare_enabled: number | boolean;
  snapShareEnabled?: boolean;
  registration_url: string | null;
  additional_info: string | null;
  additional_info_ml: string | null;
  schedule_info: string | null;
  schedule_info_ml: string | null;
  created_at: string;
  updated_at: string;
}

export interface FirestoreEventDoc {
  title: string;
  malayalamTitle?: string | null;
  title_ml?: string | null;
  slug: string;
  shortDescription?: string | null;
  short_description?: string | null;
  short_description_ml?: string | null;
  description?: string | null;
  full_description?: string | null;
  full_description_ml?: string | null;
  startDate: any; // Firestore Timestamp or Date
  endDate?: any | null; // Firestore Timestamp or Date
  venue?: string | null;
  venue_ml?: string | null;
  address?: string | null;
  location?: string | null;
  location_ml?: string | null;
  mapUrl?: string | null;
  category?: string;
  poster?: PosterMeta | null;
  poster_url?: string | null;
  poster_public_id?: string | null;
  published: boolean;
  snapShareEnabled: boolean;
  snapshare_enabled?: boolean | number;
  registration_url?: string | null;
  additional_info?: string | null;
  additional_info_ml?: string | null;
  schedule_info?: string | null;
  schedule_info_ml?: string | null;
  createdAt?: any;
  updatedAt?: any;
}

export interface MediaItem {
  id: string;
  type?: 'image' | 'video';
  title?: string | null;
  description?: string | null;
  secureUrl?: string;
  publicId?: string;
  thumbnailUrl?: string | null;
  width?: number | null;
  height?: number | null;
  duration?: number | string | null;
  eventId?: string | null;
  published?: boolean | number;
  createdAt?: string;

  // Legacy/db properties for backward compatibility
  event_id?: string | null;
  event_title?: string | null;
  event_title_ml?: string | null;
  event_slug?: string | null;
  cloudinary_public_id?: string;
  url: string;
  thumbnail_url?: string | null;
  format?: string | null;
  resource_type?: string;
  caption?: string | null;
  caption_ml?: string | null;
  media_type?: string;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface EventWithMedia extends EventData {
  media: MediaItem[];
}
