import { EventCardProps } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ActiveTicket = ({ event }: EventCardProps) => {

  return (
    <TouchableOpacity
      onPress={() => router.push(`/tickets/${event.id}/detail`)}
      activeOpacity={0.8}
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
            <Ionicons name="location-outline" size={16} color="#FFFFFF" />
            <Text style={styles.location}>{event.city}</Text>
          </View>

          <View style={styles.bottomContainer}>
            <View style={styles.dateContainer}>
              <Ionicons name="calendar-outline" size={16} color={'#FFFFFF'} />
              <Text style={styles.date}>
                {event.startDateTime
                  ? new Date(event.startDateTime).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
                  : '21 Mei 2025'}
              </Text>
            </View>

            <View style={styles.dateContainer}>
              <Ionicons name="ticket-outline" size={16} color={'#FFFFFF'} />
              <Text style={styles.date}>
                {event.startDateTime
                  ? new Date(event.startDateTime).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
                  : '21 Mei 2025'}
              </Text>
            </View>
          </View>

          <View style={styles.priceContainer}>
            <Ionicons name="ticket-outline" size={16} color="#FFFFFF" />
            <Text style={styles.price}>{event.city}</Text>
          </View>
        </View>
      </View>

      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>
          {event.genre}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ActiveTicket;

const styles = StyleSheet.create({
  eventContainer: {
    marginTop: 36,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
    padding: 10,
    width: '100%',
    height: 120,
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    marginBottom: 14,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 14,
  },
  dataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    gap: 11,
    height: 102,
  },
  detailsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 5,
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
    fontSize: 12,
    lineHeight: 20,
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
  date: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    lineHeight: 20,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  price: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    lineHeight: 20,
    color: '#FFFFFF',
    textAlign: 'center',
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