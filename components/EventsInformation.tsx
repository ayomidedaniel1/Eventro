import { EventInsert } from '@/types';
import { ImageBackground } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { JSX } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EventInfo from './EventInfo';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

type EventInformationProps = {
  event: EventInsert;
};

export default function EventInformation({ event }: EventInformationProps): JSX.Element {
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

      <View style={styles.overlay}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.description} numberOfLines={5} ellipsizeMode='tail' >{event.description}</Text>

        <View style={styles.line} />

        <Text style={styles.infoTitle}>Event Info</Text>

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
          icon="location"
          data={`${event.venue}, ${event.city}`}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgBg: {
    width: '100%',
    height: 330,
  },
  backgroundImageGradient: {
    flex: 1,
  },
  overlay: {
    // marginTop: -40,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 24,
    lineHeight: 30,
    textAlign: 'left',
    color: '#FFFFFF',
    marginTop: -30,
  },
  description: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    lineHeight: 30,
    color: '#E5E6E6',
  },
  line: {
    width: '100%',
    alignSelf: 'center',
    borderWidth: 0.5,
    height: 0,
    borderColor: '#7D7F82',
    marginTop: 5,
  },
  infoTitle: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 20,
    lineHeight: 30,
    textAlign: 'center',
    color: '#FFFFFF',
  },
});
