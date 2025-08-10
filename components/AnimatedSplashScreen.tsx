import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export default function AnimatedSplashScreen({ onFinish }: { onFinish: () => void; }) {
  const dotX = useSharedValue(-50);
  const textX = useSharedValue(50);
  const dotScale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    const runAnimation = async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));

      dotX.value = withSpring(0, { damping: 8, stiffness: 100 });

      setTimeout(() => {
        textX.value = withSpring(0, { damping: 8, stiffness: 100 });
      }, 150);

      setTimeout(() => {
        dotScale.value = withTiming(0, { duration: 400 });
      }, 900);

      setTimeout(async () => {
        opacity.value = withTiming(0, { duration: 400 });
        await new Promise((resolve) => setTimeout(resolve, 400));
        await SplashScreen.hideAsync();
        onFinish();
      }, 1400);
    };

    runAnimation();
  }, []);

  const dotStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: dotX.value }, { scale: dotScale.value }],
    opacity: opacity.value,
  }));

  const textStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: textX.value }],
    opacity: opacity.value,
  }));

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Animated.View style={[styles.dot, dotStyle]} />
      <Animated.Text style={[styles.text, textStyle]}>Eventro</Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#010101",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 60,
    height: 60,
    backgroundColor: "#DFF1E2",
    borderRadius: 100,
    marginRight: 8,
  },
  text: {
    color: "#DFF1E2",
    fontSize: 45,
    lineHeight: 50,
    fontWeight: "bold",
    fontFamily: "Poppins-ExtraBold",
  },
});