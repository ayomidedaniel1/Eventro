import 'react-native-reanimated';

import { AuthProvider } from '@/contexts/AuthProvider';
import { useDeepLinkAuth } from '@/hooks/useDeepLink';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useDeepLinkAuth();

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
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <AuthProvider>
      <PaperProvider>
        <Stack screenOptions={{ headerShown: false }}>
          {/* Public Screens */}
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
          <Stack.Screen name="forgot-password" />
          <Stack.Screen name="reset-password" />

          {/* Tab group shown after login */}
          <Stack.Screen name="(tabs)" />
        </Stack>

        <StatusBar style="dark" />
      </PaperProvider>
    </AuthProvider>
  );
}
