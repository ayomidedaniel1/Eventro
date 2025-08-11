import { EventInsert } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PopularEventSkeleton from './skeletons/PopularEventSkeleton';

const PopularEvents = ({ events, isLoading }: { events: EventInsert[]; isLoading: boolean; }) => {
  // Function to calculate events popularity score since it doesn't exist on API
  const calculatePopularityScore = (event: EventInsert): number => {
    const now = new Date();
    const updatedAt = new Date(event.updated_at);
    const daysSinceUpdate = (now.getTime() - updatedAt.getTime()) / (1000 * 60 * 60 * 24);

    const start = event.startDateTime ? new Date(event.startDateTime) : null;
    const end = event.endDateTime ? new Date(event.endDateTime) : null;
    const eventDurationInHours = start && end
      ? (end.getTime() - start.getTime()) / (1000 * 60 * 60)
      : 2;

    return (daysSinceUpdate * 0.5) + (eventDurationInHours * 0.3);
  };

  // Sort by popularity score (lower score = more popular due to recent updates)
  const popularEvents = [...events]
    .filter(event => event.startDateTime && new Date(event.startDateTime) > new Date())
    .sort((a, b) => calculatePopularityScore(a) - calculatePopularityScore(b))
    .slice(0, 5);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>🔥 Popular Events</Text>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 50 }}
        style={styles.eventsContainer}
        horizontal
      >

        {isLoading
          ? Array(5)
            .fill(null)
            .map((_, index) => (
              <PopularEventSkeleton key={`skeleton-${index}`} />
            ))
          : popularEvents.map((event) => (
            <TouchableOpacity
              onPress={() => router.push(`/events/${event.id}/detail`)}
              activeOpacity={0.8}
              key={event.id}
              style={styles.eventCard}
            >
              <View style={styles.imgContainer}>
                <Image
                  source={{ uri: event.image || '../../assets/images/icons/smile.png' }}
                  style={styles.image}
                  contentFit="cover"
                />
                <View style={styles.dateContainer}>
                  <Text style={styles.date}>
                    {event.startDate ? new Date(event.startDate).getDate() : '20'}
                  </Text>
                  <Text style={styles.month}>
                    {event.startDate
                      ? new Date(event.startDate).toLocaleString('default', { month: 'short' })
                      : 'Mar'}
                  </Text>
                </View>
              </View>
              <View style={styles.contentContainer}>
                <Text style={styles.title}>{event.title}</Text>
                <View style={styles.locationContainer}>
                  <Ionicons name="location" size={12} color="#2ACE99" />
                  <Text style={styles.location}>{event.city}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}

      </ScrollView>
    </View>
  );
};

export default PopularEvents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 36,
  },
  headerText: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 16,
    lineHeight: 22,
    color: '#1D1D1D',
    textAlign: 'left',
  },
  eventsContainer: {
    marginTop: 16,
  },
  eventCard: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    isolation: 'isolate',
    width: 210,
    height: 248,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F4F4F4',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginRight: 18,
  },
  imgContainer: {
    width: 210,
    height: 140,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: 'relative',
  },
  image: {
    width: 210,
    height: 140,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  dateContainer: {
    position: 'absolute',
    top: 82,
    left: 12,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    gap: 2,
    width: 46,
    height: 46,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    zIndex: 2,
  },
  date: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
    color: '#1D1D1D',
  },
  month: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
    color: 'rgba(29, 29, 29, 0.5)',
  },
  contentContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    flex: 1,
  },
  title: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 19,
    alignItems: 'center',
    color: '#1D1D1D',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    gap: 4,
  },
  location: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    lineHeight: 19,
    alignItems: 'center',
    color: 'rgba(29, 29, 29, 0.5)',
  },
});