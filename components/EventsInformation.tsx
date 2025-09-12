import React, { JSX } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { EventInsert } from '@/types';

type EventInformationProps = {
  event: EventInsert;
};

function EventInformation({ event }: EventInformationProps): JSX.Element {
  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No event selected</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.text}>{event.description}</Text>
      <Text style={styles.text}>Date: {event.endDateTime}</Text>
      <Text style={styles.text}>Location: {event.location}</Text>
      <Text style={styles.text}>Genre: {event.genre}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#010101',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#E0E0E0',
    marginBottom: 4,
  },
});

export default EventInformation;
