import { EventInsert } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import UpcomingEventSkeleton from './skeletons/UpcomingEventSkeleton';

const UpcomingEvents = ({ events, isLoading }: { events: EventInsert[]; isLoading: boolean; }) => {
  const upcomingEvents = [...events]
    .filter(event => event.startDateTime && new Date(event.startDateTime) > new Date())
    .sort((a, b) => new Date(a.startDateTime!).getTime() - new Date(b.startDateTime!).getTime())
    .slice(0, 7);

  console.log("upcoming events>>>>", upcomingEvents);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Upcoming events</Text>
        <TouchableOpacity onPress={() => { }} activeOpacity={0.9} style={styles.viewAllBtn}>
          <Text style={styles.viewAll}>View all</Text>
        </TouchableOpacity>
      </View>

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
              <UpcomingEventSkeleton key={`skeleton-${index}`} />
            ))
          : upcomingEvents.map((event) => (
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
                <View style={styles.priceContainer}>
                  <View style={styles.priceBox}>
                    <Text style={styles.price}>
                      {event.startDate ? new Date(event.startDate).getDate() : '20'}
                    </Text>
                  </View>
                  <View style={styles.favouriteContainer}>
                    <Ionicons name="heart-outline" size={18} color={'#FFF'} />
                  </View>
                </View>
              </View>
              <View style={styles.contentContainer}>
                <Text style={styles.title}>{event.title}</Text>
                <View style={styles.dataContainer}>
                  <View style={styles.locationContainer}>
                    <Ionicons name="location" size={16} color="#2ACE99" />
                    <Text style={styles.location}>{event.city}</Text>
                  </View>
                  <View style={styles.locationContainer}>
                    <Ionicons name="calendar-clear" size={16} color="#2ACE99" />
                    <Text style={styles.location}>
                      {event.startDate ? new Date(event.startDate).getDate() : '20'}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

export default UpcomingEvents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20,
    paddingHorizontal: 14,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
    width: '100%',
    height: 42,
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
  headerText: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 20,
    lineHeight: 30,
    color: '#FFFFFF',
    textAlign: 'left',
  },
  eventsContainer: {
    marginTop: 16,
  },
  eventCard: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: 290,
    height: 300,
    backgroundColor: '#1C1C1E',
    borderRadius: 24,
    borderWidth: 0.5,
    borderColor: '#434344',
    marginRight: 16,
  },
  imgContainer: {
    width: 270,
    height: 180,
    borderRadius: 20,
    backgroundColor: '#E2EFFF',
    position: 'relative',
  },
  image: {
    width: 270,
    height: 180,
    borderRadius: 20,
  },
  priceContainer: {
    position: 'absolute',
    top: 136,
    left: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 6,
    gap: 2,
    width: 46,
    height: 46,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    zIndex: 2,
  },
  priceBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: 80,
    height: 34,
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
  },
  price: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    lineHeight: 20,
    textAlign: 'center',
    color: '#000000',
  },
  favouriteContainer: {
    width: 34,
    height: 34,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 0.2,
    borderColor: '#DDDDDD',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flex: 1,
    padding: 0,
    gap: 4,
    height: 82,
  },
  title: {
    fontFamily: 'Manrope-Medium',
    fontSize: 18,
    lineHeight: 30,
    color: '#FFFFFF',
  },
  dataContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8,
    height: 48,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    gap: 4,
    height: 20,
  },
  location: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    lineHeight: 20,
    textAlign: 'center',
    color: '#FFF',
  },
});