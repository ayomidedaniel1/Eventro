import { Session, User } from '@supabase/supabase-js';
import { create } from 'zustand';

type AuthState = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  setAuth: (session: Session | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoading: true,
  setAuth: (session) =>
    set(() => ({
      session,
      user: session?.user ?? null,
      isLoading: false,
    })),
}));
