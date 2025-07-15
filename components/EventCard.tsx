import { EventCardProps } from '@/types';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function EventCard({ id, title, starts_at, location, image_url }: EventCardProps) {

  return (
    <Pressable style={styles.card}>
      {image_url ? <Image source={{ uri: image_url }} style={styles.image} contentFit="cover" /> : null}
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.meta}>
          {new Date(starts_at).toLocaleString()} • {location}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#DCFDE7',
  },
  image: {
    height: 160,
    width: '100%',
  },
  details: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#222',
    marginBottom: 4,
  },
  meta: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },
});
