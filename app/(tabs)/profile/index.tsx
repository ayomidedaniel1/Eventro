import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/utils/supabase';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const { user, setAuth } = useAuthStore();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAuth(null);
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Profile</Text>

      <Text style={styles.label}>Email</Text>
      <Text style={styles.value}>{user?.email}</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogout} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#2ACE99',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    color: '#999',
    fontFamily: 'Poppins-Regular',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Poppins-Medium',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#2ACE99',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
});
