// contexts/AuthProvider.tsx
import { supabase } from '@/services/supabase';
import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';

export const AuthProvider = ({ children }: { children: React.ReactNode; }) => {
  const setAuth = useAuthStore((s) => s.setAuth);

  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error('Error fetching session:', error.message);
        return;
      }
      setAuth(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuth(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [setAuth]);

  return <>{children}</>;
};
