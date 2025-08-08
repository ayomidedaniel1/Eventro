import HeaderComponent from '@/components/HeaderComponent';
import ProfileActionsComponent from '@/components/ProfileActionsComponent';
import ProfileHeaderComponent from '@/components/ProfileHeaderComponent';
import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/utils/supabase';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const { user, setAuth } = useAuthStore();
  const router = useRouter();
  console.log('User >>', user?.user_metadata);

  if (!user) return <Text style={styles.error}>Please log in</Text>;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAuth(null);
    router.replace('/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent title="My Account" />

      <ProfileHeaderComponent
        name={user.user_metadata?.full_name || ''}
        email={user.email || ''}
        avatar={user.user_metadata?.avatar_url || 'https://via.placeholder.com/150'}
      />

      <View style={styles.actionsContainer}>
        <ProfileActionsComponent
          action={() => router.push('/profile/settings')}
          title='Personal Info'
          icon='person-outline'
        />

        <ProfileActionsComponent
          action={() => router.push('/profile/tickets')}
          title='My Tickets'
          icon='ticket-outline'
        />

      </View>

      <TouchableOpacity activeOpacity={0.8} style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="#CC0000" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FFF9',
    padding: 15,
  },
  error: {
    textAlign: 'center',
    marginTop: 60,
    color: 'red',
    fontFamily: 'Poppins-Regular',
  },
  actionsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 200,
    gap: 11,
  },
  logoutText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 19,
    color: '#CC0000',
  },
});