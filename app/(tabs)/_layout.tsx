import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName='events'
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#010101',
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarActiveBackgroundColor: '#FFFFFF',
        tabBarInactiveBackgroundColor: '#010101',
        tabBarStyle: {
          backgroundColor: '#010101',
          paddingBottom: 0,
          paddingTop: 0,
          height: 90,
          position: 'absolute',
          overflow: 'hidden',
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarItemStyle: {
          marginTop: 0,
          // height: 90,
          // paddingHorizontal: 32,
          // borderTopEndRadius: 12,
          // borderTopLeftRadius: 12,
        },
        tabBarLabelStyle: {
          fontFamily: 'Manrope-SemiBold',
          fontSize: 14,
          lineHeight: 24,
        },
      }}
    >
      <Tabs.Screen
        name="events"
        options={{
          title: 'Events',
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                backgroundColor: focused ? '#fff' : 'transparent',
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                paddingVertical: 12,
                paddingHorizontal: 18,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FontAwesome6
                name="house"
                size={24}
                color={focused ? '#010101' : '#fff'}
              />
              <Text
                style={{
                  color: focused ? '#010101' : '#fff',
                  fontFamily: 'Manrope-SemiBold',
                  fontSize: 14,
                  marginTop: 4,
                }}
              >
                Events
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="tickets"
        options={{
          title: 'Tickets',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? '#fff' : 'transparent',
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                paddingVertical: 12,
                paddingHorizontal: 18,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FontAwesome6
                name="ticket-simple"
                size={22}
                color={focused ? '#010101' : '#fff'}
              />
              <Text
                style={{
                  color: focused ? '#010101' : '#fff',
                  fontFamily: 'Manrope-SemiBold',
                  fontSize: 14,
                  marginTop: 4,
                }}
              >
                Tickets
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? '#fff' : 'transparent',
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                paddingVertical: 12,
                paddingHorizontal: 18,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FontAwesome6
                name="bookmark"
                size={22}
                color={focused ? '#010101' : '#fff'}
              />
              <Text
                style={{
                  color: focused ? '#010101' : '#fff',
                  fontFamily: 'Manrope-SemiBold',
                  fontSize: 14,
                  marginTop: 4,
                }}
              >
                Saved
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? '#fff' : 'transparent',
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                paddingVertical: 12,
                paddingHorizontal: 18,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons
                name="person-outline"
                size={24}
                color={focused ? '#010101' : '#fff'}
              />
              <Text
                style={{
                  color: focused ? '#010101' : '#fff',
                  fontFamily: 'Manrope-SemiBold',
                  fontSize: 14,
                  marginTop: 4,
                }}
              >
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
