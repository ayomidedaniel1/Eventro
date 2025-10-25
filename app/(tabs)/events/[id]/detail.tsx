import EventInfo from '@/components/EventInfo';
import { useAuthStore } from '@/store/authStore';
import { useEventStore } from '@/store/eventStore';
import { EventInsert, TicketmasterPriceRange } from '@/types';
import { supabase } from '@/utils/supabase';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { ImageBackground } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface RedirectParams {
  status: 'successful' | 'cancelled';
  transaction_id?: string;
  tx_ref: string;
}

export default function EventsDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string; }>();
  const events = useEventStore((state) => state.events);
  const setEvents = useEventStore((state) => state.setEvents);
  const event = events.find((e) => e.id === id);
  const { user } = useAuthStore();
  const router = useRouter();

  console.log('Found event:', event);

  const [priceRange, setPriceRange] = useState<TicketmasterPriceRange | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

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
        console.log('Full priceRanges from API:', priceRanges);
        if (priceRanges.length > 0) {
          const { min, max } = priceRanges[0];
          setPriceRange({ min, max });

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
          setPriceRange({ min: 1000, max: 1500 });
        }
      } catch (err) {
        setError('Error fetching price range');
        setPriceRange({ min: 1000, max: 1500 });
        console.error('Error fetching price range:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPriceRange();
  }, [id, event, events, setEvents]);

  if (!event || !user) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.error}>Event not found</Text>
      </View>
    );
  }

  const handleOnRedirect = async (data: RedirectParams) => {
    if (data.status === 'successful' && data.transaction_id) {
      const { error } = await supabase.from('transactions').insert({
        event_id: id,
        user_id: user.id,
        amount: priceRange?.min || 1000,
        currency: 'NGN',
        transaction_id: data.transaction_id,
        status: 'successful',
      });

      if (error) {
        console.error('Database error:', error);
        setSnackbarMessage('Payment saved but failed to record in database');
      } else {
        setSnackbarMessage('Payment completed and recorded!');
      }
    } else {
      console.log('Payment not successful, status:', data.status);
      setSnackbarMessage('Payment was cancelled or failed.');
    }
    setSnackbarVisible(true);
  };

  const onDismissSnackbar = () => setSnackbarVisible(false);

  const generateTransactionRef = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return `tx_${result}`;
  };

  const navigateToChat = () => {
    router.push(`/events/${id}/chat`);
  };

  const handleShare = async () => {
    try {
      if (event.url) {
        await Share.share({
          message: `Check out this event: ${event.url}`,
        });
      } else {
        console.warn("Event URL is missing");
      }
    } catch (error) {
      console.error("Error sharing event URL:", error);
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);

    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date).replace(",", " |");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: event.image }}
        style={styles.imgBg}
        contentFit="cover"
      >
        <LinearGradient
          start={{ x: 0, y: 0.6 }}
          end={{ x: 0, y: 1 }}
          colors={['#67676729', '#010101E5']}
          style={styles.backgroundImageGradient}
        />
      </ImageBackground>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.overlay}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Text numberOfLines={1} ellipsizeMode='clip' style={styles.title}>{event.title}</Text>

        <Text style={styles.description} ellipsizeMode='tail' >{event.description}</Text>

        <View style={styles.line} />

        <Text style={styles.infoTitle}>Event Info</Text>

        <View style={styles.eventInfoContainer}>
          <EventInfo
            title="Venue"
            icon="location-outline"
            data={`${event.venue}, ${event.city}`}
          />

          <EventInfo
            title="Date"
            icon="calendar-outline"
            data={event.startDateTime ? formatDateTime(event.startDateTime) : "No date"}
          />

          <EventInfo
            title="Ticket price"
            icon="ticket-outline"
            data={`#9,000`}
          />

          <EventInfo
            title="Duration"
            icon="location-outline"
            data={`${event.venue}, ${event.city}`}
          />
        </View>

        <View style={styles.line} />

        <Text style={styles.infoTitle}>Organizers</Text>

        <View style={styles.organizerContainer}>
          <View style={styles.detailContainer}>
            <View style={styles.crownContainer}>
              <AntDesign color={'#F5F5F5'} size={20} name={'crown'} />
            </View>

            <View style={styles.contentContainer}>
              <Text style={styles.organizerTitle}>{event.promoter ? event.promoter : 'TBA'}</Text>

              <Text numberOfLines={1} ellipsizeMode='tail' style={styles.data}>{event.url?.slice(0, 30)}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.iconContainer}
            onPress={handleShare}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <AntDesign color={'#012508'} size={20} name={'link'} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.buyTicket}>
        <MaterialCommunityIcons name="ticket-confirmation-outline" size={24} color="#010101" />

        <Text style={styles.ticket}>Buy ticket (₦8,000)</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010101',
  },
  bottomSheetHandle: {
    backgroundColor: '#7D7F82',
  },
  imgBg: {
    width: '100%',
    height: 330,
  },
  backgroundImageGradient: {
    flex: 1,
  },
  overlay: {
    marginTop: -70,
    flexGrow: 1,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 24,
    lineHeight: 30,
    textAlign: 'left',
    color: '#FFFFFF',
  },
  description: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    lineHeight: 30,
    marginTop: 8,
    color: '#E5E6E6',
  },
  line: {
    width: '100%',
    alignSelf: 'center',
    borderWidth: 0.5,
    height: 0,
    borderColor: '#7D7F82',
    marginVertical: 14,
  },
  infoTitle: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 20,
    lineHeight: 30,
    textAlign: 'left',
    marginVertical: 12,
    color: '#FFFFFF',
  },
  eventInfoContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 12,
    marginTop: 4,
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
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFE6E6',
    borderRadius: 8,
  },
  organizerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    width: '100%',
    marginBottom: 12,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 46,
    height: 46,
    backgroundColor: '#F5F5F5',
    borderWidth: 0.46,
    borderColor: '#DDDDDD',
    borderRadius: 46,
    justifyContent: 'center',
    alignItems: 'center',
  },
  crownContainer: {
    width: 42,
    height: 42,
    backgroundColor: 'transparent',
    borderWidth: 0.46,
    borderColor: '#DDDDDD',
    borderRadius: 46,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 2,
  },
  organizerTitle: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 24,
    color: '#E5E6E6',
  },
  data: {
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  buyTicket: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 12,
    position: 'absolute',
    width: 392,
    height: 64,
    bottom: 20,
    elevation: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
  },
  ticket: {
    fontFamily: 'Manrope-Medium',
    fontSize: 20,
    lineHeight: 30,
    color: '#010101',
  },
});
