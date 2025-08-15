import { supabase } from '@/utils/supabase';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
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

export default function ResetPasswordScreen() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState<string | null>(null);

  const handleReset = async () => {
    if (!password) return setError('Please enter a new password');

    setLoading(true);
    setError('');
    setSuccess('');

    const { data: { session }, error } = await supabase.auth.getSession();
    if (error || !session) {
      setError('Invalid session. Please use the link from your email.');
    } else {
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) setError(updateError.message);
      else {
        setSuccess('Password updated! Redirecting to login...');
        setTimeout(() => router.replace('/login'), 2000);
      }
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

          <Text style={styles.headerTitle}>Set New Password</Text>
          <Text style={styles.subText}>Enter your new password to continue.</Text>

          <Text style={styles.label}>Enter new password</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              placeholder="Password must contain 8 characters"
              placeholderTextColor="#7B7B7B"
              style={[
                styles.input,
                { borderColor: isFocused === 'password' ? '#FFF' : '#A2A4B2' }
              ]}
              secureTextEntry={!showPassword}
              onChangeText={setPassword}
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

          {!!error && <Text style={styles.errorText}>{error}</Text>}
          {!!success && <Text style={styles.successText}>{success}</Text>}

          <View style={styles.ctaContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleReset}
              disabled={loading}
              activeOpacity={0.5}
            >
              {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.buttonText}>Reset Password</Text>}
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
