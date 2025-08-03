import { EventCardProps } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

export default function EventCard({ event }: EventCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.imgContainer}>
        <Image
          source={{ uri: event.image }}
          style={styles.image}
        />
        <View style={styles.dateContainer}>
          <Text style={styles.date}>
            {event.startDate || event.startDateTime || 'TBA'}
          </Text>
        </View>
      </View>

      <Text style={styles.title}>{event.title}</Text>

      <View style={styles.locationContainer}>
        <Ionicons name='location' size={12} color={'#2ACE99'} />
        <Text style={styles.location}>
          {event.venue}, {event.city}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#DCFDE7', //#FFFFFF
    borderRadius: 16,
    marginBottom: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    isolation: 'isolate',
    width: 335,
    height: 268,
    borderColor: '#F4F4F4',
    borderWidth: 1,
  },
  imgContainer: {
    width: 210,
    height: 140,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  dateContainer: {
    position: 'absolute',
    // bottom:12,
    top: 82,
    left: 12,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
    gap: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    zIndex: 2,
  },
  date: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
    letterSpacing: -0.02,
    color: '#1D1D1D',
  },
  title: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: 'Poppins-Medium',
    marginTop: 5,
    color: '#1D1D1D',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    gap: 4,
  },
  location: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#333',
  },
});