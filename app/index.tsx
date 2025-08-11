import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export default function OnboardingScreen() {
  const router = useRouter();
  const scale = useSharedValue(1);

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
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
            onPressIn={() => (scale.value = withSpring(0.96))}
            onPressOut={() => (scale.value = withSpring(1))}
            onPress={() => router.push('/register')}
          >
            <Animated.View
              style={[styles.createButton, buttonStyle]}
              entering={FadeInUp.delay(600).duration(800)}
            >
              <Text style={styles.createButtonText}>Create account</Text>
              <Ionicons name="chevron-forward" size={14} color="#010101" />
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(1200).duration(800)}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPressIn={() => (scale.value = withSpring(0.96))}
            onPressOut={() => (scale.value = withSpring(1))}
            onPress={() => router.push('/login')}
          >
            <View style={styles.signInButton}>
              <Text style={styles.signInButtonText}>Sign in</Text>
            </View>
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
