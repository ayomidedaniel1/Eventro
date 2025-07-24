// deno-lint-ignore-file
import {
  EventInsert,
  TicketmasterDetailedEvent,
  TicketmasterEvent,
} from "./types.ts";
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
    `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TICKETMASTER_API_KEY}&size=50`,
    {
      headers: { "Accept": "application/json" },
    },
  );
  const json = await res.json();
  const events = json._embedded?.events as TicketmasterEvent[];

  if (!events || events.length === 0) {
    return new Response("No events found", { status: 404 });
  }

  // Fetch detailed data sequentially with delay
  const insertData: EventInsert[] = [];
  for (const e of events) {
    const detailRes = await fetch(
      `https://app.ticketmaster.com/discovery/v2/events/${e.id}.json?apikey=${TICKETMASTER_API_KEY}`,
      {
        headers: { "Accept": "application/json" },
      },
    );
    const detailJson = await detailRes.json() as TicketmasterDetailedEvent;
    const detailedEvent = detailJson || e; // Fallback to initial data if detail fails

    insertData.push({
      id: e.id,
      title: e.name,
      description: detailedEvent.info || detailedEvent.pleaseNote ||
        "No description available",
      image: detailedEvent.images?.[0]?.url || e.images?.[0]?.url || "",
      url: detailedEvent.url || e.url || null,
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
      latitude: e._embedded?.venues?.[0]?.location?.latitude
        ? Number(e._embedded?.venues?.[0]?.location?.latitude)
        : null,
      longitude: e._embedded?.venues?.[0]?.location?.longitude
        ? Number(e._embedded?.venues?.[0]?.location?.longitude)
        : null,
      genre: e.classifications?.[0]?.genre?.name || null,
      segment: e.classifications?.[0]?.segment?.name || null,
      status: e.dates.status?.code || null,
      promoter: e._embedded?.promoters?.[0]?.name || null,
      location: e.locale || null,
      priceRanges: detailedEvent.priceRanges || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    // Delay 1 second between requests to avoid throttling
    if (e !== events[events.length - 1]) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1000ms = 1 second
    }
  }

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
