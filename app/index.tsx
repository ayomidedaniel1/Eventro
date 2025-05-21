import { useAuth } from '@/contexts/AuthContext';
import { auth } from '@/services/supabase';
import { router } from 'expo-router';
import { signOut } from 'firebase/auth';
import { useEffect } from 'react';
import { Button, Text, View } from 'react-native';

export default function Home() {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login');
    }
  }, [user, isLoading]);

  if (isLoading) return null;

  return (
    <View style={{ padding: 20 }}>
      <Text>Welcome, {user?.email}</Text>
      <Button title="Logout" onPress={() => signOut(auth)} />
    </View>
  );
}
