import { Stack } from "expo-router";

export default function EventLayout() {
  return (
    <Stack>
      <Stack.Screen name="customer-support" options={{ headerShown: false }} />
      <Stack.Screen name="[id]/index" options={{ headerShown: false }} />
      <Stack.Screen name="[id]/chat" options={{ headerShown: false }} />
      <Stack.Screen name="[id]/poll" options={{ headerShown: false }} />
      <Stack.Screen name="[id]/schedule" options={{ headerShown: false }} />
    </Stack>
  );
};
