import { AuthProvider } from '@/contexts/AuthContext';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Regular": require('@/assets/fonts/Poppins-Regular.ttf'),
    "Poppins-Medium": require('@/assets/fonts/Poppins-Medium.ttf'),
    "Poppins-SemiBold": require('@/assets/fonts/Poppins-SemiBold.ttf'),
    "Poppins-Bold": require('@/assets/fonts/Poppins-Bold.ttf'),
    "Poppins-ExtraBold": require('@/assets/fonts/Poppins-ExtraBold.ttf'),
    "Poppins-Black": require('@/assets/fonts/Poppins-Black.ttf'),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="dark" />
    </AuthProvider>
  );
}
