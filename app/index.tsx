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
        >
          <Text style={styles.createButtonText}>Create account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => router.push('/login')}
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
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#d1d5db',
    marginBottom: 30,
  },
  createButton: {
    backgroundColor: 'white',
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 15,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  signInButton: {
    borderWidth: 1,
    borderColor: 'white',
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 30,
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});