import { Stack } from 'expo-router';

export default function TicketLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[id]/detail" options={{ headerShown: false }} />
    </Stack>
  );
}