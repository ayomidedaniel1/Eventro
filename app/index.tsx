import { useRouter } from 'expo-router';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('@/assets/images/Onboard.png')}
      style={styles.container}
      resizeMode="cover"
    >
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
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
