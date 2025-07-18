import { useEventStore } from '@/store/eventStore';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function EventsDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string; }>();
  const events = useEventStore((state) => state.events);
  const event = events.find((e) => e.id === id);

  const router = useRouter();

  if (!event) return <Text style={styles.error}>Event not found</Text>;

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#2ACE99', '#B8FAD6']}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{event.title}</Text>
      </LinearGradient>
      <Image source={{ uri: event.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.detail}>Venue: {event.venue}, {event.city}</Text>
        <Text style={styles.detail}>Date: {event.startDate || event.startDateTime || 'TBA'}</Text>
        <Text style={styles.description}>{event.description}</Text>
        {event.url && (
          <TouchableOpacity
            onPress={() => Linking.openURL(event.url!)}
            style={styles.linkButton}
          >
            <Text style={styles.linkText}>Get Tickets</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
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
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 10,
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
  image: {
    width: '100%',
    height: 250,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    color: '#2ACE99',
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#333',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    marginBottom: 15,
  },
  linkButton: {
    backgroundColor: '#2ACE99',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  linkText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  error: {
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
    fontFamily: 'Poppins-Regular',
  },
});