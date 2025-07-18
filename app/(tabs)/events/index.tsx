import EventCard from '@/components/EventCard';
import SkeletonEventCard from '@/components/SkeletonEventCard';
import { useEvents } from '@/hooks/useEvents';
import { useEventStore } from '@/store/eventStore';
import { EventInsert } from '@/types';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function EventsScreen() {
  const router = useRouter();
  const { data: events, isLoading, error } = useEvents();
  const setEvents = useEventStore((state) => state.setEvents);

  if (events && events.length > 0) {
    setEvents(events);
  }

  if (error) return <Text style={styles.error}>Error: {error.message}</Text>;

  const renderEventCard = ({ item }: { item: EventInsert; }) => (
    <TouchableOpacity
      onPress={() => router.push({ pathname: '/events/[id]/detail', params: { id: item.id } })}
      // onPress={() => router.push(`/events/${item.id}/detail`)}
      activeOpacity={0.8}
    >
      <EventCard event={item} />
    </TouchableOpacity>
  );

  const EmptyComponent = () => (!isLoading && events?.length === 0 ? (
    <Text style={styles.empty}>No events available.</Text>
  ) : null);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2ACE99', '#B8FAD6']}
        style={styles.header}
      >
        <Text style={styles.headerText}>Upcoming Events</Text>
      </LinearGradient>
      <FlatList
        data={isLoading ? Array(4).fill({}) : events || []}
        renderItem={({ item }) => (isLoading ? <SkeletonEventCard /> : renderEventCard({ item }))}
        keyExtractor={(item, index) => item.id || index.toString()}
        contentContainerStyle={styles.list}
        ListEmptyComponent={EmptyComponent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FFF9',
  },
  header: {
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'Poppins-ExtraBold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  list: {
    padding: 15,
    paddingTop: 10,
  },
  error: {
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
    fontFamily: 'Poppins-Regular',
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
    fontFamily: 'Poppins-Regular',
  },
});