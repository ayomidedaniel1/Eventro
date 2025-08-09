import AnimatedSplashScreen from '@/components/AnimatedSplashScreen';
import { AuthProvider } from '@/contexts/AuthProvider';
import { useDeepLinkAuth } from '@/hooks/useDeepLink';
import { useAuthStore } from '@/store/authStore';
import { useEventStore } from '@/store/eventStore';
import { seedEvents } from '@/utils/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const queryClient = new QueryClient();
const SEED_INTERVAL = 24 * 60 * 60 * 1000;

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useDeepLinkAuth();
  const router = useRouter();
  const { user } = useAuthStore();
  const [showSplash, setShowSplash] = useState(true);

  const setEvents = useEventStore((state) => state.setEvents);
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
  }, [error]);

  useEffect(() => {
    const checkAndSeedEvents = async () => {
      try {
        const lastSeedTime = await AsyncStorage.getItem('lastSeedTime');
        const now = Date.now();

        if (!lastSeedTime || (now - parseInt(lastSeedTime, 10)) >= SEED_INTERVAL) {
          const data = await seedEvents();
          if (data) {
            setEvents(data);
            await AsyncStorage.setItem('lastSeedTime', now.toString());
          }
        }
      } catch (err) {
        console.error('Error seeding events:', err);
      }
    };

    if (fontsLoaded) checkAndSeedEvents();
  }, [fontsLoaded, setEvents]);

  const nextScreenOpacity = useSharedValue(0); // Control fade-in of next screen

  useEffect(() => {
    if (!showSplash && fontsLoaded) {
      const nextRoute = user ? '/(tabs)' : '/';
      router.replace(nextRoute);
      nextScreenOpacity.value = withTiming(1, { duration: 400 }); // Fade in next screen over 400ms
    }
  }, [showSplash, fontsLoaded, user, router]);

  const nextScreenStyle = useAnimatedStyle(() => ({
    opacity: nextScreenOpacity.value,
  }));

  if (!fontsLoaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PaperProvider>
          {showSplash ? (
            <AnimatedSplashScreen
              onFinish={async () => {
                await SplashScreen.hideAsync();
                setShowSplash(false);
              }}
            />
          ) : (
            <Animated.View style={[{ flex: 1 }, nextScreenStyle]}>
              <Stack screenOptions={{ headerShown: false }}>
                {/* Public Screens */}
                <Stack.Screen name="index" />
                <Stack.Screen name="login" />
                <Stack.Screen name="register" />
                <Stack.Screen name="forgot-password" />
                <Stack.Screen name="reset-password" />

                {/* Tab group shown after login */}
                <Stack.Screen name="(tabs)" />
              </Stack>
              <StatusBar style="dark" />
            </Animated.View>
          )}
        </PaperProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
