import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export default function OnboardingScreen() {
  const router = useRouter();

  const createScale = useSharedValue(1);
  const signInScale = useSharedValue(1);

  const createButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: createScale.value }],
  }));

  const signInButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: signInScale.value }],
  }));


  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />

      <ImageBackground
        source={require('@/assets/images/Onboard.png')}
        style={styles.imgBg}
        resizeMode="cover"
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={['#67676729', '#010101E5']}
          style={styles.backgroundImageGradient}
        />
      </ImageBackground>

      <View style={styles.overlay}>
        <Animated.Text entering={FadeInDown.delay(200).duration(800)} style={styles.title}>
          Eventro.
        </Animated.Text>
        <Animated.Text entering={FadeInDown.delay(400).duration(800)} style={styles.subtitle}>
          Find the hottest events around, concerts, art, culture, and more. Eventro is your gateway to unforgettable moments
        </Animated.Text>

        <Animated.View entering={FadeInUp.delay(800).duration(800)}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPressIn={() => (createScale.value = withSpring(0.96))}
            onPressOut={() => (createScale.value = withSpring(1))}
            onPress={() => router.push('/auth/register')}
          >
            <Animated.View style={[styles.createButton, createButtonStyle]}>
              <Text style={styles.createButtonText}>Create account</Text>
              <Ionicons name="chevron-forward" size={14} color="#010101" />
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(1200).duration(800)}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPressIn={() => (signInScale.value = withSpring(0.96))}
            onPressOut={() => (signInScale.value = withSpring(1))}
            onPress={() => router.push('/auth/login')}
          >
            <Animated.View style={[styles.signInButton, signInButtonStyle]}>
              <Text style={styles.signInButtonText}>Sign in</Text>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010101',
  },
  imgBg: {
    flex: 0.7,
  },
  backgroundImageGradient: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 45,
    lineHeight: 50,
    fontFamily: 'Manrope-ExtraBold',
    color: '#DFF1E2',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Manrope-Medium',
    color: '#DFF1E2',
    marginBottom: 80,
  },
  createButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    marginBottom: 15,
    gap: 12,
    height: 64,
  },
  createButtonText: {
    fontSize: 20,
    lineHeight: 30,
    fontFamily: 'Manrope-Medium',
    color: '#010101',
  },
  signInButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    gap: 12,
    height: 64,
    borderRadius: 100,
  },
  signInButtonText: {
    fontSize: 20,
    lineHeight: 30,
    fontFamily: 'Manrope-Medium',
    color: '#FFFFFF',
  },
});
