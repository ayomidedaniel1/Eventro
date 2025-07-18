import { EventInsert } from "@/types";
import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";

export function useEvents() {
  return useQuery<EventInsert[], Error>({
    queryKey: ["events"],
    queryFn: async () => {
      const { data, error } = await supabase.from("events").select("*");
      if (error) throw error;
      return data || [];
    },
  });
}
