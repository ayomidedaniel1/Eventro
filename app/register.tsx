import { supabase } from '@/services/supabase';
import { useAuthStore } from '@/store/authStore';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, TextInput, View } from 'react-native';

export default function RegisterScreen() {
  const { user } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) router.replace('/');
  }, [user]);

  const register = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) console.error(error.message);
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Email" onChangeText={setEmail} value={email} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} value={password} />
      <Button title="Register" onPress={register} />
    </View>
  );
}
