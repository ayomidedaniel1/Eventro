import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CustomTopTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={0.6}
            style={[styles.tabButton, isFocused && styles.tabButtonActive]}
          >
            <Text
              style={[
                styles.tabLabel,
                { color: isFocused ? "#010101" : "#FFFFFF" },
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#010101",
  },
  tabBarContainer: {
    flexDirection: "row",
    alignItems: 'center',
    alignSelf: "center",
    marginHorizontal: 20,
    marginVertical: 24,
    borderWidth: 1,
    borderColor: "#434344",
    borderRadius: 30,
    overflow: "hidden",
    height: 58,
    gap: 10,
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    height: 50,
    borderRadius: 30,
  },
  tabButtonActive: {
    backgroundColor: "#FFFFFF",
  },
  tabLabel: {
    fontFamily: "Manrope-Medium",
    fontSize: 14,
    lineHeight: 24,
  },
});
