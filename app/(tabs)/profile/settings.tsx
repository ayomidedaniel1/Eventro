import HeaderComponent from '@/components/HeaderComponent';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <HeaderComponent title="Personal Info" />

      <Text>⚙️ Settings Screen (Coming Soon)</Text>
    </SafeAreaView>
  );
}
