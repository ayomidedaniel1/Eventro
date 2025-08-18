import { Animated, Easing, StyleSheet, View } from "react-native";

export default function UpcomingEventSkeleton() {
  const fadeValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(fadeValue, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();

  const fade = fadeValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 0.7, 0.3],
  });

  return (
    <View style={styles.eventCard}>
      <Animated.View
        style={[styles.image, { backgroundColor: "#333", opacity: fade }]}
      />

      <View style={styles.priceContainer}>
        <Animated.View
          style={[styles.priceBox, { backgroundColor: "#444", opacity: fade }]}
        />
        <Animated.View
          style={[
            styles.favouriteContainer,
            { backgroundColor: "#444", opacity: fade },
          ]}
        />
      </View>

      <View style={styles.contentContainer}>
        <Animated.View
          style={[styles.title, { backgroundColor: "#444", opacity: fade }]}
        />
        <View style={styles.dataContainer}>
          <View style={styles.row}>
            <Animated.View
              style={[styles.icon, { backgroundColor: "#444", opacity: fade }]}
            />
            <Animated.View
              style={[styles.text, { backgroundColor: "#444", opacity: fade }]}
            />
          </View>
          <View style={styles.row}>
            <Animated.View
              style={[styles.icon, { backgroundColor: "#444", opacity: fade }]}
            />
            <Animated.View
              style={[styles.text, { backgroundColor: "#444", opacity: fade }]}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  eventCard: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: 290,
    height: 300,
    backgroundColor: "#1C1C1E",
    borderRadius: 24,
    borderWidth: 0.5,
    borderColor: "#434344",
    marginRight: 16,
    padding: 10,
  },
  image: {
    width: 270,
    height: 180,
    borderRadius: 20,
  },
  priceContainer: {
    position: "absolute",
    top: 136,
    left: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 250,
    height: 34,
  },
  priceBox: {
    width: 80,
    height: 34,
    borderRadius: 100,
  },
  favouriteContainer: {
    width: 34,
    height: 34,
    borderRadius: 100,
  },
  contentContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
    gap: 6,
    marginTop: 8,
  },
  title: {
    width: 200,
    height: 20,
    borderRadius: 6,
  },
  dataContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  icon: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  text: {
    width: 120,
    height: 14,
    borderRadius: 4,
  },
});
