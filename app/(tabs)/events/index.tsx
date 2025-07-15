import EventCard from '@/components/EventCard';
import SkeletonEventCard from '@/components/SkeletonEventCard';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function EventsScreen() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await supabase.from('events').select('*').order('starts_at', { ascending: true });
        setEvents(data ?? []);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Events</Text>
      <FlatList
        data={loading ? [1, 2, 3] : events}
        keyExtractor={(_, i) => loading ? i.toString() : events[i].id}
        renderItem={({ item }) =>
          loading ? <SkeletonEventCard /> :
            <TouchableOpacity onPress={() => router.push(`/events/${item.id}`)}>
              <EventCard {...item} />
            </TouchableOpacity>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    color: '#2ACE99',
    marginBottom: 16,
  },
});
