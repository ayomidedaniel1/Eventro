import { SupabaseClient } from "@supabase/supabase-js";
import { EventInsert, Database } from "@/types";

export async function seedEvents(supabase: SupabaseClient<Database>): Promise<EventInsert[]> {
  const response = await supabase.functions.invoke("seed-events", {
    method: "POST",
  });

  if (response.error) {
    throw new Error(response.error.message);
  }

  return Array.isArray(response.data) ? response.data : [];
};
