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
            {event.startDate ? new Date(event.startDate).getDate() : '20'}
          </Text>
          <Text style={styles.month}>
            {event.startDate ? new Date(event.startDate).toLocaleString('default', { month: 'short' }) : 'Mar'}
          </Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{event.title}</Text>

        <View style={styles.locationContainer}>
          <Ionicons name='location' size={12} color={'#2ACE99'} />
          <Text style={styles.location}>
            {event.venue}, {event.city}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 24,
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    height: 268,
    borderColor: '#F4F4F4',
    borderWidth: 1,
  },
  imgContainer: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  dateContainer: {
    position: 'absolute',
    top: 100,
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
    zIndex: 2,
  },
  date: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
    color: '#1D1D1D',
  },
  month: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
    color: 'rgba(29, 29, 29, 0.5)',
  },
  contentContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 16,
    flex: 1,
  },
  title: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: 'Manrope-Medium',
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
    fontFamily: 'Manrope-Regular',
    color: '#333',
  },
});