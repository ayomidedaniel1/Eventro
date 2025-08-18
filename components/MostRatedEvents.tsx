import { EventInsert } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MostRatedEventSkeleton from './skeletons/MostRatedEventSkeleton';

// Placeholder function to calculate dummy rating
const calculateRating = (event: EventInsert): number => {
  return Math.random() * (5.0 - 3.5) + 3.5;
};

const MostRatedEvents = ({ events, isLoading }: { events: EventInsert[]; isLoading: boolean; }) => {
  const mostRatedEvents = [...events]
    .filter(event => event.startDateTime && new Date(event.startDateTime) > new Date())
    .map(event => ({ ...event, rating: calculateRating(event) }))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Most rated</Text>
        <TouchableOpacity activeOpacity={0.9} onPress={() => router.push('/events')} style={styles.viewAllBtn}>
          <Text style={styles.viewAll}>View all</Text>
        </TouchableOpacity>
      </View>

      {isLoading
        ? Array(5)
          .fill(null)
          .map((_, index) => (
            <MostRatedEventSkeleton key={`skeleton-${index}`} />
          ))
        : mostRatedEvents.map((event) => (
          <TouchableOpacity
            onPress={() => router.push(`/events/${event.id}/detail`)}
            activeOpacity={0.8}
            key={event.id}
            style={styles.eventContainer}
          >
            <View style={styles.dataContainer}>
              <Image
                source={{ uri: event.image || require('@/assets/images/icon.png') }}
                style={styles.image}
                contentFit="cover"
              />

              <View style={styles.detailsContainer}>
                <Text style={styles.title}>
                  {event.title.length > 26 ? event.title.slice(0, 26) + "..." : event.title}
                </Text>

                <View style={styles.locationContainer}>
                  <Ionicons name="location-outline" size={14} color="#FFFFFF" />
                  <Text style={styles.location}>{event.city}</Text>
                </View>

                <View style={styles.bottomContainer}>
                  <View style={styles.dateContainer}>
                    <Ionicons name="calendar-outline" size={14} color={'#FFFFFF'} />
                    <Text style={styles.date}>
                      {event.startDateTime
                        ? new Date(event.startDateTime).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
                        : '21 Mei 2025'}
                    </Text>
                  </View>

                  <View style={styles.dateContainer}>
                    <Ionicons name="ticket-outline" size={14} color={'#FFFFFF'} />
                    <Text style={styles.date}>
                      {event.startDateTime
                        ? new Date(event.startDateTime).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
                        : '21 Mei 2025'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color={'#FBFB15'} />
              <Text style={styles.rating}>
                {event.rating ? event.rating.toFixed(1) : '4.5'} {/* Display calculated rating */}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
    </View>
  );
};

export default MostRatedEvents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 36,
    paddingHorizontal: 14,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
    width: '100%',
    height: 42,
  },
  headerText: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 20,
    lineHeight: 30,
    color: '#FFFFFF',
    textAlign: 'left',
  },
  viewAllBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 56,
    height: 36,
  },
  viewAll: {
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
    lineHeight: 24,
    color: '#CBC6C6',
  },
  eventContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
    padding: 10,
    width: '100%',
    height: 100,
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    marginBottom: 14,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 14,
  },
  dataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    gap: 10,
    height: 80,
  },
  detailsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 5,
  },
  date: {
    fontFamily: 'Manrope-Regular',
    fontSize: 10,
    lineHeight: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  title: {
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    fontFamily: 'Manrope-Regular',
    fontSize: 10,
    lineHeight: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingContainer: {
    width: 58,
    height: 32,
    backgroundColor: '#3C3C3F',
    borderWidth: 0.2,
    borderColor: 'rgba(221, 221, 221, 0.2)',
    backdropFilter: 'blur(50px)',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  rating: {
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
    lineHeight: 20,
    textAlign: 'center',
    color: '#FFFFFF',
  },
});