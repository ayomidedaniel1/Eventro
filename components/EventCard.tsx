import { EventCardProps } from '@/types';
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

export default function EventCard({ event }: EventCardProps) {
  console.log(event);
  return (
    <View style={styles.card}>
      <Image source={{ uri: event.image }} style={styles.image} />
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.location}>
        {event.venue}, {event.city}
      </Text>
      <Text style={styles.date}>
        {event.startDate || event.startDateTime || 'TBA'}
      </Text>
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
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 5,
    color: '#2ACE99',
  },
  location: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#333',
  },
  date: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#888',
  },
});