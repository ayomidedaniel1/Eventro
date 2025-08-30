import HeaderComponent from '@/components/HeaderComponent';
import ProfileActionsComponent from '@/components/ProfileActionsComponent';
import ProfileHeaderComponent from '@/components/ProfileHeaderComponent';
import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
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

  const actionComponent = [
    {
      route: () => router.push("/profile/payment-methods"),
      title: "Payment methods",
      icon: 'card-outline' as const
    },
    {
      route: () => router.push("/profile/notifications"),
      title: "Notifications",
      icon: 'notifications-outline' as const
    },
    {
      route: () => router.push("/profile/support"),
      title: "Support",
      icon: 'chatbox-outline' as const
    },
    {
      route: () => router.push("/profile/about-us"),
      title: "About us",
      icon: 'chatbubbles-outline' as const
    },
    {
      route: handleLogout,
      title: "Log out",
      icon: 'log-out-outline' as const
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent title="Eventro." />

      <ProfileHeaderComponent
        name={user.user_metadata?.name || 'Sly'}
        email={user.user_metadata?.email || 'sly@gmail.com'}
        avatar={user.user_metadata?.avatar_url || require('@/assets/images/icon.png')}
      />

      <View style={styles.actionsContainer}>
        {actionComponent.map(action => (
          <>
            <ProfileActionsComponent
              key={action.title}
              action={action.route}
              title={action.title}
              icon={action.icon}
            />
            <View style={styles.line} />
          </>
        ))}
      </View>

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
    height: 400, // 360
    backgroundColor: '#1C1C1E',
    borderRadius: 30,
  },
  line: {
    width: '100%',
    borderWidth: .2,
    borderColor: '#7D7F82',
  },
});