import HeaderComponent from '@/components/HeaderComponent';
import { useAuthStore } from '@/store/authStore';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user]);

  const events = [
    { title: 'React Native Conf', time: 'July 20, 10:00 AM' },
    { title: 'Expo SDK Meetup', time: 'July 22, 5:30 PM' },
    { title: 'Next.js Summit', time: 'July 24, 1:00 PM' },
  ];

  return (
    <View style={styles.container}>
      <HeaderComponent title="Upcoming Events" />

      <View style={styles.card}>
        {events.map((event, idx) => (
          <View key={idx} style={styles.eventItem}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventTime}>{event.time}</Text>
          </View>
        ))}

        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => router.push('/events')}
          activeOpacity={0.8}
        >
          <Text style={styles.viewAllText}>View All Events</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 28,
    paddingHorizontal: 14,
  },
  card: {
    backgroundColor: '#DCFDE7',
    borderRadius: 12,
    padding: 16,
    borderColor: '#B8FAD6',
    borderWidth: 1,
  },
  eventItem: {
    marginBottom: 12,
  },
  eventTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#333',
  },
  eventTime: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  viewAllButton: {
    marginTop: 12,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#2ACE99',
    borderRadius: 8,
  },
  viewAllText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
});
