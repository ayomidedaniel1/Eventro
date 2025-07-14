import { StyleSheet, View } from 'react-native';

export default function SkeletonEventCard() {
  return (
    <View style={styles.card}>
      <View style={styles.image} />
      <View style={styles.textLine} />
      <View style={styles.textSmall} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F3F3F3',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  image: {
    height: 160,
    backgroundColor: '#E0E0E0',
  },
  textLine: {
    height: 16,
    backgroundColor: '#D0D0D0',
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 4,
  },
  textSmall: {
    height: 14,
    width: '50%',
    backgroundColor: '#D0D0D0',
    marginHorizontal: 12,
    marginTop: 8,
    marginBottom: 12,
    borderRadius: 4,
  },
});
