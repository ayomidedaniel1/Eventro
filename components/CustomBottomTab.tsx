// CustomTabBar.tsx (new file)
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Text, TouchableOpacity, View } from 'react-native';

export default function CustomBottomTab({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#010101',
        height: 90,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title !== undefined ? options.title : route.name;
        const isFocused = state.index === index;

        let IconLibrary: typeof FontAwesome6 | typeof Ionicons = FontAwesome6;
        let iconName: string;
        let iconSize = 22;

        switch (route.name) {
          case 'events':
            iconName = 'house';
            iconSize = 24;
            break;
          case 'tickets':
            iconName = 'ticket-simple';
            break;
          case 'saved':
            iconName = 'bookmark';
            break;
          case 'profile':
            iconName = 'person-outline';
            IconLibrary = Ionicons;
            iconSize = 24;
            break;
          default:
            iconName = 'circle'; // fallback
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={{ selected: isFocused }}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: 'center' }}
          >
            <View
              style={{
                backgroundColor: isFocused ? '#fff' : 'transparent',
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                paddingVertical: 12,
                paddingHorizontal: 18,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <IconLibrary
                name={iconName}
                size={iconSize}
                color={isFocused ? '#010101' : '#fff'}
              />
              <Text
                style={{
                  color: isFocused ? '#010101' : '#fff',
                  fontFamily: 'Manrope-SemiBold',
                  fontSize: 14,
                  marginTop: 4,
                }}
              >
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}