import { useQuery } from "@tanstack/react-query";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      // Trigger seed
      await fetch(`${supabaseUrl}/functions/v1/seed-events`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${anonKey}`,
        },
      });

      // Fetch all events from the `events` table
      const res = await fetch(`${supabaseUrl}/rest/v1/events?select=*`, {
        headers: {
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch events");

      const data = await res.json();
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
