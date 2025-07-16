Deno.serve(async (_req: Request) => {
  const TICKETMASTER_API_KEY = Deno.env.get("TICKETMASTER_API_KEY");
  const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
  const SUPABASE_SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE");

  if (!TICKETMASTER_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
    throw new Error("Missing required environment variables.");
  }

  const res = await fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TICKETMASTER_API_KEY}&countryCode=US`,
  );

  const { events } = await res.json().then((data) => data._embedded || {});

  if (!events || events.length === 0) {
    return new Response("No events found", { status: 500 });
  }

  const insertData = events.slice(0, 5).map((e) => ({
    title: e.name,
    date: e.dates.start.localDate,
    time: e.dates.start.localTime,
    location: e._embedded.venues?.[0]?.name || "Unknown",
    image: e.images?.[0]?.url || "",
    description: e.info || "No description available",
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
    const errorText = await supabaseRes.text();
    return new Response(`Error inserting events: ${errorText}`, {
      status: 500,
    });
  }

  return new Response("Events seeded successfully!");
});
