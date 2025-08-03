import ProfileActionsComponent from '@/components/ProfileActionsComponent';
import ProfileHeaderComponent from '@/components/ProfileHeaderComponent';
import UserStatsComponent from '@/components/UserStatsComponent';
import { useAuthStore } from '@/store/authStore';
import { useEventStore } from '@/store/eventStore';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const { user, setAuth } = useAuthStore();
  const router = useRouter();
  const events = useEventStore((state) => state.events);

  const userStats = {
    attendedEvents: events.filter((e) => e.status === 'attended').length,
    createdEvents: events.filter((e) => e.promoter === user?.id).length,
  };


  if (!user) return <Text style={styles.error}>Please log in</Text>;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAuth(null);
    router.replace('/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeaderComponent
        name={user.user_metadata?.full_name || 'Sly'}
        location="Lagos, Nigeria"
        avatar={user.user_metadata?.avatar_url || 'https://via.placeholder.com/150'}
      />
      <UserStatsComponent stats={userStats} />
      <ProfileActionsComponent onLogout={handleLogout} onEdit={() => router.push('/profile/settings')} />
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
});