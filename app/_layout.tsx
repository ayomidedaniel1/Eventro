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
import { useEffect, useState } from 'react';
import { PaperProvider } from 'react-native-paper';
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
    "Manrope-Regular": require('@/assets/fonts/Manrope-Regular.ttf'),
    "Manrope-Medium": require('@/assets/fonts/Manrope-Medium.ttf'),
    "Manrope-SemiBold": require('@/assets/fonts/Manrope-SemiBold.ttf'),
    "Manrope-Bold": require('@/assets/fonts/Manrope-Bold.ttf'),
    "Manrope-ExtraBold": require('@/assets/fonts/Manrope-ExtraBold.ttf'),
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

  const nextScreenOpacity = useSharedValue(0);

  useEffect(() => {
    if (!showSplash && fontsLoaded) {
      const nextRoute = user ? '/(tabs)/events' : '/';
      router.replace(nextRoute);
      nextScreenOpacity.value = withTiming(1, { duration: 400 });
    }
  }, [showSplash, fontsLoaded, user, router, nextScreenOpacity]);

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
            <Animated.View style={[{ flex: 1, backgroundColor: "#010101", }, nextScreenStyle]}>
              <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#010101' } }}>
                {/* Public Screens */}
                <Stack.Screen name="index" />

                {/* Auth Screens */}
                <Stack.Screen name="auth/login" />
                <Stack.Screen name="auth/register" />
                <Stack.Screen name="auth/forgot-password" />
                <Stack.Screen name="auth/reset-password" />

                {/* Tab group shown after login */}
                <Stack.Screen name="(tabs)" />
              </Stack>
            </Animated.View>
          )}
        </PaperProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
