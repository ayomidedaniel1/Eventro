import { Ionicons } from "@expo/vector-icons";
import { Session, User } from "@supabase/supabase-js";
import { ComponentProps, JSX } from "react";

export type AuthState = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  setAuth: (user: User | null) => void;
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
  priceRanges: { min?: number; max?: number; currency?: string; }[] | null;

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
  images?: { url: string; }[];
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
      city?: { name?: string; };
      country?: { name?: string; countryCode?: string; };
      address?: { line1?: string; };
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
    genre?: { name?: string; };
    segment?: { name?: string; };
  }[];
};

// types/supabase.ts
export type Database = {
  public: {
    Tables: {
      transactions: {
        Row: {
          id: string;
          event_id: string;
          user_id: string;
          amount: number;
          currency: string;
          transaction_id: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          event_id: string;
          user_id: string;
          amount: number;
          currency: string;
          transaction_id: string;
          status: string;
        };
      };
    };
  };
};

export type TicketmasterPriceRange = {
  min: number;
  max: number;
};

export interface Message {
  _id: number;
  text: string;
  createdAt: Date;
  user: {
    _id: number;
    name: string;
  };
}

export type HeaderProps = {
  title: string;
};

export type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  isLoading: boolean;
  placeholder: string;
  placeholderTextColor: string;
};

export type FilterRowProps = {
  filterGenre: string;
  setFilterGenre: (value: string) => void;
};

export type FilterModalProps = {
  visible: boolean;
  onClose: () => void;
  filterDate: string;
  setFilterDate: (value: string) => void;
  filterLocation: string;
  setFilterLocation: (value: string) => void;
  filterGenre: string;
  setFilterGenre: (value: string) => void;
  filterStatus: string;
  setFilterStatus: (value: string) => void;
  onApply: () => void;
  onClear: () => void;
};

export type EventCardWrapperProps = {
  item: EventInsert;
  onPress: (event: EventInsert) => void;
};

export type EventListProps = {
  data: any[];
  renderItem: (item: any) => JSX.Element;
  keyExtractor: (item: any, index: number) => string;
  isLoading: boolean;
};

export type SearchParam = {
  keyword?: string;
  startDateTime?: string;
  city?: string;
  genre?: string;
  status?: string;
};

export type ProfileHeaderProps = {
  name: string;
  email: string;
  avatar: string | { uri: string; };
  onUpload?: () => void;
  onNameUpdate?: (newName: string) => void;
  isUploading?: boolean;
};

export type ProfileActionsProps = {
  action: () => void;
  title: string;
  icon: ComponentProps<typeof Ionicons>['name'];
};

export type EventInfoProp = {
  title: string;
  icon: ComponentProps<typeof Ionicons>['name'];
  data: string;
};

export type ChatContent = {
  role: "user" | "model";
  parts: { text: string; }[];
};

export type ChatResponse = {
  response: string;
};
