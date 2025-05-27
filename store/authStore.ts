import { AuthState } from '@/types';
import { create } from 'zustand';

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
