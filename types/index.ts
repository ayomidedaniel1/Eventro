import { Session, User } from "@supabase/supabase-js";

export type AuthState = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  setAuth: (session: Session | null) => void;
};

export type EventCardProps = {
  id: string;
  title: string;
  starts_at: string;
  location: string;
  image_url: string;
};

export type EventInsert = {
  title: string;
  description: string;
  image: string;
  startDate: string | null;
  startTime: string | null;
  startDateTime: string | null;
  venue: string;
  city: string;
  country: string;
  countryCode: string | null;
  genre: string | null;
  segment: string | null;
};

export type TicketmasterEvent = {
  name: string;
  info?: string;
  images?: { url: string }[];
  dates: {
    start: {
      localDate?: string;
      localTime?: string;
      dateTime?: string;
      startDateTime?: string;
    };
  };
  _embedded?: {
    venues?: {
      name?: string;
      city?: { name?: string };
      country?: { name?: string; countryCode?: string };
    }[];
  };
  classifications?: {
    genre?: { name?: string };
    segment?: { name?: string };
  }[];
};
