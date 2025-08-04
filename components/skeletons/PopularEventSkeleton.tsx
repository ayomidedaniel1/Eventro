import { Animated, Easing, StyleSheet, View } from 'react-native';

export default function PopularEventSkeleton() {
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
    outputRange: [0.3, 0.7, 0.3], // Fade from 30% to 70% opacity and back
  });

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Animated.View
          style={[
            styles.image,
            {
              backgroundColor: '#E0E0E0',
              opacity: fade,
            },
          ]}
        />
        <View style={styles.dateContainer}>
          <View style={styles.date} />
          <View style={styles.month} />
        </View>
      </View>
      <View style={styles.contentContainer}>
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
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: 210,
    height: 248,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F4F4F4',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginRight: 18,
  },
  imgContainer: {
    width: 210,
    height: 140,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: 'relative',
  },
  image: {
    width: 210,
    height: 140,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  dateContainer: {
    position: 'absolute',
    top: 82,
    left: 12,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    gap: 2,
    width: 46,
    height: 46,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  date: {
    width: 20,
    height: 16,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
  },
  month: {
    width: 30,
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
  },
  contentContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    flex: 1,
  },
  title: {
    width: 150,
    height: 19,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 10,
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
    width: 80,
    height: 14,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
  },
});