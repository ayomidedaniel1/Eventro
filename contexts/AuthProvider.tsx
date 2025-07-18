import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/utils/supabase';
import { useEffect } from 'react';

export const AuthProvider = ({ children }: { children: React.ReactNode; }) => {
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession().then(({ data, error }) => {
      if (isMounted) {
        if (error) {
          console.error('Error fetching session:', error.message);
          setAuth(null);
        } else {
          setAuth(data.session);
        }
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (isMounted) setAuth(session);
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, [setAuth]);

  return <>{children}</>;
};