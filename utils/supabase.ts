import "react-native-url-polyfill/auto";

import { Database } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";

const supabaseUrl = Constants.expoConfig?.extra?.SUPABASE_URL;
const supabaseAnonKey = Constants.expoConfig?.extra?.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase URL or Anon Key in app.json extra");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

export const seedEvents = async () => {
  const response = await supabase.functions.invoke("seed-events", {
    method: "POST",
  });
  if (response.error) throw new Error(response.error.message);
  return response.data;
};
