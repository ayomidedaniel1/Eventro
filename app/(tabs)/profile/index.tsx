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
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent title="My Account" />

      <ProfileHeaderComponent
        name={user.user_metadata?.name || ''}
        email={user.user_metadata?.email || ''}
        avatar={user.user_metadata?.avatar_url || require('@/assets/images/icon.png')}
      />

      <View style={styles.actionsContainer}>
        <ProfileActionsComponent
          action={() => router.push('/profile/settings')}
          title='Personal Info'
          icon='person-outline'
        />
        <View style={styles.line} />

        {/* <ProfileActionsComponent
          action={() => router.push('/profile/password')}
          title='Change Password'
          icon='lock-closed-outline'
        />
        <View style={styles.line} /> */}

        <ProfileActionsComponent
          action={() => router.push('/profile/tickets')}
          title='My Tickets'
          icon='ticket-outline'
        />
        <View style={styles.line} />

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
  },
  error: {
    textAlign: 'center',
    marginTop: 60,
    color: 'red',
    fontFamily: 'Manrope-Regular',
  },
  actionsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
  },
  line: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#EDEDED',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 12,
    gap: 10,
  },
  logoutText: {
    color: '#CC0000',
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    lineHeight: 19,
  },
});