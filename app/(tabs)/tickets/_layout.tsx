import HeaderComponent from '@/components/HeaderComponent';
import { Tabs } from 'expo-router';
import { SafeAreaView } from 'react-native';

export default function TabsLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#010101', }}>
      <HeaderComponent title="Eventro." />

      <Tabs
        initialRouteName='index'
        screenOptions={{
          tabBarPosition: 'top',
          tabBarActiveTintColor: "#010101",
          tabBarInactiveTintColor: '#FFFFFF',
          tabBarActiveBackgroundColor: '#FFFFFF',
          tabBarInactiveBackgroundColor: 'transparent',
          tabBarLabelStyle: {
            fontFamily: 'Manrope-Medium',
            fontSize: 14,
            lineHeight: 24,
            textAlign: 'center',
          },
          tabBarStyle: { backgroundColor: "#fff" },
          headerShown: false,
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Active tickets',
          }}
        />
        <Tabs.Screen
          name="used-tickets"
          options={{
            title: 'Used tickets',
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}