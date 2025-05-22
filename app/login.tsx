import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/utils/supabase';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const { user } = useAuthStore();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    if (user) router.replace('/');
  }, [user]);

  const login = async () => {
    if (!email) return setError('Please enter your email');
    if (!password) return setError('Please set a password');

    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("@/assets/images/icons/smile.png")}
        contentFit="cover"
        transition={600}
      />

      <Text style={styles.title}>Welcome Back</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#888"
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <View style={styles.passwordWrapper}>
        <TextInput
          placeholder="Password"
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

      <TouchableOpacity onPress={() => router.push('/forgot-password')} activeOpacity={0.7}>
        <Text style={styles.forgotText}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={login} disabled={loading} activeOpacity={0.7}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      {!!error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity onPress={() => router.push('/register')} activeOpacity={0.7}>
        <Text style={styles.linkText}>Don&apos;t have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
  },
  image: {
    width: 151,
    height: 139,
    marginBottom: 24,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 24,
    color: '#2ACE99',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#DCFDE7',
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    fontFamily: 'Poppins-Regular',
    borderColor: '#B8FAD6',
  },
  forgotText: {
    color: '#2ACE99',
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#2ACE99',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  linkText: {
    color: '#2ACE99',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
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
});