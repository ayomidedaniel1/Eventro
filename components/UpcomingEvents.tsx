import { EventInsert } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import UpcomingEventSkeleton from './skeletons/UpcomingEventSkeleton';

const UpcomingEvents = (
  {
    events, isLoading, onPress
  }
    : {
      events: EventInsert[];
      isLoading: boolean;
      onPress: (event: EventInsert) => void;
    }) => {
  const upcomingEvents = [...events]
    .filter(event => event.startDateTime && new Date(event.startDateTime) > new Date())
    .sort((a, b) => new Date(a.startDateTime!).getTime() - new Date(b.startDateTime!).getTime())
    .slice(0, 7);

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
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Upcoming events</Text>
        <TouchableOpacity onPress={() => { }} activeOpacity={0.9} style={styles.viewAllBtn}>
          <Text style={styles.viewAll}>View all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsHorizontalScrollIndicator={false}
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
              onPress={() => onPress(event)}
              activeOpacity={0.8}
              key={event.id}
              style={styles.eventCard}
            >
              <View style={styles.imgContainer}>
                <Image
                  source={{ uri: event.image || require('@/assets/images/icon.png') }}
                  style={styles.image}
                  contentFit="cover"
                />

                <View style={styles.priceContainer}>
                  <View style={styles.priceBox}>
                    <Text style={styles.price}>
                      ₦8,000
                    </Text>
                  </View>

                  <TouchableOpacity activeOpacity={0.8} style={styles.favouriteContainer}>
                    <Ionicons name="heart-outline" size={18} color={'#FFF'} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.contentContainer}>
                <Text style={styles.title}>
                  {event.title.length > 30 ? event.title.slice(0, 30) + "..." : event.title}
                </Text>
                <View style={styles.dataContainer}>
                  <View style={styles.locationContainer}>
                    <Ionicons name="location-outline" size={16} color="#FFFFFF" />
                    <Text style={styles.location}>{event.address}, {event.city}</Text>
                  </View>
                  <View style={styles.locationContainer}>
                    <Ionicons name="calendar-outline" size={16} color="#FFFFFF" />
                    <Text style={styles.location}>
                      {event.startDateTime ? formatDateTime(event.startDateTime) : "No date"}
                    </Text>
                  </View>
                </View>
              </View>

              <LinearGradient
                colors={["#9D8BF9", "#2902EE"]}
                // colors={["#F2D3D3", "#FA0F0F"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.genre}
              >
                <Text style={styles.genreText}>{event.genre}</Text>
              </LinearGradient>
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
    marginTop: 20,
    paddingHorizontal: 14,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: 290,
    height: 300,
    backgroundColor: '#1C1C1E',
    borderRadius: 24,
    borderWidth: 0.5,
    borderColor: '#434344',
    marginRight: 16,
    padding: 10,
    overflow: 'hidden',
  },
  imgContainer: {
    width: 270,
    height: 180,
    borderRadius: 20,
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
    width: 250,
    height: 34,
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
    justifyContent: 'center',
    flex: 1,
    gap: 4,
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
    marginLeft: 1,
  },
  genre: {
    position: "absolute",
    top: 18,
    left: -30,
    width: 125.07,
    height: 28,
    transform: [{ rotate: "-45deg" }],
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  genreText: {
    fontFamily: "Manrope-Bold",
    fontSize: 10,
    color: "#FFF",
  },
});