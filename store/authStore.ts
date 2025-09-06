import { AuthState } from "@/types";
import { supabase } from "@/utils/supabase";
import { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";

export const useAuthStore = create<AuthState>((set) => {
  // Initial auth state sync
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
    setAuth: (user: User | null, session?: Session | null) => {
      // Only update user metadata without triggering a full re-render if possible
      set((state) => ({
        ...state,
        user,
        session: session ?? state.session,
        isLoading: false,
      }));
    },
    logout: async () => {
      await supabase.auth.signOut();
      set(() => ({ user: null, session: null, isLoading: false }));
    },
  };
});