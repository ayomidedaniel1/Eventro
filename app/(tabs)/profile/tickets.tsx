import HeaderComponent from '@/components/HeaderComponent';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TicketsScreen() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <HeaderComponent title="My Tickets" />

      <Text>⚙️ Tickets Screen (Coming Soon)</Text>
    </SafeAreaView>
  );
}
