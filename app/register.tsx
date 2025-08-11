// app/register.tsx
import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/utils/supabase';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Linking,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default function RegisterScreen() {
  const { user } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user) router.replace('/');
  }, [user]);

  const register = async () => {
    if (!name) return setError('Please enter your name');
    if (!email) return setError('Please enter your email');
    if (!password) return setError('Please set a password');

    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: 'eventro://auth/callback',
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setShowModal(true);
      setName('');
      setEmail('');
      setPassword('');
    }

    setLoading(false);
  };

  const openMailApp = async () => {
    const mailtoUrl = `mailto:${email}`;
    const canOpen = await Linking.canOpenURL(mailtoUrl);

    if (canOpen) {
      await Linking.openURL(mailtoUrl);
    } else {
      Alert.alert(
        'No Mail App',
        'Please check your email manually or set a default mail app.'
      );
    }
    setShowModal(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          {/* Back button */}
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Join Eventro.</Text>
          <Text style={styles.subText}>
            Let’s get you in. Join Eventro and start discovering amazing events
            near you.
          </Text>

          <Text style={styles.label}>Enter full name</Text>
          <TextInput
            placeholder="Enter your full name here"
            placeholderTextColor="#888"
            style={styles.input}
            onChangeText={setName}
            value={name}
            keyboardType="default"
          />

          <Text style={styles.label}>Enter email address</Text>
          <TextInput
            placeholder="Enter your email address"
            placeholderTextColor="#888"
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Enter password</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              placeholder="Password must contain 8 characters"
              placeholderTextColor="#888"
              style={styles.input}
              secureTextEntry={!showPassword}
              onChangeText={setPassword}
              value={password}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(prev => !prev)}
              activeOpacity={0.6}
            >
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={20}
                color="#888"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={register}
            disabled={loading}
            activeOpacity={0.7}
          >
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text style={styles.buttonText}>Continue</Text>
            )}
          </TouchableOpacity>

          {!!error && <Text style={styles.errorText}>{error}</Text>}

          <Text style={styles.linkText}>
            Already have an account?{' '}
            <Text
              style={styles.signIn}
              onPress={() => router.push('/login')}
            >
              Sign in
            </Text>
          </Text>

          {/* Modal */}
          <Modal
            animationType="fade"
            transparent
            visible={showModal}
            onRequestClose={() => setShowModal(false)}
          >
            <View style={styles.modalBackdrop}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Verify Your Email</Text>
                <Text style={styles.modalText}>
                  Check your email to confirm your account.
                </Text>

                <TouchableOpacity
                  style={styles.modalButton}
                  activeOpacity={0.7}
                  onPress={openMailApp}
                >
                  <Text style={styles.modalButtonText}>Open Mail App</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    marginBottom: 8,
  },
  subText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#ccc',
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'transparent',
    borderColor: '#333',
    borderWidth: 1,
    padding: 14,
    borderRadius: 8,
    marginBottom: 24,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#fff',
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
  button: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  linkText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  signIn: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
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
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
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
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
});
