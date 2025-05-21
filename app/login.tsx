import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/utils/supabase';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

export default function LoginScreen() {
  const { user } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) router.replace('/');
  }, [user]);

  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) console.error(error.message);
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Email" onChangeText={setEmail} value={email} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} value={password} />
      <Button title="Login" onPress={login} />
      <Text onPress={() => router.push('/register')}>Don&apos;t have an account?</Text>
    </View>
  );
}
