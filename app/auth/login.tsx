import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/utils/supabase';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Keyboard, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

export default function LoginScreen() {
  const { user } = useAuthStore();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (user) router.replace('/(tabs)/events');
  }, [user]);

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (text.length > 0 && text.length < 8) {
      setPasswordError('Password must be at least 8 characters');
    } else {
      setPasswordError('');
    }
  };

  const login = async () => {
    if (!email) return setError('Please enter your email');
    if (!password) return setError('Please set a password');

    setLoading(true);
    setError('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else if (!data.user?.confirmed_at) {
      setError('Please confirm your email before logging in');
    } else {
      router.replace('/(tabs)/events');
    }

    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, position: 'relative', width: '100%' }}>
          {/* Back button */}
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <FontAwesome6 name="arrow-left-long" size={20} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Welcome back.</Text>
          <Text style={styles.subText}>
            Sign in to continue discovering amazing events near you.
          </Text>

          <Text style={styles.label}>Enter email address</Text>
          <TextInput
            placeholder="Enter your email address"
            placeholderTextColor="#7B7B7B"
            style={[
              styles.input,
              { borderColor: isFocused === 'email' ? '#FFF' : '#A2A4B2' }
            ]}
            onChangeText={setEmail}
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
            cursorColor="#FFF"
            onFocus={() => setIsFocused('email')}
            onBlur={() => setIsFocused(null)}
          />

          <Text style={styles.label}>Enter password</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              placeholder="Password must contain 8 characters"
              placeholderTextColor="#7B7B7B"
              style={[
                styles.input,
                { borderColor: isFocused === 'password' ? '#FFF' : '#A2A4B2' }
              ]}
              secureTextEntry={!showPassword}
              onChangeText={handlePasswordChange}
              value={password}
              cursorColor="#FFF"
              onFocus={() => setIsFocused('password')}
              onBlur={() => setIsFocused(null)}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(prev => !prev)}
              activeOpacity={0.6}
            >
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={22}
                color="#7B7B7B"
              />
            </TouchableOpacity>
          </View>

          {passwordError ? (
            <Text style={styles.passwordErrorText}>{passwordError}</Text>
          ) : null}
          {!!error && <Text style={styles.errorText}>{error}</Text>}

          <View style={styles.ctaContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={login}
              disabled={loading}
              activeOpacity={0.5}
            >
              {loading ? (
                <ActivityIndicator color="#000" />
              ) : (
                <Text style={styles.buttonText}>Continue</Text>
              )}
            </TouchableOpacity>

            <Text style={styles.linkText}>
              Don’t have an account?{' '}
              <Text
                style={styles.signIn}
                onPress={() => router.push('/auth/register')}
              >
                Register
              </Text>
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010101',
    padding: 24,
    paddingTop: 60,
  },
  backButton: {
    marginBottom: 24,
    width: 42,
    height: 42,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: '#7D7F82',
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 34,
    lineHeight: 50,
    fontFamily: 'Manrope-ExtraBold',
    color: '#DFF1E2',
    marginBottom: 8,
  },
  subText: {
    fontSize: 14,
    lineHeight: 24,
    fontFamily: 'Manrope-Medium',
    color: '#DFF1E2',
    marginBottom: 32,
  },
  label: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Manrope-Medium',
    color: '#DDDDDD',
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    padding: 14,
    borderRadius: 12,
    marginBottom: 24,
    fontSize: 16,
    fontFamily: 'Manrope-Regular',
    color: '#fff',
    height: 54,
  },
  passwordWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 18,
  },
  ctaContainer: {
    position: 'absolute',
    bottom: 24,
    width: '100%',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    height: 64,
  },
  buttonText: {
    color: '#010101',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 30,
    fontFamily: 'Manrope-Medium',
  },
  linkText: {
    color: '#7D7F82',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Manrope-Medium',
  },
  signIn: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Manrope-Regular',
    marginBottom: 12,
  },
  passwordErrorText: {
    color: 'red',
    textAlign: 'left',
    fontSize: 12,
    fontFamily: 'Manrope-Regular',
    marginTop: -16,
    marginBottom: 12,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    width: '85%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Manrope-SemiBold',
    color: '#000',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 14,
    fontFamily: 'Manrope-Regular',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontFamily: 'Manrope-SemiBold',
    fontSize: 16,
  },
});
