import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

SplashScreen.preventAutoHideAsync();
const { width: screenWidth } = Dimensions.get("window");

export default function AnimatedSplashScreen({ onFinish }: { onFinish: () => void; }) {
  const dotX = useSharedValue(screenWidth + 50); // start offscreen right
  const dotY = useSharedValue(0);
  const dotWidth = useSharedValue(100);
  const dotHeight = useSharedValue(60);
  const textOpacity = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    const runAnimation = async () => {
      await new Promise(res => setTimeout(res, 300));

      // Move to far left
      dotX.value = withTiming(-screenWidth / 2 + 20, { duration: 500 });

      // Morph to circle (60×60) after reaching left
      setTimeout(() => {
        dotWidth.value = withTiming(60, { duration: 100 });
        dotHeight.value = withTiming(60, { duration: 100 });
      }, 500);

      // Move right across screen
      setTimeout(() => {
        dotWidth.value = withTiming(100, { duration: 240 });
        dotX.value = withTiming(40, { duration: 600 });

        // Fade in Eventro text halfway through movement
        setTimeout(() => {
          textOpacity.value = withTiming(1, { duration: 400 });
        }, 200);
      }, 700);

      // Drop into small period at end of Eventro
      setTimeout(() => {
        dotX.value = withTiming(0, { duration: 200 });
        dotY.value = withTiming(10, { duration: 500 });
        dotWidth.value = withTiming(6, { duration: 400 });
        dotHeight.value = withTiming(6, { duration: 400 });
      }, 1500);

      // Fade out splash
      setTimeout(async () => {
        opacity.value = withTiming(0, { duration: 400 });
        await new Promise(res => setTimeout(res, 400));
        await SplashScreen.hideAsync();
        onFinish();
      }, 2000);
    };

    runAnimation();
  }, []);

  const dotStyle = useAnimatedStyle(() => ({
    width: dotWidth.value,
    height: dotHeight.value,
    borderRadius: dotHeight.value / 2,
    transform: [
      { translateX: dotX.value },
      { translateY: dotY.value },
    ],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Animated.Text style={[styles.text, textStyle]}>Eventro</Animated.Text>
      <Animated.View style={[styles.dot, dotStyle]} />
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
    backgroundColor: "#DFF1E2",
    marginLeft: 3,
  },
  text: {
    color: "#DFF1E2",
    fontSize: 45,
    lineHeight: 50,
    fontWeight: "bold",
    fontFamily: "Manrope-ExtraBold",
  },
});
