import { useAuth } from '@/contexts/AuthContext';
import { auth } from '@/services/firebase';
import { router } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Button, TextInput, View } from 'react-native';

export default function Register() {
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) router.replace('/');
  }, [user]);

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Email" onChangeText={setEmail} value={email} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} value={password} />
      <Button title="Register" onPress={register} />
    </View>
  );
}
