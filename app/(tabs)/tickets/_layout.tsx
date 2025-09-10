import { Stack } from "expo-router";

export default function TicketsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="[id]/detail" options={{ headerShown: false }} />
    </Stack>
  );
}
