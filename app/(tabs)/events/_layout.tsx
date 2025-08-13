import { Stack } from 'expo-router';

export default function EventLayout() {
  return (
    <Stack>
      <Stack.Screen name="[id]/detail" options={{ headerShown: false }} />
      <Stack.Screen name="[id]/chat" options={{ headerShown: false }} />
    </Stack>
  );
}