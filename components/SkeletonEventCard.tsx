import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export default function SkeletonEventCard() {
  return (
    <View style={styles.card}>
      <Animated.View
        entering={FadeIn.duration(500)}
        exiting={FadeOut.duration(500)}
        style={styles.imagePlaceholder}
      />
      <Animated.View
        entering={FadeIn.delay(100).duration(500)}
        exiting={FadeOut.duration(500)}
        style={styles.textPlaceholder}
      />
      <Animated.View
        entering={FadeIn.delay(200).duration(500)}
        exiting={FadeOut.duration(500)}
        style={styles.textPlaceholder}
      />
      <Animated.View
        entering={FadeIn.delay(300).duration(500)}
        exiting={FadeOut.duration(500)}
        style={[styles.textPlaceholder, styles.smallTextPlaceholder]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#DCFDE7',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  imagePlaceholder: {
    width: '100%',
    height: 150,
    backgroundColor: '#B8FAD6',
    borderRadius: 10,
  },
  textPlaceholder: {
    height: 16,
    backgroundColor: '#B8FAD6',
    borderRadius: 4,
    marginTop: 5,
  },
  smallTextPlaceholder: {
    height: 12,
    width: '60%',
  },
});