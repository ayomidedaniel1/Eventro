import { EventInsert, SearchParam } from "@/types";
import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";

export function useEvents(
  params: SearchParam = {},
) {
  const fetchEvents = async (): Promise<EventInsert[]> => {
    let { data: supabaseEvents, error: supabaseError } = await supabase
      .from("events")
      .select("*")
      .ilike("title", `%${params.keyword || ""}%`)
      .ilike("city", `%${params.city || ""}%`)
      .gte("startDate", params.startDateTime || "2000-01-01")
      .ilike("genre", `%${params.genre || ""}%`)
      .ilike("status", `%${params.status || ""}%`);

    if (supabaseError) {
      console.error("Supabase error:", supabaseError);
      throw supabaseError;
    }

    console.log("Raw Supabase data:", supabaseEvents);

    if (!supabaseEvents || supabaseEvents.length === 0) {
      console.warn("No events found in Supabase with current filters");
      return [];
    }

    // Transform data to match EventInsert type
    const events: EventInsert[] = supabaseEvents.map((event: any) => ({
      id: event.id || "",
      title: event.title || "Unknown Event",
      description: event.description || "No description",
      image: event.image || "",
      url: event.url || null,
      startDate: event.startDate || null,
      startTime: event.startTime || null,
      startDateTime: event.startDateTime || null,
      endDate: event.endDate || null,
      endTime: event.endTime || null,
      endDateTime: event.endDateTime || null,
      timezone: event.timezone || null,
      venue: event.venue || "N/A",
      venue_id: event.venue_id || null,
      city: event.city || "N/A",
      country: event.country || "N/A",
      countryCode: event.countryCode || null,
      address: event.address || null,
      latitude: event.latitude || null,
      longitude: event.longitude || null,
      genre: event.genre || null,
      segment: event.segment || null,
      status: event.status || null,
      promoter: event.promoter || null,
      location: event.location || null,
      priceRanges: event.priceRanges ||
        [{ min: 1000, max: 1500, currency: "USD" }],
      created_at: event.created_at || new Date().toISOString(),
      updated_at: event.updated_at || new Date().toISOString(),
    }));

    console.log("Transformed events:", events);
    return events;
  };

  return useQuery({
    queryKey: ["events", params],
    queryFn: fetchEvents,
    staleTime: 5 * 60 * 1000,
  });
}
