import { supabase } from '@/services/supabase';
import { useAuthStore } from '@/store/authStore';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Button, Text, View } from 'react-native';

export default function Home() {
  const { user, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login');
    }
  }, [user, isLoading]);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log('Logout error:', error.message);
    } else {
      useAuthStore.getState().setAuth(null);
      router.replace('/login');
    }
  };

  if (isLoading) return null;

  return (
    <View style={{ padding: 20 }}>
      <Text>Welcome, {user?.email}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
