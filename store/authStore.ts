import { AuthState } from "@/types";
import { supabase } from "@/utils/supabase";
import { Session } from "@supabase/supabase-js";
import { create } from "zustand";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoading: true,
  setAuth: (session: Session | null) =>
    set(() => ({
      session,
      user: session?.user ?? null,
      isLoading: false,
    })),
  logout: async () => {
    await supabase.auth.signOut();
    set(() => ({ user: null, session: null, isLoading: false }));
  },
}));
