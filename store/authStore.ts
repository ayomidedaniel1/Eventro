import { AuthState } from "@/types";
import { supabase } from "@/utils/supabase";
import { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";

export const useAuthStore = create<AuthState>((set) => {
  supabase.auth.onAuthStateChange((_event, session) => {
    set({
      user: session?.user ?? null,
      session: session ?? null,
      isLoading: false,
    });
  });

  return {
    user: null,
    session: null,
    isLoading: true,
    setAuth: (user: User | null, session?: Session | null) =>
      set(() => ({
        user,
        session: session ?? null,
        isLoading: false,
      })),
    logout: async () => {
      await supabase.auth.signOut();
      set(() => ({ user: null, session: null, isLoading: false }));
    },
  };
});
