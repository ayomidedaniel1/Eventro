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
      <HeaderComponent title="Eventro." />

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
        <View style={styles.textContainer}>
          <View style={styles.icon}>
            <Ionicons name="log-out-outline" size={16} color="#012508" />
          </View>
          <Text style={styles.logoutText}>Log out</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010101',
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
    gap: 20,
    paddingHorizontal: 20,
    // height: 400, 360
    backgroundColor: '#1C1C1E',
    borderRadius: 30,
  },
  line: {
    width: '100%',
    borderWidth: .2,
    borderColor: '#7D7F82',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 12,
    gap: 10,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  icon: {
    width: 34,
    height: 34,
    backgroundColor: '#FFFFFF',
    borderWidth: .34,
    borderColor: '#FFFFFF',
    borderRadius: 34,
  },
  logoutText: {
    color: '#FFFFFF',
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
    lineHeight: 24,
  },
});