import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function OnboardingScreen() {
  const router = useRouter();

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
        <Text style={styles.title}>Eventro.</Text>
        <Text style={styles.subtitle}>
          Find the hottest events around, concerts, art, culture, and more. Eventro is your gateway
          to unforgettable moments
        </Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => router.push('/register')}
          activeOpacity={0.5}
        >
          <Text style={styles.createButtonText}>Create account</Text>
          <Ionicons name="chevron-forward" size={12} style={{ backgroundColor: '#01010100' }} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => router.push('/login')}
          activeOpacity={0.5}
        >
          <Text style={styles.signInButtonText}>Sign in</Text>
        </TouchableOpacity>
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