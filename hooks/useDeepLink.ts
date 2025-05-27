import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/utils/supabase';
import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import { useEffect } from 'react';

export function useDeepLinkAuth() {
  const setAuth = useAuthStore((s) => s.setAuth);

  useEffect(() => {
    async function handleUrl(url: string) {
      const parsed = Linking.parse(url);

      const access_token = parsed.queryParams?.access_token;
      const refresh_token = parsed.queryParams?.refresh_token;

      if (access_token && refresh_token) {
        const { data, error } = await supabase.auth.setSession({
          access_token: access_token as string,
          refresh_token: refresh_token as string,
        });

        if (error) {
          console.error('Set session failed:', error.message);
          return;
        }

        setAuth(data.session);
        router.replace('/');
      }
    }

    Linking.getInitialURL().then((url) => {
      if (url) handleUrl(url);
    });

    const sub = Linking.addEventListener('url', ({ url }) => {
      handleUrl(url);
    });

    return () => sub.remove();
  }, []);
}
