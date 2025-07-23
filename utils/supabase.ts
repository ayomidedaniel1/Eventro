import "react-native-url-polyfill/auto";

import { Database } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";

const supabaseUrl = Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = Constants.expoConfig?.extra
  ?.EXPO_PUBLIC_SUPABASE_ANON_KEY;

console.log("Extra config:", Constants.expoConfig?.extra);

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase URL or Anon Key in app.json extra");
}

// Ensure URL is a string and valid
if (typeof supabaseUrl !== "string" || !supabaseUrl.startsWith("http")) {
  throw new Error("Invalid Supabase URL format");
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
