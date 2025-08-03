import NewEvents from '@/components/NewEvents';
import PopularEvents from '@/components/PopularEvents';
import { useEvents } from '@/hooks/useEvents';
import { useAuthStore } from '@/store/authStore';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { user } = useAuthStore();
  const { data: events = [] } = useEvents();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.welcomeText}>
            Welcome Back
          </Text>
          <Text style={styles.name}>
            {user?.user_metadata?.name || ''}
          </Text>
        </View>

        <Image
          //  source={{ uri: user.image }} 
          source={{ uri: '../../assets/images/icons/smile.png' }}
          style={styles.image}
          contentFit='cover'
        />
      </View>

      <PopularEvents events={events} />

      <NewEvents events={events} />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingTop: (StatusBar.currentHeight ?? 0) + 4,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameContainer: {
    flexDirection: 'column',
    textAlign: 'left',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  welcomeText: {
    fontFamily: 'ManropPoppins-Regular',
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.02,
    color: 'rgba(29, 29, 29, 0.5)',
  },
  name: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    lineHeight: 27,
    letterSpacing: -0.02,
    color: '#1D1D1D',
  },
  image: {
    width: 45,
    height: 45,
    backgroundColor: '#D9D9D9',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#2ACE99',
  },
});
