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
  const dotX = useSharedValue(-50); // dot starts left of center
  const textX = useSharedValue(50); // text starts off to the right
  const dotScale = useSharedValue(1); // dot scale for merge
  const opacity = useSharedValue(1); // opacity for fade out

  useEffect(() => {
    const runAnimation = async () => {
      // Slight delay to show splash
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Step 1: Dot moves to center
      dotX.value = withSpring(0, { damping: 8, stiffness: 100 });

      // Step 2: Text slides in (150ms after dot)
      setTimeout(() => {
        textX.value = withSpring(0, { damping: 8, stiffness: 100 });
      }, 150);

      // Step 3: Dot merges into text (900ms after start)
      setTimeout(() => {
        dotScale.value = withTiming(0, { duration: 400 });
      }, 900);

      // Step 4: Fade out splash and transition to next screen (1400ms total)
      setTimeout(async () => {
        opacity.value = withTiming(0, { duration: 400 }); // Fade out over 400ms
        await new Promise((resolve) => setTimeout(resolve, 400)); // Wait for fade
        await SplashScreen.hideAsync();
        onFinish(); // Trigger next screen
      }, 1400);
    };

    runAnimation();
  }, []);

  const dotStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: dotX.value }, { scale: dotScale.value }],
    opacity: opacity.value, // Fade out with container
  }));

  const textStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: textX.value }],
    opacity: opacity.value, // Fade out with container
  }));

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value, // Apply fade to entire container
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