import { Session, User } from "@supabase/supabase-js";

export type AuthState = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  setAuth: (session: Session | null) => void;
  logout: () => Promise<void>;
};

export type EventInsert = {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string | null;

  // Date and time fields
  startDate: string | null;
  startTime: string | null;
  startDateTime: string | null;
  endDate: string | null;
  endTime: string | null;
  endDateTime: string | null;
  timezone: string | null;

  // Venue information
  venue: string;
  venue_id: string | null;
  city: string;
  country: string;
  countryCode: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;

  // Classification
  genre: string | null;
  segment: string | null;

  // Event details
  status: string | null;
  promoter: string | null;
  location: string | null;
  priceRanges: { min?: number; max?: number; currency?: string }[] | null;

  // Timestamps
  created_at: string;
  updated_at: string;
};

export type EventCardProps = {
  event: EventInsert;
};

export type TicketmasterEvent = {
  id: string;
  name: string;
  info?: string;
  pleaseNote?: string;
  url?: string;
  locale?: string;
  images?: { url: string }[];
  priceRanges?: any[];

  dates: {
    start: {
      localDate?: string;
      localTime?: string;
      dateTime?: string;
      startDateTime?: string;
    };
    end?: {
      localDate?: string;
      localTime?: string;
      dateTime?: string;
    };
    timezone?: string;
    status?: {
      code?: string;
    };
  };

  _embedded?: {
    venues?: {
      id?: string;
      name?: string;
      city?: { name?: string };
      country?: { name?: string; countryCode?: string };
      address?: { line1?: string };
      location?: {
        latitude?: string;
        longitude?: string;
      };
    }[];
    promoters?: {
      name?: string;
      id?: string;
    }[];
  };

  classifications?: {
    genre?: { name?: string };
    segment?: { name?: string };
  }[];
};
