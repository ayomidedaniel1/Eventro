import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/utils/supabase';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const { user, setAuth } = useAuthStore();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAuth(null); // Clear session & user
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to EventSync 🎉</Text>
      <Text style={styles.subtitle}>You&apos;re logged in as</Text>
      <Text style={styles.email}>{user?.email}</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogout} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-SemiBold',
    color: '#2ACE99',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#888',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#000',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#2ACE99',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
});