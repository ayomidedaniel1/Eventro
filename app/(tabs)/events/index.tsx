import { StyleSheet, Text, View } from 'react-native';

export default function EventsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Browse Events</Text>
      <Text style={styles.description}>
        Soon, you&apos;ll be able to browse, stream, and book tickets to live events.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardText}>🚧 This feature is under construction</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    color: '#2ACE99',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#888',
    fontFamily: 'Poppins-Regular',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#DCFDE7',
    padding: 20,
    borderRadius: 12,
    borderColor: '#B8FAD6',
    borderWidth: 1,
    alignItems: 'center',
  },
  cardText: {
    color: '#444',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
});
