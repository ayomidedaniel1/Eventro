// deno-lint-ignore-file
import { EventInsert, TicketmasterEvent } from "./types.ts";
// eslint-disable-next-line import/no-unresolved
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export const config = {
  auth: false,
};

Deno.serve(async (_req: Request) => {
  const TICKETMASTER_API_KEY = Deno.env.get("TICKETMASTER_API_KEY");
  const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!TICKETMASTER_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return new Response("Missing env vars", { status: 500 });
  }

  const res = await fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TICKETMASTER_API_KEY}&countryCode=US&size=50`,
    {
      headers: { "Accept": "application/json" },
    },
  );
  const json = await res.json();
  const events = json._embedded?.events;

  if (!events || events.length === 0) {
    return new Response("No events found", { status: 404 });
  }

  const insertData: EventInsert[] = events.map((e: TicketmasterEvent) => ({
    id: e.id,
    title: e.name,
    description: e.info || e.pleaseNote || "No description available",
    image: e.images?.[0]?.url || "",
    url: e.url || null,
    startDate: e.dates.start.localDate || null,
    startTime: e.dates.start.localTime || null,
    startDateTime: e.dates.start.dateTime || e.dates.start.startDateTime ||
      null,
    endDate: e.dates.end?.localDate || null,
    endTime: e.dates.end?.localTime || null,
    endDateTime: e.dates.end?.dateTime || null,
    timezone: e.dates.timezone || null,
    venue: e._embedded?.venues?.[0]?.name || "Unknown venue",
    venue_id: e._embedded?.venues?.[0]?.id || null,
    city: e._embedded?.venues?.[0]?.city?.name || "Unknown city",
    country: e._embedded?.venues?.[0]?.country?.name || "Unknown country",
    countryCode: e._embedded?.venues?.[0]?.country?.countryCode || null,
    address: e._embedded?.venues?.[0]?.address?.line1 || null,
    latitude: e._embedded?.venues?.[0]?.location?.latitude || null,
    longitude: e._embedded?.venues?.[0]?.location?.longitude || null,
    genre: e.classifications?.[0]?.genre?.name || null,
    segment: e.classifications?.[0]?.segment?.name || null,
    status: e.dates.status?.code || null,
    promoter: e._embedded?.promoters?.[0]?.name || null,
    location: e.locale || null,
    priceRanges: e.priceRanges || null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const { error } = await supabase.from("events").upsert(insertData, {
    onConflict: "id",
  });

  if (error) {
    console.error("Upsert error:", error);
    return new Response(
      `Error inserting events: ${error.message || JSON.stringify(error)}`,
      { status: 500 },
    );
  }

  return new Response("Events seeded successfully!", { status: 200 });
});
