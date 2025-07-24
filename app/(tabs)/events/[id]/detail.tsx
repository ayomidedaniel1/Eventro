import { useAuthStore } from '@/store/authStore';
import { useEventStore } from '@/store/eventStore';
import { EventInsert, TicketmasterPriceRange } from '@/types';
import { supabase } from '@/utils/supabase';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { PayWithFlutterwave } from 'flutterwave-react-native';
import { useEffect, useState } from 'react';
import { Alert, Image, Linking, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function EventsDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string; }>();
  const events = useEventStore((state) => state.events);
  const setEvents = useEventStore((state) => state.setEvents);
  const event = events.find((e) => e.id === id);
  const { user } = useAuthStore();
  const router = useRouter();

  const [priceRange, setPriceRange] = useState<TicketmasterPriceRange | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPriceRange = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiKey = process.env.EXPO_PUBLIC_TICKETMASTER_API_KEY;
        const response = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${apiKey}`
        );
        if (!response.ok) throw new Error('Failed to fetch event details');
        const data = await response.json();

        const priceRanges = data.priceRanges || [];
        if (priceRanges.length > 0) {
          const { min, max } = priceRanges[0];
          setPriceRange({ min, max });

          // Transform and update the event in the store
          const updatedEvent: EventInsert = {
            ...event!,
            id: id!,
            priceRanges: [{ min, max, currency: 'USD' }],
            title: event?.title || 'Unknown Event',
            description: event?.description || 'No description',
            image: event?.image || '',
            url: event?.url || null,
            startDate: event?.startDate || null,
            venue: event?.venue || 'N/A',
            city: event?.city || 'N/A',
            country: event?.country || 'N/A',
            created_at: event?.created_at || new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          setEvents(events.map(e => e.id === id ? updatedEvent : e));
        } else {
          setPriceRange({ min: 1000, max: 1000 });
        }
      } catch (err) {
        setError('Error fetching price range');
        setPriceRange({ min: 1000, max: 1000 });
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPriceRange();
  }, [id, event, events, setEvents]);

  if (!event || !user) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.error}>Event or user not found</Text>
      </View>
    );
  }

  const handleOnRedirect = async (data: { status: string; transactionId?: string; }) => {
    if (data.status === 'successful' && data.transactionId) {
      const { error } = await supabase.from('transactions').insert({
        event_id: id,
        user_id: user.id,
        amount: priceRange?.min || 1000,
        currency: 'NGN',
        transaction_id: data.transactionId,
        status: 'successful',
      });

      if (error) {
        Alert.alert('Database Error', 'Payment saved but failed to record in database.');
      } else {
        Alert.alert('Success', 'Payment completed and recorded!');
      }
    } else {
      Alert.alert('Cancelled', 'Payment was cancelled or failed.');
    }
  };

  const generateTransactionRef = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return `tx_${result}`;
  };

  const handlePayment = () => {
    if (loading) return;
    const config = {
      tx_ref: generateTransactionRef(10),
      authorization: process.env.EXPO_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || '',
      customer: { email: user.email ?? '', name: user.user_metadata.name },
      amount: priceRange?.min || 1000,
      currency: 'NGN' as any,
      payment_options: 'card,mobilemoney,ussd',
    };

    PayWithFlutterwave({
      options: config,
      onRedirect: handleOnRedirect,
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 80 }} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#2ACE99', '#B8FAD6']} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{event.title}</Text>
      </LinearGradient>
      <Image source={{ uri: event.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.detail}>Venue: {event.venue || 'N/A'}, {event.city || 'N/A'}</Text>
        <Text style={styles.detail}>Date: {event.startDate || event.startDateTime || 'TBA'}</Text>
        <Text style={styles.description}>{event.description || 'No description available'}</Text>
        {loading ? (
          <Text style={styles.detail}>Loading price...</Text>
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : priceRange?.min ? (
          <TouchableOpacity onPress={handlePayment} style={[styles.linkButton, { marginTop: 15 }]}>
            <Text style={styles.linkText}>Buy Ticket - ${priceRange.min} - ${priceRange.max}</Text>
          </TouchableOpacity>
        ) : null}
        {event.url && (
          <TouchableOpacity onPress={() => Linking.openURL(event.url!)} style={styles.linkButton}>
            <Text style={styles.linkText}>Go to event details</Text>
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
    paddingTop: (StatusBar.currentHeight ?? 0) + 10,
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 50,
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'Poppins-ExtraBold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {
      width: 1,
      height: 1
    },
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
    marginTop: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  linkText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  error: {
    textAlign: 'center',
    marginTop: 0,
    color: 'red',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFE6E6',
    borderRadius: 8,
  },
});