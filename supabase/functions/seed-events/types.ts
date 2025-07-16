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
