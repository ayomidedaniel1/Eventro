// deno-lint-ignore-file
import { EventInsert, TicketmasterEvent } from "./types.ts";

Deno.serve(async (_req: Request) => {
  const TICKETMASTER_API_KEY = Deno.env.get("TICKETMASTER_API_KEY");
  const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
  const SUPABASE_SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE");

  if (!TICKETMASTER_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
    return new Response("Missing env vars", { status: 500 });
  }

  const res = await fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TICKETMASTER_API_KEY}&countryCode=US&size=50`,
  );

  const json = await res.json();
  const events = json._embedded?.events;

  if (!events || events.length === 0) {
    return new Response("No events found", { status: 404 });
  }

  const insertData: EventInsert[] = events.map((e: TicketmasterEvent) => ({
    title: e.name,
    description: e.info || "No description available",
    image: e.images?.[0]?.url || "",
    startDate: e.dates.start.localDate || null,
    startTime: e.dates.start.localTime || null,
    startDateTime: e.dates.start.dateTime || e.dates.start.startDateTime ||
      null,
    venue: e._embedded?.venues?.[0]?.name || "Unknown venue",
    city: e._embedded?.venues?.[0]?.city?.name || "Unknown city",
    country: e._embedded?.venues?.[0]?.country?.name || "Unknown country",
    countryCode: e._embedded?.venues?.[0]?.country?.countryCode || null,
    genre: e.classifications?.[0]?.genre?.name || null,
    segment: e.classifications?.[0]?.segment?.name || null,
  }));

  const supabaseRes = await fetch(`${SUPABASE_URL}/rest/v1/events`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_SERVICE_ROLE,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(insertData),
  });

  if (!supabaseRes.ok) {
    const error = await supabaseRes.text();
    return new Response(`Error inserting events: ${error}`, { status: 500 });
  }

  return new Response("Events seeded successfully!");
});
