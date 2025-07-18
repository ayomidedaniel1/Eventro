import EventCard from '@/components/EventCard';
import SkeletonEventCard from '@/components/SkeletonEventCard';
import { useEvents } from '@/hooks/useEvents';
import { useEventStore } from '@/store/eventStore';
import { EventInsert } from '@/types';
import { FlatList, StyleSheet, Text } from 'react-native';

export default function EventsScreen() {
  const { data: events, isLoading, error } = useEvents();
  const setEvents = useEventStore((state) => state.setEvents);

  if (events && events.length > 0) {
    setEvents(events);
  }

  if (error) return <Text style={styles.error}>Error: {error.message}</Text>;

  return (
    <FlatList
      data={isLoading ? Array(5).fill({}) : events || []}
      renderItem={({ item }) =>
        isLoading ? (
          <SkeletonEventCard />
        ) : (
          <EventCard event={item as EventInsert} />
        )
      }
      keyExtractor={(item, index) => item.id || index.toString()}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  error: {
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
    fontFamily: 'Poppins-Regular',
  },
  list: {
    padding: 10,
  },
});