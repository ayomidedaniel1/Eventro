import EventCard from '@/components/EventCard';
import { EventCardWrapperProps } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function EventCardWrapper({ item, router }: EventCardWrapperProps) {
  return (
    <View style={styles.container}>
      <View style={styles.resultContainer}>
        <Text style={styles.result}>
          32 results
        </Text>

        <View style={styles.filterContainer}>
          <Ionicons name='filter' size={14} color={'#FFFFFF'} />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => router.push(`/events/${item.id}/detail`)}
        activeOpacity={0.8}
      >
        <EventCard event={item} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  resultContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 12,
  },
  result: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    fontFamily: 'Manrope-SemiBold',
    fontSize: 26,
    color: '#FFFFFF',
  },
  filterContainer: {
    width: 54,
    height: 54,
    backgroundColor: '#1A1A1D',
    backdropFilter: 'blur(25px)',
    borderRadius: 28,
  },
});