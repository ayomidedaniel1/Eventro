import { Animated, Easing, StyleSheet, View } from 'react-native';

export default function NewEventSkeleton() {
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
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Animated.View
          style={[
            styles.image,
            {
              backgroundColor: '#E0E0E0',
              opacity: fade,
            },
          ]}
        />
      </View>
      <View style={styles.dataContainer}>
        <View style={styles.date} />
        <View style={styles.title} />
        <View style={styles.locationContainer}>
          <View style={styles.locationIcon} />
          <View style={styles.location} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    width: 335,
    height: 88,
    marginBottom: 14,
  },
  imageContainer: {
    width: 64,
    height: 88,
    borderRadius: 12,
  },
  image: {
    width: 64,
    height: 88,
    borderRadius: 12,
  },
  dataContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 4,
    gap: 6,
    width: 255,
    height: 88,
  },
  date: {
    width: 120,
    height: 19,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
  },
  title: {
    width: 200,
    height: 19,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationIcon: {
    width: 12,
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
  },
  location: {
    width: 100,
    height: 14,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
  },
});