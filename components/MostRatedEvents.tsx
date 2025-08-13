import { EventInsert } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MostRatedEventSkeleton from './skeletons/MostRatedEventSkeleton';

const NewEvents = ({ events, isLoading }: { events: EventInsert[]; isLoading: boolean; }) => {
  const newEvents = [...events]
    .filter(event => event.startDateTime && new Date(event.startDateTime) > new Date())
    .sort((a, b) => new Date(b.startDateTime!).getTime() - new Date(a.startDateTime!).getTime())
    .slice(0, 5);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>New Events</Text>
        <Pressable onPress={() => router.push('/events')} style={{ padding: 4 }}>
          <Text style={styles.navText}>See All</Text>
        </Pressable>
      </View>

      {isLoading
        ? Array(5)
          .fill(null)
          .map((_, index) => (
            <MostRatedEventSkeleton key={`skeleton-${index}`} />
          ))
        : newEvents.map((event) => (
          <TouchableOpacity
            onPress={() => router.push(`/events/${event.id}/detail`)}
            activeOpacity={0.8}
            key={event.id}
            style={styles.eventContainer}
          >
            <Image
              source={{ uri: event.image || '../../assets/images/icons/smile.png' }}
              style={styles.image}
              contentFit="cover"
            />
            <View style={styles.dataContainer}>
              <Text style={styles.date}>
                {event.startDateTime
                  ? new Date(event.startDateTime).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
                  : '21 Mei 2025'}
              </Text>
              <Text style={styles.title}>{event.title}</Text>
              <View style={styles.locationContainer}>
                <Ionicons name="location" size={12} color="#2ACE99" />
                <Text style={styles.location}>{event.city}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

    </View>
  );
};

export default NewEvents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 36,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  headerText: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 16,
    lineHeight: 22,
    color: '#1D1D1D',
    textAlign: 'left',
  },
  navText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 19,
    color: '#2ACE99',
  },
  eventContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 0,
    gap: 16,
    width: 335,
    height: 88,
    marginBottom: 14,
  },
  image: {
    width: 64,
    height: 88,
    borderRadius: 12,
  },
  dataContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 4,
    gap: 6,
    width: 255,
    height: 88,
  },
  date: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 19,
    color: '#655CBB',
  },
  title: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 19,
    color: '#1D1D1D',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    lineHeight: 19,
    color: 'rgba(29, 29, 29, 0.5)',
  },
});