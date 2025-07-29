import { EventInsert } from "@/types";
import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";

export function useEvents(
  params: { keyword?: string; startDateTime?: string; city?: string } = {},
) {
  const fetchEvents = async (): Promise<EventInsert[]> => {
    // Fetch from Supabase as the primary source
    let { data: supabaseEvents, error: supabaseError } = await supabase
      .from("events")
      .select("*")
      .ilike("title", `%${params.keyword || ""}%`)
      .ilike("city", `%${params.city || ""}%`)
      .gte("start_date", params.startDateTime || "1900-01-01"); // Adjust 'start_date' to your schema field

    if (supabaseError) throw supabaseError;

    if (!supabaseEvents || supabaseEvents.length === 0) {
      // Fallback to Ticketmaster if no Supabase data
      const apiKey = process.env.EXPO_PUBLIC_TICKETMASTER_API_KEY;
      if (!apiKey) throw new Error("Ticketmaster API key is not defined");
      const url = new URL(
        "https://app.ticketmaster.com/discovery/v2/events.json",
      );
      url.searchParams.append("apikey", apiKey);
      if (params.keyword) url.searchParams.append("keyword", params.keyword);
      if (params.startDateTime) {
        url.searchParams.append("startDateTime", params.startDateTime);
      }
      if (params.city) url.searchParams.append("city", params.city);

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error("Failed to fetch events from Ticketmaster");
      }
      const data = await response.json();
      supabaseEvents = data._embedded?.events || [];
    }

    // Transform data to match EventInsert type
    const events: EventInsert[] = (supabaseEvents ?? []).map((event: any) => {
      const start = event.dates?.start || {};
      const end = event.dates?.end || {};
      const venue = event._embedded?.venues?.[0] || {};
      const classification = event.classifications?.[0] || {};

      return {
        id: event.id || event.event_id || "",
        title: event.name || event.title || "Unknown Event",
        description: event.info || event.description || "No description",
        image: event.images?.[0]?.url || "",
        url: event.url || null,
        startDate: start.localDate || event.start_date || null,
        startTime: start.localTime || null,
        startDateTime: start.dateTime || start.startDateTime || null,
        endDate: end.localDate || null,
        endTime: end.localTime || null,
        endDateTime: end.dateTime || null,
        timezone: event.dates?.timezone || null,
        venue: venue.name || event.venue || "N/A",
        venue_id: venue.id || null,
        city: venue.city?.name || event.city || "N/A",
        country: venue.country?.name || event.country || "N/A",
        countryCode: venue.country?.countryCode || null,
        address: venue.address?.line1 || null,
        latitude: venue.location?.latitude
          ? parseFloat(venue.location.latitude)
          : null,
        longitude: venue.location?.longitude
          ? parseFloat(venue.location.longitude)
          : null,
        genre: classification.genre?.name || null,
        segment: classification.segment?.name || null,
        status: event.dates?.status?.code || null,
        promoter: event._embedded?.promoters?.[0]?.name || null,
        location: event.location || null,
        priceRanges: event.priceRanges?.map((pr: any) => ({
          min: pr.min || 1000,
          max: pr.max || 1500,
          currency: pr.currency || "USD",
        })) || [{ min: 1000, max: 1500, currency: "USD" }],
        created_at: event.created_at || new Date().toISOString(),
        updated_at: event.updated_at || new Date().toISOString(),
      };
    });

    return events;
  };

  return useQuery({
    queryKey: ["events", params],
    queryFn: fetchEvents,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
}
