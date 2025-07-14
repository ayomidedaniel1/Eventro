import { EventCardProps } from '@/types';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function EventCard({ id, title, date, location, imageUrl }: EventCardProps) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(`/events/${id}`)}
      style={styles.card}
    >
      <Image source={{ uri: imageUrl }} style={styles.image} contentFit="cover" />
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.meta}>{date} • {location}</Text>
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
