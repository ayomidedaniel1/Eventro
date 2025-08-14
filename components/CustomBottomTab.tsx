import { FontAwesome6, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
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

        let IconLibrary: typeof FontAwesome6 | typeof Ionicons | typeof MaterialCommunityIcons = FontAwesome6;
        let iconName: string;
        let iconSize = 24;

        switch (route.name) {
          case 'events':
            iconName = 'home-outline';
            IconLibrary = MaterialCommunityIcons;
            iconSize = 28;
            break;
          case 'tickets':
            iconName = 'ticket-confirmation-outline';
            IconLibrary = MaterialCommunityIcons;
            iconSize = 28;
            break;
          case 'saved':
            iconName = 'bookmark';
            iconSize = 22;
            break;
          case 'profile':
            iconName = 'person-outline';
            IconLibrary = Ionicons;
            iconSize = 22;
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
            activeOpacity={0.9}
            key={route.key}
            accessibilityRole="button"
            accessibilityState={{ selected: isFocused }}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            // testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: 'center' }}
          >
            <View
              style={{
                backgroundColor: isFocused ? '#fff' : 'transparent',
                borderTopLeftRadius: isFocused ? 14 : 12,
                borderBottomRightRadius: isFocused ? 14 : 12,
                height: 90,
                width: 64,
                paddingVertical: 19,
                alignItems: 'center',
                justifyContent: 'space-between',
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
                  fontFamily: 'Manrope-Medium',
                  fontSize: 14,
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