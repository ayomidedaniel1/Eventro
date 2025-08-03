import NewEvents from '@/components/NewEvents';
import PopularEvents from '@/components/PopularEvents';
import { useAuthStore } from '@/store/authStore';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { user } = useAuthStore();

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
            Ayomide Daniel
          </Text>
        </View>

        <View style={styles.imgContainer}>
          <Image
            //  source={{ uri: event.image }} 
            source={'@assets/images/icons/smile.png'}
            style={styles.image}
            contentFit='cover'
          />
        </View>
      </View>

      <PopularEvents />

      <NewEvents />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingTop: (StatusBar.currentHeight ?? 0) + 14,
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
  imgContainer: {
    width: 45,
    height: 45,
    backgroundColor: '#D9D9D9',
  },
  image: {
    width: 45,
    height: 45,
    backgroundColor: '#D9D9D9',
  },
});
