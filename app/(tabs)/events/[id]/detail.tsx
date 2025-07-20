import { useAuthStore } from '@/store/authStore';
import { useEventStore } from '@/store/eventStore';
import { supabase } from '@/utils/supabase';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { PayWithFlutterwave } from 'flutterwave-react-native';
import { Alert, Image, Linking, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function EventsDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string; }>();
  const events = useEventStore((state) => state.events);
  const event = events.find((e) => e.id === id);
  const { user } = useAuthStore();
  console.log('Event:', event);

  const router = useRouter();

  if (!event || !user) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.error}>Event or user not found</Text>
      </View>
    );
  }

  const handleOnRedirect = async (data: { status: string; transactionId?: string; }) => {
    if (data.status === 'successful' && data.transactionId) {
      // Store transaction in Supabase
      const { error } = await supabase.from('transactions').insert({
        event_id: id,
        user_id: user.id,
        amount: event.priceRanges?.[0]?.min || 1000,
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
    const config = {
      tx_ref: generateTransactionRef(10),
      authorization: Constants.expoConfig?.extra?.FLUTTERWAVE_PUBLIC_KEY || '',
      customer: { email: user.email ?? '', name: user.user_metadata.name },
      amount: event.priceRanges?.[0]?.min || 1000,
      currency: 'NGN' as any,
      payment_options: 'card,mobilemoney,ussd',
    };

    PayWithFlutterwave({
      options: config,
      onRedirect: handleOnRedirect,
    });
  };

  return (
    <ScrollView style={styles.container}>
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
        {event.priceRanges?.[0]?.min && (
          <TouchableOpacity onPress={handlePayment} style={[styles.linkButton, { marginTop: 15 }]}>
            <Text style={styles.linkText}>Buy Ticket - ${event.priceRanges[0].min}</Text>
          </TouchableOpacity>
        )}
        {event.url && (
          <TouchableOpacity onPress={() => Linking.openURL(event.url!)} style={styles.linkButton}>
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
    fontSize: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFE6E6',
    borderRadius: 8,
  },
});