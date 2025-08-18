import { Animated, Easing, StyleSheet, View } from "react-native";
import React, { useRef, useEffect } from "react";

export default function MostRatedEventSkeleton() {
  const fadeValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(fadeValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [fadeValue]);

  const fade = fadeValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 0.7, 0.3],
  });

  return (
    <View style={styles.eventContainer}>
      <Animated.View style={[styles.image, { opacity: fade }]} />

      <View style={styles.dataContainer}>
        <View style={styles.detailsContainer}>
          <Animated.View style={[styles.title, { opacity: fade }]} />

          <View style={styles.locationContainer}>
            <Animated.View style={[styles.locationIcon, { opacity: fade }]} />
            <Animated.View style={[styles.location, { opacity: fade }]} />
          </View>

          <View style={styles.bottomContainer}>
            <View style={styles.dateContainer}>
              <Animated.View style={[styles.icon, { opacity: fade }]} />
              <Animated.View style={[styles.date, { opacity: fade }]} />
            </View>

            <View style={styles.dateContainer}>
              <Animated.View style={[styles.icon, { opacity: fade }]} />
              <Animated.View style={[styles.date, { opacity: fade }]} />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.ratingContainer}>
        <Animated.View style={[styles.star, { opacity: fade }]} />
        <Animated.View style={[styles.rating, { opacity: fade }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  eventContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
    padding: 10,
    width: "100%",
    height: 100,
    backgroundColor: "#1C1C1E",
    borderRadius: 16,
    marginBottom: 14,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 14,
    backgroundColor: "#E0E0E0",
  },
  dataContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 80,
  },
  detailsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 5,
  },
  title: {
    width: 160,
    height: 18,
    borderRadius: 4,
    backgroundColor: "#E0E0E0",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  locationIcon: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#E0E0E0",
  },
  location: {
    width: 100,
    height: 14,
    borderRadius: 4,
    backgroundColor: "#E0E0E0",
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  icon: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#E0E0E0",
  },
  date: {
    width: 80,
    height: 14,
    borderRadius: 4,
    backgroundColor: "#E0E0E0",
  },
  ratingContainer: {
    width: 58,
    height: 32,
    borderRadius: 30,
    backgroundColor: "#3C3C3F",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  star: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#E0E0E0",
  },
  rating: {
    width: 20,
    height: 12,
    borderRadius: 4,
    backgroundColor: "#E0E0E0",
  },
});
