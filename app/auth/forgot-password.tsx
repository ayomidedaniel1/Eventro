import { supabase } from '@/utils/supabase';
import { FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState<string | null>(null);

  const handleReset = async () => {
    if (!email) return setError('Please enter your email');

    setLoading(true);
    setMessage('');
    setError('');

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'eventro://reset-password',
    });

    if (error) {
      setError(error.message);
    } else {
      setEmail('');
      setMessage('Check your email for the reset link.');
    }

    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <FontAwesome6 name="arrow-left-long" size={20} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Reset Password</Text>
          <Text style={styles.subText}>Enter your email and we&apos;ll send you a reset link.</Text>

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

          {!!error && <Text style={styles.errorText}>{error}</Text>}
          {!!message && <Text style={styles.successText}>{message}</Text>}

          <View style={styles.ctaContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleReset}
              disabled={loading}
              activeOpacity={0.5}
            >
              {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.buttonText}>Send Reset Link</Text>}
            </TouchableOpacity>
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Manrope-Regular',
    marginBottom: 12,
  },
  successText: {
    color: 'green',
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Manrope-Regular',
    marginBottom: 12,
  },
});
