import 'react-native-url-polyfill/auto';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://cqokcsdcvdkywypxovjd.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxb2tjc2RjdmRreXd5cHhvdmpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MzQ0MDQsImV4cCI6MjA2MzQxMDQwNH0.6mOI_5s-1ICj4oSvI2-nvk-HWSs6ooVKLoxyRZYCSLA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
